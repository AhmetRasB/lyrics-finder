import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './LyricsForm.css'; // Aşağıdaki CSS dosyasını ayrı olarak oluştur

const LyricsForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [lyrics, setLyrics] = useState('');
  const [loading, setLoading] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (prefersDark) {
      document.body.classList.add('dark');
      setIsDark(true);
    }
  }, []);

  const toggleTheme = () => {
    document.body.classList.toggle('dark');
    setIsDark(!isDark);
  };

  const toastifyError = () => {
    toast.error('Lyrics not found!', {
      position: 'bottom-right',
      autoClose: 3000,
      pauseOnHover: true,
      draggable: true
    });
  };

  const onSubmit = async (data) => {
    const { artist, title } = data;
    setLoading(true);
    try {
      const res = await fetch(`https://api.lyrics.ovh/v1/${artist}/${title}`);
      const json = await res.json();

      if (json.lyrics) {
        setLyrics(json.lyrics);
      } else {
        setLyrics('');
        toastifyError();
      }
    } catch (err) {
      console.error(err);
      toastifyError();
    }
    setLoading(false);
  };

  return (
    <div className="container">
      <button onClick={toggleTheme} className="theme-toggle">
        {isDark ? '☀️ Light Mode' : '🌙 Dark Mode'}
      </button>

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
      </form>

      <div className="lyrics-container">
        {lyrics ? <pre>{lyrics}</pre> : 'Lyrics will appear here.'}
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
