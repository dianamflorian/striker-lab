export interface Athlete {
  id: string;
  name: string;
  number: string;
  club: string;
  nationality: string;
  headline: string;
  bio: string;
  accentColor: string;
  stats: {
    label: string;
    value: string;
    suffix?: string;
  }[];
}

export const ATHLETES: Athlete[] = [
  {
    id: 'haaland',
    name: 'Erling Haaland',
    number: '09',
    club: 'Manchester City',
    nationality: 'Norway',
    headline: 'Engineered to break every record.',
    bio: 'Tactical breakdowns, clinical finishing efficiency, and sprint velocity metrics of modern football’s most lethal striker.',
    accentColor: '#6CABDD', // Sky Blue (Manchester City)
    stats: [
      { label: 'Goals Per Match Ratio', value: '0.98', suffix: '+' },
      { label: 'Top Sprint Velocity', value: '36.2', suffix: 'km/h' },
      { label: 'Box Conversion Rate', value: '31', suffix: '%' },
    ],
  },
  {
    id: 'bellingham',
    name: 'Jude Bellingham',
    number: '05',
    club: 'Real Madrid',
    nationality: 'England',
    headline: 'Total midfield dominance.',
    bio: 'Box-to-box coverage, progressive carries, and clutch late-game decisive impact across European competitions.',
    accentColor: '#FEBE10', // Royal Gold (Real Madrid)
    stats: [
      { label: 'Pass Completion', value: '90.4', suffix: '%' },
      { label: 'Duels Won Per 90', value: '7.8', suffix: '+' },
      { label: 'Clutch Goal Impact', value: '94', suffix: '%' },
    ],
  },
  {
    id: 'donnarumma',
    name: 'Gianluigi Donnarumma',
    number: '99',
    club: 'Paris Saint-Germain',
    nationality: 'Italy',
    headline: 'Unbreakable last line of defense.',
    bio: 'Shot-stopping reach, penalty shootout command, and high-claim aerial dominance in elite knockout stages.',
    accentColor: '#DA291C', // Crimson Red (PSG / Italy accent)
    stats: [
      { label: 'Save Percentage', value: '78.5', suffix: '%' },
      { label: 'Penalty Stop Rate', value: '34', suffix: '%' },
      { label: 'Wingspan Reach', value: '1.96', suffix: 'm' },
    ],
  },
];
