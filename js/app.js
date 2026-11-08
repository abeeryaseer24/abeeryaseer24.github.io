/* ------------------------------------------------------------------
   Builds every page from js/data.js, plus the theme switch, the tabs,
   the circuit-board background and the start-lights intro.
------------------------------------------------------------------- */
(() => {
  "use strict";

  const S = window.SITE;
  const page = document.body.dataset.page;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const safeGet = (k) => { try { return localStorage.getItem(k); } catch (e) { return null; } };
  const safeSet = (k, v) => { try { localStorage.setItem(k, v); } catch (e) { /* storage blocked: fine */ } };

  /* ---------- icons ---------- */
  const ICONS = {
    github: { vb: "0 0 16 16", fill: true, d: '<path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>' },
    linkedin: { vb: "0 0 24 24", fill: true, d: '<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>' },
    facebook: { vb: "0 0 24 24", fill: true, d: '<path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>' },
    mail: { d: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>' },
    arrow: { d: '<path d="M5 12h14M13 6l6 6-6 6"/>' },
    chev: { d: '<path d="M9 6l6 6-6 6"/>' },
    down: { d: '<path d="M6 9l6 6 6-6"/>' },
    out: { d: '<path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 01-1 1H5a1 1 0 01-1-1V7a1 1 0 011-1h5"/>' },
    download: { d: '<path d="M12 3v12m0 0l-4-4m4 4l4-4M4 17v3h16v-3"/>' },
    bolt: { d: '<path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z"/>' },
    zap: { d: '<path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z"/>' },
    cap: { d: '<path d="M2 9l10-5 10 5-10 5z"/><path d="M6 11v5c0 1.5 3 3 6 3s6-1.5 6-3v-5"/>' },
    sliders: { d: '<path d="M4 7h9M17 7h3M4 17h3M11 17h9"/><circle cx="15" cy="7" r="2"/><circle cx="9" cy="17" r="2"/>' },
    trophy: { d: '<path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 01-10 0zM17 5h3v2a3 3 0 01-3 3M7 5H4v2a3 3 0 003 3"/>' },
    code: { d: '<path d="M8 8l-5 4 5 4M16 8l5 4-5 4M14 5l-4 14"/>' },
    user: { d: '<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6"/>' },
    users: { d: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c0-3.5 3-5.5 6.5-5.5s6.5 2 6.5 5.5M16 4.5a3.5 3.5 0 010 7M18.5 15c2 .8 3 2.4 3 5"/>' },
    cpu: { d: '<rect x="6" y="6" width="12" height="12" rx="2"/><path d="M9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4"/>' },
    ruler: { d: '<path d="M3 17L17 3l4 4L7 21z"/><path d="M7 13l2 2M10 10l2 2M13 7l2 2"/>' },
    chart: { d: '<path d="M4 20V10M10 20V4M16 20v-8M22 20H2"/>' },
    layers: { d: '<path d="M12 3l9 5-9 5-9-5z"/><path d="M3 13l9 5 9-5"/>' },
    grid: { d: '<rect x="4" y="4" width="7" height="7" rx="1"/><rect x="13" y="4" width="7" height="7" rx="1"/><rect x="4" y="13" width="7" height="7" rx="1"/><rect x="13" y="13" width="7" height="7" rx="1"/>' },
    robot: { d: '<rect x="5" y="8" width="14" height="10" rx="2"/><path d="M12 4v4M9 13h.01M15 13h.01M3 12v3M21 12v3"/>' },
    route: { d: '<path d="M5 19c0-6 14-2 14-9"/><circle cx="5" cy="19" r="2"/><circle cx="19" cy="6" r="2"/>' },
    sun: { d: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>' },
    moon: { d: '<path d="M20 14.5A8 8 0 019.5 4 8 8 0 1020 14.5z"/>' },
    menu: { d: '<path d="M4 7h16M4 12h16M4 17h16"/>' },
    close: { d: '<path d="M6 6l12 12M18 6L6 18"/>' }
  };
  const icon = (name) => {
    const i = ICONS[name];
    if (!i) return "";
    const attrs = i.fill
      ? 'fill="currentColor"'
      : 'fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"';
    return `<svg viewBox="${i.vb || "0 0 24 24"}" ${attrs} aria-hidden="true" focusable="false">${i.d}</svg>`;
  };

  /* ---------- shared pieces ---------- */
  const NAV = [
    { id: "academics", href: "academics.html", label: "Academics", full: "Academics & Expertise", icon: "cap", tone: "y", blurb: "Courses taken, results and hands-on builds" },
    { id: "skills", href: "skills.html", label: "Skills", full: "Skills", icon: "sliders", tone: "r", blurb: "Software, programming and people skills" },
    { id: "achievements", href: "achievements.html", label: "Achievements", full: "Achievements", icon: "trophy", tone: "y", blurb: "RCSC leadership, olympiads and competitions" },
    { id: "projects", href: "projects.html", label: "Projects", full: "Projects", icon: "code", tone: "r", blurb: "The F1 Podium Predictor, with more on the way" },
    { id: "about", href: "about.html", label: "About", full: "About", icon: "user", tone: "y", blurb: "My story, experience and hobbies" },
    { id: "contact", href: "contact.html", label: "Contact", full: "Contact", icon: "mail", tone: "r", blurb: "Email, LinkedIn, GitHub and Facebook" }
  ];

  const external = (h) => (/^https?:/.test(h) ? ' target="_blank" rel="noopener"' : "");
  const socials = () =>
    [["github", "GitHub", S.links.github], ["linkedin", "LinkedIn", S.links.linkedin], ["facebook", "Facebook", S.links.facebook], ["mail", "Email", "mailto:" + S.email]]
      .map(([i, l, h]) => `<a href="${esc(h)}" aria-label="${l}" title="${l}"${external(h)}>${icon(i)}</a>`)
      .join("");
  const resumeBtn = (cls, label) =>
    `<a class="btn ${cls}" href="${esc(S.resume.file)}" download data-resume>${icon("download")}<span>${label || "Download résumé"}</span></a>`;
  const chips = (arr) => `<div class="chips">${arr.map((t) => `<span class="chip">${esc(t)}</span>`).join("")}</div>`;

  const statTile = (s) =>
    `<div class="stat ${s.tone || "y"}"><div class="num" data-to="${s.to}" data-dec="${s.dec || 0}" data-suf="${esc(s.suf || "")}">${Number(s.to).toFixed(s.dec || 0)}${esc(s.suf || "")}</div>` +
    `<div class="lbl">${esc(s.label)}</div><div class="note">${esc(s.note)}</div></div>`;

  const header = (title, sub) => `<div class="page-head"><h1>${title}</h1><p>${sub}</p></div>`;

  function topbar() {
    return (
      `<header class="topbar"><div class="wrap">` +
      `<a class="brand" href="index.html" aria-label="Home"><i>${icon("bolt")}</i><span>Abeer</span></a>` +
      `<nav class="nav" aria-label="Main">${NAV.map((n) => `<a href="${n.href}"${n.id === page ? ' aria-current="page"' : ""}>${n.label}</a>`).join("")}</nav>` +
      `<div class="soc">${socials()}</div>${resumeBtn("btn-ghost btn-sm", "Résumé")}` +
      `<button class="burger" id="burger" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="drawer">${icon("menu")}</button>` +
      `</div></header>` +
      `<div class="drawer" id="drawer"><a class="dl" href="index.html">Home</a>${NAV.map((n) => `<a class="dl" href="${n.href}">${n.full}</a>`).join("")}` +
      `<div class="soc">${socials()}</div>${resumeBtn("btn-primary")}</div>`
    );
  }

  const footer = () =>
    `<div class="wrap"><footer class="foot"><span>© ${new Date().getFullYear()} ${esc(S.name)}</span><div class="soc">${socials()}</div></footer></div>`;

  /* ---------- pages ---------- */
  function featured(p) {
    return (
      `<article class="feature"><div class="vis" aria-hidden="true">` +
      `<div class="vis-top"><div class="lamps"><i class="on"></i><i class="on"></i><i class="on"></i><i class="on"></i><i class="on"></i></div><span class="live"><i></i>Live</span></div>` +
      `<div class="podium"><div class="p2">2</div><div class="p1">1</div><div class="p3">3</div></div></div>` +
      `<div class="feature-body"><span class="kicker">${esc(p.kicker)}</span><h3>${esc(p.title)}</h3><p class="sum">${esc(p.summary)}</p>` +
      chips(p.tech.slice(0, 6)) +
      `<div class="btns"><a class="btn btn-primary" href="${esc(p.live)}" target="_blank" rel="noopener">${icon("out")}<span>Open live app</span></a>` +
      `<a class="btn btn-ghost" href="${esc(p.repo)}" target="_blank" rel="noopener">${icon("github")}<span>View code</span></a></div></div></article>`
    );
  }

  function home() {
    return (
      `<section class="hero wrap">` +
      `<div class="hero-copy">` +
      `<h1 class="rv" style="--d:0"><span class="l1">Welcome to</span><span class="l2">Abeer’s Portfolio</span></h1>` +
      `<p class="hero-name rv" style="--d:1">${esc(S.name)}</p>` +
      `<p class="hero-tag rv" style="--d:2">${esc(S.tagline)}</p>` +
      `<div class="hero-cta rv" style="--d:3">${resumeBtn("btn-primary")}<a class="btn btn-ghost" href="projects.html">${icon("code")}<span>View my projects</span></a></div>` +
      `<div class="soc hero-soc rv" style="--d:4">${socials()}</div></div>` +
      `<figure class="portrait rv" style="--d:2"><div class="ring"></div>` +
      `<img src="assets/photo.jpg" width="720" height="900" alt="Portrait of ${esc(S.name)}" fetchpriority="high">` +
      `<figcaption>Electrical and electronic engineering student at IUT</figcaption></figure>` +
      `</section>` +
      `<section class="sec wrap" id="about-me" aria-labelledby="h-about"><div class="sec-head"><h2 id="h-about">About me</h2></div>` +
      `<p class="lead">${esc(S.intro)}</p><div class="readout">${S.stats.map(statTile).join("")}</div></section>` +
      `<section class="sec wrap" id="projects" aria-labelledby="h-projects"><div class="sec-head"><h2 id="h-projects">Projects</h2>` +
      `<a class="more" href="projects.html"><span>All projects</span>${icon("chev")}</a></div>${featured(S.projects[0])}</section>` +
      `<div class="wrap seemore-wrap"><h2 class="seemore">See more about me</h2>${icon("down")}</div>` +
      `<nav class="wrap" aria-label="Sections"><div class="rows">` +
      NAV.map((n) => `<a class="row ${n.tone}" href="${n.href}"><span class="ico">${icon(n.icon)}</span><span class="txt"><b>${n.full}</b><small>${n.blurb}</small></span><span class="go">${icon("chev")}</span></a>`).join("") +
      `</div></nav>`
    );
  }

  function academics() {
    const courses = S.courses
      .map((c) => `<article class="course ${c.tone}"><span class="ico">${icon(c.icon)}</span><h3>${esc(c.name)}</h3><p>${esc(c.blurb)}</p>${c.result ? `<p class="result">${esc(c.result)}</p>` : ""}</article>`)
      .join("");
    const results = S.results
      .map((r) => `<li class="tl ${r.tone}"><div class="when">${esc(r.when)}</div><h3>${esc(r.title)}</h3>${r.where ? `<div class="where">${esc(r.where)}</div>` : ""}` +
        `<div class="score"><b>${esc(r.score)}</b><span>${esc(r.unit)}</span></div>${r.note ? `<p class="note">${esc(r.note)}</p>` : ""}</li>`)
      .join("");
    const builds = S.builds
      .map((b) => `<article class="build ${b.tone}"><span class="ico">${icon(b.icon)}</span><div><h3>${esc(b.name)}</h3><p>${esc(b.text)}</p></div></article>`)
      .join("");
    return (
      header("Academics & Expertise", "What I've studied, how I did, and what I've built.") +
      `<div class="page-body"><div class="tabs" role="tablist" aria-label="Academics sections">` +
      `<button class="tab" role="tab" id="tab-courses" aria-controls="panel-courses" data-tab="courses" type="button">Courses taken</button>` +
      `<button class="tab" role="tab" id="tab-expertise" aria-controls="panel-expertise" data-tab="expertise" type="button">Expertise</button></div>` +
      `<section role="tabpanel" id="panel-courses" aria-labelledby="tab-courses"><div class="courses">${courses}</div></section>` +
      `<section role="tabpanel" id="panel-expertise" aria-labelledby="tab-expertise" hidden><div class="split">` +
      `<div><h2 class="h-sm">Academic results</h2><ol class="timeline">${results}</ol></div>` +
      `<div><h2 class="h-sm">Hands-on builds</h2><div class="builds">${builds}</div></div></div></section></div>`
    );
  }

  function skills() {
    const rows = S.skills.map((g) => `<div class="skillrow ${g.tone}"><h3>${icon(g.icon)}<span>${esc(g.title)}</span></h3>${chips(g.items)}</div>`).join("");
    const people = S.people.map((p) => `<div class="person"><b>${esc(p.title)}</b><span>${esc(p.text)}</span></div>`).join("");
    return (
      header("Skills", "The software I work in and the skills I use with people.") +
      `<div class="page-body"><div class="block">${rows}</div><div class="block"><h2 class="h-sm">People skills</h2><div class="people">${people}</div></div></div>`
    );
  }

  function achievements() {
    const r = S.rcsc;
    const roles = r.roles.map((x) => `<li class="tl ${x.tone}"><div class="when">${esc(x.when)}</div><h3>${esc(x.title)}</h3></li>`).join("");
    const wins = S.wins
      .map((w) => `<div class="win"><b>${esc(w.result)}</b><span class="ev">${esc(w.event)}</span><span class="yr">${esc(w.year)}</span></div>`)
      .join("");
    return (
      header("Achievements", "Leading a science club and competing in olympiads.") +
      `<div class="page-body"><section class="block org"><h2>${esc(r.name)}</h2><p class="sub">${esc(r.sub)}</p>` +
      `<div class="split" style="margin-top:30px"><ol class="timeline">${roles}</ol><div></div></div>` +
      `<div class="readout cols3">${r.stats.map(statTile).join("")}</div></section>` +
      `<section class="block"><h2 class="h-sm">Competitions</h2><div class="wins">${wins}</div></section></div>`
    );
  }

  function projects() {
    const p = S.projects[0];
    return (
      header("Projects", "Things I've built. More are on the way.") +
      `<div class="page-body"><section class="block">${featured(p)}` +
      `<div class="split" style="margin-top:34px"><div><h2 class="h-sm">What it does</h2><ul class="prose" style="padding-left:1.2rem;margin:0">${p.points.map((x) => `<li>${esc(x)}</li>`).join("")}</ul></div>` +
      `<div><h2 class="h-sm">Pages inside the app</h2>${chips(p.pages)}<h2 class="h-sm" style="margin-top:28px">Built with</h2>${chips(p.tech)}</div></div></section>` +
      `<section class="block"><div class="empty"><div><b>More projects are on the way</b>I'm planning the next one now. Follow along on GitHub.</div>` +
      `<a class="btn btn-ghost" href="${esc(S.links.github)}" target="_blank" rel="noopener">${icon("github")}<span>See my GitHub</span></a></div></section></div>`
    );
  }

  function about() {
    return (
      header("About", "A bit more about who I am.") +
      `<div class="page-body"><div class="about"><figure class="portrait"><div class="ring"></div>` +
      `<img src="assets/photo.jpg" width="720" height="900" alt="Portrait of ${esc(S.name)}"></figure>` +
      `<div><div class="block"><div class="prose">${S.bio.map((b) => `<p>${esc(b)}</p>`).join("")}</div></div>` +
      `<div class="block"><h2 class="h-sm">Experience</h2><div class="exps">${S.experience.map((e) => `<article class="exp"><span class="ico">${icon(e.icon)}</span><div><h3>${esc(e.title)}</h3><p>${esc(e.text)}</p></div></article>`).join("")}</div></div>` +
      `<div class="block"><h2 class="h-sm">Hobbies and interests</h2><div class="hobbies">${S.hobbies.map((h) => `<span class="hob"><span aria-hidden="true">${h.icon}</span>${esc(h.name)}</span>`).join("")}</div></div>` +
      `</div></div></div>`
    );
  }

  function contact() {
    const rows = [
      ["mail", "Email", S.email, "mailto:" + S.email],
      ["linkedin", "LinkedIn", "linkedin.com/in/talha-yaseer-a9770b369", S.links.linkedin],
      ["github", "GitHub", "github.com/abeeryaseer24", S.links.github],
      ["facebook", "Facebook", "Talha Yaseer Abeer", S.links.facebook]
    ];
    return (
      header("Contact", "The best way to reach me is by email.") +
      `<div class="page-body"><div class="contact"><div><p class="big">Let's talk about internships, research or a project.</p>` +
      `<p class="say">I read every message and reply as soon as I can.</p>` +
      `<div class="btns"><a class="btn btn-primary" href="mailto:${esc(S.email)}">${icon("mail")}<span>Send an email</span></a>${resumeBtn("btn-ghost")}</div></div>` +
      `<div class="links">${rows.map(([i, l, v, h]) => `<a class="linkrow" href="${esc(h)}"${external(h)}><span class="ico">${icon(i)}</span><span><b>${l}</b><small>${esc(v)}</small></span>${/^https?:/.test(h) ? `<span class="out">${icon("out")}</span>` : ""}</a>`).join("")}</div></div></div>`
    );
  }

  function notfound() {
    return `<div class="notfound"><h1>That page isn't here</h1><p style="color:var(--muted)">The link may be old, or the address has a typo.</p><a class="btn btn-primary" href="index.html">${icon("bolt")}<span>Go to the homepage</span></a></div>`;
  }

  const PAGES = { home, academics, skills, achievements, projects, about, contact, notfound };

  /* ---------- mount ---------- */
  const root = document.getElementById("root");
  const content = (PAGES[page] || notfound)();
  const wrapped = page === "home" ? content : `<div class="wrap">${content}</div>`;
  root.innerHTML =
    `<a class="skip-link" href="#main">Skip to content</a><canvas id="bg" aria-hidden="true"></canvas>` +
    `<div class="shell">${page === "home" ? "" : topbar()}<main id="main">${wrapped}</main>${footer()}</div>` +
    `<button class="theme-btn" id="theme" type="button" aria-label="Switch between dark and light mode"></button><div class="toast" id="toast" role="status" aria-live="polite"></div>`;

  /* ---------- theme ---------- */
  const themeBtn = document.getElementById("theme");
  const currentTheme = () => document.documentElement.dataset.theme === "light" ? "light" : "dark";
  const paintThemeBtn = () => { themeBtn.innerHTML = icon(currentTheme() === "dark" ? "sun" : "moon"); };
  paintThemeBtn();
  themeBtn.addEventListener("click", () => {
    const next = currentTheme() === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    safeSet("theme", next);
    paintThemeBtn();
    if (bg) bg.rebuild();
  });

  /* ---------- toast + résumé button ---------- */
  const toastEl = document.getElementById("toast");
  let toastTimer = 0;
  const toast = (msg) => {
    toastEl.textContent = msg;
    toastEl.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove("show"), 3200);
  };
  document.addEventListener("click", (e) => {
    const a = e.target.closest("[data-resume]");
    if (a && !S.resume.ready) {
      e.preventDefault();
      toast("The résumé is coming soon. Please check back shortly.");
    }
  });

  /* ---------- mobile menu ---------- */
  const burger = document.getElementById("burger");
  const drawer = document.getElementById("drawer");
  if (burger && drawer) {
    const setOpen = (open) => {
      drawer.classList.toggle("open", open);
      burger.setAttribute("aria-expanded", String(open));
      burger.innerHTML = icon(open ? "close" : "menu");
      document.documentElement.classList.toggle("lock", open);
    };
    burger.addEventListener("click", () => setOpen(!drawer.classList.contains("open")));
    drawer.addEventListener("click", (e) => { if (e.target.closest("a")) setOpen(false); });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") setOpen(false); });
    window.addEventListener("resize", () => { if (window.innerWidth > 980) setOpen(false); });
  }

  /* ---------- tabs (academics) ---------- */
  const tabs = [...document.querySelectorAll('[role="tab"]')];
  if (tabs.length) {
    const select = (id, focus) => {
      tabs.forEach((t) => {
        const on = t.dataset.tab === id;
        t.setAttribute("aria-selected", String(on));
        t.tabIndex = on ? 0 : -1;
        document.getElementById("panel-" + t.dataset.tab).hidden = !on;
        if (on && focus) t.focus();
      });
      try { history.replaceState(null, "", "#" + id); } catch (e) { /* ignore */ }
    };
    tabs.forEach((t, i) => {
      t.addEventListener("click", () => select(t.dataset.tab));
      t.addEventListener("keydown", (e) => {
        const k = { ArrowRight: 1, ArrowLeft: -1 }[e.key];
        if (k) { e.preventDefault(); select(tabs[(i + k + tabs.length) % tabs.length].dataset.tab, true); }
      });
    });
    select(location.hash === "#expertise" ? "expertise" : "courses");
  }

  /* ---------- count-up numbers ---------- */
  const nums = [...document.querySelectorAll(".num[data-to]")];
  const fmt = (el, v) => { el.textContent = v.toFixed(+el.dataset.dec) + el.dataset.suf; };
  if (nums.length && !reduce && "IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        io.unobserve(en.target);
        const el = en.target, to = +el.dataset.to, t0 = performance.now();
        const tick = (now) => {
          const p = Math.min(1, (now - t0) / 1100);
          fmt(el, to * (1 - Math.pow(1 - p, 3)));
          if (p < 1) requestAnimationFrame(tick); else fmt(el, to);
        };
        requestAnimationFrame(tick);
      });
    }, { threshold: 0.6 });
    nums.forEach((n) => { fmt(n, 0); io.observe(n); });
  }

  /* ---------- circuit-board background ---------- */
  function circuit(canvas) {
    const ctx = canvas.getContext("2d");
    let W = 0, H = 0, DPR = 1, traces = [], pulses = [], layer = null, raf = 0, last = 0, timer = 0;
    const rnd = (a, b) => a + Math.random() * (b - a);
    const DIRS = [[1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0], [-1, -1], [0, -1], [1, -1]];
    const css = (n) => getComputedStyle(document.documentElement).getPropertyValue(n).trim();

    function pointAt(t, d) {
      const c = t.cum;
      let i = 1;
      while (i < c.length - 1 && c[i] < d) i++;
      const seg = c[i] - c[i - 1] || 1;
      const k = Math.max(0, Math.min(1, (d - c[i - 1]) / seg));
      return [t.pts[i - 1][0] + (t.pts[i][0] - t.pts[i - 1][0]) * k, t.pts[i - 1][1] + (t.pts[i][1] - t.pts[i - 1][1]) * k];
    }

    function build() {
      DPR = Math.min(window.devicePixelRatio || 1, 2);
      W = window.innerWidth; H = window.innerHeight;
      canvas.width = W * DPR; canvas.height = H * DPR;
      canvas.style.width = W + "px"; canvas.style.height = H + "px";
      const small = W < 700, g = small ? 36 : 44;
      const cols = Math.ceil(W / g), rows = Math.ceil(H / g);
      const count = Math.round((cols * rows) / (small ? 20 : 15));
      traces = [];
      for (let n = 0; n < count; n++) {
        let x = Math.floor(rnd(0, cols)) * g, y = Math.floor(rnd(0, rows)) * g;
        let dir = Math.floor(rnd(0, 4)) * 2;
        const pts = [[x, y]], segs = Math.floor(rnd(3, 8));
        for (let s = 0; s < segs; s++) {
          const r = Math.random();
          dir = (dir + (r < .5 ? 0 : r < .7 ? 1 : r < .85 ? -1 : r < .93 ? 2 : -2) + 8) % 8;
          const len = (dir % 2 ? Math.floor(rnd(1, 3)) : Math.floor(rnd(2, 6))) * g;
          const nx = x + DIRS[dir][0] * len, ny = y + DIRS[dir][1] * len;
          if (nx < -g || nx > W + g || ny < -g || ny > H + g) break;
          x = nx; y = ny; pts.push([x, y]);
        }
        if (pts.length < 3) continue;
        const cum = [0];
        for (let i = 1; i < pts.length; i++) cum.push(cum[i - 1] + Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]));
        traces.push({ pts, cum, len: cum[cum.length - 1], red: Math.random() < .22 });
      }
      const ay = css("--trace-y") || "255,210,31", ar = css("--trace-r") || "255,59,47", al = parseFloat(css("--trace-a")) || .17;
      layer = document.createElement("canvas");
      layer.width = canvas.width; layer.height = canvas.height;
      const lc = layer.getContext("2d");
      lc.scale(DPR, DPR);
      lc.lineJoin = "round"; lc.lineCap = "round";
      traces.forEach((t) => {
        const col = t.red ? ar : ay;
        lc.strokeStyle = `rgba(${col},${al})`; lc.lineWidth = 1.4;
        lc.beginPath(); lc.moveTo(t.pts[0][0], t.pts[0][1]);
        t.pts.slice(1).forEach((p) => lc.lineTo(p[0], p[1]));
        lc.stroke();
        [t.pts[0], t.pts[t.pts.length - 1]].forEach((p) => { lc.beginPath(); lc.arc(p[0], p[1], 3.6, 0, 7); lc.strokeStyle = `rgba(${col},${al * 1.5})`; lc.stroke(); });
      });
      pulses = [];
      const np = small ? 7 : 15;
      for (let i = 0; i < np && traces.length; i++) pulses.push(spawn(true));
      draw(0, true);
    }

    function spawn(anywhere) {
      const t = traces[Math.floor(Math.random() * traces.length)];
      return { t, d: anywhere ? rnd(0, t.len) : 0, v: rnd(70, 150) };
    }

    function draw(dt, still) {
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      ctx.clearRect(0, 0, W, H);
      ctx.drawImage(layer, 0, 0, W, H);
      if (still) return;
      const ay = css("--trace-y") || "255,210,31", ar = css("--trace-r") || "255,59,47";
      ctx.globalCompositeOperation = "lighter";
      pulses.forEach((p, i) => {
        p.d += p.v * dt;
        if (p.d > p.t.len + 90) { pulses[i] = spawn(false); return; }
        const col = p.t.red ? ar : ay, steps = 14;
        for (let k = 0; k < steps; k++) {
          const d = p.d - k * 6.5;
          if (d < 0 || d > p.t.len) continue;
          const pt = pointAt(p.t, d), f = 1 - k / steps;
          ctx.fillStyle = `rgba(${col},${(f * f * .9).toFixed(3)})`;
          ctx.beginPath(); ctx.arc(pt[0], pt[1], 0.7 + 2 * f, 0, 7); ctx.fill();
        }
      });
      ctx.globalCompositeOperation = "source-over";
    }

    function frame(now) {
      const dt = Math.min(.05, (now - last) / 1000 || 0);
      last = now;
      draw(dt, false);
      raf = requestAnimationFrame(frame);
    }

    function start() {
      cancelAnimationFrame(raf);
      build();
      if (!reduce) { last = performance.now(); raf = requestAnimationFrame(frame); }
    }
    window.addEventListener("resize", () => { clearTimeout(timer); timer = setTimeout(start, 220); });
    start();
    return { rebuild: start };
  }
  const bg = circuit(document.getElementById("bg"));

  /* ---------- start-lights intro (home page, first visit per session) ---------- */
  function intro() {
    if (page !== "home") return Promise.resolve();
    let seen = false;
    try { seen = sessionStorage.getItem("intro") === "1"; } catch (e) { /* ignore */ }
    if (reduce || seen) return Promise.resolve();
    return new Promise((resolve) => {
      const el = document.createElement("div");
      el.className = "intro";
      el.innerHTML = `<div class="gantry">${'<span class="lamp"></span>'.repeat(5)}</div><p class="intro-text">Get ready</p><button class="btn btn-ghost btn-sm skip" type="button">Skip</button>`;
      document.body.appendChild(el);
      document.documentElement.classList.add("lock");
      const lamps = [...el.querySelectorAll(".lamp")], text = el.querySelector(".intro-text"), timers = [];
      const at = (fn, ms) => timers.push(setTimeout(fn, ms));
      let done = false;
      const finish = () => {
        if (done) return;
        done = true;
        timers.forEach(clearTimeout);
        el.classList.add("out");
        document.documentElement.classList.remove("lock");
        try { sessionStorage.setItem("intro", "1"); } catch (e) { /* ignore */ }
        setTimeout(() => el.remove(), 700);
        resolve();
      };
      lamps.forEach((l, i) => at(() => l.classList.add("on"), 500 + i * 320));
      at(() => { lamps.forEach((l) => l.classList.remove("on")); text.textContent = "Lights out"; text.classList.add("go"); }, 500 + 4 * 320 + 700);
      at(finish, 500 + 4 * 320 + 700 + 480);
      el.addEventListener("click", finish);
    });
  }

  intro().then(() => requestAnimationFrame(() => document.body.classList.add("ready")));
})();
