import { Plus, Trash2 } from 'lucide-react';

function NotesList({ notes, input, setInput, loading, addNote, deleteNote }) {
  return (
    <>
      <h2>My Notes</h2>
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
    </>
  );
}

export default NotesList;
