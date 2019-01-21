import React from 'react';

const connectStyle = {
  margin: 'auto',
  width: '90%',
  padding: '15px',
  margin: '15px',
  borderRadius: '10px',
  fontSize: '20px',
}

export default ({ onClick }) => (
  <div >
    <h1 style={{ textAlign: 'center' }}>Connect your vehicle</h1>
    <button style={connectStyle} onClick={onClick}>Connect</button>
  </div>
);
