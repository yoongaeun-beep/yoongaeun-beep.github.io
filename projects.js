// 프로젝트 목록 — 매일 자동화가 "올려" 승인 후 이 파일을 다시 씁니다. 직접 고쳐도 됩니다.
// 서가에는 오래된 것이 왼쪽, 새것이 오른쪽에 꽂힙니다. 항목 형식:
// { id, date: "YYYY-MM-DD", title: {ko, en}, summary: {ko, en}, tools: ["아티팩트", ...],
//   category: feature.js의 categories id, label: {ko, en} 책등에 쓰는 분류명(누구나 알아볼 수 있게, 제목은 표지와 상세에),
//   design: 책등·표지 디자인. 전용 디자인("bomber" | "p0" | "beat" | "inbox" | "timeline" | "daily") 또는 "generic",
//   spineH: 책등 높이(340–440, 이웃과 다르게), cover: "assets/covers/<id>.jpg"(선택, 표지에 넣을 화면),
//   generic일 때: palette: {bg, ink, accent}, pattern: "dots"|"stripes"|"lanes"|"grid"|"stars"|"hazard"|"airmail"|"none",
//                 motif: 표지에 크게 쓸 짧은 글자(예: "02:00", "2,173"), stamp: 책등 위 도장 글자(1–2자, 선택),
//   role: {ko, en} 내가 직접 정한 것(대화 기록에 근거, 모르면 생략), time: {ko, en} 걸린 시간(대화 시작~끝 기준, 선택),
//   link: "projects/<id>/index.html"(페이지 안에서 바로 실행) | null, note: {ko, en} (링크가 없을 때 사유), source }
window.SITE_PROJECTS = [
  {
    id: "hapgyeok-bomber",
    label: { ko: "취준생 미니게임 시제품", en: "Mini-game prototype" },  // 책등에 쓰는 분류명(누구나 알아볼 수 있게)
    category: "games",
    design: "bomber", spineH: 404, cover: "assets/covers/bomber.jpg",
    date: "2026-10-06",
    title: { ko: "합격 폭격기", en: "Offer Bomber" },
    summary: {
      ko: "취준생이 3분 동안 대기업 수십 곳에 합격하며 스트레스를 푸는 게임입니다. Claude가 먼저 나를 인터뷰해 재미 요소와 대상을 정리하고, 그 기획서를 바탕으로 첫 프로토타입을 만들었습니다.",
      en: "A stress-relief game where job seekers land offers from dozens of big companies in three minutes. Claude interviewed me first to pin down the fun and the audience, then built the first prototype from that plan."
    },
    tools: ["질문 카드", "계획 모드", "아티팩트"],
    role: { ko: "대상(취준생)과 목표 감정(도파민)을 정하고, Claude의 인터뷰 질문에 답하며 기획 방향을 결정", en: "Set the audience (job seekers) and target feeling (a dopamine hit), and steered the plan through Claude's interview" },
    time: { ko: "기획부터 P0까지 약 2시간 20분", en: "About 2h 20m from plan to P0" },
    story: {
      why: { ko: "취업 준비가 길어지면 불합격 메일만 쌓입니다. 게임에서라도 시원하게 합격해 보면 기분이 풀리지 않을까 해서, '도파민이 터지는' 3분짜리 게임을 목표로 잡았습니다.", en: "Job hunting piles up rejection emails. I wanted a 3-minute game where you get hired everywhere, purely for the dopamine." },
      steps: [
        { ko: "바로 만들지 않고 Claude가 나를 인터뷰하게 해서 대상·감정·플레이 시간을 먼저 정함", en: "Had Claude interview me first to fix the audience, feeling and play time" },
        { ko: "기획서를 단계(Phase)로 나누고, 데이터베이스 없는 가벼운 구조로 한정", en: "Split the plan into phases, with no database or backend" },
        { ko: "미니게임 11판짜리 첫 프로토타입을 만들어 링크로 공유", en: "Built a first prototype with 11 mini-games and shared it as a link" }
      ],
      trouble: [
        { problem: { ko: "아는 K-pop 노래를 넣고 싶었지만 저작권 때문에 불가", en: "Wanted K-pop songs, but copyright ruled them out" }, fix: { ko: "저작권이 끝난 '운동회 클래식'(캉캉, 윌리엄 텔 서곡 등)으로 바꿔 누구나 아는 신남은 유지", en: "Switched to public-domain 'sports-day classics' everyone in Korea knows" } },
        { problem: { ko: "기능이 늘어나 기획이 무거워짐", en: "The plan grew too heavy" }, fix: { ko: "P0를 다시 정의: '3판짜리로 성공의 기분이 나는지만 확인'하고 나머지는 다음 단계로 미룸", en: "Redefined P0 as 'does winning 3 rounds feel good?' and deferred the rest" } }
      ],
      special: { ko: "엔딩 수집형 구성과 '틀려도 괜찮아, 어차피 합격이야'라는 톤. 실패가 없는 게임을 일부러 설계했습니다.", en: "Collectible endings and a 'you can't fail' tone, designed on purpose." }
    },
    link: "projects/hapgyeok-bomber/index.html",
    source: "desktop"
  },
  {
    id: "hapgyeok-bomber-p0",
    label: { ko: "리듬게임 엔진 검증", en: "Rhythm engine test" },  // 책등에 쓰는 분류명(누구나 알아볼 수 있게)
    category: "games",
    design: "p0", spineH: 372,
    date: "2026-10-06",
    title: { ko: "합격 폭격기 P0: 캉캉 리듬", en: "Offer Bomber P0: Can-can rhythm" },
    summary: {
      ko: "무거워진 기획을 가볍게 다시 나누고 첫 단계(P0)부터 만들었습니다. 캉캉 16마디를 음표 데이터로 옮기고, 4줄 노트와 난이도 3단계를 붙였으며, 화면이 아니라 음악 재생 시간을 기준으로 노트를 맞췄습니다.",
      en: "Re-scoped a heavy plan into phases and built P0: transcribed 16 bars of the Can-can into note data, added four lanes and three difficulty levels, and synced notes to audio time rather than frame time."
    },
    tools: ["계획 모드", "아티팩트"],
    role: { ko: "기획이 무겁다고 판단해 범위를 리듬게임으로 좁히고, 곡(캉캉)·줄 수(4줄)·난이도별 빠르기를 결정", en: "Judged the plan too heavy, narrowed it to a rhythm game, and chose the song, lane count and speeds" },
    time: { ko: "합격 폭격기와 같은 작업 안에서", en: "Same session as Offer Bomber" },
    story: {
      why: { ko: "미니게임 여러 개를 다 만들기 전에, 핵심인 '음악에 맞춰 치는 손맛'이 되는지부터 확인하고 싶었습니다.", en: "Before building many mini-games, I wanted to prove the core: does hitting notes to music feel good?" },
      steps: [
        { ko: "범위를 리듬게임 하나로 좁히고 곡은 캉캉으로 결정", en: "Narrowed scope to one rhythm game, with the Can-can" },
        { ko: "캉캉 16마디를 '음 높이 + 길이' 데이터로 옮기고 마디마다 표시해 틀린 곳을 짚을 수 있게 함", en: "Transcribed 16 bars into pitch+length data, highlighting each bar so errors were easy to point out" },
        { ko: "들어 보고 1줄 → 4줄로 변경, 난이도별 빠르기(120/155/185) 결정", en: "After listening, went from 1 lane to 4 and set speeds per level" }
      ],
      trouble: [
        { problem: { ko: "Claude는 소리를 들을 수 없어 멜로디와 싱크를 스스로 확인하지 못함", en: "Claude can't hear audio, so it couldn't check melody or sync itself" }, fix: { ko: "내가 직접 듣고 마디 번호로 피드백, 기기마다 다른 소리 지연은 '싱크 보정' 막대로 맞추게 함", en: "I listened and gave bar-by-bar feedback; a sync-offset slider handles device latency" } },
        { problem: { ko: "화면이 버벅이면 노트와 음악이 어긋남", en: "Notes drifted from music when the screen lagged" }, fix: { ko: "노트 위치를 화면 시간이 아니라 음악 재생 시간 기준으로 계산", en: "Positioned notes by audio time, not frame time" } }
      ],
      special: { ko: "멜로디가 올라가면 노트도 오른쪽으로 가도록 음 높이와 줄을 연결해, 손으로 멜로디를 치는 느낌을 냈습니다.", en: "Higher notes fall in lanes further right, so your hands trace the melody." }
    },
    link: "projects/hapgyeok-bomber-p0/index.html",
    source: "desktop"
  },
  {
    id: "hapgyeok-beat",
    label: { ko: "채용 테마 리듬게임", en: "Hiring-themed rhythm game" },  // 책등에 쓰는 분류명(누구나 알아볼 수 있게)
    category: "games",
    design: "beat", spineH: 428, cover: "assets/covers/beat.jpg",
    date: "2026-10-06",
    title: { ko: "합격 비트", en: "Pass Beat" },
    summary: {
      ko: "서류부터 임원 면접까지 네 번의 채용 전형을 리듬게임으로 만들었습니다. 떨어지는 지원 서류를 박자에 맞춰 치면 전형을 통과하고, 결과 화면에 합격 통지서가 나옵니다.",
      en: "A rhythm game of four hiring rounds, from document screening to the executive interview. Hit the falling applications on the beat to pass each round and get an offer letter at the end."
    },
    tools: ["파일 만들기", "내장 브라우저", "아티팩트"],
    role: { ko: "'취준생이 미친 듯 재밌게 할 리듬게임'이라는 목표를 주고, 플레이해 본 뒤 '아는 노래로' 바꾸자는 방향을 냄", en: "Set the goal (a wildly fun rhythm game for job seekers) and, after playing, asked for songs people know" },
    time: { ko: "약 30분", en: "About 30 min" },
    link: "projects/hapgyeok-beat/index.html",
    source: "desktop"
  },
  {
    id: "inbox-diagnosis",
    label: { ko: "메일함 데이터 분석", en: "Inbox data analysis" },  // 책등에 쓰는 분류명(누구나 알아볼 수 있게)
    category: "automation",
    design: "inbox", spineH: 392,
    date: "2026-10-06",
    title: { ko: "받은편지함 습관 진단", en: "Inbox habit check-up" },
    summary: {
      ko: "Gmail을 연결해 받은편지함 2,173개 대화의 패턴을 분석했습니다. 필터를 걸면 메일이 얼마나 줄어드는지 직접 눌러보는 시뮬레이션과 단계별 정리 체크리스트를 만들었습니다.",
      en: "Connected Gmail and analyzed patterns across 2,173 inbox threads, then built a filter simulator and a step-by-step cleanup checklist."
    },
    tools: ["커넥터(Gmail)", "아티팩트"],
    link: null,
    note: { ko: "개인 메일 내용이 들어 있어 화면은 비공개", en: "Not shown: contains personal email data" },
    source: "web"
  },
  {
    id: "career-timeline",
    label: { ko: "경력 연표 시각화", en: "Career timeline viz" },  // 책등에 쓰는 분류명(누구나 알아볼 수 있게)
    category: "automation",
    design: "timeline", spineH: 356,
    date: "2026-10-06",
    title: { ko: "커리어 타임라인", en: "Career timeline" },
    summary: {
      ko: "이력서와 경력 문서 여러 개에 흩어진 사실을 모아, 학력·경력·연구·활동별로 걸러 볼 수 있는 연표로 정리했습니다. 문서끼리 어긋나는 날짜와 숫자도 이 과정에서 바로잡았습니다.",
      en: "Gathered facts scattered across several resumes and career documents into one timeline you can filter by education, work, research and activities, fixing dates and numbers that disagreed along the way."
    },
    tools: ["파일 읽기", "아티팩트"],
    link: "projects/career-timeline/index.html",
    source: "web"
  },
  {
    id: "daily-update",
    label: { ko: "포트폴리오 자동화", en: "Portfolio automation" },  // 책등에 쓰는 분류명(누구나 알아볼 수 있게)
    category: "automation",
    design: "daily", spineH: 416,
    date: "2026-10-07",
    title: { ko: "AI 작업 자동 수집 포트폴리오", en: "Self-updating AI portfolio" },
    summary: {
      ko: "지금 보고 있는 이 페이지입니다. 매일 새벽 Claude와의 대화와 결과물을 자동으로 모아 프로젝트 초안과 블로그 초안을 만들고, '올려' 한 마디로 이 페이지에 반영합니다. 공개 전에 개인정보를 걸러내는 점검도 넣었습니다.",
      en: "The page you are reading. Every night it collects my Claude conversations and outputs, drafts project entries and a blog post, and publishes them here after a one-word approval, with a privacy check before anything goes live."
    },
    tools: ["예약 작업", "계획 모드", "노션 연결", "대화 목록 관리", "아티팩트"],
    role: { ko: "\"시간을 따로 들이지 않고 보여주기\"라는 목표를 정하고, 공개 전 승인·개인정보 규칙·디자인 방향을 결정", en: "Defined the goal (show my work without extra effort) and set the approval step, privacy rules and design direction" },
    time: { ko: "이틀(10.06–10.07)", en: "Two days (Oct 6–7)" },
    story: {
      why: { ko: "교육 중 매일 결과물이 생기는데 여기저기 흩어졌습니다. 따로 시간을 들이지 않아도 모이고, 남에게 바로 보여줄 수 있는 곳이 필요했습니다.", en: "The course produced work every day, scattered everywhere. I wanted it gathered and shareable without spending extra time." },
      steps: [
        { ko: "처음엔 이력서 사이트로 시작했다가, '매일 자동으로 쌓이는 포트폴리오'로 기획을 다시 잡음", en: "Started as a resume site, then re-planned it as a portfolio that fills itself daily" },
        { ko: "결과물이 생기는 세 경로(데스크톱 대화, 아티팩트, 웹 채팅 → Notion)를 모두 모으는 새벽 2시 예약 작업 설계", en: "Designed a 2 a.m. job collecting from three channels: desktop chats, artifacts, web chats via Notion" },
        { ko: "디자인 캔버스에서 시안을 세 차례 받아 비교한 뒤 '책장' 구성을 고름", en: "Compared three rounds of design studies on a canvas and picked the bookshelf layout" },
        { ko: "채용 담당자 입장에서 처음부터 끝까지 써 보며 부족한 점을 고침", en: "Walked through it as a recruiter and fixed what was missing" }
      ],
      trouble: [
        { problem: { ko: "사이트에서 게임 '열어보기'를 누르면 빈 화면", en: "'Open' on a game showed a blank page" }, fix: { ko: "새 탭은 로그인 보호 밖이라 막힌다는 원인을 찾아, 페이지 안 플레이어로 실행하도록 바꿈", en: "Found new tabs fall outside the login protection; games now run in an in-page player" } },
        { problem: { ko: "자동 수집이 자기 자신의 대화까지 결과물로 가져옴", en: "The collector picked up its own conversation as a result" }, fix: { ko: "수집 작업에 표식을 달아 스스로를 걸러내게 함", en: "Tagged the job so it filters itself out" } },
        { problem: { ko: "자동으로 올리면 개인정보나 실수가 그대로 공개될 위험", en: "Auto-publishing could expose personal data or mistakes" }, fix: { ko: "공개 전 개인정보 점검과 '올려' 한 마디 승인 단계를 넣음", en: "Added a privacy check and a one-word approval before anything goes live" } },
        { problem: { ko: "첫 화면이 사람보다 '자동 갱신' 장치를 먼저 보여 줌", en: "The first screen showcased the gadget before the person" }, fix: { ko: "이름과 성과를 맨 앞에 두고, 자동 갱신 이야기는 이 서가 위로 옮김", en: "Put name and results first; moved the automation story above this shelf" } }
      ],
      special: { ko: "지금 보고 있는 이 페이지가 결과물이자 증거입니다. 내일 아침이면 서가에 한 권이 더 꽂혀 있을 수 있습니다.", en: "This page is both the result and the proof. By tomorrow morning there may be one more book on the shelf." }
    },
    link: null,
    note: { ko: "이 페이지 자체", en: "This page itself" },
    source: "desktop"
  },
  {
    id: "sunblock-helper",
    label: { ko: "자외선 맞춤 추천 앱", en: "UV-based advice app" },  // 책등에 쓰는 분류명(누구나 알아볼 수 있게)
    category: "life",
    design: "generic", spineH: 388,
    palette: { bg: "#FFE9A8", ink: "#2B2118", accent: "#F26B1D" },
    pattern: "stripes", motif: "UV 8", stamp: "☀",
    date: "2026-10-07",
    title: { ko: "선블럭 결정 도우미", en: "Sunscreen Decision Helper" },
    summary: {
      ko: "날씨 API의 자외선 지수로 오늘 선크림을 얼마나 자주 덧발라야 하는지 정해 주는 웹앱입니다. UV 단계마다 결과가 달라지도록 판정 기준을 따로 만들어 경계값을 테스트했고, 무기자차·유기자차 추천과 접었다 펴는 사용법 카드뉴스를 넣었습니다.",
      en: "A web app that uses a weather API's UV index to decide how often to reapply sunscreen today. Rules differ per UV level and were boundary-tested; it also recommends mineral vs. chemical filters and has collapsible card-news usage tips."
    },
    tools: ["웹 검색", "계획 모드", "내장 브라우저", "디자인 캔버스", "아티팩트"],
    role: {
      ko: "'가을엔 안 더워서 선크림을 안 바르니 아예 정해 주는 걸 만들자'는 목적을 정하고, UV 8이어도 같은 간격이냐고 짚어 단계별 판정으로 바꾸게 함. 글이 많다·너무 어둡다는 피드백으로 카드뉴스·접기 UI와 밝은 디자인을 이끌어냄",
      en: "Set the goal (people skip sunscreen in cool autumn sun, so just decide for them), pushed for per-UV-level rules, and drove the card-news, collapsible and brighter design through feedback"
    },
    time: { ko: "약 5시간(대화 기준)", en: "About 5 h (conversation time)" },
    story: {
      why: { ko: "가을엔 햇볕은 따가운데 덥지 않아서 선크림을 잘 안 바릅니다. 알려 주는 데서 그치지 않고 바를 시간과 살지 말지까지 정해 주는 도구를 만들고 싶었습니다.", en: "Autumn sun is strong but not hot, so people skip sunscreen. I wanted a tool that decides for them, not just informs." },
      trouble: [
        { problem: { ko: "UV가 8이어도 2시간 간격으로만 안내하는 등 결과가 단계별로 구분되지 않음", en: "Advice was the same at UV 8 as at lower levels" }, fix: { ko: "UV 단계별 판정 로직을 따로 만들고 경계값 테스트 페이지로 확인", en: "Built per-level logic and a boundary-value test page" } },
        { problem: { ko: "글이 너무 많고 화면이 어둡고 답답함", en: "Too much text and too dark" }, fix: { ko: "사용법을 카드뉴스로 바꿔 접고 펼 수 있게 하고, 디자인 캔버스로 시안을 받아 밝은 방향으로 수정", en: "Turned tips into collapsible card news and redesigned brighter via the design canvas" } }
      ]
    },
    link: "projects/sunblock-helper/index.html",
    source: "desktop"
  }
];
window.SITE_UPDATED = "2026-10-08";
