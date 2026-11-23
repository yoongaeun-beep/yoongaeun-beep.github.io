// 기획 방식(시그니처, 캔버스 시안 B 확정 2026-11-23): 전과 후 대비.
// 위: 한 줄 주장. 가운데: BEFORE(처음 생각한 문제, 줄 그어짐) → AFTER(진짜 문제와 그래서 정한 것의 도식).
// 아래: 사례 5개 줄(누르면 바뀜, 핵심 숫자 한 줄). 7초마다 다음 사례로 넘어가고, 마우스를 올리면 멈춘다.
var rf = { list: [], idx: 0, timer: null, paused: false };

function reframeCases() {
  var notes = P.filter(isNote);
  return (E.reframe || []).map(function (id) { return notes.filter(function (n) { return n.id === id; })[0]; }).filter(Boolean);
}

function renderReframe() {
  var box = document.getElementById("reframe"); if (!box) return;
  rf.list = reframeCases(); rf.idx = 0;
  box.textContent = ""; box.className = "rfb";
  box.closest("section").hidden = !rf.list.length;
  if (!rf.list.length) return;
  var head = el("div", "rfb-head");
  emph(head.appendChild(el("p", "rfb-claim")), t("rf.claim2"));
  head.appendChild(el("span", "rfb-count mono"));
  box.appendChild(head);
  box.appendChild(el("div", "rfb-stage"));
  box.appendChild(reframeStrip());
  box.onmouseenter = function () { rf.paused = true; };
  box.onmouseleave = function () { rf.paused = false; };
  showReframe(0);
  startReframeTimer();
}

function reframeStrip() {
  var ol = el("ol", "rfb-strip");
  rf.list.forEach(function (c, i) {
    var b = el("button", "rfb-pick"); b.type = "button";
    b.appendChild(el("span", "mono", String(i + 1).padStart(2, "0")));
    b.appendChild(el("b", null, L(c.title)));
    b.appendChild(el("span", "rfb-key mono", L(c.key)));
    b.addEventListener("click", function () { showReframe(i); startReframeTimer(); });
    var li = el("li"); li.appendChild(b); ol.appendChild(li);
  });
  return ol;
}

function showReframe(i) {
  rf.idx = i;
  var box = document.getElementById("reframe"), c = rf.list[i], stage = box.querySelector(".rfb-stage");
  box.querySelector(".rfb-count").textContent = String(i + 1).padStart(2, "0") + " / " + String(rf.list.length).padStart(2, "0") + "  " + L(c.title);
  box.querySelectorAll(".rfb-pick").forEach(function (b, k) { b.setAttribute("aria-current", String(k === i)); });
  stage.classList.remove("on"); stage.textContent = "";
  var before = el("div", "rfb-before");
  before.appendChild(el("span", "rfb-k mono", "BEFORE  " + t("rf.first")));
  var p = el("p", "rfb-first"); p.appendChild(el("span", "rf-strike", L(c.first))); before.appendChild(p);
  before.appendChild(el("p", "rfb-why", L(c.problem)));
  var arrow = el("div", "rfb-arrow");
  arrow.innerHTML = '<svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M4 12h15M13 6l6 6-6 6"/></svg>';
  var after = el("div", "rfb-after");
  after.appendChild(el("span", "rfb-k mono", "AFTER  " + t("rf.real")));
  after.appendChild(el("p", "rfb-real", L(c.real)));
  after.appendChild(renderViz(c.viz));
  var open = el("button", "rfb-open", t("rf.open")); open.type = "button";
  open.addEventListener("click", function () { goShelf(c.id); });
  after.appendChild(open);
  stage.appendChild(before); stage.appendChild(arrow); stage.appendChild(after);
  void stage.offsetWidth; stage.classList.add("on");
}
function startReframeTimer() {
  clearInterval(rf.timer);
  if (reducedMotion()) return;
  rf.timer = setInterval(function () { if (!rf.paused && document.visibilityState === "visible") showReframe((rf.idx + 1) % rf.list.length); }, 7000);
}
