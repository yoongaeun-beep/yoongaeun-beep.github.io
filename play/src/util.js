// 공통 도구: 색, 글꼴, 글자 그리기, 둥근 사각형, 움직임 곡선
const COL = {
  bg: '#17120E', amber: '#F4A93A', teal: '#6FD3BE', red: '#F0705A', text: '#F7EFE0', dim: '#BFB3A0',
  panel: '#2A221B', line: '#4A3F34', glass: 'rgba(30,24,18,0.93)',
};
const FONT = '"Noto Sans KR","Malgun Gothic","Apple SD Gothic Neo",sans-serif';
const TITLE = '"Black Han Sans","Noto Sans KR","Malgun Gothic",sans-serif';

const clamp01 = (v) => Math.max(0, Math.min(1, v));
const seg = (t, a, b) => clamp01((t - a) / (b - a));
const ease = (u) => u * u * (3 - 2 * u);
const fade = (t, a, b, c, d) => ease(seg(t, a, b)) * (1 - ease(seg(t, c, d)));

function setFont(ctx, px, weight, title) { ctx.font = (title ? 400 : (weight || 400)) + ' ' + px + 'px ' + (title ? TITLE : FONT); }

function wrapLines(ctx, text, maxW) {
  const out = []; let line = '';
  text.split(' ').forEach((word) => {
    const trial = line ? line + ' ' + word : word;
    if (ctx.measureText(trial).width <= maxW) { line = trial; return; }
    if (line) out.push(line);
    line = word;
  });
  if (line) out.push(line);
  return out;
}

function drawText(ctx, text, x, y, o) {
  const op = Object.assign({ size: 40, weight: 400, color: COL.text, align: 'left', maxW: 1200, lh: 1.35, alpha: 1, title: false }, o);
  setFont(ctx, op.size, op.weight, op.title);
  ctx.textAlign = op.align; ctx.textBaseline = 'top'; ctx.fillStyle = op.color; ctx.globalAlpha = op.alpha;
  const lines = wrapLines(ctx, text, op.maxW);
  lines.forEach((ln, i) => ctx.fillText(ln, x, y + i * op.size * op.lh));
  ctx.globalAlpha = 1;
  return lines.length * op.size * op.lh;
}

function roundRect(ctx, x, y, w, h, r) {
  r = Math.max(0, Math.min(r, w / 2, h / 2));
  ctx.beginPath(); ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.closePath();
}

function chip(ctx, text, x, y, color, size, alpha, textColor) {
  setFont(ctx, size, 900);
  const w = ctx.measureText(text).width + size * 1.2, h = size * 1.7;
  ctx.globalAlpha = alpha === undefined ? 1 : alpha;
  roundRect(ctx, x, y, w, h, h / 2); ctx.fillStyle = color; ctx.fill();
  ctx.fillStyle = textColor || '#1a1510'; ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
  ctx.fillText(text, x + size * 0.6, y + h / 2 + 1);
  ctx.globalAlpha = 1;
  return w;
}

// 사진을 칸에 꽉 채워 그립니다. 원본 일부(fx, fy, fw, fh는 0에서 1 비율)만 쓰고 비율이 안 맞으면 가운데를 씁니다
function cropDraw(ctx, img, f, dx, dy, dw, dh) {
  if (!img || !img.complete || !img.naturalWidth) { ctx.fillStyle = '#2a2622'; ctx.fillRect(dx, dy, dw, dh); return; }
  const W = img.naturalWidth, H = img.naturalHeight;
  let sx = f[0] * W, sy = f[1] * H, sw = f[2] * W, sh = f[3] * H;
  const ar = dw / dh;
  if (sw / sh > ar) { const nw = sh * ar; sx += (sw - nw) / 2; sw = nw; } else { const nh = sw / ar; sy += (sh - nh) / 2; sh = nh; }
  ctx.drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh);
}
