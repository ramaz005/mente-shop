import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById } from '../api/products';
import { useCart } from '../context/CartContext';

export default function Product() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProductById(id)
      .then(data => { setProduct(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) return (
    <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--bone)' }}>
      <p style={{ fontFamily: 'Anonymous Pro', letterSpacing: '2px' }}>Загрузка...</p>
    </div>
  );

  if (!product) return (
    <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--bone)' }}>
      <p style={{ fontFamily: 'Anonymous Pro' }}>Товар не найден</p>
    </div>
  );

  const { name, price_min, price_max, color, description, category } = product;
  const productStyles = `
  .product-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 80px;
    max-width: 1100px;
  }
  @media (max-width: 768px) {
    .product-grid {
      grid-template-columns: 1fr !important;
      gap: 32px !important;
    }
  }
`;
  return (
    <div style={{ backgroundColor: 'var(--bone)', minHeight: '100vh', padding: '60px 40px' }}>
        <style>{productStyles}</style>
      <button onClick={() => navigate(-1)} style={{
        background: 'none', border: 'none', cursor: 'pointer',
        fontFamily: 'Anonymous Pro', fontSize: '11px',
        letterSpacing: '2px', color: 'var(--espresso)',
        marginBottom: '40px', display: 'block'
      }}>
        ← НАЗАД
      </button>

      <div className="product-grid">
        {/* Фото */}
        <div style={{
          backgroundColor: 'var(--blush)',
          aspectRatio: '3/4',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <span style={{ fontFamily: 'Arial Black', fontSize: '48px', color: 'var(--espresso)', opacity: 0.2 }}>MENTE</span>
        </div>

        {/* Инфо */}
        <div style={{ paddingTop: '20px' }}>
          {category && (
            <p style={{ fontFamily: 'Anonymous Pro', fontSize: '10px', letterSpacing: '3px', color: 'var(--spanish-sun)', marginBottom: '12px' }}>
              {category.toUpperCase()}
            </p>
          )}

          <h1 style={{ fontFamily: 'Arial Black', fontSize: '36px', letterSpacing: '2px', color: 'var(--espresso)', marginBottom: '16px' }}>
            {name}
          </h1>

          <p style={{ fontFamily: 'Anonymous Pro', fontSize: '22px', color: 'var(--persian-plum)', marginBottom: '32px' }}>
            {price_min?.toLocaleString()} — {price_max?.toLocaleString()} ₽
          </p>

          {color && (
            <p style={{ fontFamily: 'Anonymous Pro', fontSize: '12px', color: 'var(--espresso)', marginBottom: '32px', opacity: 0.7 }}>
              Цвет: {color}
            </p>
          )}

          {description && (
            <p style={{ fontFamily: 'Anonymous Pro', fontSize: '13px', lineHeight: '2', color: 'var(--espresso)', marginBottom: '48px', opacity: 0.8 }}>
              {typeof description === 'string' ? description : description?.[0]?.children?.[0]?.text}
            </p>
          )}

          <button
            onClick={() => addToCart({ id: product.id, price_min, name, color })}
            style={{
              width: '100%', padding: '18px',
              backgroundColor: 'var(--spanish-sun)',
              color: 'var(--bone)', border: 'none',
              fontFamily: 'Anonymous Pro', fontSize: '12px',
              letterSpacing: '3px', cursor: 'pointer',
              marginBottom: '12px'
            }}
          >
            В КОРЗИНУ
          </button>

          <p style={{ fontFamily: 'Caveat', fontSize: '14px', color: 'var(--persian-plum)', textAlign: 'center' }}>
            Премиальная ткань · Анатомический крой · Влагоотведение
          </p>
        </div>
      </div>
    </div>
  );
}