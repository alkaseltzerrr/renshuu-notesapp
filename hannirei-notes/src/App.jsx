
import { useState } from 'react';
import './App.css';

function App() {
  const [notes, setNotes] = useState([]);
  const [input, setInput] = useState('');

  const addNote = (e) => {
    e.preventDefault();
    if (input.trim() === '') return;
    setNotes([...notes, input]);
    setInput('');
  };

  const deleteNote = (index) => {
    setNotes(notes.filter((_, i) => i !== index));
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
        />
        <button type="submit">Add Note</button>
      </form>
      <ul>
        {notes.map((note, idx) => (
          <li key={idx}>
            {note}
            <button onClick={() => deleteNote(idx)} style={{marginLeft: '10px'}}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
