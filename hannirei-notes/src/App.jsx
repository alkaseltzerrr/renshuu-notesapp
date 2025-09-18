


import { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import { StickyNote, LogOut } from 'lucide-react';
import AuthForm from './AuthForm';
import NotesList from './NotesList';
import SecretNotesList from './SecretNotesList';
import OtherNotesList from './OtherNotesList';
import './App.css';


function App() {
  const [notes, setNotes] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [secretNotes, setSecretNotes] = useState([]);
  const [secretInput, setSecretInput] = useState('');
  const [authChecked, setAuthChecked] = useState(false);
  const [authChanged, setAuthChanged] = useState(false);

  // Check auth and fetch notes
  useEffect(() => {
    const getUserAndNotes = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      setAuthChecked(true);
      if (user) {
        setLoading(true);
        // Fetch all notes
        const { data: notesData, error: notesError } = await supabase
          .from('notes')
          .select('*')
          .order('created_at', { ascending: false });
        if (notesError) {
          console.error('Error fetching notes:', notesError.message);
        } else {
          setNotes(notesData || []);
        }
        // Fetch secret notes
        const { data: secretData, error: secretError } = await supabase
          .from('secret_notes')
          .select('*')
          .order('created_at', { ascending: false });
        if (secretError) {
          console.error('Error fetching secret notes:', secretError.message);
        } else {
          setSecretNotes(secretData || []);
        }
        setLoading(false);
      }
    };
    getUserAndNotes();
    // Reset authChanged after re-fetch
    if (authChanged) setAuthChanged(false);
  }, [authChanged]);

  // Add a new note to Supabase
  const addNote = async (e) => {
    e.preventDefault();
    if (input.trim() === '' || !user) return;
    setLoading(true);
    const { data, error } = await supabase
      .from('notes')
      .insert([{ content: input, user_id: user.id }])
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
      .eq('id', id)
      .eq('user_id', user.id);
    if (error) {
      console.error('Error deleting note:', error.message);
    } else {
      setNotes(notes.filter((note) => note.id !== id));
    }
    setLoading(false);
  };

  // Add a new secret note
  const addSecretNote = async (e) => {
    e.preventDefault();
    if (secretInput.trim() === '' || !user) return;
    setLoading(true);
    const { data, error } = await supabase
      .from('secret_notes')
      .insert([{ content: secretInput, user_id: user.id }])
      .select();
    if (error) {
      console.error('Error adding secret note:', error.message);
    } else {
      setSecretNotes([data[0], ...secretNotes]);
      setSecretInput('');
    }
    setLoading(false);
  };

  // Delete a secret note
  const deleteSecretNote = async (id) => {
    setLoading(true);
    const { error } = await supabase
      .from('secret_notes')
      .delete()
      .eq('id', id)
      .eq('user_id', user.id);
    if (error) {
      console.error('Error deleting secret note:', error.message);
    } else {
      setSecretNotes(secretNotes.filter((note) => note.id !== id));
    }
    setLoading(false);
  };

  // Logout
  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setNotes([]);
    setSecretNotes([]);
  };

  if (!authChecked) {
    return <div className="notes-app fullscreen"><p>Loading...</p></div>;
  }

  // Auth handler for AuthForm
  const handleAuth = async (type, email, password) => {
    if (type === 'login') {
      return await supabase.auth.signInWithPassword({ email, password });
    } else {
      return await supabase.auth.signUp({ email, password });
    }
  };

  if (!user) {
    return <div className="notes-app fullscreen"><AuthForm onAuth={async (...args) => { await handleAuth(...args); setAuthChanged(true); }} /></div>;
  }

  // Separate notes: my notes and others
  const myNotes = notes.filter(n => n.user_id === user.id);
  const otherNotes = notes.filter(n => n.user_id !== user.id);

  return (
    <div className="notes-app fullscreen">
      <button className="logout-float" onClick={handleLogout} title="Logout">
        <LogOut size={22} style={{verticalAlign: 'middle', marginRight: '6px'}} />
        Logout
      </button>
      <div className="notes-header">
        <StickyNote size={32} color="#1a4fd7" style={{marginRight: '10px'}} />
        <h1>Notes App</h1>
      </div>
      <NotesList
        notes={myNotes}
        input={input}
        setInput={setInput}
        loading={loading}
        addNote={addNote}
        deleteNote={deleteNote}
      />
      <SecretNotesList
        notes={secretNotes}
        input={secretInput}
        setInput={setSecretInput}
        loading={loading}
        addNote={addSecretNote}
        deleteNote={deleteSecretNote}
      />
      <OtherNotesList
        notes={otherNotes}
        loading={loading}
      />
    </div>
  );
}

export default App;
