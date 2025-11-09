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
    description: "A modern web project built using React, Vite, HTML, CSS, and JavaScript. This website demonstrates a responsive design, secure backend integration, and fast rendering optimized for performance. Designed as a professional web solution emphasizing clean UI/UX, accessibility, and seamless navigation across devices.",
    category: "web",
    status: "completed",
    //image: "public/images/web-site.jpg",
    tags: ["HTML", "CSS", "JavaScript", "Node.js"],
    demo:  { type: "video", src: "public/videos/website-demo.mp4", title: "Website Development – Demo" },
    links: { repo: "https://github.com/prajitabhandari1234/WebsiteDevelopment" }
  },
  {
    id: "hackathon-portal",
    title: "Hackathon Sign-up Portal",
    description: "Registration + team formation with schedule & leaderboard.",
    category: "web",
    status: "planning", 
    //image: "/images/hackathon-portal.jpg",
    tags: ["React", "Express", "MongoDB"],
    demo:  { type: "video", src: "public/Videos/hackathon-portal.mp4", title: "Hackathon Portal – Prototype" },
    links: { repo: "https://github.com/yourorg/hackathon-portal" }
  },
];

/* ---- Raspberry Pi / ML ---- */
export const RASPBERRY_PROJECTS = [
  {
    id: "ml-face-recognition-py",
    title: "ML Face Recognition (Python) Workshop",
    description: "Face detection/recognition pipeline using Python and OpenCV.",
    category: "raspberry-pi",
    status: "completed",
    //image: "/images/ml-face-recognition.jpg",
    tags: ["Python", "OpenCV", "ML"],
    demo:  { type: "video", src: "public/videos/ml-face-recognition.mp4", title: "Face Recognition – Demo" },
    links: { repo: "https://github.com/yourorg/ml-face-recognition-workshop" }
  },
  /*
  {
    id: "raspberry-pi-intro",
    title: "Raspberry Pi Workshop",
    description: "OS setup, GPIO basics, and starter projects.",
    category: "raspberry-pi",
    status: "completed",
    //image: "/images/raspberry-pi-intro.jpg",
    tags: ["Raspberry Pi", "GPIO", "Linux"],
    demo:  { type: "video", src: "public/videos/raspberry-pi-intro.mp4", title: "Raspberry Pi – Quick Start" },
    links: { repo: "https://github.com/yourorg/raspberry-pi-workshop" }
  },*/
  {
    id: "proximity-sensor",
    title: "Proximity Sensor",
    description: "The HC-SR04 sends out ultrasonic pulses and measures the time it takes for them to return after bouncing off an object. The Raspberry Pi calculates the distance using that time and displays it in the console. If an object is detected within 15 cm, the system prints:",
    category: "raspberry-pi",
    status: "completed",
    //image: "/images/proximity-sensor.jpg",
    tags: ["Raspberry Pi Main Controller", "Python", "BreadBoard", "HC-SR04"],
    demo:  { type: "video", src: "public/videos/proximity-sensor.mp4", title: "Proximity Sensor – Demo" },
    links: { repo: "https://github.com/sayami1987/RaspberryPi-Proximity-sensor.git" }
  },
  {
    id: "fire-alarm",
    title: "Fire Alarm",
    description: "Gas Sensor MQ-2 is a sensor for flammable gas and smoke by detecting the concentration of combustible gas in the air",
    category: "raspberry-pi",
    status: "completed",
    //image: "/images/fire-alarm.jpg",
    tags: ["Raspberry Pi", "Gas Sensor", "Active Buzzer"],
    demo:  { type: "video", src: "public/videos/fire-alarm.mp4", title: "Fire Alarm – Test Run" },
    links: { repo: "https://github.com/sayami1987/RaspberryPi_GasSensor.git" }
  },
  /*
  {
    id: "camera-capture-python",
    title: "Camera: Click Photos & Record Video from Python",
    description: "Control a USB/RPi camera from Python to capture images/videos.",
    category: "raspberry-pi",
    status: "completed",
    //image: "/images/camera-capture-python.jpg",
    tags: ["Python", "OpenCV", "Camera"],
    demo:  { type: "video", src: "public/videos/camera-capture.mp4", title: "Camera Control – Walkthrough" },
    links: { repo: "https://github.com/yourorg/camera-capture-python" }
  },*/

  {
    id: "rpi-joystick",
    title: "Raspberry Pi Joystick Integration",
    description: "A dual-joystick game project built using Raspberry Pi, MCP3008 ADC, and the Ursina Game Engine. This hardware-software integration project allows two players to control game characters in real time using analog joystick inputs. Designed and documented as a hands-on IoT + game development exploration by a team of students.",
    category: "raspberry-pi",
    status: "completed",
    //image: "/images/rpi-joystick.jpg",
    tags: ["Raspberry Pi", "MCP3008 ADC", "Ursina Game Engine"],
    demo:  { type: "video", src: "public/Videos/raspberry_pi_demo.mp4", title: "Raspberry Pi Joystick – Demo" },
    links: { repo: "https://github.com/200321-glitch/raspberrypi-joystick-controller-game" }
  },

  {
    id: "rpi-energy",
    title: "IoT Smart Energy Monitor",
    description: "Track usage, visualize trends, and suggest cost cuts.",
    category: "raspberry-pi",
    status: "planning",
    //image: "/images/rpi-energy.jpg",
    tags: ["Raspberry Pi", "Python", "MQTT"],
    demo:  { type: "video", src: "public/Videos/rpi-energy.mp4", title: "Energy Monitor – Concept" },
    links: { repo: "https://github.com/yourorg/rpi-energy" }
  },
];

