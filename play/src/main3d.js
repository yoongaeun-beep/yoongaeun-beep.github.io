// 3D 장면 조립: 조명, 카메라(타이쿤 시점과 1인칭), 사람 움직임, 단계별 변화
const R3 = { ok: false, people: {}, npcs: [], state: { a: 0, b: 0, c: 0 }, lastP: -1 };
const FPV3 = [
  { pos: [-12.5, 1.62, 14.0], to: [6, 1.5, 14.0], dolly: [0.3, 0, 0] },
  { pos: [9.2, 1.6, 8.3], to: [0, 1.5, 6.0], dolly: [-0.25, 0, 0] },
  { pos: [20.6, 1.55, 5.3], to: [20.5, 2.3, 0], dolly: [0, 0, -0.2] },
];

function initThree() {
  if (typeof THREE === 'undefined') return false;
  try {
    const cv = document.getElementById('gl');
    const r = new THREE.WebGLRenderer({ canvas: cv, antialias: true, preserveDrawingBuffer: true });
    r.setSize(1920, 1080, false); r.shadowMap.enabled = true; r.shadowMap.type = THREE.PCFSoftShadowMap; r.outputEncoding = THREE.sRGBEncoding;
    r.toneMapping = THREE.ACESFilmicToneMapping; r.toneMappingExposure = 0.9;
    const scene = new THREE.Scene(); scene.background = new THREE.Color(0x201812);
    const pm = new THREE.PMREMGenerator(r), env = new THREE.Scene();
    env.add(new THREE.Mesh(new THREE.SphereGeometry(40, 32, 16), new THREE.MeshBasicMaterial({ color: 0x6e6254, side: THREE.BackSide })));
    [[0, 30, 0, 30, 30], [30, 10, 0, 6, 30], [-30, 10, 8, 6, 30], [0, 8, -30, 30, 10]].forEach(([x, y, z, w, h], i) => { const pl = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ color: i === 0 ? 0xcfc6b6 : 0xa89c8a, side: THREE.DoubleSide })); pl.position.set(x, y, z); pl.lookAt(0, 0, 0); env.add(pl); });
    scene.environment = pm.fromScene(env, 0.03).texture;
    W3.scene = scene; W3.fpvOnly = new THREE.Group(); W3.isoOnly = new THREE.Group(); scene.add(W3.fpvOnly, W3.isoOnly);
    buildFloorAndWalls(scene, W3.isoOnly); buildProps(scene); buildWestShelf(scene); buildEntranceDecor(scene); buildPriceBoards(scene); buildAccents(scene); buildDetails(scene); buildConcourse(scene); buildLights(scene); buildCeiling();
    R3.renderer = r; R3.persp = new THREE.PerspectiveCamera(64, 16 / 9, 0.1, 120);
    R3.ortho = new THREE.OrthographicCamera(-21, 21, 11.8, -11.8, 0.1, 200);
    buildNpcs(); scene.traverse((o) => { if (o.isInstancedMesh) { o.instanceMatrix.needsUpdate = true; o.instanceColor.needsUpdate = true; } }); recolorShelf(0); scene.traverse((o) => { if (o.material && o.material.isMeshStandardMaterial) o.material.envMapIntensity = 0.3; }); R3.ok = true;
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(redrawTextures);
  } catch (e) { R3.ok = false; console.warn('3D 시작 실패', e); }
  return R3.ok;
}

function buildLights(S) {
  const hm = new THREE.HemisphereLight(0xfff3e0, 0x8a7a68, 0.35); S.add(hm);
  const d = new THREE.DirectionalLight(0xfff0d8, 0.7); d.position.set(26, 34, 10); d.castShadow = true; d.shadow.mapSize.set(2048, 2048);
  Object.assign(d.shadow.camera, { left: -26, right: 26, top: 26, bottom: -26, near: 1, far: 90 }); d.shadow.bias = -0.0006; W3.dir = d; W3.hemi = hm; S.add(d);
  [[5, 14], [11, 8], [17, 13], [-4, 14], [3, 14]].forEach(([x, z]) => { const p = new THREE.PointLight(0xffd9a0, 0.3, 12, 1.8); p.position.set(x, 3.4, z); S.add(p); });
}

