/* ------------------------------------------------------------------
   All the words on the site live in this file.
   Change a line here, save, and the page updates. No other file needs touching.
------------------------------------------------------------------- */
window.SITE = {
  name: "Talha Yaseer Abeer",
  role: "Electrical and Electronic Engineering, IUT",
  tagline: "Engineer, builder and researcher. I turn ideas into systems that work, from circuits and robots to grid simulators and software that learns.",
  email: "talha.iut.eee@gmail.com",

  // Resume and CV, built from cv/resume.html and cv/cv.html (see cv/build.ps1).
  docs: {
    resume: "assets/Talha_Yaseer_Abeer_Resume.pdf",
    cv: "assets/Talha_Yaseer_Abeer_CV.pdf"
  },

  links: {
    github: "https://github.com/abeeryaseer24",
    linkedin: "https://www.linkedin.com/in/talha-yaseer-a9770b369",
    facebook: "https://www.facebook.com/share/1K5sYM13ga/"
  },

  // The pages, in the order they appear on the home grid.
  // "blurb" is the one or two lines shown wherever a page is linked.
  pages: [
    { id: "education", file: "education.html", title: "Education", blurb: "A top academic record from school to university, and the coursework shaping me as an engineer." },
    { id: "expertise", file: "expertise.html", title: "Expertise", blurb: "The engineering tools, programming stacks and people skills I bring to a team." },
    { id: "achievements", file: "achievements.html", title: "Achievements", blurb: "Competition results, national events delivered and students guided into leading universities." },
    { id: "experience", file: "experience.html", title: "Experience", blurb: "Hands-on work across engineering projects, club leadership and teaching." },
    { id: "projects", file: "projects.html", title: "Projects", blurb: "Simulators, machine learning apps, a game and robots I have designed, built and shipped." },
    { id: "research", file: "research.html", title: "Research", blurb: "Ongoing machine-learning research on power-system operation, tested on data the models never saw." },
    { id: "about", file: "about.html", title: "About me", blurb: "My story, what drives me and how I spend my time away from work." },
    { id: "contact", file: "contact.html", title: "Contact", blurb: "Open to internships, research and collaboration." }
  ],

  // One-line intro under the big title of each page.
  intros: {
    education: "Consistent top results from school through university, now focused on electrical and electronic engineering.",
    expertise: "A toolkit that spans circuit design, programming, machine learning and leading people.",
    achievements: "Recognition earned in competitions, on stage and through the success of my students.",
    experience: "Practical work that taught me to engineer, to lead and to teach.",
    projects: "Working systems I designed and built, in software and in hardware.",
    research: "Two ongoing studies on machine learning for power-system operation. Every result is judged on grids, days or outages the model never saw.",
    about: "Engineer by training, builder by habit, novelist on the side.",
    contact: "Open to internships, research and collaboration. Choose whichever channel suits you."
  },

  // ---------- Education ----------
  current: {
    degree: "B.Sc. in Electrical and Electronic Engineering",
    where: "Islamic University of Technology (IUT)",
    cgpa: 3.72,
    outOf: "4.00",
    note: "EEE-24, currently in the 3rd semester (2nd year). Top results in the four courses below."
  },
  // Add a result to any course when ready, e.g. result: "A+"
  courses: [
    { name: "Basic Power System", learnt: "How electricity is generated, transmitted and distributed.", result: "" },
    { name: "Digital Electronics", learnt: "Logic gates and the combinational and sequential circuits built from them.", result: "" },
    { name: "Linear Algebra", learnt: "Matrices, vector spaces and eigenvalues, the maths behind signals and machine learning.", result: "" },
    { name: "C Programming", learnt: "Structured programming, pointers and solving problems in code.", result: "" }
  ],
  background: [
    { when: "Admission", title: "Admitted to IUT", score: "EEE", unit: "Department", note: "Earned a seat in Electrical and Electronic Engineering at the Islamic University of Technology." },
    { when: "2024", title: "Higher Secondary Certificate, Science", score: "5.00", unit: "GPA out of 5.00", note: "95.33% in physics, chemistry, mathematics and biology." },
    { when: "2022", title: "Secondary School Certificate, Science", score: "5.00", unit: "GPA out of 5.00", note: "" },
    { when: "2019", title: "Junior School Certificate", score: "4.83", unit: "GPA out of 5.00", note: "" },
    { when: "2016", title: "Primary School Certificate", score: "5.00", unit: "GPA out of 5.00", note: "" }
  ],

  // ---------- Expertise ----------
  expertise: [
    {
      id: "industrial", tab: "Industrial skills",
      intro: "The engineering tools I use to design, simulate and build circuits and hardware.",
      groups: [
        { title: "Circuit simulation", items: ["Proteus", "PSIM", "LTspice", "PSpice", "MATLAB and Simulink"] },
        { title: "Power systems", items: ["AC power flow (Newton-Raphson, FDLF)", "DC load flow and PTDFs", "N-1 contingency screening", "Frequency control (droop, AGC, UFLS)", "Distance and out-of-step protection", "Economic dispatch", "Load forecasting"] },
        { title: "PCB design", items: ["Altium Designer"] },
        { title: "CAD", items: ["AutoCAD", "AutoCAD Electrical"] },
        { title: "Robotics and hardware", items: ["Line follower robot", "RC bot", "Sensor integration", "Motor drivers"] },
        { title: "Simulation and modelling", items: ["Numerical integration (RK4)", "Kalman filtering", "Control loops and Bode analysis", "Monte Carlo analysis", "Point-kinetics reactor model"] }
      ]
    },
    {
      id: "software", tab: "Software skills",
      intro: "The languages and stacks I use to write programs, train models and ship web apps.",
      groups: [
        { title: "Programming", items: ["Python", "TypeScript", "JavaScript", "C", "HTML and CSS", "SQL"] },
        { title: "AI and machine learning", items: ["PyTorch", "scikit-learn", "XGBoost", "LightGBM", "Graph neural networks", "Reinforcement learning (PPO)", "SciPy", "pandas", "NumPy"] },
        { title: "Web and 3D", items: ["React", "Vite", "three.js", "Streamlit", "GSAP", "Web Audio API", "Web Workers"] },
        { title: "Data and charts", items: ["Altair", "OpenStreetMap", "OpenF1", "FastF1", "Jolpica F1 API", "Open-Meteo"] },
        { title: "Testing, deployment and tools", items: ["Git and GitHub", "GitHub Actions", "Vitest", "Vercel", "Supabase", "Streamlit Cloud", "VS Code", "Microsoft Office"] }
      ]
    },
    {
      id: "leadership", tab: "Leadership and negotiation",
      intro: "Everything I learnt leading the Rajuk College Science Club (RCSC) as Vice President and Head of Content Writing.",
      skills: [
        { title: "Negotiation", text: "Held and negotiated the sponsor meetings that brought 20+ sponsors to the RCSC fests." },
        { title: "Organizing", text: "Planned and ran two national science fests and two intra-club competitions." },
        { title: "Hosting", text: "Hosted the national fests in front of students from across the country." },
        { title: "Communication", text: "Explaining ideas clearly, as a club leader, a tutor and a writer." },
        { title: "Content writing", text: "Headed the content writing wing of the club." },
        { title: "Advising", text: "Now serve as the club's Advisor, guiding the team that came after me." }
      ]
    }
  ],

  // ---------- Achievements ----------
  olympiads: [
    { result: "Runner-up", event: "Math Olympiad, Holy Cross College Science Fest", year: "2023" },
    { result: "Winner", event: "Content Writing Competition, Rajuk College", year: "Class 11" },
    { result: "Regional round", event: "Bangladesh Math Olympiad (BDMO)", year: "2023" },
    { result: "Finalist", event: "Treasure hunt, Josephite Math Mania", year: "" }
  ],
  organizing: {
    text: "As Vice President of the Rajuk College Science Club, I organized and hosted national-level events and brought in the sponsors that paid for them.",
    stats: [
      { to: 2, label: "National science fests", note: "Organized and hosted" },
      { to: 2, label: "Intra-club competitions", note: "Organized and run" },
      { to: 20, suf: "+", label: "Sponsors", note: "Brought in through meetings I negotiated" }
    ]
  },
  teaching: {
    text: "My students are my proudest results.",
    stats: [
      { to: 20, suf: "+", label: "SSC and HSC students", note: "Tutored in science and mathematics, with good results" },
      { to: 6, label: "Admission candidates", note: "Now at IUT, RUET and other leading universities in Bangladesh" }
    ],
    now: "Currently teaching the HSC 2027 batch and writing their chapter tests."
  },

  // ---------- Experience ----------
  experience: [
    {
      lane: "Engineering",
      items: [
        { title: "Machine learning for power-system operation", tag: "Independent research, ongoing", text: "Five studies on forecasting, learned power flow, RL dispatch and cascade prediction across 17 real grids, plus a load-shedding forecast for Bangladesh that beats the operator's own plan.", href: "research.html", cta: "See the research" },
        { title: "Blackstart, power system simulator", tag: "TypeScript web app", text: "Built a browser grid simulator with AC power flow on 17 real transmission networks, 24 replayed blackouts, reactor models and 3D power stations.", href: "projects.html#blackstart" },
        { title: "Ascent, rocket ascent simulator", tag: "TypeScript web app", text: "Built a 3-DOF launch-vehicle simulator with guidance, Monte Carlo analysis and nine avionics models, unit-tested against published data.", href: "projects.html#ascent" },
        { title: "F1 Podium Predictor", tag: "Machine learning web app", text: "Designed, trained and shipped an app that predicts every Formula 1 race, scores itself and retrains with no one in the loop, now with 3D replays, an RL pit strategist and a lap simulator.", href: "projects.html#f1" },
        { title: "Line follower robot", tag: "Robotics, university build", text: "Built an autonomous robot that follows a line using sensors." },
        { title: "RC bot", tag: "Robotics, university build", text: "Built a remote-controlled robot from the chassis up." }
      ]
    },
    {
      lane: "Leadership",
      items: [
        { title: "Vice President and Head of Content Writing", tag: "Rajuk College Science Club, former", text: "Led the club, ran two national science fests and two intra-club competitions, and negotiated with 20+ sponsors." },
        { title: "Advisor", tag: "Rajuk College Science Club, current", text: "Advising the committee that runs the club today." },
        { title: "Member", tag: "IUT Robotics Club and IUT Photography Club", text: "Building robots with the robotics club and shooting with the photography club at university." }
      ]
    },
    {
      lane: "Teaching",
      items: [
        { title: "Private tutor, science and mathematics", tag: "20+ students, ongoing", text: "Tutored more than 20 SSC and HSC science students through their board exams. Currently teaching the HSC 2027 batch and writing their chapter tests." },
        { title: "University admission coach", tag: "6 candidates", text: "Prepared six admission candidates who now study at IUT, RUET and other leading universities in Bangladesh." }
      ]
    }
  ],

  // ---------- Projects ----------
  // The flagship project, shown first and in full.
  f1: {
    id: "f1",
    title: "F1 Podium Predictor",
    kicker: "Machine learning web app",
    summary: "A self-running app that predicts the full finishing order of every Formula 1 race, locks its prediction in on race day, scores itself after the race and retrains, with no one in the loop. Around the model sit 3D race replays, a reinforcement-learning pit strategist, a physics lap simulator and more than 70 pages of tools, games and lessons.",
    points: [
      "Predicts the whole finishing order with a Plackett-Luce ranking model, replaying each race 5,000 times to get win and podium chances.",
      "GitHub Actions checks for new results every 3 hours, locks the prediction in on race day with the real grid penalties, then scores it and retrains. A new model only goes live if it beats the current one.",
      "Tested on 111 races from 2022 to 2026 with models that never saw them: 2.07 podium drivers right per race against 1.98 for the starting grid.",
      "Explains every podium pick with 'Why this pick?' cards, and reports its own calibration and Brier score.",
      "Simulations around the model: a lap simulator calibrated on every race's fastest lap, a 400-run Monte Carlo race simulator, a lattice-Boltzmann wind tunnel and an RL strategist that learns pit stops from thousands of simulated races."
    ],
    pages: ["Podium Predictor", "Scoreboard", "Pit Wall 3D replays", "AI Strategist", "Race Simulator", "Lap Simulator", "Wind Tunnel", "Car DNA", "Failure Watch", "Guess the Driver", "Race the AI Driver", "All-Time Ratings", "Scouting Report", "Career Mode", "Fantasy Optimizer", "Energy Lab", "Circuit Designer", "Historic Circuits", "Engineering Academy", "Beat the AI"],
    tech: ["Python", "pandas", "NumPy", "SciPy", "scikit-learn", "Streamlit", "Altair", "three.js", "GitHub Actions", "Supabase", "Whisper", "OpenF1", "Jolpica F1 API"],
    live: "https://f1-podium-predictor1.streamlit.app",
    repo: "https://github.com/abeeryaseer24/f1-podium-predictor"
  },

  // Simulators and other apps, shown as cards under the flagship.
  apps: [
    {
      id: "blackstart",
      title: "Blackstart",
      kicker: "Power system and grid simulator",
      summary: "A power system simulator that runs in the browser. You operate a fictional city's 275 kV grid through storms, heatwaves and a black start, then move on to 17 real transmission networks rebuilt from OpenStreetMap.",
      points: [
        "Fast decoupled AC power flow with a Newton-Raphson fallback, droop governors, AGC, under-frequency load shedding, and distance and out-of-step protection.",
        "24 historical blackouts, from New York 1965 to Iberia 2025, replayed from their investigation reports. You can watch each one or take control and try to save the grid.",
        "A point-kinetics reactor model with xenon, void and Doppler feedback, and six power stations in 3D, including Rooppur, Chernobyl and Fukushima Daiichi.",
        "Whole-city models run minute by minute: bottom-up demand, a metro solved train by train on its DC line, water, mobile network, EV charging and a hospital.",
        "A neural network that estimates collapse risk, live data from Great Britain and the US, a 15-chapter course and 104 automated tests."
      ],
      tech: ["TypeScript", "React", "Vite", "three.js", "GSAP", "KaTeX", "Vitest", "Web Audio API", "OpenStreetMap"],
      live: "https://power-systems-dusky.vercel.app",
      repo: "https://github.com/abeeryaseer24/Power-Systems",
      report: "https://github.com/abeeryaseer24/Power-Systems/blob/main/docs/report.pdf"
    },
    {
      id: "ascent",
      title: "Ascent",
      kicker: "Rocket ascent simulator",
      summary: "A launch-vehicle ascent simulator for engineering students. Build or edit a vehicle, fly it to orbit in 3D, read the telemetry and work through the theory behind every number.",
      points: [
        "3-DOF flight dynamics with RK4 integration, J2 gravity, the US Standard Atmosphere 1976 and closed-loop upper-stage guidance.",
        "Monte Carlo dispersion, payload-capacity curves and a Nelder-Mead pitch-program optimiser, all running in a Web Worker.",
        "Nine avionics models: Li-ion power, INS with a GNSS Kalman filter, RF link budget, CCSDS packets, MIL-STD-1553B bus, TVC servo control, pyrotechnics and fault tolerance.",
        "Optional booster recovery with boostback, entry and landing burns, plus replicas of Sputnik 1, Apollo 11 and the first Falcon 9 landing.",
        "Every physics kernel unit-tested against published reference values, and 13 interactive lessons."
      ],
      tech: ["TypeScript", "React", "Vite", "three.js", "Web Workers", "Vitest"],
      live: "https://rocket-simulator-two.vercel.app",
      repo: "https://github.com/abeeryaseer24/Rocket-simulator-",
      report: "https://rocket-simulator-two.vercel.app/report.pdf"
    },
    {
      id: "night-before-exam",
      title: "Night Before Exam",
      kicker: "Browser game",
      summary: "It is 9 PM, the exam is at 9 AM and you have read nothing. A one-night survival game about time, energy and stress, set in a Bangladeshi home or university hall.",
      points: [
        "Five exams to pick from, from SSC Physics to university EEE, CSE and ME papers.",
        "Timed focus sessions, random events such as load shedding, and an exam round shaped by what you studied.",
        "Plain HTML, CSS and JavaScript with no build step; sound effects synthesised with the Web Audio API."
      ],
      tech: ["JavaScript", "HTML", "CSS", "Web Audio API", "Vercel"],
      live: "https://night-before-exam-game.vercel.app",
      repo: "https://github.com/abeeryaseer24/Night-before-exam-game"
    }
  ],

  builds: [
    { name: "Line follower robot", text: "An autonomous robot that reads the track with sensors and steers itself along the line." },
    { name: "RC bot", text: "A remote-controlled robot built from the chassis up at university." },
    { name: "IUT Robotics Club", text: "Member of the university robotics club, building and testing robots with other students." }
  ],

  // ---------- Research ----------
  // status is shown as a badge. Mark "Ongoing" until a paper is submitted or published.
  research: [
    {
      status: "Ongoing",
      title: "Tested on what they have never seen: five machine-learning studies for power-system operation on open, map-derived grids",
      area: "Machine learning for power systems",
      summary: "Machine-learning models for grid operation are usually scored on the same networks and conditions they were trained on. I built an open simulation platform of 17 real transmission grids rebuilt from OpenStreetMap, and ran five studies on it and on two real operational datasets, each judged only on data its model never saw.",
      findings: [
        "Day-ahead demand forecasting for Great Britain over 46,478 half-hours: 3.52% MAPE alone, and 2.64% when averaged with the system operator's own forecast, better than either.",
        "A learned AC power flow for N-1 screening: catches 96 to 99.6% of overloads on unseen outages and screens 200 to 770 times faster than a fast decoupled load flow.",
        "Reinforcement-learning dispatch: warm-started by imitating hindsight-optimal decisions, PPO ties a rolling-horizon optimiser while deciding 23 times faster.",
        "Cascade prediction with a graph neural network on 9,929 simulated cascades: better than gradient boosting on grids it never saw (AUC 0.82 against 0.74).",
        "Negative results reported alongside the positive ones."
      ],
      tags: ["PyTorch", "LightGBM", "Graph neural networks", "PPO", "AC power flow", "OpenStreetMap"],
      paper: "https://github.com/abeeryaseer24/Power-Systems/blob/main/docs/paper.pdf",
      code: "https://github.com/abeeryaseer24/Power-Systems/tree/main/ml"
    },
    {
      status: "Ongoing",
      title: "Will there be load shedding tonight? Forecasting evening-peak load shedding in Bangladesh against the operator's own plan",
      area: "Forecasting, Bangladesh grid",
      summary: "An 11.5-year daily series of evening-peak load shedding for Bangladesh (2015 to 2026, 3,607 days), built by joining PGCB's hourly record to NLDC's daily reports. Forecasts use only what is known at 11:00 on the day and are tested on 2,642 later days.",
      findings: [
        "Averaging gradient-boosted trees with persistence cuts the error by 10% for tonight (94 against 104 MW) and 14% for tomorrow.",
        "On the 508 days NLDC published a plan, the plan named only 37% of the evenings that had shedding. The model's error is 220 MW against 257 MW for the plan.",
        "Deployed as a live predictor that updates from each new NLDC report."
      ],
      tags: ["Gradient boosting", "Time series", "PGCB and NLDC data", "ERA5 weather"],
      paper: "https://github.com/abeeryaseer24/Power-Systems/blob/main/docs/loadshed-paper.pdf",
      code: "https://github.com/abeeryaseer24/Power-Systems/tree/main/ml"
    }
  ],

  // ---------- About ----------
  photo: "assets/photo.jpg",
  bio: [
    "I'm Talha Yaseer Abeer, an electrical and electronic engineering student at the Islamic University of Technology. I'm passionate about power systems, machine learning, programming and the systems that connect them, and I'm working toward a career in power systems and electronics.",
    "I like turning ideas into things that work: a line follower robot, a grid simulator that replays real blackouts, a rocket simulator, and a Formula 1 prediction app that updates itself after every race. I'm now doing independent research on machine learning for power-system operation.",
    "Outside the classroom I led the Rajuk College Science Club as Vice President, where I organized national science fests, negotiated with sponsors and headed content writing. At IUT I'm a member of the Robotics Club and the Photography Club."
  ],
  details: [
    { k: "Studying", v: "B.Sc. in EEE, 2nd year (EEE-24)" },
    { k: "University", v: "Islamic University of Technology" },
    { k: "Research", v: "Machine learning for power systems (ongoing)" },
    { k: "Strengths", v: "Negotiation, communication and organizing" },
    { k: "Looking for", v: "Internships and research opportunities" }
  ],
  hobbies: [
    { icon: "✍️", name: "Writing novels" },
    { icon: "🏎️", name: "Formula 1" },
    { icon: "⚽", name: "Football" },
    { icon: "♟️", name: "Chess" },
    { icon: "📷", name: "Photography" },
    { icon: "🎬", name: "Watching movies" }
  ],

  // ---------- Contact ----------
  handles: { github: "abeeryaseer24", linkedin: "Talha Yaseer", facebook: "Talha Yaseer Abeer" }
};
