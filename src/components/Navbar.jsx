import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useState } from 'react';

export default function Navbar() {
  const { count } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav style={{
      backgroundColor: 'var(--bone)',
      borderBottom: '1px solid var(--espresso)',
      padding: '16px 24px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      position: 'sticky',
      top: 0,
      zIndex: 100
    }}>
        
    <span style={{ 
      fontSize: '11px', 
      fontFamily: 'Anonymous Pro', 
      color: 'var(--espresso)',
      letterSpacing: '2px'
    }}>
      mind muscle connection.
    </span>

      {/* Логотип */}
      <Link to="/" style={{
        fontFamily: 'Arial Black',
        fontSize: '24px',
        fontWeight: '900',
        color: 'var(--espresso)',
        textDecoration: 'none',
        letterSpacing: '4px'
      }}>
        MENTE
      </Link>

      {/* Десктоп меню */}
      <div style={{
        display: 'flex',
        gap: '32px',
        alignItems: 'center'
      }} className="desktop-menu">
        {[
          { to: '/catalog', label: 'КАТАЛОГ' },
          { to: '/about', label: 'О БРЕНДЕ' },
          { to: '/cart', label: `КОРЗИНА${count > 0 ? ` (${count})` : ''}` }
        ].map(link => (
          <Link key={link.to} to={link.to} style={{
            fontFamily: 'Anonymous Pro',
            fontSize: '11px',
            color: 'var(--espresso)',
            textDecoration: 'none',
            letterSpacing: '2px'
          }}>
            {link.label}
          </Link>
        ))}
      </div>

      {/* Мобильная кнопка */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        style={{
          display: 'none',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          flexDirection: 'column',
          gap: '5px',
          padding: '4px'
        }}
        className="burger-btn"
      >
        {[0,1,2].map(i => (
          <div key={i} style={{
            width: '24px',
            height: '2px',
            backgroundColor: 'var(--espresso)',
            transition: 'all 0.3s',
            transform: menuOpen
              ? i === 0 ? 'rotate(45deg) translate(5px, 5px)'
              : i === 1 ? 'opacity: 0'
              : 'rotate(-45deg) translate(5px, -5px)'
              : 'none'
          }} />
        ))}
      </button>

      {/* Мобильное меню */}
      {menuOpen && (
        <div style={{
          position: 'fixed',
          top: '57px',
          left: 0,
          right: 0,
          backgroundColor: 'var(--bone)',
          borderBottom: '1px solid var(--espresso)',
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
          zIndex: 99
        }} className="mobile-menu">
          {[
            { to: '/catalog', label: 'КАТАЛОГ' },
            { to: '/about', label: 'О БРЕНДЕ' },
            { to: '/cart', label: `КОРЗИНА${count > 0 ? ` (${count})` : ''}` }
          ].map(link => (
            <Link key={link.to} to={link.to}
              onClick={() => setMenuOpen(false)}
              style={{
                fontFamily: 'Anonymous Pro',
                fontSize: '14px',
                color: 'var(--espresso)',
                textDecoration: 'none',
                letterSpacing: '3px',
                padding: '8px 0',
                borderBottom: '1px solid var(--blush)'
              }}>
              {link.label}
            </Link>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-menu { display: none !important; }
          .burger-btn { display: flex !important; }
        }
      `}</style>
    </nav>
  );
}