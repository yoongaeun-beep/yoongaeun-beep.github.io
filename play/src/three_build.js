// 3D 면세점: 바닥, 벽, 진열대, 계산대, 입구 광장, 간판과 단계별 변화(AS-IS와 TO-BE)
const W3 = { scene: null, fpvOnly: null, isoOnly: null, plates: {}, banners: [], wallBottles: null, bottleMeta: [], guide: [], clutter: null, price: {}, textures: [] };
const PAL = ['#e9c6c0', '#c9a0dc', '#8fb8de', '#f0d58c', '#b7d8b0', '#f1f1ee', '#d98fa0', '#e9a46a'];
const SEC = [
  { asis: 'BRAND A', tobe: '수분', sub: '세럼 크림 마스크', plate: '#4a7fb5', tint: '#8fb8de' },
  { asis: 'BRAND B', tobe: '진정', sub: '앰플 토너 패드', plate: '#4f9a7a', tint: '#b7d8b0' },
  { asis: 'BRAND C', tobe: '톤업', sub: '선케어 쿠션 베이스', plate: '#d98a3a', tint: '#e9a46a' },
  { asis: 'BRAND D', tobe: '선물', sub: '향수 세트 미니', plate: '#c76f9a', tint: '#d98fa0' },
];

function textTex(draw, w, h) {
  const c = document.createElement('canvas'); c.width = w; c.height = h; const x = c.getContext('2d'); draw(x, w, h);
  const t = new THREE.CanvasTexture(c); t.encoding = THREE.sRGBEncoding; t.anisotropy = 4; t.userData = { draw, w, h, c }; W3.textures.push(t); return t;
}

function redrawTextures() { W3.textures.forEach((t) => { t.userData.draw(t.userData.c.getContext('2d'), t.userData.w, t.userData.h); t.needsUpdate = true; }); }

function plane(w, h, tex, opts) {
  const mat = new THREE.MeshBasicMaterial({ map: tex, transparent: true, toneMapped: false, color: opts && opts.glow ? 0xffffff : 0xf0ece4 });
  return new THREE.Mesh(new THREE.PlaneGeometry(w, h), mat);
}

function addBox(parent, x, z, w, d, h, y0, color, o) {
  const m = mesh(new THREE.BoxGeometry(w, h, d), m3(color, o && o.rough !== undefined ? o.rough : 0.6, o && o.metal), x + w / 2, y0 + h / 2, z + d / 2);
  parent.add(m); return m;
}

function bottleBank(max) {
  const grp = new THREE.Group(), cyl = (r1, r2, h) => new THREE.CylinderGeometry(r1, r2, h, 14), box = (w, h, d) => new THREE.BoxGeometry(w, h, d);
  const kinds = [
    { body: cyl(0.052, 0.058, 1), cap: cyl(0.04, 0.04, 0.07), capY: 0.035, capHex: '#F7F4EE', hs: 1.0 },
    { body: box(0.1, 1, 0.065), cap: box(0.1, 0.05, 0.067), capY: 0.0, capHex: '#ffffff', hs: 0.85 },
    { body: cyl(0.085, 0.085, 1), cap: cyl(0.09, 0.09, 0.045), capY: 0.022, capHex: '#D9B15A', hs: 0.4 },
    { body: cyl(0.05, 0.055, 1), cap: box(0.07, 0.035, 0.03), capY: 0.1, capHex: '#F7F4EE', hs: 1.0 },
    { body: box(0.085, 1, 0.055), cap: cyl(0.022, 0.022, 0.07), capY: 0.035, capHex: '#D9B15A', hs: 0.7 },
  ];
  kinds.forEach((k) => {
    ['bodyM', 'capM'].forEach((key) => {
      const im = new THREE.InstancedMesh(key === 'bodyM' ? k.body : k.cap, new THREE.MeshStandardMaterial({ roughness: key === 'bodyM' ? 0.4 : 0.3, metalness: key === 'bodyM' ? 0.05 : 0.35 }), max);
      im.count = 0; im.instanceColor = new THREE.InstancedBufferAttribute(new Float32Array(max * 3), 3); im.castShadow = true; im.receiveShadow = true; k[key] = im; grp.add(im);
    });
  });
  grp.userData.add = (x, y, z, h, hex) => {
    const ki = Math.floor(rnd(Math.floor(x * 31 + z * 17 + y * 7) + 3) * 5) % 5, k = kinds[ki], hh = h * k.hs * 1.1, d = new THREE.Object3D();
    d.position.set(x, y + hh / 2, z); d.scale.set(1, hh, 1); d.updateMatrix();
    const id = k.bodyM.count++; k.bodyM.setMatrixAt(id, d.matrix); k.bodyM.setColorAt(id, new THREE.Color(hex));
    d.position.set(x, y + hh + k.capY, z); d.scale.set(1, 1, 1); d.updateMatrix(); const cid = k.capM.count++; k.capM.setMatrixAt(cid, d.matrix); k.capM.setColorAt(cid, new THREE.Color(k.capHex));
    return { k, id };
  };
  grp.userData.setColor = (ref, col) => { ref.k.bodyM.setColorAt(ref.id, col); ref.k.bodyM.instanceColor.needsUpdate = true; };
  return grp;
}

