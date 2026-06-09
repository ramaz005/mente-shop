import { useState, useEffect } from 'react';

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem('mente_cookie_accepted');
    if (!accepted) setVisible(true);
  }, []);

  const accept = () => {
    localStorage.setItem('mente_cookie_accepted', '1');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <>
      <style>{`
        .cookie-banner {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          z-index: 9999;
          background: #2F2F2F;
          color: #fff;
          padding: 20px 40px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
          animation: slideUp 0.3s ease;
        }
        .cookie-text {
          font-family: 'Anonymous Pro', monospace;
          font-size: 13px;
          line-height: 1.7;
          color: rgba(255,255,255,0.8);
          max-width: 700px;
        }
        .cookie-text a {
          color: #fff;
          text-underline-offset: 3px;
        }
        .cookie-btn {
          flex-shrink: 0;
          padding: 12px 32px;
          background: #fff;
          color: #2F2F2F;
          border: none;
          font-family: 'Anonymous Pro', monospace;
          font-size: 13px;
          letter-spacing: 2px;
          cursor: pointer;
          transition: background 0.2s, color 0.2s;
          white-space: nowrap;
        }
        .cookie-btn:hover {
          background: #AA0607;
          color: #fff;
        }
        @keyframes slideUp {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @media (max-width: 768px) {
          .cookie-banner {
            flex-direction: column;
            align-items: flex-start;
            padding: 20px 24px;
            gap: 16px;
          }
          .cookie-btn { width: 100%; text-align: center; }
        }
      `}</style>

      <div className="cookie-banner" role="dialog" aria-label="Уведомление об использовании cookies">
        <p className="cookie-text">
          Мы используем файлы cookie для улучшения работы сайта и анализа трафика.
          Продолжая использовать сайт, вы соглашаетесь с нашей{' '}
          <a href="#" style={{ textDecoration: 'underline' }}>политикой конфиденциальности</a>{' '}
          и обработкой персональных данных в соответствии с ФЗ-152.
        </p>
        <button className="cookie-btn" onClick={accept}>
          ПРИНЯТЬ
        </button>
      </div>
    </>
  );
}
