// 메인: 시계, 키 입력, 장면 조립
const params = new URLSearchParams(location.search);
const canvas = document.getElementById('stage');
const ctx = canvas.getContext('2d');
const ME_IMG = new Image(); ME_IMG.src = 'assets/me.jpg';
const REPORT_IMG = new Image(); REPORT_IMG.src = 'assets/exp_b.jpg';
// assets/scenes 폴더에 장면 그림을 넣으면 직접 그린 도형 대신 그 그림을 씁니다(없으면 기본 그림)
const SCN = {};
['asis', 'a_asis', 'a_tobe', 'b_asis', 'b_tobe', 'c_asis', 'c_tobe', 'closing'].forEach((k) => { const im = new Image(); im.src = 'assets/scenes/' + k + '.png'; SCN[k] = im; });
const hasScn = (k) => SCN[k] && SCN[k].complete && SCN[k].naturalWidth > 0;
function drawScn(k, zoom, px, py, alpha) {
  ctx.save(); ctx.globalAlpha = alpha; ctx.translate(960 + px, 540 + py); ctx.scale(zoom, zoom); cropDraw(ctx, SCN[k], [0, 0, 1, 1], -960, -540, 1920, 1080); ctx.restore();
}
let content = CONTENT, ST = [], sounds = [], soundIdx = 0, imgs = [];
let t = parseFloat(params.get('t') || '0'), playing = false, showDebug = params.has('debug'), last = 0;
const FPV_SCENES = [drawSceneA, drawSceneB, drawSceneC];
const FPV_WALK = [[0.25, 3], [0.16, 2.2], [0.12, 1.2]];

function fitCanvas() {
  const s = Math.min(innerWidth / 1920, innerHeight / 1080);
  ['stage', 'gl'].forEach((id) => { const e = document.getElementById(id); e.style.width = 1920 * s + 'px'; e.style.height = 1080 * s + 'px'; });
}

function backdrop() {
  ctx.fillStyle = COL.bg; ctx.fillRect(0, 0, 1920, 1080);
  const g = ctx.createRadialGradient(960, 560, 100, 960, 560, 1000); g.addColorStop(0, '#2b251e'); g.addColorStop(1, COL.bg);
  ctx.fillStyle = g; ctx.fillRect(0, 0, 1920, 1080);
}

function setCamera(tt, p) {
  const u = ease(seg(tt, 7, 14)), z = ease(seg(tt, 23, 25));
  cam.s = (1.06 + 0.05 * u) * (1 - z) + 2.9 * z; cam.ox = 960; cam.oy = 255;
  if (z > 0 && p) { const [px, py] = P(p.x, p.y, 0.9); cam.ox += (960 - px) * z; cam.oy += (560 - py) * z; }
}

function renderAsis(c) {
  const a = ease(seg(t, 7, 7.8)) * (1 - ease(seg(t, 24.4, 25.2)));
  if (a <= 0) return;
  const img = hasScn('asis'), people = peopleAt(t, ASIS), pov = people.find((p) => p.id === 'P');
  setCamera(t, pov);
  ctx.globalAlpha = a; backdrop();
  if (img) drawScn('asis', 1 + 0.06 * seg(t, 7, 23) + 0.5 * ease(seg(t, 23, 25)), 0, 0, a);
  else { drawStoreScene(ctx, t, { toBe: 0 }, people); drawPeopleBubbles(ctx, t, people, t); }
  PINS.forEach((pin, i) => drawPin(ctx, t, img ? Object.assign({}, pin, { sx: c.asis.pinPos[i][0], sy: c.asis.pinPos[i][1] }) : pin, c.asis.pins[i], t, false, c.modeLabels[c.observationMode]));
  drawTag(ctx, c.asis.tag, c.asis.sub, 1);
  drawText(ctx, c.asis.question, 960, 960, { size: 52, weight: 700, align: 'center', maxW: 1700, alpha: fade(t, 7.6, 8.4, 11.6, 12.4) });
  drawText(ctx, c.asis.zoom, 960, 960, { size: 52, weight: 700, align: 'center', maxW: 1700, alpha: fade(t, 22.4, 23.1, 24.4, 25) });
  ctx.globalAlpha = 1;
}

