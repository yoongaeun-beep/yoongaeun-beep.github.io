// 프로젝트 카드의 기획 흐름 다이얼(캔버스 시안 C 확정 2026-11-23).
// 왼쪽 원호 위의 숫자(01 발견 ~ 05 확인)에 마우스를 올리거나 누르면 원호가 돌고, 가운데 설명과 오른쪽 사진이 바뀐다.
// 예전 큰 다이얼의 느낌은 살리고 높이는 절반으로 줄였다. 내가 중점으로 맡은 단계는 숫자를 포인트색으로 표시한다.
var PLAN_KEYS = ["plan.find", "plan.real", "plan.lens", "plan.fix", "plan.check"];
// 바퀴(wheel)를 통째로 돌려 숫자가 원호를 따라 미끄러지게 한다. step이 작을수록 앞뒤 단계가 더 많이 보인다
var DIAL = { cx: -170, cy: 190, r: 290, step: 0.3, hoverDelay: 220, lock: 600 };

function planDial(m) {
  var plan = m.plan, box = el("section", "pd"), active = firstMine(plan);
  var arc = el("div", "pd-arc");
  arc.appendChild(el("span", "pd-ring"));
  var wheel = el("div", "pd-wheel"); wheel.style.left = DIAL.cx + "px"; wheel.style.top = DIAL.cy + "px";
  arc.appendChild(wheel);
  var busyUntil = 0, hoverT = null;
  var orbs = plan.map(function (s, i) {
    var b = el("button", "pd-orb mono" + (s.mine ? " mine" : ""), String(i + 1).padStart(2, "0")); b.type = "button";
    b.setAttribute("aria-label", t(PLAN_KEYS[i]) + " " + L(s.t));
    b.style.left = Math.round(DIAL.r * Math.cos(i * DIAL.step)) + "px";
    b.style.top = Math.round(DIAL.r * Math.sin(i * DIAL.step)) + "px";
    // 마우스는 잠깐 머물러야 넘어가고, 도는 동안에는 다른 숫자가 지나가도 무시한다(1에서 5로 건너뛰던 문제)
    b.addEventListener("mouseenter", function () { clearTimeout(hoverT); hoverT = setTimeout(function () { if (Date.now() > busyUntil) go(i); }, DIAL.hoverDelay); });
    b.addEventListener("mouseleave", function () { clearTimeout(hoverT); });
    b.addEventListener("focus", function () { go(i); });
    b.addEventListener("click", function () { go(i); });
    wheel.appendChild(b);
    return b;
  });
  arc.appendChild(el("span", "pd-hint", t("main.dialHint")));
  var text = el("div", "pd-text"), shot = el("figure", "pd-shot");
  // 휴대폰에서는 원호 대신 번호 버튼 줄로 넘긴다
  var tabs = el("div", "pd-tabs");
  var tabBtns = plan.map(function (s, i) {
    var b = el("button", "pd-tab mono" + (s.mine ? " mine" : ""), String(i + 1).padStart(2, "0") + " " + t(PLAN_KEYS[i])); b.type = "button";
    b.addEventListener("click", function () { go(i); });
    tabs.appendChild(b); return b;
  });
  box.appendChild(arc); box.appendChild(tabs); box.appendChild(text); box.appendChild(shot);

  function go(i) {
    if (i === active && wheel.style.transform) return;
    active = i; busyUntil = Date.now() + DIAL.lock;
    var rad = -i * DIAL.step;
    wheel.style.transform = "rotate(" + rad + "rad)";
    orbs.forEach(function (b, k) {
      b.style.transform = "translate(-50%, -50%) rotate(" + (-rad) + "rad)";
      b.classList.toggle("on", k === i);
      b.style.opacity = Math.abs(k - i) > 2 ? "0.25" : "1";
      b.setAttribute("aria-pressed", String(k === i));
    });
    tabBtns.forEach(function (b, k) { b.setAttribute("aria-pressed", String(k === i)); });
    fillDialText(text, plan[i], i);
    fillDialShot(shot, plan[i], m);
  }
  go(active);
  return box;
}
function firstMine(plan) { for (var i = 0; i < plan.length; i++) if (plan[i].mine) return i; return 0; }

function fillDialText(box, s, i) {
  box.textContent = ""; box.classList.remove("fade"); void box.offsetWidth; box.classList.add("fade");
  var top = el("div", "pd-top");
  top.appendChild(el("span", "pd-tag mono", String(i + 1).padStart(2, "0") + "  " + t(PLAN_KEYS[i])));
  if (s.mine) top.appendChild(el("span", "pd-mine", t("plan.mineBadge")));
  box.appendChild(top);
  box.appendChild(dialProgress(i));
  box.appendChild(el("p", "pd-title", L(s.t)));
  box.appendChild(rich("p", "pd-line", L(s.line || s.d)));
  if (s.key) box.appendChild(el("span", "pd-key mono", L(s.key)));
}
function fillDialShot(box, s, m) {
  var src = s.img || ((m.images || [])[0] || {}).src;
  box.textContent = ""; box.hidden = !src;
  if (!src) return;
  var im = el("img", "fade"); im.src = src; im.alt = L(s.t);
  im.addEventListener("click", function () { openImage(src, L(s.t)); });
  box.appendChild(im);
  box.appendChild(shotCaption(src, m));
}
// 사진 아래 주석: 실제 앱 화면인지 발표 자료인지 먼저 밝히고, 무엇을 찍은 화면인지 한 줄로 적는다
function shotCaption(src, m) {
  var deck = /\/deck-/.test(src);
  var cap = el("figcaption", "pd-cap");
  cap.appendChild(el("span", "pd-cap-k mono" + (deck ? " deck" : ""), t(deck ? "shot.deck" : "shot.app")));
  var hit = (m.images || []).concat(m.samples || []).filter(function (x) { return x.src === src; })[0];
  if (hit) cap.appendChild(el("span", null, L(hit.alt)));
  return cap;
}
// 단계 구분 막대: 5칸 중 지금 단계까지 채워, 01에서 02로 넘어갈 때 단계가 바뀌었다는 것이 또렷하게 보이게 한다
function dialProgress(i) {
  var bar = el("div", "pd-prog");
  PLAN_KEYS.forEach(function (k, n) {
    var seg = el("span", n < i ? "done" : n === i ? "on" : null);
    seg.appendChild(el("i", "mono", String(n + 1).padStart(2, "0"))); seg.title = t(k);
    bar.appendChild(seg);
  });
  return bar;
}
