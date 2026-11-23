// 움직임: 섹션이 아래에서 떠오르기, 숫자 올라가기, 타임라인 막대 자라기, 기획 흐름 칸 차례로 켜기, 세로 리프레임 사례 켜기.
// '움직임 줄이기'를 켠 사용자에게는 아무것도 하지 않는다. 내용은 JS가 없어도 보이고, 이 파일은 꾸밈만 더한다.
var motionObs = null;
function reducedMotion() { return !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches); }

function initMotion() {
  if (reducedMotion() || !("IntersectionObserver" in window)) return;
  if (motionObs) motionObs.disconnect();
  motionObs = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      motionObs.unobserve(e.target);
      playIn(e.target);
    });
  }, { threshold: 0, rootMargin: "0px 0px -12% 0px" }); // 아주 긴 섹션(리프레임)도 들어오자마자 보이게
  document.querySelectorAll(".section, .hl-card, .fig, .pm, .tl1, .tlm").forEach(function (n) {
    if (n.classList.contains("in")) return;
    n.classList.add("rv");
    motionObs.observe(n);
  });
  document.querySelectorAll(".hero-line em").forEach(function (n, i) { n.style.setProperty("--d", (0.35 + i * 0.25) + "s"); n.classList.add("sweep"); });
}

function playIn(n) {
  n.classList.add("in");
  if (n.classList.contains("pm")) n.querySelectorAll(".pm-step").forEach(function (s, i) { s.style.setProperty("--d", (i * 0.16) + "s"); });
  if (n.classList.contains("rf-panel")) n.classList.add("on");
  n.querySelectorAll(".hl-v, .fig-n, .mc-v").forEach(countUp);
  if (n.matches(".hl-card, .fig")) n.querySelectorAll(".hl-v, .fig-n").forEach(countUp);
}

// 글자 속 첫 정수만 0부터 올린다(예: '536개', '연 100팀+'). 소수나 범위(0.88~0.94)는 그대로 둔다
function countUp(n) {
  var text = n.textContent, m = text.match(/^(\D*)(\d{1,4})(\D.*)?$/);
  if (!m || /[.~]/.test(text) || n.dataset.counted) return;
  n.dataset.counted = "1";
  var end = Number(m[2]), pre = m[1], post = m[3] || "", t0 = null, dur = 900;
  function frame(ts) {
    if (!t0) t0 = ts;
    var k = Math.min(1, (ts - t0) / dur), eased = 1 - Math.pow(1 - k, 3);
    n.textContent = pre + Math.round(end * eased) + post;
    if (k < 1) requestAnimationFrame(frame); else n.textContent = text;
  }
  requestAnimationFrame(frame);
}
