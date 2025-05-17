import React from 'react';
import qrCode from "../assets/qr-code.png";
import './QrCodeComponent.css';

function QrCodeComponent({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="qr-code-overlay">
      <div className="qr-code-backdrop" onClick={onClose}></div>
      <div className="qr-code-modal">
        <div className="qr-code-card">
          <button className="qr-code-close-btn" onClick={onClose}>×</button>
          <h2>Scan QR Code</h2>
          <div className="qr-code-box">
            <img src={qrCode} alt="QR Code" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default QrCodeComponent;