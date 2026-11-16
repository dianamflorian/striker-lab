import { useState, useEffect } from 'react';
import { TABS_DATA, INITIAL_NEWS, type TabTheme } from './data/athletes';
import { CosmosCanvas } from './components/CosmosCanvas';
import './App.css';

const COMPASS_VIEWS = [
  { label: 'N // 0°', angle: 0 },
  { label: 'E // 90°', angle: 90 },
  { label: 'S // 180°', angle: 180 },
  { label: 'W // 270°', angle: 270 },
];

export function App() {
  const [selectedTab, setSelectedTab] = useState<TabTheme>(TABS_DATA[0]);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [heading, setHeading] = useState(0);
  const [newsFilter, setNewsFilter] = useState<string>('ALL');

  useEffect(() => {
    document.documentElement.style.setProperty('--accent', selectedTab.accentColor);
  }, [selectedTab]);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const current = totalScroll > 0 ? Math.min(100, Math.max(0, (window.scrollY / totalScroll) * 100)) : 0;
      setScrollProgress(current);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filteredNews =
    newsFilter === 'ALL'
      ? INITIAL_NEWS
      : INITIAL_NEWS.filter((item) => item.category === newsFilter);

  return (
    <div className={`app-container mode-${selectedTab.id}`}>
      {/* Bóveda Celeste Astrofotográfica en 360° */}
      <CosmosCanvas heading={heading} accentColor={selectedTab.accentColor} />

      {/* Encabezado Translúcido */}
      <header className="navbar">
        <div className="brand">
          STRIKER<span>LAB</span>
        </div>

        <nav className="athlete-switcher" role="tablist" aria-label="Select Section">
          {TABS_DATA.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setSelectedTab(tab);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`switcher-btn ${selectedTab.id === tab.id ? 'active' : ''}`}
            >
              {tab.tabLabel}
            </button>
          ))}
        </nav>
      </header>

      {/* Selector Panorámico de Horizonte */}
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

      {/* =========================================================
          VISTA 1: MANCHESTER CITY (PREMIER LEAGUE 2026/27)
         ========================================================= */}
      {selectedTab.id === 'mancity' && (
        <>
          <div className="android-core-stage" aria-hidden="true">
            <div className="orbit-track primary-track">
              <div className="soccer-ball-3d ball-premier-2026" title={selectedTab.ballName} />
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
                <img src="/haaland-android.png" alt="Erling Haaland Manchester City" />
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

          <main className="hero-section">
            <div className="hero-content">
              <div className="meta-tag">
                {selectedTab.number} // {selectedTab.team} &bull; {selectedTab.competition}
              </div>
              <h1 className="hero-title">{selectedTab.headline}</h1>
              <p className="hero-bio">{selectedTab.bio}</p>

              <div className="actions">
                <a href="#telemetry" className="primary-btn">
                  Initialize Scan ({Math.round(scrollProgress)}%)
                </a>
                <span className="accent-badge">Match Ball: {selectedTab.ballName}</span>
              </div>
            </div>
          </main>

          <section id="telemetry" className="stats-grid">
            {selectedTab.stats.map((stat) => (
              <article key={stat.label} className="stat-card">
                <div className="stat-value">
                  {stat.value}
                  {stat.suffix && <span>{stat.suffix}</span>}
                </div>
                <div className="stat-label">{stat.label}</div>
              </article>
            ))}
          </section>
        </>
      )}

      {/* =========================================================
          VISTA 2: UEFA NATIONS LEAGUE (NORUEGA - ROJO + TIMELINE HORIZONTAL)
         ========================================================= */}
      {selectedTab.id === 'nations-league' && (
        <main className="nations-layout">
          {/* Columna Izquierda: Imagen Vertical Grande y Fija de Haaland (Noruega) */}
          <aside className="norway-portrait-column">
            <div className="norway-portrait-card">
              <div className="orbit-track norway-ball-orbit" aria-hidden="true">
                <div className="soccer-ball-3d ball-uefa-2026" title={selectedTab.ballName} />
              </div>

              <span className="hud-corner top-left" />
              <span className="hud-corner top-right" />
              <span className="hud-corner bottom-left" />
              <span className="hud-corner bottom-right" />

              <img
                src="/haaland-norway.png"
                alt="Erling Haaland Norway National Team"
                className="norway-vertical-img"
              />
              <div className="portrait-caption">
                <span>NORWAY #09 // CAPTAIN</span>
                <small>{selectedTab.ballName}</small>
              </div>
            </div>
          </aside>

          {/* Columna Derecha: Rendimiento + Línea de Tiempo Horizontal */}
          <section className="norway-content-column">
            <div className="norway-header-box">
              <div className="meta-tag">
                {selectedTab.number} // {selectedTab.team} &bull; {selectedTab.competition}
              </div>
              <h1 className="hero-title">{selectedTab.headline}</h1>
              <p className="hero-bio">{selectedTab.bio}</p>
            </div>

            {/* Métricas de Rendimiento con Noruega */}
            <div className="norway-stats-row">
              {selectedTab.stats.map((stat) => (
                <article key={stat.label} className="stat-card">
                  <div className="stat-value">
                    {stat.value}
                    {stat.suffix && <span>{stat.suffix}</span>}
                  </div>
                  <div className="stat-label">{stat.label}</div>
                </article>
              ))}
            </div>

            {/* Línea de Tiempo Horizontal Interactiva */}
            <div className="timeline-wrapper">
              <div className="timeline-header">
                <span className="meta-tag">HORIZONTAL MATCHDAY TIMELINE // 2026 CAMPAIGN</span>
                <span className="scroll-hint">SCROLL HORIZONTALLY &rarr;</span>
              </div>

              <div className="horizontal-timeline-track">
                {selectedTab.timeline?.map((item, idx) => (
                  <article key={item.date} className="timeline-node">
                    <div className="timeline-connector">
                      <span className="node-dot">{idx + 1}</span>
                      <div className="node-line" />
                    </div>
                    <div className="timeline-card">
                      <div className="tl-date">{item.date}</div>
                      <h3 className="tl-match">{item.match}</h3>
                      <div className="tl-stage">{item.stage}</div>
                      <div
                        className="tl-contribution"
                        dangerouslySetInnerHTML={{ __html: item.contribution }}
                      />
                      <p className="tl-summary">{item.summary}</p>
                      <div className="tl-rating">MATCH RATING: {item.rating}</div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        </main>
      )}

       {/* =========================================================
          VISTA 3: NEWS (ESPACIO VERTICAL AMPLIO PARA NOVEDADES)
         ========================================================= */}
      {selectedTab.id === 'news' && (
        <main className="news-layout">
          <div className="news-header">
            <div className="meta-tag">
              {selectedTab.number} // {selectedTab.competition}
            </div>
            <h1 className="hero-title">{selectedTab.headline}</h1>
            <p className="hero-bio">{selectedTab.bio}</p>

            <div className="news-filters">
              {['ALL', 'INTERNATIONAL', 'CLUB', 'RECORDS'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setNewsFilter(cat)}
                  className={`filter-pill ${newsFilter === cat ? 'active' : ''}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="news-vertical-feed">
            {filteredNews.map((article) => (
              <article key={article.id} className="news-article-card">
                <div className="news-meta-row">
                  <span className="news-badge">{article.category}</span>
                  <span className="news-date">{article.date}</span>
                </div>
                <h2 className="news-article-title">{article.title}</h2>
                <p className="news-article-summary">{article.summary}</p>
                <div className="news-article-details">{article.details}</div>
              </article>
            ))}
          </div>
        </main>
      )}

      <footer className="footer">
        <p>STRIKERLAB ANALYTICS &copy; {new Date().getFullYear()} &mdash; ERLING HAALAND EDITION</p>
      </footer>
    </div>
  );
}

export default App;
