// 첫 화면, 소개, 경력, 대외활동과 교육. 첫 화면과 소개 문구는 edition.js, 사실은 data.js에서 온다.
// {projects} {side}: 메인과 사이드 프로젝트 수
function fill(s) {
  var main = (window.SITE_MAIN || []).length;
  return String(s || "").split("{projects}").join(main + P.length).split("{side}").join(P.length);
}
function linkOrSpan(to, cls) {
  var n = el(to ? "a" : "span", cls);
  if (to) n.href = to;
  return n;
}

function renderHero() {
  var h = E.hero || {};
  emph(document.getElementById("hero-line"), fill(L(h.line)));
  document.getElementById("hero-sub").textContent = fill(L(h.sub));
  var rule = document.getElementById("ai-rule");
  if (rule) { rule.textContent = ""; rule.hidden = !E.aiRule; if (E.aiRule) { rule.appendChild(el("span", "ai-rule-k mono", t("ai.rule"))); rule.appendChild(document.createTextNode(L(E.aiRule))); } }
  var kw = document.getElementById("keywords"); kw.textContent = "";
  (h.keywords || []).forEach(function (k) { kw.appendChild(el("li", null, "#" + L(k))); });
  var hl = document.getElementById("highlights"); hl.textContent = "";
  (h.numbers || []).forEach(function (x) {
    var li = el("li"), a = linkOrSpan(x.to, "hl-card");
    a.appendChild(el("span", "hl-v mono", fill(L(x.v))));
    a.appendChild(el("span", "hl-l", fill(L(x.l))));
    li.appendChild(a); hl.appendChild(li);
  });
  var gl = document.getElementById("glance"); gl.textContent = "";
  (h.glance || []).forEach(function (g) {
    var d = el("div"); d.appendChild(el("dt", null, L(g.k))); d.appendChild(el("dd", null, L(g.v))); gl.appendChild(d);
  });
  document.getElementById("profile-email").textContent = D.email;
}

// 소개: 한 줄 + 카드. 카드는 누르면 해당 경력 묶음으로 이동한다
function renderAbout() {
  var ab = E.about || {};
  emph(document.getElementById("about-lead"), fill(L(ab.line)));
  var st = document.getElementById("strengths"); st.textContent = "";
  (ab.cards || []).forEach(function (s) {
    var li = el("li"), a = linkOrSpan(s.to, "fig");
    a.appendChild(el("span", "fig-n mono", L(s.figure)));
    a.appendChild(el("span", "fig-t", L(s.title)));
    var w = el("span", "fig-w", L(s.where));
    if (s.to) w.appendChild(el("span", "fig-go", " " + t("about.go")));
    a.appendChild(w);
    li.appendChild(a); st.appendChild(li);
  });
  // 무관산업 사이트: 새 산업에 가져가는 것
  var tr = document.getElementById("transfer");
  if (tr) renderTransfer(tr, E.transfer);
}
function renderTransfer(box, tr) {
  box.textContent = ""; box.hidden = !tr;
  if (!tr) return;
  box.appendChild(el("h3", "tr-title", L(tr.title)));
  var ul = el("ul", "tr-list");
  (tr.items || []).forEach(function (x) {
    var li = el("li");
    li.appendChild(el("b", "tr-k", L(x.k)));
    li.appendChild(el("span", "tr-v", L(x.v)));
    li.appendChild(el("span", "tr-p mono", L(x.proof)));
    ul.appendChild(li);
  });
  box.appendChild(ul);
}

function renderExperience() {
  var ol = document.getElementById("exp-work"); ol.textContent = "";
  D.experience.forEach(function (x) { ol.appendChild(jobItem(x)); });
  renderSchool();
}
function jobItem(x) {
  var li = el("li", "job"); if (x.id) li.id = x.id;
  var per = el("div", "job-period mono", x.period);
  if (x.duration) per.appendChild(el("span", "job-dur", L(x.duration)));
  li.appendChild(per);
  var m = el("div", "job-main");
  var org = el("h3", "job-org", L(x.org));
  if (x.orgSub) org.appendChild(el("span", "job-orgsub", L(x.orgSub)));
  m.appendChild(org);
  x.roles.forEach(function (r) {
    var head = el("div", "role-head");
    head.appendChild(el("b", null, L(r.role)));
    if (r.period && x.roles.length > 1) head.appendChild(el("span", "mono", r.period));
    m.appendChild(head);
    (r.groups || []).forEach(function (g) { m.appendChild(groupBlock(g)); });
  });
  li.appendChild(m);
  return li;
}
function groupBlock(g) {
  var box = el("div", "exp-group"); if (g.id) box.id = g.id;
  box.appendChild(el("span", "exp-cat", L(g.cat)));
  var ul = el("ul", "exp-items");
  forEdition(g.items).forEach(function (it) { ul.appendChild(rich("li", null, L(it))); });
  box.appendChild(ul);
  if (g.proof && g.proof.length) { var pf = proofStrip(g.proof, "sample"); pf.classList.add("exp-proof"); box.appendChild(pf); }
  return box;
}
function renderSchool() {
  var sc = document.getElementById("school"); sc.textContent = "";
  sc.hidden = !D.school;
  if (!D.school) return;
  sc.appendChild(el("span", "school-k mono", t("school")));
  var sb = el("div", "school-b");
  sb.appendChild(el("b", null, L(D.school)));
  sb.appendChild(el("span", "mono school-p", D.schoolPeriod || ""));
  if (D.schoolNote) sb.appendChild(el("span", "school-n", L(D.schoolNote)));
  sc.appendChild(sb);
}

