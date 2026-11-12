// 면세점 한 층의 아이소메트릭 모형: 가구 배치, 손님 경로, 장면 그리기
// 실제 평면도를 복제하지 않고 공개 기사에서 확인된 구성(입구, 향수와 화장품, K뷰티 체험, 주류, 계산대)만 옮겼습니다.
const SW = 26, SD = 18, WALL = 4;
const BOTTLES = ['#e9c6c0', '#c9a0dc', '#8fb8de', '#f0d58c', '#b7d8b0', '#f1f1ee', '#d98fa0', '#e9a46a'];
const SHIRTS = ['#d85a4a', '#4a7fb5', '#e0b33a', '#6aa889', '#8e6bb0', '#e8e2d4', '#c76f9a'];
const DOOR = [0.8, 14];
let staticObjs = null;

function rnd(i) { const v = Math.sin(i * 127.1 + 311.7) * 43758.5453; return v - Math.floor(v); }

function bottleRow(ctx, x, y, z, len, axis, seed) {
  const n = Math.floor(len / 0.42);
  for (let i = 0; i < n; i++) {
    const c = BOTTLES[Math.floor(rnd(seed + i) * BOTTLES.length)], h = 0.28 + rnd(seed + i * 3) * 0.3;
    if (axis === 'x') box(ctx, x + i * 0.42 + 0.06, y, z, 0.26, 0.26, h, c); else box(ctx, x, y + i * 0.42 + 0.06, z, 0.26, 0.26, h, c);
  }
}

function island(x, y, w, d, seed, glowCol) {
  return { depth: x + w / 2 + y + d / 2, draw(ctx, st) {
    poly(ctx, [P(x + 0.3, y + 0.3, 0), P(x + w + 0.7, y + 0.3, 0), P(x + w + 0.7, y + d + 0.7, 0), P(x + 0.3, y + d + 0.7, 0)], 'rgba(60,45,30,0.16)');
    box(ctx, x, y, 0, w, d, 1.0, '#f4f2ec'); box(ctx, x - 0.05, y - 0.05, 1.0, w + 0.1, d + 0.1, 0.08, '#d9d6cc');
    bottleRow(ctx, x + 0.1, y + 0.12, 1.08, w - 0.2, 'x', seed); bottleRow(ctx, x + 0.1, y + d - 0.4, 1.08, w - 0.2, 'x', seed + 50);
    box(ctx, x + w / 2 - 0.08, y + 0.1, 1.08, 0.16, d - 0.2, 0.7, '#ffffff');
    if (st.toBe > 0 && glowCol) { ctx.globalAlpha = st.toBe; box(ctx, x, y + d, 0.62, w, 0.06, 0.14, glowCol); ctx.globalAlpha = 1; }
  } };
}

