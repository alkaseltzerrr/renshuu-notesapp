

import { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import { Plus, Trash2, StickyNote } from 'lucide-react';
import './App.css';

function App() {
  const [notes, setNotes] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  // Fetch notes from Supabase on mount
  useEffect(() => {
    const fetchNotes = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('notes')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) {
        console.error('Error fetching notes:', error.message);
      } else {
        setNotes(data || []);
      }
      setLoading(false);
    };
    fetchNotes();
  }, []);

  // Add a new note to Supabase
  const addNote = async (e) => {
    e.preventDefault();
    if (input.trim() === '') return;
    setLoading(true);
    const { data, error } = await supabase
      .from('notes')
      .insert([{ content: input }])
      .select();
    if (error) {
      console.error('Error adding note:', error.message);
    } else {
      setNotes([data[0], ...notes]);
      setInput('');
    }
    setLoading(false);
  };

  // Delete a note from Supabase
  const deleteNote = async (id) => {
    setLoading(true);
    const { error } = await supabase
      .from('notes')
      .delete()
      .eq('id', id);
    if (error) {
      console.error('Error deleting note:', error.message);
    } else {
      setNotes(notes.filter((note) => note.id !== id));
    }
    setLoading(false);
  };

  return (
    <div className="notes-app fullscreen">
      <div className="notes-header">
        <StickyNote size={32} color="#1a4fd7" style={{marginRight: '10px'}} />
        <h1>Notes App</h1>
      </div>
      <form className="notes-form" onSubmit={addNote}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your note here..."
          disabled={loading}
        />
        <button type="submit" disabled={loading}>
          <Plus size={20} style={{verticalAlign: 'middle'}} />
          {loading ? 'Saving...' : 'Add Note'}
        </button>
      </form>
      <div className="notes-list">
        {notes.map((note) => (
          <div className="note-card" key={note.id}>
            <div className="note-content">
              <span style={{color: '#222', fontSize: '1.1rem'}}>{note.content}</span>
            </div>
            <button className="delete-btn" onClick={() => deleteNote(note.id)} disabled={loading}>
              <Trash2 size={18} />
            </button>
          </div>
        ))}
        {notes.length === 0 && !loading && <p className="no-notes">No notes yet.</p>}
      </div>
    </div>
  );
}

export default App;