function buildCeiling() {
  const ceil = new THREE.Mesh(new THREE.PlaneGeometry(44, 22), new THREE.MeshStandardMaterial({ color: 0xf3e9d6, roughness: 0.9 })); ceil.rotation.x = Math.PI / 2; ceil.position.set(4, 4.1, 9); W3.fpvOnly.add(ceil);
  for (let x = -14; x < 26; x += 3) for (let z = 3; z < 18; z += 5) { const l = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.04, 0.35), new THREE.MeshBasicMaterial({ color: 0xfff1cf })); l.position.set(x, 4.05, z); W3.fpvOnly.add(l); }
  [-2, 20].forEach((z) => { const w = new THREE.Mesh(new THREE.BoxGeometry(18, 4.2, 0.2), m3('#e8dcc6')); w.position.set(-9, 2.1, z); W3.fpvOnly.add(w); });
  const east = new THREE.Mesh(new THREE.BoxGeometry(0.2, 4.2, 22), m3('#e8dcc6')); east.position.set(26.1, 2.1, 9); W3.fpvOnly.add(east);
  const south = new THREE.Mesh(new THREE.BoxGeometry(26, 4.2, 0.2), m3('#f0e4cf')); south.position.set(13, 2.1, 18.1); W3.fpvOnly.add(south);
}

function buildNpcs() {
  W3.npcs = [];
  const mk = (i, x, z, ry, staff, axis, amp, w) => { const g = makePerson3(CHAR_LOOKS[staff ? 7 : i % 7]); g.position.set(x, 0, z); g.rotation.y = ry; g.userData.seed = i * 1.3; W3.fpvOnly.add(g); W3.npcs.push({ g, bx: x, bz: z, axis, amp: amp || 0, w: w || 0.5, ph: i * 1.7, ry }); return g; };
  mk(2, -3.4, 10.6, -1.4, false, 'x', 2.2, 0.45); mk(4, -4.5, 17.0, -1.6, false, 'x', 2.6, 0.38); mk(5, -7.0, 9.4, -1.2, false, 'z', 1.6, 0.5);
  mk(3, 3.6, 3.4, 1.2, false, 'z', 1.8, 0.45); mk(6, 3.4, 10.8, 1.6, false, 'z', 1.4, 0.55); mk(0, 3.0, 8.6, 1.57, true);
  mk(0, 19.2, 0.8, 0, true); mk(2, 17.4, 3.4, 0.3, false, 'x', 1.8, 0.5); mk(4, 24.0, 3.6, -0.3, false, 'z', 0.9, 0.6);
}

function updateNpcs(t) {
  (W3.npcs || []).forEach((n) => {
    if (!n.amp) { animatePerson3(n.g, t, false); return; }
    const a = t * n.w + n.ph, off = Math.sin(a) * n.amp, v = Math.cos(a) * n.amp * n.w;
    if (n.axis === 'x') { n.g.position.x = n.bx + off; n.g.position.z = n.bz; n.g.rotation.y = v >= 0 ? Math.PI / 2 : -Math.PI / 2; }
    else { n.g.position.z = n.bz + off; n.g.position.x = n.bx; n.g.rotation.y = v >= 0 ? 0 : Math.PI; }
    animatePerson3(n.g, t, true);
  });
}

