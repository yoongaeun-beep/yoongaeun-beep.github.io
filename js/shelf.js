// 결과물 플레이어와 서가
  /* ---------- 결과물 실행 (페이지 안 플레이어) ----------
     아티팩트 안에서는 같이 게시한 파일로 가는 새 탭 링크가 열리지 않으므로, fetch로 읽어 iframe srcdoc으로 띄운다 */
  var docCache = {};
  function loadDoc(path) {
    // 한 파일짜리 사본(portfolio.html)에서는 결과물이 SITE_EMBED 안에 들어 있음
    if (window.SITE_EMBED && window.SITE_EMBED[path]) return Promise.resolve(window.SITE_EMBED[path]);
    if (!docCache[path]) docCache[path] = fetch(path, { cache: "no-cache" }).then(function (r) { if (!r.ok) throw new Error(r.status); return r.text(); });
    return docCache[path];
  }
  var player = document.getElementById("player"), stage = document.getElementById("player-stage"), lastFocus = null;
  function openPlayer(p) {
    lastFocus = document.activeElement;
    document.getElementById("player-title").textContent = L(p.title);
    stage.textContent = "";
    stage.appendChild(el("p", "player-loading mono", t("player.loading")));
    var f = document.createElement("iframe");
    f.className = "player-frame"; f.title = L(p.title); f.setAttribute("allow", "autoplay; fullscreen");
    f.addEventListener("load", function () { var l = stage.querySelector(".player-loading"); if (l) l.remove(); try { f.focus(); } catch (e) {} });
    loadDoc(p.link).then(function (html) { f.srcdoc = html; }, function () { f.src = p.link; });
    stage.appendChild(f);
    player.hidden = false;
    document.body.classList.add("no-scroll");
    document.getElementById("player-close").focus();
  }
  // 이미지를 플레이어 창에 원본 크기로 띄움 (스크롤 가능)
  function openImage(src, title) {
    lastFocus = document.activeElement;
    document.getElementById("player-title").textContent = title;
    stage.textContent = "";
    var box = el("div", "player-image");
    var img = el("img"); img.src = src; img.alt = title;
    box.appendChild(img);
    stage.appendChild(box);
    player.hidden = false;
    document.body.classList.add("no-scroll");
    document.getElementById("player-close").focus();
  }
  function closePlayer() {
    player.hidden = true; stage.textContent = ""; // iframe를 지워 소리와 애니메이션을 멈춤
    document.body.classList.remove("no-scroll");
    if (lastFocus) try { lastFocus.focus(); } catch (e) {}
  }
  document.getElementById("player-close").addEventListener("click", closePlayer);
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !player.hidden) closePlayer(); });

  /* ---------- 서가 ---------- */
  // 사이트별로 덜 보여 줄 사이드 프로젝트(게임 등)는 서가 왼쪽 끝, 목록 맨 아래로 보낸다
  if (E.shelfHide) P = P.filter(function (p) { return E.shelfHide.indexOf(p.id) < 0; });
  if (E.shelfLast) P = P.filter(function (p) { return E.shelfLast.indexOf(p.id) >= 0; }).concat(P.filter(function (p) { return E.shelfLast.indexOf(p.id) < 0; }));
  var shelf = { tab: "all", sel: F.featuredId || (P.length ? P[P.length - 1].id : null) };
  // 서가 A(캔버스 확정 2026-11-23): 결과물 책 → 북엔드 → 기획과 AI 설계 노트 순서로 꽂는다
  function shelfList() {
    var books = P.filter(function (p) { return !isNote(p); }), notes = P.filter(isNote);
    if (shelf.tab === "outputs") return books;
    if (shelf.tab === "notes") return notes;
    return books.concat(notes);
  }
  function pick(id, scroll) { shelf.sel = id; renderShelf(scroll); }
  function step(d) {
    var l = shelfList(); if (!l.length) return;
    var i = l.findIndex(function (p) { return p.id === shelf.sel; }); if (i < 0) i = l.length - 1;
    pick(l[(i + d + l.length) % l.length].id, true);
  }
  document.getElementById("prev").addEventListener("click", function () { step(-1); });
  document.getElementById("next").addEventListener("click", function () { step(1); });

  function renderShelf(scroll) {
    var l = shelfList();
    if (l.length && !l.some(function (p) { return p.id === shelf.sel; })) shelf.sel = l[l.length - 1].id;

    var tabs = document.getElementById("tabs"); tabs.textContent = "";
    [{ id: "all", key: "shelf.all" }, { id: "outputs", key: "shelf.outputs" }, { id: "notes", key: "note.tab" }].forEach(function (c) {
      c.title = { ko: UI.ko[c.key], en: UI.en[c.key] };
      var n = c.id === "all" ? P.length : P.filter(function (p) { return c.id === "notes" ? isNote(p) : !isNote(p); }).length;
      if (!n) return;
      var b = el("button", "tab"); b.type = "button";
      b.setAttribute("aria-pressed", String(shelf.tab === c.id));
      b.appendChild(document.createTextNode(L(c.title) + " ")); b.appendChild(el("span", null, String(n)));
      b.addEventListener("click", function () { shelf.tab = c.id; renderShelf(true); });
      tabs.appendChild(b);
    });
    document.getElementById("shelf-count").textContent = t("shelf.count", { n: P.length });

    var row = document.getElementById("shelf-row"); row.textContent = "";
    row.appendChild(el("span", "bookend l"));
    var selEl = null;
    var box = null;
    l.forEach(function (p) {
      // 노트는 '노트 모음함' 하나에 함께 꽂는다(위에 이름표, 테두리로 묶음)
      if (isNote(p) && !box) { box = noteCase(); row.appendChild(box); }
      var dest = isNote(p) ? box.querySelector(".note-case-in") : row;
      if (p.id === shelf.sel) {
        var wrap = el("div", "pulled"); wrap.innerHTML = coverHTML(p); dest.appendChild(wrap); selEl = wrap;
        if (isLocal(p.link)) mountCoverScreen(wrap, p);
      } else {
        var b = el("button", "spine-btn"); b.type = "button";
        b.setAttribute("aria-label", t("shelf.open", { t: L(p.title) }));
        b.innerHTML = spineHTML(p);
        b.addEventListener("click", function () { pick(p.id, true); });
        dest.appendChild(b);
      }
    });
    var ghost = el("div", "ghost");
    ghost.appendChild(el("span", "mono", String(P.filter(function (p) { return !isNote(p); }).length + 1).padStart(3, "0")));
    ghost.appendChild(el("span", "v", t("shelf.next")));
    ghost.appendChild(el("span", null, "+"));
    row.appendChild(ghost);
    row.appendChild(el("span", "bookend r"));
    // 뽑힌 표지가 서가 가운데 오도록 (처음 그릴 때는 바로, 누를 때는 부드럽게). 페이지 세로 위치는 건드리지 않음
    if (selEl) {
      var target = Math.max(0, selEl.offsetLeft - row.offsetLeft - (row.clientWidth - selEl.offsetWidth) / 2);
      if (scroll) { try { row.scrollTo({ left: target, behavior: "smooth" }); } catch (e) { row.scrollLeft = target; } }
      else row.scrollLeft = target;
    }

    var det = document.getElementById("detail"); det.textContent = "";
    var cur = P.filter(function (p) { return p.id === shelf.sel; })[0];
    if (!cur) return;
    if (isNote(cur)) { renderNoteDetail(det, cur); document.getElementById("story").hidden = true; return; }
    var main = el("div", "d-main");
    main.appendChild(el("span", "d-meta", "No." + cur._no + " " + (L(cur.label) || catOf(cur)) + " " + dot(cur.date)));
    main.appendChild(el("span", "d-title", L(cur.title)));
    // 설명은 불릿(points)이 있으면 불릿으로, 핵심 구절은 **굵게**. 없으면 원래 문단
    var pts = cur.points && cur.points[lang];
    if (pts && pts.length) {
      var pl = el("ul", "d-points");
      pts.forEach(function (x) { pl.appendChild(rich("li", null, x)); });
      main.appendChild(pl);
    } else main.appendChild(el("span", "d-sum", L(cur.summary)));
    if (cur.tools && cur.tools.length) {
      var ul = el("ul", "methods");
      cur.tools.forEach(function (x) { ul.appendChild(el("li", "tag", toolName(x))); });
      main.appendChild(ul);
    }
    if (cur.role || cur.time) {
      var facts = el("dl", "d-facts");
      [["d.role", cur.role], ["d.time", cur.time]].forEach(function (f) {
        if (!f[1]) return;
        facts.appendChild(el("dt", null, t(f[0])));
        facts.appendChild(el("dd", null, L(f[1])));
      });
      main.appendChild(facts);
    }
    det.appendChild(main);
    renderStory(cur);
    if (isLocal(cur.link)) {
      var pb = el("button", "play", t("play")); pb.type = "button";
      pb.addEventListener("click", function () { openPlayer(cur); });
      det.appendChild(pb);
    } else if (cur.note) {
      det.appendChild(el("span", "d-note", L(cur.note)));
    }
  }

  // 노트 모음함: 노트 전부를 테두리 하나로 묶고, 위 이름표에 무엇을 모았는지와 권수를 적는다. 이름표를 누르면 노트만 본다
  function noteCase() {
    var box = el("div", "note-case");
    var tag = el("button", "note-case-tag"); tag.type = "button";
    tag.appendChild(el("span", "mono", "NOTES"));
    tag.appendChild(el("b", null, t("note.caseTitle", { n: P.filter(isNote).length })));
    tag.appendChild(el("span", "note-case-go", t("note.caseGo")));
    if (shelf.tab !== "notes") tag.addEventListener("click", function () { shelf.tab = "notes"; renderShelf(true); });
    box.appendChild(tag);
    box.appendChild(el("div", "note-case-in"));
    return box;
  }

  // 제작 노트: 과정이 특이하거나 채용 담당자가 궁금해할 만한 프로젝트에만 있음. 기본은 접힌 한 줄
  function renderStory(p) {
    var box = document.getElementById("story"); box.textContent = "";
    var s = p.story;
    box.hidden = !s;
    if (!s) return;
    var n = (s.trouble || []).length;
    var d = el("details", "story-box");
    d.appendChild(el("summary", null, t("story.open") + (n ? " (" + t("story.count", { n: n }) + ")" : "")));
    if (s.why) d.appendChild(el("p", "story-why", L(s.why)));
    if (n) {
      var ul = el("ul", "story-trouble");
      s.trouble.forEach(function (x) {
        var li = el("li");
        li.appendChild(el("span", "tr-p", L(x.problem)));
        li.appendChild(el("span", "tr-f", L(x.fix)));
        ul.appendChild(li);
      });
      d.appendChild(ul);
    }
    box.appendChild(d);
  }

