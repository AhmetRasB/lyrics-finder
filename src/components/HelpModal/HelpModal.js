import React from 'react';
import './HelpModal.css';

const HelpModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>How to Use</h2>
          <button onClick={onClose} className="close-button" title="Close help">
            ✕
          </button>
        </div>
        <div className="modal-body">
          <h3>Finding Lyrics</h3>
          <p>1. Enter the artist name in the first input field</p>
          <p>2. Enter the song title in the second input field</p>
          <p>3. Click "Find Lyrics" to search</p>

          <h3>Features</h3>
          <p>• View your search history by clicking the ⌚ button</p>
          <p>• Switch between dark and light themes</p>
          <p>• Copy lyrics to clipboard with the copy button</p>
          <p>• Click on any history item to quickly search again</p>
        </div>
      </div>
    </div>
  );
};

export default HelpModal; 