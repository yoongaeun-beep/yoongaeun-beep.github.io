// 아이소메트릭(타이쿤 시점) 그리기 도구: 좌표 변환, 상자, 원기둥, 사람, 말풍선
const ISO = { TW: 64, TH: 32, ZP: 36 };
const cam = { s: 0.95, ox: 960, oy: 320 };

function P(x, y, z) {
  z = z || 0;
  return [cam.ox + (x - y) * ISO.TW / 2 * cam.s, cam.oy + (x + y) * ISO.TH / 2 * cam.s - z * ISO.ZP * cam.s];
}

function tone(hex, k) {
  const n = parseInt(hex.slice(1), 16);
  const c = (v) => Math.max(0, Math.min(255, Math.round(v * k)));
  return 'rgb(' + c(n >> 16) + ',' + c((n >> 8) & 255) + ',' + c(n & 255) + ')';
}

function poly(ctx, pts, fill, stroke) {
  ctx.beginPath(); pts.forEach((p, i) => (i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1]))); ctx.closePath();
  if (fill) { ctx.fillStyle = fill; ctx.fill(); }
  if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = 1; ctx.stroke(); }
}

function box(ctx, x, y, z, w, d, h, hex, line) {
  const f = line || null;
  poly(ctx, [P(x + w, y, z + h), P(x + w, y + d, z + h), P(x + w, y + d, z), P(x + w, y, z)], tone(hex, 0.72), f);
  poly(ctx, [P(x, y + d, z + h), P(x + w, y + d, z + h), P(x + w, y + d, z), P(x, y + d, z)], tone(hex, 0.86), f);
  poly(ctx, [P(x, y, z + h), P(x + w, y, z + h), P(x + w, y + d, z + h), P(x, y + d, z + h)], tone(hex, 1.08), f);
}

function cyl(ctx, x, y, z, r, h, hex) {
  const c0 = P(x, y, z), c1 = P(x, y, z + h);
  const rx = r * ISO.TW / 2 * 1.414 * cam.s, ry = rx / 2;
  ctx.fillStyle = tone(hex, 0.8); ctx.beginPath();
  ctx.ellipse(c0[0], c0[1], rx, ry, 0, 0, Math.PI * 2); ctx.fill();
  ctx.fillRect(c0[0] - rx, c1[1], rx * 2, c0[1] - c1[1]);
  ctx.fillStyle = tone(hex, 0.8); ctx.beginPath(); ctx.ellipse(c0[0], c0[1], rx, ry, 0, 0, Math.PI); ctx.fill();
  ctx.fillStyle = tone(hex, 1.1); ctx.beginPath(); ctx.ellipse(c1[0], c1[1], rx, ry, 0, 0, Math.PI * 2); ctx.fill();
}

// 벽이나 바닥 위에 눕혀 쓰는 글자. plane 'y'는 +y를 향한 면, 'x'는 +x를 향한 면
function isoText(ctx, text, x, y, z, plane, size, color, align) {
  const k = 40, a = ISO.TW / 2 * cam.s / k, b = ISO.TH / 2 * cam.s / k, d = ISO.ZP * cam.s / k;
  const o = P(x, y, z);
  ctx.save();
  if (plane === 'y') ctx.transform(a, b, 0, d, o[0], o[1]); else ctx.transform(a, -b, 0, d, o[0], o[1]);
  ctx.font = '700 ' + size * k + 'px ' + FONT; ctx.fillStyle = color; ctx.textAlign = align || 'left'; ctx.textBaseline = 'alphabetic';
  ctx.fillText(text, 0, 0); ctx.restore();
}

// 작은 사람. feet는 바닥 위치, look은 걷는 박자
function person(ctx, t, x, y, o) {
  const [sx, sy] = P(x, y, 0);
  return personScreen(ctx, t, sx, sy, cam.s * (o.size || 1), o);
}