function buildStatic() {
  const o = [];
  o.push(island(6, 6, 7.5, 1.3, 1, '#5fb3a1'), island(6, 9.4, 7.5, 1.3, 9, '#5fb3a1'), island(15, 6.6, 6.5, 1.3, 20, '#5fb3a1'));
  // 벽면 장식장과 주류 구역
  for (let i = 0; i < 5; i++) o.push({ depth: 3 + i * 2 + 1.2, draw(ctx) { box(ctx, 2.2 + i * 2, 0.15, 0, 1.8, 0.9, 2.6, '#4b3a2e'); bottleRow(ctx, 2.35 + i * 2, 0.3, 0.9, 1.5, 'x', 100 + i); bottleRow(ctx, 2.35 + i * 2, 0.3, 1.8, 1.5, 'x', 120 + i); } });
  for (let j = 0; j < 4; j++) o.push({ depth: 0.9 + 3 + j * 2.4, draw(ctx) { box(ctx, 0.15, 1.5 + j * 2.6, 0, 0.9, 2.2, 2.4, '#efece4'); bottleRow(ctx, 0.28, 1.6 + j * 2.6, 0.9, 2, 'y', 200 + j); bottleRow(ctx, 0.28, 1.6 + j * 2.6, 1.7, 2, 'y', 230 + j); } });
  // 계산대
  [17.5, 20.7].forEach((cx, i) => o.push({ depth: cx + 1.4 + 1.95, draw(ctx, st) {
    box(ctx, cx, 1.2, 0, 2.8, 1.5, 1.0, '#e8e2d4'); box(ctx, cx - 0.05, 1.15, 1.0, 2.9, 1.6, 0.08, '#3a342d');
    box(ctx, cx + 0.5, 1.4, 1.08, 0.5, 0.4, 0.45, '#222a33'); box(ctx, cx + 1.7, 1.5, 1.08, 0.5, 0.3, 0.3, '#2c3b4a');
    if (st.toBe > 0) { ctx.globalAlpha = st.toBe; box(ctx, cx + 0.1, 2.7, 0.55, 2.6, 0.06, 0.22, '#d9a441'); ctx.globalAlpha = 1; }
  } }));
  o.push({ depth: 16.85 + 4.85, draw(ctx) { box(ctx, 16.6, 4.6, 0, 0.5, 0.5, 1.9, '#2b2723'); box(ctx, 16.4, 4.45, 1.9, 0.9, 0.9, 0.5, '#d9a441'); } });
  // K뷰티 체험존: 둥근 진열대와 AI 피부 분석 단말
  o.push({ depth: 17 + 12, draw(ctx) { cyl(ctx, 17, 12, 0, 1.6, 0.5, '#d9d5c9'); cyl(ctx, 17, 12, 0.5, 1.2, 0.6, '#f4f2ec'); for (let i = 0; i < 8; i++) { const a = i / 8 * 6.283; box(ctx, 17 + Math.cos(a) * 0.8 - 0.1, 12 + Math.sin(a) * 0.8 - 0.1, 1.1, 0.2, 0.2, 0.34 + (i % 3) * 0.1, BOTTLES[i]); } } });
  o.push({ depth: 20.65 + 11.35, draw(ctx) { box(ctx, 20.2, 11, 0, 0.9, 0.7, 1.7, '#2b3340'); box(ctx, 20.3, 11.05, 1.0, 0.7, 0.05, 0.6, '#7fd1c4'); } });
  // 화분과 의자
  [[2, 17], [24.5, 9], [13, 16.5]].forEach(([px, py], i) => o.push({ depth: px + py + 0.4, draw(ctx) { box(ctx, px, py, 0, 0.7, 0.7, 0.5, '#e9e2d3'); const c = P(px + 0.35, py + 0.35, 0.5), k = cam.s * 36; ['#3f8f5f', '#58a96f', '#2f7a50'].forEach((col, j) => { ctx.fillStyle = col; ctx.beginPath(); ctx.ellipse(c[0] + (j - 1) * 10 * cam.s, c[1] - (16 + j * 5) * cam.s, 11 * cam.s, 20 * cam.s, (j - 1) * 0.5, 0, 6.283); ctx.fill(); }); } }));
  o.push({ depth: 11 + 17.4, draw(ctx) { box(ctx, 9, 16.6, 0, 4.5, 0.9, 0.55, '#c9a27a'); box(ctx, 9, 16.6, 0.55, 4.5, 0.9, 0.12, '#6b5a4a'); } });
  // 기둥
  [[3.5, 3.5], [3.5, 15.5], [23, 15]].forEach(([px, py]) => o.push({ depth: px + py + 1, draw(ctx) { box(ctx, px, py, 0, 0.8, 0.8, WALL, '#e9e6de'); } }));
  return o;
}

function drawFloor(ctx) {
  const c = [P(0, 0, 0), P(SW, 0, 0), P(SW, SD, 0), P(0, SD, 0)], b = [P(0, SD, -0.5), P(SW, SD, -0.5), P(SW, 0, -0.5)];
  poly(ctx, [c[3], c[2], b[1], b[0]], '#8e8a80'); poly(ctx, [c[2], c[1], b[2], b[1]], '#6f6b62');
  const g = ctx.createLinearGradient(c[3][0], c[0][1], c[1][0], c[2][1]);
  g.addColorStop(0, '#e9e7e0'); g.addColorStop(0.5, '#d6d5cf'); g.addColorStop(1, '#c4c4bf');
  poly(ctx, c, g);
  ctx.strokeStyle = 'rgba(120,120,115,0.28)'; ctx.lineWidth = 1;
  for (let x = 0; x <= SW; x += 2) { const a = P(x, 0, 0), e = P(x, SD, 0); ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(e[0], e[1]); ctx.stroke(); }
  for (let y = 0; y <= SD; y += 2) { const a = P(0, y, 0), e = P(SW, y, 0); ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(e[0], e[1]); ctx.stroke(); }
  [[6, 14, 4.2], [12, 9, 4], [19, 5.5, 4.2], [17, 13, 3.2]].forEach(([lx, ly, r]) => { const c = P(lx, ly, 0), rx = r * 32 * 1.414 * cam.s, g2 = ctx.createRadialGradient(c[0], c[1], 4, c[0], c[1], rx); g2.addColorStop(0, 'rgba(255,225,160,0.38)'); g2.addColorStop(1, 'rgba(255,225,160,0)'); ctx.fillStyle = g2; ctx.beginPath(); ctx.ellipse(c[0], c[1], rx, rx / 2, 0, 0, 6.283); ctx.fill(); });
}

