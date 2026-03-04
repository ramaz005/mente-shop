export default function Footer() {
  return (
    <footer style={{
      backgroundColor: 'var(--espresso)',
      padding: '48px 40px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderTop: '1px solid var(--persian-plum)'
    }}>
      <div>
        <p style={{
          fontFamily: 'Arial Black',
          fontSize: '24px',
          color: 'var(--bone)',
          letterSpacing: '4px'
        }}>MENTE</p>
        <p style={{
          fontFamily: 'Anonymous Pro',
          fontSize: '10px',
          color: 'var(--golden-matcha)',
          letterSpacing: '2px',
          marginTop: '4px'
        }}>mind muscle connection.</p>
      </div>
      <p style={{
        fontFamily: 'Caveat',
        fontSize: '16px',
        color: 'var(--blush)'
      }}>
        Based in Moscow. Inspired by Spain.
      </p>
      <p style={{
        fontFamily: 'Anonymous Pro',
        fontSize: '10px',
        color: 'var(--blush)',
        opacity: 0.5
      }}>
        © 2026 MENTE
      </p>
    </footer>
  );
}