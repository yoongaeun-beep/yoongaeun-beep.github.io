// 화면 요소 2: 1인칭 HUD, 결정 화면(게임 선택지), 스킬 카드 발동, 입사 후 계획 패널
const WHEN = ['가설 1', '가설 2', '가설 3', '정리'];

function stationNow(t, ST) { return ST.findIndex((T) => t >= T.start && t < T.end); }

function drawProgress(ctx, t, ST, alpha) {
  ctx.globalAlpha = alpha; drawText(ctx, '확인할 것', 1330, 26, { size: 26, weight: 700, color: COL.dim });
  const cur = stationNow(t, ST);
  WHEN.forEach((w, i) => {
    const x = 1480 + i * 100, done = i < 3 ? t >= ST[i].resolve : t >= 102, act = i === cur || (i === 3 && t >= 102 && t < 113);
    roundRect(ctx, x, 20, 90, 40, 20); ctx.fillStyle = done ? COL.teal : COL.panel; ctx.fill();
    ctx.strokeStyle = act && !done ? COL.amber : COL.line; ctx.lineWidth = act ? 4 : 2; ctx.stroke();
    setFont(ctx, 20, 900); ctx.fillStyle = done ? '#17120E' : act ? COL.amber : COL.dim; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(w, x + 45, 41);
  });
  ctx.globalAlpha = 1;
}

function drawFpvHud(ctx, t, c, i, T) {
  const s = c.stations[i], a = ease(seg(t, T.start + 0.3, T.start + 1)) * (1 - ease(seg(t, T.end - 0.6, T.end)));
  ctx.globalAlpha = a;
  const v = ctx.createRadialGradient(960, 540, 420, 960, 540, 1150); v.addColorStop(0, 'rgba(0,0,0,0)'); v.addColorStop(1, 'rgba(0,0,0,0.5)');
  ctx.fillStyle = v; ctx.fillRect(0, 0, 1920, 1080);
  const w = chip(ctx, s.when, 40, 24, COL.teal, 26); drawText(ctx, s.title, 40 + w + 18, 24, { size: 38, title: true });
  ctx.fillStyle = COL.red; ctx.beginPath(); ctx.arc(54, 100, 8 + Math.sin(t * 6) * 1.5, 0, 6.283); ctx.fill();
  drawText(ctx, '고객 1의 시선', 74, 86, { size: 24, weight: 700, color: COL.dim });
  ctx.globalAlpha = 1;
  drawProgress(ctx, t, ST, a);
  const tb = ease(seg(t, T.think, T.think + 0.6)) * (1 - ease(seg(t, T.choice + 0.2, T.choice + 0.8)));
  if (tb > 0) drawThought(ctx, t, s.thought, tb);
}

function drawThought(ctx, t, text, a) {
  const x = 120, y = 200 + Math.sin(t * 2) * 4;
  ctx.globalAlpha = a; roundRect(ctx, x, y, 700, 130, 44); ctx.fillStyle = '#FFFAF0'; ctx.fill();
  [[x + 70, y + 154, 16], [x + 36, y + 186, 10]].forEach(([bx, by, r]) => { ctx.beginPath(); ctx.arc(bx, by, r, 0, 6.283); ctx.fill(); });
  drawText(ctx, text, x + 40, y + 26, { size: 34, weight: 900, color: '#2B2118', maxW: 620, lh: 1.3 });
  ctx.globalAlpha = 1;
}