function rowAlong(bank, x, z, len, axis, y, seed) {
  const n = Math.floor(len / 0.17), out = [];
  for (let i = 0; i < n; i++) { const h = 0.2 + rnd(seed + i) * 0.14, hex = PAL[Math.floor(rnd(seed + i * 7) * 8)]; out.push({ ref: bank.userData.add(axis === 'x' ? x + i * 0.17 : x, y, axis === 'z' ? z + i * 0.17 : z, h, hex), hex, i }); }
  return out;
}

function buildFloorAndWalls(S, iso) {
  const tile = textTex((x, w, h) => { x.fillStyle = '#f7ecda'; x.fillRect(0, 0, w, h); x.fillStyle = '#efdcc2'; x.fillRect(0, 0, w / 2, h / 2); x.fillRect(w / 2, h / 2, w / 2, h / 2); const g = x.createLinearGradient(0, 0, w, h); g.addColorStop(0, 'rgba(255,255,255,0.35)'); g.addColorStop(1, 'rgba(0,0,0,0.05)'); x.fillStyle = g; x.fillRect(0, 0, w, h); }, 128, 128);
  tile.wrapS = tile.wrapT = THREE.RepeatWrapping; tile.repeat.set(16, 11);
  const fl = new THREE.Mesh(new THREE.PlaneGeometry(32, 22), new THREE.MeshStandardMaterial({ map: tile, roughness: 0.4, metalness: 0.05 }));
  fl.rotation.x = -Math.PI / 2; fl.position.set(10, 0, 9); fl.receiveShadow = true; S.add(fl);
  addBox(iso, -6, -2, 32.2, 22.2, 0.6, -0.62, '#8e8a80');
  const far = new THREE.Mesh(new THREE.PlaneGeometry(14, 22), new THREE.MeshStandardMaterial({ map: tile, roughness: 0.4, metalness: 0.05 })); far.rotation.x = -Math.PI / 2; far.position.set(-12, 0, 9); W3.fpvOnly.add(far);
  addBox(S, 0, -0.3, 26, 0.3, 4, 0, '#cfe6d6'); addBox(S, 0.02, 0.02, 25.8, 0.1, 2.7, 0.5, '#e9f5ec', { rough: 0.2 });
  const sh = new THREE.Shape(); sh.moveTo(0, 0); sh.lineTo(18, 0); sh.lineTo(18, 4); sh.lineTo(0, 4); sh.lineTo(0, 0);
  const hole = new THREE.Path(); hole.moveTo(11.8, 0); hole.lineTo(11.8, 2.4); hole.absarc(14, 2.4, 2.2, Math.PI, 0, true); hole.lineTo(16.2, 0); hole.lineTo(11.8, 0); sh.holes.push(hole);
  const wall = new THREE.Mesh(new THREE.ExtrudeGeometry(sh, { depth: 0.3, bevelEnabled: false }), m3('#f3e6d0', 0.7)); wall.rotation.y = -Math.PI / 2; wall.castShadow = true; wall.receiveShadow = true; S.add(wall);
  // 입구 뒤에서 들어오는 빛은 판 대신 바닥에 번지는 빛으로 표현합니다(문이 막혀 보이지 않게)
  const spill = new THREE.Mesh(new THREE.PlaneGeometry(5, 4.6), new THREE.MeshBasicMaterial({ color: 0xfff1cf, transparent: true, opacity: 0.4 })); spill.rotation.x = -Math.PI / 2; spill.position.set(-2.4, 0.02, 14); S.add(spill);
  const sign = plane(7, 0.9, textTex((x, w, h) => { x.fillStyle = '#2a2622'; x.fillRect(0, 0, w, h); x.fillStyle = '#ffe3a0'; x.font = '900 ' + h * 0.55 + 'px ' + FONT; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('COSMETICS & PERFUMES', w / 2, h / 2); }, 1400, 180), { glow: true });
  sign.rotation.y = -Math.PI / 2; sign.position.set(-0.32, 3.6, 14); S.add(sign);
}

