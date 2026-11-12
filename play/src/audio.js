// 소리: WebAudio로 만든 단순 드럼과 효과음. 외부 파일 없이 동작합니다.
// content.json의 audio.drumFile에 파일 이름을 적으면 직접 친 드럼 음원을 대신 틀 수 있습니다.
let AC = null, noiseBuf = null, drumEl = null;

function initAudio(drumFile) {
  if (!AC) {
    AC = new (window.AudioContext || window.webkitAudioContext)();
    noiseBuf = AC.createBuffer(1, AC.sampleRate * 1.5, AC.sampleRate);
    const d = noiseBuf.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
    if (drumFile) drumEl = new Audio(drumFile);
  }
  if (AC.state === 'suspended') AC.resume();
}

function envGain(vol, dur) {
  const g = AC.createGain(), n = AC.currentTime;
  g.gain.setValueAtTime(vol, n); g.gain.exponentialRampToValueAtTime(0.001, n + dur);
  g.connect(AC.destination); return g;
}

function beep(type, f0, f1, vol, dur) {
  const o = AC.createOscillator(), n = AC.currentTime;
  o.type = type; o.frequency.setValueAtTime(f0, n);
  if (f1) o.frequency.exponentialRampToValueAtTime(f1, n + dur);
  o.connect(envGain(vol, dur)); o.start(n); o.stop(n + dur + 0.05);
}

function noise(vol, dur, hp) {
  const s = AC.createBufferSource(), f = AC.createBiquadFilter();
  s.buffer = noiseBuf; f.type = 'highpass'; f.frequency.value = hp;
  s.connect(f); f.connect(envGain(vol, dur)); s.start(); s.stop(AC.currentTime + dur + 0.05);
}

const SOUNDS = {
  kick: () => beep('sine', 150, 45, 0.4, 0.28),
  snare: () => { noise(0.2, 0.16, 1500); beep('triangle', 200, 120, 0.14, 0.12); },
  crash: () => { noise(0.8, 1.3, 3000); beep('sine', 150, 45, 1, 0.35); },
  ding: () => { beep('sine', 880, null, 0.28, 0.7); beep('sine', 1320, null, 0.16, 0.7); },
  key: () => beep('square', 660, 880, 0.1, 0.09),
  wrong: () => beep('sawtooth', 220, 110, 0.18, 0.3),
  swoosh: () => noise(0.25, 0.5, 2500),
};

function playSound(type, ev) {
  if (type === 'voice') { if (!playLine(ev)) speak(ev.text, ev.rate); return; }
  if (!AC) return;
  if (drumEl && (type === 'kick' || type === 'snare' || type === 'crash')) return;
  if (SOUNDS[type]) SOUNDS[type]();
}

function syncDrumFile(t, playing) {
  if (!drumEl) return;
  if (!playing) { drumEl.pause(); return; }
  drumEl.currentTime = t; drumEl.play().catch(() => {});
}

// 나레이션: 브라우저에 내장된 한국어 음성 합성을 씁니다(설치할 것 없음). 엣지 브라우저의 자연스러운 목소리가 가장 좋습니다
let koVoice = null, voiceOn = new URLSearchParams(location.search).get('voice') !== '0';

function pickVoice() {
  if (!('speechSynthesis' in window)) return;
  const vs = speechSynthesis.getVoices().filter((v) => v.lang && v.lang.toLowerCase().startsWith('ko'));
  koVoice = vs.find((v) => /natural|online/i.test(v.name)) || vs.find((v) => /sun-?hi|heami|yuna/i.test(v.name)) || vs[0] || null;
}
if ('speechSynthesis' in window) { speechSynthesis.onvoiceschanged = pickVoice; pickVoice(); }

function speak(text, rate) {
  if (!voiceOn || !('speechSynthesis' in window)) return;
  speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text); u.lang = 'ko-KR'; u.rate = rate || 1.05;
  if (koVoice) u.voice = koVoice;
  speechSynthesis.speak(u);
}

function stopSpeech() { if ('speechSynthesis' in window) speechSynthesis.cancel(); if (typeof VOICE !== 'undefined') VOICE.clips.forEach((c) => { if (c) c.pause(); }); }
function toggleVoice() { voiceOn = !voiceOn; if (!voiceOn) stopSpeech(); }

