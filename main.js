// 메인 프로젝트: 사람이 직접 관리하는 파일. 매일 자동 수집은 이 파일을 건드리지 않습니다.
// 사이드 프로젝트(projects.js, 서가)보다 크게, 프로젝트 섹션 맨 위에 나옵니다.
// 화면 구성(디자인 캔버스 B안): 제목, 대시보드(바로 실행), 단계 다이얼(steps 5개, 숫자에 마우스를 올리면 전환), 역할과 기술
// 문장 규칙: 문장 중간에 중간점이나 대시를 쓰지 않는다. 줄바꿈은 \n.
// 근거: 윤가은_포트폴리오(260930).doc, github.com/jgi0117/2team_project
window.SITE_MAIN = [
  {
    id: "predictive-maintenance",
    period: "2026.09.14 ~ 09.30",
    team: { ko: "LS Jump Up 2팀 (3인), 조장, 기여도 35%", en: "LS Jump Up Team 2 (3 people), team lead, 35% contribution" },
    headline: { ko: "고장 확률을\n오늘 할 일로 바꾸는 정비 대시보드", en: "A maintenance dashboard that turns\nfailure scores into today's tasks" },
    title: { ko: "센서 데이터 기반 설비 고장 예측 및 정비, 발주 의사결정 지원 시스템", en: "Sensor-based failure prediction and maintenance/ordering decision support" },
    oneLiner: {
      ko: "센서 데이터로 부품 고장을 예측합니다.\n그 결과를 '고장 확률 0.7'이 아니라 'D-8, 재고 없음, 오늘 발주'처럼 바로 움직일 수 있는 말로 보여줍니다.",
      en: "Predicts part failures from sensor data.\nShows the result as an action, not 'failure probability 0.7' but 'D-8, no stock, order today'."
    },
    stats: [
      { v: { ko: "0.88~0.94", en: "0.88~0.94" }, l: { ko: "AUC (기존 규칙은 0.727)\n채택 부품 3종 기준", en: "AUC (old rule: 0.727)\n3 adopted parts" } },
      { v: { ko: "4.4배", en: "4.4×" }, l: { ko: "위험 상위군에 실제 고장이\n몰린 정도 (Lift)", en: "failures concentrated\nin the top-risk group (lift)" } },
      { v: { ko: "87.6만", en: "876k" }, l: { ko: "센서 데이터 행\n설비 100대, 부품 4종", en: "sensor rows\n100 machines, 4 parts" } },
      { v: { ko: "0원", en: "₩0" }, l: { ko: "AI 요약 API 비용\n로컬 sLLM 사용", en: "API cost for AI summaries\nlocal sLLM" } }
    ],
    // 단계 다이얼: tag(영문 꼬리표), title, line(무엇을 했나), key(핵심 숫자), stuck(막힌 곳), fix(해결)
    steps: [
      {
        tag: "PROBLEM", title: { ko: "문제 정의", en: "Problem" },
        line: { ko: "정비는 부품을 쓴 날짜만 보고 교체했고, 실제 교체 3,286건 중 22.7%가 고장 난 뒤의 긴급 교체였습니다.\n센서, 정비, 고장, 재고 데이터가 따로 있어서 어느 설비의 어느 부품을 먼저 봐야 하는지 한 화면에서 판단할 수 없었습니다.", en: "Parts were replaced by age alone, and 22.7% of 3,286 replacements were emergency fixes after failure.\nSensor, maintenance, failure and stock data lived apart, so nobody could see which part to check first." },
        key: { ko: "긴급 교체 22.7%", en: "22.7% emergency" },
        stuck: { ko: "'고장 확률 0.7'은 현장에서 무엇을 하라는 뜻인지 알 수 없었습니다.", en: "'Failure probability 0.7' doesn't tell a technician what to do." },
        fix: { ko: "결과를 D-day, 발주 마감, 재고처럼 바로 행동할 수 있는 단위로 보여주기로 목표를 정했습니다.", en: "Set the goal of showing results as actions: D-day, order deadline, stock." }
      },
      {
        tag: "DATA", title: { ko: "데이터 정리", en: "Data" },
        line: { ko: "시간 단위 87.6만 행을 설비별 하루 단위 3.36만 행으로 줄였습니다. 미래 데이터로 과거를 맞히지 않도록 시점을 기준으로 학습과 시험 데이터를 나눴습니다.\n설비마다 정상 범위가 달라서 센서 원래 값 대신 이동평균, 추세, z점수를 썼습니다.", en: "Condensed 876k hourly rows into 33.6k machine-day rows and split them by time so the future never predicts the past.\nUsed rolling means, trends and z-scores instead of raw values, since each machine has its own normal range." },
        key: { ko: "87.6만 → 3.36만 행", en: "876k → 33.6k rows" },
        stuck: { ko: "AUC가 0.98로 나와서 오히려 의심스러웠습니다.", en: "AUC came out at 0.98, which looked too good to be true." },
        fix: { ko: "미래 값으로 빈칸을 채운 처리와 설비 ID가 정답을 흘리고 있었습니다. 둘을 없애고 믿을 수 있는 0.88~0.94를 얻었습니다.", en: "Found leakage from backfilling and machine IDs. Removing both gave a trustworthy 0.88~0.94." }
      },
      {
        tag: "MODEL", title: { ko: "모델 선택", en: "Model" },
        line: { ko: "후보 5개를 같은 조건으로 비교해 LightGBM을 골랐습니다.\n랜덤포레스트와 성능 차이는 0.004였지만 학습이 2.5배 빨랐습니다. 부품과 기간별로 여러 번 다시 학습해야 하는 구조라 속도를 택했습니다.", en: "Compared 5 models under the same conditions and chose LightGBM.\nIt was within 0.004 AUC of random forest but 2.5× faster to retrain across parts and horizons." },
        key: { ko: "AUC 0.727 → 0.88~0.94", en: "AUC 0.727 → 0.88~0.94" },
        stuck: { ko: "comp2는 AUC 0.58로 기존 규칙(0.597)보다도 낮았습니다.", en: "comp2 scored 0.58, below the old rule (0.597)." },
        fix: { ko: "억지로 쓰지 않고 채택에서 뺐다고 명시했습니다. 화면에는 예측 대신 안전재고 안내를 넣었습니다.", en: "Excluded it explicitly and showed safety-stock guidance instead of a prediction." }
      },
      {
        tag: "DECISION", title: { ko: "행동으로 번역", en: "Decision" },
        line: { ko: "부품별 결정 시한(조달과 준비에 8일, 16일, 24일)으로 D-day와 발주 마감을 거꾸로 계산하고, 한정된 재고를 위험도 순으로 배정했습니다.\n갑자기 생기는 센서 이상은 Isolation Forest로 보완했습니다. 고장 약 19.6시간 전에 신호를 잡습니다.", en: "Back-calculated D-day and order deadlines from each part's lead time (8, 16, 24 days) and allocated limited stock by risk.\nAdded Isolation Forest for sudden anomalies, which flags them about 19.6 hours before failure." },
        key: { ko: "상위 위험군 Lift 4.4배", en: "Top-risk lift 4.4×" },
        stuck: { ko: "화면은 28일, 모델은 8일, 16일, 24일을 기준으로 써서 D-day가 서로 달랐습니다.", en: "The screen used 28 days while models used 8/16/24, so D-days disagreed." },
        fix: { ko: "공통 기준값을 한 파일로 모으고 테스트로 걸러내게 해서 불일치를 0건으로 만들었습니다.", en: "Centralized constants in one file and caught mismatches with tests: zero left." }
      },
      {
        tag: "PRODUCT", title: { ko: "대시보드와 검증", en: "Dashboard" },
        line: { ko: "메인, 설비 상세, 통계, 발주, 설정까지 5개 화면을 Dash로 만들었습니다. 설비 데이터가 밖으로 나가지 않도록 AI 한 줄 요약은 로컬 sLLM으로 만들었습니다.\n커밋 61회, 브랜치 통합 5회로 3명이 기능 F01부터 F10까지 동시에 완성했습니다.", en: "Built five Dash screens: home, machine detail, statistics, ordering and settings. A local sLLM writes summaries so plant data never leaves the site.\n61 commits and 5 merges let three people finish features F01 to F10 in parallel." },
        key: { ko: "테스트 47건, 콘솔 에러 0", en: "47 tests, 0 console errors" },
        stuck: { ko: "노트북 해상도에서 그래프가 잘리고 카드가 겹쳤습니다.", en: "Charts clipped and cards overlapped on laptop screens." },
        fix: { ko: "화면 너비 576px부터 1920px까지 맞도록 다시 짜서 겹침을 0건으로 만들었습니다.", en: "Rebuilt the layout to fit 576 to 1920 px: zero overlaps." }
      }
    ],
    role: {
      ko: [
        "조장으로서 데이터 전처리, 부품별 고장 예측 모델, 대시보드 화면 통합과 반응형 화면을 맡았습니다.",
        "3명이 충돌 없이 일하도록 공통 기준값 파일, 기능 번호(F01~F10), 화면 ID 규칙 54개, 합치기 전 통과할 테스트 47건을 정했습니다.",
        "Claude Code로 Dash 콜백과 반응형 CSS를 구현하고, 콜백 누락을 찾는 점검 스크립트로 반복해서 확인했습니다."
      ],
      en: [
        "As team lead I owned preprocessing, per-part failure models and dashboard integration with a responsive layout.",
        "Set the rules that let three people work in parallel: shared constants, features F01 to F10, 54 ID prefixes and 47 tests as merge gates.",
        "Used Claude Code for Dash callbacks and responsive CSS, plus a script that checks for broken callback wiring."
      ]
    },
    stack: ["Python", "pandas", "scikit-learn", "LightGBM", "Isolation Forest", "Dash", "Plotly", "SQLite", "SQLAlchemy", "pytest", "Qwen sLLM", "Claude Code"],
    links: [
      { label: { ko: "GitHub 저장소", en: "GitHub repository" }, href: "https://github.com/jgi0117/2team_project" }
    ],
    // 서버 없이 사이트 안에서 돌아가는 대시보드 재현본 (demo\build_demo.ps1로 생성)
    demo: {
      link: "projects/dashboard-demo/index.html",
      label: { ko: "대시보드 직접 써보기", en: "Try the dashboard" },
      note: { ko: "메인, 설비별, 통계, 발주 4개 화면과 설비 100대\n서버 없이 바로 실행됩니다", en: "All 4 screens and 100 machines\nRuns without a server" },
      title: { ko: "설비보전 대시보드 웹 재현본", en: "Maintenance dashboard web replica" }
    },
    images: [
      { src: "assets/main/dashboard-main.png", alt: { ko: "대시보드 메인 화면: AI 한 줄 요약, 경고 KPI, To-Do 달력, 위험 TOP5, 재고와 위험 교차표", en: "Dashboard home: AI summary, KPIs, to-do calendar, top-5 risk, stock and risk table" } }
    ]
  }
];
