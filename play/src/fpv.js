// 1인칭(고객 눈높이) 장면 공통 도구와 단계 1(입구). 원근법: 화면 중심 한 점으로 모이는 방식
const FP = { F: 900, cx: 960, hy: 470, eye: 1.6, camX: 0, camZ: 0 };

function fp(X, Y, Z) {
  const z = Math.max(0.25, Z - FP.camZ);
  return [FP.cx + FP.F * (X - FP.camX) / z, FP.hy - FP.F * (Y - FP.eye) / z];
}

function fq(ctx, pts, fill) { poly(ctx, pts.map((p) => fp(p[0], p[1], p[2])), fill); }

function cube3(ctx, x0, x1, y0, y1, z0, z1, hex) {
  if (z1 - FP.camZ < 0.3) return;
  if (FP.camX < x0) fq(ctx, [[x0, y0, z0], [x0, y0, z1], [x0, y1, z1], [x0, y1, z0]], tone(hex, 0.7));
  if (FP.camX > x1) fq(ctx, [[x1, y0, z0], [x1, y0, z1], [x1, y1, z1], [x1, y1, z0]], tone(hex, 0.78));
  if (FP.eye > y1) fq(ctx, [[x0, y1, z0], [x1, y1, z0], [x1, y1, z1], [x0, y1, z1]], tone(hex, 1.12));
  fq(ctx, [[x0, y0, z0], [x1, y0, z0], [x1, y1, z0], [x0, y1, z0]], tone(hex, 0.95));
}

// 정면을 보는 평면(Z 고정)에서 좌표 변환: 글자와 장식을 올릴 때 씁니다
function front(Z) { const k = FP.F / Math.max(0.25, Z - FP.camZ); return { k, X: (x) => FP.cx + k * (x - FP.camX), Y: (y) => FP.hy - k * (y - FP.eye) }; }

function ftext(ctx, text, x, y, Z, size, color, align) {
  const f = front(Z); setFont(ctx, size * f.k, 700); ctx.fillStyle = color; ctx.textAlign = align || 'center'; ctx.textBaseline = 'middle';
  ctx.fillText(text, f.X(x), f.Y(y));
}

function frect(ctx, x0, x1, y0, y1, Z, fill, r) {
  const f = front(Z); roundRect(ctx, f.X(x0), f.Y(y1), (x1 - x0) * f.k, (y1 - y0) * f.k, (r || 0) * f.k); ctx.fillStyle = fill; ctx.fill();
}

function drawRoomShell(ctx, t, zBack, wallHex) {
  const zN = FP.camZ + 0.3, W = 11, H = 5;
  ctx.fillStyle = '#1b1814'; ctx.fillRect(0, 0, 1920, 1080);
  fq(ctx, [[-W, H, zN], [W, H, zN], [W, H, zBack], [-W, H, zBack]], '#2a2622');
  for (let z = 2; z < zBack; z += 3) { if (z < zN) continue; fq(ctx, [[-2.5, H - 0.02, z], [2.5, H - 0.02, z], [2.5, H - 0.02, z + 0.5], [-2.5, H - 0.02, z + 0.5]], 'rgba(255,238,200,0.95)'); }
  const g = ctx.createLinearGradient(0, FP.hy, 0, 1080); g.addColorStop(0, '#dcdad2'); g.addColorStop(1, '#8e8c86');
  const fl = [fp(-W, 0, zN), fp(W, 0, zN), fp(W, 0, zBack), fp(-W, 0, zBack)]; poly(ctx, fl, g);
  ctx.strokeStyle = 'rgba(90,90,84,0.25)'; ctx.lineWidth = 2;
  for (let z = Math.ceil(zN); z < zBack; z += 2) { const a = fp(-W, 0, z), b = fp(W, 0, z); ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(b[0], b[1]); ctx.stroke(); }
  for (let x = -10; x <= 10; x += 2) { const a = fp(x, 0, zN), b = fp(x, 0, zBack); ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(b[0], b[1]); ctx.stroke(); }
  [-W, W].forEach((x) => {
    fq(ctx, [[x, 0, zN], [x, H, zN], [x, H, zBack], [x, 0, zBack]], wallHex);
    fq(ctx, [[x, 3.6, zN], [x, H, zN], [x, H, zBack], [x, 3.6, zBack]], 'rgba(170,205,185,0.7)');
    for (let z = Math.ceil(zN); z < zBack; z += 5) { const col = BOTTLES[Math.floor(rnd(z * 3 + x) * 8)]; fq(ctx, [[x, 0.3, z + 0.4], [x, 3.0, z + 0.4], [x, 3.0, z + 3.4], [x, 0.3, z + 3.4]], col); fq(ctx, [[x, 0.3, z + 0.4], [x, 1.1, z + 0.4], [x, 1.1, z + 3.4], [x, 0.3, z + 3.4]], 'rgba(255,255,255,0.4)'); }
  });
}

