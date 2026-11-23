// 유관산업 사이트(제약, 바이오, 화장품 지원용) 설정. 주소: https://yoongaeun-beep.github.io
// 무관산업 사이트 설정은 site-global/edition.js. 사실은 data.js, 여기에는 첫 화면 문구와 순서만 둔다.
// *강조*는 포인트 색, {projects} {side}는 프로젝트 수로 자동 바뀐다.
window.SITE_EDITION = {
  id: "bio",
  // 문구 전수 점검(2026-11-23): 숫자는 '늘었거나 줄었거나 목표를 넘긴 것'만 앞에 둔다(배포 대상 수, 건수만 있는 숫자는 경력 칸으로).
  // 사실 근거: dev/knowledge/profile-gaeun.md. 코스맥스는 화장품 ODM이므로 '바이오 제약 현장'이라고 쓰지 않는다.
  hero: {
    line: {
      ko: "근거를 찾아 *검토를 통과하는 자료*로 만들고,\n반복되는 정리는 *AI로 줄입니다*",
      en: "I turn evidence into *materials that pass review*,\nand cut repetitive sorting *with AI*"
    },
    sub: {
      ko: "생명공학을 전공하고 사노피 백신 마케팅과 코스맥스 연구소 경영을 거쳐, 지금은 LS Jump Up에서 AI로 제조 현장의 문제를 풀고 있습니다.",
      en: "Genetic engineering graduate, vaccine marketing at Sanofi and two years in R&D management at COSMAX. Now solving factory problems with AI at LS Jump Up."
    },
    numbers: [
      { v: { ko: "12종", en: "12" }, l: { ko: "백신 판촉 자료 (목표 10종)\nMedical, RA 검토 통과", en: "vaccine promo pieces (target 10)\ncleared Medical and RA review" }, to: "#exp-sanofi-material" },
      { v: { ko: "연 100팀+", en: "100+/yr" }, l: { ko: "영문 연구소 투어 해외 방문\n신설 전 3년간 24팀", en: "overseas visits to my English R&D tour\nup from 24 in the 3 years before" }, to: "#exp-cosmax-global" },
      { v: { ko: "3시간", en: "3 h" }, l: { ko: "VBA와 AI로 줄인 제품 정리\n최대 이틀 걸리던 작업", en: "product summaries with VBA and AI\nonce up to two days" }, to: "#exp-cosmax-ai" }
    ],
    keywords: [
      { ko: "제약 마케팅", en: "Pharma marketing" },
      { ko: "해외 고객 응대", en: "Overseas customers" },
      { ko: "AI 업무 자동화", en: "AI automation" }
    ],
    glance: [
      { k: { ko: "학력", en: "Education" }, v: { ko: "경희대 유전생명공학과", en: "Kyung Hee Univ., Genetic Engineering" } },
      { k: { ko: "경력", en: "Experience" }, v: { ko: "코스맥스 2년 1개월, 사노피 인턴 6개월", en: "COSMAX 2 yrs 1 mo, Sanofi internship 6 mo" } },
      { k: { ko: "직무 교육", en: "Training" }, v: { ko: "GMP 192시간, RA 6시간", en: "GMP 192 h, RA 6 h" } },
      { k: { ko: "어학", en: "English" }, v: { ko: "TOEIC 975, OPIc AL", en: "TOEIC 975, OPIc AL" } },
      { k: { ko: "지금", en: "Now" }, v: { ko: "LS Jump Up AI 과정 (2026.11 수료 예정)", en: "LS Jump Up AI program (until Nov 2026)" } }
    ]
  },
  about: {
    line: {
      ko: "근거를 찾아 고객이 판단할 말로 정리하고, 반복되는 일은 *AI로 줄입니다*.",
      en: "I find the evidence, put it in words the customer can decide with, and *cut repetitive work with AI*."
    },
    // 카드는 누르면 해당 경력 묶음으로 이동한다
    // 소개 숫자 카드는 첫 화면 숫자와 겹쳐 뺐다(채용담당자 검토, 2026-11-24)
    cards: []
  },
  // AI를 어떻게 쓰는지 한 줄(첫 화면). 근거: 코스맥스 자동화의 표본 대조, PharmaFlow AI 도우미의 숫자 재검사
  aiRule: {
    ko: "AI가 만든 결과는 원문 표본과 대조해 확인하고, 숫자와 최종 판단은 제가 정합니다.",
    en: "I check AI output against source samples, and the numbers and final calls stay with me."
  },
  // 채용담당자 점검(2026-11-23): '합격' 게임류는 가볍게 읽힐 수 있어 서가에서 뺀다(파일은 그대로)
  shelfHide: ["hapgyeok-bomber", "hapgyeok-bomber-p0", "hapgyeok-beat", "voicefishing"],
  // 리프레임 스크롤에 보여 줄 노트(순서대로)
  reframe: ["note-market-toolkit", "note-harness", "note-docking", "note-workflow-app", "note-recruiter"],
  projectOrder: ["pharmaflow", "predictive-maintenance", "voicefishing"],
  ui: {
    ko: {
      "kicker": "BIO & PHARMA PORTFOLIO",
      "nav.about.n": "01 소개", "nav.reframe.n": "05 기획 방식", "nav.timeline.n": "07 걸어온 길", "nav.experience.n2": "02 경력과 학력", "nav.training.n": "06 교육 및 자격",
      "nav.projects.n": "03 프로젝트", "nav.journey.n": "04 LS 여정", "nav.activities.n": "08 대외활동과 연구", "nav.contact.n": "09 연락"
    },
    en: {
      "kicker": "BIO & PHARMA PORTFOLIO",
      "nav.about.n": "01 About", "nav.reframe.n": "05 How I plan", "nav.timeline.n": "07 Timeline", "nav.experience.n2": "02 Experience & education", "nav.training.n": "06 Training & certificates",
      "nav.projects.n": "03 Projects", "nav.journey.n": "04 LS journey", "nav.activities.n": "08 Activities & research", "nav.contact.n": "09 Contact"
    }
  }
};
