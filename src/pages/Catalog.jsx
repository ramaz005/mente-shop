import { useState, useEffect } from 'react';
import { getProducts } from '../api/products';
import ProductCard from '../components/ProductCard';

export default function Catalog() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    getProducts()
      .then(data => { setProducts(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const categories = ['all', 'top', 'leggings', 'jumpsuit', 'shorts', 'rashguard'];

  const filtered = filter === 'all'
    ? products
    : products.filter(p => p.category === filter);

  return (
    <div style={{ backgroundColor: 'var(--bone)', minHeight: '100vh' }}>
      <style>{`
        .catalog-header { padding: 60px 40px 40px; }
        .catalog-filters { padding: 24px 40px; }
        .catalog-grid { padding: 40px; }
        .products-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 1px;
          background-color: var(--espresso);
        }
        @media (max-width: 768px) {
          .catalog-header { padding: 40px 24px 24px !important; }
          .catalog-filters { padding: 16px 24px !important; }
          .catalog-grid { padding: 1px 0 !important; }
          .products-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 480px) {
          .products-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <div className="catalog-header" style={{
        borderBottom: '1px solid var(--espresso)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-end'
      }}>
        <h1 style={{
          fontFamily: 'Arial Black',
          fontSize: 'clamp(32px, 6vw, 48px)',
          letterSpacing: '4px',
          color: 'var(--espresso)'
        }}>
          КАТАЛОГ
        </h1>
        <p style={{ fontFamily: 'Caveat', fontSize: '18px', color: 'var(--persian-plum)' }}>
          {filtered.length} товаров
        </p>
      </div>

      <div className="catalog-filters" style={{
        display: 'flex',
        gap: '8px',
        flexWrap: 'wrap',
        borderBottom: '1px solid var(--espresso)'
      }}>
        {categories.map(cat => (
          <button key={cat} onClick={() => setFilter(cat)} style={{
            padding: '8px 16px',
            backgroundColor: filter === cat ? 'var(--spanish-sun)' : 'transparent',
            color: filter === cat ? 'var(--bone)' : 'var(--espresso)',
            border: '1px solid var(--espresso)',
            fontFamily: 'Anonymous Pro',
            fontSize: '10px',
            letterSpacing: '2px',
            cursor: 'pointer',
            textTransform: 'uppercase'
          }}>
            {cat === 'all' ? 'ВСЕ' : cat}
          </button>
        ))}
      </div>

      <div className="catalog-grid">
        {loading ? (
          <p style={{ fontFamily: 'Anonymous Pro', textAlign: 'center', padding: '80px' }}>
            Загрузка...
          </p>
        ) : filtered.length === 0 ? (
          <p style={{ fontFamily: 'Anonymous Pro', textAlign: 'center', padding: '80px' }}>
            Товары не найдены
          </p>
        ) : (
          <div className="products-grid">
            {filtered.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}