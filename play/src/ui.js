// 화면 요소 1: 첫 숫자 장면, AS-IS 핀과 말풍선, 신규 캐릭터 카드, 마무리, 게이지
function drawHook(ctx, t, c) {
  const h = c.hook, a = fade(t, 0.3, 1, 6.3, 7);
  const x0 = 360, x1 = 1560, y0 = 480, p = ease(seg(t, 0.9, 4.4));
  ctx.globalAlpha = a; ctx.lineWidth = 10; ctx.lineCap = 'round';
  [[300, COL.amber], [660, COL.teal]].forEach(([yEnd, color]) => {
    ctx.strokeStyle = color; ctx.beginPath(); ctx.moveTo(x0, y0);
    ctx.lineTo(x0 + (x1 - x0) * p, y0 + (yEnd - y0) * p); ctx.stroke();
  });
  ctx.globalAlpha = 1;
  const la = ease(seg(t, 3.8, 4.8)) * a;
  drawText(ctx, h.aLabel, x1 + 30, 240, { size: 30, color: COL.dim, alpha: la, maxW: 340 });
  drawText(ctx, h.aValue, x1 + 30, 280, { size: 52, weight: 700, color: COL.amber, alpha: la, maxW: 340 });
  drawText(ctx, h.bLabel, x1 + 30, 620, { size: 30, color: COL.dim, alpha: la, maxW: 340 });
  drawText(ctx, h.bValue, x1 + 30, 660, { size: 52, weight: 700, color: COL.teal, alpha: la, maxW: 340 });
  drawText(ctx, h.caption, 960, 820, { size: 56, weight: 700, align: 'center', alpha: ease(seg(t, 4.6, 5.4)) * a, maxW: 1500 });
  drawText(ctx, h.source, 960, 930, { size: 28, color: COL.dim, align: 'center', alpha: ease(seg(t, 1, 1.8)) * a, maxW: 1500 });
}

function drawGauge(ctx, g, alpha) {
  ctx.globalAlpha = alpha;
  drawText(ctx, '탈출률', 1380, 76, { size: 26, weight: 700, color: COL.dim });
  roundRect(ctx, 1480, 78, 390, 26, 13); ctx.fillStyle = 'rgba(20,17,14,0.8)'; ctx.fill();
  ctx.strokeStyle = COL.line; ctx.lineWidth = 2; ctx.stroke();
  roundRect(ctx, 1484, 82, Math.max(22, 382 * g), 18, 9); ctx.fillStyle = COL.amber; ctx.fill();
  ctx.globalAlpha = 1;
}

function drawTag(ctx, label, sub, alpha) {
  ctx.globalAlpha = alpha; const w = chip(ctx, label, 40, 30, COL.amber, 30);
  drawText(ctx, sub, 40 + w + 18, 36, { size: 30, weight: 700, color: COL.text }); ctx.globalAlpha = 1;
}

const PIN_CARD = { A: [50, 740], B: [50, 190], C: [1490, 190] };

function drawPin(ctx, t, pin, text, tNow, resolved, modeLabel) {
  const a = ease(seg(tNow, pin.show, pin.show + 0.5)); if (a <= 0) return;
  const [ax, ay] = pin.sx !== undefined ? [pin.sx, pin.sy] : P(pin.x, pin.y, 0), [cx, cy] = PIN_CARD[pin.id], w = 400, col = resolved ? COL.teal : COL.red;
  setFont(ctx, 27, 900); const n = wrapLines(ctx, text, w - 40).length, h = 66 + n * 36 + 18;
  const pulse = (t * 1.6) % 1, ex = cx < 900 ? cx + w : cx, ey = cy + h / 2;
  ctx.globalAlpha = a * (1 - pulse); ctx.strokeStyle = col; ctx.lineWidth = 4; ctx.beginPath(); ctx.ellipse(ax, ay, 34 + pulse * 30, 17 + pulse * 15, 0, 0, 6.283); ctx.stroke();
  ctx.globalAlpha = a * 0.55; ctx.beginPath(); ctx.ellipse(ax, ay, 22, 11, 0, 0, 6.283); ctx.fillStyle = col; ctx.fill();
  ctx.globalAlpha = a; ctx.strokeStyle = col; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(ax, ay); ctx.lineTo(ex, ey); ctx.stroke();
  roundRect(ctx, cx, cy, w, h, 16); ctx.fillStyle = COL.glass; ctx.fill(); ctx.strokeStyle = col; ctx.lineWidth = 3; ctx.stroke();
  chip(ctx, pin.id, cx + 18, cy + 14, col, 22, a, '#fff');
  drawText(ctx, modeLabel, cx + 76, cy + 18, { size: 20, color: COL.dim, maxW: w - 96 });
  drawText(ctx, text, cx + 20, cy + 62, { size: 27, weight: 900, maxW: w - 40, lh: 1.3 });
  ctx.globalAlpha = 1;
}

