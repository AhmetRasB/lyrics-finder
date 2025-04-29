import React, { useState } from 'react';
import './App.css';
import LyricsForm from './components/LyricsForm/LyricsForm';
import HelpModal from './components/HelpModal/HelpModal';

function App() {
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Lyrics Finder</h1>
        <button className="help-button" onClick={() => setIsHelpOpen(true)}>
          Help
        </button>
      </header>
      <main>
        <LyricsForm />
      </main>
      <HelpModal isOpen={isHelpOpen} onClose={() => setIsHelpOpen(false)} />
    </div>
  );
}

export default App;
