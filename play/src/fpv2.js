// 1인칭 장면 단계 2(진열 선반)와 단계 3(가격 계산대)
function staffFront(ctx, x, z, label, body, hair) {
  const f = front(z), cx = f.X(x), by = f.Y(0), k = f.k;
  ctx.fillStyle = body || '#1f2a3a'; roundRect(ctx, cx - 0.32 * k, by - 1.75 * k, 0.64 * k, 0.9 * k, 0.12 * k); ctx.fill();
  ctx.fillRect(cx - 0.28 * k, by - 0.85 * k, 0.24 * k, 0.85 * k); ctx.fillRect(cx + 0.04 * k, by - 0.85 * k, 0.24 * k, 0.85 * k);
  ctx.fillStyle = '#e8c6a4'; ctx.beginPath(); ctx.arc(cx, by - 1.95 * k, 0.2 * k, 0, 6.283); ctx.fill();
  ctx.fillStyle = hair || '#2a2018'; ctx.beginPath(); ctx.arc(cx, by - 1.99 * k, 0.21 * k, Math.PI, 6.283); ctx.fill();
  if (label) { ctx.fillStyle = '#7fd1c4'; ctx.fillRect(cx - 0.2 * k, by - 1.6 * k, 0.22 * k, 0.1 * k); }
  if (label) { setFont(ctx, 0.2 * k, 700); ctx.fillStyle = '#fff'; ctx.textAlign = 'center'; ctx.fillText(label, cx, by - 1.3 * k); }
}

const SECTIONS = [
  { asis: 'BRAND A', tobe: '수분', sub: '세럼 크림 마스크', col: '#8fb8de', plate: '#4a7fb5' },
  { asis: 'BRAND B', tobe: '진정', sub: '앰플 토너 패드', col: '#b7d8b0', plate: '#4f9a7a' },
  { asis: 'BRAND C', tobe: '톤업', sub: '선케어 쿠션 베이스', col: '#e9a46a', plate: '#d98a3a' },
  { asis: 'BRAND D', tobe: '선물', sub: '향수 세트 미니', col: '#d98fa0', plate: '#c76f9a' },
];

function bayBottles(ctx, zb, mode, alpha) {
  const f = front(zb);
  SECTIONS.forEach((s, si) => {
    for (let tier = 0; tier < 4; tier++) {
      const y0 = 0.25 + tier * 0.72, n = 16;
      for (let i = 0; i < n; i++) {
        const seed = si * 100 + tier * 20 + i, x = -6.3 + si * 3.2 + 0.1 + i * 0.185, h = 0.34 + rnd(seed) * 0.22;
        const hex = mode === 'tobe' ? tone(s.col, 0.85 + rnd(seed + 5) * 0.3) : BOTTLES[Math.floor(rnd(seed + 9) * 8)];
        ctx.globalAlpha = alpha; ctx.fillStyle = hex; roundRect(ctx, f.X(x), f.Y(y0 + h), 0.14 * f.k, h * f.k, 0.03 * f.k); ctx.fill();
        ctx.fillStyle = 'rgba(255,255,255,0.55)'; ctx.fillRect(f.X(x) + 0.02 * f.k, f.Y(y0 + h * 0.6), 0.1 * f.k, 0.1 * f.k);
      }
    }
  });
  ctx.globalAlpha = 1;
}

function drawSceneB(ctx, t, p, walk) {
  FP.camZ = walk; const zb = 9.5;
  drawRoomShell(ctx, t, 16, '#d6d3cb');
  frect(ctx, -6.6, 6.6, 0, 3.9, zb, '#f1efe8', 0.05);
  for (let tier = 0; tier <= 4; tier++) frect(ctx, -6.5, 6.5, 0.2 + tier * 0.72, 0.25 + tier * 0.72, zb - 0.05, '#cfcbc0');
  bayBottles(ctx, zb, 'asis', 1 - p); bayBottles(ctx, zb, 'tobe', p);
  SECTIONS.forEach((s, si) => {
    const x0 = -6.3 + si * 3.2, xc = x0 + 1.55;
    ctx.globalAlpha = 1 - p; frect(ctx, x0, x0 + 3.1, 3.15, 3.7, zb, '#2f2b27', 0.05); ftext(ctx, s.asis, xc, 3.42, zb, 0.3, '#d8d3c6'); ctx.globalAlpha = 1;
    ctx.globalAlpha = p; const drop = (1 - ease(seg(p, si * 0.1, 0.6 + si * 0.1))) * 0.6;
    frect(ctx, x0, x0 + 3.1, 3.15 + drop, 3.7 + drop, zb, s.plate, 0.05); ftext(ctx, s.tobe, xc + 0.3, 3.5 + drop, zb, 0.34, '#fff'); ftext(ctx, s.sub, xc + 0.3, 3.27 + drop, zb, 0.16, 'rgba(255,255,255,0.9)');
    const f = front(zb); ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(f.X(x0 + 0.5), f.Y(3.42 + drop), 0.14 * f.k, 0, 6.283); ctx.fill();
    for (let tier = 0; tier < 4; tier++) frect(ctx, xc - 0.55, xc + 0.55, 0.05 + tier * 0.72 + 0.03, 0.17 + tier * 0.72, zb - 0.02, '#fff', 0.03);
    ctx.globalAlpha = 1;
  });
  staffFront(ctx, -5.2, 8.0, null, '#c76f9a', '#1a1a1a'); staffFront(ctx, 5.6, 8.4, '협력사원');
  cube3(ctx, -1.7, 1.7, 0, 1.0, 4.8, 6.0, '#f4f2ec');
  for (let i = 0; i < 9; i++) frect(ctx, -1.5 + i * 0.36, -1.3 + i * 0.36, 1.0, 1.0 + 0.3 + (i % 3) * 0.1, 4.8, BOTTLES[i % 8], 0.03);
  drawHands(ctx, t, { right: (c) => { c.fillStyle = '#f7f4ee'; roundRect(c, -34, -250, 68, 250, 10); c.fill(); c.fillStyle = '#d98fa0'; c.fillRect(-26, -290, 52, 44); }, left: null });
}