function applyState(t, ST) {
  const e = (T) => ease(seg(t, T.resolve, T.resolve + 2));
  R3.state = { a: e(ST[0]), b: e(ST[1]), c: e(ST[2]) };
  const s = R3.state;
  W3.banners.forEach((g, i) => { const u = ease(seg(s.a, i * 0.12, 0.6 + i * 0.12)); g.position.y = 3.0 + (1 - u) * 2.2; g.visible = s.a > 0.001; });
  W3.guide.forEach((l) => { l.material.opacity = s.a * 0.9; });
  W3.clutter.traverse((o) => { if (o.material) { o.material.opacity = 1 - s.a; o.material.transparent = true; o.visible = s.a < 0.98; } });
  SEC.forEach((_, si) => { W3.plates[si].asis.material.opacity = 1 - s.b; W3.plates[si].tobe.material.opacity = s.b; W3.plates[si].asis.visible = s.b < 0.98; });
  W3.price.asis.material.opacity = 1 - s.c; W3.price.tobe.material.opacity = s.c; W3.price.asis.visible = s.c < 0.98;
  if (Math.abs(s.b - R3.lastP) > 0.004) { R3.lastP = s.b; recolorShelf(s.b); }
}

function recolorShelf(p) {
  const bank = W3.wallBottles, col = new THREE.Color(), tint = new THREE.Color();
  W3.bottleMeta.forEach((m) => { col.set(m.hex); tint.set(SEC[m.si].tint).multiplyScalar(0.85 + rnd(m.k * 3 + m.si) * 0.3); col.lerp(tint, p); bank.userData.setColor(m.ref, col); });
}

function updatePeople(t, list) {
  const seen = {};
  peopleAt(t, list).forEach((p) => {
    seen[p.id] = true; let g = R3.people[p.id];
    if (!g) { g = makePerson3(CHAR_LOOKS[Math.round(p.look.seed / 1.7) % 7]); g.userData.prev = [p.x, p.y]; g.userData.seed = p.look.seed; W3.scene.add(g); R3.people[p.id] = g; }
    const dx = p.x - g.userData.prev[0], dz = p.y - g.userData.prev[1];
    if (dx * dx + dz * dz > 1e-6) g.rotation.y = Math.atan2(dx, dz);
    g.scale.setScalar(1.3); g.position.x = p.x; g.position.z = p.y; g.userData.prev = [p.x, p.y]; g.visible = true; animatePerson3(g, t, p.walk);
    g.userData.bubbles = p.bubbles;
  });
  Object.keys(R3.people).forEach((id) => { if (!seen[id]) R3.people[id].visible = false; });
}

function toScreen(v3, cam) { const v = v3.clone().project(cam); return [(v.x * 0.5 + 0.5) * 1920, (-v.y * 0.5 + 0.5) * 1080]; }

function setIso(zoom, tx, tz) {
  const c = R3.ortho, tgt = new THREE.Vector3(tx === undefined ? 10.5 : tx, 0.6, tz === undefined ? 9 : tz);
  c.zoom = zoom; c.position.set(tgt.x + 34, 30, tgt.z + 34); c.lookAt(tgt); c.updateProjectionMatrix(); c.updateMatrixWorld();
  W3.fpvOnly.visible = false; W3.isoOnly.visible = true; W3.dir.intensity = 0.7; W3.hemi.intensity = 0.35; return c;
}

function setFpv(i, t, T) {
  const f = FPV3[i], u = ease(seg(t, T.start, T.end)), c = R3.persp, sway = Math.sin(t * 1.3) * 0.03;
  c.position.set(f.pos[0] + f.dolly[0] * u * 4, f.pos[1] + Math.sin(t * 3.3) * 0.012, f.pos[2] + f.dolly[2] * u * 4 + sway); c.lookAt(f.to[0], f.to[1], f.to[2] + sway * 2);
  c.updateMatrixWorld(); W3.fpvOnly.visible = true; W3.isoOnly.visible = false; W3.dir.intensity = i === 2 ? 0.12 : 0.3; W3.hemi.intensity = i === 2 ? 0.35 : 0.42; return c;
}

function renderGL(cam) { R3.renderer.render(W3.scene, cam); }