function buildProps(S) {
  const bank = bottleBank(4000); S.add(bank);
  [[6, 6, 7.5, 1.3, 1], [6, 9.4, 7.5, 1.3, 9], [15, 6.6, 6.5, 1.3, 20]].forEach(([x, z, w, d, sd]) => {
    addBox(S, x, z, w, d, 1.0, 0, '#fffaf0'); addBox(S, x - 0.04, z - 0.04, w + 0.08, d + 0.08, 0.06, 1.0, '#d9d6cc');
    rowAlong(bank, x + 0.2, z + 0.25, w - 0.4, 'x', 1.06, sd); rowAlong(bank, x + 0.2, z + d - 0.4, w - 0.4, 'x', 1.06, sd + 40); addBox(S, x + w / 2 - 0.05, z + 0.1, d - 0.2 > 0 ? 0.1 : 0.1, d - 0.2, 0.6, 1.06, '#ffffff');
  });
  for (let i = 0; i < 5; i++) { addBox(S, 2.2 + i * 2, 0.15, 1.8, 0.9, 2.6, 0, '#4b3a2e'); rowAlong(bank, 2.35 + i * 2, 0.5, 1.5, 'x', 0.9, 100 + i); rowAlong(bank, 2.35 + i * 2, 0.5, 1.5, 'x', 1.8, 120 + i); }
  [17.5, 20.7].forEach((cx, i) => { addBox(S, cx, 1.2, 2.8, 1.5, 1.0, 0, '#e8e2d4'); addBox(S, cx - 0.05, 1.15, 2.9, 1.6, 0.08, 1.0, '#3a342d'); addBox(S, cx + 0.5, 1.4, 0.5, 0.4, 0.45, 1.08, '#222a33'); });
  const kb = mesh(new THREE.CylinderGeometry(1.5, 1.5, 0.5, 32), m3('#d9d5c9', 0.4), 17, 0.25, 12); S.add(kb); S.add(mesh(new THREE.CylinderGeometry(1.1, 1.1, 0.6, 32), m3('#f4f2ec', 0.3), 17, 0.8, 12));
  for (let i = 0; i < 8; i++) { const a = i / 8 * 6.283; bank.userData.add(17 + Math.cos(a) * 0.8, 1.1, 12 + Math.sin(a) * 0.8, 0.3 + (i % 3) * 0.1, PAL[i]); }
  addBox(S, 20.2, 11, 0.9, 0.7, 1.7, 0, '#2b3340'); addBox(S, 20.25, 11.0, 0.75, 0.05, 0.6, 1.0, '#7fd1c4');
  [[2, 17], [24.5, 9], [13, 16.5]].forEach(([px, pz]) => { S.add(mesh(new THREE.CylinderGeometry(0.35, 0.28, 0.5, 14), m3('#e9e2d3', 0.7), px, 0.25, pz)); ['#3f8f5f', '#58a96f', '#2f7a50'].forEach((c, j) => S.add(mesh(new THREE.SphereGeometry(0.3 + j * 0.05, 12, 10), m3(c, 0.8), px + (j - 1) * 0.15, 0.85 + j * 0.15, pz))); });
  [[3.5, 3.5], [3.5, 15.5], [23, 15]].forEach(([px, pz]) => addBox(S, px, pz, 0.8, 0.8, 4, 0, '#e9e6de'));
}

