import React from 'react';
import { Link } from 'react-router-dom';

function LandingPage() {
  return (
    <div style={{ 
      padding: '2rem', 
      backgroundColor: '#000', 
      minHeight: '100vh', 
      color: 'white',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <h1>Welcome to SORA-TRY</h1>
      <p>Explore and purchase beats from talented producers</p>
      <div style={{ marginTop: '2rem' }}>
        <Link to="/login" style={{
          backgroundColor: '#ff6600',
          color: 'white',
          padding: '0.5rem 1rem',
          borderRadius: '4px',
          textDecoration: 'none',
          marginRight: '1rem'
        }}>
          Login
        </Link>
        <Link to="/register" style={{
          backgroundColor: '#4CAF50',
          color: 'white',
          padding: '0.5rem 1rem',
          borderRadius: '4px',
          textDecoration: 'none'
        }}>
          Register
        </Link>
      </div>
    </div>
  );
}

export default LandingPage;