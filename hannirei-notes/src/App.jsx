
import { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
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
    <div className="notes-app">
      <h1>Notes App</h1>
      <form onSubmit={addNote}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your note here..."
          disabled={loading}
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Saving...' : 'Add Note'}
        </button>
      </form>
      <ul>
        {notes.map((note) => (
          <li key={note.id}>
            {note.content}
            <button onClick={() => deleteNote(note.id)} disabled={loading} style={{marginLeft: '10px'}}>
              Delete
            </button>
          </li>
        ))}
      </ul>
      {notes.length === 0 && !loading && <p>No notes yet.</p>}
    </div>
  );
}

export default App;
