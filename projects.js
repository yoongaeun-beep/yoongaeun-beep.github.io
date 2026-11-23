// 프로젝트 목록: 매일 자동화가 "올려" 승인 후 이 파일을 다시 씁니다. 직접 고쳐도 됩니다.
// 서가에는 오래된 것이 왼쪽, 새것이 오른쪽에 꽂힙니다. 항목 형식:
// { id, date: "YYYY-MM-DD", title: {ko, en}, summary: {ko, en}, tools: ["아티팩트", ...],
//   category: feature.js의 categories id, label: {ko, en} 책등에 쓰는 분류명(누구나 알아볼 수 있게, 제목은 표지와 상세에),
//   design: 책등, 표지 디자인. 전용 디자인("bomber" | "p0" | "beat" | "inbox" | "timeline" | "daily") 또는 "generic",
//   spineH: 책등 높이(340~440, 이웃과 다르게), cover: "assets/covers/<id>.jpg"(선택, 표지에 넣을 화면),
//   generic일 때: palette: {bg, ink, accent}, pattern: "dots"|"stripes"|"lanes"|"grid"|"stars"|"hazard"|"airmail"|"none",
//                 motif: 표지에 크게 쓸 짧은 글자(예: "02:00", "2,173"), stamp: 책등 위 도장 글자(1~2자, 선택),
//   role: {ko, en} 내가 직접 정한 것(대화 기록에 근거, 모르면 생략), time: {ko, en} 걸린 시간(대화 시작~끝 기준, 선택),
//   link: "projects/<id>/index.html"(페이지 안에서 바로 실행) | null, note: {ko, en} (링크가 없을 때 사유), source }
window.SITE_PROJECTS = [
  {
    id: "hapgyeok-bomber",
    label: { ko: "AI로 기획서 쓰고 만든 게임", en: "Game built from an AI-written plan" },  // 책등에 쓰는 분류명(누구나 알아볼 수 있게)
    category: "games",
    design: "bomber", spineH: 404, cover: "assets/covers/bomber.jpg",
    date: "2026-10-06",
    title: { ko: "합격 폭격기", en: "Offer Bomber" },
    summary: {
      ko: "수업 주제는 'Claude로 기획서 만들기'였습니다. 바로 코딩을 시키지 않고, Claude가 질문 카드로 저를 인터뷰하게 해 기획서를 먼저 썼습니다(계획 모드). 그 기획서를 개발 단계(Phase)로 나눈 뒤 첫 프로토타입까지 만들었습니다. 결과물은 취준생이 3분 동안 합격을 쓸어 담으며 스트레스를 푸는 게임입니다.",
      en: "The class was about writing a product plan with Claude. Instead of asking for code, I had Claude interview me with question cards and write the plan first (plan mode), split it into phases, then build the first prototype: a 3-minute stress-relief game where job seekers land offer after offer."
    },
    tools: ["질문 카드", "계획 모드", "아티팩트"],
    role: { ko: "대상(취준생)과 목표 감정(도파민)을 정하고, Claude의 인터뷰 질문에 답하며 기획 방향을 결정", en: "Set the audience (job seekers) and target feeling (a dopamine hit), and steered the plan through Claude's interview" },
    time: { ko: "기획부터 P0까지 약 2시간 20분", en: "About 2h 20m from plan to P0" },
    story: {
      why: { ko: "취업 준비가 길어지면 불합격 메일만 쌓입니다. 게임에서라도 시원하게 합격해 보면 기분이 풀리지 않을까 해서, '도파민이 터지는' 3분짜리 게임을 목표로 잡았습니다.", en: "Job hunting piles up rejection emails. I wanted a 3-minute game where you get hired everywhere, purely for the dopamine." },
      steps: [
        { ko: "인터뷰: Claude가 질문 카드 3라운드로 대상, 핵심 재미, 판 구조, 실패 처리, 엔딩을 물어봄", en: "Interview: Claude asked three rounds of question cards on audience, core fun, rounds, failure and endings" },
        { ko: "기획서: 계획 모드로 답을 기획서 한 장에 정리하고, 확인 후 승인", en: "Plan: plan mode turned the answers into a one-page plan, which I reviewed and approved" },
        { ko: "단계 나누기: 기획서를 Phase로 나누고 데이터베이스, 서버 없는 구조로 한정", en: "Phasing: split the plan into phases, with no database or server" },
        { ko: "구현: 기획서대로 미니게임 11판짜리 첫 프로토타입을 만들어 링크로 공유", en: "Build: made an 11-round first prototype from the plan and shared it as a link" }
      ],
      trouble: [
        { problem: { ko: "아는 K-pop 노래를 넣고 싶었지만 저작권 때문에 불가", en: "Wanted K-pop songs, but copyright ruled them out" }, fix: { ko: "저작권이 끝난 '운동회 클래식'(캉캉, 윌리엄 텔 서곡 등)으로 바꿔 누구나 아는 신남은 유지", en: "Switched to public-domain 'sports-day classics' everyone in Korea knows" } },
        { problem: { ko: "기능이 늘어나 기획이 무거워짐", en: "The plan grew too heavy" }, fix: { ko: "P0를 다시 정의: '3판짜리로 성공의 기분이 나는지만 확인'하고 나머지는 다음 단계로 미룸", en: "Redefined P0 as 'does winning 3 rounds feel good?' and deferred the rest" } }
      ],
      special: { ko: "배운 점: AI에게 바로 만들게 하는 것보다, AI가 먼저 질문하게 해서 기획서를 쓰는 편이 원하는 결과에 훨씬 빨리 닿았습니다. 게임은 엔딩 수집형에 '틀려도 괜찮아, 어차피 합격이야' 톤으로, 실패가 없도록 일부러 설계했습니다.", en: "Lesson: letting the AI ask questions and write a plan first got me to what I wanted far faster than asking it to build right away. The game itself has collectible endings and a deliberate 'you can't fail' tone." }
    },
    link: "projects/hapgyeok-bomber/index.html",
    source: "desktop"
  },
  {
    id: "hapgyeok-bomber-p0",
    label: { ko: "기획서 1단계(P0) 구현", en: "Plan phase 1 (P0) build" },  // 책등에 쓰는 분류명(누구나 알아볼 수 있게)
    category: "games",
    design: "p0", spineH: 372,
    date: "2026-10-06",
    title: { ko: "합격 폭격기 P0: 캉캉 리듬", en: "Offer Bomber P0: Can-can rhythm" },
    summary: {
      ko: "무거워진 기획을 가볍게 다시 나누고 첫 단계(P0)부터 만들었습니다. 캉캉 16마디를 음표 데이터로 옮기고, 4줄 노트와 난이도 3단계를 붙였으며, 화면이 아니라 음악 재생 시간을 기준으로 노트를 맞췄습니다.",
      en: "Re-scoped a heavy plan into phases and built P0: transcribed 16 bars of the Can-can into note data, added four lanes and three difficulty levels, and synced notes to audio time rather than frame time."
    },
    tools: ["계획 모드", "아티팩트"],
    role: { ko: "기획이 무겁다고 판단해 범위를 리듬게임으로 좁히고, 곡(캉캉), 줄 수(4줄), 난이도별 빠르기를 결정", en: "Judged the plan too heavy, narrowed it to a rhythm game, and chose the song, lane count and speeds" },
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
    points: {"ko": ["Gmail 받은편지함 **2,173개 대화**의 패턴 분석", "필터를 걸면 메일이 얼마나 줄어드는지 **직접 눌러 보는 시뮬레이션**", "단계별 정리 체크리스트"], "en": ["Analyzed **2,173 inbox threads** in Gmail", "**A clickable simulator** of how much each filter cuts", "A step-by-step cleanup checklist"]},
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
    points: {"ko": ["이력서와 경력 문서 **여러 개에 흩어진 사실**을 연표 하나로", "학력, 경력, 연구, 활동별로 **걸러 보기**", "문서끼리 **어긋나는 날짜와 숫자**를 바로잡음"], "en": ["Facts **scattered across several resumes** in one timeline", "**Filter** by education, work, research and activities", "Fixed **dates and numbers that disagreed**"]},
    label: { ko: "경력 연표 시각화", en: "Career timeline viz" },  // 책등에 쓰는 분류명(누구나 알아볼 수 있게)
    category: "automation",
    design: "timeline", spineH: 356,
    date: "2026-10-06",
    title: { ko: "커리어 타임라인", en: "Career timeline" },
    summary: {
      ko: "이력서와 경력 문서 여러 개에 흩어진 사실을 모아, 학력, 경력, 연구, 활동별로 걸러 볼 수 있는 연표로 정리했습니다. 문서끼리 어긋나는 날짜와 숫자도 이 과정에서 바로잡았습니다.",
      en: "Gathered facts scattered across several resumes and career documents into one timeline you can filter by education, work, research and activities, fixing dates and numbers that disagreed along the way."
    },
    tools: ["파일 읽기", "아티팩트"],
    link: "projects/career-timeline/index.html",
    source: "web"
  },
  {
    id: "daily-update",
    points: {"ko": ["지금 보고 있는 이 페이지", "매일 새벽 Claude 작업을 **자동으로 모아** 프로젝트와 블로그 초안 작성", "**'올려' 한 마디**로 반영, 공개 전 **개인정보 점검**"], "en": ["The page you are reading", "Every night it **collects my Claude work** and drafts project and blog entries", "Publishes on **a one-word approval**, with a **privacy check** first"]},
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
    role: { ko: "\"시간을 따로 들이지 않고 보여주기\"라는 목표를 정하고, 공개 전 승인, 개인정보 규칙, 디자인 방향을 결정", en: "Defined the goal (show my work without extra effort) and set the approval step, privacy rules and design direction" },
    time: { ko: "이틀(10.06~10.07)", en: "Two days (Oct 6~7)" },
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
    points: {"ko": ["공개 날씨 API에서 **지금 자외선 지수와 시간별 예보**를 받아 옴", "직접 설계한 판단 함수로 **선크림 바를 시각과 횟수**를 정해 줌", "불러오는 중, 데이터 없음, 실패 **세 가지 상태를 모두 처리**, 실패하면 '실제 날씨 아님' 표시"], "en": ["Pulls **the current UV index and hourly forecast** from a public weather API", "A decision function I designed sets **when and how often to apply sunscreen**", "**Handles loading, no-data and failure**, marking fallback data as not real"]},
    label: { ko: "날씨 API 연동 웹앱", en: "Weather-API web app" },  // 책등에 쓰는 분류명(누구나 알아볼 수 있게)
    category: "life",
    design: "generic", spineH: 388,
    palette: { bg: "#FFE9A8", ink: "#2B2118", accent: "#F26B1D" },
    pattern: "stripes", motif: "UV 8", stamp: "☀",
    date: "2026-10-07",
    title: { ko: "선블럭 결정 도우미", en: "Sunscreen Decision Helper" },
    summary: {
      ko: "수업 주제는 '실시간 날씨 API를 웹페이지에 연결하기'였습니다. 공개 날씨 API(Open-Meteo)에서 지금 자외선 지수와 시간별 예보를 받아 오고, 그 값으로 판단하는 함수를 직접 설계했습니다. 그 결과 오늘 선크림을 몇 시에 얼마나 자주 발라야 하는지 정해 주는 웹앱을 만들었습니다. 불러오는 중, 데이터 없음, 읽기 실패 세 가지 상태를 모두 처리했고, 실패하면 연습용 고정 데이터로 바꾸면서 '실제 날씨 아님'을 표시합니다.",
      en: "The class was about wiring a live weather API into a web page. The app pulls the current UV index and hourly forecast from a public weather API (Open-Meteo), and a decision function I designed turns it into when and how often to apply sunscreen today. It handles loading, no-data and fetch-failure states, falling back to a practice data file clearly marked 'not real weather'."
    },
    tools: ["날씨 API", "웹 검색", "계획 모드", "내장 브라우저", "디자인 캔버스", "아티팩트"],
    role: {
      ko: "'가을엔 안 더워서 선크림을 안 바르니 아예 정해 주는 걸 만들자'는 목적을 정하고, UV 8이어도 같은 간격이냐고 짚어 단계별 판정으로 바꾸게 함. 글이 많다, 너무 어둡다는 피드백으로 카드뉴스, 접기 UI와 밝은 디자인을 이끌어냄",
      en: "Set the goal (people skip sunscreen in cool autumn sun, so just decide for them), pushed for per-UV-level rules, and drove the card-news, collapsible and brighter design through feedback"
    },
    time: { ko: "약 5시간(대화 기준)", en: "About 5 h (conversation time)" },
    story: {
      why: { ko: "과제는 '날씨 데이터로 판단해 주는 앱 20가지 중 하나 만들기'였습니다. 가을엔 햇볕은 따가운데 덥지 않아서 선크림을 잘 안 바르기 때문에, 자외선 지수를 골라 바를 시간까지 정해 주는 앱으로 정했습니다.", en: "The assignment: pick one of 20 apps that make a decision from weather data. Autumn sun is strong but not hot, so people skip sunscreen; I chose the UV index and made the app decide for them." },
      steps: [
        { ko: "API 확인: 실제로 API를 호출해 자외선 값(현재 4.35, 최고 5.3)이 오는지 먼저 확인", en: "API check: called the API to confirm real UV values came back" },
        { ko: "판단 함수: 받은 날씨 데이터를 넣으면 '지금 바르세요/몇 시간마다' 결론을 내는 함수를 따로 설계", en: "Decision function: designed a separate function that turns the weather data into a verdict" },
        { ko: "예외 처리: 불러오는 중, 데이터 없음, 읽기 실패 화면을 만들고, 출처를 표시하고, 페이지당 1회만 호출", en: "Edge cases: loading, no-data and failure states, source credit, one call per page load" }
      ],
      trouble: [
        { problem: { ko: "UV가 8이어도 2시간 간격으로만 안내하는 등 결과가 단계별로 구분되지 않음", en: "Advice was the same at UV 8 as at lower levels" }, fix: { ko: "UV 단계별 판정 로직을 따로 만들고 경계값 테스트 페이지로 확인", en: "Built per-level logic and a boundary-value test page" } },
        { problem: { ko: "글이 너무 많고 화면이 어둡고 답답함", en: "Too much text and too dark" }, fix: { ko: "사용법을 카드뉴스로 바꿔 접고 펼 수 있게 하고, 디자인 캔버스로 시안을 받아 밝은 방향으로 수정", en: "Turned tips into collapsible card news and redesigned brighter via the design canvas" } }
      ]
    },
    link: "projects/sunblock-helper/index.html",
    source: "desktop"
  },
  {
    id: "market-insight-site",
    points: {"ko": ["해외 시장조사에서 AI 결과가 **뻔하고 맞는지 확신하기 어려웠던** 불편에서 출발", "문제 정의, 정보 구조, 요구사항, 개발 계획을 **AI 인터뷰로 차례로** 만들고 단계별로 개발", "결과: **한 줄 결론, 근거 번호, 확신도**를 갖춘 트렌드 브리프 사이트", "로그인형이라 주소는 비공개, 샘플 데이터로 띄운 화면만 실음"], "en": ["Started from AI market research that felt **obvious and hard to trust**", "Built problem, IA, requirements and plan **through AI interviews**, then developed in phases", "Result: trend briefs with **a one-line verdict, numbered evidence and confidence**", "Login-only, so the URL stays private; the cover uses sample data"]},
    label: { ko: "AI 조사 브리프 사이트", en: "AI research brief site" },  // 책등에 쓰는 분류명(누구나 알아볼 수 있게)
    category: "side",
    design: "brief", spineH: 420, cover: "assets/covers/market-insight-site.jpg",
    palette: { bg: "#14204A", ink: "#F5EFDF", accent: "#FFD94D" },
    pattern: "grid", motif: "조사 카드", stamp: "조",
    date: "2026-10-19",
    title: { ko: "시장조사 인사이트 사이트", en: "Market Insight Site" },
    summary: {
      ko: "회사에서 해외 시장조사를 할 때 AI 결과가 뻔하고 맞는지 확신하기 어려웠던 불편에서 시작한 사이드 프로젝트입니다.\n'마땅히 되어야 할 상태와 그렇지 못한 상태'로 문제를 정의하고, 해결책 우선순위, 정보 구조, 유저 저니, 요구사항, 개발 계획 문서를 AI 인터뷰로 차례로 만든 뒤 Phase 단위로 개발했습니다.\n결과물은 의뢰 질문을 적는 조사 카드에서 출발해, 한 줄 결론과 근거 번호, 확신도를 갖춘 트렌드 브리프를 읽는 사이트입니다. 로그인형이라 실제 주소는 공개하지 않고, 샘플 데이터로 띄운 5번째 버전 화면만 싣습니다.",
      en: "A side project that started from a work pain point: AI market research on overseas markets felt obvious and hard to trust.\nI defined the problem as 'how it should be vs. how it is', then built the solution ranking, information architecture, user journey, requirements and dev plan through AI interviews, and developed it phase by phase.\nThe result is a site where a research card holds the client's question and a trend brief shows a one-line verdict, numbered evidence and a confidence scale. It is login-only, so the real URL stays private; the cover shows version 5 of a brief on sample data."
    },
    tools: ["스킬", "AI 인터뷰", "웹 검색", "Supabase", "GitHub", "구글 시트 연결"],
    role: {
      ko: "AI가 쓴 가설 5개를 직접 읽고 '다 뻔하다'고 판정한 뒤, 원하는 형식을 '지금 뜨는 것(출처) → 우리 상황 → 접근 제안(서브니치까지)'으로 정함. 기업마다 내용이 달라지도록 컨설턴트가 의뢰를 받는 틀로 설정하게 하고, 데이터는 로컬에서 Supabase로 옮기며 로그인을 넣기로 결정",
      en: "Read the five AI hypotheses and judged them all obvious, then set the target format: what is trending (with sources), how it fits this client, and a suggested approach down to the sub-niche. Framed it as a consultant taking client requests, and decided to move data from local files to Supabase with login"
    },
    time: { ko: "약 2일(대화 기준)", en: "About 2 days (conversation time)" },
    story: {
      why: { ko: "해외 시장은 현지 언어와 플랫폼을 몰라 유료 보고서 한 곳에 기대게 되고, AI도 공개 자료와 남이 정의한 시장을 그대로 가져옵니다. 그래서 의뢰 기업의 상황에 맞는 인사이트를 근거와 함께 뽑아 주는 도구가 필요했습니다.", en: "For overseas markets I lacked local language and platform knowledge and leaned on one paid report, while AI repeated public data and other people's market definitions. I needed a tool that gives client-specific insight with sources." },
      trouble: [
        { problem: { ko: "시험용 사례로 만든 가설 5개가 모두 당연한 사실이라 뻔하다는 평가", en: "All five test hypotheses were judged obvious facts" }, fix: { ko: "결과 형식을 '뜨는 흐름과 출처, 우리 상황에서의 의미, 접근 제안'으로 바꿔 트렌드 브리프로 재설계", en: "Redesigned the output as a trend brief: trend with sources, fit for the client, suggested approach" } },
        { problem: { ko: "가설 설계 스킬보다 점검 스킬이 엄격해 기준이 어긋남", en: "The hypothesis skill was looser than the review skill" }, fix: { ko: "가설 설계 스킬에도 도출 질문을 넣어 엄격도를 맞추고 다시 시험", en: "Added derivation questions to the hypothesis skill and re-tested it" } }
      ]
    },
    link: "projects/market-insight-site/index.html",
    note: { ko: "로그인형 사이트라 실제 주소는 공개하지 않습니다. 표지는 샘플 데이터로 띄운 조사 화면입니다.", en: "Login-only site, so the real URL is private. The cover shows the research screen on sample data." },
    source: "desktop"
  },
  {
    id: "voicefishing",
    label: { ko: "팀으로 만든 안티피싱 훈련 서비스", en: "Team-built anti-phishing training service" },  // 책등에 쓰는 분류명(누구나 알아볼 수 있게)
    category: "side",
    design: "generic", spineH: 408,
    palette: { bg: "#0E1B33", ink: "#F4EFE2", accent: "#FFCF5C" },
    pattern: "stars", motif: "안 속기", stamp: "魚",
    date: "2026-11-23",
    title: { ko: "안물어(魚)", en: "An-mul-eo (Don't Get Hooked)" },
    summary: {
      ko: "교육 과정 마지막 팀 프로젝트(4명)입니다. 신종 보이스피싱 수법은 빠르게 바뀌는데 청년이 미리 대비할 실전형 훈련이 없다는 문제에서 출발했습니다.\n금융감독원 등 공공기관의 피싱 공지(실데이터)를 수집·AI 분류한 뒤, 이용자 상황에 맞춘 가짜 문자·사이트를 불시에 보내 '안 속는 연습'을 시킵니다. 미끼에 걸리지 않는 것(무반응)을 최고점으로 설계해, 속지 않는 능력 자체를 훈련합니다.\n저는 데이터 수집·판정 규칙·위키 챗봇과 전 화면 리디자인을 맡았습니다.",
      en: "The final team project (4 people) of the program. It starts from a gap: new voice-phishing tactics change fast, but young people have no hands-on way to prepare.\nIt collects real phishing notices from public bodies (e.g. Korea's FSS), classifies the tactics with AI, then sends situation-matched fake texts and sites unannounced so users practice 'not getting hooked'. Not taking the bait (no response) is scored highest, training the skill of not being fooled.\nI owned data collection, the judgement rules, the wiki chatbot, and a full UI redesign."
    },
    tools: ["Next.js", "Supabase", "Claude API", "Gemini API", "GitHub", "팀 협업"],
    role: {
      ko: "실데이터 수집·정기 실행 파이프라인과 판정 규칙(무반응=최고점·48시간 재발송·로그인 없는 개인 링크 토큰)을 설계하고, 서버에서 출처를 검증하는 위키 챗봇을 붙였으며, 소개·대시보드·운영자·모의사이트를 '심해 관측 일지' 콘셉트로 전면 리디자인",
      en: "Designed the real-data collection/scheduling pipeline and the judgement rules (no-response = top score, 48h re-send, login-free per-user link tokens), added a server-side source-checking wiki chatbot, and fully redesigned the intro, dashboard, operator and decoy-site screens"
    },
    time: { ko: "약 1주(팀 4명, 2026.11.17~23)", en: "About a week (team of 4, 2026.11.17–23)" },
    story: {
      why: { ko: "보이스피싱 수법은 계속 새로 나오는데, 예방 교육은 '이런 게 있으니 조심하세요' 수준에 그칩니다. 소방훈련처럼 실제와 비슷한 상황을 불시에 겪어 봐야 몸이 기억한다고 보고, 청년 대상 모의훈련 서비스를 잡았습니다.", en: "New phishing tactics keep appearing, but prevention education stays at 'be careful, this exists.' Like a fire drill, people remember only after facing a realistic situation unannounced, so we built a mock-training service for young adults." },
      steps: [
        { ko: "공공기관 피싱 공지를 실시간 수집하고 '사기 수법 관련'을 판정(정답 샘플 147건으로 채점 구조)", en: "Collected public phishing notices in real time and judged 'is this a scam tactic?' (scoring structure on 147 labeled samples)" },
        { ko: "판정 규칙을 spec 경계값에 맞춤 — 무반응=최고점, 48시간 재발송, 로그인 없는 개인 링크 토큰", en: "Aligned judgement rules to spec thresholds — no-response = top score, 48h re-send, login-free per-user tokens" },
        { ko: "서버에서 찾은 위키 쪽만 근거로 답하는 운영자 챗봇(출처 검증·사용 한도), 고정 5문항 5/5 통과", en: "An operator chatbot that answers only from retrieved wiki pages (source-checked, rate-limited); 5/5 on fixed questions" },
        { ko: "소개·대시보드·운영자·모의사이트를 하나의 '심해' 브랜드로 전면 리디자인", en: "Redesigned intro, dashboard, operator and decoy sites into one 'deep sea' brand" }
      ],
      trouble: [
        { problem: { ko: "수법을 승인해도 실제 AI 템플릿이 아니라 모의 템플릿으로 떨어지고 '이미 승인된 템플릿' 에러", en: "Approving a tactic produced a mock template with an 'already approved' error instead of the real AI one" }, fix: { ko: "API가 기본 patternId를 돌려주는 게 원인이라, 저장 시 실제 patternId로 덮어써서 해결(AI가 처음 제안한 수정은 엉뚱해 로그를 직접 따라감)", en: "The API returned a default patternId; overwrote it with the real one on save (the AI's first fix was wrong, so I traced the logs myself)" } },
        { problem: { ko: "전화번호를 입력하면 바로 조회해 주고 싶었지만 무료 웹 조회 수단이 없음", en: "Wanted instant phone-number lookup, but no free web lookup exists" }, fix: { ko: "가짜(모의) 데이터를 넣느니 정직하게 방향을 바꿔, '문자 붙여넣기 → 실시간 위험신호 분석'으로 전환", en: "Rather than fake data, switched honestly to 'paste the message → real-time red-flag analysis'" } }
      ],
      special: { ko: "배운 점: 팀 프로젝트라 수집·생성·웹앱·문서로 역할을 나눴고, 저는 '수집·판정·챗봇·디자인'을 맡았습니다. AI는 반복 코드·요약을 빠르게 처리했지만, 판정 기준·버그 원인·'모의데이터 배제' 같은 판단은 제가 정했습니다.", en: "Lesson: as a team we split collection, generation, web app and docs; I took collection, judgement, chatbot and design. AI was fast at repetitive code and summaries, but the judgement rules, bug diagnosis and the 'no fake data' call were mine." }
    },
    link: "projects/voicefishing/index.html",
    source: "desktop"
  }
];
window.SITE_UPDATED = "2026-11-24";