function drawHands(ctx, t, o) {
  const sway = Math.sin(t * 1.7) * 6;
  skinHand(ctx, 1560 + sway, 1030, 0.2, 1.25, 1, o.right);
  skinHand(ctx, 360 - sway, 1040, -0.25, 1.15, -1, o.left);
}

function skinHand(ctx, x, y, rot, s, side, item) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s * side, s);
  if (item) item(ctx);
  const g = ctx.createLinearGradient(-70, 0, 70, 0); g.addColorStop(0, '#E8BC9A'); g.addColorStop(0.5, '#F3D2B6'); g.addColorStop(1, '#E6B896');
  ctx.fillStyle = g; roundRect(ctx, -66, -10, 132, 190, 62); ctx.fill();
  [[-46, -70, 26, 96, -0.1], [-17, -92, 27, 118, -0.03], [13, -88, 27, 112, 0.04], [42, -62, 24, 88, 0.12]].forEach(([fx, fy, fw, fh, r]) => {
    ctx.save(); ctx.translate(fx + fw / 2, fy + fh); ctx.rotate(r); ctx.translate(-fw / 2, -fh);
    roundRect(ctx, 0, 0, fw, fh, fw / 2); ctx.fillStyle = g; ctx.fill(); ctx.fillStyle = 'rgba(255,255,255,0.35)'; roundRect(ctx, fw * 0.62, fh * 0.1, fw * 0.16, fh * 0.35, fw * 0.08); ctx.fill(); ctx.restore();
  });
  ctx.save(); ctx.translate(58, 44); ctx.rotate(0.7); roundRect(ctx, -14, -46, 30, 92, 15); ctx.fillStyle = g; ctx.fill(); ctx.restore();
  ctx.restore();
}

function drawArch(ctx, zb, glow) {
  const f = front(zb), cx = f.X(0), by = f.Y(0), w = 5.6 * f.k, h = 3.4 * f.k;
  ctx.beginPath(); ctx.moveTo(cx - w, by); ctx.lineTo(cx - w, by - h + w * 0.6); ctx.ellipse(cx, by - h + w * 0.6, w, w * 0.6, 0, Math.PI, 0); ctx.lineTo(cx + w, by); ctx.closePath();
  const g = ctx.createLinearGradient(0, by - h, 0, by); g.addColorStop(0, '#fff4d6'); g.addColorStop(1, '#f4c27a'); ctx.fillStyle = g; ctx.fill();
  ctx.lineWidth = 0.35 * f.k; ctx.strokeStyle = '#d8d3c6'; ctx.stroke();
  for (let i = 0; i < 6; i++) { ctx.fillStyle = tone(BOTTLES[i], 0.9); ctx.fillRect(cx - w * 0.8 + i * w * 0.27, by - 1.2 * f.k, w * 0.22, 1.1 * f.k); ctx.fillRect(cx - w * 0.8 + i * w * 0.27, by - 2.3 * f.k, w * 0.22, 0.8 * f.k); }
  ftext(ctx, 'COSMETICS & PERFUMES', 0, 4.15, zb, 0.62, glow, 'center');
  ftext(ctx, 'DUTY FREE', 7.6, 3.9, zb, 0.42, '#ffd9c8', 'center');
}

