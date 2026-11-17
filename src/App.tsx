import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TABS_DATA, INITIAL_NEWS, HAALAND_SECTIONS, type TabTheme } from './data/athletes';
import { CosmosCanvas } from './components/CosmosCanvas';
import './App.css';

gsap.registerPlugin(ScrollTrigger);

const COMPASS_VIEWS = [
  { label: 'N // 0°', angle: 0 },
  { label: 'E // 90°', angle: 90 },
  { label: 'S // 180°', angle: 180 },
  { label: 'W // 270°', angle: 270 },
];

export function App() {
  const [selectedTab, setSelectedTab] = useState<TabTheme>(TABS_DATA[0]);
  const [heading, setHeading] = useState(0);
  const [newsFilter, setNewsFilter] = useState<string>('ALL');

  const mancityContainerRef = useRef<HTMLDivElement | null>(null);
  const norwayVideoBoxRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    document.documentElement.style.setProperty('--accent', selectedTab.accentColor);
  }, [selectedTab]);

  // Animación lateral cruzada (---> <---) al bajar en cada una de las 4 secciones
  useEffect(() => {
    if (selectedTab.id !== 'mancity' || !mancityContainerRef.current) return;

    const ctx = gsap.context(() => {
      // Parallax suave en el video superior
      gsap.to('.city-video-box video', {
        yPercent: 12,
        ease: 'none',
        scrollTrigger: {
          trigger: '.city-video-box',
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

      // Ensamblaje modular de Haaland antes del Sector 02
      const assemblyTl = gsap.timeline({
        scrollTrigger: {
          trigger: '.assembly-interlude-section',
          start: 'top 75%',
          end: 'center center',
          scrub: 0.8,
        },
      });

      assemblyTl
        .fromTo('.mod-head', { y: -90, opacity: 0 }, { y: 0, opacity: 1, ease: 'power2.out' }, 0)
        .fromTo('.mod-torso', { x: 110, opacity: 0 }, { x: 0, opacity: 1, ease: 'power2.out' }, 0.1)
        .fromTo('.mod-legs', { y: 90, opacity: 0 }, { y: 0, opacity: 1, ease: 'power2.out' }, 0.2);


      // Entrada horizontal ---> <--- por cada sección con imagen de fondo
      const bands = gsap.utils.toArray<HTMLElement>('.career-bg-band');
      bands.forEach((band) => {
        const leftCard = band.querySelector('.slide-from-left');
        const rightCard = band.querySelector('.slide-from-right');

        if (leftCard) {
          gsap.fromTo(
            leftCard,
            { x: -120, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 0.9,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: band,
                start: 'top 78%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        }

        if (rightCard) {
          gsap.fromTo(
            rightCard,
            { x: 120, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 0.9,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: band,
                start: 'top 78%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        }
      });
    }, mancityContainerRef);

    return () => ctx.revert();
  }, [selectedTab.id]);

  // Transición de aparición imprevista para el video de CapCut en Noruega
  useEffect(() => {
    if (selectedTab.id !== 'nations-league' || !norwayVideoBoxRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        norwayVideoBoxRef.current,
        {
          clipPath: 'inset(50% 50% 50% 50%)',
          scale: 1.15,
          opacity: 0,
        },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          scale: 1,
          opacity: 1,
          duration: 0.85,
          ease: 'expo.out',
        }
      );
    });

    return () => ctx.revert();
  }, [selectedTab.id]);

  const filteredNews =
    newsFilter === 'ALL'
      ? INITIAL_NEWS
      : INITIAL_NEWS.filter((item) => item.category === newsFilter);

  return (
    <div className={`app-container mode-${selectedTab.id}`}>
      {/* Bóveda Celeste Astrofotográfica y Rejilla Turquesa */}
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
          VISTA 1: MANCHESTER CITY (VIDEO + 4 SECCIONES CON IMAGEN DE FONDO Y ENTRADA ---> <---)
         ========================================================= */}
      {selectedTab.id === 'mancity' && (
        <main ref={mancityContainerRef} className="mancity-structured-layout">
          {/* 1. Video Horizontal Inmersivo Superior */}
          <section className="city-video-box">
            <video
              src="/haaland-city-hero.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="city-banner-video"
            />
            <div className="video-overlay-tag">
              <span>{selectedTab.number} // {selectedTab.team.toUpperCase()}</span>
              <small>{selectedTab.ballName}</small>
            </div>
          </section>


          <div className="career-sections-stack">
            {HAALAND_SECTIONS.map((sec, idx) => (
              <div key={sec.id}>
                {/* SECCIÓN ESPECIAL DE ENSAMBLAJE MODULAR JUSTO ANTES DEL SECTOR 02 */}
                {idx === 1 && (
                  <section className="assembly-interlude-section">
                    <div className="assembly-container">
                      <div className="assembly-info">
                        <span className="meta-tag">BIOMECHANICAL RECONSTRUCTION // UNIT 09</span>
                        <h2 className="band-main-title">MODULAR STRIKER ASSEMBLY</h2>
                        <p className="band-subtitle">
                          Scroll down to lock optical targeting, core power output, and kinetic propulsion modules into full match readiness.
                        </p>
                      </div>

                      <div className="assembly-stage">
                        <span className="hud-corner top-left" />
                        <span className="hud-corner top-right" />
                        <span className="hud-corner bottom-left" />
                        <span className="hud-corner bottom-right" />

                        {/* Módulo 1: Cabeza */}
                        <div className="mod-piece mod-head">
                          <img src="/haaland-android.png" alt="Optical Module" />
                          <span className="mod-label">SYS.01 // OPTICAL TARGETING</span>
                        </div>

                        {/* Módulo 2: Torso */}
                        <div className="mod-piece mod-torso">
                          <img src="/haaland-android.png" alt="Core Module" />
                          <span className="mod-label">SYS.02 // CORE POWER OUTPUT</span>
                        </div>

                        {/* Módulo 3: Piernas */}
                        <div className="mod-piece mod-legs">
                          <img src="/haaland-android.png" alt="Kinetic Module" />
                          <span className="mod-label">SYS.03 // KINETIC PROPULSION</span>
                        </div>
                      </div>
                    </div>
                  </section>
                )}

                <section
                  className="career-bg-band"
                  style={{ '--section-bg': `url(${sec.bgImage})` } as React.CSSProperties}
                >
                  <div className="band-dark-overlay" />

                  <div className="band-inner-container">
                    <div className="band-header">
                      <span className="meta-tag">{sec.code}</span>
                      <h2 className="band-main-title">{sec.title}</h2>
                      <p className="band-subtitle">{sec.subtitle}</p>
                    </div>

                    <div className={`band-cards-grid ${idx % 2 === 1 ? 'flip-columns' : ''}`}>
                      <article className="asym-card horizontal-info-card slide-from-left">
                        <div className="meta-tag">{sec.leftCard.tag}</div>
                        <h3 className="asym-subtitle">{sec.leftCard.heading}</h3>
                        <p className="asym-text">{sec.leftCard.description}</p>
                        <ul className="card-highlights-list">
                          {sec.leftCard.highlights.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </article>

                      <article className="asym-card vertical-info-card slide-from-right">
                        <div className="meta-tag">{sec.rightCard.tag}</div>
                        <div className="big-metric">
                          {sec.rightCard.metricValue}
                          <span>{sec.rightCard.metricSuffix}</span>
                        </div>
                        <div className="metric-desc">{sec.rightCard.metricLabel}</div>

                        <div className="extra-stats-box">
                          {sec.rightCard.extraStats.map((st) => (
                            <div key={st.label} className="extra-stat-item">
                              <strong>{st.value}</strong>
                              <span>{st.label}</span>
                            </div>
                          ))}
                        </div>
                      </article>
                    </div>
                  </div>
                </section>
              </div>
            ))}
          </div>





          {/* 2. Cuatro Secciones con Imagen de Fondo Propia y Tarjetas Cruzadas (---> <---) */}
          <div className="career-sections-stack">
            {HAALAND_SECTIONS.map((sec, idx) => (
              <section
                key={sec.id}
                className="career-bg-band"
                style={{ '--section-bg': `url(${sec.bgImage})` } as React.CSSProperties}
              >
                <div className="band-dark-overlay" />

                <div className="band-inner-container">
                  <div className="band-header">
                    <span className="meta-tag">{sec.code}</span>
                    <h2 className="band-main-title">{sec.title}</h2>
                    <p className="band-subtitle">{sec.subtitle}</p>
                  </div>

                  {/* Fila de Tarjetas que entran desde izquierda (--->) y derecha (<---) */}
                  <div className={`band-cards-grid ${idx % 2 === 1 ? 'flip-columns' : ''}`}>
                    {/* Tarjeta Izquierda */}
                    <article className="asym-card horizontal-info-card slide-from-left">
                      <div className="meta-tag">{sec.leftCard.tag}</div>
                      <h3 className="asym-subtitle">{sec.leftCard.heading}</h3>
                      <p className="asym-text">{sec.leftCard.description}</p>
                      <ul className="card-highlights-list">
                        {sec.leftCard.highlights.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </article>

                    {/* Tarjeta Derecha */}
                    <article className="asym-card vertical-info-card slide-from-right">
                      <div className="meta-tag">{sec.rightCard.tag}</div>
                      <div className="big-metric">
                        {sec.rightCard.metricValue}
                        <span>{sec.rightCard.metricSuffix}</span>
                      </div>
                      <div className="metric-desc">{sec.rightCard.metricLabel}</div>

                      <div className="extra-stats-box">
                        {sec.rightCard.extraStats.map((st) => (
                          <div key={st.label} className="extra-stat-item">
                            <strong>{st.value}</strong>
                            <span>{st.label}</span>
                          </div>
                        ))}
                      </div>
                    </article>
                  </div>
                </div>
              </section>
            ))}
          </div>
        </main>
      )}
      {/* =========================================================
          VISTA 2: UEFA NATIONS LEAGUE (NORUEGA + TIMELINE HORIZONTAL)
         ========================================================= */}
      {selectedTab.id === 'nations-league' && (
        <main className="nations-immersive-layout">
          <aside className="norway-floating-figure" aria-label="Erling Haaland Norway">
            <div ref={norwayVideoBoxRef} className="norway-video-shell">
              <video
                src="/haaland-norway-capcut.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="norway-capcut-video"
              />
              <div className="norway-floating-tag">
                <span>NORWAY #09 // CAPTAIN</span>
                <small>{selectedTab.ballName}</small>
              </div>
            </div>
          </aside>

          <section className="norway-surrounding-content">
            <div className="norway-header-box">
              <div className="meta-tag">
                {selectedTab.number} // {selectedTab.team} &bull; {selectedTab.competition}
              </div>
              <h1 className="hero-title">{selectedTab.headline}</h1>
              <p className="hero-bio">{selectedTab.bio}</p>
            </div>

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
          VISTA 3: NEWS (ESPACIOS ALTERNADOS PARA 2-3 FOTOS POR NOTICIA)
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
            {filteredNews.map((article, index) => (
              <article
                key={article.id}
                className={`news-story-row ${index % 2 === 1 ? 'reverse-side' : ''}`}
              >
                <div className="news-text-block">
                  <div className="news-meta-row">
                    <span className="news-badge">{article.category}</span>
                    <span className="news-date">{article.date}</span>
                  </div>
                  <h2 className="news-article-title">{article.title}</h2>
                  <p className="news-article-summary">{article.summary}</p>
                  <div className="news-article-details">{article.details}</div>
                </div>

                <div className="news-photos-slot">
                  {article.photos.map((photo, pIdx) => (
                    <div
                      key={photo.caption}
                      className={`photo-frame ${pIdx === 0 ? 'main-photo' : 'sub-photo'}`}
                    >
                      {photo.url ? (
                        <img src={photo.url} alt={photo.caption} />
                      ) : (
                        <div className="photo-placeholder">
                          <span>+ PHOTO SLOT 0{pIdx + 1}</span>
                          <small>{photo.caption}</small>
                        </div>
                      )}
                      <div className="photo-caption-bar">{photo.caption}</div>
                    </div>
                  ))}
                </div>
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
