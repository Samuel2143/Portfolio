export const personal = {
  name: 'Samuel',
  title: 'Backend Engineer × AI Engineer',
  tagline: 'Building scalable backend systems and exploring intelligent systems with AI.',
  summary:
    '2+ years of professional experience across backend engineering, distributed systems, IoT and AI-powered applications.',
  status: {
    label: 'CURRENTLY BUILDING',
    text: 'AI-Powered Systems',
  },
  statusRotation: [
    { action: 'CURRENTLY BUILDING', text: 'Backend Engineering' },
    { action: 'CURRENTLY BUILDING', text: 'AI / Agents' },
    { action: 'CURRENTLY LEARNING', text: 'AI' },
    { action: 'CURRENTLY LEARNING', text: 'DSA' },
  ],
  aboutParagraphs: [
    {
      text: "I'm an Engineer with 2+ years of professional experience building backend systems in an IoT environment.",
      highlights: ['2+ years', 'backend systems', 'IoT'],
    },
    {
      text: 'My work has involved Java, Spring Boot, Kafka, reactive programming, real-time communication, PostgreSQL, TimescaleDB, Redis/Valkey and distributed data processing.',
      highlights: [
        'Java',
        'Spring Boot',
        'Kafka',
        'reactive programming',
        'real-time communication',
        'PostgreSQL',
        'TimescaleDB',
        'Redis/Valkey',
      ],
    },
    {
      text: "More recently, I've moved into AI/Agents engineering, where I've been working on AI-powered solutions for real-world industrial use cases.",
      highlights: ['AI/Agents engineering', 'real-world industrial use cases'],
    },
    {
      text: "I'm currently deepening my AI foundations, starting with Python and machine learning before progressing further into neural networks, LLMs, AI agents and AI system design.",
      highlights: [
        'Python',
        'machine learning',
        'neural networks',
        'LLMs',
        'AI agents',
        'AI system design',
      ],
    },
    {
      text: 'My goal is to combine strong backend engineering fundamentals with AI to build reliable, scalable and intelligent systems.',
      highlights: ['reliable, scalable and intelligent systems'],
    },
  ],
  social: {
    github: 'https://github.com/Samuel2143',
    linkedin: 'https://www.linkedin.com/in/samuel2143/',
    x: 'https://twitter.com/samuel2143ip',
    leetcode: 'https://leetcode.com/u/samuel2143ip/',
    email: 'samuel2143ip@gmail.com',
  },
  resumePath: '/resume.pdf',
  education: {
    degree: 'B.E. Computer Science & Engineering',
    institution: 'Peri Institute of Technology',
    years: '2020–2024',
  },
  leetcode: {
    count: '150+',
    label: 'LeetCode Problems Solved',
    profileUrl: 'https://leetcode.com/u/samuel2143ip/',
  },
} as const;
