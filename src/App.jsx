import React, { useState, useRef } from 'react'
import './App.css'

export default function App() {
  const [stage, setStage] = useState('cover') // 'cover' | 'video' | 'final'
  const videoRef = useRef(null)

  const handleOpenInvitation = () => {
    setStage('video')
    if (videoRef.current) {
      videoRef.current.currentTime = 0
      videoRef.current.play().catch(err => {
        console.error('Erro ao reproduzir vídeo:', err)
      })
    }
  }

  const handleVideoEnded = () => {
    setStage('final')
  }

  return (
    <main className="viewport">
      {/* 1. Camada da Capa (Envelope com Selo e Toque Interativo) */}
      <section
        id="cover-layer"
        className={`fullscreen-layer ${stage !== 'cover' ? 'hidden-layer' : ''}`}
      >
        <div className="cover-top-instruction">
          <span className="instruction-line"></span>
          <span className="instruction-text">TOQUE NO LACRE PARA ABRIR</span>
          <span className="instruction-line"></span>
        </div>

        {/* Hotspot de clique no lacre central com anéis pulsantes */}
        <button
          id="seal-trigger"
          className="seal-hotspot"
          onClick={handleOpenInvitation}
          aria-label="Romper lacre e abrir convite"
        >
          <span className="seal-glow-ring"></span>
          <span className="seal-glow-ring ring-delay"></span>
        </button>

        <div className="cover-content">
          <p className="cursive-callout">Você é nosso convidado especial</p>
          <h2 className="cover-title">XV da Laís</h2>
        </div>
      </section>

      {/* 2. Camada do Vídeo de Transição */}
      <video
        ref={videoRef}
        id="portal-video"
        className={`fullscreen-layer ${stage === 'video' ? 'visible-video' : 'hidden-layer'}`}
        playsInline
        webkit-playsinline="true"
        preload="auto"
        onEnded={handleVideoEnded}
      >
        <source src="/assets/video.mp4" type="video/mp4" />
      </video>

      {/* 3. Camada do Fundo Céu Estrelado */}
      <div id="final-backdrop" className="fullscreen-layer"></div>

      {/* 4. Camada Interativa Final de Informações */}
      <section
        id="interactive-layer"
        className={`fullscreen-layer ${stage === 'final' ? 'active' : ''}`}
      >
        {/* Moldura Ornamental de Gala em Vetor SVG */}
        <div className="frame-container">
          <svg className="frame-corner corner-tl" viewBox="0 0 100 100" fill="none">
            <path d="M10 90 V20 Q10 10 20 10 H90" stroke="url(#silverGrad)" stroke-width="2" />
            <path d="M18 90 V26 Q18 18 26 18 H90" stroke="url(#silverGrad)" stroke-width="1" strokeDasharray="3,3" />
            <circle cx="20" cy="20" r="3" fill="url(#silverGrad)" />
            <path d="M26 10 C32 16 38 18 50 14" stroke="url(#silverGrad)" stroke-width="1" />
            <path d="M10 26 C16 32 18 38 14 50" stroke="url(#silverGrad)" stroke-width="1" />
          </svg>

          <svg className="frame-corner corner-tr" viewBox="0 0 100 100" fill="none">
            <path d="M90 90 V20 Q90 10 80 10 H10" stroke="url(#silverGrad)" stroke-width="2" />
            <path d="M82 90 V26 Q82 18 74 18 H10" stroke="url(#silverGrad)" stroke-width="1" strokeDasharray="3,3" />
            <circle cx="80" cy="20" r="3" fill="url(#silverGrad)" />
            <path d="M74 10 C68 16 62 18 50 14" stroke="url(#silverGrad)" stroke-width="1" />
            <path d="M90 26 C84 32 82 38 86 50" stroke="url(#silverGrad)" stroke-width="1" />
          </svg>

          <svg className="frame-corner corner-bl" viewBox="0 0 100 100" fill="none">
            <path d="M10 10 V80 Q10 90 20 90 H90" stroke="url(#silverGrad)" stroke-width="2" />
            <path d="M18 10 V74 Q18 82 26 82 H90" stroke="url(#silverGrad)" stroke-width="1" strokeDasharray="3,3" />
            <circle cx="20" cy="80" r="3" fill="url(#silverGrad)" />
            <path d="M26 90 C32 84 38 82 50 86" stroke="url(#silverGrad)" stroke-width="1" />
            <path d="M10 74 C16 68 18 62 14 50" stroke="url(#silverGrad)" stroke-width="1" />
          </svg>

          <svg className="frame-corner corner-br" viewBox="0 0 100 100" fill="none">
            <path d="M90 10 V80 Q90 90 80 90 H10" stroke="url(#silverGrad)" stroke-width="2" />
            <path d="M82 10 V74 Q82 82 74 82 H10" stroke="url(#silverGrad)" stroke-width="1" strokeDasharray="3,3" />
            <circle cx="80" cy="80" r="3" fill="url(#silverGrad)" />
            <path d="M74 90 C68 84 62 82 50 86" stroke="url(#silverGrad)" stroke-width="1" />
            <path d="M90 74 C84 68 82 62 86 50" stroke="url(#silverGrad)" stroke-width="1" />
          </svg>
        </div>

        {/* Conteúdo Central */}
        <div className="content-box">
          <div className="moon-wrapper">
            <svg viewBox="0 0 100 100" className="moon-svg">
              <defs>
                <linearGradient id="silverGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="35%" stopColor="#e2e8f0" />
                  <stop offset="70%" stopColor="#cbd5e1" />
                  <stop offset="100%" stopColor="#94a3b8" />
                </linearGradient>
                <filter id="silverGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3.5" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              <path d="M52 14 A36 36 0 1 0 86 54 A28 28 0 1 1 52 14 Z" fill="url(#silverGrad)" filter="url(#silverGlow)" />
              <polygon points="56,22 57.5,26.5 62,28 57.5,29.5 56,34 54.5,29.5 50,28 54.5,26.5" fill="#ffffff" filter="url(#silverGlow)" />
              <polygon points="76,40 77,43 80,44 77,45 76,48 75,45 72,44 75,43" fill="#ffffff" />
            </svg>
          </div>

          <header className="invite-header">
            <p className="poetic-sub">CONVIDO VOCÊ PARA CELEBRAR</p>
            <p className="poetic-sub">MEUS 15 ANOS</p>
          </header>

          <div className="monogram-container">
            <svg className="swash-svg swash-left" viewBox="0 0 120 40">
              <path d="M10 22 C35 8, 65 32, 95 18 C105 13, 115 16, 120 20" fill="none" stroke="url(#silverGrad)" strokeWidth="1.8" strokeLinecap="round" />
              <circle cx="10" cy="22" r="2" fill="url(#silverGrad)" />
              <path d="M40 19 C55 12, 75 24, 90 19" fill="none" stroke="url(#silverGrad)" strokeWidth="1" opacity="0.6" />
            </svg>

            <span className="silver-text-metal monogram-letters">XV</span>

            <svg className="swash-svg swash-right" viewBox="0 0 120 40">
              <path d="M110 22 C85 8, 55 32, 25 18 C15 13, 5 16, 0 20" fill="none" stroke="url(#silverGrad)" strokeWidth="1.8" strokeLinecap="round" />
              <circle cx="110" cy="22" r="2" fill="url(#silverGrad)" />
              <path d="M80 19 C65 12, 45 24, 30 19" fill="none" stroke="url(#silverGrad)" strokeWidth="1" opacity="0.6" />
            </svg>
          </div>

          <h1 className="silver-text-metal celebrant-name">Laís Eduarda</h1>

          <div className="silver-separator">
            <span className="sep-line"></span>
            <span className="sep-star">✦</span>
            <span className="sep-line"></span>
          </div>

          <div className="calendar-block">
            <div className="cal-col cal-day-name">SÁBADO</div>
            <div className="cal-divider-vertical"></div>
            <div className="cal-col-center">
              <span className="silver-text-metal cal-big-day">17</span>
              <span className="cal-month-year">OUTUBRO • 2026</span>
            </div>
            <div className="cal-divider-vertical"></div>
            <div className="cal-col cal-time">ÀS 21:00H</div>
          </div>

          <div className="silver-separator">
            <span className="sep-line"></span>
            <span className="sep-star">✦</span>
            <span className="sep-line"></span>
          </div>

          <div className="venue-block">
            <div className="venue-icon-wrapper">
              <svg className="venue-svg" viewBox="0 0 24 24" fill="none" stroke="url(#silverGrad)" strokeWidth="1.5">
                <path d="M12 21s-6-5.333-6-10a6 6 0 1 1 12 0c0 4.667-6 10-6 10z" />
                <circle cx="12" cy="11" r="2.5" />
              </svg>
            </div>
            <h2 className="venue-name">ESPACE CELEBRATION</h2>
            <p className="venue-address">Rua das Flores, 1500 — Jardim Real</p>
            <p className="venue-city">Belo Horizonte — MG</p>
          </div>

          <footer className="actions-block">
            <a href="https://maps.google.com" target="_blank" rel="noreferrer" className="btn-royal-action">
              <span className="btn-royal-shimmer"></span>
              <span className="btn-caption">COMO CHEGAR</span>
            </a>
          </footer>
        </div>
      </section>
    </main>
  )
}
