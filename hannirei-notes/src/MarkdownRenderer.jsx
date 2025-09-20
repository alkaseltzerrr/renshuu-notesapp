import { useState } from 'react';
import { Eye, Edit3 } from 'lucide-react';

// Simple markdown parser for basic formatting
function parseMarkdown(text) {
  if (!text) return '';
  
  return text
    // Bold text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    // Italic text
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    // Links
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
    // Line breaks
    .replace(/\n/g, '<br>')
    // Lists (simple bullet points)
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    .replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>');
}

function MarkdownRenderer({ content, isEditing, onToggleEdit }) {
  const [showPreview, setShowPreview] = useState(false);

  if (isEditing) {
    return (
      <div className="markdown-editor">
        <div className="markdown-toolbar">
          <button 
            type="button"
            onClick={() => setShowPreview(!showPreview)}
            className="preview-btn"
          >
            <Eye size={14} />
            {showPreview ? 'Edit' : 'Preview'}
          </button>
        </div>
        
        {showPreview ? (
          <div 
            className="markdown-preview"
            dangerouslySetInnerHTML={{ __html: parseMarkdown(content) }}
          />
        ) : (
          <div className="markdown-help">
            <small>
              Markdown tips: **bold**, *italic*, [link](url), - list item
            </small>
          </div>
        )}
      </div>
    );
  }

  return (
    <div 
      className="markdown-content"
      dangerouslySetInnerHTML={{ __html: parseMarkdown(content) }}
    />
  );
}

export default MarkdownRenderer;