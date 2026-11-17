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
  photos: {
    url: string;
    caption: string;
  }[];
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
    photos: [
      { url: '/haaland-norway.png', caption: 'Photo 01 // National Team Arrival' },
      { url: '', caption: 'Photo 02 // Upload Match Action (/public/news-1b.jpg)' },
      { url: '', caption: 'Photo 03 // Upload Celebration (/public/news-1c.jpg)' },
    ],
  },
  {
    id: 'news-2',
    date: 'NOVEMBER 2026',
    category: 'RECORDS',
    title: 'Selected in the 2026 FIFPRO Men’s World 11',
    summary: 'Recognized globally by fellow professional footballers after another prolific year across domestic and European competitions.',
    details: 'Haaland retains his place among the world’s top forwards following sustained goal-per-game efficiency in both the Premier League and international duty.',
    photos: [
      { url: '/haaland-android.png', caption: 'Photo 01 // 2026 Season Profile' },
      { url: '', caption: 'Photo 02 // Upload Award Ceremony (/public/news-2b.jpg)' },
    ],
  },
  {
    id: 'news-3',
    date: 'OCTOBER 2026',
    category: 'CLUB',
    title: 'Premier League 2026/27 campaign milestone: Surpassing 170 club goals',
    summary: 'Another clinical display at the Etihad Stadium cements his standing among Manchester City’s all-time top scorers.',
    details: 'Using the new PUMA Stellar Nitro Ultimate 2026/27 match ball, Haaland recorded a 34% shot conversion rate across the opening autumn fixtures.',
    photos: [
      { url: '', caption: 'Photo 01 // Upload Etihad Strike (/public/news-3a.jpg)' },
      { url: '', caption: 'Photo 02 // Upload Goal Replay (/public/news-3b.jpg)' },
      { url: '', caption: 'Photo 03 // Upload Full-Time (/public/news-3c.jpg)' },
    ],
  },
];

export interface CareerSection {
  id: string;
  code: string;
  title: string;
  subtitle: string;
  bgImage: string;
  leftCard: {
    tag: string;
    heading: string;
    description: string;
    highlights: string[];
  };
  rightCard: {
    tag: string;
    metricValue: string;
    metricSuffix: string;
    metricLabel: string;
    extraStats: { label: string; value: string }[];
  };
}

