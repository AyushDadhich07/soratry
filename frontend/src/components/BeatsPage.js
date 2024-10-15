import React, { useState, useEffect } from 'react';
import axios from 'axios';

function BeatsPage() {
  const [beats, setBeats] = useState([]);
  const [currentlyPlaying, setCurrentlyPlaying] = useState(null);

  useEffect(() => {
    fetchBeats();
  }, []);

  const fetchBeats = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/beats/', {
        headers: { Authorization: `Token ${localStorage.getItem('token')}` }
      });
      setBeats(response.data);
    } catch (error) {
      console.error('Error fetching beats:', error);
    }
  };

  const playBeat = (beatId) => {
    if (currentlyPlaying) {
      currentlyPlaying.pause();
      currentlyPlaying.currentTime = 0;
    }
    const audio = new Audio(`http://localhost:8000/api/beats/${beatId}/stream/`);
    audio.play();
    setCurrentlyPlaying(audio);
  };

  const stopBeat = () => {
    if (currentlyPlaying) {
      currentlyPlaying.pause();
      currentlyPlaying.currentTime = 0;
      setCurrentlyPlaying(null);
    }
  };

  const addToCart = async (beatId) => {
    try {
      await axios.put('http://localhost:8000/api/cart/', { beat_id: beatId }, {
        headers: { Authorization: `Token ${localStorage.getItem('token')}` }
      });
      alert('Beat added to cart!');
    } catch (error) {
      console.error('Error adding beat to cart:', error);
    }
  };

  return (
    <div style={{ padding: '2rem', backgroundColor: '#000', minHeight: '100vh', color: 'white' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>Explore Beats</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '2rem' }}>
        {beats.map((beat) => (
          <div key={beat.id} style={{ backgroundColor: '#1a1a1a', padding: '1rem', borderRadius: '8px' }}>
            <h3>{beat.title}</h3>
            <p>Genre: {beat.genre}</p>
            <p>BPM: {beat.bpm}</p>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button onClick={() => playBeat(beat.id)} style={{ backgroundColor: '#ff6600',
                color: 'white',
                border: 'none',
                padding: '0.5rem 1rem',
                borderRadius: '4px',
                cursor: 'pointer'
              }}>
                Play
              </button>
              <button onClick={stopBeat} style={{ backgroundColor: '#cc0000',
                color: 'white',
                border: 'none',
                padding: '0.5rem 1rem',
                borderRadius: '4px',
                cursor: 'pointer'
              }}>
                Stop
              </button>
              <button onClick={() => addToCart(beat.id)} style={{ backgroundColor: '#00cc00',
                color: 'white',
                border: 'none',
                padding: '0.5rem 1rem',
                borderRadius: '4px',
                cursor: 'pointer'
              }}>
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BeatsPage;