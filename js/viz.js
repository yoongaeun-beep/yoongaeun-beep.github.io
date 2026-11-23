// 사례별 작은 도식(기획 방식 패널 오른쪽). 데이터는 notes.js의 viz.
// ratio: 칸 n개 중 hit개 칠하기 / flow: 단계 칩을 잇고 사람이 승인하는 칸(gate) 표시 / compare: 가로 막대 비교 / verdict: 가설별 판정
function renderViz(v) {
  var box = el("figure", "viz");
  if (!v) return box;
  if (v.cap) box.appendChild(el("figcaption", "viz-cap", L(v.cap)));
  var body = ({ ratio: vizRatio, flow: vizFlow, compare: vizCompare, verdict: vizVerdict })[v.type];
  if (body) box.appendChild(body(v));
  if (v.note) box.appendChild(el("p", "viz-note", L(v.note)));
  return box;
}
function vizRatio(v) {
  var w = el("div", "viz-ratio");
  var cells = el("div", "viz-cells");
  for (var i = 0; i < v.n; i++) { var c = el("i", i < v.hit ? "on" : null); c.style.animationDelay = (i * 0.12) + "s"; cells.appendChild(c); }
  w.appendChild(cells);
  w.appendChild(el("b", "viz-big mono", L(v.big)));
  return w;
}
function vizFlow(v) {
  var ol = el("ol", "viz-flow");
  (v.steps[lang] || v.steps.ko).forEach(function (s, i) {
    var li = el("li", i === v.gate ? "gate" : null, s);
    li.style.animationDelay = (i * 0.1) + "s";
    ol.appendChild(li);
  });
  return ol;
}
function vizCompare(v) {
  var ul = el("ul", "viz-compare");
  v.items.forEach(function (x, i) {
    var li = el("li", i === 0 ? "lead" : null);
    li.appendChild(el("span", "viz-l", L(x.l)));
    var track = el("span", "viz-track"), fill = el("i"); fill.style.width = x.v + "%"; track.appendChild(fill); li.appendChild(track);
    li.appendChild(el("b", "mono", x.v + (v.unit || "")));
    ul.appendChild(li);
  });
  return ul;
}
var VERDICT_W = { strong: 100, ok: 75, part: 45, weak: 15 };
function vizVerdict(v) {
  var ul = el("ul", "viz-compare viz-verdict");
  v.items.forEach(function (x) {
    var li = el("li", "v-" + x.s);
    li.appendChild(el("span", "viz-l mono", x.h));
    var track = el("span", "viz-track"), fill = el("i"); fill.style.width = VERDICT_W[x.s] + "%"; track.appendChild(fill); li.appendChild(track);
    li.appendChild(el("b", null, t("viz." + x.s)));
    ul.appendChild(li);
  });
  return ul;
}
