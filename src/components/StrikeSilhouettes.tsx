export function StrikeSilhouettes() {
  return (
    <div className="silhouettes-stage" aria-hidden="true">
      {/* Escena 1: Volea Acrobática + Portería Izquierda */}
      <div className="strike-scene scene-volley">
        <svg viewBox="0 0 360 180" className="strike-svg">
          {/* Portería en silueta */}
          <path
            d="M 15 150 L 15 45 L 115 45 L 115 150"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="2.5"
            strokeDasharray="4 4"
            opacity="0.65"
          />
          <line x1="15" y1="45" x2="40" y2="30" stroke="var(--accent)" strokeWidth="1.5" opacity="0.4" />
          <line x1="115" y1="45" x2="140" y2="30" stroke="var(--accent)" strokeWidth="1.5" opacity="0.4" />
          <line x1="40" y1="30" x2="140" y2="30" stroke="var(--accent)" strokeWidth="1.5" opacity="0.4" />

          {/* Silueta Estelar de Haaland ejecutando volea aérea */}
          <g className="striker-figure">
            <circle cx="245" cy="68" r="9" />
            <path d="M 238 78 L 210 96 L 185 88" strokeWidth="7" strokeLinecap="round" fill="none" />
            <path d="M 210 96 L 162 62" strokeWidth="7" strokeLinecap="round" fill="none" />
            <path d="M 212 96 L 232 132" strokeWidth="6" strokeLinecap="round" fill="none" />
            <path d="M 235 80 L 265 65" strokeWidth="5" strokeLinecap="round" fill="none" />
          </g>

          {/* Trayectoria y balón hacia el ángulo */}
          <path
            d="M 155 58 Q 100 42 35 65"
            fill="none"
            stroke="#ffffff"
            strokeWidth="2"
            strokeDasharray="6 6"
            className="shot-trail"
          />
          <circle cx="155" cy="58" r="5" fill="#ffffff" className="shot-ball" />
        </svg>
        <span className="scene-label">CONSTELLATION // ACROBATIC VOLLEY</span>
      </div>

      {/* Escena 2: Remate Potente Cruzado + Portería Derecha */}
      <div className="strike-scene scene-power">
        <svg viewBox="0 0 360 180" className="strike-svg">
          {/* Portería en silueta */}
          <path
            d="M 245 150 L 245 45 L 345 45 L 345 150"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="2.5"
            strokeDasharray="4 4"
            opacity="0.65"
          />
          <line x1="245" y1="45" x2="220" y2="30" stroke="var(--accent)" strokeWidth="1.5" opacity="0.4" />
          <line x1="345" y1="45" x2="320" y2="30" stroke="var(--accent)" strokeWidth="1.5" opacity="0.4" />
          <line x1="220" y1="30" x2="320" y2="30" stroke="var(--accent)" strokeWidth="1.5" opacity="0.4" />

          {/* Silueta Estelar de Haaland en carrera y disparo */}
          <g className="striker-figure">
            <circle cx="115" cy="54" r="9" />
            <path d="M 112 65 L 104 102 L 84 148" strokeWidth="7" strokeLinecap="round" fill="none" />
            <path d="M 104 102 L 144 128" strokeWidth="7" strokeLinecap="round" fill="none" />
            <path d="M 110 72 L 85 90" strokeWidth="5" strokeLinecap="round" fill="none" />
            <path d="M 114 72 L 142 66" strokeWidth="5" strokeLinecap="round" fill="none" />
          </g>

          {/* Trayectoria rasante al segundo palo */}
          <path
            d="M 152 128 Q 235 110 325 78"
            fill="none"
            stroke="#ffffff"
            strokeWidth="2"
            strokeDasharray="6 6"
            className="shot-trail"
          />
          <circle cx="152" cy="128" r="5" fill="#ffffff" className="shot-ball" />
        </svg>
        <span className="scene-label">CONSTELLATION // CLINICAL FINISH</span>
      </div>
    </div>
  );
}
