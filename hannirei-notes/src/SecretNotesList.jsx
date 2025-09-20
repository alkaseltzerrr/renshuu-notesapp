import { Plus, Trash2, Lock, Edit3, Save, X, Pin } from 'lucide-react';
import { useState } from 'react';
import SearchAndFilter from './SearchAndFilter';
import MarkdownRenderer from './MarkdownRenderer';

function SecretNotesList({ notes, input, setInput, loading, addNote, deleteNote, updateNote }) {
  const [editingId, setEditingId] = useState(null);
  const [editContent, setEditContent] = useState('');
  const [editTags, setEditTags] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('latest');
  const [filterTag, setFilterTag] = useState('');
  const [newTags, setNewTags] = useState('');

  const startEdit = (note) => {
    setEditingId(note.id);
    setEditContent(note.content);
    setEditTags(note.tags ? note.tags.join(', ') : '');
  };

  const saveEdit = async () => {
    const tags = editTags.split(',').map(tag => tag.trim()).filter(tag => tag);
    await updateNote(editingId, editContent, tags);
    setEditingId(null);
    setEditContent('');
    setEditTags('');
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditContent('');
    setEditTags('');
  };

  const handleAddNote = async (e) => {
    e.preventDefault();
    if (input.trim() === '') return;
    const tags = newTags.split(',').map(tag => tag.trim()).filter(tag => tag);
    await addNote(input, tags);
    setNewTags('');
  };

  const togglePin = async (note) => {
    await updateNote(note.id, note.content, note.tags || [], !note.is_pinned);
  };

  // Filter and sort notes
  const filteredNotes = notes.filter(note => {
    const matchesSearch = note.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag = filterTag === '' || (note.tags && note.tags.includes(filterTag));
    return matchesSearch && matchesTag;
  });

  const sortedNotes = [...filteredNotes].sort((a, b) => {
    if (sortBy === 'pinned' && a.is_pinned !== b.is_pinned) {
      return b.is_pinned - a.is_pinned;
    }
    switch (sortBy) {
      case 'latest':
        return new Date(b.created_at) - new Date(a.created_at);
      case 'oldest':
        return new Date(a.created_at) - new Date(b.created_at);
      case 'a-z':
        return a.content.localeCompare(b.content);
      case 'z-a':
        return b.content.localeCompare(a.content);
      default:
        return 0;
    }
  });

  const availableTags = [...new Set(notes.flatMap(note => note.tags || []))];

  return (
    <>
      <h2>Secret Notes <Lock size={18} style={{verticalAlign: 'middle'}} /></h2>
      
      <SearchAndFilter
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        sortBy={sortBy}
        setSortBy={setSortBy}
        filterTag={filterTag}
        setFilterTag={setFilterTag}
        availableTags={availableTags}
      />

      <form className="notes-form" onSubmit={handleAddNote}>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your secret note... Use **bold**, *italic*, [link](url), - list items"
          disabled={loading}
          className="note-input-textarea"
          rows="3"
        />
        <input
          type="text"
          value={newTags}
          onChange={(e) => setNewTags(e.target.value)}
          placeholder="Tags (comma separated)"
          disabled={loading}
        />
        <button type="submit" disabled={loading}>
          <Plus size={20} style={{verticalAlign: 'middle'}} />
          {loading ? 'Saving...' : 'Add Secret'}
        </button>
      </form>
      
      <div className="notes-list">
        {sortedNotes.map((note) => (
          <div className={`note-card secret ${note.is_pinned ? 'pinned' : ''}`} key={note.id}>
            {editingId === note.id ? (
              <div className="edit-mode">
                <MarkdownRenderer 
                  content={editContent}
                  isEditing={true}
                />
                <textarea
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  className="edit-textarea"
                  placeholder="Use **bold**, *italic*, [link](url), - list items"
                />
                <input
                  type="text"
                  value={editTags}
                  onChange={(e) => setEditTags(e.target.value)}
                  placeholder="Tags (comma separated)"
                  className="edit-tags"
                />
                <div className="edit-actions">
                  <button onClick={saveEdit} className="save-btn">
                    <Save size={16} />
                  </button>
                  <button onClick={cancelEdit} className="cancel-btn">
                    <X size={16} />
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="note-content">
                  <MarkdownRenderer 
                    content={note.content}
                    isEditing={false}
                  />
                  {note.tags && note.tags.length > 0 && (
                    <div className="note-tags">
                      {note.tags.map((tag, index) => (
                        <span key={index} className="tag secret-tag">{tag}</span>
                      ))}
                    </div>
                  )}
                </div>
                <div className="note-actions">
                  <button 
                    onClick={() => togglePin(note)} 
                    className={`pin-btn ${note.is_pinned ? 'pinned' : ''}`}
                    disabled={loading}
                  >
                    <Pin size={16} />
                  </button>
                  <button onClick={() => startEdit(note)} className="edit-btn" disabled={loading}>
                    <Edit3 size={16} />
                  </button>
                  <button className="delete-btn" onClick={() => deleteNote(note.id)} disabled={loading}>
                    <Trash2 size={18} />
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
        {sortedNotes.length === 0 && !loading && <p className="no-notes">No secret notes found.</p>}
      </div>
    </>
  );
}

export default SecretNotesList;