function buildWestShelf(S) {
  const bank = bottleBank(900); S.add(bank); W3.wallBottles = bank; W3.bottleMeta = [];
  SEC.forEach((s, si) => {
    const z0 = 1.4 + si * 2.4; addBox(S, 0.02, z0, 0.5, 2.3, 0.1, 0, '#efece4');
    for (let tier = 0; tier < 4; tier++) { const y = 0.3 + tier * 0.62; addBox(S, 0.02, z0, 0.5, 2.3, 0.04, y, '#d6d2c6'); rowAlong(bank, 0.28, z0 + 0.1, 2.1, 'z', y + 0.04, si * 100 + tier * 20).forEach((r) => W3.bottleMeta.push({ ref: r.ref, si, hex: r.hex, k: r.i })); }
    const asis = plane(2.3, 0.6, textTex((x, w, h) => { x.fillStyle = '#35302a'; x.fillRect(0, 0, w, h); x.fillStyle = '#d8d3c6'; x.font = '900 ' + h * 0.5 + 'px ' + FONT; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(s.asis, w / 2, h / 2); }, 460, 120));
    const tobe = plane(2.3, 0.6, textTex((x, w, h) => { x.fillStyle = s.plate; x.fillRect(0, 0, w, h); x.fillStyle = '#fff'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.font = '900 ' + h * 0.46 + 'px ' + TITLE; x.fillText(s.tobe, w / 2, h * 0.36); x.font = '700 ' + h * 0.2 + 'px ' + FONT; x.fillText(s.sub, w / 2, h * 0.78); }, 460, 120));
    asis.rotation.y = tobe.rotation.y = Math.PI / 2; asis.position.set(0.56, 2.9, z0 + 1.15); tobe.position.set(0.58, 2.9, z0 + 1.15); S.add(asis, tobe);
    W3.plates[si] = { asis, tobe };
  });
}

function buildAccents(S) {
  const em = (hex, o) => new THREE.MeshBasicMaterial({ color: hex, transparent: o !== undefined, opacity: o === undefined ? 1 : o, toneMapped: false });
  [[14.5, '#F0A0B4'], [17.2, '#6FD3BE'], [19.9, '#F4C95A'], [22.6, '#B79BE0']].forEach(([x, c], i) => { const pnl = new THREE.Mesh(new THREE.PlaneGeometry(2.0, 1.1), em(c)); pnl.position.set(x - 6.6 + 6.6 * 0, 3.4, 0.16); if (x > 14) { pnl.position.x = x - 12.2 + i * 0; } S.add(pnl); });
  [[6, 6, 7.5, 1.3], [6, 9.4, 7.5, 1.3], [15, 6.6, 6.5, 1.3]].forEach(([x, z, w, d]) => { const b = new THREE.Mesh(new THREE.BoxGeometry(w + 0.1, 0.05, 0.05), em('#F4A93A')); b.position.set(x + w / 2, 0.08, z + d + 0.03); S.add(b); const dc = new THREE.Mesh(new THREE.PlaneGeometry(w + 1.6, d + 1.6), em('#e7dcc4', 0.55)); dc.rotation.x = -Math.PI / 2; dc.position.set(x + w / 2, 0.01, z + d / 2); S.add(dc); });
  const rug = new THREE.Mesh(new THREE.CircleGeometry(2.6, 40), em('#6FD3BE', 0.35)); rug.rotation.x = -Math.PI / 2; rug.position.set(17, 0.012, 12); S.add(rug);
}

