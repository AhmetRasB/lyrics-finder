import React, { useState, useEffect } from 'react';
import { useTheme } from './context/ThemeContext';
import History from './components/History/History';
import HelpModal from './components/HelpModal/HelpModal';
import Background from './components/Background/Background';
import Toast from './components/Toast';
import logo from './assets/images/logo.png';
import './styles/globals.css';

function App() {
  const { isDark, toggleTheme } = useTheme();
  const [artist, setArtist] = useState('');
  const [songTitle, setSongTitle] = useState('');
  const [lyrics, setLyrics] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const [isCopied, setIsCopied] = useState(false);
  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem('searchHistory');
    return saved ? JSON.parse(saved) : [];
  });
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [isShaking, setIsShaking] = useState(false);

  useEffect(() => {
    localStorage.setItem('searchHistory', JSON.stringify(history));
  }, [history]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setLyrics('');
    setIsShaking(true);
    
    try {
      const response = await fetch(`https://api.lyrics.ovh/v1/${artist}/${songTitle}`);
      const data = await response.json();

      if (data.lyrics) {
        setLyrics(data.lyrics);
        const newSearch = {
          artist,
          songTitle,
          timestamp: new Date().toISOString()
        };
        setHistory(prev => [newSearch, ...prev].slice(0, 10));
        setIsShaking(false);
      } else {
        setIsShaking(true);
        setTimeout(() => setIsShaking(false), 500);
        setToast({ message: 'Lyrics not found', type: 'error' });
      }
    } catch (error) {
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
      setToast({ message: 'An error occurred while fetching lyrics', type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleHistorySelect = async (item) => {
    setArtist(item.artist);
    setSongTitle(item.songTitle);
    setIsHistoryOpen(false);
    
    setIsLoading(true);
    setLyrics('');
    
    try {
      const response = await fetch(`https://api.lyrics.ovh/v1/${item.artist}/${item.songTitle}`);
      const data = await response.json();

      if (data.lyrics) {
        setLyrics(data.lyrics);
        setIsShaking(false);
      } else {
        setIsShaking(true);
        setTimeout(() => setIsShaking(false), 500);
        setToast({ message: 'Lyrics not found', type: 'error' });
      }
    } catch (error) {
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
      setToast({ message: 'An error occurred while fetching lyrics', type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyLyrics = async () => {
    try {
      await navigator.clipboard.writeText(lyrics);
      setIsCopied(true);
      setToast({ message: 'Lyrics copied to clipboard!', type: 'success' });
      setTimeout(() => setIsCopied(false), 2000);
    } catch (error) {
      setToast({ message: 'Failed to copy lyrics', type: 'error' });
    }
  };

  return (
    <>
      <Background />
      <div className={`container ${isShaking ? 'shake' : ''}`}>
        <header className="header">
          <div className="logo-container">
            <img src={logo} alt="Lyrics Finder" className="logo" />
          </div>
          <div className="header-buttons">
            <button 
              onClick={() => setIsHelpOpen(true)} 
              className="header-btn"
              title="View help"
            >
              ?
            </button>
            <button 
              onClick={() => setIsHistoryOpen(!isHistoryOpen)} 
              className="header-btn"
              title="View search history"
            >
              {isHistoryOpen ? '✕' : '⌚'}
            </button>
            <button 
              onClick={toggleTheme} 
              className="header-btn"
              title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDark ? '☀️' : '🌙'}
            </button>
          </div>
        </header>

        <form onSubmit={handleSubmit} className="search-form">
          <div className="input-group">
            <label htmlFor="artist">Artist</label>
            <input
              type="text"
              id="artist"
              value={artist}
              onChange={(e) => setArtist(e.target.value)}
              placeholder="Enter artist name"
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="songTitle">Song Title</label>
            <input
              type="text"
              id="songTitle"
              value={songTitle}
              onChange={(e) => setSongTitle(e.target.value)}
              placeholder="Enter song title"
              required
            />
          </div>

          <button type="submit" className="find-lyrics-btn" disabled={isLoading}>
            {isLoading ? (
              <>
                Searching...
                <div className="loading-spinner" />
              </>
            ) : (
              'Find Lyrics'
            )}
          </button>
        </form>

        {lyrics && (
          <div className="lyrics-container">
            {lyrics}
            <button
              onClick={handleCopyLyrics}
              className="copy-btn"
            >
              {isCopied ? 'Copied!' : 'Copy'}
            </button>
          </div>
        )}

        <History 
          history={history} 
          onSelect={handleHistorySelect} 
          isOpen={isHistoryOpen}
          onClose={() => setIsHistoryOpen(false)}
        />

        <HelpModal 
          isOpen={isHelpOpen}
          onClose={() => setIsHelpOpen(false)}
        />

        <footer className="footer">
          Made with ❤️ by <a href="https://github.com/AhmetRasB" target="_blank" rel="noopener noreferrer">AhmetRasB</a>
        </footer>

        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}
      </div>
    </>
  );
}

export default App;
