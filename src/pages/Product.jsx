import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { getProductById } from '../api/products';

export default function Product() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [added, setAdded] = useState(false);
  const [selectedSize, setSelectedSize] = useState(null);
  const [sizeError, setSizeError] = useState(false);
  const [accordion, setAccordion] = useState(null);

  useEffect(() => {
    getProductById(id)
      .then(data => {
        setProduct(data);
        setLoading(false);
      })
      .catch(() => {
        setProduct(null);
        setLoading(false);
      });
  }, [id]);

  const handleAddToCart = () => {
    if (!selectedSize) {
      setSizeError(true);
      setTimeout(() => setSizeError(false), 2000);
      return;
    }
    addToCart({
      id: product.id,
      price_min: product.price_min,
      name: product.name,
      color: product.color,
      size: selectedSize,
      image: product.image_url || null,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const sizes = product?.sizes || ['XS', 'S', 'M'];

  if (loading) return (
    <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' }}>
      <p style={{ fontFamily: 'Anonymous Pro', fontSize: '12px', letterSpacing: '6px', opacity: 0.4 }}>MENTE</p>
    </div>
  );

  if (!product) return (
    <div style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff', gap: '24px' }}>
      <p style={{ fontFamily: 'Anonymous Pro', fontSize: '14px', letterSpacing: '2px' }}>товар не найден</p>
      <button onClick={() => navigate('/catalog')} style={{ padding: '14px 40px', backgroundColor: '#2F2F2F', color: '#fff', border: 'none', fontFamily: 'Anonymous Pro', fontSize: '14px', letterSpacing: '2px', cursor: 'pointer' }}>
        В КАТАЛОГ
      </button>
    </div>
  );

  return (
    <div style={{ backgroundColor: '#fff', minHeight: '100vh' }}>
      <style>{`
        .product-wrap {
          display: grid;
          grid-template-columns: 50% 50%;
          min-height: calc(100vh - 80px);
        }
        .product-left { background: #f5f5f5; overflow: hidden; }
        .product-right { padding: 40px 48px; display: flex; flex-direction: column; }
        .size-btn {
          width: 52px; height: 52px;
          border-radius: 50%;
          border: 1px solid #ccc;
          background: #ebebeb;
          font-family: 'Anonymous Pro', monospace;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.2s;
          display: flex; align-items: center; justify-content: center;
        }
        .size-btn.active { border: 2px solid #000; }
        .size-btn.error { border: 2px solid #AA0607; }
        .size-btn:hover { border-color: #000; }
        .accordion-item { border-bottom: 1px dashed #ccc; }
        .accordion-header {
          display: flex; justify-content: space-between; align-items: center;
          padding: 16px 0; cursor: pointer;
          font-family: 'Anonymous Pro', monospace;
          font-size: 16px; color: #050505;
          background: none; border: none; width: 100%; text-align: left;
        }
        .accordion-body {
          padding: 0 0 16px;
          font-family: 'Anonymous Pro', monospace;
          font-size: 13px; color: #555; line-height: 1.8;
        }
        .add-btn {
          padding: 18px 32px;
          background: #2F2F2F; color: #fff; border: none;
          font-family: 'Anonymous Pro', monospace;
          font-size: 14px; letter-spacing: 3px;
          cursor: pointer; transition: background 0.2s;
          border-radius: 8px; flex: 1;
        }
        .add-btn:hover { background: #AA0607; }
        .add-btn.added { background: #AA0607; }
        .add-btn.error-btn { background: #AA0607; }
        .size-error {
          font-family: 'Anonymous Pro', monospace;
          font-size: 12px; color: #AA0607;
          letter-spacing: 1px; margin-top: 8px;
        }
        @media (max-width: 768px) {
          .product-wrap { grid-template-columns: 1fr !important; }
          .product-right { padding: 24px 20px !important; }
        }
      `}</style>

      <div className="product-wrap">
        {/* ФОТО */}
        <div className="product-left">
          {product.image_url ? (
            <img
              src={product.image_url}
              alt={product.name}
              style={{ width: '100%', height: '100%', objectFit: 'cover', minHeight: '600px', display: 'block' }}
              loading="eager"
              fetchpriority="high"
            />
          ) : (
            <div style={{ width: '100%', minHeight: '600px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontFamily: "'Druk Wide Cyr','Arial Black'", fontSize: '48px', color: '#000', opacity: 0.08 }}>MENTE</span>
            </div>
          )}
        </div>

        {/* ИНФО */}
        <div className="product-right">

          <h1 style={{ fontFamily: 'Anonymous Pro, monospace', fontSize: 'clamp(16px, 2vw, 24px)', fontWeight: '400', color: '#050505', letterSpacing: '2px', marginBottom: '12px', textTransform: 'uppercase' }}>
            {product.name}
          </h1>

          <p style={{ fontFamily: 'Anonymous Pro', fontSize: 'clamp(18px, 2vw, 26px)', color: '#050505', letterSpacing: '1px', marginBottom: '32px' }}>
            {product.price_min?.toLocaleString()} ₽
          </p>

          <div style={{ height: '1px', background: '#eee', marginBottom: '32px' }} />

          {/* Размер */}
          <div style={{ marginBottom: '24px' }}>
            <p style={{ fontFamily: 'Anonymous Pro', fontSize: '11px', color: '#7F7F7F', letterSpacing: '3px', marginBottom: '14px' }}>
              РАЗМЕР
            </p>
            <div style={{ display: 'flex', gap: '10px' }}>
              {sizes.map(size => (
                <button
                  key={size}
                  className={`size-btn${selectedSize === size ? ' active' : ''}${sizeError && !selectedSize ? ' error' : ''}`}
                  onClick={() => { setSelectedSize(size); setSizeError(false); }}
                >
                  {size}
                </button>
              ))}
            </div>
            {sizeError && <p className="size-error">Выберите размер</p>}
          </div>

          {/* Цвет */}
          {product.color && (
            <div style={{ marginBottom: '32px' }}>
              <p style={{ fontFamily: 'Anonymous Pro', fontSize: '11px', color: '#7F7F7F', letterSpacing: '3px', marginBottom: '14px' }}>
                ЦВЕТ
              </p>
              <p style={{ fontFamily: 'Anonymous Pro', fontSize: '14px', color: '#050505' }}>
                {product.color.toUpperCase()}
              </p>
            </div>
          )}

          {/* Кнопка */}
          <div style={{ display: 'flex', gap: '12px', marginBottom: '32px' }}>
            <button
              className={`add-btn${added ? ' added' : ''}${sizeError ? ' error-btn' : ''}`}
              onClick={handleAddToCart}
              disabled={!product.in_stock}
            >
              {added ? '✓ ДОБАВЛЕНО' : !product.in_stock ? 'НЕТ В НАЛИЧИИ' : sizeError ? 'ВЫБЕРИТЕ РАЗМЕР' : 'В КОРЗИНУ'}
            </button>
          </div>

          {/* Аккордеон */}
          {[
            { key: 'desc', label: 'Описание', content: product.description || 'Описание отсутствует' },
            { key: 'care', label: 'Состав и уход', content: '95% полиэстер, 5% эластан. Машинная стирка при 30°C.' },
            { key: 'size', label: 'Размерная сетка', content: 'XS — 42, S — 44, M — 46' },
          ].map(item => (
            <div key={item.key} className="accordion-item">
              <button className="accordion-header" onClick={() => setAccordion(accordion === item.key ? null : item.key)}>
                {item.label}
                <span style={{ fontSize: '20px', fontWeight: '300' }}>{accordion === item.key ? '−' : '+'}</span>
              </button>
              {accordion === item.key && <div className="accordion-body">{item.content}</div>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
