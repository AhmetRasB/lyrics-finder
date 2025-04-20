import React from 'react';
import './HelpModal.css';

const HelpModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>How to Use Lyrics Finder</h2>
        <p>
          Just type the artist name and song title into the input fields, then click on "Find Lyrics".
          If lyrics are found, they will appear below. Otherwise, you will see a "Lyrics not found" message.
        </p>
        <button onClick={onClose} className="close-btn">Close</button>
      </div>
    </div>
  );
};

export default HelpModal;