function drawPeopleBubbles(ctx, t, people, tNow) {
  people.forEach((p) => {
    if (!p.screen) return;
    p.bubbles.forEach((b) => { if (tNow >= b[0] && tNow <= b[1]) bubble(ctx, t, p.screen[0], p.screen[1] + 8, b[2], b[3]); });
  });
}

// 신규 캐릭터 등장: 캐릭터 카드(디자인 캔버스 2번 화면)
function drawChibi(ctx, cx, by, k, bob) {
  const X = (x) => cx + (x - 120) * k, Y = (y) => by + (y - 356) * k + bob, R = (x, y, w, h, r, f) => { roundRect(ctx, X(x), Y(y), w * k, h * k, r * k); ctx.fillStyle = f; ctx.fill(); };
  const C = (x, y, r, f) => { ctx.beginPath(); ctx.arc(X(x), Y(y), r * k, 0, 6.283); ctx.fillStyle = f; ctx.fill(); };
  ctx.fillStyle = 'rgba(0,0,0,0.35)'; ctx.beginPath(); ctx.ellipse(X(120), by + 0 * k, 84 * k, 14 * k, 0, 0, 6.283); ctx.fill();
  R(78, 250, 30, 96, 14, '#2C2F3A'); R(132, 250, 30, 96, 14, '#2C2F3A'); R(70, 334, 44, 18, 9, '#F7EFE0'); R(126, 334, 44, 18, 9, '#F7EFE0');
  R(54, 140, 132, 130, 46, '#F7EFE0'); R(30, 160, 32, 96, 16, '#E6DAC4'); R(178, 160, 32, 96, 16, '#E6DAC4');
  ctx.beginPath(); ctx.moveTo(X(104), Y(142)); ctx.lineTo(X(120), Y(210)); ctx.lineTo(X(136), Y(142)); ctx.closePath(); ctx.fillStyle = COL.amber; ctx.fill();
  R(104, 204, 32, 40, 6, COL.teal); R(168, 214, 46, 58, 8, COL.amber);
  C(120, 92, 64, '#F2D3B6');
  ctx.beginPath(); ctx.arc(X(120), Y(92), 64 * k, Math.PI * 1.02, Math.PI * 1.98); ctx.fillStyle = '#241A14'; ctx.fill();
  R(50, 86, 22, 86, 11, '#241A14'); R(168, 86, 22, 86, 11, '#241A14');
  C(96, 100, 7, '#241A14'); C(144, 100, 7, '#241A14'); C(93, 97, 2.4, '#fff'); C(141, 97, 2.4, '#fff');
  ctx.globalAlpha *= 0.4; C(82, 118, 9, COL.red); C(158, 118, 9, COL.red); ctx.globalAlpha /= 0.4;
  ctx.strokeStyle = '#8A4A3A'; ctx.lineWidth = 4 * k; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(X(108), Y(122)); ctx.quadraticCurveTo(X(120), Y(134), X(132), Y(122)); ctx.stroke();
}

function statRow(ctx, x, y, w, label, level, fill, color, size) {
  drawText(ctx, label, x, y, { size, weight: 900 });
  roundRect(ctx, x + w * 0.46, y + size * 0.2, w * 0.54, size * 0.7, size * 0.35); ctx.fillStyle = COL.bg; ctx.fill();
  if (fill > 0.02) { roundRect(ctx, x + w * 0.46, y + size * 0.2, w * 0.54 * level * fill, size * 0.7, size * 0.35); ctx.fillStyle = color; ctx.fill(); }
}

