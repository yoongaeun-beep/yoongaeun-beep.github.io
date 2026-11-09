// 메인 프로젝트: 사람이 직접 관리하는 파일. 매일 자동 수집은 이 파일을 건드리지 않습니다.
// 사이드 프로젝트(projects.js, 서가)보다 크게, 프로젝트 섹션 맨 위에 나옵니다.
// 화면 구성(디자인 캔버스 B안): 제목, 대시보드(바로 실행), 단계 다이얼(steps 5개, 숫자에 마우스를 올리면 전환), 역할과 기술
// 문장 규칙: 문장 중간에 중간점이나 대시를 쓰지 않는다. 줄바꿈은 \n.
// 근거: 윤가은_포트폴리오(260930).doc, 팀 저장소
window.SITE_MAIN = [
  {
    id: "predictive-maintenance",
    short: { ko: "설비 정비, 발주 대시보드", en: "Maintenance and ordering dashboard" },
    period: "2026.09.14 ~ 09.30",
    team: { ko: "LS Jump Up 2팀 (3인), 조장, 기여도 35%", en: "LS Jump Up Team 2 (3 people), team lead, 35% contribution" },
    headline: { ko: "고장 시점과 총비용을 함께 따져\n최적의 발주 시점을 제안하는 정비 대시보드", en: "A maintenance dashboard that weighs failure timing\nagainst total cost to recommend the best order date" },
    title: { ko: "센서 데이터 기반 설비 고장 예측 및 정비, 발주 의사결정 지원 시스템", en: "Sensor-based failure prediction and maintenance/ordering decision support" },
    oneLiner: {
      ko: "부품은 너무 일찍 사면 보관비가 들고, 늦게 사면 긴급 작업비와 설비가 멈춘 날의 손실이 붙습니다.\n센서 데이터로 부품이 언제 고장 날지 예측하고, 발주일마다 이 비용을 합산해 총비용이 최소가 되는 시점을 찾습니다. 결과는 '고장 확률 0.7'이 아니라 'D-8, 재고 없음, 오늘 발주'처럼 바로 움직일 수 있는 말로 보여 줍니다.",
      en: "Buy a part too early and you pay to store it; too late and you pay for emergency work and every day the machine stands idle.\nThe dashboard predicts when each part will fail from sensor data, adds up these costs for every possible order date, and finds the one with the lowest total. It says 'D-8, no stock, order today' instead of 'failure probability 0.7'."
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
        line: { ko: "후보 5개를 같은 조건으로 비교해 LightGBM을 골랐습니다.\n랜덤포레스트와 성능 차이는 0.004였지만 학습이 2.5배 빨랐습니다. 부품과 기간별로 여러 번 다시 학습해야 하는 구조라 속도를 택했습니다. 갑자기 생기는 센서 이상은 Isolation Forest로 보완해 고장 약 19.6시간 전에 신호를 잡습니다.", en: "Compared 5 models under the same conditions and chose LightGBM.\nIt was within 0.004 AUC of random forest but 2.5× faster to retrain across parts and horizons. Isolation Forest covers sudden anomalies, flagging them about 19.6 hours before failure." },
        key: { ko: "AUC 0.727 → 0.88~0.94", en: "AUC 0.727 → 0.88~0.94" },
        stuck: { ko: "comp2는 AUC 0.58로 기존 규칙(0.597)보다도 낮았습니다.", en: "comp2 scored 0.58, below the old rule (0.597)." },
        fix: { ko: "억지로 쓰지 않고 채택에서 뺐다고 명시했습니다. 화면에는 예측 대신 안전재고 안내를 넣었습니다.", en: "Excluded it explicitly and showed safety-stock guidance instead of a prediction." }
      },
      {
        tag: "COST", title: { ko: "발주 시점과 비용", en: "Order timing and cost" },
        line: { ko: "부품별 조달과 준비 기간(8일, 16일, 24일)으로 D-day와 발주 마감을 거꾸로 계산하고, 한정된 재고를 위험도 순으로 배정했습니다.\n발주를 오늘부터 하루씩 미룰 때마다 구매비, 보관비, 긴급 작업비, 설비 정지 손실을 더해 총비용 곡선을 그리고, 비용이 최소가 되는 시점을 오늘, 1주 뒤, 2주 뒤 발주안과 비교해 보여 줍니다. 단가는 가상 운영 데이터입니다.", en: "Back-calculated D-day and order deadlines from each part's lead time (8, 16, 24 days) and allocated limited stock by risk.\nFor every day an order is delayed, the dashboard adds purchase, storage, emergency work and downtime costs into one curve, and compares the lowest-cost date with ordering today, in 1 week or in 2 weeks. Unit costs are simulated." },
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
      { src: "assets/main/dashboard-main.png", alt: { ko: "대시보드 메인 화면: AI 한 줄 요약, 경고 KPI, To-Do 달력, 위험 TOP5, 재고와 위험 교차표", en: "Dashboard home: AI summary, KPIs, to-do calendar, top-5 risk, stock and risk table" } }
    ]
  },
  {
    // 두 번째 메인 프로젝트. 근거: PharmaFlow_포트폴리오_작성본.docx(2026-11-09), 팀 발표 자료(발표/PharmaFlow-발표.html), 본인 인터뷰(2026-10-29)
    // 저장소는 팀원 소유의 비공개 저장소라 링크하지 않는다. 배포 주소도 로그인 기록이 남아 공개하지 않는다.
    // 화면 사진의 사람 이름은 흐리게 가렸다. 팀원 이름은 쓰지 않는다.
    id: "pharmaflow",
    short: { ko: "PharmaFlow Bio 백신 QA", en: "PharmaFlow Bio vaccine QA" },
    period: "2026.10.22 ~ 10.30",
    team: { ko: "LS Jump Up 두 번째 팀 프로젝트 (3인), 기획과 화면 설계 담당, 10월 29일 발표", en: "LS Jump Up second team project (3 people), planning and UI design, presented Oct 29" },
    headline: { ko: "출하 전 곳곳에 흩어져 있던 품질 기록을\n하나의 흐름으로 통합한 백신 QA 시스템", en: "A vaccine QA system that unifies scattered\npre-release quality records into one flow" },
    title: { ko: "PharmaFlow Bio: 백신 제조 로트의 품질 이탈 추적과 내부 출하 검토 지원 웹 앱", en: "PharmaFlow Bio: tracking quality deviations and supporting internal release review for vaccine lots" },
    oneLiner: {
      ko: "백신 QA 담당자는 로트(한 번에 만든 제품 묶음)를 내보내기 전, 시스템과 엑셀, 메일에 흩어진 시험 기록과 이탈 건을 하나씩 맞춰 봅니다. 그러다 끝나지 않은 이슈를 서명 직전에야 알기도 합니다.\nPharmaFlow Bio는 이 기록을 로트 하나에 모아 시험값 저장부터 이슈 종결, 내부 출하 검토까지 한 흐름으로 보여 줍니다. 열린 이슈가 있으면 출하를 고를 수 없고, 승인 이력은 자동으로 쌓입니다.",
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
        line: { ko: "QA 담당자는 출하 서명 직전에 열린 이탈 건, 시험 기록, 생산 기록이 시스템, 엑셀, 폴더에 나뉘어 있어 여러 곳을 오가며 상태를 맞춥니다.\n가상 페르소나 5명 인터뷰에서 로트 한 건 확인에 15분에서 3~4시간이 들었고, 3명은 열린 이탈 건을 서명 직전에야 안 적이 있었습니다. 이 문제를 SCQA와 네 칸 표로 정리했습니다.", en: "Right before signing a release, QA reconciles open deviations, test records and production records spread across systems, spreadsheets and folders.\nIn interviews with five virtual personas, checking one lot took 15 minutes to 3~4 hours, and three had learned of an open deviation only at signing. I framed this with SCQA and a four-box table." },
        key: { ko: "서명 직전에야 안 경험 5명 중 3명", en: "3 of 5 found issues only at signing" },
        stuck: { ko: "처음 가설은 '확인에 약 30분, 이탈이 메일로 전달되다 빠진다'였는데, 인터뷰에서 메일 누락을 말한 사람은 0명이었습니다.", en: "The first hypothesis was '30 minutes per lot, deviations lost in email', but no one in the interviews mentioned lost email." },
        fix: { ko: "30분은 환경별 범위로 고치고 근거 없는 메일 누락은 뺐습니다. 대신 5명 모두 말한 '종결 상태가 전달되지 않는다'를 핵심 문제로 삼았습니다.", en: "Replaced 30 minutes with a range, dropped the email claim, and made 'closure status never reaches the other team', raised by all five, the core problem." }
      },
      {
        tag: "USERS (MY PART)", title: { ko: "사용자 인터뷰", en: "Users" },
        line: { ko: "QA 관리자, QC 시험 담당자, 생산 담당자 등 페르소나 5명과 인터뷰 질문지를 설계했습니다.\n페르소나는 AI로 만든 가상 인물이라, 10월 26일 실제 QC 3년차 현직자 1명을 대면으로 만나 같은 내용을 확인했습니다. 답은 대부분 페르소나와 같았습니다.", en: "Designed five personas, including the QA manager, QC analyst and production lead, plus the interview guide.\nSince the personas were AI-generated, I met a QC analyst with three years' experience in person on Oct 26 to check. Most answers matched." },
        key: { ko: "5명 모두 다른 부서에 묻고 기다림", en: "5 of 5 wait on other teams for status" },
        stuck: { ko: "기록 공유표나 통합 대장을 만들어 본 사람이 5명 모두였지만, 그중 3명은 상대가 입력하지 않아 실패했습니다.", en: "All five had tried a shared tracker, and three gave up because the other team never filled it in." },
        fix: { ko: "따로 입력하는 대장을 또 만들지 않고, 업무를 처리하면 기록과 승인 이력이 저절로 쌓이는 구조를 요구사항으로 정했습니다.", en: "Instead of another tracker, the requirement became: records and approvals pile up automatically as people do their work." }
      },
      {
        tag: "SCOPE", title: { ko: "범위와 규칙", en: "Scope and rules" },
        line: { ko: "무엇을 만들지보다 만들지 않을 것을 먼저 정했습니다. 규격 이탈 로트를 버튼 하나로 내보내는 특채 출하, 국가출하승인이나 법적 적합 판단, 전자서명 등 10가지를 범위 밖에 두었습니다.\n시험값을 저장하면 시험 규격과 사내 관리기준으로 정상, 관리기준 이탈, 규격 이탈을 판정하고, 규격 이탈만 로트를 자동 보류합니다. 열린 이슈가 1건이라도 있으면 출하 가능을 고를 수 없고, 막힌 이유가 문장으로 나옵니다.", en: "Decided what not to build before what to build: a one-click concession release for out-of-spec lots, judging national lot release or legal compliance, and e-signatures are among the ten items left out.\nEach saved result is checked against the spec and in-house alert limits as normal, alert deviation or spec deviation, and only spec deviations put the lot on hold. With even one open issue, 'releasable' cannot be selected and the screen explains why." },
        key: { ko: "하지 않을 것 10가지", en: "10 things left out" },
        stuck: { ko: "평가 승인과 출하 승인이 섞이면 규격을 벗어난 로트가 특채처럼 나갈 수 있고, 관리기준 이탈까지 보류하면 출하가 불필요하게 막힙니다.", en: "Mixing assessment approval with release approval could let an out-of-spec lot slip out as a concession, while holding every alert deviation would block release for no reason." },
        fix: { ko: "평가 승인은 출하 승인이 아니라고 화면에 밝히고, 보류는 규격 이탈에만 걸었습니다. 관리기준 이탈은 이슈를 열어 영향만 검토하게 나눴습니다.", en: "The screen states that assessment approval is not release approval, and only spec deviations trigger a hold; alert deviations open an issue for review." }
      },
      {
        tag: "DESIGN (MY PART)", title: { ko: "화면 설계", en: "Design" },
        line: { ko: "화면 UI 개편을 맡아 '지금 할 일'이 가장 먼저 보이는 홈과, 판단에 필요한 비교를 한 화면에서 하는 로트 상세를 만들었습니다.\n밝고 투명한 클리니컬 글라스 디자인을 정하고, 결정 이유를 디자인 문서(DESIGN.md)와 참고 사례 문서로 남겼습니다.", en: "Led the UI redesign: a home screen that shows today's tasks first, and a lot page that puts every comparison needed for a decision on one screen.\nChose a bright clinical glass look and documented the reasons in DESIGN.md and a references file." },
        key: { ko: "사용자 피드백 3건 반영", en: "3 pieces of user feedback applied" },
        stuck: { ko: "홈을 본 사용자가 '뭘 해야 하는지 모르겠다'고 했고, 단계 표시 '1/5'는 날짜로 읽혔습니다.", en: "Users said the home screen didn't tell them what to do, and a '1/5' step label read like a date." },
        fix: { ko: "홈을 할 일, 현황, 도식 순서로 다시 짜고, 단계는 '전체 5단계 중 4번째'로 풀어 썼습니다.", en: "Rebuilt the home as tasks, status, then charts, and spelled steps out as '4th of 5 steps'." }
      },
      {
        tag: "PUBLIC DATA", title: { ko: "공개 자료 연결", en: "Public data" },
        line: { ko: "식약처 공공데이터 4종(허가정보, 회수와 판매중지, GMP 적합판정, 국가출하승인)을 서버 함수가 대신 불러와 출처와 조회 시각을 붙여 보여 줍니다. 인증키는 서버에만 둡니다.\n결과가 0건인 경우와 불러오지 못한 경우를 구분해서, 조회 실패가 '문제없음'으로 보이지 않게 했습니다.", en: "A server function calls four MFDS datasets (approvals, recalls, GMP certificates, national lot release) and shows each with its source and lookup time. Keys stay on the server.\n'No results' and 'could not load' are shown differently, so a failed lookup never reads as 'all clear'." },
        key: { ko: "최신 335건 기준 조회 범위 표시", en: "Shows the range: latest 335 records" },
        stuck: { ko: "국가출하승인 API가 오래된 순으로 쌓여 있어, 최근 승인을 찾는데 2016~2019년 자료만 나올 뻔했습니다.", en: "The national lot release API lists oldest first, so a search for recent approvals nearly returned only 2016~2019 records." },
        fix: { ko: "전체 건수를 먼저 받고 끝 4쪽(최신)을 읽게 고쳤습니다. 화면에는 전체 6,035건 중 최근 335건에서 찾았다고 적습니다.", en: "Now fetches the total count first and reads the last four pages. The screen says it searched the latest 335 of 6,035 records." }
      },
      {
        tag: "ALERTS AND AI", title: { ko: "알림과 AI 도우미", en: "Alerts and AI" },
        line: { ko: "조치 요청이 승인되거나 담당자가 배정되면 슬랙 개인 메시지가 가고, 평일 아침 8시에는 QA, QC, 생산 직무별 브리핑이 갑니다.\nAI 도우미(Claude API)는 로그인한 사람이 볼 수 있는 근거 표만 읽고 답합니다. 답 속 숫자, 링크, 승인 표현은 코드가 다시 검사하고, 판정과 승인은 사람만 합니다.", en: "Slack DMs go out when a request is approved or assigned, and every weekday at 8 a.m. QA, QC and production each get a briefing.\nThe AI assistant (Claude API) answers only from evidence tables the user is allowed to see. Code re-checks every number, link and approval phrase, and only people judge or approve." },
        key: { ko: "실제 호출 10번, 범위 이탈 0번", en: "10 live tests, stayed in scope every time" },
        stuck: { ko: "AI 도우미가 지금 열린 화면 안에서만 답한다는 지적을 받았습니다.", en: "Testers pointed out that the assistant only answered about the screen currently open." },
        fix: { ko: "앱 전체를 조회하는 질문 13가지를 준비했습니다. 읽기 전용이고 대화는 저장하지 않으며, 한 사람이 하루 30번까지만 쓰게 했습니다.", en: "Added 13 app-wide lookups. It stays read-only, keeps no chat history and allows 30 questions per person per day." }
      },
      {
        tag: "CHECK", title: { ko: "검증", en: "Checks" },
        line: { ko: "자동 시험 536개를 모두 통과시키고, 사람이 직접 확인하는 QA 25건을 팀이 나눠 수행해 모두 통과했습니다. 아침 브리핑 자동 발송도 10월 30일 08시 01분에 실제로 도착한 것을 확인했습니다.\n공공데이터는 실제 인증키로 호출해 응답을 확인했고, 인터뷰로 고친 숫자는 문서에 근거를 남겼습니다.", en: "All 536 automated tests pass, and the team split 25 manual QA checks and passed every one. The automatic morning briefing was confirmed to arrive at 08:01 on Oct 30.\nOpen data calls were checked with real keys, and the numbers corrected after the interviews keep their evidence in the docs." },
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
  }
];
