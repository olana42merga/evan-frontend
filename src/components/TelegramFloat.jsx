import React from 'react';
import { FaTelegram } from 'react-icons/fa';

const TELEGRAM_URL = 'https://t.me/+iXVyakK4-3lhYzc0';

export default function TelegramFloat() {
  return (
    <a
      href={TELEGRAM_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="position-fixed d-flex align-items-center justify-content-center text-decoration-none shadow-lg"
      style={{
        bottom: '25px',
        right: '25px',
        width: '60px',
        height: '60px',
        borderRadius: '50%',
        background: 'linear-gradient(135deg, #0088cc, #00bcd4)',
        color: 'white',
        zIndex: 9999,
        transition: 'all 0.3s ease'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.15) rotate(5deg)';
        e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 136, 204, 0.6)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
        e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.2)';
      }}
      title="Join our Telegram group"
    >
      <FaTelegram size={30} />
    </a>
  );
}
