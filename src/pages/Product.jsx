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
  const [selectedSize, setSelectedSize] = useState(null);
  const [accordion, setAccordion] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:1337/api/products?populate=*`)
      .then(res => {
        const found = res.data.data.find(p => p.id === parseInt(id));
        setProduct(found || null);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  const getImageUrl = () => {
    if (!product) return null;
    if (Array.isArray(product.images) && product.images[0]?.url)
      return `http://localhost:1337${product.images[0].url}`;
    if (product.images?.url)
      return `http://localhost:1337${product.images.url}`;
    return null;
  };

  const getDescription = () => {
    if (!product?.description) return '';
    if (typeof product.description === 'string') return product.description;
    if (Array.isArray(product.description)) {
      return product.description
        .map(block => block.children?.map(c => c.text).join('') || '')
        .join('\n');
    }
    return '';
  };

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      price_min: product.price_min,
      name: product.name,
      color: product.color,
      size: selectedSize
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const sizes = ['XS', 'S', 'M', 'L'];

  if (loading) return (
    <div style={{
      minHeight: '80vh', display: 'flex',
      alignItems: 'center', justifyContent: 'center',
      backgroundColor: '#fff'
    }}>
      <p style={{ fontFamily: 'Anonymous Pro', fontSize: '12px', letterSpacing: '4px' }}>
        загрузка...
      </p>
    </div>
  );

  if (!product) return (
    <div style={{
      minHeight: '80vh', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      backgroundColor: '#fff', gap: '24px'
    }}>
      <p style={{ fontFamily: 'Anonymous Pro', fontSize: '14px', letterSpacing: '2px' }}>
        товар не найден
      </p>
      <button onClick={() => navigate('/catalog')} style={{
        padding: '14px 40px', backgroundColor: '#2F2F2F',
        color: '#fff', border: 'none',
        fontFamily: 'Anonymous Pro', fontSize: '14px',
        letterSpacing: '2px', cursor: 'pointer'
      }}>
        В КАТАЛОГ
      </button>
    </div>
  );

  const imageUrl = getImageUrl();
  const description = getDescription();

  return (
    <div style={{ backgroundColor: '#fff', minHeight: '100vh' }}>
      <style>{`
        .product-wrap {
          display: grid;
          grid-template-columns: 55% 45%;
          min-height: calc(100vh - 80px);
        }
        .product-left {
          position: relative;
          background: #f5f5f5;
        }
        .product-right {
          padding: 48px 56px;
          display: flex;
          flex-direction: column;
        }
        .size-btn {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          border: 1px solid #ccc;
          background: #ebebeb;
          font-family: 'Anonymous Pro', monospace;
          font-size: 16px;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .size-btn.active {
          border: 2px solid #000;
          background: #ebebeb;
        }
        .size-btn:hover { border-color: #000; }
        .accordion-item {
          border-bottom: 1px dashed #000;
        }
        .accordion-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 0;
          cursor: pointer;
          font-family: 'Anonymous Pro', monospace;
          font-size: 18px;
          color: #050505;
          letter-spacing: 1px;
          background: none;
          border: none;
          width: 100%;
          text-align: left;
        }
        .accordion-body {
          padding: 0 0 20px;
          font-family: 'Anonymous Pro', monospace;
          font-size: 14px;
          color: #555;
          line-height: 1.8;
        }
        .add-btn {
          padding: 22px 40px;
          background: #2F2F2F;
          color: #fff;
          border: none;
          font-family: 'Anonymous Pro', monospace;
          font-size: 16px;
          letter-spacing: 3px;
          cursor: pointer;
          transition: background 0.2s;
          border-radius: 8px;
        }
        .add-btn:hover { background: #AA0607; }
        .add-btn.added { background: #AA0607; }
        .fav-btn {
          width: 66px;
          height: 66px;
          border-radius: 8px;
          background: #ebebeb;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .color-dot {
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: #6B5B5C;
          display: inline-block;
        }
        @media (max-width: 768px) {
          .product-wrap { grid-template-columns: 1fr !important; }
          .product-right { padding: 32px 20px !important; }
          .product-left { min-height: 60vw; }
        }
      `}</style>

      <div className="product-wrap">
        {/* ФОТО */}
        <div className="product-left">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={product.name}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
                minHeight: '600px'
              }}
            />
          ) : (
            <div style={{
              width: '100%', minHeight: '600px',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              <span style={{
                fontFamily: "'Druk Wide Cyr', 'Arial Black'",
                fontSize: '64px', color: '#000', opacity: 0.08
              }}>
                MENTE
              </span>
            </div>
          )}
        </div>

        {/* ИНФО */}
        <div className="product-right">
          {/* Название и цена */}
          <h1 style={{
            fontFamily: 'Anonymous Pro, monospace',
            fontSize: 'clamp(20px, 2.5vw, 32px)',
            fontWeight: '400',
            color: '#050505',
            letterSpacing: '2px',
            marginBottom: '16px',
            lineHeight: '1.2',
            textTransform: 'uppercase'
          }}>
            {product.name}
            {product.price_min && (
              <span style={{ display: 'block', marginTop: '8px' }}>
                {product.price_min?.toLocaleString()} ₽
              </span>
            )}
          </h1>
        
          {/* Размер */}
          <div style={{ marginBottom: '32px' }}>
            <p style={{
              fontFamily: 'Anonymous Pro',
              fontSize: '20px',
              color: '#7F7F7F',
              letterSpacing: '2px',
              marginBottom: '16px'
            }}>
              РАЗМЕР
            </p>
            <div style={{ display: 'flex', gap: '12px' }}>
              {sizes.map(size => (
                <button
                  key={size}
                  className={`size-btn${selectedSize === size ? ' active' : ''}`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Цвет */}
          {product.color && (
            <div style={{ marginBottom: '32px' }}>
              <p style={{
                fontFamily: 'Anonymous Pro',
                fontSize: '20px',
                color: '#7F7F7F',
                letterSpacing: '2px',
                marginBottom: '16px'
              }}>
                ЦВЕТ
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  width: '36px', height: '36px',
                  borderRadius: '50%',
                  border: '1px solid #7F7F7F',
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  <span className="color-dot" />
                </div>
                <span style={{
                  fontFamily: 'Anonymous Pro',
                  fontSize: '18px',
                  color: '#7F7F7F',
                  letterSpacing: '1px'
                }}>
                  {product.color.toUpperCase()}
                </span>
              </div>
            </div>
          )}

          {/* Кнопки */}
          <div style={{ display: 'flex', gap: '12px', marginBottom: '40px' }}>
            <button
              className={`add-btn${added ? ' added' : ''}`}
              onClick={handleAddToCart}
              disabled={!product.in_stock}
              style={{ flex: 1 }}
            >
              {added ? 'В КОРЗИНЕ 1 ШТ' : product.in_stock ? 'В КОРЗИНУ' : 'НЕТ В НАЛИЧИИ'}
            </button>
            <button className="fav-btn">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2F2F2F" strokeWidth="1.5">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
            </button>
          </div>

          {/* Аккордеон */}
          {[
            { key: 'desc', label: 'описание', content: description || 'Описание товара отсутствует' },
            { key: 'care', label: 'состав и уход', content: '95% полиэстер, 5% эластан. Машинная стирка при 30°C.' },
            { key: 'size', label: 'размерная сетка', content: 'XS — 42, S — 44, M — 46, L — 48' },
          ].map(item => (
            <div key={item.key} className="accordion-item">
              <button
                className="accordion-header"
                onClick={() => setAccordion(accordion === item.key ? null : item.key)}
              >
                {item.label}
                <span style={{ fontSize: '24px', fontWeight: '300' }}>
                  {accordion === item.key ? '−' : '+'}
                </span>
              </button>
              {accordion === item.key && (
                <div className="accordion-body">{item.content}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}