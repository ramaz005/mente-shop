import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useState } from 'react';

export default function Navbar() {
  const { count } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const menuLinks = [
    { to: '/catalog', label: 'КАТАЛОГ' },
    { to: '/cart', label: 'КОРЗИНА' },
  ];

  const scrollToInfo = () => {
    setMenuOpen(false);
    setTimeout(() => {
      document.getElementById('info')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/catalog?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <>
      <style>{`
        .navbar {
          position: sticky;
          top: 0;
          z-index: 100;
          background: #fff;
          border-bottom: 1px solid #000;
          height: 80px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 40px;
        }
        .navbar-center {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          text-align: center;
        }
        .navbar-logo {
          font-family: 'Druk Wide Cyr', 'Arial Black', sans-serif;
          font-size: 28px;
          font-weight: 500;
          color: #000;
          text-decoration: none;
          letter-spacing: 2px;
          line-height: 1;
          display: block;
          transition: opacity 0.2s;
        }
        .navbar-logo:hover { opacity: 0.6; }
        .navbar-tagline {
          font-family: 'Anonymous Pro', monospace;
          font-size: 8px;
          font-weight: 400;
          color: #000;
          letter-spacing: 1.5px;
          margin-top: 3px;
          opacity: 0.7;
        }
        .navbar-right {
          display: flex;
          align-items: center;
          gap: 20px;
        }
        .nav-icon-btn {
          background: none;
          border: none;
          cursor: pointer;
          padding: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          color: #000;
          text-decoration: none;
          transition: opacity 0.2s;
        }
        .nav-icon-btn:hover { opacity: 0.5; }
        .cart-badge {
          position: absolute;
          top: -4px;
          right: -6px;
          background: #2F2F2F;
          color: #fff;
          font-family: 'Anonymous Pro', monospace;
          font-size: 9px;
          width: 15px;
          height: 15px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .burger-btn {
          background: none;
          border: none;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          gap: 5px;
          padding: 4px;
          transition: opacity 0.2s;
        }
        .burger-btn:hover { opacity: 0.5; }
        .burger-line {
          display: block;
          width: 20px !important;
          min-width: 20px !important;
          max-width: 20px !important;
          height: 1px !important;
          min-height: 1px !important;
          max-height: 1px !important;
          background: #000;
          flex-shrink: 0;
          box-sizing: content-box;
          padding: 0 !important;
          margin: 0 !important;
          line-height: 0 !important;
          font-size: 0 !important;
          overflow: hidden;
          border: none;
          border-radius: 0;
        }
        .search-overlay {
          position: fixed;
          top: 80px; left: 0; right: 0;
          background: #fff;
          border-bottom: 1px solid #000;
          padding: 20px 40px;
          z-index: 99;
          animation: slideDown 0.2s ease;
        }
        .search-form {
          display: flex;
          max-width: 600px;
          margin: 0 auto;
          border: 1px solid #000;
        }
        .search-input {
          flex: 1;
          padding: 14px 20px;
          border: none;
          font-family: 'Anonymous Pro', monospace;
          font-size: 16px;
          outline: none;
          color: #000;
        }
        .search-submit {
          padding: 14px 20px;
          background: #000;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .search-submit:hover { background: #AA0607; }
        .mobile-menu {
          position: fixed;
          top: 0; left: 0;
          width: 100%; height: 100%;
          background: #fff;
          z-index: 200;
          display: flex;
          flex-direction: column;
          padding: 40px;
          animation: fadeIn 0.25s ease;
        }
        .mobile-menu-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 48px;
        }
        .mobile-menu-link {
          font-family: 'Anonymous Pro', monospace;
          font-size: 24px;
          color: #000;
          text-decoration: none;
          letter-spacing: 3px;
          border-bottom: 1px solid #eee;
          padding: 20px 0;
          display: block;
          transition: opacity 0.2s;
        }
        .mobile-menu-link:hover { opacity: 0.5; }
        .close-btn {
          background: none;
          border: none;
          cursor: pointer;
          font-size: 20px;
          color: #000;
          padding: 0;
          line-height: 1;
        }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @media (max-width: 768px) {
          .navbar { padding: 0 20px; }
          .navbar-logo { font-size: 22px; }
        }
      `}</style>

      <nav className="navbar">
        <button className="burger-btn" onClick={() => setMenuOpen(true)}>
          <span className="burger-line" />
          <span className="burger-line" />
          <span className="burger-line" />
        </button>

        <div className="navbar-center">
          <Link to="/catalog" className="navbar-logo">MENTE</Link>
          <div className="navbar-tagline">born in Moscow — inspired by Spain.</div>
        </div>

        <div className="navbar-right">
          <button className="nav-icon-btn" onClick={() => setSearchOpen(!searchOpen)}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="1.5" strokeLinecap="round">
              <circle cx="11" cy="11" r="7"/>
              <line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
          </button>

          <Link to="/cart" className="nav-icon-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 0 1-8 0"/>
            </svg>
            {count > 0 && <span className="cart-badge">{count}</span>}
          </Link>
        </div>
      </nav>

      {searchOpen && (
        <div className="search-overlay">
          <form className="search-form" onSubmit={handleSearch}>
            <input
              className="search-input"
              placeholder="Поиск по каталогу..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              autoFocus
            />
            <button type="submit" className="search-submit">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.5">
                <circle cx="11" cy="11" r="7"/>
                <line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
            </button>
          </form>
        </div>
      )}

      {menuOpen && (
        <div className="mobile-menu">
          <div className="mobile-menu-header">
            <Link to="/catalog" style={{
              fontFamily: "'Druk Wide Cyr', 'Arial Black', sans-serif",
              fontSize: '22px', color: '#000',
              textDecoration: 'none', letterSpacing: '2px'
            }} onClick={() => setMenuOpen(false)}>
              MENTE
            </Link>
            <button className="close-btn" onClick={() => setMenuOpen(false)}>✕</button>
          </div>
          {menuLinks.map(link => (
            <Link key={link.to} to={link.to} className="mobile-menu-link" onClick={() => setMenuOpen(false)}>
              {link.label}
            </Link>
          ))}
          <button className="mobile-menu-link" onClick={scrollToInfo} style={{ background: 'none', border: 'none', textAlign: 'left', cursor: 'pointer', padding: '20px 0' }}>
            ИНФОРМАЦИЯ
          </button>
        </div>
      )}
    </>
  );
}