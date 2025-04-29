import React, { useState } from 'react';
import './LyricsForm.css';

const LyricsForm = () => {
  const [artist, setArtist] = useState('');
  const [title, setTitle] = useState('');
  const [lyrics, setLyrics] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copySuccess, setCopySuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setLyrics('');
    setCopySuccess(false);

    try {
      const response = await fetch(`https://api.lyrics.ovh/v1/${artist}/${title}`);
      const data = await response.json();

      if (data.lyrics) {
        setLyrics(data.lyrics);
      } else {
        setError('No lyrics found for this song.');
      }
    } catch (err) {
      setError('Failed to fetch lyrics. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopyClick = async () => {
    try {
      await navigator.clipboard.writeText(lyrics);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000); // Reset after 2 seconds
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  return (
    <div className="lyrics-form-container">
      <form onSubmit={handleSubmit} className="lyrics-form">
        <div className="form-group">
          <label htmlFor="artist">Artist Name:</label>
          <input
            type="text"
            id="artist"
            value={artist}
            onChange={(e) => setArtist(e.target.value)}
            required
            placeholder="Enter artist name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="title">Song Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder="Enter song title"
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Searching...' : 'Find Lyrics'}
        </button>
      </form>

      {error && <div className="error-message">{error}</div>}
      
      {lyrics && (
        <div className="lyrics-container">
          <div className="lyrics-header">
            <h3>Lyrics:</h3>
            <button 
              className="copy-button"
              onClick={handleCopyClick}
              title="Copy lyrics to clipboard"
            >
              {copySuccess ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <pre className="lyrics-text">{lyrics}</pre>
        </div>
      )}
    </div>
  );
};

export default LyricsForm; 