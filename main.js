// 메인 프로젝트: 사람이 직접 관리하는 파일. 매일 자동 수집은 이 파일을 건드리지 않습니다.
// 사이드 프로젝트(projects.js, 서가)보다 크게, 프로젝트 섹션 맨 위에 나옵니다.
// 화면 구성(디자인 캔버스 B안): 제목, 대시보드(바로 실행), 단계 다이얼(steps 5개, 숫자에 마우스를 올리면 전환), 역할과 기술
// 문장 규칙: 문장 중간에 중간점이나 대시를 쓰지 않는다. 줄바꿈은 \n.
// 근거: 윤가은_포트폴리오(260930).doc, 팀 저장소
window.SITE_MAIN = [
  {
    id: "predictive-maintenance",
    short: { ko: "설비 정비, 발주 대시보드", en: "Maintenance and ordering dashboard" },
    // 카드 첫눈에 보이는 것(2026-11-23 개편): 한 줄 제목, 그 아래 한 줄 설명, 불릿 3개. 나머지는 '자세히'에서 연다.
    name: { ko: "부품 발주 시점 대시보드", en: "Parts Ordering Dashboard" },
    desc: { ko: "고장 예측과 총비용으로 최적의 발주 시점을 제안하는 정비 대시보드", en: "Recommends the best order date from failure prediction and total cost" },
    bullets: {
      ko: [
        "센서 데이터 **87.6만 행**으로 부품별 고장 예측 모델 구축, 정확도(AUC) **0.88~0.94**",
        "발주일마다 보관비, 긴급 작업비, 정지 손실을 합산해 **총비용 최소 시점** 계산",
        "결과를 'D-8, 재고 없음, 오늘 발주'처럼 **바로 움직일 수 있는 말**로 표시"
      ],
      en: [
        "Built per-part failure models from **876k sensor rows**, AUC **0.88~0.94**",
        "Added storage, emergency work and downtime costs per order date to find **the lowest-cost date**",
        "Shows results as **plain actions** like 'D-8, no stock, order today'"
      ]
    },
    tags: ["Python", "LightGBM", "Dash", "Claude Code", { ko: "3인 팀 조장", en: "Team lead of 3" }],
    // 기획 흐름(2026-11-23): 왜 이 문제였고, 진짜 문제를 무엇으로 다시 정했고, 어떤 관점으로 해법까지 갔는지. 근거: steps, dev/knowledge/profile-gaeun.md
    plan: [
      { mine: false, t: { ko: "날짜만 보고 교체", en: "Replaced by age" }, d: { ko: "교체 3,286건 중 22.7%가 고장 난 뒤의 긴급 교체", en: "22.7% of 3,286 replacements were emergency fixes" }, line: { ko: "부품을 쓴 날짜만 보고 교체했고, 교체 3,286건 중 **22.7%가 고장 난 뒤의 긴급 교체**였습니다.", en: "Parts were replaced by age alone; 22.7% of 3,286 replacements were emergencies." }, key: { ko: "긴급 교체 22.7%", en: "22.7% emergency" }, img: "assets/main/dashboard-main.png" },
      { mine: true, t: { ko: "예측이 아니라 발주 시점", en: "Not prediction but order timing" }, d: { ko: "팀 논의로 실무자의 어려움은 '언제 주문하나'라는 판단임을 확인", en: "Found the real struggle is deciding when to order" }, line: { ko: "처음에는 30일 안의 고장 확률을 보여 주려 했지만, 팀 논의에서 실무자가 어려워하는 건 **'언제 주문하나'라는 판단**임을 확인했습니다.", en: "We first planned a 30-day failure dashboard, then found the real struggle is deciding when to order." }, key: { ko: "예측보다 발주 시점", en: "Order timing over prediction" }, img: "assets/main/pm-calendar.jpg" },
      { mine: false, t: { ko: "확률 말고 비용과 행동", en: "Cost and action, not odds" }, d: { ko: "일찍 사면 보관비, 늦으면 긴급 작업비와 정지 손실", en: "Too early costs storage, too late costs downtime" }, line: { ko: "일찍 사면 보관비가, 늦게 사면 긴급 작업비와 설비 정지 손실이 붙습니다. 결과는 **확률이 아니라 D-day와 발주 마감**으로 보여 주기로 했습니다.", en: "Early orders cost storage; late ones cost emergency work and downtime. Results show as D-day and order deadline, not odds." }, key: { ko: "확률 대신 비용과 행동", en: "Cost and action, not odds" }, img: "assets/main/pm-dday.jpg" },
      { mine: true, t: { ko: "고장 예측 + 총비용 곡선", en: "Prediction + cost curve" }, d: { ko: "부품별 예측 모델과 발주일별 총비용으로 최소 비용 시점 제안", en: "Per-part models and daily total cost give the best order date" }, line: { ko: "부품별 고장 예측 모델과 발주일별 총비용 곡선으로 **비용이 최소가 되는 발주 시점**을 제안합니다. 저는 모델과 화면 통합을 맡았습니다.", en: "Per-part models and a daily total-cost curve point to the lowest-cost order date. I built the models and integrated the screens." }, key: { ko: "총비용 최소 시점 제안", en: "Lowest-cost order date" }, img: "assets/main/pm-cost.jpg" },
      { mine: false, t: { ko: "믿을 수 있는 숫자로", en: "Numbers we can trust" }, d: { ko: "0.98을 의심해 정답 누출을 걷어내고 0.88~0.94, 테스트 47건", en: "Doubted 0.98, removed leakage: 0.88~0.94, 47 tests" }, line: { ko: "정확도가 0.98로 너무 높게 나오자 의심해 **정답 누출을 찾아 걷어냈고**, 믿을 수 있는 0.88~0.94를 얻었습니다. 합치기 전 테스트는 47건입니다.", en: "AUC of 0.98 looked too good, so we removed the leakage and got a trustworthy 0.88~0.94. 47 tests gate every merge." }, key: { ko: "AUC 0.88~0.94", en: "AUC 0.88~0.94" }, img: "assets/main/pm-risk.jpg" }
    ],
    // 어디까지가 내 일인지(채용담당자 점검 2026-11-23). 근거: role, team(기여도 35%)
    split: {
      mine: { ko: "조장, 데이터 전처리와 부품별 고장 예측 모델, 대시보드 화면 통합 (기여도 35%)", en: "Team lead; preprocessing, per-part failure models, dashboard integration (35% contribution)" },
      team: { ko: "팀원 2명이 나머지 기능 화면과 분석을 나눠 맡음", en: "Two teammates split the remaining screens and analysis" },
      ai: { ko: "Claude Code로 화면 기능과 반응형 배치를 구현, 결과는 점검 스크립트와 테스트 47건으로 확인", en: "Claude Code implemented screens and layout; checked with a script and 47 tests" }
    },
    period: "2026.09.14 ~ 09.30",
    team: { ko: "LS Jump Up 2팀 (3인), 조장, 기여도 35%", en: "LS Jump Up Team 2 (3 people), team lead, 35% contribution" },
    headline: { ko: "고장 시점과 총비용을 함께 따져\n최적의 발주 시점을 제안하는 정비 대시보드", en: "A maintenance dashboard that weighs failure timing\nagainst total cost to recommend the best order date" },
    title: { ko: "센서 데이터 기반 설비 고장 예측 및 정비, 발주 의사결정 지원 시스템", en: "Sensor-based failure prediction and maintenance/ordering decision support" },
    oneLiner: {
      ko: "부품을 너무 일찍 사면 보관비가 들고, 늦게 사면 긴급 작업비와 설비가 멈춘 날의 손실이 붙습니다.\n센서 데이터로 부품의 고장 시점을 예측한 뒤 발주일마다 세 가지 비용을 합산해 총비용이 최소가 되는 발주 시점을 찾았습니다. 현장에는 '고장 확률 0.7' 대신 'D-8, 재고 없음, 오늘 발주'처럼 바로 움직일 수 있는 말로 보여 줍니다.",
      en: "Buy a part too early and you pay to store it; too late and you pay for emergency work and every day the machine stands idle.\nThe dashboard predicts when each part will fail from sensor data, adds up these costs for every possible order date, and finds the one with the lowest total. It says 'D-8, no stock, order today' instead of 'failure probability 0.7'."
    },
    stats: [
      { v: { ko: "0.88~0.94", en: "0.88~0.94" }, l: { ko: "예측 성능 지표(AUC)\n기존 규칙 0.727, 채택 부품 3종 기준", en: "AUC (old rule: 0.727)\n3 adopted parts" } },
      { v: { ko: "4.4배", en: "4.4×" }, l: { ko: "위험 상위 그룹에 실제 고장이\n몰린 정도 (Lift)", en: "failures concentrated\nin the top-risk group (lift)" } },
      { v: { ko: "87.6만", en: "876k" }, l: { ko: "센서 데이터 행\n설비 100대, 부품 4종", en: "sensor rows\n100 machines, 4 parts" } },
      { v: { ko: "0원", en: "₩0" }, l: { ko: "AI 요약 API 비용\n로컬 sLLM 사용", en: "API cost for AI summaries\nlocal sLLM" } }
    ],
    // 단계 다이얼: tag(영문 꼬리표), title, line(무엇을 했나), key(핵심 숫자), stuck(막힌 곳), fix(해결)
    steps: [
      {
        tag: "PROBLEM", title: { ko: "문제 정의", en: "Problem" },
        line: { ko: "기존 정비는 부품을 쓴 날짜만 보고 교체했고, 실제 교체 3,286건 중 22.7%가 고장 난 뒤의 긴급 교체였습니다.\n센서, 정비, 고장, 재고 데이터가 따로 있어 어느 설비의 어느 부품부터 봐야 할지 한 화면에서 판단할 수 없었습니다.", en: "Parts were replaced by age alone, and 22.7% of 3,286 replacements were emergency fixes after failure.\nSensor, maintenance, failure and stock data lived apart, so nobody could see which part to check first." },
        key: { ko: "긴급 교체 22.7%", en: "22.7% emergency" },
        stuck: { ko: "처음 기획은 30일 안의 고장 확률을 보여 주는 대시보드였지만, '고장 확률 0.7'만으로는 현장에서 무엇을 해야 할지 알 수 없었습니다.", en: "The first plan was a 30-day failure-probability dashboard, but 'failure probability 0.7' doesn't tell a technician what to do." },
        fix: { ko: "팀 논의에서 실무자가 어려워하는 지점은 고장 예측보다 부품 발주 시점 판단이라는 것을 확인했습니다. 그래서 결과를 D-day, 발주 마감, 재고처럼 바로 행동할 수 있는 단위로 바꾸기로 했습니다.", en: "Team discussion showed that the real difficulty was deciding when to order parts, so we turned results into actions: D-day, order deadline, stock." }
      },
      {
        tag: "DATA", title: { ko: "데이터 정리", en: "Data" },
        line: { ko: "시간 단위 센서 기록 87.6만 행을 설비별 하루 단위 3.36만 행으로 줄였습니다. 미래 데이터로 과거를 맞히는 일이 없게 날짜를 기준으로 학습용과 시험용 데이터를 나눴습니다.\n설비마다 정상 범위가 달라 센서 원래 값 대신 최근 평균과 변화 추세, 표준화 점수를 썼습니다.", en: "Condensed 876k hourly rows into 33.6k machine-day rows and split them by time so the future never predicts the past.\nUsed rolling means, trends and z-scores instead of raw values, since each machine has its own normal range." },
        key: { ko: "87.6만 → 3.36만 행", en: "876k → 33.6k rows" },
        stuck: { ko: "정확도 지표가 0.98로 너무 높게 나와 오히려 의심스러웠습니다.", en: "AUC came out at 0.98, which looked too good to be true." },
        fix: { ko: "빈칸을 미래 값으로 채운 처리와 설비 번호가 정답을 미리 알려 주고 있었습니다. 두 가지를 걷어내고 믿을 수 있는 0.88~0.94를 얻었습니다.", en: "Found leakage from backfilling and machine IDs. Removing both gave a trustworthy 0.88~0.94." }
      },
      {
        tag: "MODEL", title: { ko: "모델 선택", en: "Model" },
        line: { ko: "후보 모델 5개를 같은 조건에서 비교해 LightGBM을 골랐습니다.\n랜덤포레스트와 정확도 차이는 0.004에 그쳤지만 학습이 2.5배 빨랐고, 부품과 기간별로 여러 번 다시 학습해야 하는 구조라 속도를 택했습니다. 갑작스러운 센서 이상은 별도의 이상 탐지 모델(Isolation Forest)로 보완해 고장 약 19.6시간 전에 신호를 잡습니다.", en: "Compared 5 models under the same conditions and chose LightGBM.\nIt was within 0.004 AUC of random forest but 2.5× faster to retrain across parts and horizons. Isolation Forest covers sudden anomalies, flagging them about 19.6 hours before failure." },
        key: { ko: "AUC 0.727 → 0.88~0.94", en: "AUC 0.727 → 0.88~0.94" },
        stuck: { ko: "부품 comp2는 정확도 0.58로 기존 규칙(0.597)보다도 낮았습니다.", en: "comp2 scored 0.58, below the old rule (0.597)." },
        fix: { ko: "억지로 쓰지 않고 채택에서 뺐다고 밝혔고, 화면에는 예측 대신 안전재고 안내를 넣었습니다.", en: "Excluded it explicitly and showed safety-stock guidance instead of a prediction." }
      },
      {
        tag: "COST", title: { ko: "발주 시점과 비용", en: "Order timing and cost" },
        line: { ko: "부품별 조달과 준비 기간(8일, 16일, 24일)에서 거꾸로 계산해 D-day와 발주 마감을 정하고, 한정된 재고는 위험도 순으로 배정했습니다.\n발주를 하루씩 미룰 때마다 구매비, 보관비, 긴급 작업비, 설비 정지 손실을 더해 총비용 곡선을 그렸습니다. 비용이 최소가 되는 시점은 오늘, 1주 뒤, 2주 뒤 발주안과 나란히 비교해 보여 줍니다. 단가는 팀이 정한 가상 운영 데이터입니다.", en: "Back-calculated D-day and order deadlines from each part's lead time (8, 16, 24 days) and allocated limited stock by risk.\nFor every day an order is delayed, the dashboard adds purchase, storage, emergency work and downtime costs into one curve, and compares the lowest-cost date with ordering today, in 1 week or in 2 weeks. Unit costs are simulated." },
        key: { ko: "발주안 3개와 최소 비용 시점 비교", en: "3 order options vs. the lowest-cost date" },
        stuck: { ko: "화면은 28일, 모델은 8일, 16일, 24일 기준을 써서 같은 부품의 D-day가 서로 달랐습니다.", en: "The screen used 28 days while models used 8/16/24, so D-days disagreed." },
        fix: { ko: "공통 기준값을 한 파일로 모으고 테스트로 어긋남을 잡아내게 해서 불일치를 0건으로 만들었습니다.", en: "Centralized constants in one file and caught mismatches with tests: zero left." }
      },
      {
        tag: "PRODUCT", title: { ko: "대시보드와 검증", en: "Dashboard" },
        line: { ko: "메인, 설비 상세, 통계, 발주, 설정까지 5개 화면을 만들었습니다. 설비 데이터가 밖으로 나가지 않도록 AI 한 줄 요약은 외부 서버 없이 PC 안에서 돌아가는 소형 언어 모델(sLLM)로 만들었습니다.\n3명이 커밋 61회와 브랜치 통합 5회를 거쳐 기능 F01부터 F10까지 나눠 완성했습니다.", en: "Built five Dash screens: home, machine detail, statistics, ordering and settings. A small language model (sLLM) running on the local machine writes summaries so plant data never leaves the site.\n61 commits and 5 merges let three people finish features F01 to F10 in parallel." },
        key: { ko: "테스트 47건, 콘솔 에러 0", en: "47 tests, 0 console errors" },
        stuck: { ko: "노트북 해상도에서 그래프가 잘리고 카드가 겹쳤습니다.", en: "Charts clipped and cards overlapped on laptop screens." },
        fix: { ko: "화면 너비 576px부터 1920px까지 맞도록 배치를 다시 짜서 겹침을 0건으로 만들었습니다.", en: "Rebuilt the layout to fit 576 to 1920 px: zero overlaps." }
      }
    ],
    role: {
      ko: [
        "조장으로서 데이터 전처리, 부품별 고장 예측 모델, 대시보드 화면 통합을 맡았습니다.",
        "3명이 충돌 없이 일하도록 공통 기준값 파일, 기능 번호(F01~F10), 화면 ID 규칙 54개, 합치기 전 통과할 테스트 47건을 먼저 정했습니다.",
        "Claude Code로 화면 기능과 반응형 배치를 구현하고, 연결 누락을 찾는 점검 스크립트로 반복해서 확인했습니다."
      ],
      en: [
        "As team lead I owned preprocessing, per-part failure models and dashboard integration with a responsive layout.",
        "Set the rules that let three people work in parallel: shared constants, features F01 to F10, 54 ID prefixes and 47 tests as merge gates.",
        "Used Claude Code for Dash callbacks and responsive CSS, plus a script that checks for broken callback wiring."
      ]
    },
    stack: ["Python", "pandas", "scikit-learn", "LightGBM", "Isolation Forest", "Dash", "Plotly", "SQLite", "SQLAlchemy", "pytest", "Qwen sLLM", "Claude Code"],
    // 저장소 링크는 넣지 않는다 (사용자 요청, 2026-10-29)
    links: [],
    // 서버 없이 사이트 안에서 돌아가는 대시보드 재현본 (demo\build_demo.ps1로 생성)
    demo: {
      link: "projects/dashboard-demo/index.html",
      label: { ko: "대시보드 직접 써보기", en: "Try the dashboard" },
      note: { ko: "메인, 설비별, 통계, 발주 4개 화면과 설비 100대\n서버 없이 바로 실행됩니다", en: "All 4 screens and 100 machines\nRuns without a server" },
      title: { ko: "설비보전 대시보드 웹 재현본", en: "Maintenance dashboard web replica" }
    },
    images: [
      { src: "assets/main/pm-calendar.jpg", alt: { ko: "To-Do 달력: 날짜별로 점검과 부품 교체 할 일을 보여 줌", en: "To-do calendar: inspections and part swaps by date" } },
      { src: "assets/main/pm-dday.jpg", alt: { ko: "부품 위치: 부품마다 위험 상승까지 남은 D-day와 발주 검토", en: "Part map: days left before risk rises, with order review" } },
      { src: "assets/main/pm-cost.jpg", alt: { ko: "언제 발주하면 가장 쌀까: 발주일별 총비용 곡선과 발주 시나리오 비교", en: "When to order: total-cost curve by order date and scenarios" } },
      { src: "assets/main/pm-risk.jpg", alt: { ko: "설비별 이상 위험: 설비 100대의 센서 패턴 이상 정도", en: "Anomaly risk across 100 machines" } },
      { src: "assets/main/dashboard-main.png", alt: { ko: "대시보드 메인 화면: AI 한 줄 요약, 경고 KPI, To-Do 달력, 위험 TOP5, 재고와 위험 교차표", en: "Dashboard home: AI summary, KPIs, to-do calendar, top-5 risk, stock and risk table" } }
    ]
  },
  {
    // 두 번째 메인 프로젝트. 근거: PharmaFlow_포트폴리오_작성본.docx(2026-11-09), 팀 발표 자료(발표/PharmaFlow-발표.html), 본인 인터뷰(2026-10-29)
    // 저장소는 팀원 소유의 비공개 저장소라 링크하지 않는다. 배포 주소도 로그인 기록이 남아 공개하지 않는다.
    // 화면 사진의 사람 이름은 흐리게 가렸다. 팀원 이름은 쓰지 않는다.
    id: "pharmaflow",
    short: { ko: "PharmaFlow Bio 백신 QA", en: "PharmaFlow Bio vaccine QA" },
    name: { ko: "PharmaFlow Bio", en: "PharmaFlow Bio" },
    desc: { ko: "흩어진 백신 품질 기록을 출하 검토까지 한 흐름으로 묶은 QA 시스템", en: "A QA system that ties scattered vaccine quality records into one flow up to release" },
    bullets: {
      ko: [
        "인터뷰로 문제를 다시 정의: **서명 직전에야 드러나는 열린 이탈 건**",
        "시험값 저장부터 이슈 종결, 출하 검토까지 **한 화면 흐름**, 열린 이슈가 있으면 출하 차단",
        "자동 시험 **536개**, 팀 직접 QA **25건** 모두 통과"
      ],
      en: [
        "Reframed the problem through interviews: **open deviations found only at signing**",
        "**One flow** from saving a result to closing the issue and reviewing release; open issues block release",
        "All **536** automated tests and **25** manual QA checks pass"
      ]
    },
    tags: ["Supabase", "Vercel", "Claude API", { ko: "식약처 공공데이터", en: "MFDS open data" }, { ko: "기획과 화면 설계", en: "Planning and UI" }],
    plan: [
      { mine: true, t: { ko: "서명 직전의 기록 맞추기", en: "Reconciling records at signing" }, d: { ko: "QA 담당자가 시스템, 엑셀, 메일을 오가며 로트 상태 확인", en: "QA checks lots across systems, sheets and email" }, line: { ko: "QA 담당자는 출하 서명 직전까지 시스템, 엑셀, 메일을 오가며 로트 상태를 맞춥니다. 가상 페르소나 5명을 인터뷰해 보니 **로트 한 건 확인에 15분에서 3~4시간**이 들었습니다.", en: "QA reconciles lot status across systems, sheets and email until signing; persona interviews put one lot at 15 minutes to 3~4 hours." }, key: { ko: "가상 페르소나 5명 중 3명, 서명 직전에야 앎", en: "3 of 5 found out only at signing" }, img: "assets/pharmaflow/lot.jpg" },
      { mine: true, t: { ko: "기록이 아니라 종결 상태", en: "Not records but closure status" }, d: { ko: "5명 모두 처리 결과를 묻고 기다림, 공유표는 입력이 안 돼 실패", en: "All 5 wait for status; shared sheets failed" }, line: { ko: "기록이 흩어진 것보다 **다른 부서의 처리 결과가 전달되지 않는 것**이 문제였습니다. 공유표를 만든 사람도 상대가 입력하지 않아 실패했습니다.", en: "The issue was not scattered records but closure status never reaching other teams; shared sheets failed because no one filled them in." }, key: { ko: "가상 페르소나 5명 모두 묻고 기다림", en: "5 of 5 wait and ask" }, img: "assets/pharmaflow/issue.jpg" },
      { mine: false, t: { ko: "따로 적지 않아도 쌓이게", en: "Records that build themselves" }, d: { ko: "새 대장 대신 일하는 흐름 안에 기록, 판정은 코드와 승인은 사람", en: "Records inside the workflow; code judges, people approve" }, line: { ko: "대장을 하나 더 만드는 대신 **일하는 흐름 안에 기록**을 넣었습니다. 판정은 코드가, 승인은 사람이 하고, 만들지 않을 것 10가지를 먼저 정했습니다.", en: "Instead of another tracker, records live inside the workflow. Code judges, people approve, and ten things were ruled out first." }, key: { ko: "하지 않을 것 10가지", en: "10 things left out" }, img: "assets/pharmaflow/process.jpg" },
      { mine: true, t: { ko: "로트 하나, 흐름 하나", en: "One lot, one flow" }, d: { ko: "시험값 저장부터 출하 검토까지 한 화면, 열린 이슈면 출하 차단", en: "One screen from result to release; open issues block release" }, line: { ko: "시험값 저장부터 이슈 종결, 내부 출하 검토까지 한 화면에서 이어집니다. **열린 이슈가 있으면 출하를 고를 수 없고**, 홈에는 지금 할 일이 먼저 보입니다.", en: "From saving a result to closing the issue and reviewing release on one screen; open issues block release, and home shows today's tasks first." }, key: { ko: "한 화면 흐름, 열린 이슈면 출하 차단", en: "One flow; open issues block release" }, img: "assets/pharmaflow/home.jpg" },
      { mine: false, t: { ko: "숫자로 확인", en: "Checked in numbers" }, d: { ko: "자동 시험 536개, 팀 QA 25건, 현직자 1명 대면 확인", en: "536 tests, 25 QA checks, one practitioner interview" }, line: { ko: "**자동 시험 536개와 팀 직접 QA 25건**을 모두 통과했고, 현직자 1명을 직접 만나 문제 방향을 확인했습니다.", en: "All 536 automated tests and 25 manual QA checks pass, and one practitioner confirmed the direction in person." }, key: { ko: "시험 536개, QA 25건 통과", en: "536 tests, 25 QA checks" }, img: "assets/pharmaflow/regulatory.jpg" }
    ],
    // 본인 작업물 샘플: 직접 디자인한 팀 발표 자료(10/29) 중 3장. 팀원 이름과 배포 주소가 없는 장만 골랐다
    samples: [
      { src: "assets/pharmaflow/deck-problem.jpg", alt: { ko: "발표 슬라이드: 서비스 소개와 해결하려는 문제", en: "Slide: the service and the problem it solves" } },
      { src: "assets/pharmaflow/deck-asis-tobe.jpg", alt: { ko: "발표 슬라이드: 핵심 문제와 앱이 바꾸는 것 (AS-IS, TO-BE)", en: "Slide: core problem, as-is and to-be" } },
      { src: "assets/pharmaflow/deck-workflow.jpg", alt: { ko: "발표 슬라이드: 사용자 업무 흐름 6단계", en: "Slide: the 6-step user workflow" } }
    ],
    split: {
      mine: { ko: "문제 정의, 인터뷰 설계와 현직자 인터뷰, 화면 개편, 발표 자료 디자인", en: "Problem definition, interview design and practitioner interview, UI redesign, presentation design" },
      team: { ko: "팀원 2명이 DB, 서버, AI 기능 구현과 시험 보고서를 맡음", en: "Two teammates built the database, server and AI features and wrote the test report" },
      ai: { ko: "Claude Code로 기획 문서와 구현을 진행, 앱 안 AI는 읽기 전용이고 숫자를 코드가 재검사", en: "Claude Code for docs and build; the in-app AI is read-only and code re-checks its numbers" }
    },
    period: "2026.10.22 ~ 10.30",
    team: { ko: "LS Jump Up 두 번째 팀 프로젝트 (3인), 기획과 화면 설계 담당, 10월 29일 발표", en: "LS Jump Up second team project (3 people), planning and UI design, presented Oct 29" },
    headline: { ko: "출하 전 곳곳에 흩어져 있던 품질 기록을\n하나의 흐름으로 통합한 백신 QA 시스템", en: "A vaccine QA system that unifies scattered\npre-release quality records into one flow" },
    title: { ko: "PharmaFlow Bio: 백신 제조 로트의 품질 이탈 추적과 내부 출하 검토 지원 웹 앱", en: "PharmaFlow Bio: tracking quality deviations and supporting internal release review for vaccine lots" },
    oneLiner: {
      ko: "백신 QA 담당자는 로트(한 번에 만든 제품 묶음)를 내보내기 전, 시스템과 엑셀, 메일에 흩어진 시험 기록과 이탈 건을 하나씩 맞춰 봅니다. 그러다 끝나지 않은 이슈를 서명 직전에야 알기도 합니다.\nPharmaFlow Bio는 흩어진 기록을 로트 하나에 모아 시험값 저장부터 이슈 종결, 내부 출하 검토까지 한 흐름으로 보여 줍니다. 열린 이슈가 있으면 출하를 고를 수 없고, 승인 이력은 자동으로 쌓입니다.",
      en: "Before a vaccine lot leaves the plant, QA checks test records, production records and open deviations one by one across systems, spreadsheets and email. Sometimes an unresolved issue only turns up right before the release signature.\nPharmaFlow Bio gathers these records under one lot and shows them as a single flow, from saving a result to closing the issue and reviewing release. Release cannot be selected while an issue is open, and the approval history builds up on its own."
    },
    stats: [
      { v: { ko: "536개", en: "536" }, l: { ko: "자동 시험 모두 통과\n2026.11.09 직접 실행", en: "automated tests, all passing\nrun on Nov 9, 2026" } },
      { v: { ko: "25건", en: "25" }, l: { ko: "팀이 직접 한 QA 모두 통과\n아침 브리핑 실제 발송 포함", en: "manual team QA checks, all passing\nincl. a live morning briefing" } },
      { v: { ko: "59개", en: "59" }, l: { ko: "정보 구조로 설계한 화면\n이 중 MVP 44개", en: "screens in the IA\n44 in the MVP" } },
      { v: { ko: "4종", en: "4" }, l: { ko: "식약처 공공데이터\n실제 인증키로 연결 확인", en: "MFDS open datasets\nverified with real keys" } }
    ],
    steps: [
      {
        tag: "PROBLEM (MY PART)", title: { ko: "문제 정의", en: "Problem" },
        line: { ko: "QA 담당자는 출하 서명 직전까지 시스템과 엑셀, 폴더를 오가며 이탈 건과 시험 기록, 생산 기록의 상태를 맞춥니다.\n가상 페르소나 5명을 인터뷰해 보니 로트 한 건 확인에 15분에서 3~4시간이 들었고, 3명은 열린 이탈 건을 서명 직전에야 안 적이 있었습니다. 문제는 상황, 갈등, 질문, 답의 순서(SCQA)와 네 칸 표로 정리했습니다.", en: "Right before signing a release, QA reconciles open deviations, test records and production records spread across systems, spreadsheets and folders.\nIn interviews with five virtual personas, checking one lot took 15 minutes to 3~4 hours, and three had learned of an open deviation only at signing. I framed this with SCQA and a four-box table." },
        key: { ko: "서명 직전에야 안 경험, 가상 페르소나 5명 중 3명", en: "3 of 5 found issues only at signing" },
        stuck: { ko: "처음 가설은 '확인에 약 30분, 이탈이 메일로 전달되다 빠진다'였는데, 인터뷰에서 메일 누락을 말한 사람은 0명이었습니다.", en: "The first hypothesis was '30 minutes per lot, deviations lost in email', but no one in the interviews mentioned lost email." },
        fix: { ko: "30분은 환경별 범위로 고치고 근거 없는 메일 누락은 뺐습니다. 대신 5명 모두가 말한 '종결 상태가 전달되지 않는다'를 핵심 문제로 삼았습니다.", en: "Replaced 30 minutes with a range, dropped the email claim, and made 'closure status never reaches the other team', raised by all five, the core problem." }
      },
      {
        tag: "USERS (MY PART)", title: { ko: "사용자 인터뷰", en: "Users" },
        line: { ko: "QA 관리자, QC 시험 담당자, 생산 담당자 등 페르소나 5명과 인터뷰 질문지를 설계했습니다.\n페르소나는 AI로 만든 가상 인물이었기 때문에 10월 26일 QC 3년차 현직자 1명을 직접 만나 같은 내용을 확인했고, 답은 대부분 페르소나와 같았습니다.", en: "Designed five personas, including the QA manager, QC analyst and production lead, plus the interview guide.\nSince the personas were AI-generated, I met a QC analyst with three years' experience in person on Oct 26 to check. Most answers matched." },
        key: { ko: "5명 모두 다른 부서에 묻고 기다림", en: "5 of 5 wait on other teams for status" },
        stuck: { ko: "5명 모두 기록 공유표나 통합 대장을 만들어 본 적이 있었지만, 그중 3명은 상대 부서가 입력하지 않아 실패했습니다.", en: "All five had tried a shared tracker, and three gave up because the other team never filled it in." },
        fix: { ko: "따로 입력하는 대장을 하나 더 만드는 대신, 업무를 처리하면 기록과 승인 이력이 저절로 쌓이는 구조를 요구사항으로 정했습니다.", en: "Instead of another tracker, the requirement became: records and approvals pile up automatically as people do their work." }
      },
      {
        tag: "SCOPE", title: { ko: "범위와 규칙", en: "Scope and rules" },
        line: { ko: "무엇을 만들지보다 만들지 않을 것을 먼저 정했습니다. 규격을 벗어난 로트를 버튼 하나로 내보내는 예외 출하(특채), 국가출하승인이나 법적 적합 판단, 전자서명 등 10가지는 범위 밖에 두었습니다.\n시험값을 저장하면 시험 규격과 사내 관리기준에 따라 정상, 관리기준 이탈, 규격 이탈로 판정하고 규격 이탈일 때만 로트를 자동 보류합니다. 열린 이슈가 1건이라도 있으면 출하 가능을 고를 수 없고, 막힌 이유가 문장으로 나옵니다.", en: "Decided what not to build before what to build: a one-click concession release for out-of-spec lots, judging national lot release or legal compliance, and e-signatures are among the ten items left out.\nEach saved result is checked against the spec and in-house alert limits as normal, alert deviation or spec deviation, and only spec deviations put the lot on hold. With even one open issue, 'releasable' cannot be selected and the screen explains why." },
        key: { ko: "하지 않을 것 10가지", en: "10 things left out" },
        stuck: { ko: "평가 승인과 출하 승인이 섞이면 규격을 벗어난 로트가 특채처럼 나갈 수 있고, 관리기준 이탈까지 보류하면 출하가 불필요하게 막힙니다.", en: "Mixing assessment approval with release approval could let an out-of-spec lot slip out as a concession, while holding every alert deviation would block release for no reason." },
        fix: { ko: "평가 승인은 출하 승인이 아니라고 화면에 밝히고, 보류는 규격 이탈에만 걸었습니다. 관리기준 이탈은 이슈를 열어 영향만 검토하게 나눴습니다.", en: "The screen states that assessment approval is not release approval, and only spec deviations trigger a hold; alert deviations open an issue for review." }
      },
      {
        tag: "DESIGN (MY PART)", title: { ko: "화면 설계", en: "Design" },
        line: { ko: "화면 개편을 맡아 '지금 할 일'이 가장 먼저 보이는 홈과, 판단에 필요한 비교를 한 화면에서 끝내는 로트 상세 화면을 만들었습니다.\n밝고 투명한 디자인 방향(클리니컬 글라스)을 정하고 결정 이유를 디자인 문서와 참고 사례 문서로 남겼습니다.", en: "Led the UI redesign: a home screen that shows today's tasks first, and a lot page that puts every comparison needed for a decision on one screen.\nChose a bright clinical glass look and documented the reasons in DESIGN.md and a references file." },
        key: { ko: "사용자 피드백 3건 반영", en: "3 pieces of user feedback applied" },
        stuck: { ko: "홈을 본 사용자가 '뭘 해야 하는지 모르겠다'고 했고, 단계 표시 '1/5'는 날짜로 읽혔습니다.", en: "Users said the home screen didn't tell them what to do, and a '1/5' step label read like a date." },
        fix: { ko: "홈을 할 일, 현황, 도식 순서로 다시 짜고, 단계는 '전체 5단계 중 4번째'로 풀어 썼습니다.", en: "Rebuilt the home as tasks, status, then charts, and spelled steps out as '4th of 5 steps'." }
      },
      {
        tag: "PUBLIC DATA", title: { ko: "공개 자료 연결", en: "Public data" },
        line: { ko: "식약처 공공데이터 4종(허가정보, 회수와 판매중지, GMP 적합판정, 국가출하승인)을 서버가 대신 불러와 출처와 조회 시각을 붙여 보여 줍니다. 인증키는 서버에만 둡니다.\n결과가 0건인 경우와 불러오지 못한 경우를 따로 표시해 조회 실패가 '문제없음'으로 읽히지 않게 했습니다.", en: "A server function calls four MFDS datasets (approvals, recalls, GMP certificates, national lot release) and shows each with its source and lookup time. Keys stay on the server.\n'No results' and 'could not load' are shown differently, so a failed lookup never reads as 'all clear'." },
        key: { ko: "최신 335건 기준 조회 범위 표시", en: "Shows the range: latest 335 records" },
        stuck: { ko: "국가출하승인 자료는 오래된 순으로 쌓여 있어서 최근 승인을 찾으려 하자 2016~2019년 자료만 나올 뻔했습니다.", en: "The national lot release API lists oldest first, so a search for recent approvals nearly returned only 2016~2019 records." },
        fix: { ko: "전체 건수를 먼저 받고 끝 4쪽(최신)을 읽게 고쳤습니다. 화면에는 전체 6,035건 중 최근 335건에서 찾았다고 적습니다.", en: "Now fetches the total count first and reads the last four pages. The screen says it searched the latest 335 of 6,035 records." }
      },
      {
        tag: "ALERTS AND AI", title: { ko: "알림과 AI 도우미", en: "Alerts and AI" },
        line: { ko: "조치 요청이 승인되거나 담당자가 배정되면 슬랙 개인 메시지가 가고, 평일 아침 8시에는 QA, QC, 생산 직무별 브리핑이 갑니다.\nAI 도우미(Claude API)는 로그인한 사람이 볼 수 있는 근거 자료만 읽고 답합니다. 답 속 숫자와 링크, 승인 표현은 코드가 다시 검사하고 판정과 승인은 사람만 합니다.", en: "Slack DMs go out when a request is approved or assigned, and every weekday at 8 a.m. QA, QC and production each get a briefing.\nThe AI assistant (Claude API) answers only from evidence tables the user is allowed to see. Code re-checks every number, link and approval phrase, and only people judge or approve." },
        key: { ko: "실제 호출 10번, 범위 이탈 0번", en: "10 live tests, stayed in scope every time" },
        stuck: { ko: "AI 도우미가 지금 열린 화면 안에서만 답한다는 지적을 받았습니다.", en: "Testers pointed out that the assistant only answered about the screen currently open." },
        fix: { ko: "앱 전체를 조회하는 질문 13가지를 준비했습니다. 읽기 전용으로 두고 대화는 저장하지 않으며 한 사람당 하루 30번까지만 쓰게 했습니다.", en: "Added 13 app-wide lookups. It stays read-only, keeps no chat history and allows 30 questions per person per day." }
      },
      {
        tag: "CHECK", title: { ko: "검증", en: "Checks" },
        line: { ko: "자동 시험 536개를 모두 통과했고, 사람이 직접 확인하는 QA 25건도 팀이 나눠 수행해 모두 통과했습니다. 아침 브리핑은 10월 30일 08시 01분에 실제로 도착하는 것까지 확인했습니다.\n공공데이터는 실제 인증키로 호출해 응답을 확인했고, 인터뷰로 고친 숫자는 문서에 근거를 남겼습니다.", en: "All 536 automated tests pass, and the team split 25 manual QA checks and passed every one. The automatic morning briefing was confirmed to arrive at 08:01 on Oct 30.\nOpen data calls were checked with real keys, and the numbers corrected after the interviews keep their evidence in the docs." },
        key: { ko: "직접 QA 25건 모두 통과", en: "25 of 25 manual checks" },
        stuck: { ko: "시험 자료에 없던 실제 응답의 날짜 형식 때문에 배포된 화면에서 GMP 칸이 비어 보였습니다.", en: "A date format missing from the test data left the GMP panel looking empty on the live app." },
        fix: { ko: "실제 응답으로 원인을 찾고, 시험 2개를 먼저 써서 실패를 확인한 뒤 고쳤습니다.", en: "Found the cause in the real response, wrote two failing tests first, then fixed it." }
      }
    ],
    role: {
      ko: [
        "문제 정의 문서를 썼습니다. 처음 가설이 인터뷰와 어긋난 부분을 찾아 고치고, '서명 직전에야 열린 이탈 건을 안다'로 문제를 좁혔습니다.",
        "페르소나 5명과 인터뷰 질문지를 설계하고, 실제 QC 현직자 1명을 대면으로 인터뷰해 방향을 확인했습니다.",
        "화면 UI 개편(홈, 로트 상세, 공정 단계, 품질 이슈)과 디자인 문서를 맡았고, 발표 자료 디자인과 발표자 안내문을 만들었습니다. DB, 서버, AI 기능 구현은 팀원이 맡았습니다."
      ],
      en: [
        "Wrote the problem definition, caught where the first hypothesis disagreed with the interviews, and narrowed the problem to 'open deviations surface only at signing'.",
        "Designed five personas and the interview guide, and checked the direction in a face-to-face interview with a working QC analyst.",
        "Owned the UI redesign (home, lot, process and issue screens) and the design doc, and designed the presentation deck and presenter notes. Teammates built the database, server and AI features."
      ]
    },
    stack: ["HTML", "CSS", "JavaScript", "Node.js", "Supabase (PostgreSQL)", "Google 로그인", "Vercel", "식약처 공공데이터", "Slack API", "Claude API", "Claude Code"],
    note: { ko: "회사, 로트, 시험값, 규격은 모두 교육용 가상 자료이고, 공공데이터만 실제 자료입니다. 확인 시간 단축 효과는 측정하지 않았습니다.\n로그인 기록이 남는 앱이라 주소는 공개하지 않습니다. 화면의 사람 이름은 가렸습니다.", en: "All companies, lots, results and specs are fictional training data; only the MFDS open data is real. Time savings were not measured.\nThe app records logins, so the address is not public. Names on screen are blurred." },
    images: [
      { src: "assets/pharmaflow/home.jpg", alt: { ko: "홈: 지금 할 일, 보류 로트, 로트 상태, 주별 품질 이슈, 이탈이 많은 항목, 최근 회수 공지", en: "Home: today's tasks, held lots, lot status, weekly issues, top deviations, recent recalls" } },
      { src: "assets/pharmaflow/lot.jpg", alt: { ko: "로트 상세(IFV-2610-001): 출하 판단 근거와 시험값마다 규격, 관리기준, 같은 제품 로트 비교", en: "Lot page: release checklist and each result against spec, alert limits and sibling lots" } },
      { src: "assets/pharmaflow/process.jpg", alt: { ko: "공정 단계: 세포 배양에서 포장까지 단계별 담당과 공정 조건", en: "Process steps: cell culture to packaging, with owners and conditions" } },
      { src: "assets/pharmaflow/issue.jpg", alt: { ko: "품질 이슈: 이탈, 영향 평가, 조치, 종결, 내부 출하 검토 5단계와 품질 영향 평가", en: "Quality issue: five stages from deviation to release review, with the impact assessment" } },
      { src: "assets/pharmaflow/regulatory.jpg", alt: { ko: "공개 규제 현황: 식약처 GMP 유효기간과 국가출하승인 이력", en: "Public regulatory status: MFDS GMP validity and national lot release history" } },
      { src: "assets/pharmaflow/assistant.jpg", alt: { ko: "AI 도우미: 오른쪽 아래 버튼으로 여는 대화 창과 예시 질문", en: "AI assistant: chat panel opened from the bottom-right button, with sample questions" } }
    ]
  },
  // 프로젝트3: 팀 저장소(비공개) README와 PR 기준. 공개 체험(/demo)은 가상 데이터라 링크한다. 화면은 2026-11-24 공개 체험에서 찍음. 팀원 실명은 쓰지 않는다.
  {
    "id": "voicefishing",
    "short": {
      "ko": "안물어(魚) 피싱 대응 훈련",
      "en": "An-mul-eo anti-phishing drills"
    },
    "name": {
      "ko": "안물어(魚)",
      "en": "An-mul-eo (Don't Get Hooked)"
    },
    "desc": {
      "ko": "새 사기 수법을 내 상황에 맞춘 연습 문자로 불시에 보내는 청년 피싱 대응 훈련 서비스",
      "en": "Unannounced practice texts, matched to each young adult's situation, for the latest scam tactics"
    },
    "bullets": {
      "ko": [
        "문제를 다시 정의: 청년은 의심이 없어서가 아니라 **확인하려는 순간 위조된 경로**에 속는다",
        "새 수법 수집은 자동, **사람 승인 2번**을 거쳐야 연습 연락이 나감",
        "판정 규칙, **정답 샘플 147건** 채점, 위키 챗봇(고정 질문 **5/5**)을 맡음"
      ],
      "en": [
        "Reframed: young adults are fooled not for lack of doubt but by **forged ways to check**",
        "Tactics are collected automatically; practice messages go out only after **two human approvals**",
        "I owned the judgement rules, scoring on **147 labeled samples**, and the wiki chatbot (**5/5** fixed questions)"
      ]
    },
    "tags": [
      "Next.js",
      "Supabase",
      "Vercel",
      "Claude API",
      {
        "ko": "공공기관 공지 수집",
        "en": "Public notice collection"
      },
      {
        "ko": "판정 규칙과 채점",
        "en": "Judgement and scoring"
      }
    ],
    "plan": [
      {
        "mine": false,
        "t": {
          "ko": "확인하려는 순간에 속는다",
          "en": "Fooled while checking"
        },
        "d": {
          "ko": "기관 사칭형 피해자 중 20~30대 52.5%",
          "en": "52.5% of impersonation victims in their 20s~30s"
        },
        "line": {
          "ko": "기관 사칭형 피해자 중 20~30대가 52.5%였습니다(경찰청, 팀 리서치). 수칙은 알아도 **확인에 쓰는 번호, 검색 결과, 고객센터가 이미 위조돼** 있었습니다.",
          "en": "52.5% of impersonation victims were in their 20s~30s (police data, team research). People knew the rules, but the numbers, search results and help lines they checked were already forged."
        },
        "key": {
          "ko": "20~30대 52.5%",
          "en": "52.5% aged 20~39"
        },
        "img": "assets/voicefishing/why.jpg"
      },
      {
        "mine": false,
        "t": {
          "ko": "읽는 교육 대신 겪는 연습",
          "en": "Practice over reading"
        },
        "d": {
          "ko": "읽기만 하는 교육은 몇 주면 효과가 사라짐",
          "en": "Read-only training fades in weeks"
        },
        "line": {
          "ko": "읽기만 하는 예방 교육은 **몇 주면 효과가 사라집니다**. 사기는 미끼, 재촉, 위조된 확인 경로, 노리는 것 순서로 오기 때문에 수법마다 이 순서를 해부도로 보여 주기로 했습니다.",
          "en": "Read-only prevention fades within weeks. Scams arrive as bait, pressure, a forged way to check, then the target, so each tactic is shown as that anatomy."
        },
        "key": {
          "ko": "수법 해부도 4단계",
          "en": "4-step tactic anatomy"
        },
        "img": "assets/voicefishing/anatomy.jpg"
      },
      {
        "mine": true,
        "t": {
          "ko": "무반응이 최고점",
          "en": "No reaction scores best"
        },
        "d": {
          "ko": "3초 안에 나가면 판정 안 함, 같은 사람에게 48시간 간격",
          "en": "Under 3 seconds isn't judged; 48 hours between drills"
        },
        "line": {
          "ko": "가입해 두면 새 수법이 내 상황에 맞춘 연습 문자와 메일로 불시에 옵니다. 판정 규칙을 기획 문서에 맞춰 **아무 반응이 없으면 최고점**, 3초 안에 나가면 실수로 보고 판정하지 않게, 같은 사람에게는 48시간 간격을 두게 했습니다.",
          "en": "Once signed up, new tactics arrive as unannounced practice texts and emails. I aligned the rules to the spec: no reaction scores best, exits under 3 seconds are not judged, and drills to one person are 48 hours apart."
        },
        "key": {
          "ko": "무반응 = 최고점, 48시간 간격",
          "en": "No reaction = best, 48h apart"
        },
        "img": "assets/voicefishing/radar.jpg"
      },
      {
        "mine": false,
        "t": {
          "ko": "수집은 자동, 승인은 사람",
          "en": "Auto collection, human approval"
        },
        "d": {
          "ko": "출처 5곳 정기 수집, 수법과 문구를 사람이 두 번 승인",
          "en": "5 sources collected; tactic and copy approved twice"
        },
        "line": {
          "ko": "금감원, KISA 등 출처 5곳을 정기적으로 모읍니다. 새 수법은 운영자가 근거를 보고 승인하고, AI가 만든 문구와 가짜 사이트도 **한 번 더 승인해야** 연습 연락이 나갑니다.",
          "en": "Five sources, including the FSS and KISA, are collected on a schedule. An operator approves each new tactic on its evidence, and the AI-drafted copy and decoy site need a second approval before anything is sent."
        },
        "key": {
          "ko": "사람 승인 2번",
          "en": "Two human approvals"
        },
        "img": "assets/voicefishing/flow.jpg"
      },
      {
        "mine": true,
        "t": {
          "ko": "채점과 챗봇으로 확인",
          "en": "Checked by scoring and chatbot"
        },
        "d": {
          "ko": "정답 샘플 147건 채점, 위키 챗봇 5/5",
          "en": "147 labeled samples; wiki chatbot 5/5"
        },
        "line": {
          "ko": "수법 관련 글인지 가려내는 판정을 정답 샘플 147건으로 채점해 **놓친 것 0건, 잘못 울린 것 5건**을 확인했고, 그래서 사람 승인을 남겼습니다. 팀 위키 챗봇은 찾은 문서만 근거로 답하게 고쳐 고정 질문 5개를 모두 맞히게 했습니다(처음 3개).",
          "en": "Scoring the relevance check on 147 labeled samples gave 0 misses and 5 false alarms, which is why human approval stays. The team wiki chatbot now answers only from retrieved pages and gets all 5 fixed questions right (3 at first)."
        },
        "key": {
          "ko": "놓침 0건, 챗봇 5/5",
          "en": "0 misses, chatbot 5/5"
        },
        "img": "assets/voicefishing/chat.jpg"
      }
    ],
    "split": {
      "mine": {
        "ko": "판정 규칙, 정답 샘플 채점, 위키 챗봇, 연습 문자 문구, QA 기록, 소개와 이용자 화면 디자인 개편",
        "en": "Judgement rules, sample scoring, wiki chatbot, practice SMS copy, QA logs, intro and user screen redesign"
      },
      "team": {
        "ko": "팀원 3명이 앱 뼈대와 DB, 발송 연결, 데이터 수집, 발표 자료와 AI 인터뷰를 나눠 맡음",
        "en": "Three teammates split the app skeleton and database, message delivery, data collection, slides and AI interviews"
      },
      "ai": {
        "ko": "Claude Code로 구현과 검토, 서버 AI(Claude API)가 수법 카드와 연습 문구 초안을 쓰고 사람이 승인",
        "en": "Claude Code for build and review; the server AI (Claude API) drafts tactic cards and practice copy, and people approve"
      }
    },
    "period": "2026.11.17 ~ 11.23",
    "team": {
      "ko": "LS Jump Up 세 번째 팀 프로젝트 (4인), 11월 23일 해커톤 제출",
      "en": "LS Jump Up third team project (4 people), submitted Nov 23"
    },
    "headline": {
      "ko": "새 사기 수법을 내 상황에 맞춘 연습 연락으로\n먼저 겪어 보게 하는 피싱 대응 훈련",
      "en": "Phishing drills that let young adults meet\nnew scam tactics first, matched to their situation"
    },
    "title": {
      "ko": "안물어(魚): 청년을 위한 상황 맞춤 피싱 모의 훈련 서비스",
      "en": "An-mul-eo: situation-matched phishing drills for young adults"
    },
    "oneLiner": {
      "ko": "청년은 사기 연락을 의심하지 않아서가 아니라, 진위를 확인하려는 순간 위조된 번호와 사이트에 속습니다.\n안물어는 새 수법이 나오면 이용자 상황에 맞춘 연습 문자와 메일을 불시에 보내고, 누르는 순간 바로 해설합니다.",
      "en": "Young adults are not fooled for lack of doubt; they are fooled at the moment they try to check, by forged numbers and sites.\nWhen a new tactic appears, An-mul-eo sends a situation-matched practice text or email unannounced and explains it the moment it is tapped."
    },
    "stats": [
      {
        "v": {
          "ko": "147건",
          "en": "147"
        },
        "l": {
          "ko": "정답 샘플로 판정 채점\n놓침 0건",
          "en": "labeled samples scored\n0 misses"
        }
      },
      {
        "v": {
          "ko": "5/5",
          "en": "5/5"
        },
        "l": {
          "ko": "위키 챗봇 고정 질문\n처음 3/5에서 개선",
          "en": "wiki chatbot fixed questions\nup from 3/5"
        }
      },
      {
        "v": {
          "ko": "87개",
          "en": "87"
        },
        "l": {
          "ko": "팀 점검표 항목 모두 통과\n근거와 한계 함께 기록",
          "en": "team checklist items passed\nwith evidence and limits"
        }
      }
    ],
    "role": {
      "ko": [
        "판정 규칙을 기획 문서에 맞췄습니다. 무반응은 최고점, 3초 안에 나가면 판정하지 않음, 48시간 간격, 로그인 없이 개인 링크로 기록.",
        "수법 관련 판정을 정답 샘플 147건으로 채점하고, 팀 위키 챗봇을 찾은 문서만 근거로 답하게 만들었습니다.",
        "소개 화면과 이용자 화면(나의 바다 레이더, 모의 배송과 청약 사이트) 디자인을 개편했습니다. 앱 뼈대, 수집, 발송 연결은 팀원이 맡았습니다."
      ],
      "en": [
        "Aligned the judgement rules to the spec: no reaction scores best, sub-3-second exits are not judged, 48 hours between drills, and login-free per-link records.",
        "Scored the relevance check on 147 labeled samples and built the team wiki chatbot to answer only from retrieved pages.",
        "Redesigned the intro and user screens (the radar home, decoy delivery and housing sites). Teammates built the app skeleton, collection and delivery."
      ]
    },
    "stack": [
      "Next.js",
      "TypeScript",
      "Supabase",
      "Vercel",
      "Claude API",
      "Resend",
      "GitHub Actions",
      "Claude Code"
    ],
    "note": {
      "ko": "사람 인터뷰는 0건이고(AI 인터뷰 4건), 훈련이 실제 행동을 바꾸는지는 아직 검증하지 않았습니다. 체험 화면은 가상 데이터로만 움직입니다.",
      "en": "There were no human interviews (four AI interviews), and the effect on real behaviour is not yet verified. The demo runs on virtual data only."
    },
    "demo": {
      "external": true,
      "link": "https://voicefishing.vercel.app",
      "label": {
        "ko": "서비스 바로 가기",
        "en": "Open the service"
      },
      "title": {
        "ko": "안물어 공개 체험",
        "en": "An-mul-eo demo"
      }
    },
    "images": [
      {"src": "assets/voicefishing/why.jpg", "alt": {"ko": "소개 화면 '왜 필요한가요': 20~30대 52.5%, 읽는 교육의 한계", "en": "Intro: why it matters"}},
      {"src": "assets/voicefishing/anatomy.jpg", "alt": {"ko": "수법 해부도: 미끼, 재촉, 위조된 확인 경로, 노리는 것", "en": "Tactic anatomy: bait, pressure, forged check, target"}},
      {"src": "assets/voicefishing/radar.jpg", "alt": {"ko": "이용자 홈 레이더: 내 상황과 맞는 신종 수법", "en": "User radar: new tactics matching my situation"}},
      {"src": "assets/voicefishing/flow.jpg", "alt": {"ko": "운영 흐름: 수집부터 판정까지 7단계, 사람 승인 2번", "en": "Operations flow: 7 steps with two human approvals"}},
      {
        "src": "assets/voicefishing/sea.jpg",
        "alt": {
          "ko": "이용자 홈 '나의 바다': 내 상황과 맞는 신종 수법 레이더",
          "en": "User home: radar of new tactics matching my situation"
        }
      },
      {
        "src": "assets/voicefishing/admin.jpg",
        "alt": {
          "ko": "운영 현황: 레이더 수집부터 판정까지 7단계와 사람 승인 자리",
          "en": "Operations: seven steps from collection to judgement, with human approvals"
        }
      },
      {
        "src": "assets/voicefishing/library.jpg",
        "alt": {
          "ko": "수법 모음집: 미끼, 재촉, 위조된 확인 경로, 노리는 것의 그림자 해부도",
          "en": "Tactic library: anatomy of bait, pressure, forged check path and target"
        }
      },
      {
        "src": "assets/voicefishing/intro.jpg",
        "alt": {
          "ko": "소개 화면: 수면 아래를 먼저 보는 연습",
          "en": "Intro: practice seeing beneath the surface"
        }
      },
      {
        "src": "assets/voicefishing/chat.jpg",
        "alt": {
          "ko": "팀 위키 챗봇: 찾은 문서만 근거로 답하고 출처를 붙임",
          "en": "Team wiki chatbot: answers only from retrieved pages, with sources"
        }
      }
    ]
  }
];