function panIn(tt, T) { return ease(seg(tt, T.panel, T.panel + 0.8)) * (1 - ease(seg(tt, T.end - 1, T.end - 0.3))); }

function renderStation(c, i) {
  const T = ST[i];
  if (t < T.start || t >= T.end) return;
  const p = ease(seg(t, T.resolve, T.resolve + 2)), [sp, mx] = FPV_WALK[i];
  const panelIn = ease(seg(t, T.panel, T.panel + 0.8)) * (1 - ease(seg(t, T.end - 1, T.end - 0.3)));
  FP.cx = 960 - 400 * panelIn; FP.camX = Math.sin(t * 1.3) * 0.05; FP.hy = 470 + Math.sin(t * 3.3) * 4;
  const key = 'abc'[i];
  if (hasScn(key + '_asis') && hasScn(key + '_tobe')) {
    const zoom = 1 + 0.07 * seg(t, T.start, T.end), px = -300 * panIn(t, T);
    drawScn(key + '_asis', zoom, px, 0, 1); drawScn(key + '_tobe', zoom, px, 0, p);
  } else FPV_SCENES[i](ctx, t, p, Math.min(mx, (t - T.start) * sp));
  drawFpvHud(ctx, t, c, i, T); drawDecision(ctx, t, c, i, T); drawSkillBurst(ctx, t, c.stations[i], T); drawPlanPanel(ctx, t, c, i, T, imgs);
  drawGauge(ctx, gaugeAt(t, ST), 1);
  const cover = Math.max(1 - ease(seg(t, T.start, T.start + 0.6)), ease(seg(t, T.end - 0.5, T.end)));
  ctx.globalAlpha = cover; ctx.fillStyle = '#000'; ctx.fillRect(0, 0, 1920, 1080); ctx.globalAlpha = 1;
}

function renderClosing(c) {
  if (t < SCENE.closing[0]) return;
  const a = ease(seg(t, 102, 103));
  const people = peopleAt(t, CLOSING), img = hasScn('closing'); cam.s = 1.1; cam.ox = 960; cam.oy = 262;
  ctx.globalAlpha = a; backdrop();
  if (img) drawScn('closing', 1, 0, 0, a); else drawStoreScene(ctx, t, { toBe: 1 }, people);
  PINS.forEach((pin, i) => drawPin(ctx, t, Object.assign({}, pin, { show: 102.6 + i * 0.5 }, img ? { sx: c.asis.pinPos[i][0], sy: c.asis.pinPos[i][1] } : {}), c.stations[i].result, t, true, c.modeLabels[c.observationMode]));
  drawTag(ctx, '가설', '하나씩 확인해 본 매장', 1); drawGauge(ctx, gaugeAt(t, ST), 1); drawProgress(ctx, t, ST, 1);
  ctx.globalAlpha = 1; drawClosing(ctx, t, c);
}

function coverFade(a) { if (a > 0.001) { ctx.globalAlpha = Math.min(1, a); ctx.fillStyle = '#000'; ctx.fillRect(0, 0, 1920, 1080); ctx.globalAlpha = 1; } }

function handsOpts(i, p) {
  if (i === 0) return { left: (c) => { c.fillStyle = '#fff'; roundRect(c, -60, -190, 120, 170, 10); c.fill(); c.fillStyle = '#2f6fb0'; c.fillRect(-60, -190, 120, 36); c.save(); c.scale(-1, 1); setFontRaw(c, 20); c.fillStyle = '#1a1510'; c.textAlign = 'center'; c.fillText('BOARDING', 0, -112); c.fillText('PASS', 0, -86); c.restore(); }, right: null };
  const bottle = (col) => (c) => { c.fillStyle = '#f7f4ee'; roundRect(c, -34, -250, 68, 250, 10); c.fill(); c.fillStyle = col; c.fillRect(-26, -290, 52, 44); };
  if (i === 1) return { right: bottle('#d98fa0'), left: null };
  const drop = ease(seg(p, 0, 0.7)) * 330;
  return { right: bottle('#c76f9a'), left: (c) => { c.save(); c.translate(0, drop); c.fillStyle = '#16191f'; roundRect(c, -60, -300, 120, 230, 16); c.fill(); c.fillStyle = '#243447'; roundRect(c, -52, -288, 104, 206, 8); c.fill(); setFontRaw(c, 18); c.fillStyle = '#9ad7ff'; c.textAlign = 'center'; c.scale(-1, 1); c.fillText('환율 계산', 0, -230); c.fillText('중...', 0, -204); c.restore(); } };
}

