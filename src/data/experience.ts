export interface TimelineEntry {
  year: string;
  label: string;
  description: string;
  isCurrent?: boolean;
}

export interface ExperienceDetail {
  area: string;
  description: string;
  technologies: string[];
  contributions: string[];
  metrics?: string[];
}

export const timeline: TimelineEntry[] = [
  {
    year: '2024',
    label: 'Backend Engineering',
    description:
      'Building production backend systems with Java, Spring Boot and distributed architectures.',
  },
  {
    year: '',
    label: 'Distributed Systems',
    description:
      'Kafka event-driven architectures, real-time data processing and system integration.',
  },
  {
    year: '',
    label: 'IoT / Data Processing',
    description:
      'Real-time IoT event streaming, time-series data handling and dashboard systems.',
  },
  {
    year: 'NOW',
    label: 'AI / Agents Engineering',
    description:
      'Transitioning into AI engineering — building agent-driven systems for industrial use cases.',
    isCurrent: true,
  },
];

export const experience = {
  title: 'Engineer — Product & Technology',
  period: 'June 2024 — Present',
  areas: [
    {
      area: 'Backend Engineering',
      description:
        'Built and maintained production backend systems powering IoT data processing and real-time dashboards.',
      technologies: [
        'Java 17',
        'Spring Boot',
        'Kafka',
        'Netty',
        'WebSockets',
        'PostgreSQL',
        'TimescaleDB',
        'Redis / Valkey',
        'Reactive Programming',
      ],
      contributions: [
        'Developed modular REST APIs using Spring Boot.',
        'Improved API response performance through query and payload optimization.',
        'Built a custom Netty WebSocket server for real-time IoT event streaming.',
        'Achieved dashboard update latency under 500ms.',
        'Optimized database queries and indexing to reduce database overutilization.',
        'Worked with PostgreSQL, TimescaleDB, Redis/Valkey and Kafka.',
        'Worked with reactive processing and event-driven architectures.',
      ],
      metrics: [
        '20–30% faster feature delivery',
        '35% response-time improvement',
        'Sub-500ms dashboard update latency',
      ],
    },
    {
      area: 'AI / Agents Engineering',
      description:
        'Transitioned into AI/Agents engineering, working on intelligent systems for real-world industrial IoT use cases.',
      technologies: [
        'Python',
        'FastAPI',
        'OpenAI APIs',
        'LLMs',
        'AI Agents',
        'Kafka',
        'Time-series Data',
      ],
      contributions: [
        'Built the data preprocessing layer using Python and FastAPI, querying time-series data and transforming raw device readings into meaningful operational summaries for downstream defect detection.',
        'Developed dashboard APIs to expose defect insights and related information to the application layer.',
      ],
    },
  ] as ExperienceDetail[],
};
