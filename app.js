(function () {
  var D = window.SITE_DATA;
  var F = window.SITE_FEATURE || { categories: [], keywords: [], log: [] };
  // 서가는 오래된 것이 왼쪽. 번호는 만든 순서
  var P = (window.SITE_PROJECTS || []).slice().sort(function (a, b) { return a.date < b.date ? -1 : a.date > b.date ? 1 : 0; });
  P.forEach(function (p, i) { p._no = String(i + 1).padStart(3, "0"); });

  var UI = {
    ko: {
      "nav.about": "소개", "nav.experience": "경력", "nav.activities": "대외활동", "nav.projects": "프로젝트", "nav.contact": "연락",
      "nav.about.n": "01 · 소개", "nav.experience.n": "02 · 경력", "nav.activities.n": "03 · 대외활동", "nav.projects.n": "04 · 프로젝트", "nav.contact.n": "05 · 연락",
      "log.title": "최근 수집 기록 · {date}", "log.go": "서가 보러 가기 ↓", "log.count": "서가 {n}권",
      "shelf.kicker": "PROJECTS · 서가", "shelf.title": "Claude로 만든 것들", "shelf.count": "{n}권",
      "shelf.lede": "책등을 누르면 표지가 뽑혀 나옵니다. 매일 새벽 2시에 한 권씩 늘어나고, 서가는 옆으로 길어집니다.",
      "shelf.all": "전체", "shelf.next": "다음 한 권 · 오늘 새벽 2시", "shelf.open": "{t} 표지 보기",
      "play": "▶ 이 페이지에서 바로 실행", "player.close": "닫기 ✕", "player.loading": "불러오는 중…",
      "edu": "교육", "lang": "영어",
      "nav.experience.n2": "02 · 경력·학력", "school": "학력", "how.q": "어떻게 동작하나요?",
      "kicker": "PORTFOLIO", "cta.contact": "연락하기", "cta.projects": "만든 것 보기 ↓", "profile.mail": "이메일",
      "auto.badge": "이 페이지는 매일 새벽 2시에 스스로 업데이트됩니다 · 마지막 {date}",
      "d.role": "내가 정한 것", "d.time": "걸린 시간",
      "story.open": "제작 과정 보기", "story.count": "막혔던 곳 {n}",
      "contact.lede": "학력과 자격 상세가 담긴 이력서는 메일로 요청해 주시면 바로 보내드립니다.",
      "contact.copy": "주소 복사", "contact.write": "메일 쓰기", "contact.copied": "복사했습니다.", "contact.selected": "주소를 선택했습니다. Ctrl+C로 복사하세요.",
      "foot": "이 페이지는 매일 새벽 2시에 스스로 업데이트됩니다 · 마지막 업데이트 {date} · 이 사이트도 Claude로 만들었습니다"
    },
    en: {
      "nav.about": "About", "nav.experience": "Experience", "nav.activities": "Activities", "nav.projects": "Projects", "nav.contact": "Contact",
      "nav.about.n": "01 · About", "nav.experience.n": "02 · Experience", "nav.activities.n": "03 · Activities", "nav.projects.n": "04 · Projects", "nav.contact.n": "05 · Contact",
      "log.title": "Latest collection · {date}", "log.go": "See the shelf ↓", "log.count": "{n} on the shelf",
      "shelf.kicker": "PROJECTS · SHELF", "shelf.title": "Things I built with Claude", "shelf.count": "{n}",
      "shelf.lede": "Click a spine to pull out its cover. A new one arrives every night at 2 a.m., and the shelf grows sideways.",
      "shelf.all": "All", "shelf.next": "Next one · tonight 2 a.m.", "shelf.open": "Open {t}",
      "play": "▶ Run it on this page", "player.close": "Close ✕", "player.loading": "Loading…",
      "edu": "Training", "lang": "English",
      "nav.experience.n2": "02 · Experience & education", "school": "Education", "how.q": "How does this work?",
      "kicker": "PORTFOLIO", "cta.contact": "Get in touch", "cta.projects": "See what I built ↓", "profile.mail": "Email",
      "auto.badge": "This page updates itself every night at 2 a.m. · last {date}",
      "d.role": "What I decided", "d.time": "Time",
      "story.open": "How it was made", "story.count": "{n} problems solved",
      "contact.lede": "Email me for a full resume with education and certifications.",
      "contact.copy": "Copy address", "contact.write": "Write an email", "contact.copied": "Copied.", "contact.selected": "Address selected. Press Ctrl+C to copy.",
      "foot": "This page updates itself every night at 2 a.m. · last update {date} · built with Claude, too"
    }
  };

  var lang = "ko";
  try { lang = localStorage.getItem("lang") || "ko"; } catch (e) {}
  if (lang !== "ko" && lang !== "en") lang = "ko";

  function t(key, vars) {
    var s = UI[lang][key];
    if (s == null) { var v = D[key]; s = v && typeof v === "object" ? v[lang] : v; }
    if (vars && s) Object.keys(vars).forEach(function (k) { s = s.split("{" + k + "}").join(vars[k]); });
    return s;
  }
  function L(o) { return o ? (o[lang] || o.ko || "") : ""; }
  function el(tag, cls, text) { var n = document.createElement(tag); if (cls) n.className = cls; if (text != null) n.textContent = text; return n; }
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  function dot(d) { return (d || "").replace(/-/g, "."); }
  function isLocal(link) { return !!link && !/^https?:/i.test(link); }
  // 기능 태그 영문 표기 (새 기능은 glossary.json 이름 그대로 두면 한글로 보임 → 여기에 추가)
  var TOOL_EN = {
    "질문 카드": "Question cards", "계획 모드": "Plan mode", "아티팩트": "Artifacts", "파일 만들기": "File writing",
    "파일 읽기": "File reading", "내장 브라우저": "Built-in browser", "커넥터(Gmail)": "Gmail connector",
    "예약 작업": "Scheduled tasks", "노션 연결": "Notion connector", "대화 목록 관리": "Session management",
    "스킬": "Skills", "웹 검색": "Web search", "보조 에이전트": "Sub-agents", "기억": "Memory", "파일 고치기": "File editing",
    "디자인 캔버스": "Design canvas"
  };
  function toolName(x) { return lang === "en" && TOOL_EN[x] ? TOOL_EN[x] : x; }
  function catOf(p) { var c = (F.categories || []).filter(function (c) { return c.id === p.category; })[0]; return c ? L(c.title) : ""; }
  // *강조* → <em>
  function emph(target, text) {
    target.textContent = "";
    String(text).split("*").forEach(function (part, i) { target.appendChild(i % 2 ? el("em", null, part) : document.createTextNode(part)); });
  }

  /* ---------- 책등·표지 디자인 ----------
     전용 디자인 6종 + 새 결과물용 generic(팔레트·무늬·모티프로 조합). 글자는 모두 esc() 처리 */
  var MONO = "'IBM Plex Mono', monospace", GOTHIC = "'Gothic A1', sans-serif", HAN = "'Black Han Sans', sans-serif", SERIF = "'Hahmlet', serif";
  var SPINE_BOX = "position:relative;width:72px;border-radius:4px 4px 0 0;overflow:hidden;font-family:" + GOTHIC + ";color:#fff;box-shadow:inset 7px 0 9px -7px #FFFFFF55, inset -10px 0 12px -8px #00000066;";
  var COVER_BOX = "position:relative;width:320px;height:452px;border-radius:3px 10px 10px 3px;overflow:hidden;font-family:" + GOTHIC + ";box-shadow:inset 12px 0 14px -10px #00000070, inset 2px 0 0 #FFFFFF30;";
  var V = "writing-mode:vertical-rl;";

  var PATTERNS = {
    dots: function (a) { return "background-image:radial-gradient(" + a + " 2px, transparent 2.6px);background-size:11px 11px;"; },
    stripes: function (a) { return "background-image:repeating-linear-gradient(0deg, " + a + "33 0 2px, transparent 2px 9px);"; },
    lanes: function (a) { return "background-image:repeating-linear-gradient(90deg, transparent 0 17px, " + a + "55 17px 18px);"; },
    grid: function (a) { return "background-image:linear-gradient(" + a + "33 1px, transparent 1px), linear-gradient(90deg, " + a + "33 1px, transparent 1px);background-size:12px 12px;"; },
    stars: function () { return "background-image:radial-gradient(#FFFFFF 1px, transparent 1.6px), radial-gradient(#FFFFFFAA .8px, transparent 1.4px);background-size:23px 31px, 17px 13px;background-position:3px 5px, 11px 2px;"; },
    hazard: function (a, bg) { return "background-image:repeating-linear-gradient(45deg, " + a + " 0 8px, " + bg + " 8px 16px);"; },
    airmail: function (a, bg) { return "background-image:repeating-linear-gradient(180deg, #C8372D 0 12px, " + bg + " 12px 18px, #2B4C9A 18px 30px, " + bg + " 30px 36px);"; },
    none: function () { return ""; }
  };

  function spineHTML(p) {
    var h = p.spineH || 400, title = esc(L(p.title)), no = esc(p._no);
    var box = SPINE_BOX + "height:" + h + "px;";
    switch (p.design) {
      case "bomber":
        return '<div class="spine" style="' + box + 'display:flex;flex-direction:column;background:#24206B">' +
          '<div style="height:70px;flex:none;background:#FF3D8B;display:flex;align-items:center;justify-content:center"><span style="width:44px;height:44px;border-radius:50%;border:2.5px solid #FFD43B;color:#FFD43B;display:flex;align-items:center;justify-content:center;font:400 14px/1 ' + HAN + ';transform:rotate(-12deg)">合格</span></div>' +
          '<div style="flex:1;display:flex;align-items:center;justify-content:center;min-height:0"><span style="' + V + 'font:400 25px/1 ' + HAN + ';color:#FFD43B;text-shadow:2px 2px 0 #FF3D8B;letter-spacing:.04em">' + title + '</span></div>' +
          '<div style="height:54px;flex:none;' + PATTERNS.dots("#FFD43B") + 'border-top:2px solid #FFD43B"></div>' +
          '<div style="height:34px;flex:none;background:#FFD43B;color:#24206B;display:flex;align-items:center;justify-content:center;font:500 12px/1 ' + MONO + '">' + no + '</div></div>';
      case "p0":
        return '<div class="spine" style="' + box + 'display:flex;flex-direction:column;background-color:#1C1859;' + PATTERNS.lanes("#38F2C0") + '">' +
          '<div style="height:110px;flex:none;position:relative;border-bottom:2px solid #FFE14D">' +
          '<span style="position:absolute;left:4px;top:14px;width:12px;height:7px;border-radius:2px;background:#FF3D8B"></span><span style="position:absolute;left:22px;top:38px;width:12px;height:7px;border-radius:2px;background:#FFE14D"></span><span style="position:absolute;left:40px;top:24px;width:12px;height:7px;border-radius:2px;background:#38F2C0"></span><span style="position:absolute;left:58px;top:64px;width:12px;height:7px;border-radius:2px;background:#9B8CFF"></span><span style="position:absolute;left:22px;top:84px;width:12px;height:7px;border-radius:2px;background:#FF3D8B"></span></div>' +
          '<div style="flex:1;display:flex;align-items:center;justify-content:center;min-height:0"><span style="' + V + 'font:900 19px/1 ' + GOTHIC + ';letter-spacing:.02em">' + (lang === "en" ? "Can-can " : "캉캉 리듬 ") + '<span style="color:#38F2C0">P0</span></span></div>' +
          '<div style="height:40px;flex:none;display:flex;align-items:center;justify-content:center;color:#38F2C0;font:500 12px/1 ' + MONO + '">♪ ' + no + '</div></div>';
      case "beat":
        return '<div class="spine" style="' + box + 'display:flex;flex-direction:column;background:#121528">' +
          '<div style="height:76px;flex:none;display:flex;align-items:center;justify-content:center"><span style="width:48px;height:48px;border-radius:50%;border:3px solid #E5483A;color:#E5483A;box-shadow:inset 0 0 0 2px #121528, inset 0 0 0 3.5px #E5483A;display:flex;align-items:center;justify-content:center;font:400 15px/1 ' + HAN + '">合格</span></div>' +
          '<div style="flex:1;display:flex;align-items:center;justify-content:center;gap:4px;min-height:0"><span style="' + V + 'font:400 27px/1 ' + HAN + ';color:#FFE14D">' + title + '</span><span style="' + V + 'font:500 9.5px/1 ' + MONO + ';color:#8E93C2;letter-spacing:.2em">PASS BEAT</span></div>' +
          '<div style="height:46px;flex:none;' + PATTERNS.hazard("#FFE14D", "#121528") + '"></div>' +
          '<div style="height:32px;flex:none;display:flex;align-items:center;justify-content:center;color:#FFE14D;font:500 12px/1 ' + MONO + '">' + no + '</div></div>';
      case "inbox":
        return '<div class="spine" style="' + box + 'display:flex;background:#F2EEE5">' +
          '<div style="width:7px;flex:none;' + PATTERNS.airmail(null, "#F2EEE5") + '"></div>' +
          '<div style="flex:1;display:flex;flex-direction:column;align-items:center;padding:14px 0 12px;gap:12px;color:#1F2A5C;min-width:0">' +
          '<svg width="26" height="20" viewBox="0 0 26 20" fill="none" stroke="#1F2A5C" stroke-width="1.8" aria-hidden="true"><rect x="1" y="1" width="24" height="18" rx="2"></rect><path d="M1 3l12 9 12-9"></path></svg>' +
          '<span style="flex:1;' + V + 'font:900 19px/1 ' + GOTHIC + ';letter-spacing:.02em">' + title + '</span>' +
          '<span style="' + V + 'font:500 9px/1 ' + MONO + ';letter-spacing:.2em;color:#C8372D">AIR MAIL</span><span style="font:500 11px/1 ' + MONO + '">' + no + '</span></div>' +
          '<div style="width:7px;flex:none;background-image:repeating-linear-gradient(180deg, #2B4C9A 0 12px, #F2EEE5 12px 18px, #C8372D 18px 30px, #F2EEE5 30px 36px)"></div></div>';
      case "timeline":
        return '<div class="spine" style="' + box + 'display:flex;flex-direction:column;align-items:center;background-color:#262A5E;background-image:repeating-linear-gradient(0deg, #FFFFFF08 0 1px, transparent 1px 3px);padding:16px 0 14px;gap:10px;color:#EDE3C8">' +
          '<div style="width:52px;height:5px;flex:none;border-top:1px solid #C9A55C;border-bottom:1px solid #C9A55C"></div><span style="font:500 10px/1 ' + MONO + ';color:#C9A55C;letter-spacing:.12em">VOL.I</span>' +
          '<span style="flex:1;' + V + 'font:500 20px/1 ' + SERIF + ';letter-spacing:.06em">' + title + '</span>' +
          '<span style="width:9px;height:9px;border-radius:50%;background:#C9A55C;flex:none"></span><div style="width:52px;height:5px;flex:none;border-top:1px solid #C9A55C;border-bottom:1px solid #C9A55C"></div>' +
          '<span style="font:500 11px/1 ' + MONO + ';color:#C9A55C">' + no + '</span></div>';
      case "daily":
        return '<div class="spine" style="' + box + 'display:flex;flex-direction:column;align-items:center;background-color:#0F1A3A;' + PATTERNS.stars() + 'padding:18px 0 14px;gap:14px">' +
          '<span style="width:30px;height:30px;border-radius:50%;box-shadow:inset 9px -5px 0 0 #F2C14E;transform:rotate(-20deg);flex:none"></span>' +
          '<span style="flex:1;' + V + 'font:500 30px/1 ' + MONO + ';color:#F2C14E">02:00</span>' +
          '<span style="' + V + 'font:700 13px/1 ' + GOTHIC + '">' + (lang === "en" ? "Auto archive" : "자동 수집") + '</span>' +
          '<span style="font:500 11px/1 ' + MONO + ';color:#F2C14E">' + no + '</span></div>';
      default:
        var pal = p.palette || { bg: "#2A2F55", ink: "#F4F1EA", accent: "#F2B84B" };
        var pat = (PATTERNS[p.pattern] || PATTERNS.none)(pal.accent, pal.bg);
        return '<div class="spine" style="' + box + 'display:flex;flex-direction:column;align-items:center;background:' + pal.bg + ';color:' + pal.ink + ';padding:0 0 12px;gap:12px">' +
          '<div style="width:100%;height:64px;flex:none;' + pat + 'border-bottom:2px solid ' + pal.accent + ';display:flex;align-items:center;justify-content:center">' +
          (p.stamp ? '<span style="width:40px;height:40px;border-radius:50%;border:2.5px solid ' + pal.accent + ';background:' + pal.bg + ';color:' + pal.accent + ';display:flex;align-items:center;justify-content:center;font:400 14px/1 ' + HAN + '">' + esc(p.stamp) + '</span>' : '') + '</div>' +
          '<span style="flex:1;' + V + 'font:900 19px/1 ' + GOTHIC + ';letter-spacing:.02em">' + title + '</span>' +
          '<span style="font:500 11px/1 ' + MONO + ';color:' + pal.accent + '">' + no + '</span></div>';
    }
  }

  function barcode(color) {
    return '<span style="width:74px;height:26px;background-image:repeating-linear-gradient(90deg, ' + color + ' 0 2px, transparent 2px 4px, ' + color + ' 4px 5px, transparent 5px 8px, ' + color + ' 8px 11px, transparent 11px 12px)"></span>';
  }
  function coverImg(p, style) {
    return p.cover ? '<img src="' + esc(p.cover) + '" alt="" style="display:block;' + style + '">' : '<span style="display:block;' + style + 'background:linear-gradient(135deg,#3B3591,#24206B)"></span>';
  }

  function coverHTML(p) {
    var title = esc(L(p.title)), no = esc(p._no), date = esc(dot(p.date));
    var head = function (left, color) { return '<div style="display:flex;justify-content:space-between;font:500 10.5px/1.3 ' + MONO + ';letter-spacing:.08em;color:' + color + '"><span>' + left + '</span><span>No.' + no + '</span></div>'; };
    switch (p.design) {
      case "bomber":
        return '<div class="cover" style="' + COVER_BOX + 'background-color:#24206B;background-image:radial-gradient(#FFFFFF14 1.5px, transparent 2px);background-size:14px 14px;padding:22px 22px 18px 28px;display:flex;flex-direction:column;gap:14px;color:#FFD43B">' +
          head(lang === "en" ? "Yoon Gaeun's lab notes" : "윤가은 실험 노트", "#FFD43B") +
          '<div style="font:400 50px/1.02 ' + HAN + ';text-shadow:3px 3px 0 #FF3D8B, 6px 6px 0 #0A0830">' + title + '</div>' +
          '<div style="position:relative;margin-top:4px">' + coverImg(p, "width:100%;aspect-ratio:16/10;object-fit:cover;border:3px solid #FFD43B;border-radius:8px;transform:rotate(2.5deg);box-shadow:6px 6px 0 #0A0830;") +
          '<span style="position:absolute;right:-6px;top:-26px;width:72px;height:72px;border-radius:50%;background:#FF3D8B;color:#fff;display:flex;align-items:center;justify-content:center;text-align:center;font:900 12.5px/1.2 ' + GOTHIC + ';transform:rotate(14deg);box-shadow:3px 3px 0 #0A0830">' + (lang === "en" ? "Dopamine<br>guaranteed" : "도파민<br>보장") + '</span></div>' +
          '<div style="margin-top:auto;display:flex;align-items:flex-end;justify-content:space-between"><span style="font:500 10.5px/1.4 ' + MONO + ';color:#FFFFFFB0">' + date + '<br>' + (lang === "en" ? "3 min · collect endings" : "3분 · 엔딩 수집형") + '</span>' + barcode("#FFD43B") + '</div></div>';
      case "p0":
        var note = function (l, tp, c) { return '<span style="position:absolute;left:' + l + 'px;top:' + tp + 'px;width:56px;height:14px;border-radius:4px;background:' + c + ';border:2px solid #0A0830"></span>'; };
        return '<div class="cover" style="' + COVER_BOX + 'background:#1C1859;padding:22px 22px 18px 28px;display:flex;flex-direction:column;gap:12px;color:#fff">' +
          head(lang === "en" ? "PHASE 0 · RHYTHM ENGINE" : "PHASE 0 · 리듬 엔진", "#38F2C0") +
          '<div style="position:relative;height:190px;flex:none;border-radius:10px;overflow:hidden;background-color:#231C8A;background-image:repeating-linear-gradient(90deg, transparent 0 66px, #FFFFFF22 66px 67px)">' +
          note(6, 18, "#FF3D8B") + note(73, 52, "#FFE14D") + note(140, 8, "#38F2C0") + note(207, 96, "#9B8CFF") + note(73, 120, "#FFE14D") +
          '<span style="position:absolute;left:0;right:0;bottom:30px;height:4px;background:#FFE14D;box-shadow:0 0 12px #FFE14D"></span></div>' +
          '<div style="font:900 26px/1.15 ' + GOTHIC + ';letter-spacing:-.03em">' + title + '</div>' +
          '<div style="display:flex;gap:6px;flex-wrap:wrap;font:500 11px/1.5 ' + MONO + '"><span style="border:1.5px solid #38F2C0;color:#38F2C0;border-radius:999px;padding:2px 10px">' + (lang === "en" ? "Easy" : "쉬움") + ' 120</span><span style="background:#38F2C0;color:#0A0830;border-radius:999px;padding:2px 10px">' + (lang === "en" ? "Normal" : "보통") + ' 155</span><span style="border:1.5px solid #38F2C0;color:#38F2C0;border-radius:999px;padding:2px 10px">' + (lang === "en" ? "Hard" : "어려움") + ' 185</span></div>' +
          '<div style="margin-top:auto;display:flex;justify-content:space-between;font:500 10.5px/1.4 ' + MONO + ';color:#FFFFFFB0"><span>♪ ' + (lang === "en" ? "Can-can 16 bars × 3" : "캉캉 16마디 × 3절") + '</span><span>' + date + '</span></div></div>';
      case "beat":
        var stage = function (s, on) { return '<span style="' + (on ? 'background:#FFE14D;color:#121528;' : 'border:1px solid #FFE14D88;') + 'border-radius:4px;padding:5px 7px">' + s + '</span>'; };
        var st = lang === "en" ? ["Docs", "Aptitude", "Round 1", "Final"] : ["서류", "인적성", "1차", "임원"];
        return '<div class="cover" style="' + COVER_BOX + 'background:#121528;display:flex;flex-direction:column;color:#FFE14D">' +
          '<div style="position:relative;height:200px;flex:none">' + coverImg(p, "width:100%;height:100%;object-fit:cover;opacity:.85;") +
          '<span style="position:absolute;inset:0;background:linear-gradient(180deg, transparent 40%, #121528 100%)"></span>' +
          '<span style="position:absolute;left:22px;bottom:-30px;width:66px;height:66px;border-radius:50%;border:3px solid #E5483A;background:#121528;box-shadow:inset 0 0 0 3px #121528, inset 0 0 0 5px #E5483A;color:#E5483A;display:flex;align-items:center;justify-content:center;font:400 20px/1 ' + HAN + ';transform:rotate(-10deg)">合格</span></div>' +
          '<div style="padding:40px 22px 0 28px;display:flex;flex-direction:column;gap:8px"><div style="font:400 46px/1 ' + HAN + '">' + title + '</div>' +
          '<div style="font:500 10.5px/1 ' + MONO + ';letter-spacing:.24em;color:#8E93C2">PASS BEAT · 4 STAGES · No.' + no + '</div>' +
          '<div style="display:flex;flex-wrap:wrap;align-items:center;gap:5px;margin-top:8px;font:700 12px/1 ' + GOTHIC + ';color:#fff">' + stage(st[0]) + '<span style="color:#FFE14D">›</span>' + stage(st[1]) + '<span style="color:#FFE14D">›</span>' + stage(st[2]) + '<span style="color:#FFE14D">›</span>' + stage(st[3], true) + '</div></div>' +
          '<div style="margin-top:auto;height:22px;' + PATTERNS.hazard("#FFE14D", "#121528").replace("8px", "10px").replace("8px 16px", "10px 20px") + '"></div></div>';
      case "inbox":
        var dots = "", pat = "oocobocooboocboocobo";
        for (var i = 0; i < 20; i++) {
          var k = pat[i];
          dots += k === "o" ? '<span style="width:12px;height:12px;border-radius:50%;border:2px solid #2B4C9A;box-sizing:border-box"></span>' : '<span style="width:12px;height:12px;border-radius:50%;background:' + (k === "c" ? "#C8372D" : "#1F2A5C") + '"></span>';
        }
        return '<div class="cover" style="' + COVER_BOX + 'padding:10px;background-image:repeating-linear-gradient(135deg, #C8372D 0 14px, #F2EEE5 14px 22px, #2B4C9A 22px 36px, #F2EEE5 36px 44px)">' +
          '<div style="position:relative;height:100%;box-sizing:border-box;background:#F7F4EC;padding:18px 18px 16px 22px;display:flex;flex-direction:column;gap:12px;color:#1F2A5C">' +
          '<div style="display:flex;justify-content:space-between;align-items:flex-start"><span style="font:500 10.5px/1.4 ' + MONO + ';letter-spacing:.08em">PAR AVION<br>No.' + no + '</span>' +
          '<span style="width:70px;height:84px;border:2px dashed #C8372D;outline:3px solid #F7F4EC;background:#FBE9E4;display:flex;flex-direction:column;align-items:center;justify-content:center;color:#C8372D;transform:rotate(4deg)"><span style="font:500 20px/1 ' + MONO + '">2,173</span><span style="font:700 9.5px/1.3 ' + GOTHIC + '">' + (lang === "en" ? "threads" : "통의 대화") + '</span></span></div>' +
          '<div style="font:900 30px/1.18 ' + GOTHIC + ';letter-spacing:-.03em">' + title + '</div>' +
          '<div style="display:grid;grid-template-columns:repeat(10,12px);gap:7px;margin-top:4px">' + dots + '</div>' +
          '<span style="font:500 11px/1.5 ' + MONO + ';color:#4A5280">' + (lang === "en" ? "hollow = mail one filter removes" : "빈 점 = 필터 하나로 사라지는 메일") + '</span>' +
          '<span style="position:absolute;right:18px;bottom:54px;width:84px;height:84px;border-radius:50%;border:2px solid #2B4C9A88;color:#2B4C9A;display:flex;align-items:center;justify-content:center;text-align:center;font:500 9.5px/1.4 ' + MONO + ';transform:rotate(-16deg)">GMAIL<br>' + date + '</span>' +
          '<span style="margin-top:auto;font:700 11.5px/1.4 ' + GOTHIC + ';color:#C8372D">' + esc(L(p.note)) + '</span></div></div>';
      case "timeline":
        var tl = "";
        for (var j = 0; j < 4; j++) tl += '<span style="width:10px;height:10px;border-radius:50%;' + (j % 2 ? "border:1.5px solid #C9A55C;box-sizing:border-box" : "background:#C9A55C") + '"></span><span style="width:1px;height:22px;background:#C9A55C"></span>';
        return '<div class="cover" style="' + COVER_BOX + 'background-color:#262A5E;background-image:repeating-linear-gradient(0deg, #FFFFFF07 0 1px, transparent 1px 3px), repeating-linear-gradient(90deg, #00000010 0 1px, transparent 1px 4px);padding:18px 18px 18px 24px;color:#EDE3C8">' +
          '<div style="height:100%;box-sizing:border-box;border:1px solid #C9A55C;outline:1px solid #C9A55C66;outline-offset:-6px;padding:26px 20px;display:flex;flex-direction:column;align-items:center;gap:14px;text-align:center">' +
          '<span style="font:500 10px/1 ' + MONO + ';letter-spacing:.3em;color:#C9A55C">VOL. I · No.' + no + '</span><span style="width:40px;height:1px;background:#C9A55C"></span>' +
          '<div style="font:500 32px/1.25 ' + SERIF + ';letter-spacing:.04em">' + title + '</div>' +
          '<div style="flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center">' + tl + '<span style="width:14px;height:14px;border-radius:50%;background:#C9A55C;box-shadow:0 0 0 4px #C9A55C33"></span></div>' +
          '<span style="font:300 12.5px/1.5 ' + SERIF + ';color:#D9CCAA">' + (lang === "en" ? "Scattered documents, one timeline" : "흩어진 문서를 한 권의 연표로") + '</span>' +
          '<span style="font:500 10px/1 ' + MONO + ';color:#C9A55C">' + esc(p.note ? L(p.note) : (lang === "en" ? "Click any year to unfold" : "누르면 펼쳐지는 연표")) + '</span></div></div>';
      case "daily":
        return '<div class="cover" style="' + COVER_BOX + 'background-color:#0F1A3A;background-image:radial-gradient(#FFFFFF 1px, transparent 1.6px), radial-gradient(#FFFFFF99 .8px, transparent 1.4px), radial-gradient(ellipse at 70% 20%, #2A3B7A 0%, transparent 60%);background-size:41px 37px, 23px 19px, 100% 100%;background-position:7px 9px, 15px 4px, 0 0;padding:22px 22px 18px 28px;display:flex;flex-direction:column;gap:10px;color:#fff">' +
          head(lang === "en" ? "Published nightly" : "매일 새벽 · 자동 발행", "#F2C14E") +
          '<span style="align-self:flex-end;width:92px;height:92px;border-radius:50%;box-shadow:inset 26px -14px 0 0 #F2C14E, 0 0 40px #F2C14E33;transform:rotate(-24deg);margin:6px 6px 0 0"></span>' +
          '<div style="font:500 76px/1 ' + MONO + ';color:#F2C14E;letter-spacing:-.04em">02:00</div>' +
          '<div style="font:900 24px/1.25 ' + GOTHIC + ';letter-spacing:-.02em">' + title + '</div>' +
          '<span style="font:500 12.5px/1.5 ' + GOTHIC + ';color:#B8C2E8">' + (lang === "en" ? "A shelf that fills while I sleep" : "제가 자는 동안 채워지는 서가") + '</span>' +
          '<div style="margin-top:auto;border-top:1px dashed #F2C14E66;padding-top:10px;display:flex;justify-content:space-between;font:500 10.5px/1.4 ' + MONO + ';color:#B8C2E8"><span>' + esc(L(p.note)) + '</span><span>' + date + '</span></div></div>';
      default:
        var pal = p.palette || { bg: "#2A2F55", ink: "#F4F1EA", accent: "#F2B84B" };
        var pt = (PATTERNS[p.pattern] || PATTERNS.none)(pal.accent, pal.bg);
        return '<div class="cover" style="' + COVER_BOX + 'background:' + pal.bg + ';color:' + pal.ink + ';display:flex;flex-direction:column">' +
          (p.cover ? '<div style="position:relative;height:190px;flex:none">' + coverImg(p, "width:100%;height:100%;object-fit:cover;") + '</div>' : '<div style="height:150px;flex:none;' + pt + 'border-bottom:2px solid ' + pal.accent + '"></div>') +
          '<div style="padding:20px 22px 18px 28px;display:flex;flex-direction:column;gap:10px;flex:1">' +
          '<span style="font:500 10.5px/1.3 ' + MONO + ';letter-spacing:.08em;color:' + pal.accent + '">No.' + no + ' · ' + date + '</span>' +
          (p.motif ? '<div style="font:500 56px/1 ' + MONO + ';color:' + pal.accent + ';letter-spacing:-.03em">' + esc(p.motif) + '</div>' : '') +
          '<div style="font:900 26px/1.2 ' + GOTHIC + ';letter-spacing:-.02em">' + title + '</div>' +
          '<div style="margin-top:auto;display:flex;justify-content:flex-end">' + barcode(pal.accent) + '</div></div></div>';
    }
  }

  /* ---------- 결과물 실행 (페이지 안 플레이어) ----------
     아티팩트 안에서는 같이 게시한 파일로 가는 새 탭 링크가 열리지 않으므로, fetch로 읽어 iframe srcdoc으로 띄운다 */
  var docCache = {};
  function loadDoc(path) {
    // 한 파일짜리 사본(portfolio.html)에서는 결과물이 SITE_EMBED 안에 들어 있음
    if (window.SITE_EMBED && window.SITE_EMBED[path]) return Promise.resolve(window.SITE_EMBED[path]);
    if (!docCache[path]) docCache[path] = fetch(path).then(function (r) { if (!r.ok) throw new Error(r.status); return r.text(); });
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
  function closePlayer() {
    player.hidden = true; stage.textContent = ""; // iframe를 지워 소리와 애니메이션을 멈춤
    document.body.classList.remove("no-scroll");
    if (lastFocus) try { lastFocus.focus(); } catch (e) {}
  }
  document.getElementById("player-close").addEventListener("click", closePlayer);
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !player.hidden) closePlayer(); });

  /* ---------- 서가 ---------- */
  var shelf = { tab: "all", sel: F.featuredId || (P.length ? P[P.length - 1].id : null) };
  function shelfList() { return P.filter(function (p) { return shelf.tab === "all" || p.category === shelf.tab; }); }
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
    [{ id: "all", title: { ko: UI.ko["shelf.all"], en: UI.en["shelf.all"] } }].concat(F.categories || []).forEach(function (c) {
      var n = c.id === "all" ? P.length : P.filter(function (p) { return p.category === c.id; }).length;
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
    l.forEach(function (p) {
      if (p.id === shelf.sel) {
        var wrap = el("div", "pulled"); wrap.innerHTML = coverHTML(p); row.appendChild(wrap); selEl = wrap;
      } else {
        var b = el("button", "spine-btn"); b.type = "button";
        b.setAttribute("aria-label", t("shelf.open", { t: L(p.title) }));
        b.innerHTML = spineHTML(p);
        b.addEventListener("click", function () { pick(p.id, true); });
        row.appendChild(b);
      }
    });
    var ghost = el("div", "ghost");
    ghost.appendChild(el("span", "mono", String(P.length + 1).padStart(3, "0")));
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
    var main = el("div", "d-main");
    main.appendChild(el("span", "d-meta", "No." + cur._no + " · " + catOf(cur) + " · " + dot(cur.date)));
    main.appendChild(el("span", "d-title", L(cur.title)));
    main.appendChild(el("span", "d-sum", L(cur.summary)));
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

  // 제작 노트: 과정이 특이하거나 채용 담당자가 궁금해할 만한 프로젝트에만 있음. 기본은 접힌 한 줄
  function renderStory(p) {
    var box = document.getElementById("story"); box.textContent = "";
    var s = p.story;
    box.hidden = !s;
    if (!s) return;
    var n = (s.trouble || []).length;
    var d = el("details", "story-box");
    d.appendChild(el("summary", null, t("story.open") + (n ? " · " + t("story.count", { n: n }) : "")));
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

  /* ---------- 첫 화면 ---------- */
  function daysBetween(a, b) { return Math.round((new Date(b) - new Date(a)) / 86400000); }
  function renderHero() {
    // 첫 화면: 이름 → 어떤 사람 → 해온 일 한 문단 → 키워드 → 핵심 성과 숫자 → 프로필 카드
    document.getElementById("identity").textContent = L(D.identity);
    document.getElementById("headline").textContent = L(D.headline);
    var kw = document.getElementById("keywords"); kw.textContent = "";
    (F.keywords || []).forEach(function (k) { kw.appendChild(el("li", null, "#" + L(k.tag))); });
    var hl = document.getElementById("highlights"); hl.textContent = "";
    (D.highlights || []).forEach(function (h) {
      var li = el("li");
      li.appendChild(el("span", "hl-v", L(h.v)));
      li.appendChild(el("span", "hl-l", L(h.l)));
      li.appendChild(el("span", "hl-s", L(h.s)));
      hl.appendChild(li);
    });
    var gl = document.getElementById("glance"); gl.textContent = "";
    (D.glance || []).forEach(function (g) {
      var d = el("div");
      d.appendChild(el("dt", null, L(g.k)));
      d.appendChild(el("dd", null, L(g.v)));
      gl.appendChild(d);
    });
    document.getElementById("profile-email").textContent = D.email;
    document.getElementById("auto-badge").textContent = t("auto.badge", { date: dot(window.SITE_UPDATED) });

    // 프로젝트 섹션 위: 자동 갱신 이야기와 실제 수집 기록
    document.getElementById("hook").textContent = L(F.hook);
    document.getElementById("hook-sub").textContent = L(F.sub);
    var how = document.getElementById("how"); how.textContent = "";
    (F.how || []).forEach(function (s) { how.appendChild(el("li", null, L(s))); });
    document.getElementById("log-title").textContent = t("log.title", { date: dot(F.logDate || window.SITE_UPDATED) });
    var log = document.getElementById("log"); log.textContent = "";
    (F.log || []).forEach(function (e) {
      var li = el("li", e.hi ? "hi" : null);
      li.appendChild(el("span", "t", e.time));
      li.appendChild(el("span", null, L(e.text)));
      log.appendChild(li);
    });
  }

  /* ---------- 소개 · 경력 · 대외활동 ---------- */
  function renderAbout() {
    emph(document.getElementById("about-lead"), L(D.aboutLead));
    var st = document.getElementById("strengths"); st.textContent = "";
    D.strengths.forEach(function (s) {
      var li = el("li", "fig");
      if (s.figure) li.appendChild(el("span", "fig-n", L(s.figure)));
      li.appendChild(el("span", "fig-t", L(s.title)));
      li.appendChild(el("span", "fig-b", L(s.body)));
      st.appendChild(li);
    });
  }
  function renderExperience() {
    var ol = document.getElementById("exp-work"); ol.textContent = "";
    D.experience.forEach(function (x) {
      var li = el("li", "job");
      var per = el("div", "job-period", x.period.replace(" – ", "\n– "));
      if (x.duration) per.appendChild(el("span", "job-dur", L(x.duration)));
      li.appendChild(per);
      var m = el("div", "job-main");
      var org = el("h3", "job-org", L(x.org));
      if (x.orgSub) org.appendChild(el("span", "job-orgsub", L(x.orgSub)));
      m.appendChild(org);
      x.roles.forEach(function (r) {
        var head = el("div", "role-head");
        head.appendChild(el("b", null, L(r.role)));
        if (r.period && x.roles.length > 1) head.appendChild(el("span", null, r.period));
        m.appendChild(head);
        var ul = el("ul");
        r.points[lang].forEach(function (p) { ul.appendChild(el("li", null, p)); });
        if (r.points[lang].length > 1 || x.roles.length === 1) m.appendChild(ul);
        else head.appendChild(el("span", null, "· " + r.points[lang][0]));
      });
      li.appendChild(m);
      ol.appendChild(li);
    });
    var sc = document.getElementById("school"); sc.textContent = "";
    sc.hidden = !D.school;
    if (D.school) {
      sc.appendChild(el("span", "school-k mono", t("school")));
      var sb = el("div", "school-b");
      sb.appendChild(el("b", null, L(D.school)));
      sb.appendChild(el("span", "mono school-p", D.schoolPeriod || ""));
      if (D.schoolNote) sb.appendChild(el("span", "school-n", L(D.schoolNote)));
      sc.appendChild(sb);
    }
  }
  function renderActivities() {
    var fc = document.getElementById("act-featured"); fc.textContent = "";
    var feat = D.activities.filter(function (a) { return a.featured; })[0];
    fc.hidden = !feat;
    if (feat) {
      var f = feat.featured, main = el("div", "fc-main");
      main.appendChild(el("span", "fc-badge", L(f.badge)));
      main.appendChild(el("span", "fc-title", L(f.title)));
      main.appendChild(el("span", "fc-line", L(f.line)));
      fc.appendChild(main);
      var stats = el("div", "fc-stats");
      f.stats.forEach(function (s) { var d = el("div"); d.appendChild(el("span", "fc-v", L(s.v))); d.appendChild(el("span", "fc-l", L(s.l))); stats.appendChild(d); });
      fc.appendChild(stats);
    }
    var ol = document.getElementById("activity-list"); ol.textContent = "";
    D.activities.filter(function (a) { return !a.featured; }).forEach(function (a) {
      var li = el("li", "row");
      li.appendChild(el("span", "row-period", lang === "en" && a.periodEn ? a.periodEn : a.period));
      var body = el("span");
      body.appendChild(el("b", null, L(a.title)));
      if (a.sub) body.appendChild(el("span", "row-sub", " · " + L(a.sub)));
      body.appendChild(el("span", "row-line", a.points[lang][0]));
      li.appendChild(body);
      ol.appendChild(li);
    });
    var edu = (D.education || []).map(function (e) { return e[lang]; }).join(" · ");
    document.getElementById("edu-langs").textContent = t("edu") + " · " + edu + "  ／  " + t("lang") + " · " + D.languages.join(" · ");
  }

  function render() {
    document.documentElement.lang = lang;
    document.title = lang === "en" ? "Gaeun Yoon · Lab Notes" : "윤가은 실험 노트";
    document.querySelectorAll("[data-i18n]").forEach(function (n) { n.textContent = t(n.getAttribute("data-i18n")); });
    document.querySelectorAll(".lang button").forEach(function (b) { b.setAttribute("aria-pressed", String(b.getAttribute("data-lang") === lang)); });
    renderHero(); renderAbout(); renderExperience(); renderActivities(); renderShelf(false);
    document.getElementById("email").textContent = D.email;
    document.getElementById("mail-link").href = "mailto:" + D.email;
    document.getElementById("foot").textContent = t("foot", { date: dot(window.SITE_UPDATED) });
  }

  document.querySelectorAll(".lang button").forEach(function (b) {
    b.addEventListener("click", function () {
      lang = b.getAttribute("data-lang");
      try { localStorage.setItem("lang", lang); } catch (e) {}
      render();
    });
  });

  var note = document.getElementById("copy-note");
  document.getElementById("copy-email").addEventListener("click", function () {
    function selectIt() {
      var r = document.createRange(); r.selectNodeContents(document.getElementById("email"));
      var s = window.getSelection(); s.removeAllRanges(); s.addRange(r);
      note.textContent = t("contact.selected");
    }
    try { navigator.clipboard.writeText(D.email).then(function () { note.textContent = t("contact.copied"); }, selectIt); }
    catch (e) { selectIt(); }
  });

  render();
})();