function drawSceneC(ctx, t, p, walk) {
  FP.camZ = walk; const zb = 7;
  drawRoomShell(ctx, t, 12, '#d6d3cb');
  frect(ctx, -6, 6, 0, 4.2, zb, '#efece4', 0.05); frect(ctx, -3.4, 3.4, 1.55, 3.6, zb - 0.1, '#1b232c', 0.1);
  ctx.globalAlpha = 1 - p; priceBoardAsIs(ctx, zb - 0.1); ctx.globalAlpha = 1;
  ctx.globalAlpha = p; priceBoardToBe(ctx, zb - 0.1, p); ctx.globalAlpha = 1;
  staffFront(ctx, 2.6, 5.2, '협력사원'); staffFront(ctx, -5.0, 9, null, '#4a7fb5', '#5a3a24');
  cube3(ctx, -3.8, 3.8, 0, 1.05, 3.4, 4.6, '#e8e2d4'); cube3(ctx, -3.9, 3.9, 1.05, 1.13, 3.35, 4.7, '#3a342d');
  cube3(ctx, -1.2, -0.5, 1.13, 1.45, 3.7, 4.1, '#222a33'); cube3(ctx, 1.4, 2.4, 1.13, 1.6, 3.8, 4.2, '#d9a441');
  if (p > 0) { ctx.globalAlpha = p; frect(ctx, -3.8, -1.7, 1.2, 1.9, 3.35, '#fff', 0.05); ftext(ctx, '톡 카드', -2.75, 1.55, 3.35, 0.24, '#1a1510'); ctx.globalAlpha = 1; }
  const phoneDrop = ease(seg(p, 0, 0.7)) * 330;
  drawHands(ctx, t, {
    right: (c) => { c.fillStyle = '#f7f4ee'; roundRect(c, -34, -250, 68, 250, 10); c.fill(); c.fillStyle = '#c76f9a'; c.fillRect(-26, -290, 52, 44); },
    left: (c) => { c.save(); c.translate(0, phoneDrop); c.fillStyle = '#16191f'; roundRect(c, -60, -300, 120, 230, 16); c.fill(); c.fillStyle = '#243447'; roundRect(c, -52, -288, 104, 206, 8); c.fill();
      setFontRaw(c, 18); c.fillStyle = '#9ad7ff'; c.textAlign = 'center'; c.scale(-1, 1); c.fillText('환율 계산', 0, -230); c.fillText('중...', 0, -204); c.restore(); },
  });
}

function priceBoardAsIs(ctx, z) {
  ftext(ctx, '₩ ○○,○○○', -1.6, 3.0, z, 0.62, '#fff');
  ['USD ○○', 'CNY ○○', 'JPY ○○', 'EUR ○○'].forEach((s, i) => ftext(ctx, s, 1.9, 3.1 - i * 0.28, z, 0.2, '#8d96a0'));
  const f = front(z);
  [['SALE', '#cf5a43', -2.9, 2.4, -0.2], ['EVENT', '#e0b33a', 0.4, 2.1, 0.15], ['특가', '#cf5a43', 2.3, 1.85, -0.1]].forEach(([s, col, x, y, r]) => {
    ctx.save(); ctx.translate(f.X(x), f.Y(y)); ctx.rotate(r); ctx.fillStyle = col; roundRect(ctx, -0.55 * f.k, -0.2 * f.k, 1.1 * f.k, 0.4 * f.k, 0.06 * f.k); ctx.fill();
    setFont(ctx, 0.24 * f.k, 700); ctx.fillStyle = '#1a1510'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(s, 0, 0); ctx.restore();
  });
}

function priceBoardToBe(ctx, z, p) {
  [['한눈에 환산가', '₩ ○○,○○○', '#4a7fb5'], ['오늘의 혜택', '혜택 안내', '#d98a3a'], ['추천 이유', '고민별 추천', '#4f9a7a']].forEach(([h, b, col], i) => {
    const x0 = -3.25 + i * 2.18, drop = (1 - ease(seg(p, i * 0.12, 0.6 + i * 0.12))) * 0.5;
    frect(ctx, x0, x0 + 2.0, 1.65 - drop, 3.5 - drop, z, '#f3f1ea', 0.08); frect(ctx, x0, x0 + 2.0, 3.0 - drop, 3.5 - drop, z, col, 0.08);
    ftext(ctx, h, x0 + 1.0, 3.25 - drop, z, 0.26, '#fff'); ftext(ctx, b, x0 + 1.0, 2.3 - drop, z, 0.3, '#1a1510');
  });
}
