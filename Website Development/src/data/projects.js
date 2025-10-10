/**
 * Project data + category labels.
 * Featured = status !== "planning" (shows Status + Demo + GitHub)
 * Upcoming  = status === "planning" (shows Status only)
 */

export const CATEGORY_LABELS = {
  "raspberry-pi": "Raspberry Pi / ML",
  web: "Web Development",
  games: "Game Development",
  networking: "Networking",
  more: "More",
};

/* ---- Web ---- */
export const WEB_PROJECTS = [
  {
    id: "web-site",
    title: "Website Development",
    description:
      "Modern, responsive websites with secure backends and sleek UI. Optimized performance and seamless experiences.",
    category: "web",
    status: "active",
    emoji: "🌐",
    tags: ["HTML", "CSS", "JavaScript", "Node.js"],
    demo:  { type: "video", src: "/videos/website-demo.mp4", title: "Website Development – Demo" },
    links: { repo: "https://github.com/prajitabhandari1234/WebsiteDevelopment" }
  },
  {
    id: "hackathon-portal",
    title: "Hackathon Sign-up Portal",
    description: "Registration + team formation with schedule & leaderboard.",
    category: "web",
    status: "planning", // upcoming
    emoji: "🗓️",
    tags: ["React", "Express", "MongoDB"],
    demo:  { type: "video", src: "/Videos/hackathon-portal.mp4", title: "Hackathon Portal – Prototype" },
    links: { repo: "https://github.com/yourorg/hackathon-portal" }
  },
];

/* ---- Raspberry Pi / ML ---- */
export const RASPBERRY_PROJECTS = [
  {
    id: "rpi-joystick",
    title: "Raspberry Pi Joystick Integration",
    description: "Controller interface for robotics with joystick integration and face recognition via GPIO and USB.",
    category: "raspberry-pi",
    status: "completed",
    emoji: "🥧",
    tags: ["Raspberry Pi", "Python", "C++", "Robotics"],
    demo:  { type: "video", src: "/Videos/raspberry_pi_demo.mp4", title: "Raspberry Pi Joystick – Demo" },
    links: { repo: "https://github.com/200321-glitch/raspberrypi-joystick-controller-game" }
  },
  {
    id: "rpi-energy",
    title: "IoT Smart Energy Monitor",
    description: "Track usage, visualize trends, and suggest cost cuts.",
    category: "raspberry-pi",
    status: "planning",
    emoji: "☁️",
    tags: ["Raspberry Pi", "Python", "MQTT"],
    demo:  { type: "video", src: "/Videos/rpi-energy.mp4", title: "Energy Monitor – Concept" },
    links: { repo: "https://github.com/yourorg/rpi-energy" }
  },
];

/* ---- Games ---- */
export const GAME_PROJECTS = [
  {
    id: "mini-dodge",
    title: "Mini Game",
    description: "Fun browser-based games with engaging mechanics and smooth controls. Quick sessions across devices.",
    category: "games",
    status: "completed",
    emoji: "🎮",
    tags: ["Java", "CSS", "JavaScript", "UI/UX"],
    demo:  { type: "video", src: "/Videos/mini-game-demo.mp4", title: "Mini Game – Gameplay" },
    links: { repo: "https://github.com/yourorg/mini-game" }
  },
];

/* ---- Networking ---- */
export const NETWORKING_PROJECTS = [
  {
    id: "net-lab",
    title: "Campus Networking Lab",
    description: "Router & VLAN lab; packet captures and topology docs.",
    category: "networking",
    status: "planning",
    emoji: "🛰️",
    tags: ["Cisco", "VLAN", "Wireshark"],
    demo:  { type: "video", src: "/Videos/networking-lab.mp4", title: "Networking Lab – Overview" },
    links: { repo: "https://github.com/yourorg/networking-lab" }
  },
];

/* ---- More ---- */
export const MORE_PROJECTS = [
  {
    id: "ai-support-bot",
    title: "AI Customer Support Chatbot",
    description: "NLP assistant for real-time query handling with domain knowledge.",
    category: "more",
    status: "planning",
    emoji: "🤖",
    tags: ["Python", "FastAPI", "Transformers"],
    demo:  { type: "video", src: "/Videos/ai-support-bot.mp4", title: "AI Support Bot – Demo" },
    links: { repo: "https://github.com/yourorg/ai-support-bot" }
  },
  {
    id: "ai-resume",
    title: "AI-Powered Resume Analyzer",
    description: "Matches resumes to job ads, scores keywords, and gives instant feedback.",
    category: "more",
    status: "planning",
    emoji: "🧪",
    tags: ["Python", "NLP"],
    demo:  { type: "video", src: "/Videos/ai-resume.mp4", title: "AI Resume Analyzer – Walkthrough" },
    links: { repo: "https://github.com/yourorg/ai-resume" }
  },
];

/* ---- Combined ---- */
export const ALL_PROJECTS = [
  ...WEB_PROJECTS,
  ...RASPBERRY_PROJECTS,
  ...GAME_PROJECTS,
  ...NETWORKING_PROJECTS,
  ...MORE_PROJECTS,
];
