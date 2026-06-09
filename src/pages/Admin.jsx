import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const STATUS_COLORS = {
  pending:   '#F59E0B',
  confirmed: '#3B82F6',
  shipped:   '#8B5CF6',
  done:      '#10B981',
  cancelled: '#EF4444',
};

const STATUS_LABELS = {
  pending:   'Новый',
  confirmed: 'Подтверждён',
  shipped:   'Отправлен',
  done:      'Выполнен',
  cancelled: 'Отменён',
};

export default function Admin() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data: listener } = supabase.auth.onAuthStateChange((_, s) => setSession(s));
    return () => listener.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!session) return;
    supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false })
      .then(({ data }) => { setOrders(data || []); setLoading(false); });
  }, [session]);

  const login = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setAuthError('Неверный email или пароль');
  };

  const updateStatus = async (id, status) => {
    await supabase.from('orders').update({ status }).eq('id', id);
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o));
  };

  const filtered = filter === 'all' ? orders : orders.filter(o => o.status === filter);

  const stats = {
    total: orders.length,
    pending: orders.filter(o => o.status === 'pending').length,
    revenue: orders.filter(o => o.status !== 'cancelled').reduce((s, o) => s + (o.total_amount || 0), 0),
  };

  if (!session) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' }}>
      <form onSubmit={login} style={{ width: '360px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <p style={{ fontFamily: 'Anonymous Pro', fontSize: '10px', letterSpacing: '6px', color: '#AA0607', marginBottom: '4px' }}>MENTE</p>
        <h1 style={{ fontFamily: 'Anonymous Pro', fontSize: '22px', letterSpacing: '4px', marginBottom: '16px' }}>ADMIN</h1>
        {authError && <p style={{ color: '#AA0607', fontFamily: 'Anonymous Pro', fontSize: '12px' }}>{authError}</p>}
        <input
          type="email" placeholder="Email" value={email}
          onChange={e => setEmail(e.target.value)}
          style={{ padding: '14px', border: '1px solid #000', fontFamily: 'Anonymous Pro', fontSize: '14px', outline: 'none' }}
        />
        <input
          type="password" placeholder="Пароль" value={password}
          onChange={e => setPassword(e.target.value)}
          style={{ padding: '14px', border: '1px solid #000', fontFamily: 'Anonymous Pro', fontSize: '14px', outline: 'none' }}
        />
        <button type="submit" style={{ padding: '14px', background: '#2F2F2F', color: '#fff', border: 'none', fontFamily: 'Anonymous Pro', fontSize: '13px', letterSpacing: '3px', cursor: 'pointer', marginTop: '8px' }}>
          ВОЙТИ
        </button>
      </form>
    </div>
  );

  return (
    <div style={{ padding: '40px', backgroundColor: '#fafafa', minHeight: '100vh' }}>
      <style>{`
        .admin-table { width: 100%; border-collapse: collapse; font-family: 'Anonymous Pro', monospace; font-size: 13px; background: #fff; }
        .admin-table th { padding: 12px 16px; text-align: left; font-size: 11px; letter-spacing: 1px; border-bottom: 2px solid #000; background: #fff; }
        .admin-table td { padding: 14px 16px; border-bottom: 1px solid #eee; vertical-align: top; }
        .admin-table tr:hover td { background: #fafafa; }
        .stat-card { background: #fff; border: 1px solid #eee; padding: 24px; flex: 1; }
        .stat-label { font-family: 'Anonymous Pro', monospace; font-size: 10px; letter-spacing: 3px; color: #aaa; margin-bottom: 8px; }
        .stat-value { font-family: 'Anonymous Pro', monospace; font-size: 28px; color: #050505; }
        .filter-btn { padding: 8px 16px; border: 1px solid #ccc; background: #fff; font-family: 'Anonymous Pro', monospace; font-size: 11px; letter-spacing: 2px; cursor: pointer; transition: all 0.15s; }
        .filter-btn.active { background: #2F2F2F; color: #fff; border-color: #2F2F2F; }
        .status-select { padding: 6px 10px; font-family: 'Anonymous Pro', monospace; font-size: 12px; background: #fff; cursor: pointer; outline: none; border-radius: 0; }
      `}</style>

      {/* Шапка */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <p style={{ fontFamily: 'Anonymous Pro', fontSize: '10px', letterSpacing: '4px', color: '#AA0607' }}>MENTE</p>
          <h1 style={{ fontFamily: 'Anonymous Pro', fontSize: '22px', letterSpacing: '4px' }}>ПАНЕЛЬ ЗАКАЗОВ</h1>
        </div>
        <button onClick={() => supabase.auth.signOut()} style={{ background: 'none', border: '1px solid #ccc', padding: '10px 20px', fontFamily: 'Anonymous Pro', fontSize: '12px', letterSpacing: '2px', cursor: 'pointer' }}>
          ВЫЙТИ
        </button>
      </div>

      {/* Статистика */}
      <div style={{ display: 'flex', gap: '16px', marginBottom: '32px' }}>
        <div className="stat-card">
          <p className="stat-label">ВСЕГО ЗАКАЗОВ</p>
          <p className="stat-value">{stats.total}</p>
        </div>
        <div className="stat-card">
          <p className="stat-label">НОВЫХ</p>
          <p className="stat-value" style={{ color: STATUS_COLORS.pending }}>{stats.pending}</p>
        </div>
        <div className="stat-card">
          <p className="stat-label">ВЫРУЧКА</p>
          <p className="stat-value">{stats.revenue.toLocaleString()} ₽</p>
        </div>
      </div>

      {/* Фильтры */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', flexWrap: 'wrap' }}>
        <button className={`filter-btn${filter === 'all' ? ' active' : ''}`} onClick={() => setFilter('all')}>ВСЕ</button>
        {Object.entries(STATUS_LABELS).map(([val, label]) => (
          <button key={val} className={`filter-btn${filter === val ? ' active' : ''}`} onClick={() => setFilter(val)}>
            {label.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Таблица */}
      {loading ? (
        <p style={{ fontFamily: 'Anonymous Pro', opacity: 0.4, letterSpacing: '4px' }}>загрузка...</p>
      ) : filtered.length === 0 ? (
        <p style={{ fontFamily: 'Anonymous Pro', opacity: 0.4 }}>заказов нет</p>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>ДАТА</th>
                <th>КЛИЕНТ</th>
                <th>ТЕЛЕФОН</th>
                <th>EMAIL</th>
                <th>СУММА</th>
                <th>ТОВАРЫ</th>
                <th>СТАТУС</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(order => (
                <tr key={order.id}>
                  <td style={{ color: '#aaa' }}>#{order.id}</td>
                  <td>{new Date(order.created_at).toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit' })}</td>
                  <td style={{ fontWeight: '700' }}>{order.customer_name}</td>
                  <td>{order.customer_phone}</td>
                  <td style={{ color: '#7F7F7F' }}>{order.customer_email || '—'}</td>
                  <td style={{ fontWeight: '700', whiteSpace: 'nowrap' }}>{order.total_amount?.toLocaleString()} ₽</td>
                  <td style={{ color: '#555', maxWidth: '200px' }}>
                    {Array.isArray(order.items)
                      ? order.items.map(i => `${i.name}${i.size ? ` (${i.size})` : ''} ×${i.qty}`).join(', ')
                      : '—'}
                  </td>
                  <td>
                    <select
                      className="status-select"
                      value={order.status}
                      onChange={e => updateStatus(order.id, e.target.value)}
                      style={{ border: `1px solid ${STATUS_COLORS[order.status] || '#ccc'}`, color: STATUS_COLORS[order.status] || '#000' }}
                    >
                      {Object.entries(STATUS_LABELS).map(([val, label]) => (
                        <option key={val} value={val}>{label}</option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
