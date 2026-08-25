export const profile = {
  name: 'Hemant Arya Panwar',
  role: 'Software Engineer',
  location: 'Gurgaon, India',
  email: 'hemantaryapanwar545@gmail.com',
  phone: '+91 99779 84759',
  phoneHref: '+919977984759',
  links: {
    linkedin: 'https://www.linkedin.com/in/Hemant-arya-panwar/',
    github: 'https://github.com/hemantaryapanwar',
    leetcode: 'https://leetcode.com/u/Hemantaryapanwar/',
    resume: '/HemantAryaPanwar_Resume.pdf',
  },
};

export const stats = [
  { value: 2.5, suffix: '+', label: 'Years of experience' },
  { value: 400, suffix: '+', label: 'LeetCode problems' },
  { value: 1730, suffix: '', label: 'CodeChef rating' },
];

export const experience = [
  {
    role: 'Software Engineer',
    org: 'Deloitte',
    place: 'Gurgaon, India',
    period: 'Feb 2024 — Present',
    points: [
      'Developed dynamic, responsive SPAs using React.js and Redux — improved load time by 30% and enhanced overall UX.',
      'Designed and built scalable, secure RESTful APIs using Spring Boot for frontend apps and third-party integrations.',
      'Used JPA/Hibernate for ORM with MySQL/PostgreSQL to build robust, persistent data layers.',
      'Implemented JWT-based authentication and Spring Security for safe, authorized user access.',
      'Built a custom search engine with inverted indexing and Trie-based autocomplete — improved relevance and cut query latency by 70%.',
      'Containerized services with Docker and worked with Kubernetes-based deployment pipelines.',
    ],
    tags: ['React', 'Redux', 'Spring Boot', 'PostgreSQL', 'JWT', 'Docker', 'Kubernetes'],
  },
  {
    role: 'Software Development Intern',
    org: 'Maven Lifecare Technologies (Curer)',
    place: 'Remote',
    period: 'Jan 2022 — Jun 2022',
    points: [
      'Designed and integrated an offline flow for doctor appointments using REST APIs with Angular.js.',
      'Implemented video consultation and real-time messaging through Agora and Firebase.',
      'Built reusable React components and hooks to streamline development and keep the app consistent.',
      'Worked with Jira, Notion, and Git in a Linux environment alongside a 20+ member team.',
    ],
    tags: ['Angular.js', 'Agora', 'Firebase', 'React'],
  },
];

export const projects = [
  {
    name: 'VoiceNote',
    period: 'Feb 2025 — Mar 2025',
    description:
      "A browser-only voice-to-text note-taking app built on the Web Speech API — no backend. Recognition events stream straight into a React reducer with optimistic updates, handling real-time note creation, editing, and organization without any external state library.",
    tags: ['React', 'Web Speech API', 'useReducer'],
    link: 'https://voice-note-hemantaryapanwars-projects.vercel.app/',
  },
  {
    name: 'Stock Market Price Prediction',
    period: 'Mar 2021 — Dec 2021',
    description:
      'A Streamlit web app forecasting stock prices using an LSTM (RNN) model trained on real Yahoo Finance data, with Numpy and Pandas handling the pipeline and Matplotlib driving the visualizations — accurate up to ~80% on backtests.',
    tags: ['Python', 'LSTM', 'Pandas', 'Streamlit'],
    link: null,
  },
];

export const skills = [
  { category: 'Languages', items: ['Java', 'C++', 'Python', 'JavaScript', 'SQL', 'HTML/CSS'] },
  { category: 'Backend', items: ['Spring Boot', 'Node.js', 'JPA/Hibernate', 'Redis'] },
  { category: 'Frontend', items: ['React', 'Redux', 'Angular.js'] },
  { category: 'Data & Tools', items: ['PostgreSQL', 'MongoDB', 'Docker', 'Kubernetes', 'Postman', 'Cursor'] },
];

export const achievements = [
  { title: 'CodeChef Nov. Lunchtime', detail: 'Global Rank 295' },
  { title: 'Competitive programming', detail: 'LeetCode 400+, CodeChef 1730, GeeksforGeeks 200+ problems' },
  { title: 'JEE Mains', detail: 'Top 1.5 percentile, June 2019' },
  { title: 'Flipkart Grid 4.0', detail: 'Pre-Finalist — built an OSS Security Inspector' },
  { title: 'IIT-Delhi Camerathon', detail: '1st place at the IIT-Delhi Rendezvous, Nov 2019' },
];

export const education = {
  school: 'Indian Institute of Information Technology (IIIT), Sonepat',
  degree: 'B.Tech, Computer Science and Engineering',
  period: '2019 — 2023',
  detail: 'CGPA 8.2',
};
