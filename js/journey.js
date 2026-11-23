// LS Jump Up 여정: 위에 단계 6칸 한 줄(기간, 제목), 아래에 고른 단계의 배운 것 / 달라진 점과 증거 / 나·팀·Claude.
// 단계에 마우스를 올리거나 누르면 아래가 바뀐다. 프로젝트3처럼 아직인 단계는 점선으로 둔다.
var jrSel = null;

function renderJourney() {
  var J = window.SITE_JOURNEY, box = document.getElementById("journey");
  if (!box || !J) return;
  box.textContent = "";
  var stages = J.stages;
  if (jrSel == null) jrSel = lastDone(stages);
  var ol = el("ol", "jr-line"), detail = el("div", "jr-detail");
  var btns = stages.map(function (s, i) {
    var b = el("button", "jr-step" + (s.pending ? " pending" : "")); b.type = "button";
    b.appendChild(el("span", "jr-no mono", String(i + 1).padStart(2, "0")));
    b.appendChild(el("span", "jr-period mono", s.period));
    b.appendChild(el("b", null, L(s.title)));
    function pick() { jrSel = i; btns.forEach(function (x, k) { x.setAttribute("aria-pressed", String(k === i)); }); fillJourney(detail, s); }
    b.addEventListener("mouseenter", pick); b.addEventListener("focus", pick); b.addEventListener("click", pick);
    b.setAttribute("aria-pressed", String(i === jrSel));
    var li = el("li"); li.appendChild(b); ol.appendChild(li);
    return b;
  });
  box.appendChild(ol); box.appendChild(detail);
  fillJourney(detail, stages[jrSel]);
  box.appendChild(journeyFoot(J));
}
function lastDone(stages) { for (var i = stages.length - 1; i >= 0; i--) if (!stages[i].pending) return i; return 0; }

function fillJourney(box, s) {
  box.textContent = ""; box.classList.remove("fade"); void box.offsetWidth; box.classList.add("fade");
  var a = el("div", "jr-col");
  a.appendChild(el("span", "jr-k mono", t("jr.learned")));
  a.appendChild(el("p", null, L(s.learned)));
  var b = el("div", "jr-col jr-main");
  b.appendChild(el("span", "jr-k mono", t("jr.changed")));
  b.appendChild(rich("p", "jr-changed", L(s.changed)));
  var proof = (s.proof && s.proof[lang]) || [];
  if (proof.length) {
    var ul = el("ul", "jr-proof");
    proof.forEach(function (p) { ul.appendChild(el("li", "mono", p)); });
    b.appendChild(ul);
  }
  b.appendChild(journeyLink(s));
  box.appendChild(a); box.appendChild(b);
  if (s.mine) box.appendChild(journeySplit(s));
}
function journeySplit(s) {
  var dl = el("dl", "jr-split");
  [["mine", "split.mine"], ["team", "split.team"], ["ai", "split.ai"]].forEach(function (k) {
    dl.appendChild(el("dt", "mono", t(k[1]))); dl.appendChild(el("dd", null, L(s[k[0]])));
  });
  return dl;
}
// 프로젝트 카드나 노트로 바로 가는 버튼
function journeyLink(s) {
  var wrap = el("div", "jr-go");
  if (s.project) {
    var i = mainList().map(function (m) { return m.id; }).indexOf(s.project);
    if (i >= 0) { var b = el("button", "jr-open", t("jr.toProject")); b.type = "button"; b.addEventListener("click", function () { showMain(i, true); }); wrap.appendChild(b); }
  }
  (s.notes || []).slice(0, 1).forEach(function (id) {
    var b = el("button", "jr-open", t("jr.toNotes")); b.type = "button";
    b.addEventListener("click", function () { goShelf(id); }); wrap.appendChild(b);
  });
  return wrap;
}
function journeyFoot(J) {
  var f = el("div", "jr-foot");
  f.appendChild(el("span", "jr-k mono", t("jr.next")));
  f.appendChild(rich("p", "jr-next", L(J.next)));
  var acts = el("div", "jr-acts");
  var cv = el("a", "btn btn-primary", t("jr.resume")); cv.href = "resume.pdf"; cv.setAttribute("download", "윤가은_이력서.pdf"); acts.appendChild(cv);
  f.appendChild(acts);
  return f;
}