export const HAALAND_SECTIONS: CareerSection[] = [
  {
    id: 'sec-biometrics',
    code: 'SECTOR 01 // BIOMECHANICS & ORIGIN',
    title: 'THE NORWEGIAN CYBORG',
    subtitle: 'Born in Leeds, forged in Bryne, perfected at the pinnacle of European football.',
    bgImage: '/section-bg-1.jpg', // Coloca tu foto de fondo 1 en public/
    leftCard: {
      tag: 'PHYSICAL ARCHITECTURE',
      heading: '1.95m Frame with Elite Sprinter Acceleration',
      description:
        'Combining rare aerial power with a top recorded sprint speed of 36.22 km/h, Haaland overwhelms high defensive lines through explosive first-step bursts and off-ball blindside runs.',
      highlights: [
        'Height: 1.95 m (6 ft 5 in) // Dominant Left Foot',
        'Youth Roots: Bryne FK, Molde FK, Red Bull Salzburg & Borussia Dortmund',
        'Signature Trait: Minimal-touch clinical finishing inside the 6-yard and 18-yard box',
      ],
    },
    rightCard: {
      tag: 'VELOCITY & FORCE',
      metricValue: '36.2',
      metricSuffix: 'km/h',
      metricLabel: 'Peak Match Sprint Speed',
      extraStats: [
        { label: 'Touches Per Goal', value: '14.2' },
        { label: 'Box Shot Accuracy', value: '64%' },
      ],
    },
  },
  {
    id: 'sec-premier',
    code: 'SECTOR 02 // PREMIER LEAGUE DOMINANCE',
    title: 'REWRITING ENGLISH HISTORY',
    subtitle: 'Shattering single-season scoring records from his very first campaign in Manchester.',
    bgImage: '/section-bg-2.jpg', // Coloca tu foto de fondo 2 en public/
    leftCard: {
      tag: 'ENGLISH TOP-FLIGHT RECORDS',
      heading: '36 Goals in a Single 38-Game Season & Treble Winner',
      description:
        'In his debut 2022/23 campaign with Manchester City, Haaland broke the all-time Premier League single-season goal record, captured back-to-back Golden Boots, and powered the historic Continental Treble.',
      highlights: [
        'Fastest player to reach 50 Premier League goals (48 appearances)',
        'First player in history to score hat-tricks in 3 consecutive home league games',
        'Back-to-back Premier League Golden Boot winner (2022/23 & 2023/24)',
      ],
    },
    rightCard: {
      tag: 'PREMIER LEAGUE OUTPUT',
      metricValue: '0.98',
      metricSuffix: '+',
      metricLabel: 'Goals Per League Appearance',
      extraStats: [
        { label: 'Single-Season Record', value: '36 Goals' },
        { label: 'Premier League Hat-Tricks', value: '8+' },
      ],
    },
  },
  {
    id: 'sec-champions',
    code: 'SECTOR 03 // UEFA CHAMPIONS LEAGUE',
    title: 'EUROPEAN NIGHTS PHENOMENON',
    subtitle: 'Unmatched scoring frequency on club football’s biggest stage.',
    bgImage: '/section-bg-3.jpg', // Coloca tu foto de fondo 3 en public/
    leftCard: {
      tag: 'CONTINENTAL MILESTONES',
      heading: 'Fastest to 40 & 45 Champions League Goals in History',
      description:
        'From his debut hat-trick for Salzburg to a 5-goal masterclass against RB Leipzig in the Round of 16, Haaland maintains a better than one-goal-per-game ratio in the UEFA Champions League.',
      highlights: [
        'Reached 40 Champions League goals in just 35 matches (all-time record)',
        '5 goals in a single knockout match vs. RB Leipzig (March 2023)',
        '2022/23 UEFA Men’s Player of the Year & Gerd Müller Trophy winner',
      ],
    },
    rightCard: {
      tag: 'UCL STRIKE RATIO',
      metricValue: '1.05',
      metricSuffix: 'x',
      metricLabel: 'Goals Per Champions League Match',
      extraStats: [
        { label: 'Games to 40 UCL Goals', value: '35' },
        { label: 'UCL Top Scorer Titles', value: '2x' },
      ],
    },
  },
  {
    id: 'sec-norway',
    code: 'SECTOR 04 // NORWAY NATIONAL LEGACY',
    title: 'ALL-TIME NORWAY TOP SCORER',
    subtitle: 'Surpassing a 90-year national record at age 24 while wearing the captain armband.',
    bgImage: '/section-bg-4.jpg', // Coloca tu foto de fondo 4 en public/
    leftCard: {
      tag: 'INTERNATIONAL CAPTAINCY',
      heading: 'Breaking Jørgen Juve’s Historic 33-Goal Record',
      description:
        'Leading Norway across UEFA Nations League and European qualifiers, Haaland became his country’s all-time leading goalscorer in October 2024 with a brace against Slovenia in Oslo.',
      highlights: [
        'Surpassed Jørgen Juve’s 1934 record in fewer than 37 senior caps',
        '9 goals in a single FIFA U-20 World Cup match vs. Honduras (2019)',
        '4x Gullballen winner (Norwegian Footballer of the Year)',
      ],
    },
    rightCard: {
      tag: 'NATIONAL TEAM IMPACT',
      metricValue: '1.12',
      metricSuffix: '+',
      metricLabel: 'Goals Per International Cap',
      extraStats: [
        { label: 'Norway All-Time Rank', value: '#1' },
        { label: 'International Hat-Tricks', value: '4' },
      ],
    },
  },
];
