import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div style={{
      minHeight: '80vh',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      backgroundColor: '#fff', gap: '24px', textAlign: 'center',
      padding: '40px'
    }}>
      <p style={{
        fontFamily: 'Anonymous Pro, monospace',
        fontSize: '11px', letterSpacing: '8px', opacity: 0.3
      }}>404</p>
      <h1 style={{
        fontFamily: "'Druk Wide Cyr', 'Arial Black', sans-serif",
        fontSize: 'clamp(32px, 6vw, 64px)',
        letterSpacing: '4px', color: '#000'
      }}>СТРАНИЦА НЕ НАЙДЕНА</h1>
      <p style={{
        fontFamily: 'Anonymous Pro, monospace',
        fontSize: '14px', color: '#7F7F7F',
        letterSpacing: '1px', maxWidth: '400px', lineHeight: '1.8'
      }}>
        Страница была удалена или никогда не существовала.
      </p>
      <Link to="/catalog" style={{
        padding: '16px 48px',
        background: '#2F2F2F', color: '#fff',
        fontFamily: 'Anonymous Pro, monospace',
        fontSize: '13px', letterSpacing: '3px',
        textDecoration: 'none',
        transition: 'background 0.2s',
        marginTop: '8px'
      }}
        onMouseEnter={e => e.currentTarget.style.background = '#AA0607'}
        onMouseLeave={e => e.currentTarget.style.background = '#2F2F2F'}
      >
        В КАТАЛОГ
      </Link>
    </div>
  );
}
