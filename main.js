// 메인 프로젝트 — 사람이 직접 관리하는 파일. 매일 자동 수집은 이 파일을 건드리지 않습니다.
// 사이드 프로젝트(projects.js, 서가)보다 크게, 프로젝트 섹션 맨 위에 나옵니다.
// 근거: 윤가은_포트폴리오(260930).doc, github.com/jgi0117/2team_project
window.SITE_MAIN = [
  {
    id: "predictive-maintenance",
    period: "2026.09.14 – 09.30",
    team: { ko: "LS Jump Up 2팀 (4인) · 조장 · 기여도 35%", en: "LS Jump Up Team 2 (4 people) · team lead · 35% contribution" },
    title: { ko: "센서 데이터 기반 설비 고장 예측 및 정비·발주 의사결정 지원 시스템", en: "Sensor-based failure prediction and maintenance/ordering decision support" },
    oneLiner: {
      ko: "부품 고장을 예측하고, 그 결과를 '고장 확률 0.7'이 아니라 'D-8, 재고 없음, 오늘 발주 필요'라는 행동 단위로 바꿔 보여주는 정비 대시보드입니다.",
      en: "Predicts part failures and turns them into actions: not 'failure probability 0.7' but 'D-8, no stock, order today'."
    },
    stats: [
      { v: { ko: "0.727 → 0.88–0.94", en: "0.727 → 0.88–0.94" }, l: { ko: "AUC · 기존 경과일 규칙 대비 (채택 부품 3종)", en: "AUC vs. the age-based rule (3 adopted parts)" } },
      { v: { ko: "4.4배", en: "4.4×" }, l: { ko: "상위 위험군에 실제 고장이 몰린 정도 (Lift)", en: "failures concentrated in the top-risk group (lift)" } },
      { v: { ko: "87.6만", en: "876k" }, l: { ko: "센서 데이터 (설비 100대, 부품 4종)", en: "sensor records (100 machines, 4 parts)" } },
      { v: { ko: "0원", en: "₩0" }, l: { ko: "AI 요약 API 비용 (로컬 sLLM)", en: "API cost for AI summaries (local sLLM)" } }
    ],
    problem: {
      ko: "정비는 부품을 쓴 날짜가 기준을 넘으면 바꾸는 경과일 규칙에 의존했고, 실제 교체 3,286건 중 22.7%가 고장 후 긴급 교체였습니다. 센서·정비·고장·재고 데이터가 따로 있어 '지금 어느 설비의 어느 부품을 먼저 봐야 하는가'를 한 화면에서 판단할 수 없었고, 예측을 해도 부품이 없으면 정비가 늦어졌습니다.",
      en: "Maintenance relied on an age-based replacement rule, and 22.7% of 3,286 replacements were emergency fixes after failure. Sensor, maintenance, failure and stock data lived apart, so no one could see which part to check first, and even a good prediction was useless without parts in stock."
    },
    approach: {
      ko: [
        "시간 단위 87.6만 행을 설비·일 단위 3.36만 행으로 정리하고, 미래로 과거를 맞히지 않도록 시점 기준으로 학습·테스트 분할",
        "설비마다 정상 범위가 달라 센서 절대값 대신 이동평균·추세·z점수 사용. '원래 진동이 큰 기종은 항상 위험'이라는 오학습을 막음",
        "5개 후보를 같은 조건으로 비교해 LightGBM 채택. 랜덤포레스트와 AUC 차이는 0.004인데 학습은 2.5배 빨라, 부품 × 기간별 반복 재학습에 유리",
        "부품별 결정 시한(조달 + 준비: 8·16·24일)으로 D-day와 발주 시한을 역산하고, 한정된 재고를 위험도 순으로 배정",
        "Isolation Forest로 급성 센서 이상을 보완(Lift 8.45, 고장 약 19.6시간 전 신호)하고, 설비 데이터를 밖으로 보내지 않도록 로컬 sLLM으로 한 줄 요약 생성"
      ],
      en: [
        "Condensed 876k hourly rows into 33.6k machine-day rows and split train/test by time so the future never predicts the past",
        "Used rolling means, trends and z-scores instead of raw values, since each machine has its own normal range",
        "Compared 5 models under the same conditions and chose LightGBM: within 0.004 AUC of random forest but 2.5× faster to retrain across parts and horizons",
        "Back-calculated D-day and order deadlines from each part's lead time (8, 16, 24 days) and allocated limited stock by risk",
        "Added Isolation Forest for sudden sensor anomalies (lift 8.45, ~19.6 h lead) and a local sLLM for one-line summaries so plant data never leaves the site"
      ]
    },
    trouble: {
      ko: [
        "AUC 0.98이 나와 오히려 의심 → 미래값 보간(bfill)과 설비 ID가 정답을 새게 하고 있었음 → 과거값 보간과 ID 제거로 0.88–0.94, 신뢰할 수 있는 성능으로",
        "comp2는 AUC 0.58로 기존 규칙(0.597)보다도 낮음 → 억지로 쓰지 않고 채택 제외를 명시, 화면에는 예측 대신 안전재고 안내",
        "화면은 28일, 모델은 부품별 8·16·24일을 써서 D-day가 서로 다름 → 공통 상수를 한 파일로 모으고 테스트로 검출, 불일치 0건",
        "노트북 해상도에서 그래프가 잘리고 카드가 겹침 → 576–1920px 반응형으로 재구성, 겹침 0건"
      ],
      en: [
        "AUC 0.98 looked too good → found leakage from backfilling and machine IDs → forward-fill and ID removal gave a trustworthy 0.88–0.94",
        "comp2 scored 0.58, below the old rule (0.597) → excluded it explicitly and showed safety-stock guidance instead",
        "Screen used 28 days while models used 8/16/24 → centralized constants in one file with tests; zero mismatches",
        "Layout broke on laptops → rebuilt responsive from 576 to 1920 px; zero overlaps"
      ]
    },
    result: {
      ko: [
        "메인(AI 한 줄 요약, 경고 KPI, To-Do 달력, 위험 TOP3, 재고 × 위험 교차표)·설비 상세·통계 히트맵·발주·설정 5개 화면의 Dash 대시보드",
        "자동 테스트 47건 통과, 브라우저 콘솔 에러 0건, 커밋 61회·브랜치 통합 5회로 F01–F10 기능 병행 완성"
      ],
      en: [
        "Dash dashboard with five screens: home (AI summary, KPIs, to-do calendar, top-3 risk, stock × risk table), machine detail, statistics heatmap, ordering, settings",
        "47 automated tests passing, zero console errors; 61 commits and 5 branch merges across features F01–F10"
      ]
    },
    role: {
      ko: [
        "조장. 데이터 전처리 파이프라인, 부품별 고장 예측 모델 학습·평가, 대시보드 화면 통합과 반응형 UI를 맡음",
        "4명이 충돌 없이 병행하도록 공통 상수 파일, 기능 번호(F01–F10), 화면 ID 접두사 규칙(54개)과 테스트 47건을 통합 조건으로 정함",
        "Claude Code로 Dash 콜백 연결과 반응형 CSS를 구현하고, 콜백 누락을 찾는 점검 스크립트를 만들어 반복 검증"
      ],
      en: [
        "Team lead; owned the preprocessing pipeline, per-part failure models and dashboard integration with responsive UI",
        "Set the rules that let four people work in parallel: shared constants, feature numbers F01–F10, 54 ID prefixes and 47 tests as merge gates",
        "Used Claude Code for Dash callbacks and responsive CSS, plus a script that checks for broken callback wiring"
      ]
    },
    stack: ["Python", "pandas", "scikit-learn", "LightGBM", "Isolation Forest", "Dash", "Plotly", "SQLite · SQLAlchemy", "pytest", "Qwen sLLM", "Claude Code"],
    links: [
      { label: { ko: "GitHub 저장소", en: "GitHub repository" }, href: "https://github.com/jgi0117/2team_project" }
    ],
    images: [
      { src: "assets/main/dashboard-main.png", alt: { ko: "대시보드 메인 화면: AI 한 줄 요약, 경고 KPI, To-Do 달력, 위험 TOP3, 재고 × 위험 교차표", en: "Dashboard home: AI summary, KPIs, to-do calendar, top-3 risk, stock × risk table" } }
    ]
  }
];
