// 공통 도구: 데이터, 언어, 문구(t), 요소 만들기. 모든 js 파일이 전역으로 공유한다.
  var D = window.SITE_DATA;
  var F = window.SITE_FEATURE || { categories: [], keywords: [], log: [] };
  // 서가는 오래된 것이 왼쪽. 번호는 만든 순서
  var P = (window.SITE_PROJECTS || []).slice().sort(function (a, b) { return a.date < b.date ? -1 : a.date > b.date ? 1 : 0; });
  P.forEach(function (p, i) { p._no = String(i + 1).padStart(3, "0"); });
  // 기획과 AI 설계 노트(notes.js)를 같은 서가에 합친다. 번호는 N01부터
  (window.SITE_NOTES || []).filter(function (n) { return !n.ed || n.ed === (window.SITE_EDITION || {}).id; }).forEach(function (n, i) { n.kind = "note"; n.category = "notes"; n._no = "N" + String(i + 1).padStart(2, "0"); P.push(n); });
  P.sort(function (a, b) { return a.date < b.date ? -1 : a.date > b.date ? 1 : 0; });

  var UI = {
    ko: {
      "nav.about": "소개", "nav.experience": "경력", "nav.activities": "활동", "nav.projects": "프로젝트", "nav.contact": "연락",
      "nav.about.n": "01 소개", "nav.experience.n": "02 경력", "nav.activities.n": "04 대외활동과 연구", "nav.training": "교육", "nav.training.n": "05 교육 및 자격", "nav.projects.n": "03 프로젝트", "nav.contact.n": "06 연락", "more": "자세히", "less": "접기", "certs": "자격과 어학",
      "log.title": "최근 수집 기록 ({date})", "log.auto": "자동 수집", "log.go": "서가 보러 가기 ↓", "log.count": "서가 {n}권",
      "shelf.kicker": "서가", "shelf.title": "사이드 프로젝트", "shelf.count": "{n}권",
      "side.kicker": "SIDE PROJECTS", "side.lede": "교육 중 Claude로 직접 만든 작은 도구와 결과물입니다. 매일 새벽 자동으로 모아 확인한 것만 서가에 올립니다.",
      "cv.title": "이력서", "cv.exp": "경력", "cv.proj": "프로젝트", "cv.ai": "AI로 한 기획과 설계", "cv.edu": "학력, 교육, 자격", "cv.problem": "문제", "cv.did": "내가 한 일", "cv.result": "결과", "cv.split": "팀과 Claude", "cv.print": "PDF로 저장", "cv.back": "사이트로", "cv.tip": "인쇄 창에서 대상을 'PDF로 저장'으로 고르세요", "note.caseTitle": "기획과 AI 설계 노트 {n}권", "note.caseGo": "모아 보기 →", "shot.app": "실제 앱 화면", "shot.deck": "발표 자료", "jr.learned": "배운 것", "jr.changed": "달라진 점과 증거", "jr.next": "다음에 해 볼 것", "jr.resume": "이력서 다운로드", "cv.download": "이력서 다운로드", "jr.toProject": "프로젝트 카드 보기", "jr.toNotes": "관련 노트 보기", "nav.journey": "LS 여정", "main.kicker": "MAIN PROJECT", "main.problem": "문제", "main.approach": "접근", "main.result": "결과", "main.role": "내 역할", "main.trouble": "막힌 곳 → 해결", "main.zoom": "크게 보기 ↗", "main.stack": "기술", "main.team": "팀", "main.outcome": "결과물", "main.stuck": "막힌 곳", "main.fix": "해결", "main.dialHint": "숫자를 눌러 넘겨 보세요", "main.prev": "이전 단계", "main.next": "다음 단계", "main.process": "이렇게 풀었습니다", "main.screens": "화면", "auto.q": "이 서가는 어떻게 채워지나요?", "ai.rule": "AI 원칙", "nav.reframe": "기획 방식", "nav.reframe.n": "기획 방식", "rf.lede": "AI와 함께 일하며 처음 받은 문제를 다시 정의한 기록입니다. 아래 줄을 누르면 바뀝니다.", "rf.first": "처음 생각한 문제", "rf.claim2": "처음 받은 문제를 *진짜 문제*로 바꾼 장면들", "rf.claim": "AI와 일할 때 저는 *문제부터 다시 정의*합니다", "rf.m1": "처음 문제", "rf.m2": "진짜 문제", "rf.m3": "AI에게 맡김", "rf.m4": "사람이 확인", "viz.strong": "강하게 지지", "viz.ok": "지지", "viz.part": "부분 지지", "viz.weak": "약화", "rf.real": "진짜 문제", "rf.open": "노트 펼쳐 보기 →", "note.tab": "기획과 AI 설계", "note.kicker": "PLANNING NOTE", "note.problem": "문제", "note.decided": "내가 정한 것", "note.ai": "AI에게 맡긴 것", "note.checked": "사람이 확인한 것", "note.result": "결과", "plan.title": "기획 흐름", "plan.mineBadge": "내가 맡음", "plan.mine": "내가 중점으로 맡은 칸", "plan.find": "발견", "plan.real": "진짜 문제", "plan.lens": "관점", "plan.fix": "해법", "plan.check": "확인", "main.deck": "직접 디자인한 발표 자료", "split.mine": "내가 한 일", "split.team": "팀", "split.ai": "AI", "main.more": "과정과 역할 자세히", "main.less": "접기", "about.go": "경력 보기 →", "proof": "증빙", "sample": "실제 자료", "nav.timeline": "걸어온 길", "nav.timeline.n": "걸어온 길", "tl.edu": "재학", "tl.work": "경력", "tl.train": "교육", "tl.act": "활동", "tl.study": "재학 (2018.03~2024.02)", "tl.now": "지금", "tl.hint": "칸에 마우스를 올리면 그달 한 일이 나옵니다", "title": "윤가은 포트폴리오","ptab.label": "메인 프로젝트", "ptab.side": "사이드 프로젝트 보기", "ptab.sum": "메인 프로젝트 {m}개\n사이드 프로젝트 {s}개", "ptab.mainH": "MAIN", "ptab.sideH": "SIDE",
      "shelf.lede": "책등을 누르면 표지가 뽑혀 나옵니다.",
      "shelf.all": "전체", "shelf.outputs": "결과물", "shelf.next": "다음 한 권은 오늘 새벽 2시에", "shelf.open": "{t} 표지 보기",
      "play": "▶ 이 페이지에서 바로 실행", "player.close": "닫기 ✕", "player.loading": "불러오는 중…",
      "edu": "교육", "lang": "영어",
      "nav.experience.n2": "02 경력과 학력", "school": "학력", "how.q": "어떻게 동작하나요?",
      "kicker": "PORTFOLIO", "cta.contact": "연락하기", "cta.projects": "만든 것 보기 ↓", "profile.mail": "이메일",
      "auto.badge": "이 페이지는 매일 새벽 2시에 스스로 업데이트됩니다.\n마지막 업데이트 {date}",
      "d.role": "내가 정한 것", "d.time": "걸린 시간",
      "story.open": "제작 과정 보기", "story.count": "막혔던 곳 {n}",
      "contact.lede": "궁금한 점이 있으면 메일로 편하게 물어봐 주세요.",
      "contact.copy": "주소 복사", "contact.write": "메일 쓰기", "contact.copied": "복사했습니다.", "contact.selected": "주소를 선택했습니다. Ctrl+C로 복사하세요.",
      "foot": "이 페이지는 매일 새벽 2시에 스스로 업데이트됩니다. 마지막 업데이트 {date}. 이 사이트도 Claude로 만들었습니다."
    },
    en: {
      "nav.about": "About", "nav.experience": "Experience", "nav.activities": "Activities", "nav.projects": "Projects", "nav.contact": "Contact",
      "nav.about.n": "01 About", "nav.experience.n": "02 Experience", "nav.activities.n": "04 Activities & research", "nav.training": "Training", "nav.training.n": "05 Training & certificates", "nav.projects.n": "03 Projects", "nav.contact.n": "06 Contact", "more": "More", "less": "Less", "certs": "Certificates & languages",
      "log.title": "Latest collection ({date})", "log.auto": "auto", "log.go": "See the shelf ↓", "log.count": "{n} on the shelf",
      "shelf.kicker": "SHELF", "shelf.title": "Side projects", "shelf.count": "{n}",
      "side.kicker": "SIDE PROJECTS", "side.lede": "Small tools and outputs I built with Claude during the course. They are collected every night, and only what I review goes on the shelf.",
      "cv.title": "Resume", "cv.exp": "Experience", "cv.proj": "Projects", "cv.ai": "Planning and design with AI", "cv.edu": "Education, training, certificates", "cv.problem": "Problem", "cv.did": "What I did", "cv.result": "Result", "cv.split": "Team and Claude", "cv.print": "Save as PDF", "cv.back": "Back to site", "cv.tip": "Choose 'Save as PDF' in the print dialog", "note.caseTitle": "{n} notes on planning and AI design", "note.caseGo": "See all →", "shot.app": "Live app screen", "shot.deck": "Slide", "jr.learned": "What I learned", "jr.changed": "What changed, with proof", "jr.next": "What I will try next", "jr.resume": "Download resume", "cv.download": "Resume", "jr.toProject": "See the project", "jr.toNotes": "See the notes", "nav.journey": "LS journey", "main.kicker": "MAIN PROJECT", "main.problem": "Problem", "main.approach": "Approach", "main.result": "Result", "main.role": "My role", "main.trouble": "Stuck → solved", "main.zoom": "View full size ↗", "main.stack": "Stack", "main.team": "Team", "main.outcome": "Outcome", "main.stuck": "Stuck", "main.fix": "Solved", "main.dialHint": "Hover or tap a number", "main.prev": "Previous step", "main.next": "Next step", "main.process": "How I solved it", "main.screens": "Screens", "auto.q": "How does this shelf fill up?", "ai.rule": "How I use AI", "nav.reframe": "How I plan", "nav.reframe.n": "How I plan", "rf.lede": "Records of redefining the first problem while working with AI. Tap a case below to switch.", "rf.first": "First problem", "rf.claim2": "Moments I turned the first problem into *the real one*", "rf.claim": "Working with AI, I *redefine the problem first*", "rf.m1": "First problem", "rf.m2": "Real problem", "rf.m3": "Hand to AI", "rf.m4": "Human check", "viz.strong": "strong", "viz.ok": "supported", "viz.part": "partial", "viz.weak": "weakened", "rf.real": "Real problem", "rf.open": "Open the note →", "note.tab": "Planning & AI design", "note.kicker": "PLANNING NOTE", "note.problem": "Problem", "note.decided": "What I decided", "note.ai": "Given to AI", "note.checked": "What a person checked", "note.result": "Result", "plan.title": "How I framed it", "plan.mineBadge": "My part", "plan.mine": "My focus", "plan.find": "Spotted", "plan.real": "Real problem", "plan.lens": "Lens", "plan.fix": "Solution", "plan.check": "Checked", "main.deck": "Slides I designed", "split.mine": "Me", "split.team": "Team", "split.ai": "AI", "main.more": "Process and role", "main.less": "Close", "about.go": "See experience →", "proof": "Proof", "sample": "Samples", "nav.timeline": "Timeline", "nav.timeline.n": "Timeline", "tl.edu": "Study", "tl.work": "Work", "tl.train": "Training", "tl.act": "Activities", "tl.study": "enrolled (2018.03~2024.02)", "tl.now": "now", "tl.hint": "Hover a month to see what I was doing", "title": "Gaeun Yoon, Portfolio","ptab.label": "Main projects", "ptab.side": "See side projects", "ptab.sum": "{m} main projects\n{s} side projects", "ptab.mainH": "MAIN", "ptab.sideH": "SIDE",
      "shelf.lede": "Click a spine to pull out its cover.",
      "shelf.all": "All", "shelf.outputs": "Outputs", "shelf.next": "Next one tonight at 2 a.m.", "shelf.open": "Open {t}",
      "play": "▶ Run it on this page", "player.close": "Close ✕", "player.loading": "Loading…",
      "edu": "Training", "lang": "English",
      "nav.experience.n2": "02 Experience & education", "school": "Education", "how.q": "How does this work?",
      "kicker": "PORTFOLIO", "cta.contact": "Get in touch", "cta.projects": "See what I built ↓", "profile.mail": "Email",
      "auto.badge": "This page updates itself every night at 2 a.m.\nLast update {date}",
      "d.role": "What I decided", "d.time": "Time",
      "story.open": "How it was made", "story.count": "{n} problems solved",
      "contact.lede": "Questions are welcome by email.",
      "contact.copy": "Copy address", "contact.write": "Write an email", "contact.copied": "Copied.", "contact.selected": "Address selected. Press Ctrl+C to copy.",
      "foot": "This page updates itself every night at 2 a.m. Last update {date}. Built with Claude, too."
    }
  };

  var lang = "ko";
  try { lang = localStorage.getItem("lang") || "ko"; } catch (e) {}
  if (lang !== "ko" && lang !== "en") lang = "ko";

  // 사이트별 설정(edition.js): 문구, 첫 화면, 순서. 같은 데이터로 유관산업(bio)과 무관산업(global) 두 사이트를 만든다.
  var E = window.SITE_EDITION || { id: "bio", ui: {} };
  function t(key, vars) {
    var s = E.ui && E.ui[lang] ? E.ui[lang][key] : null;
    if (s == null) s = UI[lang][key];
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
    "디자인 캔버스": "Design canvas", "AI 인터뷰": "AI interviews", "Supabase": "Supabase", "GitHub": "GitHub", "구글 시트 연결": "Google Sheets connector"
  };
  function toolName(x) { return lang === "en" && TOOL_EN[x] ? TOOL_EN[x] : x; }
  function catOf(p) { var c = (F.categories || []).filter(function (c) { return c.id === p.category; })[0]; return c ? L(c.title) : ""; }
  // *강조* → <em>
  function emph(target, text) {
    target.textContent = "";
    String(text).split("*").forEach(function (part, i) { target.appendChild(i % 2 ? el("em", null, part) : document.createTextNode(part)); });
  }
  // 경력과 프로젝트 문장: **핵심** → <strong class="hi"> (하이라이트), 나머지는 글자 그대로
  function rich(tag, cls, text) {
    var n = el(tag, cls);
    String(text || "").split("**").forEach(function (part, i) { n.appendChild(i % 2 ? el("strong", "hi", part) : document.createTextNode(part)); });
    return n;
  }
  // 사이트별로 보여 줄 항목만 남긴다(ed: "bio" 또는 "global"이 붙은 항목은 그 사이트에서만)
  function forEdition(list) { return (list || []).filter(function (x) { return !x.ed || x.ed === E.id; }); }

