// 걸어온 길(캔버스 시안 C 확정 2026-11-23): 한 칸이 한 달인 한 줄 달력.
// 그달에 한 일을 모두 칠하고, 여러 일이 겹치면 칸을 위아래로 나눠 각 색을 칠한다(경력, 교육, 활동, 재학 순).
// 칸에 마우스를 올리거나 누르면 아래에 그달 한 일이 기간과 함께 나온다.
// 계산(timelineMonths)은 화면을 모르는 순수 함수, 그리기(renderTimeline)는 따로 둔다.
var TL_ORDER = ["work", "train", "act", "edu"];
var tlSel = null;

function monthIndex(ym) { var p = String(ym).split("-"); return Number(p[0]) * 12 + Number(p[1]) - 1; }
function monthLabel(m) { return Math.floor(m / 12) + "." + String(m % 12 + 1).padStart(2, "0"); }

function timelineMonths(items, from) {
  var start = monthIndex(from), end = -Infinity;
  items.forEach(function (x) { end = Math.max(end, monthIndex(x.to)); });
  var months = [];
  for (var m = start; m <= end; m++) {
    var on = items.filter(function (x) { return m >= monthIndex(x.from) && m <= monthIndex(x.to); })
      .sort(function (a, b) { return TL_ORDER.indexOf(a.lane) - TL_ORDER.indexOf(b.lane); });
    months.push({ m: m, items: on, now: on.some(function (x) { return x.now && m === monthIndex(x.to); }) });
  }
  // 연도 칸 너비는 그해 달 수만큼(마지막 해는 지금 달까지)
  var years = [];
  for (var y = Math.floor(start / 12); y <= Math.floor(end / 12); y++) years.push({ y: y, n: Math.min(end, y * 12 + 11) - Math.max(start, y * 12) + 1 });
  return { months: months, years: years };
}

function renderTimeline() {
  var box = document.getElementById("timeline"); if (!box) return;
  box.textContent = "";
  var tm = timelineMonths(forEdition(D.timeline), D.timelineFrom);
  var wrap = el("div", "tlm");
  var yrs = el("div", "tlm-years mono");
  yrs.style.gridTemplateColumns = tm.years.map(function (y) { return y.n + "fr"; }).join(" ");
  tm.years.forEach(function (y) { yrs.appendChild(el("span", null, String(y.y))); });
  wrap.appendChild(yrs);
  var row = el("div", "tlm-row");
  var detail = el("div", "tlm-detail");
  if (tlSel == null) tlSel = tm.months.length - 1;
  tm.months.forEach(function (mo, i) {
    var c = el("button", "tlm-cell" + (mo.now ? " now" : "")); c.type = "button";
    c.setAttribute("aria-label", monthLabel(mo.m) + " " + mo.items.map(function (x) { return L(x.label); }).join(", "));
    (mo.items.length ? mo.items : [null]).forEach(function (x) { c.appendChild(el("span", x ? "tlm-" + x.lane : "tlm-none")); });
    c.style.transitionDelay = (i * 6) + "ms";
    function pick() { tlSel = i; fillTimelineDetail(detail, tm.months[i]); row.querySelectorAll(".tlm-cell").forEach(function (b, k) { b.classList.toggle("sel", k === i); }); }
    c.addEventListener("mouseenter", pick); c.addEventListener("focus", pick); c.addEventListener("click", pick);
    if (i === tlSel) c.classList.add("sel");
    row.appendChild(c);
  });
  wrap.appendChild(row);
  box.appendChild(wrap);
  box.appendChild(detail);
  fillTimelineDetail(detail, tm.months[tlSel]);
  box.appendChild(timelineLegend());
}
function fillTimelineDetail(box, mo) {
  box.textContent = "";
  box.appendChild(el("span", "tlm-ym mono", monthLabel(mo.m)));
  var ul = el("ul", "tlm-items");
  mo.items.forEach(function (x) {
    var li = el("li"); li.appendChild(el("i", "tlm-" + x.lane));
    li.appendChild(el("b", null, L(x.label)));
    li.appendChild(el("span", "mono", dot(x.from) + " ~ " + (x.now ? t("tl.now") : dot(x.to))));
    ul.appendChild(li);
  });
  box.appendChild(ul);
}
function timelineLegend() {
  var ul = el("ul", "tl1-legend");
  ["work", "train", "act", "edu"].forEach(function (k) { var li = el("li"); li.appendChild(el("i", "tlm-" + k)); li.appendChild(document.createTextNode(t("tl." + k))); ul.appendChild(li); });
  ul.appendChild(el("li", "tl1-hint", t("tl.hint")));
  return ul;
}