/* ---- Games ---- */
export const GAME_PROJECTS = [
  /*{
    id: "mini-dodge",
    title: "Mini Game",
    description: "Fun browser-based games with engaging mechanics and smooth controls.",
    category: "games",
    status: "completed",
    //image: "/images/mini-dodge.jpg",
    tags: ["Java", "CSS", "JavaScript", "UI/UX"],
    demo:  { type: "video", src: "public/Videos/mini-game-demo.mp4", title: "Mini Game – Gameplay" },
    links: { repo: "https://github.com/yourorg/mini-game" }
  },
  */
  {
    id: "godot-441-game-dev",
    title: "Godot 4.4.1 Game Dev Workshop",
    description: "2D_adventure is a Godot (GDScript) project for a side-scrolling 2D adventure game featuring multiple levels and simple quest mechanics.",
    category: "games",
    status: "completed",
    //image: "/images/godot-441-workshop.jpg",
    tags: ["GDScript"],
    demo:  { type: "video", src: "public/videos/godot-441-workshop.mp4", title: "Godot Workshop – Highlights" },
    links: { repo: "https://github.com/sayami1987/2D_adventure.git" }
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
    //image: "/images/networking-lab.jpg",
    tags: ["Cisco", "VLAN", "Wireshark"],
    demo:  { type: "video", src: "public/Videos/networking-lab.mp4", title: "Networking Lab – Overview" },
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
    //image: "/images/ai-support-bot.jpg",
    tags: ["Python", "FastAPI", "Transformers"],
    demo:  { type: "video", src: "public/Videos/ai-support-bot.mp4", title: "AI Support Bot – Demo" },
    links: { repo: "https://github.com/yourorg/ai-support-bot" }
  },
  {
    id: "ai-resume",
    title: "AI-Powered Resume Analyzer",
    description: "Matches resumes to job ads, scores keywords, and gives instant feedback.",
    category: "more",
    status: "planning",
    //image: "/images/ai-resume.jpg",
    tags: ["Python", "NLP"],
    demo:  { type: "video", src: "public/Videos/ai-resume.mp4", title: "AI Resume Analyzer – Walkthrough" },
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
