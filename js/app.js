/* ------------------------------------------------------------------
   Builds every page from js/data.js, then adds the motion:
   smooth scrolling, text and scroll animations,
   tabs, tilting cards and page wipes.
------------------------------------------------------------------- */
(() => {
  "use strict";
  const S = window.SITE;
  const page = document.body.dataset.page;
  const root = document.getElementById("root");
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const hasGsap = !!window.gsap && !reduce;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const seen = (() => { try { return sessionStorage.getItem("seen"); } catch (e) { return "1"; } })();

  /* ---------- icons ---------- */
  const ICONS = {
    github: ["0 0 16 16", '<path fill="currentColor" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>'],
    linkedin: ["0 0 24 24", '<path fill="currentColor" d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>'],
    facebook: ["0 0 24 24", '<path fill="currentColor" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>'],
    mail: ["0 0 24 24", '<g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></g>'],
    arrow: ["0 0 24 24", '<path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M5 12h14M13 6l6 6-6 6"/>'],
    out: ["0 0 24 24", '<path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M7 17L17 7M8 7h9v9"/>'],
    menu: ["0 0 24 24", '<path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" d="M4 8h16M4 16h16"/>'],
    close: ["0 0 24 24", '<path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" d="M6 6l12 12M18 6L6 18"/>']
  };
  const ic = (n, cls = "") => `<svg class="${cls}" viewBox="${ICONS[n][0]}" aria-hidden="true" focusable="false">${ICONS[n][1]}</svg>`;
  const ext = 'target="_blank" rel="noopener"';
  const meta = S.pages.find((p) => p.id === page);

  /* ---------- shared pieces ---------- */
  const nav = () => page === "home"
    ? `<header class="nav bare">
        <a class="brand" href="index.html" aria-label="${S.name}, home">TY<b>A</b></a>
        <a class="pill-link spacer" href="contact.html">Contact</a>
        <a class="icon-btn glass gh" href="${S.links.github}" ${ext} aria-label="GitHub">${ic("github")}</a>
      </header>`
    : `<header class="nav glass">
        <a class="brand" href="index.html" aria-label="${S.name}, home">TY<b>A</b></a>
        <nav class="nav-links" aria-label="Pages">
          ${S.pages.map((p) => `<a href="${p.file}"${p.id === page ? ' aria-current="page"' : ""}>${p.title}</a>`).join("")}
        </nav>
        <a class="icon-btn gh" href="${S.links.github}" ${ext} aria-label="GitHub">${ic("github")}</a>
        <button class="icon-btn menu-btn" aria-label="Open menu" aria-expanded="false">${ic("menu")}</button>
      </header>
      <div class="drawer" id="drawer">
        <a href="index.html">Home</a>
        ${S.pages.map((p) => `<a href="${p.file}"${p.id === page ? ' aria-current="page"' : ""}>${p.title}</a>`).join("")}
      </div>`;

  const head = () => `
    <section class="page-head"><div class="wrap">
      <h1 class="display page-title" data-split>${meta.title}</h1>
      <p class="lead" data-hero>${S.intros[page]}</p>
    </div></section>`;

  const explore = () => `
    <section class="explore" aria-labelledby="explore-h"><div class="wrap">
      <h2 class="h2" id="explore-h" data-reveal>Keep exploring</h2>
      <div class="home-grid">
        ${S.pages.filter((p) => p.id !== page).map((p) => `
          <a class="card glass next-card" href="${p.file}" data-reveal>
            <h3 class="h3">${p.title}</h3>
            <p class="muted">${p.blurb}</p>
            <span class="open">View ${p.title.toLowerCase()} ${ic("arrow")}</span>
          </a>`).join("")}
      </div>
    </div></section>`;

  const foot = () => `
    <footer class="foot"><div class="wrap foot-in">
      <span>© ${new Date().getFullYear()} ${S.name}</span>
      <a class="gh-link" href="${S.links.github}" ${ext}>${ic("github")} github.com/${S.handles.github}</a>
    </div></footer>`;

  const stat = (s) => `
    <div class="card glass" data-reveal>
      <div class="big-num" data-count="${s.to}" data-dec="${s.dec || 0}" data-suf="${s.suf || ""}">${s.dec ? s.to.toFixed(s.dec) : s.to}${s.suf || ""}</div>
      <p class="stat-label">${s.label}</p>
      <p class="muted">${s.note}</p>
    </div>`;

  const tabs = (name, list) => `
    <div class="tabs glass" role="tablist" aria-label="${name}">
      ${list.map((t, i) => `<button class="tab" role="tab" id="tab-${t.id}" aria-controls="panel-${t.id}" aria-selected="${i === 0}" tabindex="${i === 0 ? 0 : -1}">${t.tab}</button>`).join("")}
    </div>`;
  const panel = (id, first, html) => `<div class="panel" role="tabpanel" id="panel-${id}" aria-labelledby="tab-${id}"${first ? "" : " hidden"}>${html}</div>`;

  /* ---------- pages ---------- */
  const PAGES = {
    home: () => `
      <section class="hero"><div class="wrap"><div class="hero-in">
        <p class="hero-role" data-hero>${S.role}</p>
        <h1 class="display hero-name" data-split>${S.name}</h1>
        <p class="hero-line" data-hero>${S.tagline}</p>
        <div class="hero-cta" data-hero>
          <a class="btn" href="#explore">Explore my work</a>
          <a class="btn ghost" href="${S.links.github}" ${ext}>${ic("github")} GitHub</a>
        </div>
      </div></div>
      <p class="hero-hint hidden md:block" data-hero>Drag to rotate the car</p>
      </section>
      <section class="home-sec" id="explore" aria-labelledby="explore-h"><div class="wrap">
        <h2 class="h2" id="explore-h" data-reveal>Explore</h2>
        <div class="home-grid">
          ${S.pages.filter((p) => p.id !== "contact").map((p) => `
            <a class="card glass next-card" href="${p.file}" data-reveal>
              <h3 class="h3">${p.title}</h3>
              <p class="muted">${p.blurb}</p>
              <span class="open">View ${p.title.toLowerCase()} ${ic("arrow")}</span>
            </a>`).join("")}
        </div>
        <a class="cta-band glass" href="contact.html" data-reveal>
          <span><b class="h3">Let's work together</b><br><span class="muted">${S.pages.find((p) => p.id === "contact").blurb}</span></span>
          <span class="btn">Get in touch</span>
        </a>
      </div></section>`,

    education: () => {
      const c = S.current;
      const list = [{ id: "current", tab: "Current" }, { id: "background", tab: "Background" }];
      return head() + `<section class="sec"><div class="wrap">
        ${tabs("Education", list)}
        ${panel("current", true, `
          <div class="card glass grid md:grid-cols-[1fr_auto] gap-6 items-end" data-item>
            <div>
              <h2 class="h2">${c.degree}</h2>
              <p class="mt-2 font-semibold">${c.where}</p>
              <p class="muted mt-2">${c.note}</p>
            </div>
            <div><div class="big-num" data-count="${c.cgpa}" data-dec="2">${c.cgpa.toFixed(2)}<small>CGPA out of ${c.outOf}</small></div></div>
          </div>
          <h2 class="h2 mt-12 mb-5" data-item>Courses and what they taught me</h2>
          <div class="grid sm:grid-cols-2 gap-5">
            ${S.courses.map((k) => `
              <article class="card glass course" data-item>
                <h3 class="h3">${k.name}</h3>
                <p class="muted mt-2">${k.learnt}</p>
                ${k.result ? `<span class="result">Result: ${k.result}</span>` : ""}
              </article>`).join("")}
          </div>`)}
        ${panel("background", false, `
          <div class="timeline">
            ${S.background.map((b) => `
              <div class="card glass t-row" data-item>
                <div>
                  <span class="t-when">${b.when}</span>
                  <h3 class="h3 mt-1">${b.title}</h3>
                  ${b.note ? `<p class="muted mt-1">${b.note}</p>` : ""}
                </div>
                <div class="t-score"><b>${b.score}</b><span>${b.unit}</span></div>
              </div>`).join("")}
          </div>`)}
      </div></section>`;
    },

    expertise: () => head() + `<section class="sec"><div class="wrap">
      ${tabs("Expertise", S.expertise)}
      ${S.expertise.map((e, i) => panel(e.id, i === 0, `
        <p class="lead mb-7" data-item>${e.intro}</p>
        <div class="grid ${e.skills ? "sm:grid-cols-2 lg:grid-cols-3" : "sm:grid-cols-2"} gap-5">
          ${(e.groups || []).map((g) => `
            <article class="card glass" data-item>
              <h3 class="h3 mb-4">${g.title}</h3>
              <div class="chips">${g.items.map((x) => `<span class="chip">${x}</span>`).join("")}</div>
            </article>`).join("")}
          ${(e.skills || []).map((k) => `
            <article class="card glass" data-item>
              <h3 class="h3 mb-2">${k.title}</h3>
              <p class="muted">${k.text}</p>
            </article>`).join("")}
        </div>`)).join("")}
    </div></section>`,

    achievements: () => head() + `
      <section class="sec"><div class="wrap">
        <h2 class="h2 sec-title" data-reveal>Olympiads and competitions</h2>
        <div class="card glass" data-reveal>
          ${S.olympiads.map((w) => `<div class="win"><b>${w.result}</b><span>${w.event}</span><span class="muted">${w.year}</span></div>`).join("")}
        </div>
      </div></section>
      <section class="sec"><div class="wrap">
        <h2 class="h2 sec-title" data-reveal>Organizing at national level</h2>
        <p class="lead mb-6" data-reveal>${S.organizing.text}</p>
        <div class="grid sm:grid-cols-3 gap-5">${S.organizing.stats.map(stat).join("")}</div>
      </div></section>
      <section class="sec"><div class="wrap">
        <h2 class="h2 sec-title" data-reveal>Teaching and mentorship</h2>
        <p class="lead mb-6" data-reveal>${S.teaching.text}</p>
        <div class="grid sm:grid-cols-2 gap-5">${S.teaching.stats.map(stat).join("")}</div>
        <p class="card glass mt-5 font-semibold" data-reveal>${S.teaching.now}</p>
      </div></section>`,

    experience: () => head() + S.experience.map((l) => `
      <section class="sec"><div class="wrap grid lg:grid-cols-[260px_1fr] gap-5 lg:gap-10 items-start">
        <h2 class="lane-name lg:sticky lg:top-28" data-reveal>${l.lane}</h2>
        <div class="grid gap-5">
          ${l.items.map((x) => `
            <${x.href ? `a href="${x.href}"` : "article"} class="card glass block" data-reveal>
              <span class="tag">${x.tag}</span>
              <h3 class="h3 mt-1 mb-2" style="font-size:1.08rem">${x.title}</h3>
              <p class="muted">${x.text}</p>
              ${x.href ? `<span class="next-card"><span class="open mt-3">See the project ${ic("arrow")}</span></span>` : ""}
            </${x.href ? "a" : "article"}>`).join("")}
        </div>
      </div></section>`).join(""),

    projects: () => {
      const f = S.f1;
      return head() + `
      <section class="sec"><div class="wrap">
        <article class="card glass" data-reveal style="padding:clamp(24px,4vw,48px)">
          <span class="tag">${f.kicker}</span>
          <h2 class="display mt-2" style="font-size:clamp(1.4rem,3vw,2.1rem)">${f.title}</h2>
          <p class="lead mt-5" style="color:var(--paper)">${f.summary}</p>
          <div class="hero-cta">
            <a class="btn" href="${f.live}" ${ext}>Open the live app ${ic("out")}</a>
            <a class="btn ghost" href="${f.repo}" ${ext}>${ic("github")} Source code</a>
          </div>
        </article>
        <div class="grid lg:grid-cols-2 gap-5 mt-5">
          <article class="card glass" data-reveal>
            <h3 class="h3">What it does</h3>
            <ul class="ticks mt-3">${f.points.map((p) => `<li>${p}</li>`).join("")}</ul>
          </article>
          <div class="grid gap-5">
            <article class="card glass" data-reveal>
              <h3 class="h3 mb-4">Pages inside the app</h3>
              <div class="chips">${f.pages.map((x) => `<span class="chip">${x}</span>`).join("")}</div>
            </article>
            <article class="card glass" data-reveal>
              <h3 class="h3 mb-4">Built with</h3>
              <div class="chips">${f.tech.map((x) => `<span class="chip">${x}</span>`).join("")}</div>
            </article>
          </div>
        </div>
      </div></section>
      <section class="sec"><div class="wrap">
        <h2 class="h2 sec-title" data-reveal>Hardware builds</h2>
        <div class="grid sm:grid-cols-2 gap-5">
          ${S.builds.map((b) => `<article class="card glass" data-reveal><h3 class="h3 mb-2">${b.name}</h3><p class="muted">${b.text}</p></article>`).join("")}
        </div>
      </div></section>`;
    },

    about: () => head() + `
      <section class="sec"><div class="wrap grid md:grid-cols-[minmax(0,380px)_1fr] gap-8 lg:gap-14 items-start">
        <figure class="glass photo m-0 md:sticky md:top-28" data-reveal>
          <img src="${S.photo}" alt="Portrait of ${S.name}" width="720" height="900">
        </figure>
        <div>
          <div class="grid gap-4" data-reveal>${S.bio.map((p, i) => `<p${i ? ' class="muted"' : ""}>${p}</p>`).join("")}</div>
          <dl class="card glass details mt-8" data-reveal>${S.details.map((d) => `<div><dt>${d.k}</dt><dd>${d.v}</dd></div>`).join("")}</dl>
          <h2 class="h2 mt-10 mb-5" data-reveal>Off the clock</h2>
          <div class="flex flex-wrap gap-3">${S.hobbies.map((h) => `<div class="glass hobby" data-reveal><span aria-hidden="true">${h.icon}</span>${h.name}</div>`).join("")}</div>
        </div>
      </div></section>`,

    contact: () => {
      const rows = [
        { i: "mail", label: "Email", to: S.email, href: `mailto:${S.email}` },
        { i: "github", label: "GitHub", to: S.handles.github, href: S.links.github },
        { i: "linkedin", label: "LinkedIn", to: S.handles.linkedin, href: S.links.linkedin },
        { i: "facebook", label: "Facebook", to: S.handles.facebook, href: S.links.facebook }
      ];
      return head() + `<section class="sec"><div class="wrap"><div class="grid gap-4" style="max-width:860px">
        ${rows.map((r) => `
          <a class="card glass reach" href="${r.href}" ${r.i === "mail" ? "" : ext} data-reveal>
            <span class="ico">${ic(r.i)}</span>
            <span><span class="muted" style="font-size:.9rem">${r.label}</span><br><span class="to">${r.to}</span></span>
            ${ic("out", "go")}
          </a>`).join("")}
      </div></div></section>`;
    },

    lost: () => `
      <section class="hero"><div class="wrap">
        <h1 class="display hero-name" data-split>Page not found</h1>
        <p class="hero-line" data-hero>This page does not exist. The home page has links to everything.</p>
        <div class="hero-cta" data-hero><a class="btn" href="index.html">Back to home</a></div>
      </div></section>`
  };

  /* ---------- render ---------- */
  document.body.classList.add("site");
  root.innerHTML =
    `<div class="wipe" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i></div>` +
    nav() +
    `<main id="main">${(PAGES[page] || PAGES.lost)()}${["home", "contact", "lost"].includes(page) ? "" : explore()}</main>` +
    foot();
  try { sessionStorage.setItem("seen", "1"); } catch (e) { /* storage blocked: fine */ }

  /* ---------- menu (small screens) ---------- */
  const menuBtn = $(".menu-btn"), drawer = $("#drawer");
  if (menuBtn) menuBtn.addEventListener("click", () => {
    const open = drawer.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", open);
    menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    menuBtn.innerHTML = ic(open ? "close" : "menu");
    document.documentElement.style.overflow = open ? "hidden" : "";
  });

  /* ---------- top bar: glass once scrolled, hides on the way down, returns on the way up ---------- */
  const bar = $(".nav");
  if (bar) {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      bar.classList.toggle("solid", y > 40);
      const menuOpen = drawer && drawer.classList.contains("open");
      if (menuOpen || y < 120 || y < last - 4) bar.classList.remove("hide");
      else if (y > last + 4) bar.classList.add("hide");
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    bar.addEventListener("focusin", () => bar.classList.remove("hide"));
    onScroll();
  }

  /* ---------- smooth scrolling ---------- */
  let lenis = null;
  if (window.Lenis && !reduce) {
    lenis = new window.Lenis({ lerp: 0.1 });
    if (window.gsap && window.ScrollTrigger) {
      lenis.on("scroll", window.ScrollTrigger.update);
      window.gsap.ticker.add((time) => lenis.raf(time * 1000));
      window.gsap.ticker.lagSmoothing(0);
    } else {
      const raf = (time) => { lenis.raf(time); requestAnimationFrame(raf); };
      requestAnimationFrame(raf);
    }
  }
  $$('a[href^="#"]').forEach((a) => a.addEventListener("click", (e) => {
    const target = $(a.getAttribute("href"));
    if (!target) return;
    e.preventDefault();
    if (lenis) lenis.scrollTo(target, { offset: -40, duration: 1.4 });
    else target.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
  }));

  /* ---------- intro: big title, letter by letter ---------- */
  function intro() {
    if (!hasGsap) return;
    const gsap = window.gsap;
    $$("[data-split]").forEach((el) => {
      if (!window.SplitType) return gsap.from(el, { y: 40, opacity: 0, duration: 0.9, ease: "power3.out" });
      const targets = el.children.length ? Array.from(el.children) : [el];
      targets.forEach((t) => t.classList.add("line"));
      const split = new window.SplitType(targets, { types: "words,chars" });
      gsap.from(split.chars, { yPercent: 115, rotate: 6, duration: 1, ease: "expo.out", stagger: 0.028 });
    });
    gsap.from("[data-hero]", { y: 26, opacity: 0, duration: 0.9, ease: "power3.out", stagger: 0.09, delay: 0.35 });
  }

  /* ---------- reveal on scroll, counting numbers ---------- */
  function countUp(el) {
    const to = parseFloat(el.dataset.count), dec = +el.dataset.dec || 0, suf = el.dataset.suf || "";
    const node = el.firstChild; // keep any <small> label that follows the number
    const o = { v: 0 };
    window.gsap.to(o, { v: to, duration: 1.6, ease: "power2.out", onUpdate: () => { node.nodeValue = o.v.toFixed(dec) + suf; } });
  }
  function showItems(scope) {
    if (!hasGsap) return;
    const items = $$("[data-item]", scope);
    window.gsap.fromTo(items, { opacity: 0 }, { opacity: 1, duration: 0.7, ease: "power2.out", stagger: 0.07 });
    $$("[data-count]", scope).forEach(countUp);
  }
  function reveals() {
    if (!hasGsap || !window.ScrollTrigger) return;
    const gsap = window.gsap;
    gsap.registerPlugin(window.ScrollTrigger);
    const els = $$("[data-reveal]");
    els.forEach((el) => gsap.set(el, el.classList.contains("card") ? { opacity: 0 } : { opacity: 0, y: 28 }));
    window.ScrollTrigger.batch(els, {
      start: "top 90%", once: true,
      onEnter: (batch) => {
        gsap.to(batch, { opacity: 1, duration: 0.8, ease: "power3.out", stagger: 0.08 });
        const plain = batch.filter((el) => !el.classList.contains("card"));
        if (plain.length) gsap.to(plain, { y: 0, duration: 0.8, ease: "power3.out", stagger: 0.08 });
        batch.forEach((el) => $$("[data-count]", el).concat(el.matches("[data-count]") ? [el] : []).forEach(countUp));
      }
    });
    const first = $(".panel:not([hidden])");
    if (first) showItems(first);
  }

  /* ---------- tabs ---------- */
  const tabEls = $$(".tab");
  function pick(tab, focus) {
    tabEls.forEach((t) => {
      const on = t === tab;
      t.setAttribute("aria-selected", on);
      t.tabIndex = on ? 0 : -1;
      const p = document.getElementById(t.getAttribute("aria-controls"));
      p.hidden = !on;
      if (on) showItems(p);
    });
    if (focus) tab.focus();
    try { history.replaceState(null, "", "#" + tab.id.replace("tab-", "")); } catch (e) { /* file preview: fine */ }
    if (lenis) lenis.resize();
    if (window.ScrollTrigger) window.ScrollTrigger.refresh();
  }
  tabEls.forEach((t, i) => {
    t.addEventListener("click", () => pick(t));
    t.addEventListener("keydown", (e) => {
      const d = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
      if (d) pick(tabEls[(i + d + tabEls.length) % tabEls.length], true);
    });
  });
  const fromHash = document.getElementById("tab-" + location.hash.slice(1));
  if (fromHash) pick(fromHash);

  /* ---------- cards tilt toward the pointer ---------- */
  if (!reduce && window.matchMedia("(hover: hover)").matches) {
    $$(".card").forEach((card) => {
      const max = Math.min(7, 1800 / card.offsetWidth);
      card.addEventListener("pointermove", (e) => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
        card.classList.add("is-tilting");
        card.style.setProperty("--ry", ((x - 0.5) * max).toFixed(2) + "deg");
        card.style.setProperty("--rx", ((0.5 - y) * max).toFixed(2) + "deg");
        card.style.setProperty("--mx", (x * 100).toFixed(1) + "%");
        card.style.setProperty("--my", (y * 100).toFixed(1) + "%");
      });
      card.addEventListener("pointerleave", () => {
        card.classList.remove("is-tilting");
        card.style.setProperty("--rx", "0deg");
        card.style.setProperty("--ry", "0deg");
      });
    });
    // hovering a home card speeds up the current on the board
    $$(".home-grid .card").forEach((s) => {
      s.addEventListener("pointerenter", () => window.SCENE && window.SCENE.boost(1));
      s.addEventListener("pointerleave", () => window.SCENE && window.SCENE.boost(0));
    });
  }

  /* ---------- page wipes ---------- */
  const bars = $$(".wipe i");
  function wipeOut(then) {
    if (!hasGsap) return then();
    window.gsap.set(bars, { scaleY: 1, transformOrigin: "top" });
    window.gsap.to(bars, { scaleY: 0, duration: 0.7, ease: "expo.inOut", stagger: 0.06, onComplete: then });
  }
  if (hasGsap) {
    document.addEventListener("click", (e) => {
      const a = e.target.closest("a[href]");
      if (!a || a.target === "_blank" || e.metaKey || e.ctrlKey || e.shiftKey) return;
      const href = a.getAttribute("href");
      if (!/\.html(#.*)?$/.test(href) || /^https?:/.test(href)) return;
      e.preventDefault();
      window.gsap.set(bars, { scaleY: 0, transformOrigin: "bottom" });
      window.gsap.to(bars, { scaleY: 1, duration: 0.5, ease: "expo.inOut", stagger: 0.05, onComplete: () => { location.href = href; } });
    });
    window.addEventListener("pageshow", (e) => { if (e.persisted) window.gsap.set(bars, { scaleY: 0 }); });
  }

  /* ---------- go ---------- */
  function start() { intro(); reveals(); }
  if (seen && hasGsap) {
    wipeOut(() => {});
    setTimeout(start, 250);
  } else {
    start();
  }
})();
