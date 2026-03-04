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
      {/* Заголовок */}
      <div style={{
        padding: '60px 40px 40px',
        borderBottom: '1px solid var(--espresso)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-end'
      }}>
        <h1 style={{
          fontFamily: 'Arial Black',
          fontSize: '48px',
          letterSpacing: '4px',
          color: 'var(--espresso)'
        }}>
          КАТАЛОГ
        </h1>
        <p style={{ fontFamily: 'Caveat', fontSize: '18px', color: 'var(--persian-plum)' }}>
          {filtered.length} товаров
        </p>
      </div>

      {/* Фильтры */}
      <div style={{
        padding: '24px 40px',
        display: 'flex',
        gap: '8px',
        flexWrap: 'wrap',
        borderBottom: '1px solid var(--espresso)'
      }}>
        {categories.map(cat => (
          <button key={cat} onClick={() => setFilter(cat)} style={{
            padding: '8px 20px',
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

      {/* Товары */}
      <div style={{ padding: '40px' }}>
        {loading ? (
          <p style={{ fontFamily: 'Anonymous Pro', textAlign: 'center', padding: '80px' }}>
            Загрузка...
          </p>
        ) : filtered.length === 0 ? (
          <p style={{ fontFamily: 'Anonymous Pro', textAlign: 'center', padding: '80px' }}>
            Товары не найдены. Добавь товары в Strapi.
          </p>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '1px',
            backgroundColor: 'var(--espresso)'
          }}>
            {filtered.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}