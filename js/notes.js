// 기획과 AI 설계 노트: 화면이 있는 결과물(책)과 달리, 문제 정의, 규칙과 스킬 설계처럼 눈에 안 보이는 결과물.
// 같은 서가에 꽂되 책 대신 노트 모양으로 보이고, 펼치면 문제, 내가 정한 것, AI에게 맡긴 것, 사람이 확인한 것, 결과 다섯 칸이 나온다.
// 데이터: notes.js (window.SITE_NOTES)
function isNote(p) { return p && p.kind === "note"; }

var NOTE_FIELDS = [["problem", "note.problem"], ["decided", "note.decided"], ["ai", "note.ai"], ["checked", "note.checked"], ["result", "note.result"]];
var NOTE_PAPER = "background-color:#F7F1E3;background-image:repeating-linear-gradient(180deg,transparent 0 21px,#D9CDB2 21px 22px);";

function noteSpineHTML(p) {
  var h = 290 + (p.title ? (L(p.title).length % 4) * 10 : 0);
  return '<div style="position:relative;width:58px;height:' + h + 'px;border-radius:2px 2px 0 0;overflow:hidden;' + NOTE_PAPER +
    'box-shadow:inset 5px 0 0 #C24A3A, inset -1px 0 0 #00000022;display:flex;flex-direction:column;align-items:center;justify-content:space-between;padding:12px 0 10px;font-family:' + GOTHIC + ';color:#2B2A27">' +
    '<span style="font:600 10px/1 ' + MONO + ';letter-spacing:.12em;color:#C24A3A">' + esc(p._no) + '</span>' +
    '<span style="' + V + 'font-weight:800;font-size:15px;letter-spacing:.02em;max-height:200px;overflow:hidden">' + esc(L(p.title)) + '</span>' +
    '<span style="font:600 9px/1 ' + MONO + ';letter-spacing:.16em;' + V + 'color:#7A6F5C">NOTE</span></div>';
}

function noteCoverHTML(p) {
  var lines = NOTE_FIELDS.map(function (f) {
    var v = p[f[0]]; var txt = Array.isArray(v && v[lang]) ? v[lang][0] : L(v);
    return '<div style="display:grid;grid-template-columns:96px 1fr;gap:6px;font-size:11.5px;line-height:22px"><b style="color:#C24A3A;font-weight:700">' +
      esc(t(f[1])) + '</b><span style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis">' + esc(txt || "") + '</span></div>';
  }).join("");
  return '<div style="position:relative;width:320px;height:452px;border-radius:3px 8px 8px 3px;overflow:hidden;' + NOTE_PAPER +
    'box-shadow:inset 6px 0 0 #C24A3A;font-family:' + GOTHIC + ';color:#2B2A27;padding:26px 22px 22px 30px;display:flex;flex-direction:column;gap:10px">' +
    '<span style="font:600 10.5px/1 ' + MONO + ';letter-spacing:.14em;color:#C24A3A">' + esc(t("note.kicker")) + '  ' + esc(p._no) + '</span>' +
    '<span style="font-weight:900;font-size:25px;line-height:1.25;letter-spacing:-.02em">' + esc(L(p.title)) + '</span>' +
    '<span style="font-size:12.5px;line-height:1.5;color:#5C5547">' + esc(L(p.sub)) + '</span>' +
    '<div style="margin-top:auto;display:flex;flex-direction:column">' + lines + '</div></div>';
}

// 아래 상세: 다섯 칸을 가로로(휴대폰은 세로로)
function renderNoteDetail(det, cur) {
  var main = el("div", "d-main");
  main.appendChild(el("span", "d-meta", t("note.kicker") + " " + cur._no + " " + dot(cur.date)));
  main.appendChild(el("span", "d-title", L(cur.title)));
  main.appendChild(el("span", "d-sum", L(cur.sub)));
  var grid = el("dl", "note-grid");
  NOTE_FIELDS.forEach(function (f) {
    var v = cur[f[0]]; if (!v) return;
    var d = el("div", "note-cell note-" + f[0]);
    d.appendChild(el("dt", "mono", t(f[1])));
    var dd = el("dd");
    var arr = Array.isArray(v[lang]) ? v[lang] : null;
    if (arr) { var ul = el("ul"); arr.forEach(function (x) { ul.appendChild(rich("li", null, x)); }); dd.appendChild(ul); }
    else dd.appendChild(rich("span", null, L(v)));
    d.appendChild(dd); grid.appendChild(d);
  });
  main.appendChild(grid);
  if (cur.tags && cur.tags.length) {
    var tg = el("ul", "methods");
    cur.tags.forEach(function (x) { tg.appendChild(el("li", "tag", typeof x === "object" ? L(x) : x)); });
    main.appendChild(tg);
  }
  det.appendChild(main);
}
