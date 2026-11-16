export type TabMode = 'mancity' | 'nations-league' | 'news';

export interface TimelineMilestone {
  date: string;
  match: string;
  stage: string;
  contribution: string;
  rating: string;
  summary: string;
}

export interface NewsItem {
  id: string;
  date: string;
  category: 'CLUB' | 'INTERNATIONAL' | 'RECORDS' | 'UPDATE';
  title: string;
  summary: string;
  details: string;
}

export interface TabTheme {
  id: TabMode;
  tabLabel: string;
  ballType: 'premier-2026' | 'uefa-2026' | 'none';
  ballName: string;
  number: string;
  team: string;
  competition: string;
  headline: string;
  bio: string;
  accentColor: string;
  stats: {
    label: string;
    value: string;
    suffix?: string;
  }[];
  timeline?: TimelineMilestone[];
}

export const TABS_DATA: TabTheme[] = [
  {
    id: 'mancity',
    tabLabel: 'Manchester City',
    ballType: 'premier-2026',
    ballName: 'PUMA Stellar Nitro Ultimate 26/27',
    number: '09',
    team: 'Manchester City',
    competition: 'Premier League 2026/27',
    headline: 'Engineered to break every record.',
    bio: 'Tactical breakdowns, clinical finishing efficiency, and sprint velocity metrics of Erling Haaland in the English top flight.',
    accentColor: '#6CABDD',
    stats: [
      { label: 'Premier League Goal Ratio', value: '0.98', suffix: '+' },
      { label: 'Top Sprint Velocity', value: '36.2', suffix: 'km/h' },
      { label: 'Box Conversion Rate', value: '31', suffix: '%' },
    ],
  },
  {
    id: 'nations-league',
    tabLabel: 'UEFA Nations League',
    ballType: 'uefa-2026',
    ballName: 'Adidas UEFA Nations League 26/27 Pro',
    number: '09',
    team: 'Norway National Team',
    competition: 'UEFA Nations League 2026',
    headline: 'Leading Norway on the European stage.',
    bio: 'Captaincy impact, international goal-scoring streak, and horizontal matchday progression across the 2026 UEFA Nations League campaign.',
    accentColor: '#E11D48',
    stats: [
      { label: 'Goals Per International Cap', value: '1.12', suffix: '+' },
      { label: 'Nations League Shots on Target', value: '68', suffix: '%' },
      { label: 'Aerial Duels Won', value: '74', suffix: '%' },
    ],
    timeline: [
      {
        date: 'SEP 2026 // MD 01',
        match: 'Norway vs. Kazakhstan',
        stage: 'League Stage Opener',
        contribution: '2 Goals &bull; 1 Assist',
        rating: '9.4',
        summary: 'Dominated penalty box movement and converted a decisive second-half brace to open the campaign.',
      },
      {
        date: 'SEP 2026 // MD 02',
        match: 'Norway vs. Austria',
        stage: 'Oslo Home Fixture',
        contribution: '1 Winning Goal (80\')',
        rating: '8.8',
        summary: 'Sealed three vital points at Ullevaal Stadion with a clinical late strike under high defensive pressure.',
      },
      {
        date: 'OCT 2026 // MD 03',
        match: 'Norway vs. Slovenia',
        stage: 'Record-Breaking Night',
        contribution: '2 Goals &bull; All-Time Top Scorer',
        rating: '9.7',
        summary: 'Surpassed Norway’s historic all-time scoring record while leading the offensive pressing line.',
      },
      {
        date: 'NOV 2026 // MD 04',
        match: 'Norway vs. Denmark',
        stage: 'Nordic Derby Clash',
        contribution: '1 Goal &bull; 4 Key Passes',
        rating: '8.9',
        summary: 'Anchored hold-up play and stretched the defensive line with continuous high-speed transitions.',
      },
    ],
  },
  {
    id: 'news',
    tabLabel: 'News',
    ballType: 'none',
    ballName: '',
    number: 'LIVE',
    team: 'Editorial Feed',
    competition: 'Latest Updates & Bulletins',
    headline: 'Latest Haaland news & matchday reports.',
    bio: 'Verified updates, tactical match reports, international call-ups, and milestone alerts curated in chronological order.',
    accentColor: '#F8FAFC',
    stats: [],
  },
];

export const INITIAL_NEWS: NewsItem[] = [
  {
    id: 'news-1',
    date: 'NOVEMBER 2026',
    category: 'INTERNATIONAL',
    title: 'Haaland spearheads Norway attack in decisive UEFA Nations League window',
    summary: 'Wearing the captain armband, the Norwegian striker continues his historic scoring pace in European international fixtures.',
    details: 'Full tactical breakdown of Norway’s offensive setup, highlighting Haaland’s off-the-ball runs, penalty-box gravity, and partnership with the creative midfield.',
  },
  {
    id: 'news-2',
    date: 'NOVEMBER 2026',
    category: 'RECORDS',
    title: 'Selected in the 2026 FIFPRO Men’s World 11',
    summary: 'Recognized globally by fellow professional footballers after another prolific year across domestic and European competitions.',
    details: 'Haaland retains his place among the world’s top forwards following sustained goal-per-game efficiency in both the Premier League and international duty.',
  },
  {
    id: 'news-3',
    date: 'OCTOBER 2026',
    category: 'CLUB',
    title: 'Premier League 2026/27 campaign milestone: Surpassing 170 club goals',
    summary: 'Another clinical display at the Etihad Stadium cements his standing among Manchester City’s all-time top scorers.',
    details: 'Using the new PUMA Stellar Nitro Ultimate 2026/27 match ball, Haaland recorded a 34% shot conversion rate across the opening autumn fixtures.',
  },
];
