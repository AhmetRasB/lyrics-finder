import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './LyricsForm.css';
import './HelpModal.css';
import logo from '../src/logo.png';

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

const LyricsForm = () => {
  const { register, handleSubmit } = useForm();
  const [lyrics, setLyrics] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [copied, setCopied] = useState(false); // New state for copy feedback

  const toastifyError = () => {
    toast.error('Lyrics not found!', {
      position: 'bottom-right',
      autoClose: 3000,
      pauseOnHover: true,
      draggable: true
    });
  };

  const toastifyCopied = () => {
    toast.success('Lyrics copied to clipboard!', {
      position: 'bottom-right',
      autoClose: 2000,
      pauseOnHover: true,
      draggable: true
    });
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(lyrics);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
    toastifyCopied();
  };

  const onSubmit = async (data) => {
    const { artist, title } = data;
    setLoading(true);
    setLyrics('');
    setError(false);

    try {
      const res = await fetch(`https://api.lyrics.ovh/v1/${artist}/${title}`);
      const json = await res.json();

      if (json.lyrics) {
        setLyrics(json.lyrics);
      } else {
        setError(true);
        toastifyError();
      }
    } catch (err) {
      console.error(err);
      setError(true);
      toastifyError();
    }
    setLoading(false);
  };

  return (
    <div className="container">
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <img src={logo} alt="Lyrics Finder Logo" className="logo" />
      </div>

      <HelpModal isOpen={isHelpOpen} onClose={() => setIsHelpOpen(false)} />

      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <div className="input-group floating">
          <input
            id="artist"
            type="text"
            placeholder=" "
            className="formInput"
            {...register('artist', { required: true })}
          />
          <label htmlFor="artist">Artist</label>
        </div>

        <div className="input-group floating">
          <input
            id="title"
            type="text"
            placeholder=" "
            className="formInput"
            {...register('title', { required: true })}
          />
          <label htmlFor="title">Song Title</label>
        </div>

        <button className="submit-btn" type="submit" disabled={loading}>
          {loading ? 'Searching...' : 'Find Lyrics'}
        </button>

        <div className="help-button-container">
          <button
            type="button"
            className="help-btn"
            onClick={() => setIsHelpOpen(true)}
            title="How to use?"
          >
            ❓
          </button>
        </div>
      </form>

      <div className="lyrics-container">
        {lyrics && (
          <button className="copy-btn" onClick={handleCopy} title="Copy lyrics">
            {copied ? '✅ Copied!' : '📋 Copy'}
          </button>
        )}

        {loading ? (
          <span>Loading...</span>
        ) : error ? (
          <span style={{ color: 'red' }}>Lyrics not found.</span>
        ) : lyrics ? (
          <pre>{lyrics}</pre>
        ) : (
          'Lyrics will appear here.'
        )}
      </div>

      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        pauseOnHover
        draggable
        containerId="A"
      />

      <footer className="footer">
        Made with 💚 by <a href="https://github.com/AhmetRasB" target="_blank" rel="noopener noreferrer">AhmetRasB</a>
        &nbsp;|&nbsp;
        <a href="https://www.linkedin.com/in/ahmetrasimbeyhan" target="_blank" rel="noopener noreferrer">LinkedIn</a>
      </footer>
    </div>
  );
};

export default LyricsForm;
