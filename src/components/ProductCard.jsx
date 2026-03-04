import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { id, name, price_min, price_max, color } = product;

  return (
    <div style={{
      backgroundColor: 'var(--bone)',
      border: '1px solid var(--espresso)',
      overflow: 'hidden',
      transition: 'transform 0.3s ease'
    }}
    onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
    onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
    >
      <Link to={`/product/${id}`} style={{ textDecoration: 'none' }}>
        <div style={{
          backgroundColor: 'var(--blush)',
          height: '320px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <span style={{ fontFamily: 'Arial Black', fontSize: '32px', color: 'var(--espresso)', opacity: 0.2 }}>MENTE</span>
        </div>

        <div style={{ padding: '16px' }}>
          <p style={{ fontFamily: 'Anonymous Pro', fontSize: '13px', color: 'var(--espresso)', letterSpacing: '1px', marginBottom: '4px' }}>
            {name}
          </p>
          <p style={{ fontFamily: 'Anonymous Pro', fontSize: '11px', color: 'var(--persian-plum)' }}>
            {price_min?.toLocaleString()} — {price_max?.toLocaleString()} ₽
          </p>
          {color && (
            <p style={{ fontSize: '10px', color: 'var(--espresso)', opacity: 0.6, marginTop: '4px' }}>
              {color}
            </p>
          )}
        </div>
      </Link>

      <button
        onClick={() => addToCart({ id, price_min, name, color })}
        style={{
          width: '100%', padding: '12px',
          backgroundColor: 'var(--spanish-sun)',
          color: 'var(--bone)', border: 'none',
          fontFamily: 'Anonymous Pro', fontSize: '11px',
          letterSpacing: '2px', cursor: 'pointer'
        }}
        onMouseEnter={e => e.target.style.backgroundColor = 'var(--persian-plum)'}
        onMouseLeave={e => e.target.style.backgroundColor = 'var(--spanish-sun)'}
      >
        В КОРЗИНУ
      </button>
    </div>
  );
}