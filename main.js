// 메인 프로젝트 — 사람이 직접 관리하는 파일. 매일 자동 수집은 이 파일을 건드리지 않습니다.
// 사이드 프로젝트(projects.js, 서가)보다 크게, 프로젝트 섹션 맨 위에 나옵니다.
// 화면 구성(디자인 캔버스 B안): 제목 → 대시보드(바로 실행) → 단계 다이얼(steps 5개, 숫자에 마우스를 올리면 전환) → 역할·기술
// 근거: 윤가은_포트폴리오(260930).doc, github.com/jgi0117/2team_project
window.SITE_MAIN = [
  {
    id: "predictive-maintenance",
    period: "2026.09.14 – 09.30",
    team: { ko: "LS Jump Up 2팀 (4인) · 조장 · 기여도 35%", en: "LS Jump Up Team 2 (4 people) · team lead · 35% contribution" },
    headline: { ko: "고장 확률을\n오늘 할 일로 바꾸는 정비 대시보드", en: "A maintenance dashboard that turns\nfailure scores into today's tasks" },
    title: { ko: "센서 데이터 기반 설비 고장 예측 및 정비·발주 의사결정 지원 시스템", en: "Sensor-based failure prediction and maintenance/ordering decision support" },
    oneLiner: {
      ko: "센서 데이터로 부품 고장을 예측하고, 그 결과를 '고장 확률 0.7'이 아니라 'D-8 · 재고 없음 · 오늘 발주'라는 행동 단위로 보여줍니다.",
      en: "Predicts part failures from sensor data and shows them as actions: not 'failure probability 0.7' but 'D-8 · no stock · order today'."
    },
    stats: [
      { v: { ko: "0.88–0.94", en: "0.88–0.94" }, l: { ko: "AUC · 기존 규칙 0.727 대비 (채택 부품 3종)", en: "AUC vs. 0.727 for the old rule (3 adopted parts)" } },
      { v: { ko: "4.4배", en: "4.4×" }, l: { ko: "상위 위험군에 실제 고장이 몰린 정도 (Lift)", en: "failures concentrated in the top-risk group (lift)" } },
      { v: { ko: "87.6만", en: "876k" }, l: { ko: "센서 데이터 행 (설비 100대, 부품 4종)", en: "sensor rows (100 machines, 4 parts)" } },
      { v: { ko: "0원", en: "₩0" }, l: { ko: "AI 요약 API 비용 (로컬 sLLM)", en: "API cost for AI summaries (local sLLM)" } }
    ],
    // 단계 다이얼: tag(영문 꼬리표) · title · line(무엇을 했나) · key(핵심 숫자) · stuck(막힌 곳) · fix(해결)
    steps: [
      {
        tag: "PROBLEM", title: { ko: "문제 정의", en: "Problem" },
        line: { ko: "정비는 쓴 날짜만 보고 부품을 바꿨고, 실제 교체 3,286건 중 22.7%가 고장 후 긴급 교체였습니다. 센서·정비·고장·재고 데이터가 따로 있어 '지금 어느 설비의 어느 부품을 먼저 봐야 하는가'를 판단할 화면이 없었습니다.", en: "Parts were replaced by age alone, and 22.7% of 3,286 replacements were emergency fixes after failure. Sensor, maintenance, failure and stock data lived apart, so nobody could see which part to check first." },
        key: { ko: "긴급 교체 22.7%", en: "22.7% emergency" },
        stuck: { ko: "'고장 확률 0.7'은 현장에서 무엇을 하라는 뜻인지 알 수 없었습니다.", en: "'Failure probability 0.7' doesn't tell a technician what to do." },
        fix: { ko: "결과를 D-day · 발주 마감 · 재고 같은 행동 단위로 보여주기로 목표를 정했습니다.", en: "Set the goal of showing results as actions: D-day, order deadline, stock." }
      },
      {
        tag: "DATA", title: { ko: "데이터 정리", en: "Data" },
        line: { ko: "시간 단위 87.6만 행을 설비·일 단위 3.36만 행으로 줄이고, 미래로 과거를 맞히지 않게 시점 기준으로 나눴습니다. 설비마다 정상 범위가 달라 센서 절대값 대신 이동평균·추세·z점수를 썼습니다.", en: "Condensed 876k hourly rows into 33.6k machine-day rows, split by time so the future never predicts the past, and used rolling means, trends and z-scores instead of raw values." },
        key: { ko: "87.6만 → 3.36만 행", en: "876k → 33.6k rows" },
        stuck: { ko: "AUC가 0.98로 나와 오히려 의심스러웠습니다.", en: "AUC came out at 0.98 — too good to be true." },
        fix: { ko: "미래값 보간과 설비 ID가 정답을 새게 하던 것을 찾아 없애고, 믿을 수 있는 0.88–0.94를 얻었습니다.", en: "Found leakage from backfilling and machine IDs; removing it gave a trustworthy 0.88–0.94." }
      },
      {
        tag: "MODEL", title: { ko: "모델 선택", en: "Model" },
        line: { ko: "후보 5개를 같은 조건으로 비교해 LightGBM을 골랐습니다. 랜덤포레스트와 성능 차이는 0.004였지만 학습이 2.5배 빨라, 부품 × 기간별로 여러 번 다시 학습해야 하는 구조에 맞았습니다.", en: "Compared 5 models under the same conditions and chose LightGBM: within 0.004 AUC of random forest but 2.5× faster to retrain across parts and horizons." },
        key: { ko: "AUC 0.727 → 0.88–0.94", en: "AUC 0.727 → 0.88–0.94" },
        stuck: { ko: "comp2는 AUC 0.58로 기존 규칙(0.597)보다도 낮았습니다.", en: "comp2 scored 0.58, below the old rule (0.597)." },
        fix: { ko: "억지로 쓰지 않고 채택 제외를 명시했고, 화면에는 예측 대신 안전재고 안내를 넣었습니다.", en: "Excluded it explicitly and showed safety-stock guidance instead of a prediction." }
      },
      {
        tag: "DECISION", title: { ko: "행동으로 번역", en: "Decision" },
        line: { ko: "부품별 결정 시한(조달 + 준비 8·16·24일)으로 D-day와 발주 마감을 거꾸로 계산하고, 한정된 재고를 위험도 순으로 배정했습니다. 급성 센서 이상은 Isolation Forest로 보완했습니다(고장 약 19.6시간 전 신호).", en: "Back-calculated D-day and order deadlines from each part's lead time (8, 16, 24 days), allocated limited stock by risk, and added Isolation Forest for sudden anomalies (~19.6 h warning)." },
        key: { ko: "상위 위험군 Lift 4.4배", en: "Top-risk lift 4.4×" },
        stuck: { ko: "화면은 28일, 모델은 8·16·24일 기준이라 D-day가 서로 달랐습니다.", en: "The screen used 28 days while models used 8/16/24, so D-days disagreed." },
        fix: { ko: "공통 상수를 한 파일로 모으고 테스트로 검출해 불일치를 0건으로 만들었습니다.", en: "Centralized constants in one file and caught mismatches with tests: zero left." }
      },
      {
        tag: "PRODUCT", title: { ko: "대시보드 · 검증", en: "Dashboard" },
        line: { ko: "메인·설비 상세·통계·발주·설정 5개 화면을 Dash로 만들었습니다. 설비 데이터가 밖으로 나가지 않도록 AI 한 줄 요약은 로컬 sLLM으로 만들었고, 커밋 61회·브랜치 통합 5회로 4명이 기능 F01–F10을 동시에 완성했습니다.", en: "Built five Dash screens (home, machine detail, statistics, ordering, settings), with a local sLLM for summaries so plant data never leaves the site; 61 commits and 5 merges across features F01–F10." },
        key: { ko: "테스트 47건 · 콘솔 에러 0", en: "47 tests · 0 console errors" },
        stuck: { ko: "노트북 해상도에서 그래프가 잘리고 카드가 겹쳤습니다.", en: "Charts clipped and cards overlapped on laptop screens." },
        fix: { ko: "576–1920px 반응형으로 다시 짜서 겹침을 0건으로 만들었습니다.", en: "Rebuilt the layout responsive from 576 to 1920 px: zero overlaps." }
      }
    ],
    role: {
      ko: [
        "조장. 데이터 전처리, 부품별 고장 예측 모델, 대시보드 화면 통합과 반응형 UI",
        "4명이 충돌 없이 일하도록 공통 상수 파일, 기능 번호 F01–F10, 화면 ID 규칙 54개, 테스트 47건을 합치는 조건으로 정함",
        "Claude Code로 Dash 콜백과 반응형 CSS를 구현하고, 콜백 누락을 찾는 점검 스크립트로 반복 검증"
      ],
      en: [
        "Team lead; owned preprocessing, per-part failure models and dashboard integration with responsive UI",
        "Set the rules that let four people work in parallel: shared constants, features F01–F10, 54 ID prefixes and 47 tests as merge gates",
        "Used Claude Code for Dash callbacks and responsive CSS, plus a script that checks for broken callback wiring"
      ]
    },
    stack: ["Python", "pandas", "scikit-learn", "LightGBM", "Isolation Forest", "Dash", "Plotly", "SQLite · SQLAlchemy", "pytest", "Qwen sLLM", "Claude Code"],
    links: [
      { label: { ko: "GitHub 저장소", en: "GitHub repository" }, href: "https://github.com/jgi0117/2team_project" }
    ],
    // 서버 없이 사이트 안에서 돌아가는 대시보드 재현본 (demo\build_demo.ps1로 생성)
    demo: {
      link: "projects/dashboard-demo/index.html",
      label: { ko: "대시보드 직접 써보기", en: "Try the dashboard" },
      note: { ko: "메인 · 설비별 · 통계 · 발주 4개 화면 · 설비 100대 · 서버 없이 실행", en: "All 4 screens · 100 machines · runs without a server" },
      title: { ko: "설비보전 대시보드 · 웹 재현본", en: "Maintenance dashboard · web replica" }
    },
    images: [
      { src: "assets/main/dashboard-main.png", alt: { ko: "대시보드 메인 화면: AI 한 줄 요약, 경고 KPI, To-Do 달력, 위험 TOP5, 재고 × 위험 교차표", en: "Dashboard home: AI summary, KPIs, to-do calendar, top-5 risk, stock × risk table" } }
    ]
  }
];