const PIN3 = [[5.4, 0, 14.2], [9.8, 0, 10.7], [19, 0, 4.1]];

function renderAsis3(c) {
  const a = ease(seg(t, 7, 7.8)) * (1 - ease(seg(t, 24.4, 25.2)));
  updatePeople(t, ASIS);
  const z = ease(seg(t, 23, 25)), pp = posAt(ASIS[0].kf, t, true) || { x: 4, y: 13 };
  const cam3 = setIso(1 + 0.12 * ease(seg(t, 7, 23)) + 2.2 * z, 10.5 + (pp.x - 10.5) * z, 9 + (pp.y - 9) * z);
  renderGL(cam3);
  PINS.forEach((pin, i) => { const sp = toScreen(new THREE.Vector3(...PIN3[i]), cam3); drawPin(ctx, t, Object.assign({}, pin, { sx: sp[0], sy: sp[1] }), c.asis.pins[i], t, false, c.modeLabels[c.observationMode]); });
  Object.keys(R3.people).forEach((id) => { const g = R3.people[id]; if (!g.visible) return; const sp = toScreen(new THREE.Vector3(g.position.x, 2.5, g.position.z), cam3); (g.userData.bubbles || []).forEach((b) => { if (t >= b[0] && t <= b[1]) bubble(ctx, t, sp[0], sp[1] + 10, b[2], b[3]); }); });
  drawTag(ctx, c.asis.tag, c.asis.sub, 1);
  drawText(ctx, c.asis.question, 960, 960, { size: 52, weight: 900, align: 'center', maxW: 1700, alpha: fade(t, 7.6, 8.4, 11.6, 12.4) });
  drawText(ctx, c.asis.zoom, 960, 960, { size: 52, weight: 900, align: 'center', maxW: 1700, alpha: fade(t, 22.4, 23.1, 24.4, 25) });
  coverFade(1 - a);
}

function renderStation3(c, i) {
  const T = ST[i]; if (t < T.start || t >= T.end) return;
  const p = ease(seg(t, T.resolve, T.resolve + 2)), pin = panIn(t, T);
  updatePeople(t, []); updateNpcs(t); const cam3 = setFpv(i, t, T);
  R3.persp.setViewOffset(1920, 1080, 400 * pin, 0, 1920, 1080); renderGL(cam3); R3.persp.clearViewOffset();
  drawHands(ctx, t, handsOpts(i, p));
  drawFpvHud(ctx, t, c, i, T); drawDecision(ctx, t, c, i, T); drawSkillBurst(ctx, t, c.stations[i], T); drawPlanPanel(ctx, t, c, i, T, imgs);
  drawGauge(ctx, gaugeAt(t, ST), 1);
  coverFade(Math.max(1 - ease(seg(t, T.start, T.start + 0.6)), ease(seg(t, T.end - 0.5, T.end))));
}

function renderClosing3(c) {
  const a = ease(seg(t, 102, 103));
  updatePeople(t, CLOSING); const cam3 = setIso(1.0, 10.5, 9); renderGL(cam3);
  PINS.forEach((pin, i) => { const sp = toScreen(new THREE.Vector3(...PIN3[i]), cam3); drawPin(ctx, t, Object.assign({}, pin, { show: 102.6 + i * 0.5, sx: sp[0], sy: sp[1] }), c.stations[i].result, t, true, c.modeLabels[c.observationMode]); });
  drawTag(ctx, '가설', '하나씩 확인해 본 매장', 1); drawGauge(ctx, gaugeAt(t, ST), 1); drawProgress(ctx, t, ST, 1);
  coverFade(1 - a); drawClosing(ctx, t, c);
}

function render() {
  if (R3.ok) { applyState(t, ST); const in3d = (t >= 7 && t < 25.2) || (t >= 36 && t < 113); if (in3d) { ctx.clearRect(0, 0, 1920, 1080); renderMode3(content); return; } }
  renderMode2();
}

