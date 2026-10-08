// 첫 화면 훅 · 키워드 · 수집 기록 · 서가 묶음 — 매일 수집 작업이 "와우 포인트 검토"를 거쳐 제안하고, "올려" 승인 후 갱신합니다.
// 판단 기록은 pipeline\hook-review.md 에 남깁니다.
window.SITE_FEATURE = {
  // 첫 화면 한 문장. 줄바꿈은 \n
  // 프로젝트 섹션 맨 위 문장(자동 갱신 이야기). 첫 화면이 아니라 서가 바로 위에 나옴
  hook: {
    ko: "이 서가는 제가 자는 동안 채워집니다.",
    en: "This shelf fills itself while I sleep."
  },
  sub: {
    ko: "Claude로 만든 결과물을 매일 새벽 2시에 자동으로 모아 한 권씩 꽂습니다. 저는 아침에 확인하고 \"올려\" 한 마디로 승인만 합니다. 이 장치 자체가 제가 AI로 일하는 방식입니다.",
    en: "Every night at 2 a.m., what I built with Claude is collected and shelved automatically. In the morning I review it and approve with one word. The setup itself is how I work with AI."
  },
  // 키워드 3개와 근거. {projects}, {days}는 자동 계산
  keywords: [
    {
      tag: { ko: "바이오·제약 도메인", en: "Bio & pharma domain" },
      proof: { ko: "연구소 경영 2년 · 백신 마케팅 · 연구 2건", en: "2 yrs R&D management · vaccine marketing · 2 lab projects" }
    },
    {
      tag: { ko: "해외 커뮤니케이션", en: "Global communication" },
      proof: { ko: "영문 연구소 투어 신설, 해외 방문 연 100팀+", en: "Launched English R&D tours: 100+ overseas teams a year" }
    },
    {
      tag: { ko: "AI 자동화", en: "AI automation" },
      proof: { ko: "{days}일 동안 프로젝트 {projects}개, 매일 자동 갱신", en: "{projects} projects in {days} days, updated nightly" }
    }
  ],
  // 첫 화면 오른쪽 "최근 수집 기록". 매일 수집 작업이 그날 실제로 한 일로 덮어씁니다(지어내지 않음).
  logDate: "2026-10-08",
  log: [
    { time: "08:39", text: { ko: "대화 6개를 보관함으로 복사", en: "Copied 6 conversations to the archive" } },
    { time: "08:42", text: { ko: "새 결과물 3개 · 서가 후보로 정리", en: "3 new outputs drafted for the shelf" } },
    { time: "08:43", text: { ko: "포트폴리오 시안 · 개인정보 우려로 제외", en: "Portfolio studies: excluded for privacy" } },
    { time: "08:46", text: { ko: "블로그 초안 1편 작성", en: "Drafted 1 blog post" } },
    { time: "승인", text: { ko: "선블럭 1권 공개 · 나머지 2권은 보류", en: "Published 1 book; 2 held back" }, hi: true }
  ],
  // 수집 기록 아래 "어떻게 동작하나요?" — 자동화가 실제로 하는 일
  how: [
    { ko: "매일 새벽 2시, 그날 Claude와 나눈 대화와 결과물을 보관함으로 복사", en: "2 a.m.: copy the day's Claude conversations and outputs to an archive" },
    { ko: "결과물마다 소개 글과 책 표지 초안, 블로그 초안을 작성", en: "Draft a description, a book cover and a blog post for each output" },
    { ko: "학교·연락처·기관명 같은 개인정보를 걸러내는 점검", en: "Check for and strip personal details" },
    { ko: "아침에 제가 \"올려\"라고 승인해야 이 페이지에 반영", en: "Nothing goes live until I approve it in the morning" }
  ],
  featuredId: "hapgyeok-beat",
  // 서가 탭(묶음). 순서대로 보여줌
  categories: [
    {
      id: "games",
      title: { ko: "합격 시리즈", en: "The Offer series" },
      blurb: {
        ko: "취준생의 스트레스를 게임으로 바꿔 본 연작. 기획 인터뷰부터 리듬게임 완성까지 하루.",
        en: "Job-hunting stress turned into games, from planning interview to finished rhythm game in one day."
      }
    },
    {
      id: "automation",
      title: { ko: "내 일을 줄이는 AI", en: "AI that cuts my own work" },
      blurb: {
        ko: "흩어진 정보를 모으고 반복하던 일을 구조로 바꾼 작업들.",
        en: "Gathering scattered information and turning chores into systems."
      }
    },
    {
      id: "life",
      title: { ko: "내 불편에서 시작한 앱", en: "Apps born from my own pain points" },
      blurb: {
        ko: "선크림 깜빡, 첫음 놓침, 구조식 막힘. 내 불편의 원인을 먼저 찾고 도구로 만든 작업들.",
        en: "Skipped sunscreen, missed opening notes, stuck on structures: root causes first, then tools."
      }
    }
  ]
};

