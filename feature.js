// 첫 화면 훅, 키워드, 수집 기록, 서가 묶음: 매일 수집 작업이 "와우 포인트 검토"를 거쳐 제안하고, "올려" 승인 후 갱신합니다.
// 판단 기록은 pipeline\hook-review.md 에 남깁니다.
window.SITE_FEATURE = {
  // 첫 화면 한 문장. 줄바꿈은 \n
  // 프로젝트 섹션 맨 위 문장(자동 갱신 이야기). 첫 화면이 아니라 서가 바로 위에 나옴
  hook: {
    ko: "작업 기록은 자동으로 모입니다.",
    en: "A log of my work, collected automatically."
  },
  sub: {
    ko: "Claude로 만든 결과물을 매일 새벽 2시에 모아 서가에 올릴 후보로 정리합니다.\n제가 내용과 개인정보를 확인하고 승인한 것만 공개됩니다.\n이 자동화도 Claude로 직접 만들었습니다.",
    en: "Every night at 2 a.m., the things I built with Claude are gathered as candidates for the shelf.\nOnly what I review and approve goes public.\nI built this automation with Claude, too."
  },
  // 키워드 3개와 근거. {projects}, {days}는 자동 계산
  keywords: [
    {
      tag: { ko: "근거 조사와 검증", en: "Evidence & verification" },
      proof: { ko: "판촉 자료 12종 Medical, RA 검토 통과", en: "12 promotional pieces cleared Medical and RA review" }
    },
    {
      tag: { ko: "바이오 제약 도메인", en: "Bio & pharma domain" },
      proof: { ko: "연구소 경영 2년, 백신 마케팅, 연구 2건", en: "2 yrs R&D management, vaccine marketing, 2 lab projects" }
    },
    {
      tag: { ko: "AI 업무 자동화", en: "AI workflow automation" },
      proof: { ko: "{days}일 동안 프로젝트 {projects}개", en: "{projects} projects in {days} days" }
    }
  ],
  // 첫 화면 오른쪽 "최근 수집 기록". 매일 수집 작업이 그날 실제로 한 일로 덮어씁니다(지어내지 않음).
  logDate: "2026-10-08",
  log: [
    { time: "08:39", text: { ko: "대화 6개를 보관함으로 복사", en: "Copied 6 conversations to the archive" } },
    { time: "08:42", text: { ko: "새 결과물 3개, 서가 후보로 정리", en: "3 new outputs drafted for the shelf" } },
    { time: "08:43", text: { ko: "포트폴리오 시안, 개인정보 우려로 제외", en: "Portfolio studies: excluded for privacy" } },
    { time: "08:46", text: { ko: "블로그 초안 1편 작성", en: "Drafted 1 blog post" } },
    { time: { ko: "승인", en: "OK" }, text: { ko: "선블럭 1권 공개, 나머지 2권은 보류", en: "Published 1 book; 2 held back" }, hi: true }
  ],
  // 수집 기록 아래 "어떻게 동작하나요?": 자동화가 실제로 하는 일
  how: [
    { ko: "매일 새벽 2시, 그날 Claude와 나눈 대화와 결과물을 보관함으로 복사", en: "2 a.m.: copy the day's Claude conversations and outputs to an archive" },
    { ko: "결과물마다 소개 글과 책 표지 초안, 블로그 초안을 작성", en: "Draft a description, a book cover and a blog post for each output" },
    { ko: "학교, 연락처, 기관명 같은 개인정보를 걸러내는 점검", en: "Check for and strip personal details" },
    { ko: "아침에 제가 \"올려\"라고 승인해야 이 페이지에 반영", en: "Nothing goes live until I approve it in the morning" }
  ],
  featuredId: "market-insight-site",
  // 서가 탭(묶음). 순서대로 보여줌
  categories: [
    {
      id: "games",
      title: { ko: "합격 시리즈", en: "The Offer series" },
      blurb: {
        ko: "취준생의 스트레스를 게임으로 바꿔 본 연작입니다. 기획 인터뷰부터 리듬게임 완성까지 하루가 걸렸습니다.",
        en: "Job-hunting stress turned into games, from planning interview to finished rhythm game in one day."
      }
    },
    {
      id: "automation",
      title: { ko: "내 일을 줄이는 AI", en: "AI that cuts my own work" },
      blurb: {
        ko: "흩어진 정보를 모으고 반복하던 일을 구조로 바꾼 작업입니다.",
        en: "Gathering scattered information and turning chores into systems."
      }
    },
    {
      id: "life",
      title: { ko: "내 불편에서 시작한 앱", en: "Apps born from my own pain points" },
      blurb: {
        ko: "생활에서 겪은 불편의 원인을 먼저 찾고, 그걸 푸는 도구로 만든 작업입니다.",
        en: "Everyday pain points: find the cause first, then build a tool for it."
      }
    },
    {
      id: "side",
      title: { ko: "사이드 프로젝트", en: "Side projects" },
      blurb: {
        ko: "일하면서 겪은 불편을 도구로 만들어 본 작업. 문제 정의부터 개발까지 문서를 먼저 쓰고 만들었습니다.",
        en: "Tools built from pain points at work, with the documents written first, from problem definition to development."
      }
    }
  ]
};
