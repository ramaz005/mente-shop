import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import axios from 'axios';

export default function Catalog() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';

  useEffect(() => {
    axios.get('http://localhost:1337/api/products?populate=*')
      .then(res => {
        setProducts(res.data.data || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filtered = searchQuery
    ? products.filter(p =>
        p.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.color?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : products;

  const getImageUrl = (product) => {
    if (!product.images) return null;
    if (Array.isArray(product.images) && product.images[0]?.url)
      return `http://localhost:1337${product.images[0].url}`;
    if (product.images?.url)
      return `http://localhost:1337${product.images.url}`;
    return null;
  };

  return (
    <div style={{ backgroundColor: '#fff', minHeight: '100vh' }}>
      <style>{`
        .catalog-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          border-top: 1px solid #000;
        }
        .product-card {
          border-right: 1px solid #000;
          border-bottom: 1px solid #000;
          cursor: pointer;
          text-decoration: none;
          color: #000;
          display: block;
          transition: opacity 0.25s ease;
        }
        .product-card:hover { opacity: 0.75; }
        .product-card:nth-child(4n) { border-right: none; }
        .product-img {
          width: 100%;
          aspect-ratio: 3/4;
          object-fit: cover;
          display: block;
          background: #f5f5f5;
          transition: transform 0.4s ease;
        }
        .product-card:hover .product-img { transform: scale(1.03); }
        .product-img-wrap {
          overflow: hidden;
        }
        .product-img-placeholder {
          width: 100%;
          aspect-ratio: 3/4;
          background: #f5f5f5;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .product-info {
          padding: 16px;
          text-align: center;
        }
        .product-name {
          font-family: 'Anonymous Pro', monospace;
          font-size: 15px;
          color: #000;
          letter-spacing: 1px;
          margin-bottom: 4px;
          font-weight: 400;
        }
        .product-price {
          font-family: 'Anonymous Pro', monospace;
          font-size: 15px;
          color: #000;
          font-weight: 400;
        }
        .search-header {
          padding: 24px 40px;
          font-family: 'Anonymous Pro', monospace;
          font-size: 14px;
          color: #7F7F7F;
          letter-spacing: 2px;
          border-bottom: 1px solid #eee;
        }
        @media (max-width: 768px) {
          .catalog-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .product-card:nth-child(4n) { border-right: 1px solid #000; }
          .product-card:nth-child(2n) { border-right: none !important; }
        }
        @media (max-width: 480px) {
          .catalog-grid { grid-template-columns: 1fr !important; }
          .product-card { border-right: none !important; }
        }
      `}</style>

      {searchQuery && (
        <div className="search-header">
          ПОИСК: "{searchQuery}" — найдено {filtered.length} товаров
        </div>
      )}

      {loading ? (
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          height: '60vh', fontFamily: 'Anonymous Pro', fontSize: '14px',
          letterSpacing: '4px'
        }}>
          загрузка...
        </div>
      ) : filtered.length === 0 ? (
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          height: '60vh', fontFamily: 'Anonymous Pro', fontSize: '14px',
          letterSpacing: '4px'
        }}>
          товары не найдены
        </div>
      ) : (
        <div className="catalog-grid">
          {filtered.map(product => {
            const imageUrl = getImageUrl(product);
            return (
              <Link key={product.id} to={`/product/${product.id}`} className="product-card">
                <div className="product-img-wrap">
                  {imageUrl ? (
                    <img src={imageUrl} alt={product.name} className="product-img" />
                  ) : (
                    <div className="product-img-placeholder">
                      <span style={{
                        fontFamily: "'Druk Wide Cyr', 'Arial Black'",
                        fontSize: '32px', color: '#000', opacity: 0.1
                      }}>MENTE</span>
                    </div>
                  )}
                </div>
                <div className="product-info">
                  <p className="product-name">{product.name}</p>
                  <p className="product-price">{product.price_min?.toLocaleString()} ₽</p>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}