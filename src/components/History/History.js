import React from 'react';
import './History.css';

const History = ({ history, onSelect, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="history-sidebar">
      <div className="history-header">
        <h2>Search History</h2>
        <button onClick={onClose} className="close-button" title="Close history">
          ✕
        </button>
      </div>
      {history.length === 0 ? (
        <p className="no-history">No previous searches</p>
      ) : (
        <ul className="history-list">
          {history.map((item, index) => (
            <li key={index} onClick={() => onSelect(item)} className="history-item">
              <div className="history-item-content">
                <span className="artist">{item.artist}</span>
                <span className="separator">-</span>
                <span className="song">{item.songTitle}</span>
              </div>
              <span className="timestamp">{new Date(item.timestamp).toLocaleTimeString()}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default History; 