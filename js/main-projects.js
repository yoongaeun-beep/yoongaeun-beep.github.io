// 메인 프로젝트 카드 (main.js 데이터).
// 첫눈에(시안 C): 제목, 내가 한 일, 기획 흐름 다이얼, 숫자 한 줄. 화면 사진, 요약, 단계별 과정, 역할은 '자세히'를 눌러야 열린다.
var PLAY_SVG = '<svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true"><path d="M3 1.5v11l9-5.5z" fill="currentColor"/></svg>';

function renderMain() {
  var wrap = document.getElementById("main-projects"); wrap.textContent = "";
  var list = mainList();
  wrap.hidden = !list.length;
  if (mainSel >= list.length) mainSel = 0;
  wrap.appendChild(renderMainTabs(list));
  list.forEach(function (m, i) { wrap.appendChild(projectCard(m, i)); });
}

function projectCard(m, i) {
  var a = el("article", "mc");
  a.id = "mc-" + m.id; a.hidden = i !== mainSel;
  a.setAttribute("role", "tabpanel"); a.setAttribute("aria-labelledby", "mtab-" + m.id);
  a.appendChild(cardHead(m));
  if (m.plan && m.plan.length) a.appendChild(planDial(m));
  a.appendChild(cardFoot(m));
  a.appendChild(moreBlock(m));
  return a;
}

function cardHead(m) {
  var head = el("header", "mc-top");
  var left = el("div", "mc-top-l");
  left.appendChild(el("span", "mc-kicker mono", t("main.kicker") + "  " + (m.period || "")));
  left.appendChild(el("h3", "mc-title", mainName(m)));
  left.appendChild(el("p", "mc-desc", L(m.desc || m.title)));
  head.appendChild(left);
  if (m.split && m.split.mine) {
    var me = el("div", "mc-me");
    me.appendChild(el("span", "mono", t("split.mine")));
    me.appendChild(el("b", null, L(m.split.mine)));
    me.appendChild(el("span", "mc-me-team", L(m.team)));
    head.appendChild(me);
  }
  return head;
}
// 카드 아래 한 줄: 대표 숫자 3개와 실행 버튼
function cardFoot(m) {
  var foot = el("div", "mc-foot1");
  var ul = el("ul", "mc-nums");
  (m.stats || []).slice(0, 3).forEach(function (x) {
    var li = el("li"); li.appendChild(el("b", "mono", L(x.v))); li.appendChild(el("span", null, L(x.l).split("\n")[0])); ul.appendChild(li);
  });
  foot.appendChild(ul);
  if (m.demo) {
    var demo = el("button", "btn btn-primary mc-demo"); demo.type = "button";
    demo.innerHTML = PLAY_SVG; demo.appendChild(document.createTextNode(" " + L(m.demo.label)));
    demo.addEventListener("click", function () { goDemo(m); });
    foot.appendChild(demo);
  }
  return foot;
}
// 어디까지가 내 일인지: 내가 한 일, 팀이 한 일, AI가 한 일
function splitLine(sp) {
  var dl = el("dl", "mc-split");
  [["mine", "split.mine"], ["team", "split.team"], ["ai", "split.ai"]].forEach(function (k) {
    if (!sp[k[0]]) return;
    var d = el("div", "mc-split-" + k[0]);
    d.appendChild(el("dt", "mono", t(k[1]))); d.appendChild(el("dd", null, L(sp[k[0]])));
    dl.appendChild(d);
  });
  return dl;
}

// 화면 사진: 큰 화면 하나와 작은 사진들. 실행본(demo)이 있으면 큰 화면을 누를 때 바로 실행한다
function gallery(m) {
  var box = el("div", "mc-gallery");
  var imgs = m.images || [], cur = imgs[0];
  if (!cur) return box;
  var shot = el("button", "mc-shot"); shot.type = "button";
  shot.setAttribute("aria-label", L(m.demo ? m.demo.label : cur.alt));
  var img = el("img"); img.src = cur.src; img.alt = L(cur.alt); img.loading = "lazy";
  shot.appendChild(img);
  if (m.demo) { var play = el("span", "mc-play"); play.innerHTML = PLAY_SVG; shot.appendChild(play); }
  shot.addEventListener("click", function () {
    if (m.demo) goDemo(m); else openImage(cur.src, mainName(m));
  });
  box.appendChild(shot);
  var cap = el("span", "mc-cap", L(cur.alt));
  if (imgs.length > 1) box.appendChild(thumbStrip(imgs, function (x) { cur = x; img.src = x.src; img.alt = L(x.alt); cap.textContent = L(x.alt); }));
  box.appendChild(cap);
  return box;
}
function thumbStrip(imgs, onPick) {
  var thumbs = el("div", "mc-thumbs");
  imgs.forEach(function (x, k) {
    var tb = el("button", "mc-thumb" + (k ? "" : " on")); tb.type = "button";
    tb.setAttribute("aria-label", L(x.alt)); tb.title = L(x.alt);
    var ti = el("img"); ti.src = x.src; ti.alt = ""; ti.loading = "lazy";
    tb.appendChild(ti);
    tb.addEventListener("click", function () {
      onPick(x);
      Array.prototype.forEach.call(thumbs.children, function (c) { c.classList.toggle("on", c === tb); });
    });
    thumbs.appendChild(tb);
  });
  return thumbs;
}