function buildConcourse(S) {
  const cols = ['#F0A0B4', '#8FD3C4', '#F4C95A', '#B79BE0', '#8FB8DE'];
  [-1.9, 19.9].forEach((z, side) => {
    for (let i = 0; i < 5; i++) {
      const x = -15 + i * 2.9, c = cols[(i + side) % 5], fy = side ? -1 : 1;
      const win = new THREE.Mesh(new THREE.PlaneGeometry(2.3, 2.3), new THREE.MeshBasicMaterial({ color: c, toneMapped: false })); win.position.set(x, 1.5, z - fy * 0.02); win.rotation.y = side ? Math.PI : 0; W3.fpvOnly.add(win);
      const bar = new THREE.Mesh(new THREE.PlaneGeometry(2.3, 0.4), new THREE.MeshBasicMaterial({ color: 0x2a2622 })); bar.position.set(x, 3.0, z - fy * 0.03); bar.rotation.y = side ? Math.PI : 0; W3.fpvOnly.add(bar);
      const fr = mesh(new THREE.BoxGeometry(2.5, 0.12, 0.2), m3('#f3ece0'), x, 0.06, z + fy * 0.12); W3.fpvOnly.add(fr);
      const plant = new THREE.Group(); plant.position.set(x + 1.45, 0, z + fy * 0.5); plant.add(mesh(new THREE.CylinderGeometry(0.28, 0.22, 0.5, 14), m3('#efe5d2'), 0, 0.25, 0)); ['#3f8f5f', '#58a96f'].forEach((pc, k) => plant.add(ball(0.3 + k * 0.05, pc, (k - 0.5) * 0.15, 0.85 + k * 0.2, 0, 1, 1.2, 1, 0.8))); W3.fpvOnly.add(plant);
    }
  });
  [-10, -6.5].forEach((x) => { W3.fpvOnly.add(mesh(new THREE.BoxGeometry(0.7, 0.45, 2.2), m3('#c9a27a'), x, 0.25, 6.4)); W3.fpvOnly.add(mesh(new THREE.BoxGeometry(0.7, 0.45, 2.2), m3('#c9a27a'), x, 0.25, 21 - 6.4 - 6)); });
  [-11, -7.5].forEach((x, i) => [7.2, 17.0].forEach((z) => { W3.fpvOnly.add(mesh(new THREE.CylinderGeometry(0.01, 0.01, 0.6, 6), m3('#6a5a4a'), x, 3.8, z)); const g = mesh(new THREE.SphereGeometry(0.26, 20, 14), new THREE.MeshStandardMaterial({ color: 0xfff1d6, emissive: 0xffd9a0, emissiveIntensity: 0.9 }), x, 3.4, z); g.castShadow = false; W3.fpvOnly.add(g); }));
  const rug = new THREE.Mesh(new THREE.PlaneGeometry(14, 3.2), new THREE.MeshBasicMaterial({ color: 0xf5dcc4, transparent: true, opacity: 0.55 })); rug.rotation.x = -Math.PI / 2; rug.position.set(-8, 0.014, 14); W3.fpvOnly.add(rug);
}

