import { useState, useEffect } from 'react';
import { ATHLETES, type Athlete } from './data/athletes';
import './App.css';

export function App() {
  const [selected, setSelected] = useState<Athlete>(ATHLETES[0]);
  const [scrollProgress, setScrollProgress] = useState(0);

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
      {/* Fondo animado estilo Realidad Aumentada / HUD */}
      <div className="ar-background">
        <div className="ar-grid" />
        <div className="ar-scanner-line" />
        <div className="ar-hud-ring" />
      </div>

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

      {/* Núcleo Central Fijo: Ensamblaje Androide por Scroll */}
      <div className="android-core-stage" aria-hidden="true">
        <div className="android-frame">
          <span className="hud-corner top-left" />
          <span className="hud-corner top-right" />
          <span className="hud-corner bottom-left" />
          <span className="hud-corner bottom-right" />

          {/* Parte 1: Módulo Superior (Cabeza / Visión) */}
          <div className={`android-part part-head ${scrollProgress >= 0 ? 'assembled' : ''}`}>
            <img src="/haaland-android.png" alt="" />
            <div className="part-tag">SYS.01 // OPTICAL TARGETING</div>
          </div>

          {/* Parte 2: Módulo Central (Torso / Motor) */}
          <div className={`android-part part-torso ${scrollProgress >= 22 ? 'assembled' : ''}`}>
            <img src="/haaland-android.png" alt="" />
            <div className="part-tag">SYS.02 // CORE POWER OUTPUT</div>
          </div>

          {/* Parte 3: Módulo Inferior (Piernas / Propulsión) */}
          <div className={`android-part part-legs ${scrollProgress >= 48 ? 'assembled' : ''}`}>
            <img src="/haaland-android.png" alt="" />
            <div className="part-tag">SYS.03 // KINETIC VELOCITY</div>
          </div>
        </div>
      </div>

      {/* Contenido Editorial Superpuesto */}
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

      <section className="biometrics-section">
        <div className="bio-panel">
          <div className="meta-tag">AUGMENTED TELEMETRY // 3D MESH</div>
          <h2>CYBERNETIC EFFICIENCY ANALYSIS</h2>
          <p>
            Scroll down to complete modular hardware assembly. Each biomechanical sector locks into place with real-time velocity and spatial positioning data.
          </p>
        </div>
      </section>

      <footer className="footer">
        <p>STRIKERLAB ANALYTICS &copy; {new Date().getFullYear()} &mdash; AR MONOCHROME ENGINE</p>
      </footer>
    </div>
  );
}

export default App;
