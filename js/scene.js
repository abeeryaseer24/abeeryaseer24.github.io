/* ------------------------------------------------------------------
   The live 3D background: a circuit board with current running through
   it, engineering equations floating above, and (on the home and
   projects pages) an F1 car built from code.
------------------------------------------------------------------- */
(() => {
  "use strict";
  const canvas = document.getElementById("scene");
  if (!canvas || !window.THREE) return;
  const T = window.THREE;
  const page = document.body.dataset.page;
  const home = page === "home";
  const small = window.innerWidth < 768;
  const withCar = home || (page === "projects" && !small);
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  let renderer;
  try {
    renderer = new T.WebGLRenderer({ canvas, antialias: !small, alpha: true, powerPreference: "high-performance" });
  } catch (e) {
    canvas.remove();
    return;
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, small ? 1.5 : 2));

  const scene = new T.Scene();
  scene.fog = new T.Fog(0x5a0803, 14, 44);
  const cam = new T.PerspectiveCamera(42, 1, 0.1, 120);

  scene.add(new T.AmbientLight(0xffe2b8, 0.7));
  const key = new T.DirectionalLight(0xfff2cc, 1.4);
  key.position.set(5, 10, 7);
  scene.add(key);
  const glow = new T.PointLight(0xffb800, 2.4, 26);
  glow.position.set(-5, 3, -3);
  scene.add(glow);

  const R = (a, b) => a + Math.random() * (b - a);
  const RI = (a, b) => Math.floor(R(a, b + 1));

  // soft round dot used for pads, pulses and the glow under the car
  const dotTex = (() => {
    const c = document.createElement("canvas");
    c.width = c.height = 64;
    const g = c.getContext("2d");
    const gr = g.createRadialGradient(32, 32, 0, 32, 32, 32);
    gr.addColorStop(0, "rgba(255,255,255,1)");
    gr.addColorStop(0.35, "rgba(255,255,255,.7)");
    gr.addColorStop(1, "rgba(255,255,255,0)");
    g.fillStyle = gr;
    g.fillRect(0, 0, 64, 64);
    return new T.CanvasTexture(c);
  })();

  /* ---------- circuit board ---------- */
  const board = new T.Group();
  scene.add(board);
  const HALF = 26;
  const DIRS = [[1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0], [-1, -1], [0, -1], [1, -1]];
  const paths = [];
  const linePos = [], lineCol = [], padPos = [];
  const cA = new T.Color(0xffe066), cB = new T.Color(0xff7a1a), tmp = new T.Color();
  const NT = small ? 70 : 150;
  for (let i = 0; i < NT; i++) {
    let x = RI(-HALF, HALF), z = RI(-HALF, HALF), d = RI(0, 3) * 2;
    const pts = [new T.Vector3(x, 0, z)], cum = [0];
    const segs = RI(3, 7);
    for (let s = 0; s < segs; s++) {
      const len = RI(1, 5);
      x += DIRS[d][0] * len;
      z += DIRS[d][1] * len;
      const p = new T.Vector3(x, 0, z);
      cum.push(cum[cum.length - 1] + p.distanceTo(pts[pts.length - 1]));
      pts.push(p);
      d = (d + (Math.random() < 0.5 ? 1 : 7)) % 8;
    }
    tmp.copy(cA).lerp(cB, Math.random());
    for (let s = 0; s < pts.length - 1; s++) {
      linePos.push(pts[s].x, 0, pts[s].z, pts[s + 1].x, 0, pts[s + 1].z);
      lineCol.push(tmp.r, tmp.g, tmp.b, tmp.r, tmp.g, tmp.b);
    }
    padPos.push(pts[0].x, 0, pts[0].z, x, 0, z);
    paths.push({ pts, cum, len: cum[cum.length - 1], speed: R(1.5, 4), off: R(0, 40) });
  }
  const lg = new T.BufferGeometry();
  lg.setAttribute("position", new T.Float32BufferAttribute(linePos, 3));
  lg.setAttribute("color", new T.Float32BufferAttribute(lineCol, 3));
  board.add(new T.LineSegments(lg, new T.LineBasicMaterial({ vertexColors: true, transparent: true, opacity: 0.7 })));

  const pg = new T.BufferGeometry();
  pg.setAttribute("position", new T.Float32BufferAttribute(padPos, 3));
  board.add(new T.Points(pg, new T.PointsMaterial({ map: dotTex, color: 0xffd23f, size: 0.34, transparent: true, depthWrite: false })));

  // chips sitting on the board
  const chipMat = new T.MeshStandardMaterial({ color: 0x1c0503, metalness: 0.5, roughness: 0.45 });
  const edgeMat = new T.LineBasicMaterial({ color: 0xffd23f, transparent: true, opacity: 0.75 });
  for (let i = 0; i < (small ? 8 : 16); i++) {
    const w = RI(2, 4), dpt = RI(1, 3);
    let x = RI(-HALF + 4, HALF - 4), z = RI(-HALF + 4, 6);
    if (Math.hypot(x, z) < 6) x += x < 0 ? -7 : 7;
    const geo = new T.BoxGeometry(w, 0.3, dpt);
    const m = new T.Mesh(geo, chipMat);
    m.position.set(x, 0.15, z);
    m.add(new T.LineSegments(new T.EdgesGeometry(geo), edgeMat));
    board.add(m);
  }

  // current pulses running along the traces
  const pulsePos = new Float32Array(paths.length * 3);
  const pulseGeo = new T.BufferGeometry();
  pulseGeo.setAttribute("position", new T.BufferAttribute(pulsePos, 3));
  board.add(new T.Points(pulseGeo, new T.PointsMaterial({ map: dotTex, color: 0xfff3b0, size: 0.6, transparent: true, depthWrite: false, blending: T.AdditiveBlending })));
  function movePulses(t) {
    for (let i = 0; i < paths.length; i++) {
      const p = paths[i];
      const dist = (t * p.speed + p.off) % p.len;
      let k = 0;
      while (k < p.cum.length - 2 && p.cum[k + 1] < dist) k++;
      const a = p.pts[k], b = p.pts[k + 1];
      const f = (dist - p.cum[k]) / (p.cum[k + 1] - p.cum[k] || 1);
      pulsePos[i * 3] = a.x + (b.x - a.x) * f;
      pulsePos[i * 3 + 1] = 0.04;
      pulsePos[i * 3 + 2] = a.z + (b.z - a.z) * f;
    }
    pulseGeo.attributes.position.needsUpdate = true;
  }

  /* ---------- floating equations ---------- */
  const EQS = [
    "∇ × E = −∂B/∂t", "∇ · B = 0", "e^{jθ} = cos θ + j sin θ", "X(ω) = ∫ x(t) e^{−jωt} dt",
    "P = VI cos φ", "Z = R + jωL", "ω₀ = 1/√(LC)", "F = ma", "D = ½ ρ v^{2} C A",
    "det(A − λI) = 0", "V = IR", "τ = RC"
  ];
  const eqs = [];
  function eqTexture(str) {
    const size = 64, font = (px) => `italic 500 ${px}px "STIX Two Text", Georgia, serif`;
    const parts = str.split(/\^\{([^}]*)\}/); // odd entries are superscripts
    const c = document.createElement("canvas");
    const g = c.getContext("2d");
    let w = 0;
    parts.forEach((s, i) => { g.font = font(i % 2 ? size * 0.6 : size); w += g.measureText(s).width; });
    c.width = Math.ceil(w + 24);
    c.height = 112;
    let x = 12;
    g.fillStyle = "#ffeaa6";
    g.textBaseline = "alphabetic";
    parts.forEach((s, i) => {
      g.font = font(i % 2 ? size * 0.6 : size);
      g.fillText(s, x, i % 2 ? 52 : 78);
      x += g.measureText(s).width;
    });
    const tex = new T.CanvasTexture(c);
    tex.userData = { ratio: c.width / c.height };
    return tex;
  }
  function buildEquations() {
    const n = small ? 7 : EQS.length;
    for (let i = 0; i < n; i++) {
      const tex = eqTexture(EQS[i]);
      const sp = new T.Sprite(new T.SpriteMaterial({ map: tex, transparent: true, opacity: R(0.45, 0.85), depthWrite: false }));
      const h = R(0.9, 1.5);
      sp.scale.set(h * tex.userData.ratio, h, 1);
      sp.position.set(R(-15, 15), R(2.2, 8), R(-20, 2));
      sp.userData = { y: sp.position.y, ph: R(0, 6.28), sp: R(0.15, 0.4) };
      scene.add(sp);
      eqs.push(sp);
    }
  }
  const fontReady = document.fonts && document.fonts.load
    ? Promise.race([document.fonts.load('italic 500 64px "STIX Two Text"'), new Promise((r) => setTimeout(r, 2500))]).catch(() => {})
    : Promise.resolve();
  fontReady.then(buildEquations);

  /* ---------- the car ---------- */
  let car = null;
  const wheels = [];
  const state = { spin: -0.6, boost: 0, drag: false, lastX: 0 };
  if (withCar) {
    car = new T.Group();
    const body = new T.MeshStandardMaterial({ color: 0x160706, metalness: 0.75, roughness: 0.28 });
    const livery = new T.MeshStandardMaterial({ color: 0xffc400, metalness: 0.4, roughness: 0.35, emissive: 0x5a3a00 });
    const red = new T.MeshStandardMaterial({ color: 0xe10600, metalness: 0.4, roughness: 0.35, emissive: 0x400000 });
    const tyre = new T.MeshStandardMaterial({ color: 0x0c0606, roughness: 0.9 });
    const carEdge = new T.LineBasicMaterial({ color: 0xffd23f, transparent: true, opacity: 0.6 });
    const add = (geo, mat, x, y, z, edges = true) => {
      const m = new T.Mesh(geo, mat);
      m.position.set(x, y, z);
      if (edges) m.add(new T.LineSegments(new T.EdgesGeometry(geo, 30), carEdge));
      car.add(m);
      return m;
    };
    const box = (w, h, d) => new T.BoxGeometry(w, h, d);
    const lying = (rTop, rBot, len, seg) => { const g = new T.CylinderGeometry(rTop, rBot, len, seg); g.rotateZ(-Math.PI / 2); return g; };

    add(box(4.0, 0.05, 1.5), body, -0.1, 0.1, 0);                 // floor
    add(box(2.4, 0.42, 0.62), body, 0, 0.42, 0);                  // monocoque
    add(lying(0.06, 0.3, 2.0, 8), red, 2.1, 0.4, 0).scale.set(1, 0.7, 1); // nose
    add(lying(0.34, 0.14, 1.6, 8), body, -1.4, 0.5, 0);           // engine cover
    add(box(0.5, 0.28, 0.26), livery, -0.35, 0.86, 0);            // airbox
    add(box(1.3, 0.3, 0.03), livery, -1.3, 0.86, 0);              // shark fin
    add(box(1.5, 0.34, 0.42), body, -0.15, 0.34, 0.52);           // sidepods
    add(box(1.5, 0.34, 0.42), body, -0.15, 0.34, -0.52);
    add(box(0.6, 0.1, 0.36), tyre, 0.3, 0.64, 0, false);          // cockpit
    add(new T.SphereGeometry(0.14, 16, 12), livery, 0.25, 0.72, 0, false); // helmet
    const halo = new T.TorusGeometry(0.26, 0.03, 6, 14, Math.PI);
    halo.rotateX(Math.PI / 2);
    halo.rotateY(Math.PI / 2);
    add(halo, body, 0.45, 0.8, 0, false);
    add(box(0.04, 0.2, 0.04), body, 0.71, 0.7, 0, false);
    // front wing
    add(box(0.55, 0.04, 1.9), livery, 2.95, 0.14, 0);
    add(box(0.3, 0.04, 1.9), red, 2.8, 0.24, 0).rotation.z = -0.2;
    add(box(0.6, 0.26, 0.03), body, 2.9, 0.22, 0.95);
    add(box(0.6, 0.26, 0.03), body, 2.9, 0.22, -0.95);
    // rear wing
    add(box(0.5, 0.05, 1.4), livery, -2.45, 1.02, 0);
    add(box(0.35, 0.04, 1.2), red, -2.4, 0.5, 0);
    add(box(0.65, 0.72, 0.03), body, -2.45, 0.74, 0.7);
    add(box(0.65, 0.72, 0.03), body, -2.45, 0.74, -0.7);
    add(box(0.06, 0.5, 0.06), body, -2.3, 0.75, 0, false);
    // wheels and suspension
    [[1.7, 0.36, 0.88, 0.36], [1.7, 0.36, -0.88, 0.36], [-1.75, 0.38, 0.9, 0.46], [-1.75, 0.38, -0.9, 0.46]].forEach(([x, r, z, w]) => {
      const g = new T.CylinderGeometry(r, r, w, 28);
      g.rotateX(Math.PI / 2);
      const wh = add(g, tyre, x, r, z, false);
      const rim = new T.CylinderGeometry(r * 0.55, r * 0.55, w + 0.02, 5);
      rim.rotateX(Math.PI / 2);
      wh.add(new T.Mesh(rim, livery));
      wheels.push(wh);
      add(box(0.06, 0.04, 0.6), body, x, r + 0.04, z * 0.55, false);
    });
    // glow on the board under the car
    const under = new T.Mesh(new T.PlaneGeometry(8, 4), new T.MeshBasicMaterial({ map: dotTex, color: 0xffb800, transparent: true, opacity: 0.55, depthWrite: false, blending: T.AdditiveBlending }));
    under.rotation.x = -Math.PI / 2;
    under.position.y = 0.03;
    car.add(under);

    car.userData.baseX = home ? (small ? 0 : 3.4) : 7;
    car.position.set(car.userData.baseX, 0, home ? 0 : -5);
    if (small) car.scale.setScalar(0.8);
    scene.add(car);

    if (home && !small) {
      window.addEventListener("pointerdown", (e) => {
        if (e.pointerType !== "mouse" || e.target.closest("a,button")) return;
        state.drag = true; state.lastX = e.clientX;
      });
      window.addEventListener("pointermove", (e) => {
        if (!state.drag) return;
        state.spin += (e.clientX - state.lastX) * 0.01;
        state.lastX = e.clientX;
      });
      window.addEventListener("pointerup", () => { state.drag = false; });
    }
  }
  window.SCENE = { boost(v) { state.boost = v; } };

  /* ---------- camera, resize, loop ---------- */
  const mouse = { x: 0, y: 0, sx: 0, sy: 0 };
  window.addEventListener("pointermove", (e) => {
    mouse.x = e.clientX / window.innerWidth - 0.5;
    mouse.y = e.clientY / window.innerHeight - 0.5;
  }, { passive: true });

  function resize() {
    const w = window.innerWidth, h = window.innerHeight;
    renderer.setSize(w, h, false);
    cam.aspect = w / h;
    cam.updateProjectionMatrix();
  }
  window.addEventListener("resize", resize);
  resize();

  const look = new T.Vector3();
  const clock = new T.Clock();
  let t = 0, boost = 0;
  function frame() {
    requestAnimationFrame(frame);
    if (document.hidden) return;
    const dt = Math.min(clock.getDelta(), 0.05);
    if (!reduce) t += dt;
    boost += (state.boost - boost) * 0.08;
    mouse.sx += (mouse.x - mouse.sx) * 0.05;
    mouse.sy += (mouse.y - mouse.sy) * 0.05;
    const sy = window.scrollY || 0;

    if (home) {
      const p = Math.min(sy / window.innerHeight, 1.4);
      cam.position.set(mouse.sx * 1.4, (small ? 4.4 : 3.2) + p * 8 - mouse.sy * 0.8, (small ? 15 : 11.5) - p * 2);
      look.set(small ? 0 : 1.2, (small ? 2.6 : 0.9) - p * 2.4, -p * 2);
      if (car) car.position.x = car.userData.baseX + p * p * 26;
    } else {
      const travel = Math.min(sy * 0.004, 14);
      cam.position.set(mouse.sx * 1.6, 8.5 - mouse.sy * 0.8, 13 - travel);
      look.set(0, 0, -3 - travel);
    }
    cam.lookAt(look);

    movePulses(t * (1 + boost * 2));
    for (const s of eqs) {
      s.position.y = s.userData.y + Math.sin(t * s.userData.sp + s.userData.ph) * 0.5;
      s.position.x += dt * s.userData.sp * (reduce ? 0 : 0.35);
      if (s.position.x > 18) s.position.x = -18;
    }
    if (car) {
      if (!state.drag && !reduce) state.spin += dt * 0.22;
      car.rotation.y = state.spin + mouse.sx * 0.5;
      const w = dt * (5 + boost * 22) * (reduce ? 0 : 1);
      for (const wh of wheels) wh.rotation.z -= w;
    }
    renderer.render(scene, cam);
  }
  frame();
})();