function drawDecision(ctx, t, c, i, T) {
  const s = c.stations[i], a = ease(seg(t, T.choice, T.choice + 0.5)) * (1 - ease(seg(t, T.resolve + 0.3, T.resolve + 0.9)));
  if (a <= 0) return;
  ctx.globalAlpha = a;
  const g = ctx.createLinearGradient(0, 620, 0, 1080); g.addColorStop(0, 'rgba(23,18,14,0)'); g.addColorStop(0.28, 'rgba(23,18,14,0.94)'); g.addColorStop(1, 'rgba(23,18,14,0.97)');
  ctx.fillStyle = g; ctx.fillRect(0, 620, 1920, 460);
  const cw = chip(ctx, '기획 결정', 90, 700, COL.amber, 30); drawText(ctx, s.question, 90 + cw + 24, 704, { size: 40, weight: 900, maxW: 1050 });
  const left = Math.max(0, 1 - seg(t, T.choice, T.resolve)); roundRect(ctx, 1420, 716, 410, 22, 11); ctx.fillStyle = COL.panel; ctx.fill();
  roundRect(ctx, 1420, 716, Math.max(16, 410 * left), 22, 11); ctx.fillStyle = left < 0.3 ? COL.red : COL.amber; ctx.fill();
  const cursor = cursorIndex(t, s, T);
  s.choices.forEach((txt, k) => {
    const x = 90 + k * 590, y = 780, w = 560, h = 215, sel = cursor === k, ok = sel && t >= T.pick && k === s.correct, bad = sel && s.wrongPick === k && t < T.pick;
    const shake = bad ? Math.sin(t * 60) * 6 : 0, lift = sel ? -12 : 0;
    roundRect(ctx, x + shake, y + lift, w, h, 26); ctx.fillStyle = ok ? '#1E3B35' : bad ? '#4A2A22' : COL.panel; ctx.fill();
    ctx.strokeStyle = ok ? COL.teal : bad ? COL.red : sel ? COL.amber : COL.line; ctx.lineWidth = sel ? 6 : 3; ctx.stroke();
    chip(ctx, 'ABC'[k], x + 26 + shake, y + 26 + lift, sel ? COL.amber : COL.line, 28, 1, sel ? '#17120E' : COL.text);
    drawText(ctx, txt, x + 26 + shake, y + 84 + lift, { size: 34, weight: 900, maxW: w - 52, lh: 1.22 });
    if (bad) drawText(ctx, s.wrongNote, x + shake, y + h + 14, { size: 28, weight: 900, color: COL.red, maxW: w });
  });
  if (cursor >= 0) drawCursor(ctx, t, cursor, T);
  ctx.globalAlpha = 1;
}

function cursorIndex(t, s, T) {
  if (t < T.choice + 1) return -1;
  if (s.wrongPick !== null && t >= T.wrongAt && t < T.pick) return s.wrongPick;
  if (t >= T.pick) return s.correct;
  return -1;
}

function drawCursor(ctx, t, k, T) {
  const x = 90 + k * 590 + 450, y = 905, click = (t >= T.pick && t < T.pick + 0.4) || (T.wrongAt !== null && t >= T.wrongAt && t < T.wrongAt + 0.4);
  ctx.save(); ctx.translate(x, y + (click ? 8 : 0)); ctx.fillStyle = '#fff'; ctx.strokeStyle = '#17120E'; ctx.lineWidth = 3;
  ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(0, 54); ctx.lineTo(14, 42); ctx.lineTo(26, 66); ctx.lineTo(36, 61); ctx.lineTo(24, 38); ctx.lineTo(42, 36); ctx.closePath(); ctx.fill(); ctx.stroke(); ctx.restore();
}

// 스킬 카드가 한가운데 크게 뜹니다
function drawSkillBurst(ctx, t, s, T) {
  const a = ease(seg(t, T.resolve, T.resolve + 0.35)) * (1 - ease(seg(t, T.resolve + 1.9, T.resolve + 2.5)));
  if (a <= 0) return;
  const u = ease(seg(t, T.resolve, T.resolve + 0.5)), cx = 960, cy = 400;
  ctx.save(); ctx.globalAlpha = a * 0.55; ctx.translate(cx, cy);
  for (let r = 0; r < 16; r++) { ctx.rotate(6.283 / 16); ctx.fillStyle = r % 2 ? 'rgba(244,169,58,0.55)' : 'rgba(111,211,190,0.4)'; ctx.fillRect(250 + u * 140, -7, 330 * u, 14); }
  ctx.restore();
  ctx.globalAlpha = a; const sc = 0.8 + 0.2 * u; ctx.save(); ctx.translate(cx, cy); ctx.scale(sc, sc);
  roundRect(ctx, -340, -180, 680, 400, 34); ctx.fillStyle = COL.panel; ctx.fill(); ctx.strokeStyle = COL.amber; ctx.lineWidth = 8; ctx.stroke();
  chip(ctx, 'SKILL 발동', -300, -150, COL.amber, 28);
  drawText(ctx, s.skillNo, 220, -146, { size: 96, title: true, color: COL.amber, align: 'center' });
  drawText(ctx, s.skill, 0, -40, { size: s.skill.length > 12 ? 44 : 56, weight: 900, align: 'center', maxW: 620, lh: 1.2 });
  drawText(ctx, s.result, 0, s.skill.length > 12 ? 110 : 60, { size: 28, weight: 900, color: COL.teal, align: 'center', maxW: 620, lh: 1.25 });
  ctx.restore(); ctx.globalAlpha = 1;
}

