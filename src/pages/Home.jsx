import { Link } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';

// Фото слайдера — файлы должны лежать в папке public/
const SLIDES = [
  '/hero.webp',
  '/hero2.jpg',
  '/hero3.jpg',
];

const INTERVAL = 3000; // автопрокрутка 3.5 сек

export default function Home() {
  const [loaded, setLoaded] = useState(false);
  const [current, setCurrent] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    setTimeout(() => setLoaded(true), 100);
  }, []);

  useEffect(() => {
    if (SLIDES.length <= 1) return;
    timerRef.current = setInterval(() => {
      setCurrent(prev => (prev + 1) % SLIDES.length);
    }, INTERVAL);
    return () => clearInterval(timerRef.current);
  }, []);

  const goTo = (i) => {
    setCurrent(i);
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrent(prev => (prev + 1) % SLIDES.length);
    }, INTERVAL);
  };

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
        .slide {
          position: absolute;
          top: 0; left: 0;
          width: 100%; height: 100%;
          object-fit: cover;
          object-position: center top;
          transition: opacity 0.9s ease;
        }
        .hero-overlay {
          position: absolute;
          top: 0; left: 0;
          width: 100%; height: 100%;
          background: rgba(0,0,0,0.18);
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
          font-weight: 500;
          font-size: clamp(18px, 4vw, 38px);
          line-height: 1;
          color: #FFFFFF;
          margin: 0;
          letter-spacing: 3px;
        }
        .hero-sub {
          font-family: 'Anonymous Pro', monospace;
          font-weight: 400;
          font-size: clamp(11px, 1.2vw, 15px);
          line-height: 1;
          color: rgba(255,255,255,0.8);
          margin: 6px 0 0;
          letter-spacing: 5px;
          text-transform: lowercase;
        }
        .hero-btn {
          display: inline-block;
          font-family: 'Anonymous Pro', monospace;
          font-weight: 400;
          font-size: clamp(11px, 1vw, 13px);
          line-height: 1;
          color: #FFFFFF;
          text-decoration: underline;
          text-underline-offset: 4px;
          margin-top: 32px;
          transition: opacity 0.3s;
          cursor: pointer;
          letter-spacing: 3px;
        }
        .hero-btn:hover { opacity: 0.6; }
        .hero-dots {
          position: absolute;
          bottom: 32px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 3;
          display: flex;
          gap: 8px;
        }
        .hero-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: rgba(255,255,255,0.4);
          cursor: pointer;
          transition: background 0.3s, transform 0.3s;
          border: none;
          padding: 0;
        }
        .hero-dot.active {
          background: #fff;
          transform: scale(1.3);
        }
        @media (max-width: 768px) {
          .hero-title { font-size: 28px !important; }
          .hero-sub { font-size: 11px !important; letter-spacing: 3px !important; }
          .hero-btn { font-size: 11px !important; margin-top: 24px !important; }
        }
      `}</style>

      {SLIDES.map((src, i) => (
        <img
          key={src}
          src={src}
          alt="MENTE"
          className="slide"
          style={{ opacity: i === current ? (loaded ? 1 : 0) : 0 }}
        />
      ))}

      <div className="hero-overlay" />

      <div className="hero-content">
        <h1 className="hero-title">MENTE</h1>
        <p className="hero-sub">store</p>
        <Link to="/catalog" className="hero-btn">CATALOG</Link>
      </div>

    </div>
  );
}
