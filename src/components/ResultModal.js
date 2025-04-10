// src/components/ResultModal.js
import React from 'react';
import './ResultModal.css';

const ResultModal = ({ result, onRestart }) => {
  if (!result) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h1>{result}</h1>
        <button style={{padding: "10px", backgroundColor: "green", borderRadius: "5px", color: "white", fontWeight: "700"}} onClick={onRestart}>Play Again</button>
      </div>
    </div>
  );
};

export default ResultModal;