// 본인 목소리 녹음 파일: assets/voice/01 ~ 12 (webm, mp3, m4a, wav, ogg 어느 것이든). 있으면 음성 합성 대신 이 파일을 틉니다
const VOICE = { clips: [], dur: [], exts: ['webm', 'mp3', 'm4a', 'wav', 'ogg'] };

function probeClip(i, k) {
  if (k >= VOICE.exts.length) return;
  const a = new Audio(); a.preload = 'auto';
  a.addEventListener('loadedmetadata', () => {
    VOICE.clips[i] = a;
    if (a.duration === Infinity) { a.currentTime = 1e101; a.ontimeupdate = () => { a.ontimeupdate = null; VOICE.dur[i] = a.duration; a.currentTime = 0; scheduleWarp(); }; }
    else { VOICE.dur[i] = a.duration; scheduleWarp(); }
  });
  a.addEventListener('error', () => probeClip(i, k + 1));
  a.src = 'assets/voice/' + String(i + 1).padStart(2, '0') + '.' + VOICE.exts[k];
}

function loadVoiceClips(n) { for (let i = 0; i < n; i++) probeClip(i, 0); }

function stopClips() { VOICE.clips.forEach((c) => { if (c) c.pause(); }); }

function playLine(ev) {
  stopClips(); stopSpeech();
  const c = VOICE.clips[ev.idx];
  if (c && voiceOn) { const tr = trimOf(ev.idx); c.currentTime = tr ? tr[0] : 0; c.play().catch(() => {}); return true; }
  return false;
}

// 녹음 길이에 맞춘 시계: 실제 재생 시간 T를 원래 장면 시간 t로 바꿔 줍니다. 문장 시작마다 장면 기준 시각과 맞물립니다
const WARP = { pts: [[0, 0]], starts: [], endReal: 0, active: false };
let warpTimer = 0;

function estDur(i) { const L = CONTENT.narration.lines[i][1] || ''; return L.replace(/[\s\.,\?!]/g, '').length / 5.6 / (CONTENT.narration.rate || 1); }
function trimOf(i) { const t = CONTENT.narration.trim; return t && t[i] && VOICE.clips[i] ? t[i] : null; }
function clipDur(i) { const tr = trimOf(i); if (tr) return tr[1] - tr[0]; return VOICE.dur[i] && isFinite(VOICE.dur[i]) ? VOICE.dur[i] : estDur(i); }

function buildWarp(end) {
  const L = CONTENT.narration.lines;
  if (!VOICE.clips.some(Boolean)) { WARP.active = false; WARP.endReal = end; WARP.starts = L.map((l) => l[0]); WARP.pts = [[0, 0], [end, end]]; return; }
  // 정답이 나오는 문장(6, 8, 10번) 앞에는 스킬 발동 연출이 들어갈 쉼을 조금 더 둡니다
  const BEFORE = { 5: 2.0, 7: 2.0, 9: 2.0 }; let r = 0.6; const pts = [[0, 0]]; WARP.starts = [];
  L.forEach(([a, tx, only], i) => {
    if (only && !VOICE.clips[i]) { WARP.starts.push(Infinity); return; }
    WARP.starts.push(r); pts.push([r, a]);
    if (typeof ST !== 'undefined' && ST.length && (i === 4 || i === 6 || i === 8)) { const si = (i - 4) / 2; pts.push([r + clipDur(i) + 0.3, ST[si].resolve]); }
    r += clipDur(i) + (BEFORE[i + 1] || 0.6);
  });
  const closing = L.length > 11 && VOICE.clips[L.length - 1]; WARP.endReal = r + (closing ? 0.6 : 2.2); pts.push([WARP.endReal, end]); pts.sort((x, y) => x[0] - y[0]); WARP.pts = pts; WARP.active = true;
}

function scheduleWarp() { clearTimeout(warpTimer); warpTimer = setTimeout(() => buildWarp(END), 400); }

function warpT(T) {
  const p = WARP.pts;
  for (let i = 0; i < p.length - 1; i++) if (T >= p[i][0] && T <= p[i + 1][0]) return p[i][1] + (p[i + 1][1] - p[i][1]) * (T - p[i][0]) / (p[i + 1][0] - p[i][0]);
  return p[p.length - 1][1];
}
