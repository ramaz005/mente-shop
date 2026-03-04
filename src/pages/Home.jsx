import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div>
      {/* HERO */}
      <section style={{
        backgroundColor: 'var(--espresso)',
        minHeight: '90vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '40px',
        position: 'relative',
        overflow: 'hidden'
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
          fontSize: 'clamp(80px, 15vw, 180px)',
          color: 'var(--bone)',
          letterSpacing: '8px',
          lineHeight: '0.9',
          marginBottom: '32px'
        }}>
          MENTE
        </h1>

        <p style={{
          fontFamily: 'Caveat',
          fontSize: '22px',
          color: 'var(--blush)',
          marginBottom: '48px',
          maxWidth: '500px'
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
          textDecoration: 'none',
          transition: 'background-color 0.3s'
        }}>
          СМОТРЕТЬ КОЛЛЕКЦИЮ
        </Link>
      </section>

      {/* ЦЕННОСТИ */}
      <section style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        borderTop: '1px solid var(--espresso)'
      }}>
        {[
          { title: 'Свобода', text: 'Свобода — это не место на карте, а состояние духа, которое ты выбираешь каждое утро.' },
          { title: 'Честность', text: 'Качественная ткань, выверенная посадка — не маркетинговые обещания, а стандарт.' },
          { title: 'Индивидуальность', text: 'Узнаваемый дизайн, вдохновлённый мировыми трендами, но адаптированный под твою реальность.' },
          { title: 'Философия', text: 'Для тех, кто движется вперёд — физически и ментально.' },
        ].map((item, i) => (
          <div key={i} style={{
            padding: '48px',
            borderRight: i % 2 === 0 ? '1px solid var(--espresso)' : 'none',
            borderBottom: i < 2 ? '1px solid var(--espresso)' : 'none',
            backgroundColor: i === 1 ? 'var(--spanish-sun)' : i === 2 ? 'var(--lemon-pie)' : 'var(--bone)'
          }}>
            <h3 style={{
              fontFamily: 'Arial Black',
              fontSize: '20px',
              letterSpacing: '2px',
              marginBottom: '16px',
              color: i === 1 ? 'var(--bone)' : 'var(--espresso)'
            }}>
              {item.title.toUpperCase()}
            </h3>
            <p style={{
              fontFamily: 'Anonymous Pro',
              fontSize: '13px',
              lineHeight: '1.8',
              color: i === 1 ? 'var(--blush)' : 'var(--espresso)'
            }}>
              {item.text}
            </p>
          </div>
        ))}
      </section>

      {/* CTA */}
      <section style={{
        backgroundColor: 'var(--persian-plum)',
        padding: '80px 40px',
        textAlign: 'center'
      }}>
        <p style={{ fontFamily: 'Caveat', fontSize: '28px', color: 'var(--lemon-pie)', marginBottom: '16px' }}>
          Based in Moscow. Inspired by Spain.
        </p>
        <h2 style={{
          fontFamily: 'Arial Black',
          fontSize: 'clamp(32px, 5vw, 64px)',
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