function reportMock(ctx, x, y, w, h) {
  roundRect(ctx, x, y, w, h, 16); ctx.fillStyle = '#F7EFE0'; ctx.fill();
  const cols = ['#8FB8DE', '#D98FA0', '#B7D8B0', '#E9A46A', '#C9A0DC', '#8FB8DE', '#D98FA0'], hs = [0.4, 0.7, 0.3, 0.85, 0.55, 0.65, 0.35];
  cols.forEach((col, i) => { const bh = hs[i] * (h - 120); ctx.fillStyle = col; roundRect(ctx, x + 28 + i * ((w - 56) / 7), y + h - 40 - bh, (w - 56) / 7 - 12, bh, 6); ctx.fill(); });
  ctx.fillStyle = '#C9BFAA'; [0, 1, 2].forEach((k) => ctx.fillRect(x + 28, y + 28 + k * 18, (w - 56) * (k === 2 ? 0.5 : 0.85), 8));
}

function drawPlanPanel(ctx, t, c, i, T, imgs) {
  const s = c.stations[i], e = s.exp, a = ease(seg(t, T.panel, T.panel + 0.7)) * (1 - ease(seg(t, T.end - 1, T.end - 0.3)));
  if (a <= 0) return;
  const x = 1000 + (1 - ease(seg(t, T.panel, T.panel + 0.8))) * 520, y = 118, w = 880, h = 912;
  ctx.globalAlpha = a; roundRect(ctx, x, y, w, h, 32); ctx.fillStyle = COL.glass; ctx.fill(); ctx.strokeStyle = COL.line; ctx.lineWidth = 3; ctx.stroke();
  const cw = chip(ctx, s.when, x + 36, y + 30, COL.teal, 26); drawText(ctx, '확인해 볼 것', x + 36 + cw + 18, y + 34, { size: 26, weight: 700, color: COL.dim });
  const hh = drawText(ctx, s.headline, x + 36, y + 96, { size: 54, title: true, maxW: w - 72, lh: 1.15 });
  const cy = y + 96 + hh + 18, pw = (w - 72 - 28) / 3;
  s.plans.forEach((p, k) => {
    const px = x + 36 + k * (pw + 14); roundRect(ctx, px, cy, pw, 168, 20); ctx.fillStyle = COL.panel; ctx.fill();
    drawText(ctx, p[0], px + 20, cy + 16, { size: 22, weight: 900, color: COL.amber });
    drawText(ctx, p[1], px + 20, cy + 50, { size: 23, weight: 700, maxW: pw - 40, lh: 1.28 });
  });
  const ey = cy + 168 + 24, eh = y + h - 36 - ey;
  roundRect(ctx, x + 36, ey, w - 72, eh, 26); ctx.fillStyle = COL.panel; ctx.fill(); ctx.strokeStyle = COL.amber; ctx.lineWidth = 4; ctx.stroke();
  const hasPhoto = !!e.photo.src, pw2 = hasPhoto ? 300 : 0, ph = 260, px2 = x + 36 + 24, py2 = ey + 24;
  if (hasPhoto) { ctx.save(); roundRect(ctx, px2, py2, pw2, ph, 16); ctx.clip();
  if (e.photo.src) { if (e.photo.blur) ctx.filter = 'blur(' + e.photo.blur + 'px)'; cropDraw(ctx, imgs[i], e.photo.focus, px2, py2, pw2, ph); ctx.filter = 'none'; } else reportMock(ctx, px2, py2, pw2, ph);
  ctx.restore(); chip(ctx, e.photo.caption, px2 + 10, py2 + ph - 44, 'rgba(10,8,6,0.85)', 18, 1, '#fff'); }
  const tx = px2 + (hasPhoto ? pw2 + 28 : 0), tw = x + w - 36 - 24 - tx;
  const bw = chip(ctx, '근거 경험', tx, py2, COL.amber, 22);
  const ow = chip(ctx, e.org, tx + bw + 10, py2, '#F7EFE0', 22);
  if (e.badge) chip(ctx, e.badge, tx + bw + ow + 20, py2, COL.teal, 22);
  const th = drawText(ctx, e.title, tx, py2 + 50, { size: 32, weight: 900, maxW: tw });
  const pr = drawText(ctx, e.period, tx, py2 + 54 + th, { size: 21, weight: 700, color: COL.amber, maxW: tw });
  drawText(ctx, e.body, tx, py2 + 64 + th + pr, { size: 24, maxW: tw, lh: 1.45, color: '#E7DDC9' });
  const sw = chip(ctx, '스킬 ' + s.skillNo, px2, ey + eh - 70, COL.teal, 26);
  drawText(ctx, s.skill, px2 + sw + 16, ey + eh - 66, { size: 34, weight: 900, color: COL.amber });
  ctx.globalAlpha = 1;
}