function buildDetails(S) {
  const glass = new THREE.MeshStandardMaterial({ color: 0xffffff, transparent: true, opacity: 0.55, roughness: 0.1 });
  [[8, 8.3], [12, 8.3], [18, 8.6], [18.5, 5], [5.5, 13], [10, 13.5]].forEach(([x, z]) => {
    S.add(mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.9, 6), m3('#6a5a4a'), x, 3.55, z));
    const g = mesh(new THREE.SphereGeometry(0.3, 24, 18), new THREE.MeshStandardMaterial({ color: 0xfff1d6, emissive: 0xffd9a0, emissiveIntensity: 0.9, roughness: 0.4 }), x, 3.0, z); g.castShadow = false; S.add(g);
    S.add(mesh(new THREE.CylinderGeometry(0.07, 0.09, 0.08, 14), m3('#d9b15a'), x, 3.32, z));
  });
  [[7.5, 6.65], [10.8, 10.05], [18, 7.25]].forEach(([x, z], i) => {
    [0, 1, 2].forEach((k) => addBox(S, x - 0.5 - k * 0.5, z - 0.3, 0.5 + k * 0.0, 0.6, 0.12 + k * 0.1, 1.06, k === 0 ? '#ffffff' : '#f3ece0'));
    for (let t = 0; t < 4; t++) { const d = mesh(new THREE.CylinderGeometry(0.11, 0.11, 0.02, 20), m3(['#F0A0B4', '#6FD3BE', '#F4C95A', '#B79BE0'][(t + i) % 4]), x + 0.5 + t * 0.3, 1.08, z - 0.1 + (t % 2) * 0.2); S.add(d); }
  });
  [[4.2, 9.4, 0.5], [7.6, 12.6, -0.4]].forEach(([x, z, ry]) => {
    const tex = textTex((c, w, h) => { c.fillStyle = '#F4A93A'; c.fillRect(0, 0, w, h); c.fillStyle = '#17120E'; c.font = '900 ' + h * 0.22 + 'px ' + TITLE; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('NEW', w / 2, h * 0.36); c.font = '900 ' + h * 0.12 + 'px ' + FONT; c.fillText('신상품 안내', w / 2, h * 0.68); }, 300, 400);
    const grp = new THREE.Group(); grp.position.set(x, 0, z); grp.rotation.y = ry;
    [-0.18, 0.18].forEach((tilt) => { const pl = plane(0.7, 0.95, tex); pl.position.set(0, 0.5, tilt > 0 ? 0.12 : -0.12); pl.rotation.x = tilt > 0 ? 0.18 : -0.18; if (tilt < 0) pl.rotation.y = Math.PI; grp.add(pl); });
    S.add(grp);
  });
  [[18.4, 1.7, '#F0A0B4'], [22.4, 1.9, '#6FD3BE'], [20.3, 4.4, '#F4C95A']].forEach(([x, z, c]) => { addBox(S, x, z, 0.28, 0.14, 0.34, c === '#F4C95A' ? 0 : 1.08, c); const h = new THREE.Mesh(new THREE.TorusGeometry(0.07, 0.01, 6, 14, Math.PI), m3('#ffffff')); h.position.set(x + 0.14, (c === '#F4C95A' ? 0 : 1.08) + 0.38, z + 0.07); S.add(h); });
  S.add(mesh(new THREE.BoxGeometry(2.6, 0.04, 0.5), m3('#6b5a4a'), 6.5, 0.42, 16.8)); S.add(mesh(new THREE.BoxGeometry(2.6, 0.5, 0.06), m3('#d9b15a'), 6.5, 0.7, 17.05));
}

