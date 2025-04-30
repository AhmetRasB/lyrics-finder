import React, { useEffect } from 'react';
import '../styles/Toast.css';

const Toast = ({ message, type = 'error', onClose, duration = 3000 }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div className={`toast toast-${type}`}>
      <span>{message}</span>
      <button onClick={onClose} className="toast-close">
        ×
      </button>
    </div>
  );
};

export default Toast; 