function renderMode3(c) {
  if (t < 25.2) renderAsis3(c); else [0, 1, 2].forEach((i) => renderStation3(c, i));
  if (t >= SCENE.closing[0]) renderClosing3(c);
  if (showDebug) drawText(ctx, t.toFixed(2) + ' 초', 1880, 1040, { size: 28, color: COL.amber, align: 'right' });
}

function renderMode2() {
  const c = content;
  backdrop();
  if (t < 7.2) drawHook(ctx, t, c);
  renderAsis(c);
  if (t >= SCENE.stat[0] && t < SCENE.stat[1]) { backdrop(); drawCharacterCard(ctx, t, c); }
  [0, 1, 2].forEach((i) => renderStation(c, i));
  renderClosing(c);
  if (showDebug) drawText(ctx, t.toFixed(2) + ' 초', 1880, 1040, { size: 28, color: COL.amber, align: 'right' });
  if (!playing && t === 0) drawText(ctx, '스페이스를 누르면 시작합니다', 960, 1020, { size: 30, color: COL.dim, align: 'center' });
}

function resetSounds() { soundIdx = sounds.findIndex((s) => s.t > t); if (soundIdx < 0) soundIdx = sounds.length; }

let T = 0;

function fireVoice(i) { if (!playLine({ idx: i }) && !content.narration.lines[i][2]) speak(content.narration.lines[i][1], content.narration.rate); }

function tick(now) {
  const dt = last ? Math.min((now - last) / 1000, 0.1) : 0; last = now;
  if (playing) {
    const prev = T; T = Math.min(WARP.endReal, T + dt);
    // 소리가 나는 동안에는 소리의 재생 위치를 기준으로 삼아 화면이 소리보다 앞서가지 않게 합니다
    for (let i = WARP.starts.length - 1; i >= 0; i--) { const st = WARP.starts[i], c = VOICE.clips[i]; if (isFinite(st) && T >= st) { if (c && !c.paused && !c.ended && c.currentTime > 0.02) { const tr = trimOf(i); T = Math.min(WARP.endReal, st + c.currentTime - (tr ? tr[0] : 0)); } break; } }
    t = Math.min(END, warpT(T));
    WARP.starts.forEach((st, i) => { if (prev < st && st <= T) fireVoice(i); });
    while (soundIdx < sounds.length && sounds[soundIdx].t <= t) { const ev = sounds[soundIdx++]; playSound(ev.type, ev); }
    if (T >= WARP.endReal) { playing = false; syncDrumFile(t, false); setTimeout(stopSpeech, 4000); }
  }
  render(); requestAnimationFrame(tick);
}

function togglePlay() {
  if (T >= WARP.endReal) { T = 0; t = 0; resetSounds(); }
  playing = !playing; initAudio(content.audio.drumFile);
  syncDrumFile(t, playing); if (!playing) stopSpeech();
}

function restart() { T = 0; t = 0; playing = false; syncDrumFile(0, false); stopSpeech(); resetSounds(); }

addEventListener('keydown', (e) => {
  if (e.code === 'Space') { e.preventDefault(); togglePlay(); }
  else if (e.key === 'r' || e.key === 'R') restart();
  else if (e.key === 'd' || e.key === 'D') showDebug = !showDebug;
  else if (e.key === 'n' || e.key === 'N') toggleVoice();
});
addEventListener('resize', fitCanvas);

const ALL_TEXT = JSON.stringify(content) + ' 입사 후 개월 이후 탈출률 기획 결정';
['400 30px "Noto Sans KR"', '700 30px "Noto Sans KR"', '900 30px "Noto Sans KR"', '40px "Black Han Sans"'].forEach((f) => { try { document.fonts.load(f, ALL_TEXT); } catch (e) { /* 글꼴을 못 불러오면 기본 글꼴로 나옵니다 */ } });
ST = content.stations.map((s, i) => stationTimes(i, s.wrongPick !== null));
imgs = content.stations.map((s) => { const im = new Image(); im.src = s.exp.photo.src; return im; });
sounds = buildSounds(ST, !content.audio.drumFile, content.narration).filter((e) => e.type !== 'voice'); resetSounds(); buildWarp(END);
if (params.get('autostart') === '1') playing = true;
loadVoiceClips(content.narration.lines.length); initThree(); fitCanvas(); requestAnimationFrame(tick);
window.__game = { get t() { return t; }, set t(v) { t = v; resetSounds(); }, END, WARP, VOICE };
