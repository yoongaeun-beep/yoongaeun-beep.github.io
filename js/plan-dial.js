// 프로젝트 카드의 기획 흐름 다이얼(캔버스 시안 C 확정 2026-11-23).
// 왼쪽 원호 위의 숫자(01 발견 ~ 05 확인)에 마우스를 올리거나 누르면 원호가 돌고, 가운데 설명과 오른쪽 사진이 바뀐다.
// 예전 큰 다이얼의 느낌은 살리고 높이는 절반으로 줄였다. 내가 중점으로 맡은 단계는 숫자를 포인트색으로 표시한다.
var PLAN_KEYS = ["plan.find", "plan.real", "plan.lens", "plan.fix", "plan.check"];
var DIAL = { cx: -170, cy: 190, r: 290, step: 0.4 };

function planDial(m) {
  var plan = m.plan, box = el("section", "pd"), active = firstMine(plan);
  var arc = el("div", "pd-arc");
  arc.appendChild(el("span", "pd-ring"));
  var orbs = plan.map(function (s, i) {
    var b = el("button", "pd-orb mono" + (s.mine ? " mine" : ""), String(i + 1).padStart(2, "0")); b.type = "button";
    b.setAttribute("aria-label", t(PLAN_KEYS[i]) + " " + L(s.t));
    b.addEventListener("mouseenter", function () { go(i); });
    b.addEventListener("focus", function () { go(i); });
    b.addEventListener("click", function () { go(i); });
    arc.appendChild(b);
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
    active = i;
    orbs.forEach(function (b, k) {
      var th = (k - i) * DIAL.step;
      b.style.left = Math.round(DIAL.cx + DIAL.r * Math.cos(th)) + "px";
      b.style.top = Math.round(DIAL.cy + DIAL.r * Math.sin(th)) + "px";
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
  box.appendChild(el("p", "pd-title", L(s.t)));
  box.appendChild(el("p", "pd-line", L(s.line || s.d)));
  if (s.key) box.appendChild(el("span", "pd-key mono", L(s.key)));
}
function fillDialShot(box, s, m) {
  var src = s.img || ((m.images || [])[0] || {}).src;
  box.textContent = ""; box.hidden = !src;
  if (!src) return;
  var im = el("img", "fade"); im.src = src; im.alt = L(s.t); im.loading = "lazy";
  im.addEventListener("click", function () { openImage(src, L(s.t)); });
  box.appendChild(im);
}
