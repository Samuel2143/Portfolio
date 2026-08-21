export interface Skill {
  name: string;
  group: string;
  related: string[];
}

export interface SkillGroup {
  name: string;
  color: string;
  skills: Skill[];
}

export const skillGroups: SkillGroup[] = [
  {
    name: 'Backend',
    color: '#00d4ff',
    skills: [
      {
        name: 'Java 17',
        group: 'Backend',
        related: ['Spring Boot', 'Netty', 'Kafka'],
      },
      {
        name: 'Spring Boot',
        group: 'Backend',
        related: ['Java 17', 'REST APIs', 'PostgreSQL', 'Kafka'],
      },
      {
        name: 'REST APIs',
        group: 'Backend',
        related: ['Spring Boot', 'FastAPI', 'Java 17'],
      },
      {
        name: 'Netty',
        group: 'Backend',
        related: ['Java 17', 'WebSockets'],
      },
      {
        name: 'WebSockets',
        group: 'Backend',
        related: ['Netty', 'Java 17', 'Kafka'],
      },
      {
        name: 'Reactive Programming',
        group: 'Backend',
        related: ['Java 17', 'Spring Boot', 'Kafka'],
      },
    ],
  },
  {
    name: 'Distributed & Data',
    color: '#4ade80',
    skills: [
      {
        name: 'Kafka',
        group: 'Distributed & Data',
        related: [
          'Java 17',
          'Spring Boot',
          'Event-Driven Systems',
          'Python',
        ],
      },
      {
        name: 'PostgreSQL',
        group: 'Distributed & Data',
        related: ['Spring Boot', 'TimescaleDB', 'Redis / Valkey'],
      },
      {
        name: 'TimescaleDB',
        group: 'Distributed & Data',
        related: ['PostgreSQL', 'Kafka', 'Netty'],
      },
      {
        name: 'Redis / Valkey',
        group: 'Distributed & Data',
        related: ['PostgreSQL', 'Spring Boot', 'Java 17'],
      },
      {
        name: 'Event-Driven Systems',
        group: 'Distributed & Data',
        related: ['Kafka', 'Reactive Programming', 'WebSockets'],
      },
    ],
  },
  {
    name: 'AI Engineering',
    color: '#a78bfa',
    skills: [
      {
        name: 'Python',
        group: 'AI Engineering',
        related: ['FastAPI', 'OpenAI APIs', 'AI Agents'],
      },
      {
        name: 'FastAPI',
        group: 'AI Engineering',
        related: ['Python', 'REST APIs', 'OpenAI APIs'],
      },
      {
        name: 'OpenAI APIs',
        group: 'AI Engineering',
        related: ['Python', 'LLMs', 'AI Agents', 'Prompt Engineering'],
      },
      {
        name: 'LLMs',
        group: 'AI Engineering',
        related: ['OpenAI APIs', 'AI Agents', 'Prompt Engineering'],
      },
      {
        name: 'AI Agents',
        group: 'AI Engineering',
        related: ['LLMs', 'OpenAI APIs', 'Python', 'Kafka'],
      },
      {
        name: 'Prompt Engineering',
        group: 'AI Engineering',
        related: ['LLMs', 'OpenAI APIs', 'AI Agents'],
      },
    ],
  },
  {
    name: 'Tools',
    color: '#f59e0b',
    skills: [
      {
        name: 'Docker',
        group: 'Tools',
        related: ['Linux', 'Git'],
      },
      {
        name: 'Git',
        group: 'Tools',
        related: ['Docker', 'Gradle'],
      },
      {
        name: 'Gradle',
        group: 'Tools',
        related: ['Java 17', 'Spring Boot', 'Git'],
      },
      {
        name: 'Linux',
        group: 'Tools',
        related: ['Docker', 'Git'],
      },
      {
        name: 'Postman',
        group: 'Tools',
        related: ['REST APIs', 'FastAPI'],
      },
    ],
  },
];

export const allSkills = skillGroups.flatMap((g) => g.skills);
