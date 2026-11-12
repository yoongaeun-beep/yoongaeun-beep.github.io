// 타임라인: 장면 구간, 단계별 시각, 손님 이동, 게이지, 효과음 이벤트
// 같은 시각이면 항상 같은 화면이 나오도록 모두 시간(초)으로 정해져 있습니다.
const SCENE = { hook: [0, 7], asis: [7, 25], stat: [25, 36], A: [36, 58], B: [58, 80], C: [80, 102], closing: [102, 113] };
const END = 113;

// 단계 하나(입구, 진열, 가격)의 시각표. i는 0에서 2
function stationTimes(i, hasWrong) {
  const s = 36 + 22 * i;
  return {
    start: s, think: s + 1, choice: s + 3,
    wrongAt: hasWrong ? s + 5 : null, wrongEnd: hasWrong ? s + 6.6 : null,
    pick: s + (hasWrong ? 7.4 : 6.2), resolve: s + 8.5, panel: s + 10.2, end: s + 22,
  };
}

function makePath(pts, t0, speed) {
  const kf = []; let t = t0, [px, py] = pts[0];
  kf.push({ t, x: px, y: py });
  if (pts[0][2]) { t += pts[0][2]; kf.push({ t, x: px, y: py }); }
  for (let i = 1; i < pts.length; i++) {
    const [x, y, w] = pts[i];
    t += Math.hypot(x - px, y - py) / speed; kf.push({ t, x, y });
    if (w) { t += w; kf.push({ t, x, y }); }
    px = x; py = y;
  }
  return kf;
}

function posAt(kf, t, hold) {
  if (t < kf[0].t) return null;
  const last = kf[kf.length - 1];
  if (t > last.t) return hold ? { x: last.x, y: last.y, walk: false } : null;
  for (let i = 0; i < kf.length - 1; i++) {
    const a = kf[i], b = kf[i + 1];
    if (t >= a.t && t <= b.t) {
      const u = b.t === a.t ? 1 : (t - a.t) / (b.t - a.t);
      return { x: a.x + (b.x - a.x) * u, y: a.y + (b.y - a.y) * u, walk: a.x !== b.x || a.y !== b.y };
    }
  }
  return null;
}

// 지금 매장(AS-IS)의 손님 4명. 시선이 흩어지지 않게 적게 둡니다
const ASIS = [
  { id: 'P', kf: makePath([[0.8, 13.4], [3.6, 12.2, 3.2], [5.5, 8.2], [10.5, 8.2, 5]], 8, 2.6), hold: true, look: 0, bubbles: [[9.5, 12.7, '?', '#d9a441'], [16.6, 21.6, '...', '#8a8176']] },
  { id: 'Q1', kf: makePath([[0.8, 14.8], [6.4, 15.5, 5.5], [0.8, 14.9]], 7, 2.4), hold: false, look: 1, bubbles: [[9, 14.4, '?', '#d9a441'], [14.4, 16.3, '!', '#cf5a43']] },
  { id: 'Q2', kf: makePath([[8, 11.9, 3], [11.5, 11.9, 3], [8, 11.9, 3], [11.5, 11.9]], 7, 1.6), hold: true, look: 2, bubbles: [[7, 22, '...', '#8a8176']] },
  { id: 'Q3', kf: makePath([[19, 4.1, 30]], 7, 2), hold: true, look: 3, bubbles: [[8, 23, '?', '#d9a441']] },
];

const PINS = [
  { id: 'A', x: 5.4, y: 14.2, z: 0, show: 9.8 },
  { id: 'B', x: 9.8, y: 10.7, z: 0, show: 14.2 },
  { id: 'C', x: 19, y: 4.1, z: 0, show: 18.4 },
];

const CLOSING = [0, 1, 2, 3, 4, 5].map((i) => ({
  id: 'F' + i, kf: makePath([[0.8, 14], [5, 13], [5, 8.2], [22.5, 8.2], [22.5, 3.6]], 102.3 + i * 1.4, 4.6), hold: false, look: i + 2, bubbles: [],
}));

function peopleAt(t, list) {
  const out = [];
  list.forEach((p) => {
    const pos = posAt(p.kf, t, p.hold);
    if (!pos) return;
    const look = Object.assign(personLook(p.look), { walk: pos.walk, size: 1.35 });
    out.push({ x: pos.x, y: pos.y, look, id: p.id, bubbles: p.bubbles });
  });
  return out;
}

// 탈출률 게이지는 숫자 없이 막대로만 보여 주는 연출 값(0에서 1)
function gaugeAt(t, st) {
  const g = [[0, 0.08], [24, 0.1], [st[0].resolve, 0.12], [st[0].resolve + 2, 0.3], [st[1].resolve, 0.32], [st[1].resolve + 2, 0.5], [st[2].resolve, 0.52], [st[2].resolve + 2, 0.7], [108, 0.92], [END, 0.92]];
  for (let i = 0; i < g.length - 1; i++) {
    if (t >= g[i][0] && t <= g[i + 1][0]) return g[i][1] + (g[i + 1][1] - g[i][1]) * (t - g[i][0]) / (g[i + 1][0] - g[i][0]);
  }
  return g[g.length - 1][1];
}

function buildSounds(st, useSynthDrums, narration) {
  const ev = [];
  if (narration) narration.lines.forEach(([t, text], idx) => ev.push({ t, type: 'voice', text, rate: narration.rate, idx }));
  if (useSynthDrums) {
    for (let n = 0, t = 25.5; t < 101; n++, t = 25.5 + n * 0.5) ev.push({ t, type: n % 2 === 0 ? 'kick' : 'snare' });
    ev.push({ t: 110.6, type: 'crash' });
  }
  st.forEach((s) => { ev.push({ t: s.resolve, type: 'ding' }); ev.push({ t: s.pick, type: 'key' }); });
  ev.push({ t: st[0].wrongAt, type: 'wrong' });
  [25.2, 36, 58, 80, 102].forEach((t) => ev.push({ t, type: 'swoosh' }));
  return ev.sort((a, b) => a.t - b.t);
}
