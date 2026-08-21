export interface ArchitectureNode {
  id: string;
  label: string;
  description: string;
  zone: 'data' | 'rule-based' | 'ai' | 'output';
}

export interface Project {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  technologies: string[];
  architectureNodes: ArchitectureNode[];
  architectureFlow: string[];
  contributions: string[];
  details?: string[];
  featured?: boolean;
}

export const projects: Project[] = [
  {
    id: 'hvac-defect-detection',
    number: '01',
    title: 'Agent-Driven HVAC Defect Detection',
    subtitle:
      'Turning operational equipment data into actionable intelligence.',
    description:
      'An agent-driven system for identifying and analyzing HVAC/refrigeration equipment defects from operational data.',
    technologies: [
      'Python',
      'FastAPI',
      'Kafka',
      'Time-Series Data',
      'OpenAI APIs',
    ],
    featured: true,
    architectureNodes: [
      {
        id: 'timeseries',
        label: 'Time-Series Data',
        description: 'Raw device readings from operational equipment.',
        zone: 'data',
      },
      {
        id: 'preprocessing',
        label: 'Data Preprocessing',
        description:
          'Python/FastAPI layer that queries time-series data and transforms raw device readings into meaningful operational summaries.',
        zone: 'data',
      },
      {
        id: 'kafka',
        label: 'Kafka',
        description:
          'Event-driven communication between processing stages.',
        zone: 'data',
      },
      {
        id: 'detection',
        label: 'Rule-Based Detection',
        description:
          'Domain-specific mathematical and rule-based analysis that evaluates operational conditions and identifies potential defects.',
        zone: 'rule-based',
      },
      {
        id: 'structured-output',
        label: 'Structured Output',
        description:
          'Structured detection results passed to the AI agent for interpretation.',
        zone: 'rule-based',
      },
      {
        id: 'agent',
        label: 'LLM / Agent',
        description:
          'LLM-based interpretation of structured detection output. The LLM does not perform defect detection — it interprets the results from the rule-based detection layer.',
        zone: 'ai',
      },
      {
        id: 'explanation',
        label: 'Explanation',
        description:
          'The LLM generates human-readable explanations for detected issues.',
        zone: 'ai',
      },
      {
        id: 'recommendation',
        label: 'Recommendation',
        description:
          'The LLM generates suggested actions/recommendations based on the structured defect information.',
        zone: 'ai',
      },
      {
        id: 'dashboard',
        label: 'Dashboard',
        description: 'Exposes the resulting insights to users.',
        zone: 'output',
      },
    ],
    architectureFlow: [
      'timeseries',
      'preprocessing',
      'kafka',
      'detection',
      'structured-output',
      'agent',
      'explanation',
      'recommendation',
      'dashboard',
    ],
    contributions: [
      'Built the data preprocessing layer using Python and FastAPI, querying time-series data and transforming raw device readings into meaningful operational summaries for downstream defect detection.',
      'Developed dashboard APIs to expose defect insights and related information to the application layer.',
    ],
    details: [
      'Detectable defects include Coil Icing, Fouling, and Heater Failure.',
      'Detection is primarily mathematical and rule-based — the LLM interprets structured detection results to generate explanations and recommendations.',
      'The preprocessor derives metrics such as defrost baseline and actual defrost behavior. The detection layer evaluates those metrics against domain conditions to determine whether behavior indicates a defect.',
    ],
  },
  {
    id: 'websocket-event-system',
    number: '02',
    title: 'Real-Time WebSocket Event System',
    subtitle: 'Low-latency IoT event streaming for dashboard clients.',
    description:
      'A low-latency real-time event streaming system designed to deliver IoT events and updates to dashboard clients.',
    technologies: ['Java', 'Netty', 'WebSockets', 'Kafka', 'TimescaleDB'],
    architectureNodes: [
      {
        id: 'device',
        label: 'Device',
        description: 'IoT devices generating operational events.',
        zone: 'data',
      },
      {
        id: 'kafka-ws',
        label: 'Kafka',
        description: 'Event ingestion and distribution layer.',
        zone: 'data',
      },
      {
        id: 'netty',
        label: 'Netty',
        description: 'High-performance WebSocket server built on Netty.',
        zone: 'rule-based',
      },
      {
        id: 'websocket',
        label: 'WebSocket',
        description: 'Persistent real-time connection to clients.',
        zone: 'rule-based',
      },
      {
        id: 'dashboard-ws',
        label: 'Dashboard',
        description: 'Real-time dashboard receiving live event updates.',
        zone: 'output',
      },
    ],
    architectureFlow: ['device', 'kafka-ws', 'netty', 'websocket', 'dashboard-ws'],
    contributions: [
      'Built a custom Netty-based WebSocket server for real-time IoT event streaming.',
      'Implemented event filtering, message schema design, reconnection handling and retry mechanisms.',
      'Achieved sub-500ms dashboard update latency.',
    ],
    details: [
      'Netty-based WebSocket server handling concurrent connections.',
      'Kafka integration for reliable event ingestion.',
      'Event filtering and message schema design.',
      'Reconnection handling and retry mechanisms.',
      'Sub-500ms dashboard update latency.',
    ],
  },
  {
    id: 'certificate-auth',
    number: '03',
    title: 'Certificate-Based Authentication System',
    subtitle: 'Cryptographic client verification and credential issuance.',
    description:
      'A custom certificate-based authentication system for identifying clients, verifying cryptographic signatures and issuing JWT credentials.',
    technologies: ['Java', 'Ed25519', 'Redis', 'JWT'],
    architectureNodes: [
      {
        id: 'client',
        label: 'Client',
        description: 'Client presenting certificate for authentication.',
        zone: 'data',
      },
      {
        id: 'certificate',
        label: 'Certificate',
        description: 'Custom certificate format containing client identity.',
        zone: 'data',
      },
      {
        id: 'ed25519',
        label: 'Ed25519',
        description: 'Cryptographic signature verification using Ed25519.',
        zone: 'rule-based',
      },
      {
        id: 'verify',
        label: 'Verify',
        description: 'Signature verification and certificate validation.',
        zone: 'rule-based',
      },
      {
        id: 'jwt',
        label: 'JWT',
        description: 'JSON Web Token issuance upon successful verification.',
        zone: 'output',
      },
      {
        id: 'access',
        label: 'Access',
        description: 'Authenticated access granted to the client.',
        zone: 'output',
      },
    ],
    architectureFlow: [
      'client',
      'certificate',
      'ed25519',
      'verify',
      'jwt',
      'access',
    ],
    contributions: [
      'Designed and implemented a custom certificate format for client identification.',
      'Implemented Ed25519 cryptographic signature verification.',
      'Built JWT issuance pipeline with Redis-based rate limiting.',
    ],
    details: [
      'Custom certificate format for client identity.',
      'Ed25519 cryptographic signatures.',
      'Signature verification pipeline.',
      'JWT credential issuance.',
      'Redis-based rate limiting.',
    ],
  },
];
