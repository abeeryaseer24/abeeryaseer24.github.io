/* ------------------------------------------------------------------
   All the words on the site live in this file.
   Change a line here, save, and the page updates. No other file needs touching.
------------------------------------------------------------------- */
window.SITE = {
  name: "Talha Yaseer Abeer",
  role: "Electrical and Electronic Engineering, IUT",
  tagline: "Engineer, builder and organizer. I turn ideas into systems that work, from circuits and robots to software that learns.",
  email: "talha.iut.eee@gmail.com",

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
    { id: "projects", file: "projects.html", title: "Projects", blurb: "A growing collection of the things I have designed, built and shipped." },
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
    about: "Engineer by training, builder by habit, novelist on the side.",
    contact: "Open to internships, research and collaboration. Choose whichever channel suits you."
  },

  // ---------- Education ----------
  current: {
    degree: "B.Sc. in Electrical and Electronic Engineering",
    where: "Islamic University of Technology (IUT)",
    cgpa: 3.72,
    outOf: "4.00",
    note: "Exceptional results in the four courses below."
  },
  // Add a result to any course when ready, e.g. result: "A+"
  courses: [
    { name: "Basic Power Systems", eq: "P = VI cos φ", learnt: "How electricity is generated, transmitted and distributed.", result: "" },
    { name: "Digital Electronics", eq: "Y = A ⊕ B", learnt: "Logic gates and the combinational and sequential circuits built from them.", result: "" },
    { name: "Linear Algebra", eq: "det(A − λI) = 0", learnt: "Matrices, vector spaces and eigenvalues, the maths behind signals and machine learning.", result: "" },
    { name: "C Programming", eq: "int *p = &x;", learnt: "Structured programming, pointers and solving problems in code.", result: "" }
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
        { title: "PCB design", items: ["Altium Designer"] },
        { title: "Electrical CAD", items: ["AutoCAD Electrical"] },
        { title: "Hardware and robotics", items: ["RC bot", "Line follower robot"] }
      ]
    },
    {
      id: "software", tab: "Software skills",
      intro: "The languages and stacks I use to write programs, train models and ship web apps.",
      groups: [
        { title: "Programming", items: ["Python", "C"] },
        { title: "AI and machine learning", items: ["scikit-learn", "XGBoost", "pandas", "NumPy"] },
        { title: "Data and charts", items: ["Altair", "FastF1", "Jolpica F1 API"] },
        { title: "Web apps and automation", items: ["Streamlit", "Supabase", "GitHub Actions", "Git and GitHub"] }
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
    { result: "Winner", event: "Math Olympiad, Holy Cross College Science Fest", year: "2023" },
    { result: "Regional round", event: "ECA Math Olympiad", year: "2023" },
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
      { to: 20, suf: "+", label: "SSC and HSC students", note: "Tutored in science, with good results" },
      { to: 6, label: "Admission candidates", note: "Now at IUT, RUET and other leading universities in Bangladesh" }
    ],
    now: "Currently mentoring the HSC 2027 batch and setting their exams."
  },

  // ---------- Experience ----------
  experience: [
    {
      lane: "Engineering",
      items: [
        { title: "F1 Podium Predictor", tag: "Machine learning web app", text: "Designed, trained and shipped an app that predicts every Formula 1 race, scores itself and retrains with no one in the loop.", href: "projects.html" },
        { title: "Line follower robot", tag: "University build", text: "Built an autonomous robot that follows a line using sensors." },
        { title: "RC bot", tag: "University build", text: "Built a remote-controlled robot from the chassis up." }
      ]
    },
    {
      lane: "Leadership",
      items: [
        { title: "Vice President and Head of Content Writing", tag: "Rajuk College Science Club, former", text: "Led the club, ran two national science fests and two intra-club competitions, and negotiated with 20+ sponsors." },
        { title: "Advisor", tag: "Rajuk College Science Club, current", text: "Advising the committee that runs the club today." }
      ]
    },
    {
      lane: "Teaching",
      items: [
        { title: "Science tutor, SSC and HSC", tag: "20+ students", text: "Tutored more than 20 science students through their board exams. Currently teaching the HSC 2027 batch and setting their exams." },
        { title: "University admission coach", tag: "6 candidates", text: "Prepared six admission candidates who now study at IUT, RUET and other leading universities in Bangladesh." }
      ]
    }
  ],

  // ---------- Projects ----------
  f1: {
    title: "F1 Podium Predictor",
    kicker: "Machine learning web app",
    summary: "A self-running app that predicts the full finishing order of every Formula 1 race, locks its prediction in on race day, scores itself after the race and retrains, with no one in the loop.",
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
  },
  builds: [
    { name: "Line follower robot", text: "An autonomous robot that reads the track with sensors and steers itself along the line." },
    { name: "RC bot", text: "A remote-controlled robot built at university." }
  ],

  // ---------- About ----------
  photo: "assets/photo.jpg",
  bio: [
    "I'm Talha Yaseer Abeer, an electrical and electronic engineering student at the Islamic University of Technology. I'm passionate about technology, machine learning, programming and the systems that connect them, and I'm working toward a career as an electronics engineer.",
    "I like turning ideas into things that work, from a line follower robot to a Formula 1 prediction app that updates itself after every race.",
    "Outside the classroom I led the Rajuk College Science Club as Vice President, where I organized national science fests, negotiated with sponsors and headed content writing."
  ],
  details: [
    { k: "Studying", v: "Electrical and Electronic Engineering" },
    { k: "University", v: "Islamic University of Technology" },
    { k: "Strengths", v: "Negotiation, communication and organizing" },
    { k: "Looking for", v: "Internships and research opportunities" }
  ],
  hobbies: [
    { icon: "✍️", name: "Writing novels" },
    { icon: "🏎️", name: "Formula 1" },
    { icon: "⚽", name: "Football" },
    { icon: "♟️", name: "Chess" },
    { icon: "🎬", name: "Watching movies" }
  ],

  // ---------- Contact ----------
  handles: { github: "abeeryaseer24", linkedin: "Talha Yaseer", facebook: "Talha Yaseer Abeer" }
};
