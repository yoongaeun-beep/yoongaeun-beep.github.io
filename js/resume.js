// 이력서 페이지: 사이트와 같은 데이터(data.js, main.js, notes.js, edition.js)로 A4 1~2장을 그린다.
// 사이트마다 edition.js가 달라 첫 줄, 키워드, 프로젝트 순서, AI 작업 사례가 자동으로 그 사이트 강조점을 따른다.
// 문장 순서는 안내서 규칙대로 문제 → 내가 한 일 → 결과. 숫자는 사이트에 이미 확인해 둔 것만 쓴다.
function plain(s) { return String(s || "").replace(/\*/g, ""); }
function cvSection(title) { var s = el("section", "cv-sec"); s.appendChild(el("h2", "cv-h mono", title)); return s; }

function cvHead() {
  var h = el("header", "cv-head");
  h.appendChild(el("h1", null, L(D.name)));
  h.appendChild(el("p", "cv-line", plain(L(E.about && E.about.line))));
  var meta = el("p", "cv-meta mono");
  meta.textContent = [D.email, E.id === "global" ? "yoongaeun-beep.github.io" : "yoongaeun-beep.github.io/global-portfolio"].filter(Boolean).join("   ");
  h.appendChild(meta);
  var kw = el("ul", "cv-kw");
  (E.keywords || (E.hero || {}).keywords || []).forEach(function (k) { kw.appendChild(el("li", null, L(k))); });
  h.appendChild(kw);
  return h;
}

function cvExperience() {
  var s = cvSection(t("cv.exp"));
  D.experience.forEach(function (x) {
    var org = el("div", "cv-org");
    var top = el("div", "cv-row");
    top.appendChild(el("b", null, L(x.org) + "  ·  " + L(x.orgSub)));
    top.appendChild(el("span", "mono", x.period));
    org.appendChild(top);
    x.roles.forEach(function (r) {
      var rr = el("div", "cv-row cv-role");
      rr.appendChild(el("span", null, L(r.role)));
      if (r.period) rr.appendChild(el("span", "mono", r.period));
      org.appendChild(rr);
      var ul = el("ul", "cv-items");
      r.groups.forEach(function (g) {
        forEdition(g.items).forEach(function (it, i) {
          var li = rich("li", null, L(it));
          if (i === 0) li.insertBefore(el("span", "cv-cat", L(g.cat)), li.firstChild);
          ul.appendChild(li);
        });
      });
      org.appendChild(ul);
    });
    s.appendChild(org);
  });
  return s;
}

function cvProjects() {
  var s = cvSection(t("cv.proj"));
  mainList().forEach(function (m) {
    var p = el("div", "cv-org");
    var top = el("div", "cv-row");
    top.appendChild(el("b", null, mainName(m)));
    top.appendChild(el("span", "mono", m.period || ""));
    p.appendChild(top);
    p.appendChild(el("p", "cv-sub", L(m.team)));
    var dl = el("dl", "cv-pdl");
    var first = (m.plan || [])[0];
    var result = (m.stats || []).slice(0, 3).map(function (x) { return L(x.v) + " " + L(x.l).replace(/\n/g, " "); }).join(", ");
    [["cv.problem", first && L(first.line)], ["cv.did", m.split && L(m.split.mine)], ["cv.result", result],
     ["cv.split", m.split && (L(m.split.team) + ". " + L(m.split.ai))]].forEach(function (r) {
      if (!r[1]) return;
      dl.appendChild(el("dt", "mono", t(r[0]))); dl.appendChild(el("dd", null, r[1]));
    });
    p.appendChild(dl);
    s.appendChild(p);
  });
  return s;
}

function cvNotes() {
  var notes = (window.SITE_NOTES || []);
  var picks = (E.reframe || []).map(function (id) { return notes.filter(function (n) { return n.id === id; })[0]; }).filter(Boolean).slice(0, 4);
  if (!picks.length) return null;
  var s = cvSection(t("cv.ai"));
  var ul = el("ul", "cv-items");
  picks.forEach(function (n) {
    var li = el("li"); li.appendChild(el("b", null, L(n.title) + "  ")); li.appendChild(document.createTextNode(plain(L(n.result)))); ul.appendChild(li);
  });
  s.appendChild(ul);
  return s;
}

function cvEdu() {
  var s = cvSection(t("cv.edu"));
  var ul = el("ul", "cv-list");
  function row(a, b, c) { var li = el("li", "cv-row"); var x = el("span"); x.appendChild(el("b", null, a)); if (b) x.appendChild(document.createTextNode("  " + b)); li.appendChild(x); li.appendChild(el("span", "mono", c || "")); ul.appendChild(li); }
  row(L(D.school), L(D.schoolNote), D.schoolPeriod);
  (D.training || []).forEach(function (x) { row(L(x.title), L(x.sub), x.period); });
  (D.certs || []).forEach(function (c) { row(c.name, L(c.note), c.date); });
  s.appendChild(ul);
  return s;
}

function renderResume() {
  document.documentElement.lang = lang;
  document.title = L(D.name) + " " + t("cv.title");
  var box = document.getElementById("cv"); box.textContent = "";
  [cvHead(), cvExperience(), cvProjects(), cvNotes(), cvEdu()].forEach(function (n) { if (n) box.appendChild(n); });
  document.querySelectorAll("[data-i18n]").forEach(function (n) { n.textContent = t(n.getAttribute("data-i18n")); });
  document.querySelectorAll(".cv-lang button").forEach(function (b) { b.setAttribute("aria-pressed", String(b.getAttribute("data-lang") === lang)); });
}

document.getElementById("cv-print").addEventListener("click", function () { window.print(); });
document.querySelectorAll(".cv-lang button").forEach(function (b) {
  b.addEventListener("click", function () { lang = b.getAttribute("data-lang"); try { localStorage.setItem("lang", lang); } catch (e) {} renderResume(); });
});
renderResume();