// 오른쪽: 불릿 3개, 키워드, 숫자, 실행 버튼
function summary(m) {
  var box = el("div", "mc-sum");
  var ul = el("ul", "mc-bullets");
  ((m.bullets && (m.bullets[lang] || m.bullets.ko)) || []).forEach(function (b) { ul.appendChild(rich("li", null, b)); });
  box.appendChild(ul);
  if (m.tags && m.tags.length) {
    var tg = el("ul", "mc-tags");
    m.tags.forEach(function (x) { tg.appendChild(el("li", "tag", typeof x === "object" ? L(x) : x)); });
    box.appendChild(tg);
  }
  if (m.stats && m.stats.length) {
    var st = el("ul", "mc-stats");
    m.stats.forEach(function (s) { var li = el("li"); li.appendChild(el("span", "mc-v mono", L(s.v))); li.appendChild(el("span", "mc-l", L(s.l))); st.appendChild(li); });
    box.appendChild(st);
  }
  if (m.samples && m.samples.length) { var sp = proofStrip(m.samples, "main.deck"); sp.classList.add("mc-samples"); box.appendChild(sp); }
  return box;
}

// '과정과 역할 자세히': 가로 단계 탭, 내 역할, 기술, 참고
function moreBlock(m) {
  var wrap = el("div", "mc-more");
  var panel = el("div", "mc-more-panel"); panel.id = "more-" + m.id; panel.hidden = true;
  var btn = el("button", "mc-more-btn", t("main.more") + " ＋"); btn.type = "button";
  btn.setAttribute("aria-expanded", "false"); btn.setAttribute("aria-controls", panel.id);
  btn.addEventListener("click", function () {
    var open = panel.hidden; panel.hidden = !open;
    btn.setAttribute("aria-expanded", String(open));
    btn.textContent = t(open ? "main.less" : "main.more") + (open ? " －" : " ＋");
  });
  if (m.split) panel.appendChild(splitLine(m.split));
  var body = el("div", "mc-body");
  body.appendChild(gallery(m));
  body.appendChild(summary(m));
  panel.appendChild(body);
  if (m.steps && m.steps.length) panel.appendChild(stepTabs(m.steps));
  panel.appendChild(roleBlock(m));
  wrap.appendChild(btn);
  wrap.appendChild(panel);
  return wrap;
}
function roleBlock(m) {
  var foot = el("div", "mc-foot");
  if (m.role) {
    var role = el("div", "mc-role");
    role.appendChild(el("span", "mc-label mono", t("main.role")));
    var ul = el("ul"); (m.role[lang] || m.role.ko).forEach(function (x) { ul.appendChild(el("li", null, x)); });
    role.appendChild(ul);
    foot.appendChild(role);
  }
  var tech = el("div", "mc-tech");
  if (m.stack && m.stack.length) {
    tech.appendChild(el("span", "mc-label mono", t("main.stack")));
    var sk = el("ul", "methods");
    m.stack.forEach(function (x) { sk.appendChild(el("li", "tag", x)); });
    tech.appendChild(sk);
  }
  if (m.note) tech.appendChild(el("p", "mc-note", L(m.note)));
  foot.appendChild(tech);
  return foot;
}

// 이렇게 풀었습니다: 가로 단계 탭(01~07)과 내용 한 칸. 세로 길이를 줄이려고 원형 다이얼을 대신한다
function stepTabs(steps) {
  var box = el("section", "steps");
  box.appendChild(el("h4", "steps-title", t("main.process")));
  var tabs = el("div", "steps-tabs"); tabs.setAttribute("role", "tablist");
  var body = el("div", "steps-body"); body.setAttribute("role", "tabpanel");
  var buttons = steps.map(function (s, i) {
    var b = el("button", "steps-tab"); b.type = "button"; b.setAttribute("role", "tab");
    b.appendChild(el("span", "mono", String(i + 1).padStart(2, "0")));
    b.appendChild(el("span", null, L(s.title)));
    b.addEventListener("click", function () { go(i); });
    tabs.appendChild(b);
    return b;
  });
  function go(i) {
    buttons.forEach(function (b, k) { b.setAttribute("aria-selected", String(k === i)); });
    body.textContent = "";
    body.appendChild(stepBody(steps[i]));
  }
  box.appendChild(tabs); box.appendChild(body);
  go(0);
  return box;
}
function stepBody(s) {
  var f = document.createDocumentFragment();
  var top = el("div", "steps-top");
  top.appendChild(el("span", "steps-tag mono", s.tag));
  top.appendChild(el("span", "steps-key", L(s.key)));
  f.appendChild(top);
  f.appendChild(el("p", "steps-line", L(s.line)));
  var pair = el("div", "steps-pair");
  var c1 = el("div", "steps-card"); c1.appendChild(el("span", "mono", t("main.stuck"))); c1.appendChild(el("p", null, L(s.stuck)));
  var c2 = el("div", "steps-card fix"); c2.appendChild(el("span", "mono", t("main.fix"))); c2.appendChild(el("p", null, L(s.fix)));
  pair.appendChild(c1); pair.appendChild(c2);
  f.appendChild(pair);
  return f;
}

// 실행 버튼: 사이트 안 재현본은 플레이어 창으로, 외부 배포 체험은 새 탭으로 연다
function goDemo(m) {
  if (m.demo.external) { window.open(m.demo.link, "_blank", "noopener"); return; }
  openPlayer({ title: m.demo.title, link: m.demo.link });
}
