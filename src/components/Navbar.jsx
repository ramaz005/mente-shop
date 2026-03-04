import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useState } from 'react';

export default function Navbar() {
  const { count } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const links = [
    { to: '/catalog', label: 'КАТАЛОГ' },
    { to: '/about', label: 'О БРЕНДЕ' },
    { to: '/cart', label: `КОРЗИНА${count > 0 ? ` (${count})` : ''}` }
  ];

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
      <style>{`
        .nav-link {
          position: relative;
          font-family: 'Anonymous Pro', monospace;
          font-size: 11px;
          color: var(--espresso);
          text-decoration: none;
          letter-spacing: 2px;
          padding-bottom: 4px;
          transition: color 0.3s ease;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 1px;
          background-color: var(--spanish-sun);
          transition: width 0.3s ease;
        }
        .nav-link:hover::after,
        .nav-link.active::after {
          width: 100%;
        }
        .nav-link.active {
          color: var(--spanish-sun);
        }
        .nav-link:hover {
          color: var(--spanish-sun);
        }
        .desktop-menu {
          display: flex;
          gap: 32px;
          align-items: center;
        }
        .burger-btn {
          display: none;
          background: none;
          border: none;
          cursor: pointer;
          flex-direction: column;
          gap: 5px;
          padding: 4px;
        }
        @media (max-width: 768px) {
          .desktop-menu { display: none !important; }
          .burger-btn { display: flex !important; }
        }
      `}</style>

      {/* Слева */}
      <span style={{
        fontFamily: 'Anonymous Pro',
        fontSize: '11px',
        color: 'var(--espresso)',
        letterSpacing: '2px',
        opacity: 0.5
      }}>
        mind muscle connection.
      </span>

      {/* Логотип */}
      <Link to="/" style={{
        fontFamily: 'Arial Black',
        fontSize: '24px',
        color: 'var(--espresso)',
        textDecoration: 'none',
        letterSpacing: '4px',
        transition: 'color 0.3s'
      }}
      onMouseEnter={e => e.target.style.color = 'var(--spanish-sun)'}
      onMouseLeave={e => e.target.style.color = 'var(--espresso)'}
      >
        MENTE
      </Link>

      {/* Десктоп меню */}
      <div className="desktop-menu">
        {links.map(link => (
          <Link
            key={link.to}
            to={link.to}
            className={`nav-link${location.pathname === link.to ? ' active' : ''}`}
          >
            {link.label}
          </Link>
        ))}
      </div>

      {/* Бургер */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="burger-btn"
      >
        {[0, 1, 2].map(i => (
          <div key={i} style={{
            width: '24px',
            height: '2px',
            backgroundColor: 'var(--espresso)',
            transition: 'all 0.3s'
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
          zIndex: 99,
          animation: 'slideDown 0.3s ease'
        }}>
          <style>{`
            @keyframes slideDown {
              from { opacity: 0; transform: translateY(-10px); }
              to { opacity: 1; transform: translateY(0); }
            }
          `}</style>
          {links.map(link => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMenuOpen(false)}
              style={{
                fontFamily: 'Anonymous Pro',
                fontSize: '14px',
                color: location.pathname === link.to ? 'var(--spanish-sun)' : 'var(--espresso)',
                textDecoration: 'none',
                letterSpacing: '3px',
                padding: '8px 0',
                borderBottom: '1px solid var(--blush)',
                transition: 'color 0.3s'
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}