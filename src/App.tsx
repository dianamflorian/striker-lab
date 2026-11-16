import { useState, useEffect } from 'react';
import { ATHLETES, type Athlete } from './data/athletes';
import { CosmosCanvas } from './components/CosmosCanvas';
import './App.css';

const COMPASS_VIEWS = [
  { label: 'N // 0°', angle: 0 },
  { label: 'E // 90°', angle: 90 },
  { label: 'S // 180°', angle: 180 },
  { label: 'W // 270°', angle: 270 },
];

export function App() {
  const [selected, setSelected] = useState<Athlete>(ATHLETES[0]);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [heading, setHeading] = useState(0);

  useEffect(() => {
    document.documentElement.style.setProperty('--accent', selected.accentColor);
  }, [selected]);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const current = totalScroll > 0 ? Math.min(100, Math.max(0, (window.scrollY / totalScroll) * 100)) : 0;
      setScrollProgress(current);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="app-container">
      {/* Bóveda Celeste Astrofotográfica en 360° */}
      <CosmosCanvas heading={heading} accentColor={selected.accentColor} />

      {/* Encabezado Translúcido */}
      <header className="navbar">
        <div className="brand">
          STRIKER<span>LAB</span>
        </div>

        <div className="athlete-switcher" role="tablist" aria-label="Select Athlete">
          {ATHLETES.map((athlete) => (
            <button
              key={athlete.id}
              onClick={() => setSelected(athlete)}
              className={`switcher-btn ${selected.id === athlete.id ? 'active' : ''}`}
            >
              {athlete.name}
            </button>
          ))}
        </div>
      </header>

      {/* Selector Panorámico de Horizonte (Norte, Este, Sur, Oeste) */}
      <div className="compass-bar" aria-label="Sky Panorama Orientation">
        <span className="compass-title">SKY HORIZON:</span>
        {COMPASS_VIEWS.map((view) => (
          <button
            key={view.label}
            onClick={() => setHeading(view.angle)}
            className={`compass-btn ${heading === view.angle ? 'active' : ''}`}
          >
            {view.label}
          </button>
        ))}
      </div>

      {/* Núcleo Central: Ensamblaje Androide + Sistema Orbital */}
      <div className="android-core-stage" aria-hidden="true">
        <div className="orbit-track primary-track">
          <div className="soccer-ball-3d" />
        </div>

        <div className="orbit-track secondary-track">
          <div className="satellite-sphere" />
        </div>

        <div className="android-frame">
          <span className="hud-corner top-left" />
          <span className="hud-corner top-right" />
          <span className="hud-corner bottom-left" />
          <span className="hud-corner bottom-right" />

          <div className={`android-part part-head ${scrollProgress >= 0 ? 'assembled' : ''}`}>
            <img src="/haaland-android.png" alt="" />
            <div className="part-tag">SYS.01 // OPTICAL TARGETING</div>
          </div>

          <div className={`android-part part-torso ${scrollProgress >= 18 ? 'assembled' : ''}`}>
            <img src="/haaland-android.png" alt="" />
            <div className="part-tag">SYS.02 // CORE POWER OUTPUT</div>
          </div>

          <div className={`android-part part-legs ${scrollProgress >= 38 ? 'assembled' : ''}`}>
            <img src="/haaland-android.png" alt="" />
            <div className="part-tag">SYS.03 // KINETIC VELOCITY</div>
          </div>
        </div>
      </div>

      {/* Contenido Editorial Principal */}
      <main className="hero-section">
        <div className="hero-content">
          <div className="meta-tag">
            {selected.number} // {selected.club} &bull; {selected.nationality}
          </div>
          <h1 className="hero-title">{selected.headline}</h1>
          <p className="hero-bio">{selected.bio}</p>

          <div className="actions">
            <a href="#telemetry" className="primary-btn">
              Initialize Scan ({Math.round(scrollProgress)}%)
            </a>
            <span className="accent-badge">Unit: {selected.name}</span>
          </div>
        </div>
      </main>

      {/* Tarjetas de Estadísticas */}
      <section id="telemetry" className="stats-grid">
        {selected.stats.map((stat) => (
          <article key={stat.label} className="stat-card">
            <div className="stat-value">
              {stat.value}
              {stat.suffix && <span>{stat.suffix}</span>}
            </div>
            <div className="stat-label">{stat.label}</div>
          </article>
        ))}
      </section>

      {/* Panel de Telemetría Biomecánica */}
      <section className="biometrics-section">
        <div className="bio-panel">
          <div className="meta-tag">AUGMENTED TELEMETRY // 3D MESH</div>
          <h2>CYBERNETIC EFFICIENCY ANALYSIS</h2>
          <p>
            Move your cursor or switch cardinal horizons to rotate the celestial dome. Scroll down to lock each biomechanical sector into place.
          </p>
        </div>
      </section>

      <footer className="footer">
        <p>STRIKERLAB ANALYTICS &copy; {new Date().getFullYear()} &mdash; ATMOSPHERIC OBSERVATORY EDITION</p>
      </footer>
    </div>
  );
}

export default App;
