// 무관산업 사이트(자동차, 전선 등 제조업의 해외영업, 마케팅, 사업기획 지원용) 설정.
// 주소: https://yoongaeun-beep.github.io (기본 주소, 2026-11-24 맞바꿈)
// 사실은 site/data.js를 같이 쓴다. 가장 큰 강점: AI 활용 + 해외 고객 경험. 해외영업 3개월은 앞에 세우지 않는다.
// *강조*는 포인트 색, {projects} {side}는 프로젝트 수로 자동 바뀐다.
window.SITE_EDITION = {
  id: "global",
  hero: {
    line: {
      ko: "해외 고객 방문 *연 100팀 이상*,\n반복 업무는 *AI로* 줄입니다",
      en: "Grew overseas customer visits to *100+ a year*,\nand cut repetitive work *with AI*"
    },
    sub: {
      ko: "B2B 제조사에서 2년간 해외 고객 응대와 해외 시장 조사를 맡았고, LS Jump Up에서 제조 데이터로 AI 프로젝트를 만들었습니다.",
      en: "Two years with overseas customers and market research at a B2B manufacturer, plus AI projects built on factory data at LS Jump Up."
    },
    numbers: [
      { v: { ko: "연 100팀+", en: "100+/yr" }, l: { ko: "영문 연구소 투어 해외 방문\n신설 전 3년간 24팀", en: "overseas visits to my English R&D tour\nup from 24 in the 3 years before" }, to: "#exp-cosmax-global" },
      { v: { ko: "3시간", en: "3 h" }, l: { ko: "VBA와 AI로 줄인 제품 정리\n최대 이틀 걸리던 작업", en: "product summaries with VBA and AI\nonce up to two days" }, to: "#exp-cosmax-ai" },
      { v: { ko: "975 · AL", en: "975 · AL" }, l: { ko: "TOEIC, OPIc AL\n미국 거주 2년 6개월 (2005~2008)", en: "TOEIC, OPIc AL\nlived in the US for 2.5 years (2005~2008)" }, to: "#training" }
    ],
    keywords: [
      { ko: "해외 고객 커뮤니케이션", en: "Overseas customers" },
      { ko: "AI 업무 자동화", en: "AI automation" },
      { ko: "제조 데이터 이해", en: "Factory data" }
    ],
    glance: [
      { k: { ko: "경력", en: "Experience" }, v: { ko: "B2B 제조사 2년 1개월 + 글로벌 제약사 인턴", en: "2 yrs 1 mo at a B2B manufacturer + global pharma internship" } },
      { k: { ko: "어학", en: "English" }, v: { ko: "TOEIC 975, OPIc AL", en: "TOEIC 975, OPIc AL" } },
      { k: { ko: "AI", en: "AI" }, v: { ko: "Claude Code, Claude API, Python, 자동화", en: "Claude Code, Claude API, Python, automation" } },
      { k: { ko: "지금", en: "Now" }, v: { ko: "LS Jump Up AI 과정 (2026.11 수료 예정)", en: "LS Jump Up AI program (until Nov 2026)" } }
    ]
  },
  about: {
    line: {
      ko: "기술 설명을 해외 고객이 판단할 말로 바꾸고, 반복되는 일은 *AI로 줄입니다*.",
      en: "I turn technical detail into what overseas customers need to decide, and *cut repetitive work with AI*."
    },
    cards: [
      { figure: { ko: "11곳", en: "11" }, title: { ko: "해외영업 고객사 연락 창구", en: "Overseas client accounts handled" }, where: { ko: "코스맥스 해외영업", en: "COSMAX overseas sales" }, to: "#exp-cosmax-sales" },
      { figure: { ko: "단독 창구", en: "Sole contact" }, title: { ko: "인도네시아 법인 협업", en: "Indonesian subsidiary" }, where: { ko: "코스맥스", en: "COSMAX" }, to: "#exp-cosmax-indonesia" },
      { figure: { ko: "7개 구역", en: "7 zones" }, title: { ko: "연구소 전시공간 기획 주도", en: "Led the R&D showroom plan" }, where: { ko: "코스맥스", en: "COSMAX" }, to: "#exp-cosmax-plan" },
      { figure: { ko: "9건", en: "9" }, title: { ko: "유럽 시장 리포트", en: "European market reports" }, where: { ko: "코스맥스", en: "COSMAX" }, to: "#exp-cosmax-market" }
    ]
  },
  // 바로 쓸 수 있는 강점(2026-11-24 이름 변경). '새 산업' 같은 말로 무관함을 상기시키지 않는다(2026-11-23 사용자 지시)
  transfer: {
    title: { ko: "바로 쓸 수 있는 강점", en: "Strengths I can use from day one" },
    items: [
      { k: { ko: "고객의 말로 설명하기", en: "Explaining in the customer's terms" }, v: { ko: "기술 정보를 해외 고객이 판단에 쓸 말로 정리", en: "Turning technical detail into what overseas customers need to decide" }, proof: { ko: "영문 투어 연 100팀+", en: "100+ tour visits a year" } },
      { k: { ko: "시장을 숫자로 읽기", en: "Reading markets in numbers" }, v: { ko: "처음 보는 시장도 데이터로 빠르게 파악", en: "Getting up to speed on a new market through data" }, proof: { ko: "유럽 시장 리포트 9건", en: "9 European market reports" } },
      { k: { ko: "AI로 일하는 방식 만들기", en: "Building work with AI" }, v: { ko: "Claude Code로 기획 문서부터 배포까지, 결과는 시험으로 검증", en: "Claude Code from planning docs to deployment, checked by tests" }, proof: { ko: "팀 프로젝트 3개 배포, 스킬 17개", en: "3 team projects shipped, 17 skills" } },
      { k: { ko: "제조 현장 흐름 이해", en: "Knowing the factory flow" }, v: { ko: "발주 시점과 출하 품질을 데이터로 다뤄 봄", en: "Worked with order timing and release quality data" }, proof: { ko: "발주와 품질 데이터 프로젝트 2개", en: "Ordering and quality data projects" } }
    ]
  },
  reframe: ["note-market-toolkit", "note-harness", "note-workflow-app", "note-auto-collect", "note-recruiter"],
  projectOrder: ["predictive-maintenance", "pharmaflow", "voicefishing"],
  // AI를 어떻게 쓰는지 한 줄(첫 화면). 근거: 코스맥스 자동화의 표본 대조, PharmaFlow AI 도우미의 숫자 재검사
  aiRule: {
    ko: "AI가 만든 결과는 원문 표본과 대조해 확인하고, 숫자와 최종 판단은 제가 정합니다.",
    en: "I check AI output against source samples, and the numbers and final calls stay with me."
  },
  // 채용담당자 점검(2026-11-23): '합격' 게임류는 가볍게 읽힐 수 있어 서가에서 뺀다(파일은 그대로)
  shelfHide: ["hapgyeok-bomber", "hapgyeok-bomber-p0", "hapgyeok-beat", "voicefishing"],
  ui: {
    ko: {
      "kicker": "GLOBAL BUSINESS & AI", "title": "윤가은 포트폴리오",
      "nav.about.n": "01 소개", "nav.reframe.n": "05 기획 방식", "nav.projects.n": "03 AI 프로젝트", "nav.journey.n": "04 LS 여정", "nav.experience.n2": "02 경력과 학력", "nav.timeline.n": "07 걸어온 길",
      "nav.activities.n": "08 대외활동", "nav.activities": "대외활동", "nav.training.n": "06 교육과 어학", "nav.contact.n": "09 연락",
      "nav.projects": "AI 프로젝트", "nav.training": "교육과 어학"
    },
    en: {
      "kicker": "GLOBAL BUSINESS & AI", "title": "Gaeun Yoon, Portfolio",
      "nav.about.n": "01 About", "nav.reframe.n": "05 How I plan", "nav.projects.n": "03 AI projects", "nav.journey.n": "04 LS journey", "nav.experience.n2": "02 Experience & education", "nav.timeline.n": "07 Timeline",
      "nav.activities.n": "08 Activities", "nav.activities": "Activities", "nav.training.n": "06 Training & languages", "nav.contact.n": "09 Contact",
      "nav.projects": "AI projects", "nav.training": "Training"
    }
  }
};
