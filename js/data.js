/* ------------------------------------------------------------------
   All the words on the site live in this file.
   Change a line here, save, and the page updates. No other file needs touching.
------------------------------------------------------------------- */
window.SITE = {
  name: "Talha Yaseer Abeer",
  tagline: "Where electrical engineering meets machine learning.",
  email: "talha.iut.eee@gmail.com",

  links: {
    github: "https://github.com/abeeryaseer24",
    linkedin: "https://www.linkedin.com/in/talha-yaseer-a9770b369",
    facebook: "https://www.facebook.com/share/1K5sYM13ga/"
  },

  // When the PDF is in the assets folder, change "ready" to true.
  resume: { file: "assets/Talha-Yaseer-Abeer-Resume.pdf", ready: false },

  // ---------- About me (home page) ----------
  intro:
    "I'm passionate about technology, machine learning, programming and the systems behind them. " +
    "I'm an aspiring electronics engineer, and I'm looking for internships and research opportunities.",

  // tone: "y" (yellow) for academics, "r" (red) for people and leadership
  stats: [
    { to: 3.72, dec: 2, label: "CGPA at IUT", note: "Out of 4.00, in Electrical and Electronic Engineering", tone: "y" },
    { to: 5.0, dec: 2, label: "GPA in HSC", note: "95.33% in physics, chemistry, maths and biology", tone: "y" },
    { to: 20, suf: "+", label: "Students tutored", note: "SSC and HSC science students", tone: "r" },
    { to: 20, suf: "+", label: "Sponsors brought in", note: "For the RCSC national science fests", tone: "r" },
    { to: 2, label: "National science fests", note: "Organized and hosted", tone: "r" }
  ],

  // ---------- Projects ----------
  projects: [
    {
      id: "f1",
      title: "F1 Podium Predictor",
      kicker: "Machine learning web app",
      summary:
        "A self-running app that predicts the full finishing order of every Formula 1 race, " +
        "locks its prediction in on race day, scores itself after the race and retrains, with no one in the loop.",
      points: [
        "Predicts the whole finishing order, not just the winner.",
        "Locks each prediction in on race day, then scores it and retrains automatically after the race.",
        "Tested on seasons 2022 to 2026 with models that never saw the races they predicted, and compared against a simple 'follow the starting grid' baseline.",
        "Shows the reasons behind every podium pick with 'Why this pick?' cards."
      ],
      pages: ["Podium Predictor", "Scoreboard", "Season Rewind", "Tyre Lab", "Pit Wall", "Ghost Lap Duel", "Beat the AI"],
      tech: ["Python", "scikit-learn", "XGBoost", "pandas", "Altair", "Streamlit", "Supabase", "GitHub Actions", "Jolpica F1 API", "FastF1"],
      live: "https://f1-podium-predictor1.streamlit.app",
      repo: "https://github.com/abeeryaseer24/f1-podium-predictor"
    }
  ],

  // ---------- Academics & Expertise ----------
  // Add a "result" line to any course card when you're ready, e.g. result: "Grade: A+"
  courses: [
    { name: "Basic Power Systems", icon: "zap", tone: "y", blurb: "How electricity is generated, transmitted and distributed." },
    { name: "Digital Electronics", icon: "cpu", tone: "r", blurb: "Logic gates and the combinational and sequential circuits built from them." },
    { name: "Linear Algebra", icon: "grid", tone: "y", blurb: "Matrices, vector spaces and eigenvalues, the maths behind signals and machine learning." },
    { name: "C Programming", icon: "code", tone: "r", blurb: "Structured programming, pointers and solving problems in code." }
  ],

  results: [
    {
      when: "Current", tone: "y",
      title: "B.Sc. in Electrical and Electronic Engineering",
      where: "Islamic University of Technology (IUT)",
      score: "3.72", unit: "CGPA out of 4.00",
      note: "Exceptional results in Basic Power Systems, Digital Electronics, Linear Algebra and C Programming."
    },
    {
      when: "2024", tone: "r",
      title: "Higher Secondary Certificate, Science",
      score: "5.00", unit: "GPA out of 5.00",
      note: "95.33% in physics, chemistry, mathematics and biology."
    },
    {
      when: "2022", tone: "y",
      title: "Secondary School Certificate, Science",
      score: "5.00", unit: "GPA out of 5.00"
    }
  ],

  builds: [
    { name: "RC bot", icon: "robot", tone: "y", text: "Built a remote-controlled robot at university." },
    { name: "Line follower robot (LFR)", icon: "route", tone: "r", text: "Built an autonomous robot that follows a line using sensors." }
  ],

  // ---------- Skills ----------
  skills: [
    { title: "Circuit simulation and design", icon: "cpu", tone: "y", items: ["Proteus", "PSIM", "LTspice", "PSpice", "MATLAB and Simulink", "Altium Designer"] },
    { title: "CAD", icon: "ruler", tone: "y", items: ["AutoCAD", "AutoCAD Electrical"] },
    { title: "Programming", icon: "code", tone: "r", items: ["Python", "C"] },
    { title: "Machine learning and data", icon: "chart", tone: "r", items: ["scikit-learn", "XGBoost", "pandas", "NumPy", "Altair", "FastF1 and Jolpica F1 APIs"] },
    { title: "Web apps and tools", icon: "layers", tone: "y", items: ["Streamlit", "Supabase", "GitHub Actions", "Git and GitHub", "VS Code", "Microsoft Office"] }
  ],
  people: [
    { title: "Negotiation", text: "Held and negotiated sponsor meetings that brought 20+ sponsors to the RCSC fests." },
    { title: "Communication", text: "Explaining ideas clearly, as a tutor, a club leader and a writer." },
    { title: "Organizing", text: "Planned and ran two national science fests and two intra-club competitions." },
    { title: "Content writing", text: "Headed content writing at the Rajuk College Science Club." }
  ],

  // ---------- Achievements ----------
  rcsc: {
    name: "Rajuk College Science Club (RCSC)",
    sub: "I led the club as Vice President and Head of Content Writing, and I now serve as its Advisor.",
    roles: [
      { when: "Former", title: "Vice President and Head of Content Writing", tone: "y" },
      { when: "Current", title: "Advisor", tone: "r" }
    ],
    stats: [
      { to: 2, label: "National science fests", note: "Organized and hosted during my tenure", tone: "r" },
      { to: 2, label: "Intra-club competitions", note: "Organized and run", tone: "y" },
      { to: 20, suf: "+", label: "Sponsors brought in", note: "Through meetings I held and negotiated", tone: "r" }
    ]
  },
  wins: [
    { result: "Regional round", event: "ECA Math Olympiad", year: "2023" },
    { result: "Winner", event: "Math Olympiad at the Holy Cross College Science Fest", year: "2023" },
    { result: "Finalist", event: "Josephite Math Mania, treasure hunt", year: "" }
  ],

  // ---------- About ----------
  bio: [
    "I'm Talha Yaseer Abeer, an electrical and electronic engineering student at the Islamic University of Technology. " +
      "I'm passionate about technology, machine learning, programming and the systems that connect them, " +
      "and I'm working toward a career as an electronics engineer.",
    "I like turning ideas into things that work, from a line follower robot to a Formula 1 prediction app that updates itself after every race. " +
      "I'm looking for internships and research opportunities where I can keep building and learning.",
    "Outside the classroom, I led the Rajuk College Science Club as Vice President, where I organized national science fests, " +
      "negotiated with sponsors and headed content writing."
  ],
  experience: [
    {
      title: "Tutor, SSC and HSC science",
      icon: "users",
      text: "Tutored more than 20 science students through their SSC and HSC exams. Currently teaching the HSC 2027 batch, including setting their exams."
    },
    {
      title: "University admission coach",
      icon: "cap",
      text: "Prepared 6 admission candidates. Each earned a strong result and now studies at IUT, RUET or another leading university in Bangladesh."
    }
  ],
  hobbies: [
    { icon: "✍️", name: "Writing novels" },
    { icon: "🏎️", name: "Formula 1" },
    { icon: "⚽", name: "Football" },
    { icon: "♟️", name: "Chess" },
    { icon: "🎬", name: "Watching movies" }
  ]
};
