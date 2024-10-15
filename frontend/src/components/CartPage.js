import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CartPage() {
  const [cart, setCart] = useState(null);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/cart/', {
          headers: { Authorization: `Token ${localStorage.getItem('token')}` }
        });
        console.log(response.data);
        setCart(response.data);
      } catch (error) {
        console.error('Error fetching cart:', error);
      }
    };
    fetchCart();
  }, []);

  if (!cart) return <div style={styles.loading}>Loading...</div>;

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Your Cart</h2>
      {cart.beats && cart.beats.length > 0 ? (
        cart.beats.map((beat) => (
          <div key={beat.id} style={styles.beatItem}>
            <h3 style={styles.beatTitle}>{beat.title}</h3>
            <p style={styles.beatInfo}>Genre: {beat.genre}</p>
            <p style={styles.beatInfo}>BPM: {beat.bpm}</p>
          </div>
        ))
      ) : (
        <p style={styles.emptyCart}>Your cart is empty.</p>
      )}
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: '#1e1e1e',
    color: '#ffffff',
    padding: '20px',
    borderRadius: '8px',
    maxWidth: '800px',
    margin: '0 auto',
  },
  header: {
    color: '#ffffff',
    borderBottom: '2px solid #3a3a3a',
    paddingBottom: '10px',
    marginBottom: '20px',
  },
  beatItem: {
    backgroundColor: '#2a2a2a',
    padding: '15px',
    marginBottom: '15px',
    borderRadius: '5px',
  },
  beatTitle: {
    color: '#4a90e2',
    marginBottom: '10px',
  },
  beatInfo: {
    color: '#cccccc',
    margin: '5px 0',
  },
  emptyCart: {
    color: '#cccccc',
    fontStyle: 'italic',
  },
  loading: {
    color: '#ffffff',
    textAlign: 'center',
    fontSize: '18px',
    marginTop: '50px',
  },
};

export default CartPage;