function drawSceneA(ctx, t, p, walk) {
  FP.camZ = walk; const zb = 24;
  drawRoomShell(ctx, t, zb, '#cbc9c1'); drawArch(ctx, zb, '#ffe3a0');
  const asis = 1 - p, f = front(9);
  if (asis > 0) {
    ctx.globalAlpha = asis;
    cube3(ctx, -4.6, -3.7, 0, 3.2, 7, 7.9, '#ece9e1');
    const fl = front(7);
    for (let i = 0; i < 9; i++) { frect(ctx, -4.5 + (i % 3) * 0.28, -4.3 + (i % 3) * 0.28, 0.5 + Math.floor(i / 3) * 0.9 + 0.2, 1.1 + Math.floor(i / 3) * 0.9, 7, ['#d98fa0', '#8fb8de', '#f0d58c'][i % 3], 0.03); }
    cube3(ctx, 3.2, 5.2, 0, 2.6, 8, 8.6, '#f4f2ec'); frect(ctx, 3.3, 5.1, 0.7, 2.4, 8, '#3a4a5a', 0.05);
    ftext(ctx, '안내 이벤트 면세 쇼핑 환급', 4.2, 2.1, 8, 0.2, '#e8e4da'); ftext(ctx, '출국 탑승 라운지 쿠폰', 4.2, 1.7, 8, 0.2, '#b9b4a6'); ftext(ctx, 'INFO SALE EVENT', 4.2, 1.3, 8, 0.2, '#8f8a7e');
    ctx.globalAlpha = 1;
  }
  staffFront(ctx, -2.2, 17, null, '#c76f9a', '#1a1a1a'); staffFront(ctx, 3.4, 14.5, null, '#4a7fb5', '#7b4a2a'); staffFront(ctx, -6.5, 12, null, '#e0b33a', '#222');
  if (p > 0) drawPurposeBanners(ctx, t, p);
  drawHands(ctx, t, { left: (c) => { c.fillStyle = '#fff'; roundRect(c, -60, -190, 120, 170, 10); c.fill(); c.fillStyle = '#2f6fb0'; c.fillRect(-60, -190, 120, 36); c.save(); c.scale(-1, 1); setFontRaw(c, 20); c.fillStyle = '#1a1510'; c.textAlign = 'center'; c.fillText('BOARDING', 0, -112); c.fillText('PASS', 0, -86); c.restore(); }, right: null });
}

function setFontRaw(c, px) { c.font = '700 ' + px + 'px ' + FONT; }

function drawPurposeBanners(ctx, t, p) {
  const items = [['GIFT', '선물', '#F0A0B4', -5.2], ['TRY', '체험', '#6FD3BE', -1.75], ['BEST', '인기', '#F4C95A', 1.75], ['K-BEAUTY', 'K뷰티', '#B79BE0', 5.2]];
  items.forEach(([en, ko, col, x], i) => {
    const drop = (1 - ease(seg(p, 0.1 + i * 0.12, 0.6 + i * 0.12))) * 2.2, z = 14;
    ctx.globalAlpha = Math.min(1, p * 2);
    frect(ctx, x - 0.04, x + 0.04, 3.9, 5.2, z, '#b9b4a6');
    frect(ctx, x - 1.45, x + 1.45, 2.55 + drop, 3.95 + drop, z, col, 0.14);
    ftext(ctx, en, x, 3.5 + drop, z, 0.5, '#1a1510'); ftext(ctx, ko, x, 2.95 + drop, z, 0.36, '#3a2f22');
    fq(ctx, [[x - 0.4, 0, 12], [x + 0.4, 0, 12], [x + 0.25, 0, 23], [x - 0.25, 0, 23]], col);
    ctx.globalAlpha = 1;
  });
}
