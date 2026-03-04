import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div>
      <style>{`
        .values-grid { display: grid; grid-template-columns: repeat(2, 1fr); }
        .cta-section { padding: 80px 40px; }
        @media (max-width: 768px) {
          .values-grid { grid-template-columns: 1fr !important; }
          .cta-section { padding: 60px 24px !important; }
        }
      `}</style>

      {/* HERO */}
      <section style={{
        backgroundColor: 'var(--espresso)',
        minHeight: '90vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '40px 24px'
      }}>
        <p style={{
          fontFamily: 'Anonymous Pro',
          fontSize: '11px',
          color: 'var(--golden-matcha)',
          letterSpacing: '4px',
          marginBottom: '24px'
        }}>
          mind muscle connection.
        </p>
        <h1 style={{
          fontFamily: 'Arial Black',
          fontSize: 'clamp(60px, 20vw, 180px)',
          color: 'var(--bone)',
          letterSpacing: '8px',
          lineHeight: '0.9',
          marginBottom: '32px'
        }}>
          MENTE
        </h1>
        <p style={{
          fontFamily: 'Caveat',
          fontSize: 'clamp(18px, 4vw, 22px)',
          color: 'var(--blush)',
          marginBottom: '48px',
          maxWidth: '500px',
          padding: '0 16px'
        }}>
          Рождён под солнцем Севильи. Создан для тебя.
        </p>
        <Link to="/catalog" style={{
          padding: '16px 48px',
          backgroundColor: 'var(--spanish-sun)',
          color: 'var(--bone)',
          fontFamily: 'Anonymous Pro',
          fontSize: '11px',
          letterSpacing: '3px',
          textDecoration: 'none'
        }}>
          СМОТРЕТЬ КОЛЛЕКЦИЮ
        </Link>
      </section>

      {/* ЦЕННОСТИ */}
      <div className="values-grid" style={{ borderTop: '1px solid var(--espresso)' }}>
        {[
          { title: 'Свобода', text: 'Свобода — это не место на карте, а состояние духа, которое ты выбираешь каждое утро.', bg: 'var(--bone)', color: 'var(--espresso)' },
          { title: 'Честность', text: 'Качественная ткань, выверенная посадка — не маркетинговые обещания, а стандарт.', bg: 'var(--spanish-sun)', color: 'var(--bone)' },
          { title: 'Индивидуальность', text: 'Узнаваемый дизайн, вдохновлённый мировыми трендами, но адаптированный под твою реальность.', bg: 'var(--lemon-pie)', color: 'var(--espresso)' },
          { title: 'Философия', text: 'Для тех, кто движется вперёд — физически и ментально.', bg: 'var(--bone)', color: 'var(--espresso)' },
        ].map((item, i) => (
          <div key={i} style={{
            padding: 'clamp(32px, 5vw, 48px)',
            borderRight: i % 2 === 0 ? '1px solid var(--espresso)' : 'none',
            borderBottom: '1px solid var(--espresso)',
            backgroundColor: item.bg
          }}>
            <h3 style={{
              fontFamily: 'Arial Black',
              fontSize: 'clamp(16px, 3vw, 20px)',
              letterSpacing: '2px',
              marginBottom: '16px',
              color: item.color
            }}>
              {item.title.toUpperCase()}
            </h3>
            <p style={{
              fontFamily: 'Anonymous Pro',
              fontSize: 'clamp(12px, 2vw, 13px)',
              lineHeight: '1.8',
              color: item.color
            }}>
              {item.text}
            </p>
          </div>
        ))}
      </div>

      {/* CTA */}
      <section className="cta-section" style={{
        backgroundColor: 'var(--persian-plum)',
        textAlign: 'center'
      }}>
        <p style={{ fontFamily: 'Caveat', fontSize: 'clamp(20px, 4vw, 28px)', color: 'var(--lemon-pie)', marginBottom: '16px' }}>
          Based in Moscow. Inspired by Spain.
        </p>
        <h2 style={{
          fontFamily: 'Arial Black',
          fontSize: 'clamp(24px, 5vw, 64px)',
          color: 'var(--bone)',
          letterSpacing: '4px',
          marginBottom: '32px'
        }}>
          ТВОЙ ВНУТРЕННИЙ ОГОНЬ
        </h2>
        <Link to="/catalog" style={{
          padding: '16px 48px',
          border: '1px solid var(--bone)',
          color: 'var(--bone)',
          fontFamily: 'Anonymous Pro',
          fontSize: '11px',
          letterSpacing: '3px',
          textDecoration: 'none'
        }}>
          КАТАЛОГ →
        </Link>
      </section>
    </div>
  );
}