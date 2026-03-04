import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const { count } = useCart();

  return (
    <nav style={{
      backgroundColor: 'var(--bone)',
      borderBottom: '1px solid var(--espresso)',
      padding: '16px 40px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      position: 'sticky',
      top: 0,
      zIndex: 100
    }}>
      <Link to="/about" style={{
            fontFamily: 'Anonymous Pro',
            fontSize: '11px',
            color: 'var(--espresso)',
            textDecoration: 'none',
            letterSpacing: '2px'
      }}>
            О БРЕНДЕ
      </Link>

      <Link to="/" style={{
        fontFamily: 'Arial Black',
        fontSize: '28px',
        fontWeight: '900',
        color: 'var(--espresso)',
        textDecoration: 'none',
        letterSpacing: '4px'
      }}>
        MENTE
      </Link>

      <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
        <Link to="/catalog" style={{
          fontFamily: 'Anonymous Pro',
          fontSize: '11px',
          color: 'var(--espresso)',
          textDecoration: 'none',
          letterSpacing: '2px'
        }}>
          КАТАЛОГ
        </Link>
        <Link to="/cart" style={{
          fontFamily: 'Anonymous Pro',
          fontSize: '11px',
          color: 'var(--espresso)',
          textDecoration: 'none',
          letterSpacing: '2px'
        }}>
          КОРЗИНА {count > 0 && `(${count})`}
        </Link>
      </div>
    </nav>
  );
}