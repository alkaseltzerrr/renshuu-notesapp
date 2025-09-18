function OtherNotesList({ notes, loading }) {
  return (
    <>
      <h2>Other Users' Notes</h2>
      <div className="notes-list">
        {notes.map((note) => (
          <div className="note-card" key={note.id}>
            <div className="note-content">
              <span style={{color: '#222', fontSize: '1.1rem'}}>{note.content}</span>
            </div>
          </div>
        ))}
        {notes.length === 0 && !loading && <p className="no-notes">No other notes yet.</p>}
      </div>
    </>
  );
}

export default OtherNotesList;
