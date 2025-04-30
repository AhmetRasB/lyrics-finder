import React, { useEffect, useRef } from 'react';
import './Background.css';

const ARTISTS = [
  'Eminem', 'Adele', 'Ed Sheeran', 'Taylor Swift', 'Drake',
  'Rihanna', 'The Weeknd', 'Beyoncé', 'Lady Gaga', 'Bruno Mars',
  'Coldplay', 'Justin Bieber', 'Ariana Grande', 'Post Malone'
];

const Background = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    class Note {
      constructor() {
        this.reset();
      }

      reset() {
        this.size = Math.random() * 5 + 3; // Increased size
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + 10;
        this.speed = Math.random() * 1.5 + 0.5;
        this.angle = Math.random() * 360;
        this.rotationSpeed = (Math.random() - 0.5) * 2;
        this.opacity = Math.random() * 0.5 + 0.2;
        this.noteType = Math.floor(Math.random() * 4);
      }

      update() {
        this.y -= this.speed;
        this.x += Math.sin(this.angle * Math.PI / 180) * 0.5;
        this.angle += this.rotationSpeed;

        if (this.y < -10) {
          this.reset();
        }
      }

      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle * Math.PI / 180);
        ctx.globalAlpha = this.opacity;
        
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        ctx.strokeStyle = isDark ? '#FFFFFF' : 'var(--primary-color)';
        ctx.fillStyle = isDark ? '#FFFFFF' : 'var(--primary-color)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        
        switch(this.noteType) {
          case 0: // Quarter note
            ctx.arc(0, 0, this.size, 0, 2 * Math.PI);
            ctx.fill();
            ctx.beginPath();
            ctx.moveTo(this.size, 0);
            ctx.lineTo(this.size, -this.size * 4);
            ctx.stroke();
            break;
          case 1: // Eighth note
            ctx.arc(0, 0, this.size, 0, 2 * Math.PI);
            ctx.fill();
            ctx.beginPath();
            ctx.moveTo(this.size, 0);
            ctx.lineTo(this.size, -this.size * 4);
            ctx.lineTo(this.size * 2, -this.size * 4);
            ctx.stroke();
            break;
          case 2: // Whole note
            ctx.arc(0, 0, this.size, 0, 2 * Math.PI);
            ctx.stroke();
            break;
          case 3: // Half note
            ctx.arc(0, 0, this.size, 0, 2 * Math.PI);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(this.size, 0);
            ctx.lineTo(this.size, -this.size * 4);
            ctx.stroke();
            break;
          default:
            break;
        }
        
        ctx.restore();
      }
    }

    class ArtistText {
      constructor() {
        this.reset();
      }

      reset() {
        this.text = ARTISTS[Math.floor(Math.random() * ARTISTS.length)];
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + 30;
        this.speed = Math.random() * 1 + 0.3;
        this.opacity = Math.random() * 0.3 + 0.1;
        this.size = Math.random() * 10 + 14;
      }

      update() {
        this.y -= this.speed;
        this.x += Math.sin(this.y / 50) * 0.5;

        if (this.y < -30) {
          this.reset();
        }
      }

      draw() {
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.font = `${this.size}px Inter`;
        ctx.fillStyle = isDark ? '#FFFFFF' : 'var(--primary-color)';
        ctx.fillText(this.text, this.x, this.y);
        ctx.restore();
      }
    }

    // Create more notes and add artist texts
    const notes = Array(50).fill().map(() => new Note());
    const artistTexts = Array(15).fill().map(() => new ArtistText());

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      notes.forEach(note => {
        note.update();
        note.draw();
      });

      artistTexts.forEach(text => {
        text.update();
        text.draw();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', setCanvasSize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="background-canvas" />;
};

export default Background; 