// 대외활동, 교육: 닫힌 상태에는 요약, '자세히'를 누르면 세부 내용과 증빙 사진(proof)이 열린다
function renderRows(list, target) {
  var ol = document.getElementById(target); ol.textContent = "";
  forEdition(list).forEach(function (a, k) {
    var li = el("li", "row");
    li.appendChild(el("span", "row-period mono", a.period));
    var body = el("div", "row-body");
    var head = el("div", "row-head");
    head.appendChild(el("b", "row-title", L(a.title)));
    if (a.sub) head.appendChild(el("span", "row-sub", L(a.sub)));
    body.appendChild(head);
    li.appendChild(body);
    ol.appendChild(li);
    if (a.compactIn === E.id) return; // 이 사이트에서는 제목과 기간만
    var sum = el("ul", "row-sum");
    // summaryBio: 유관산업 사이트에서만 덧붙이는 줄(예: GMP 교육의 관련 프로젝트)
    ((a.summary && a.summary[lang]) || []).concat(E.id === "bio" && a.summaryBio ? a.summaryBio[lang] || [] : []).forEach(function (x) { sum.appendChild(rich("li", null, x)); });
    body.appendChild(sum);
    var more = rowMore(a, target + "-d" + k);
    if (more) { head.appendChild(more.btn); body.appendChild(more.panel); }
  });
}
function rowMore(a, id) {
  var det = (a.details && a.details[lang]) || [], proof = a.proof || [];
  if (!det.length && !(a.methods && a.methods.length) && !proof.length) return null;
  var panel = el("div", "row-more"); panel.id = id; panel.hidden = true;
  if (det.length) { var ul = el("ul", "row-det"); det.forEach(function (x) { ul.appendChild(el("li", null, x)); }); panel.appendChild(ul); }
  if (a.methods && a.methods.length) {
    var m = el("ul", "methods"); a.methods.forEach(function (x) { m.appendChild(el("li", "tag", x)); }); panel.appendChild(m);
  }
  if (proof.length) panel.appendChild(proofStrip(proof));
  var btn = el("button", "row-toggle", t("more") + " ＋"); btn.type = "button";
  btn.setAttribute("aria-expanded", "false"); btn.setAttribute("aria-controls", id);
  btn.addEventListener("click", function () {
    var open = panel.hidden; panel.hidden = !open;
    btn.setAttribute("aria-expanded", String(open));
    btn.textContent = open ? t("less") + " －" : t("more") + " ＋";
  });
  return { btn: btn, panel: panel };
}
// 증빙 사진: 개인정보(생년월일, 증명서 번호)를 가린 사진만 넣는다
function proofStrip(proof, labelKey) {
  var box = el("div", "proof");
  box.appendChild(el("span", "proof-k mono", t(labelKey || "proof")));
  proof.forEach(function (p) {
    var b = el("button", "proof-img"); b.type = "button"; b.setAttribute("aria-label", L(p.alt));
    var im = el("img"); im.src = p.src; im.alt = L(p.alt); im.loading = "lazy";
    b.appendChild(im);
    b.addEventListener("click", function () { openImage(p.src, L(p.alt)); });
    box.appendChild(b);
  });
  return box;
}
function renderActivities() {
  renderRows(D.activities, "activity-list");
  renderRows(D.training, "training-list");
  var c = document.getElementById("certs"); c.textContent = "";
  c.appendChild(el("span", "certs-k mono", t("certs")));
  var list = el("ul", "certs-list");
  (D.certs || []).forEach(function (x) {
    var li = el("li");
    li.appendChild(el("b", null, x.name));
    li.appendChild(el("span", "mono", x.date));
    if (x.note) li.appendChild(el("span", "certs-n", L(x.note)));
    list.appendChild(li);
  });
  c.appendChild(list);
}

// 사이드 프로젝트 위: 자동 수집 이야기와 실제 수집 기록
function renderAutoLog() {
  var hook = document.getElementById("hook"); if (!hook) return;
  hook.textContent = L(F.hook);
  document.getElementById("hook-sub").textContent = L(F.sub);
  var how = document.getElementById("how"); how.textContent = "";
  (F.how || []).forEach(function (s) { how.appendChild(el("li", null, L(s))); });
  document.getElementById("log-title").textContent = t("log.title", { date: dot(F.logDate || window.SITE_UPDATED) });
  var log = document.getElementById("log"); log.textContent = "";
  (F.log || []).forEach(function (e) {
    var li = el("li", e.hi ? "hi" : null);
    li.appendChild(el("span", "t", typeof e.time === "object" ? L(e.time) : e.time));
    li.appendChild(el("span", null, L(e.text)));
    log.appendChild(li);
  });
}