function drawCharacterCard(ctx, t, c) {
  const ch = c.character, T0 = SCENE.stat[0], a = ease(seg(t, T0 + 0.1, T0 + 0.8)) * (1 - ease(seg(t, 35.2, 36)));
  if (a <= 0) return;
  const slide = (1 - ease(seg(t, T0 + 0.1, T0 + 1.1))) * 140, x = 110 + slide, y = 60, W = 1700, H = 960;
  ctx.globalAlpha = a;
  roundRect(ctx, x, y, W, H, 36); ctx.fillStyle = COL.glass; ctx.fill(); ctx.strokeStyle = COL.line; ctx.lineWidth = 3; ctx.stroke();
  ctx.save(); roundRect(ctx, x + 36, y + 36, 420, H - 72, 30); ctx.clip(); ctx.fillStyle = COL.panel; ctx.fill();
  cropDraw(ctx, ME_IMG, [0.05, 0, 0.9, 0.86], x + 36, y + 36, 420, H - 72);
  const pg = ctx.createLinearGradient(0, y + H - 300, 0, y + H - 36); pg.addColorStop(0, 'rgba(23,18,14,0)'); pg.addColorStop(1, 'rgba(23,18,14,0.9)'); ctx.fillStyle = pg; ctx.fillRect(x + 36, y + H - 300, 420, 264);
  ctx.restore(); roundRect(ctx, x + 36, y + 36, 420, H - 72, 30); ctx.strokeStyle = COL.amber; ctx.lineWidth = 5; ctx.stroke();
  drawText(ctx, ch.name, x + 246, y + H - 150, { size: 64, title: true, align: 'center', color: COL.text });
  drawText(ctx, ch.role, x + 246, y + H - 78, { size: 30, weight: 900, align: 'center', color: COL.amber });
  chip(ctx, ch.newTag, x + 62, y + 62, COL.red, 26);
  const bx = x + 500, bw = W - 500 - 56;
  drawText(ctx, ch.signature.label, bx, y + 40, { size: 56, title: true, color: COL.amber, maxW: bw - 200 });
  chip(ctx, ch.signature.badge, bx + bw - 190, y + 58, COL.amber, 26);
  const rp = ease(seg(t, T0 + 1, T0 + 2)), rw = 300, rh = 230, rx = bx, ry = y + 130;
  ctx.globalAlpha = a * rp; ctx.save(); roundRect(ctx, rx, ry, rw, rh, 18); ctx.clip(); ctx.filter = 'blur(' + ch.report.blur + 'px)'; cropDraw(ctx, REPORT_IMG, ch.report.focus, rx, ry, rw, rh); ctx.filter = 'none'; ctx.restore();
  roundRect(ctx, rx, ry, rw, rh, 18); ctx.strokeStyle = COL.amber; ctx.lineWidth = 3; ctx.stroke(); chip(ctx, ch.report.caption, rx + 8, ry + rh - 44, 'rgba(10,8,6,0.85)', 18, 1, '#fff');
  drawText(ctx, ch.signature.note, rx + rw + 28, ry + 6, { size: 29, weight: 700, color: '#EFE6D4', maxW: bw - rw - 28, lh: 1.5, alpha: rp });
  ctx.globalAlpha = a;
  let sx = bx; const sy = y + 392;
  ch.stats.forEach((st, i) => { sx += chip(ctx, st.label, sx, sy, i % 2 ? COL.teal : '#EBDDC4', 25, ease(seg(t, T0 + 2 + i * 0.3, T0 + 2.8 + i * 0.3))) + 14; });
  drawText(ctx, ch.skillTitle, bx, y + 468, { size: 26, weight: 900, color: COL.dim });
  const cw = (bw - 3 * 16) / 4;
  ch.skills.forEach((k, i) => {
    const cx = bx + i * (cw + 16), cyy = y + 506, pop = ease(seg(t, T0 + 3.4 + i * 0.5, T0 + 4.1 + i * 0.5)), lift = (1 - pop) * 40;
    ctx.globalAlpha = a * pop;
    roundRect(ctx, cx, cyy + lift, cw, 300, 24); ctx.fillStyle = k.main ? '#3A2C18' : COL.panel; ctx.fill(); ctx.strokeStyle = k.main ? COL.amber : COL.line; ctx.lineWidth = k.main ? 5 : 3; ctx.stroke();
    drawText(ctx, k.no, cx + 22, cyy + lift + 12, { size: 60, title: true, color: k.main ? COL.amber : COL.teal });
    drawText(ctx, k.name, cx + 22, cyy + lift + 88, { size: 29, weight: 900, maxW: cw - 44, lh: 1.2 });
    drawText(ctx, k.from, cx + 22, cyy + lift + 168, { size: 21, color: COL.dim, maxW: cw - 44, lh: 1.3 });
    chip(ctx, k.jd, cx + 16, cyy + lift + 240, k.main ? COL.amber : '#4A3F34', 20, 1, k.main ? '#17120E' : COL.text);
    ctx.globalAlpha = a;
  });
  if (ch.escape) drawText(ctx, ch.escape, bx, y + 830, { size: 26, weight: 700, color: COL.dim, alpha: ease(seg(t, T0 + 5.6, T0 + 6.4)) });
  drawText(ctx, ch.note, bx, y + 876, { size: 28, weight: 700, color: COL.text, alpha: ease(seg(t, T0 + 6.4, T0 + 7.2)) });
  ctx.globalAlpha = 1;
}

function drawClosing(ctx, t, c) {
  const cl = c.closing;
  [[cl.line, 102.8, 103.6, 106.4, 107], [cl.hypothesis, 106.8, 107.6, 110, 110.6]].forEach(([txt, a0, a1, b0, b1]) => {
    const al = fade(t, a0, a1, b0, b1); if (al <= 0) return;
    ctx.globalAlpha = al; roundRect(ctx, 160, 915, 1600, 110, 30); ctx.fillStyle = COL.glass; ctx.fill(); ctx.globalAlpha = 1;
    drawText(ctx, txt, 960, 945, { size: 46, weight: 900, align: 'center', maxW: 1500, alpha: al });
  });
  if (t >= 110.2) {
    const a = ease(seg(t, 110.4, 110.9));
    ctx.globalAlpha = a * 0.94; ctx.fillStyle = COL.bg; ctx.fillRect(0, 0, 1920, 1080); ctx.globalAlpha = 1;
    drawText(ctx, cl.name, 960, 360, { size: 170, title: true, align: 'center', alpha: a, color: COL.amber });
    drawText(ctx, cl.nameSub, 960, 600, { size: 44, weight: 700, align: 'center', alpha: a, color: COL.dim });
  }
}