function personScreen(ctx, t, sx, sy, k, o) {
  const ph = o.walk ? Math.sin(t * 9 + o.seed) : 0, bob = o.walk ? Math.abs(ph) * 3 * k : 0, sw = ph * 5 * k;
  const dark = tone(o.shirt.length === 7 ? o.shirt : '#888888', 0.78), skin = o.skin || '#F2D3B6';
  ctx.fillStyle = 'rgba(0,0,0,0.3)'; ctx.beginPath(); ctx.ellipse(sx, sy, 17 * k, 7 * k, 0, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = o.pants || '#2C2F3A'; roundRect(ctx, sx - 9 * k + sw, sy - 19 * k - bob, 8 * k, 19 * k, 4 * k); ctx.fill(); roundRect(ctx, sx + 1 * k - sw, sy - 19 * k - bob, 8 * k, 19 * k, 4 * k); ctx.fill();
  ctx.fillStyle = '#F7EFE0'; roundRect(ctx, sx - 11 * k + sw, sy - 5 * k - bob, 11 * k, 6 * k, 3 * k); ctx.fill(); roundRect(ctx, sx - 1 * k - sw, sy - 5 * k - bob, 11 * k, 6 * k, 3 * k); ctx.fill();
  if (o.acc === 'case') { ctx.fillStyle = '#5b7ea3'; roundRect(ctx, sx + 14 * k, sy - 24 * k, 18 * k, 24 * k, 4 * k); ctx.fill(); ctx.fillStyle = '#34495f'; ctx.fillRect(sx + 21 * k, sy - 34 * k, 3 * k, 11 * k); }
  if (o.acc === 'pack') { ctx.fillStyle = '#4b5d4a'; roundRect(ctx, sx - 18 * k, sy - 44 * k - bob, 11 * k, 26 * k, 5 * k); ctx.fill(); }
  ctx.fillStyle = dark; roundRect(ctx, sx - 18 * k, sy - 38 * k - bob + sw / 2, 9 * k, 24 * k, 4.5 * k); ctx.fill(); roundRect(ctx, sx + 9 * k, sy - 38 * k - bob - sw / 2, 9 * k, 24 * k, 4.5 * k); ctx.fill();
  ctx.fillStyle = o.shirt; roundRect(ctx, sx - 14 * k, sy - 46 * k - bob, 28 * k, 32 * k, 11 * k); ctx.fill();
  ctx.fillStyle = 'rgba(255,255,255,0.18)'; roundRect(ctx, sx - 10 * k, sy - 43 * k - bob, 8 * k, 20 * k, 4 * k); ctx.fill();
  if (o.acc === 'bag') { ctx.fillStyle = o.accColor || '#d98fa0'; roundRect(ctx, sx + 10 * k, sy - 30 * k - bob, 14 * k, 17 * k, 4 * k); ctx.fill(); ctx.strokeStyle = tone(o.accColor || '#d98fa0', 0.7); ctx.lineWidth = 2 * k; ctx.beginPath(); ctx.arc(sx + 17 * k, sy - 30 * k - bob, 5 * k, Math.PI, 0); ctx.stroke(); }
  ctx.fillStyle = skin; ctx.beginPath(); ctx.arc(sx, sy - 60 * k - bob, 15 * k, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = o.hair; ctx.beginPath(); ctx.arc(sx, sy - 62 * k - bob, 15.5 * k, Math.PI * 1.03, Math.PI * 1.97); ctx.fill();
  if (o.hairLong) { roundRect(ctx, sx - 16 * k, sy - 64 * k - bob, 7 * k, 24 * k, 3.5 * k); ctx.fill(); roundRect(ctx, sx + 9 * k, sy - 64 * k - bob, 7 * k, 24 * k, 3.5 * k); ctx.fill(); }
  if (o.hat) { ctx.fillStyle = o.hat; ctx.beginPath(); ctx.arc(sx, sy - 66 * k - bob, 14 * k, Math.PI, Math.PI * 2); ctx.fill(); ctx.fillRect(sx - 18 * k, sy - 67 * k - bob, 30 * k, 4 * k); }
  ctx.fillStyle = '#241A14'; ctx.beginPath(); ctx.arc(sx - 5.5 * k, sy - 59 * k - bob, 1.9 * k, 0, 6.283); ctx.arc(sx + 5.5 * k, sy - 59 * k - bob, 1.9 * k, 0, 6.283); ctx.fill();
  ctx.fillStyle = 'rgba(240,112,90,0.35)'; ctx.beginPath(); ctx.arc(sx - 9 * k, sy - 54 * k - bob, 3 * k, 0, 6.283); ctx.arc(sx + 9 * k, sy - 54 * k - bob, 3 * k, 0, 6.283); ctx.fill();
  return [sx, sy - 82 * k - bob];
}

function bubble(ctx, t, x, y, glyph, color, a) {
  const bob = Math.sin(t * 5) * 3;
  ctx.globalAlpha = a === undefined ? 1 : a;
  roundRect(ctx, x - 22, y - 50 + bob, 44, 38, 14); ctx.fillStyle = '#fffaf0'; ctx.fill();
  ctx.beginPath(); ctx.moveTo(x - 6, y - 13 + bob); ctx.lineTo(x + 2, y - 3 + bob); ctx.lineTo(x + 6, y - 13 + bob); ctx.fill();
  setFont(ctx, 28, 700); ctx.fillStyle = color; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  ctx.fillText(glyph, x, y - 30 + bob); ctx.globalAlpha = 1;
}
