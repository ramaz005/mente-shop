import { memo } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default memo(function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { id, name, price_min, price_max, color } = product;

  const getImageUrl = () => {
    if (!product.images) return null;
    if (Array.isArray(product.images) && product.images[0]?.url) {
      return `https://mente-backend-production.up.railway.app${product.images[0].url}`;
    }
    if (product.images?.url) return `https://mente-backend-production.up.railway.app${product.images.url}`;
    return null;
  };

  const imageUrl = getImageUrl();

  return (
    <div style={{
      backgroundColor: 'var(--bone)',
      overflow: 'hidden',
      transition: 'transform 0.3s ease',
      cursor: 'pointer'
    }}
    onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
    onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
    >
      <Link to={`/product/${id}`} style={{ textDecoration: 'none', display: 'block' }}>
        <div style={{
          backgroundColor: 'var(--blush)',
          height: '320px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden'
        }}>
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={name}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              onError={e => { e.target.style.display = 'none'; }}
            />
          ) : (
            <span style={{
              fontFamily: 'Arial Black', fontSize: '32px',
              color: 'var(--espresso)', opacity: 0.15
            }}>
              MENTE
            </span>
          )}
        </div>

        <div style={{ padding: '16px' }}>
          <p style={{
            fontFamily: 'Anonymous Pro', fontSize: '13px',
            color: 'var(--espresso)', letterSpacing: '1px', marginBottom: '4px'
          }}>
            {name}
          </p>
          <p style={{
            fontFamily: 'Anonymous Pro', fontSize: '11px',
            color: 'var(--persian-plum)'
          }}>
            {price_min?.toLocaleString()} — {price_max?.toLocaleString()} ₽
          </p>
          {color && (
            <p style={{ fontSize: '10px', color: 'var(--espresso)', opacity: 0.5, marginTop: '4px' }}>
              {color}
            </p>
          )}
        </div>
      </Link>

      <Link to={`/product/${id}`} style={{
        display: 'block', padding: '12px',
        backgroundColor: 'var(--espresso)',
        color: 'var(--bone)',
        textDecoration: 'none',
        fontFamily: 'Anonymous Pro', fontSize: '11px',
        letterSpacing: '2px', textAlign: 'center',
        transition: 'background-color 0.2s'
      }}
        onMouseEnter={e => e.currentTarget.style.backgroundColor = '#AA0607'}
        onMouseLeave={e => e.currentTarget.style.backgroundColor = 'var(--espresso)'}
      >
        ВЫБРАТЬ →
      </Link>
    </div>
  );
})