function buildEntranceDecor(S) {
  const items = [['GIFT', '선물', '#F0A0B4', 12.2], ['TRY', '체험', '#6FD3BE', 13.3], ['BEST', '인기', '#F4C95A', 14.4], ['K-BEAUTY', 'K뷰티', '#B79BE0', 15.5]];
  items.forEach(([en, ko, col, z]) => {
    const tex = textTex((x, w, h) => { x.fillStyle = col; x.fillRect(0, 0, w, h); x.fillStyle = '#1a1510'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.font = '900 ' + h * (en.length > 5 ? 0.22 : 0.34) + 'px ' + FONT; x.fillText(en, w / 2, h * 0.36); x.font = '900 ' + h * 0.26 + 'px ' + FONT; x.fillText(ko, w / 2, h * 0.74); }, 400, 300);
    const grp = new THREE.Group(); grp.position.set(-3.6, 3.0, z);
    [-Math.PI / 2, Math.PI / 2].forEach((ry) => { const p = plane(1.0, 0.75, tex, { glow: true }); p.rotation.y = ry; p.position.x = ry < 0 ? -0.02 : 0.02; grp.add(p); });
    grp.add(mesh(new THREE.CylinderGeometry(0.01, 0.01, 1.2, 6), m3('#b9b4a6'), 0, 0.9, 0));
    S.add(grp); const line = mesh(new THREE.BoxGeometry(8, 0.01, 0.12), new THREE.MeshBasicMaterial({ color: col, transparent: true, opacity: 0 }), -4, 0.012, z); line.castShadow = false; S.add(line);
    W3.banners.push(grp); W3.guide.push(line);
  });
  const cl = new THREE.Group(); cl.position.set(-3.2, 0, 11.4);
  for (let i = 0; i < 8; i++) { const p = plane(0.24, 0.32, textTex((x, w, h) => { x.fillStyle = ['#d98fa0', '#8fb8de', '#f0d58c'][i % 3]; x.fillRect(0, 0, w, h); x.fillStyle = '#333'; for (let k = 0; k < 4; k++) x.fillRect(10, 20 + k * 22, w - 20 - (k % 2) * 20, 8); }, 80, 110)); p.rotation.y = -Math.PI / 2; p.position.set(-0.45, 0.6 + Math.floor(i / 3) * 0.45, -0.15 + (i % 3) * 0.28); cl.add(p); }
  cl.add(mesh(new THREE.BoxGeometry(0.8, 2.4, 0.8), m3('#ece9e1'), 0, 1.2, 0)); S.add(cl); W3.clutter = cl;
}

function buildPriceBoards(S) {
  const asis = plane(7, 2.0, textTex((x, w, h) => { x.fillStyle = '#1b232c'; x.fillRect(0, 0, w, h); x.fillStyle = '#fff'; x.font = '900 ' + h * 0.4 + 'px ' + FONT; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillText('₩ 00,000', w * 0.05, h * 0.42); x.fillStyle = '#8d96a0'; x.font = '700 ' + h * 0.09 + 'px ' + FONT; ['USD 00', 'CNY 00', 'JPY 00', 'EUR 00'].forEach((s, i) => x.fillText(s, w * 0.72, h * (0.2 + i * 0.16))); [['SALE', '#cf5a43', 0.08, 0.78], ['EVENT', '#e0b33a', 0.4, 0.66], ['특가', '#cf5a43', 0.62, 0.84]].forEach(([s, c, px, py]) => { x.save(); x.translate(w * px, h * py); x.rotate(-0.15); x.fillStyle = c; x.fillRect(0, 0, w * 0.15, h * 0.17); x.fillStyle = '#1a1510'; x.font = '900 ' + h * 0.1 + 'px ' + FONT; x.fillText(s, w * 0.012, h * 0.09); x.restore(); }); }, 1400, 400));
  const tobe = plane(7, 2.0, textTex((x, w, h) => { x.fillStyle = '#1b232c'; x.fillRect(0, 0, w, h); [['한눈에 환산가', '₩ 00,000', '#4a7fb5'], ['오늘의 혜택', '혜택 안내', '#d98a3a'], ['추천 이유', '고민별 추천', '#4f9a7a']].forEach(([a, b, c], i) => { const px = w * (0.03 + i * 0.322), pw = w * 0.3; x.fillStyle = '#f3f1ea'; x.fillRect(px, h * 0.1, pw, h * 0.8); x.fillStyle = c; x.fillRect(px, h * 0.1, pw, h * 0.26); x.fillStyle = '#fff'; x.font = '900 ' + h * 0.14 + 'px ' + FONT; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(a, px + pw / 2, h * 0.23); x.fillStyle = '#1a1510'; x.font = '900 ' + h * 0.16 + 'px ' + FONT; x.fillText(b, px + pw / 2, h * 0.62); }); }, 1400, 400));
  asis.position.set(20.5, 2.55, 0.15); tobe.position.set(20.5, 2.55, 0.17); S.add(asis, tobe); W3.price = { asis, tobe };
}
