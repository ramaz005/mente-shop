import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import axios from 'axios';

export default function Product() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [added, setAdded] = useState(false);

  useEffect(() => {
  // Сначала получаем все товары и находим нужный по id
  axios.get(`http://localhost:1337/api/products?populate=*`)
    .then(res => {
      const all = res.data.data;
      const found = all.find(p => p.id === parseInt(id));
      setProduct(found || null);
      setLoading(false);
    })
    .catch(() => setLoading(false));
}, [id]);

  const getImageUrl = () => {
    if (!product) return null;
    if (Array.isArray(product.images) && product.images[0]?.url) {
      return `http://localhost:1337${product.images[0].url}`;
    }
    if (product.images?.url) return `http://localhost:1337${product.images.url}`;
    return null;
  };

  const getDescription = () => {
    if (!product?.description) return '';
    if (typeof product.description === 'string') return product.description;
    if (Array.isArray(product.description)) {
      return product.description.map(block =>
        block.children?.map(child => child.text).join('') || ''
      ).join('\n');
    }
    return '';
  };

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      price_min: product.price_min,
      name: product.name,
      color: product.color
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (loading) return (
    <div style={{
      minHeight: '80vh', display: 'flex',
      alignItems: 'center', justifyContent: 'center',
      backgroundColor: 'var(--bone)'
    }}>
      <p style={{ fontFamily: 'Anonymous Pro', letterSpacing: '4px' }}>Загрузка...</p>
    </div>
  );

  if (!product) return (
    <div style={{
      minHeight: '80vh', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      backgroundColor: 'var(--bone)'
    }}>
      <p style={{ fontFamily: 'Anonymous Pro', marginBottom: '24px' }}>Товар не найден</p>
      <button onClick={() => navigate('/catalog')} style={{
        padding: '12px 32px', backgroundColor: 'var(--spanish-sun)',
        color: 'var(--bone)', border: 'none',
        fontFamily: 'Anonymous Pro', fontSize: '11px',
        letterSpacing: '2px', cursor: 'pointer'
      }}>
        В КАТАЛОГ
      </button>
    </div>
  );

  const imageUrl = getImageUrl();
  const description = getDescription();

  return (
    <div style={{ backgroundColor: 'var(--bone)', minHeight: '100vh' }}>
      <style>{`
        .product-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          max-width: 1400px;
          margin: 0 auto;
        }
        .product-images { padding: 40px; }
        .product-info {
          padding: 60px 40px;
          border-left: 1px solid var(--espresso);
        }
        @media (max-width: 768px) {
          .product-grid { grid-template-columns: 1fr !important; }
          .product-info {
            border-left: none !important;
            border-top: 1px solid var(--espresso);
            padding: 32px 24px !important;
          }
          .product-images { padding: 24px !important; }
        }
      `}</style>

      {/* Хлебные крошки */}
      <div style={{
        padding: '16px 40px',
        borderBottom: '1px solid var(--espresso)',
        display: 'flex',
        gap: '8px',
        alignItems: 'center'
      }}>
        <button onClick={() => navigate('/')} style={{
          background: 'none', border: 'none', cursor: 'pointer',
          fontFamily: 'Anonymous Pro', fontSize: '11px',
          color: 'var(--espresso)', opacity: 0.5, letterSpacing: '1px'
        }}>ГЛАВНАЯ</button>
        <span style={{ opacity: 0.3 }}>→</span>
        <button onClick={() => navigate('/catalog')} style={{
          background: 'none', border: 'none', cursor: 'pointer',
          fontFamily: 'Anonymous Pro', fontSize: '11px',
          color: 'var(--espresso)', opacity: 0.5, letterSpacing: '1px'
        }}>КАТАЛОГ</button>
        <span style={{ opacity: 0.3 }}>→</span>
        <span style={{
          fontFamily: 'Anonymous Pro', fontSize: '11px',
          color: 'var(--espresso)', letterSpacing: '1px'
        }}>
          {product.name}
        </span>
      </div>

      <div className="product-grid">
        {/* ФОТО */}
        <div className="product-images">
          <div style={{
            backgroundColor: 'var(--blush)',
            aspectRatio: '3/4',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            position: 'relative'
          }}>
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={product.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            ) : (
              <span style={{
                fontFamily: 'Arial Black', fontSize: '48px',
                color: 'var(--espresso)', opacity: 0.15, letterSpacing: '4px'
              }}>
                MENTE
              </span>
            )}
            <div style={{
              position: 'absolute', top: '16px', left: '16px',
              backgroundColor: product.in_stock ? 'var(--spanish-sun)' : 'var(--espresso)',
              color: 'var(--bone)', padding: '4px 12px',
              fontFamily: 'Anonymous Pro', fontSize: '10px', letterSpacing: '2px'
            }}>
              {product.in_stock ? 'В НАЛИЧИИ' : 'НЕТ В НАЛИЧИИ'}
            </div>
          </div>
        </div>

        {/* ИНФО */}
        <div className="product-info">
          {product.category && (
            <p style={{
              fontFamily: 'Anonymous Pro', fontSize: '10px',
              letterSpacing: '4px', color: 'var(--spanish-sun)', marginBottom: '12px'
            }}>
              {product.category.toUpperCase()}
            </p>
          )}

          <h1 style={{
            fontFamily: 'Arial Black',
            fontSize: 'clamp(24px, 3vw, 40px)',
            letterSpacing: '2px', color: 'var(--espresso)',
            marginBottom: '24px', lineHeight: '1.2'
          }}>
            {product.name}
          </h1>

          <div style={{
            marginBottom: '32px', padding: '20px',
            backgroundColor: 'var(--blush)',
            borderLeft: '3px solid var(--spanish-sun)'
          }}>
            <p style={{
              fontFamily: 'Arial Black',
              fontSize: 'clamp(20px, 3vw, 32px)',
              color: 'var(--spanish-sun)'
            }}>
              {product.price_min?.toLocaleString()} ₽
              {product.price_max && product.price_max !== product.price_min && (
                <span style={{ fontSize: '0.7em', opacity: 0.7 }}>
                  {' '}— {product.price_max?.toLocaleString()} ₽
                </span>
              )}
            </p>
          </div>

          {product.color && (
            <div style={{ marginBottom: '24px' }}>
              <p style={{
                fontFamily: 'Anonymous Pro', fontSize: '10px',
                letterSpacing: '3px', color: 'var(--espresso)',
                opacity: 0.5, marginBottom: '8px'
              }}>ЦВЕТ</p>
              <p style={{ fontFamily: 'Anonymous Pro', fontSize: '13px', color: 'var(--espresso)' }}>
                {product.color}
              </p>
            </div>
          )}

          {description && (
            <div style={{ marginBottom: '40px' }}>
              <p style={{
                fontFamily: 'Anonymous Pro', fontSize: '10px',
                letterSpacing: '3px', color: 'var(--espresso)',
                opacity: 0.5, marginBottom: '12px'
              }}>ОПИСАНИЕ</p>
              <p style={{
                fontFamily: 'Anonymous Pro', fontSize: '13px',
                lineHeight: '2', color: 'var(--espresso)', opacity: 0.8
              }}>
                {description}
              </p>
            </div>
          )}

          <div style={{ marginBottom: '40px' }}>
            <p style={{
              fontFamily: 'Anonymous Pro', fontSize: '10px',
              letterSpacing: '3px', color: 'var(--espresso)',
              opacity: 0.5, marginBottom: '12px'
            }}>ОСОБЕННОСТИ</p>
            {['Премиальная дышащая ткань', 'Анатомический крой', 'Влагоотведение', 'Без натирания'].map((f, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                <div style={{
                  width: '6px', height: '6px',
                  backgroundColor: 'var(--spanish-sun)',
                  borderRadius: '50%', flexShrink: 0
                }} />
                <p style={{ fontFamily: 'Anonymous Pro', fontSize: '12px', color: 'var(--espresso)' }}>
                  {f}
                </p>
              </div>
            ))}
          </div>

          <button
            onClick={handleAddToCart}
            disabled={!product.in_stock}
            style={{
              width: '100%', padding: '18px',
              backgroundColor: added ? 'var(--persian-plum)' : product.in_stock ? 'var(--spanish-sun)' : 'var(--espresso)',
              color: 'var(--bone)', border: 'none',
              fontFamily: 'Anonymous Pro', fontSize: '12px',
              letterSpacing: '3px', cursor: product.in_stock ? 'pointer' : 'not-allowed',
              transition: 'background-color 0.3s', marginBottom: '16px'
            }}
          >
            {added ? '✓ ДОБАВЛЕНО' : product.in_stock ? 'В КОРЗИНУ' : 'НЕТ В НАЛИЧИИ'}
          </button>

          <p style={{
            fontFamily: 'Caveat', fontSize: '14px',
            color: 'var(--persian-plum)', textAlign: 'center'
          }}>
            mind muscle connection.
          </p>
        </div>
      </div>
    </div>
  );
}