// 메인 프로젝트 탭과 왼쪽 프로젝트 목록.
// 메인 프로젝트는 탭으로 하나씩 보여 주고, 왼쪽 목록에는 메인과 사이드 프로젝트를 모두 띄워
// 빠르게 내려도 프로젝트가 여러 개라는 것이 보이게 한다.
var mainSel = 0;

// 사이트마다 정한 순서(edition.projectOrder)로 메인 프로젝트를 늘어놓는다
function mainList() {
  var list = (window.SITE_MAIN || []).slice(), order = E.projectOrder || [];
  return list.sort(function (a, b) {
    var x = order.indexOf(a.id), y = order.indexOf(b.id);
    return (x < 0 ? 99 : x) - (y < 0 ? 99 : y);
  });
}
function mainName(m) { return L(m.name || m.short || m.title); }

// 탭을 바꿔도 레이아웃이 그대로이도록, 모든 카드의 머리 영역 높이를 가장 긴 카드에 맞춘다
function equalizeTops() {
  var arts = Array.prototype.slice.call(document.querySelectorAll("#main-projects .mc"));
  var tops = arts.map(function (a) { return a.querySelector(".mc-top"); });
  var was = arts.map(function (a) { return a.hidden; });
  tops.forEach(function (h) { if (h) h.style.minHeight = ""; });
  arts.forEach(function (a) { a.hidden = false; });
  var max = 0; tops.forEach(function (h) { if (h) max = Math.max(max, h.offsetHeight); });
  arts.forEach(function (a, i) { a.hidden = was[i]; });
  tops.forEach(function (h) { if (h) h.style.minHeight = max + "px"; });
}
var eqTimer = null;
window.addEventListener("resize", function () { clearTimeout(eqTimer); eqTimer = setTimeout(equalizeTops, 150); });
if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { equalizeTops(); });

function showMain(i, scroll) {
  var list = mainList();
  mainSel = i;
  list.forEach(function (m, k) {
    var art = document.getElementById("mc-" + m.id), tb = document.getElementById("mtab-" + m.id);
    if (art) art.hidden = k !== i;
    if (tb) { tb.setAttribute("aria-selected", String(k === i)); tb.tabIndex = k === i ? 0 : -1; }
  });
  renderIndex();
  if (scroll) document.getElementById("main-projects").scrollIntoView({ behavior: "smooth", block: "start" });
}
function goShelf(id) {
  if (id) { shelf.tab = "all"; shelf.sel = id; renderShelf(false); }
  document.querySelector(".shelf-wrap").scrollIntoView({ behavior: "smooth", block: "start" });
}

function mainTab(m, i, list) {
  var b = el("button", "mtab"); b.type = "button"; b.id = "mtab-" + m.id;
  b.setAttribute("role", "tab"); b.setAttribute("aria-controls", "mc-" + m.id);
  b.setAttribute("aria-selected", String(i === mainSel)); b.tabIndex = i === mainSel ? 0 : -1;
  b.appendChild(el("span", "mtab-no mono", String(i + 1).padStart(2, "0")));
  var tx = el("span", "mtab-tx");
  tx.appendChild(el("span", "mtab-name", mainName(m)));
  tx.appendChild(el("span", "mtab-sub mono", m.period || ""));
  b.appendChild(tx);
  b.addEventListener("click", function () { showMain(i, false); });
  b.addEventListener("keydown", function (e) {
    var d = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!d) return;
    e.preventDefault(); var j = (i + d + list.length) % list.length; showMain(j, false);
    document.getElementById("mtab-" + list[j].id).focus();
  });
  return b;
}
function renderMainTabs(list) {
  var bar = el("div", "mtabs");
  var tl = el("div", "mtab-list"); tl.setAttribute("role", "tablist"); tl.setAttribute("aria-label", t("ptab.label"));
  list.forEach(function (m, i) { tl.appendChild(mainTab(m, i, list)); });
  bar.appendChild(tl);
  var side = el("button", "mtab-side"); side.type = "button";
  side.appendChild(el("span", "mono accent", "+" + P.length));
  side.appendChild(el("span", null, t("ptab.side")));
  side.addEventListener("click", function () { goShelf(null); });
  bar.appendChild(side);
  return bar;
}

function indexGroup(nav, head, items) {
  nav.appendChild(el("span", "pindex-h mono", head));
  var ol = el("ol", "pindex-list");
  items.forEach(function (it) {
    var li = el("li"), b = el("button", "pindex-btn" + (it.on ? " on" : "")); b.type = "button";
    if (it.on) b.setAttribute("aria-current", "true");
    b.appendChild(el("span", "mono", it.no)); b.appendChild(el("span", null, it.name));
    b.addEventListener("click", it.go);
    li.appendChild(b); ol.appendChild(li);
  });
  nav.appendChild(ol);
}
function renderIndex() {
  var nav = document.getElementById("pindex"); if (!nav) return;
  var list = mainList();
  nav.textContent = "";
  nav.appendChild(el("p", "pindex-sum", t("ptab.sum", { m: list.length, s: P.length })));
  indexGroup(nav, t("ptab.mainH"), list.map(function (m, i) {
    return { no: String(i + 1).padStart(2, "0"), name: mainName(m), on: i === mainSel, go: function () { showMain(i, true); } };
  }));
  indexGroup(nav, t("ptab.sideH"), P.slice().reverse().map(function (p, i) {
    return { no: String(i + 1).padStart(2, "0"), name: L(p.title), on: false, go: function () { goShelf(p.id); } };
  }));
}