function drawWalls(ctx, st) {
  poly(ctx, [P(0, 0, 0), P(SW, 0, 0), P(SW, 0, WALL), P(0, 0, WALL)], '#ece9e1');
  poly(ctx, [P(0, 0, 0.4), P(SW, 0, 0.4), P(SW, 0, 3.2), P(0, 0, 3.2)], 'rgba(190,214,196,0.55)');
  for (let x = 0; x < SW; x += 0.5) { const a = P(x, 0, 0.4), e = P(x, 0, 3.2); ctx.strokeStyle = 'rgba(255,255,255,0.35)'; ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(e[0], e[1]); ctx.stroke(); }
  poly(ctx, [P(0, 0, 0), P(0, SD, 0), P(0, SD, WALL), P(0, 0, WALL)], '#dedbd2');
  poly(ctx, [P(0, 0, 0.4), P(0, 11.5, 0.4), P(0, 11.5, 3.2), P(0, 0, 3.2)], 'rgba(190,214,196,0.45)');
  poly(ctx, [P(0, 11.6, 0), P(0, 16.4, 0), P(0, 16.4, 3.4), P(0, 11.6, 3.4)], '#fff3cf');
  const g = ctx.createLinearGradient(P(0, 14, 0)[0], P(0, 14, 0)[1], P(0, 14, 3)[0], P(0, 14, 3)[1]);
  g.addColorStop(0, 'rgba(255,230,160,0.9)'); g.addColorStop(1, 'rgba(255,255,255,0.4)'); poly(ctx, [P(0, 11.8, 0), P(0, 16.2, 0), P(0, 16.2, 3.2), P(0, 11.8, 3.2)], g);
  box(ctx, -0.1, 11.4, 3.4, 0.25, 5.2, 0.5, '#d9a441');
  box(ctx, 8, -0.05, 3.0, 11, 0.2, 0.9, '#2a2723');
  isoText(ctx, 'COSMETICS & PERFUMES', 8.6, 0.2, 3.25, 'y', 0.5, '#ffe3a0');
  isoText(ctx, 'DUTY FREE', 20.2, 0.2, 3.3, 'y', 0.5, '#d9a441');
  isoText(ctx, '입구', 0.3, 15.6, 2.6, 'x', 0.45, '#8a6a22');
  isoText(ctx, '계산대', 18.6, 0.2, 2.2, 'y', 0.42, '#6a655b');
  if (st.toBe > 0) drawEntranceSigns(ctx, st);
}

function drawEntranceSigns(ctx, st) {
  ctx.globalAlpha = st.toBe;
  [['GIFT', '#d98fa0'], ['TRY', '#7fd1c4'], ['BEST', '#e0b33a'], ['K-BEAUTY', '#8e6bb0']].forEach(([txt, col], i) => {
    box(ctx, 2.2, 11.9 + i * 1.1, 3.1, 0.12, 0.95, 0.5, col);
    isoText(ctx, txt, 2.35, 11.9 + i * 1.1 + 0.85, 3.2, 'x', 0.2, '#1a1510', 'left');
  });
  ctx.globalAlpha = 1;
}

function drawStoreScene(ctx, t, st, people) {
  if (!staticObjs) staticObjs = buildStatic();
  drawFloor(ctx); drawWalls(ctx, st);
  const items = staticObjs.map((o) => ({ depth: o.depth, fn: () => o.draw(ctx, st) }));
  people.forEach((p) => items.push({ depth: p.x + p.y + 0.5, fn: () => { p.screen = person(ctx, t, p.x, p.y, p.look); } }));
  items.sort((a, b) => a.depth - b.depth).forEach((it) => it.fn());
}

function personLook(i) {
  const looks = [
    { shirt: SHIRTS[0], hair: '#2b2118', pants: '#2c2f3a', acc: 'bag', accColor: '#e0b33a' },
    { shirt: SHIRTS[1], hair: '#a2742f', pants: '#37404f', acc: 'case', hairLong: true },
    { shirt: SHIRTS[2], hair: '#1d1a17', pants: '#3a3a3a', acc: 'pack', hat: '#c8553d' },
    { shirt: SHIRTS[4], hair: '#5a3a24', pants: '#2c2f3a', acc: 'bag', hairLong: true },
    { shirt: SHIRTS[5], hair: '#222', pants: '#4a5a6a' },
    { shirt: SHIRTS[3], hair: '#7b4a2a', pants: '#2c2f3a', acc: 'case' },
    { shirt: SHIRTS[6], hair: '#1a1a1a', pants: '#333', acc: 'bag', hairLong: true },
  ];
  const l = Object.assign({}, looks[i % looks.length]); l.seed = i * 1.7; return l;
}
