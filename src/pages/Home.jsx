import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function Home() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => setLoaded(true), 100);
  }, []);

  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0,
      width: '100vw',
      height: '100vh',
      overflow: 'hidden',
      backgroundColor: '#000'
    }}>
      <style>{`
        .hero-img {
          position: absolute;
          top: 0; left: 0;
          width: 100%; height: 100%;
          object-fit: cover;
          object-position: center top;
          opacity: ${loaded ? 1 : 0};
          transition: opacity 1.2s ease;
        }
        .hero-overlay {
          position: absolute;
          top: 0; left: 0;
          width: 100%; height: 100%;
          background: rgba(0,0,0,0.15);
          z-index: 1;
        }
        .hero-content {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 2;
          text-align: center;
          opacity: ${loaded ? 1 : 0};
          transition: opacity 1.5s ease 0.3s;
        }
        .hero-title {
          font-family: 'Druk Wide Cyr', 'Arial Black', sans-serif;
          font-style: normal;
          font-weight: 500;
          font-size: 81px;
          line-height: 98px;
          color: #FFFFFF;
          margin: 0;
          letter-spacing: 2px;
        }
        .hero-sub {
          font-family: 'Anonymous Pro', monospace;
          font-style: normal;
          font-weight: 400;
          font-size: 21.5px;
          line-height: 22px;
          color: #FFFFFF;
          margin: 0;
          margin-top: 4px;
        }
        .hero-btn {
          display: inline-block;
          font-family: 'Anonymous Pro', monospace;
          font-style: normal;
          font-weight: 400;
          font-size: 22px;
          line-height: 22px;
          color: #FFFFFF;
          text-decoration: underline;
          text-underline-offset: 4px;
          margin-top: 24px;
          transition: opacity 0.3s;
          cursor: pointer;
          letter-spacing: 1px;
        }
        .hero-btn:hover { opacity: 0.6; }

        @media (max-width: 768px) {
          .hero-title { font-size: 48px !important; line-height: 1.1 !important; }
          .hero-sub { font-size: 14px !important; }
          .hero-btn { font-size: 16px !important; }
        }
      `}</style>

      <img src="/hero.jpg" alt="MENTE" className="hero-img" />
      <div className="hero-overlay" />

      <div className="hero-content">
        <h1 className="hero-title">MENTE</h1>
        <p className="hero-sub">born in moscow - inspired by spain.</p>
        <Link to="/catalog" className="hero-btn">CATALOG</Link>
      </div>
    </div>
  );
}