// 메인 프로젝트: 사람이 직접 관리하는 파일. 매일 자동 수집은 이 파일을 건드리지 않습니다.
// 사이드 프로젝트(projects.js, 서가)보다 크게, 프로젝트 섹션 맨 위에 나옵니다.
// 화면 구성(디자인 캔버스 B안): 제목, 대시보드(바로 실행), 단계 다이얼(steps 5개, 숫자에 마우스를 올리면 전환), 역할과 기술
// 문장 규칙: 문장 중간에 중간점이나 대시를 쓰지 않는다. 줄바꿈은 \n.
// 근거: 윤가은_포트폴리오(260930).doc, 팀 저장소
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
    // 두 번째 메인 프로젝트. 근거: 팀 저장소의 문제정의.md, interview.md, PRD.md(9절 하지 않을 것), DESIGN.md, README.md와 커밋 기록
    // 이 사이트는 기획과 문제 해결 능력을 보여 주는 곳이라 개발 과정보다 문제 정의, 가설 검증, 범위 결정을 앞에 둔다.
    // 저장소는 팀원 소유의 비공개 저장소라 링크하지 않는다. 배포 주소도 로그인 기록이 남아 공개하지 않는다.
    // 화면 사진은 배포된 앱에 본인 계정으로 로그인해 찍었고, 사람 이름은 흐리게 가렸다.
    // 2026-10-29 main(1725fe1) 기준으로 갱신. 인터뷰 5명은 AI가 설정한 가상 페르소나라서 숫자를 현장 근거처럼 쓰지 않는다.
    id: "pharmaflow",
    period: "2026.10.22 ~ 10.29",
    team: { ko: "LS Jump Up 두 번째 팀 프로젝트 (3인), 10월 29일 발표", en: "LS Jump Up second team project (3 people), presented Oct 29" },
    headline: { ko: "흩어진 품질 기록을\n로트 하나로 모으는 백신 QA 앱", en: "A vaccine QA app that pulls\nscattered quality records into one lot" },
    title: { ko: "PharmaFlow Bio: 백신 제조 로트의 품질 이탈과 내부 출하 검토 관리", en: "PharmaFlow Bio: quality deviations and internal release review for vaccine lots" },
    oneLiner: {
      ko: "백신 QA 담당자가 출하 서명 직전에 시스템, 엑셀, 폴더를 오가며 기록을 맞추는 문제를 정의하고, 인터뷰로 처음 가설을 고쳐 가며 범위와 규칙을 정한 뒤 웹 앱으로 만들었습니다.\n저는 문제 정의, 인터뷰 설계, 화면 설계를 맡았고 구현은 팀원이 맡았습니다.",
      en: "I defined the problem of vaccine QA staff juggling systems, spreadsheets and folders just before a release signature, corrected my first hypotheses through interviews, set the scope and rules, and the team built it as a web app.\nI owned the problem definition, the interview design and the screen design; teammates owned the implementation."
    },
    stats: [
      { v: { ko: "3개", en: "3" }, l: { ko: "인터뷰로 고친 처음 가설\n30분, 메일 누락, 인허가 문의", en: "first hypotheses corrected by interviews\n30 minutes, email gaps, regulatory asks" } },
      { v: { ko: "10가지", en: "10" }, l: { ko: "하지 않기로 한 것\n특채 버튼, 국가출하승인 판정 등", en: "things we decided not to build\nlike a one click concession" } },
      { v: { ko: "59개", en: "59" }, l: { ko: "정보 구조(IA)로 설계한 화면\n그중 MVP 44개", en: "screens planned in the IA\n44 of them in the MVP" } },
      { v: { ko: "24/25건", en: "24/25" }, l: { ko: "팀 직접 QA 통과\n자동 시험은 521개 통과", en: "manual QA checks passed\n521 automated tests pass" } }
    ],
    steps: [
      {
        tag: "PROBLEM (MY PART)", title: { ko: "문제 정의", en: "Problem" },
        line: { ko: "출하 서명 직전에 열린 이탈 건과 시험 기록, 생산 기록이 시스템, 엑셀, 폴더에 나뉘어 있다는 문제를 SCQA와 네 칸 표로 정의했습니다.\n확인할 것은 하나로 좁혔습니다. QA 관리자가 로트 상세와 품질 이슈 상세만 보고 1분 안에 내부 출하 검토를 할 수 있는가.", en: "I framed the problem with SCQA and a four box table: just before a release signature, open deviations and test and production records sit across systems, spreadsheets and folders.\nI narrowed what to test to one question: can a QA manager make the internal release call from the lot page and the issue page alone, in a minute?" },
        key: { ko: "확인할 것을 하나로 좁힘", en: "One question to test" },
        stuck: { ko: "처음 주제는 일반 의약품 배치의 두 단계 판정이어서 백신 현장의 판단을 담기 어려웠습니다.", en: "The first version covered generic drug batches with a two-level check, which missed how vaccine QA decides." },
        fix: { ko: "팀과 함께 주제를 백신 로트로 바꾸고, 세 단계 판정과 품질 영향 평가를 문제에 넣었습니다.", en: "Together with the team we moved to vaccine lots and brought a three-level check and quality impact assessments into the problem." }
      },
      {
        tag: "USERS (MY PART)", title: { ko: "인터뷰와 가설 정정", en: "Interviews" },
        line: { ko: "페르소나 5명과 인터뷰 질문지를 설계하고 답변을 패턴으로 묶어 처음 가설을 검증했습니다. 페르소나는 AI가 설정한 가상 인물이라 숫자는 현장 근거가 아니라 연습용 시나리오로 구분해 적었습니다.\n5명 모두가 종결 상태가 전달되지 않아 물으러 다닌다고 했고, 4명은 서명 직전에 여러 곳을 오간다고 했습니다.", en: "I designed five personas and the interview guide, then grouped the answers into patterns to test my first hypotheses. The personas are AI generated, so I marked the numbers as practice scenarios, not field evidence.\nAll five said they chase status because closures are not passed on, and four said they hop between several places before signing." },
        key: { ko: "5명 인터뷰, 가설 3개 정정", en: "5 interviews, 3 hypotheses fixed" },
        stuck: { ko: "처음 가설인 로트 확인에 약 30분, 이탈이 메일과 전화로 전달돼 누락된다는 말은 인터뷰에서 그대로 확인되지 않았습니다.", en: "My first hypotheses, about 30 minutes per lot and deviations lost in email and calls, were not confirmed as written." },
        fix: { ko: "30분은 환경에 따라 15분에서 3~4시간으로 고치고, 근거가 0명이던 메일 누락은 문제 문장에서 뺐습니다. 새로 나온 상태 전달 문제를 넣고, 공유표를 바꿔도 상대가 입력하지 않아 실패한 경험은 도입 위험으로 적었습니다.", en: "Corrected 30 minutes to a range of 15 minutes to 3 or 4 hours, dropped the email gap that nobody backed, added the status passing problem, and logged failed shared sheets as an adoption risk." }
      },
      {
        tag: "SCOPE", title: { ko: "범위와 규칙", en: "Scope" },
        line: { ko: "무엇을 만들지보다 만들지 않을 것을 먼저 정했습니다. 규격 이탈 로트를 버튼 하나로 특채 출하하는 기능, 국가출하승인이나 법적 적합 판단, 전자서명은 만들지 않는 10가지에 넣었습니다.\n시험값은 시험 규격과 사내 관리기준으로 정상, 관리기준 이탈, 규격 이탈을 판정하고, 규격 이탈만 자동 보류합니다. 평가 승인은 출하 승인이 아니라고 화면에 밝혔습니다.", en: "I decided what not to build before what to build: a one click concession for out of spec lots, judging national release or legal compliance, and e-signatures are among the ten left out.\nResults are checked against the spec and the in-house alert limits as normal, alert deviation or spec deviation, and only spec deviations auto-hold. The screen states that assessment approval is not release approval." },
        key: { ko: "하지 않을 것 10가지", en: "10 things left out" },
        stuck: { ko: "평가 승인과 출하 승인이 섞이면 규격을 벗어난 로트가 특채처럼 나갈 수 있고, 관리기준 이탈까지 보류하면 출하가 불필요하게 막힙니다.", en: "Mixing assessment approval with release approval could let an out of spec lot slip out as a concession, while holding every alert deviation would block release for no reason." },
        fix: { ko: "열린 이슈가 있으면 출하를 고를 수 없게 하고, 보류는 규격 이탈에만 걸었습니다. 관리기준 이탈은 이슈를 열어 영향만 검토하게 나눴습니다.", en: "Release is blocked while an issue is open, and the hold applies to spec deviations only; alert deviations open an issue for review." }
      },
      {
        tag: "DESIGN (MY PART)", title: { ko: "화면 설계", en: "Design" },
        line: { ko: "화면 UI 개편을 맡아 지금 할 일이 가장 먼저 보이는 홈과, 판단에 필요한 비교를 한 화면에서 하는 로트 상세를 만들었습니다.\n홈에는 로트 상태, 주별 품질 이슈, 이탈이 많은 항목, 회수 공지 도식을 넣었습니다. 각진 모서리의 밝고 투명한 클리니컬 글라스 디자인을 정하고, 결정 이유를 디자인 문서로 남겼습니다.", en: "Led the UI redesign: a home screen that shows today's tasks first, and a lot page that puts every comparison needed for a decision on one screen.\nThe home adds charts for lot status, weekly issues, top deviations and recalls. Chose a bright clinical glass look with squared corners and documented the reasons in a design doc." },
        key: { ko: "홈 도식 4종과 디자인 문서", en: "4 home charts and a design doc" },
        stuck: { ko: "사용자가 홈을 보고 뭘 해야 하는지 모르겠다고 했고, 단계 표시 1/5는 날짜로 읽혔습니다.", en: "Users said the home screen didn't tell them what to do, and a '1/5' step label read like a date." },
        fix: { ko: "홈을 할 일, 현황, 도식 순서로 다시 짜고, 단계는 전체 5단계 중 4번째로 풀어 썼습니다.", en: "Rebuilt the home as tasks, status, then charts, and spelled steps out as '4th of 5 steps'." }
      },
      {
        tag: "PUBLIC DATA", title: { ko: "공개 자료 연결", en: "Public data" },
        line: { ko: "식약처 공공데이터로 백신 허가정보, 회수와 판매중지, GMP 유효기간, 국가출하승인 이력을 출처와 조회 시각과 함께 보여 줍니다.\n불러오지 못하면 그 칸만 안내하고, 이 기기에서 마지막으로 정상 조회한 결과를 보여 줍니다.", en: "Shows vaccine approvals, recalls, GMP validity and national lot release history from MFDS open data, each with its source and lookup time.\nIf a call fails, only that panel says so and shows the last good result stored on the device." },
        key: { ko: "식약처 공공데이터 4종", en: "4 MFDS open datasets" },
        stuck: { ko: "국가출하승인 이력이 조회 결과의 앞쪽에 나오지 않아 최신 승인을 놓쳤습니다.", en: "National lot release results did not list the latest approvals first, so recent ones were missed." },
        fix: { ko: "최신 쪽부터 찾고, 어느 범위까지 조회했는지 화면에 함께 적었습니다.", en: "Now searches from the newest pages and shows the range it checked." }
      },
      {
        tag: "AI ASSIST", title: { ko: "AI 도우미와 아침 브리핑", en: "AI helper" },
        line: { ko: "화면 오른쪽 아래 AI 도우미는 앱 안내서, 화면의 근거 표, 미리 정한 조회 결과 안에서만 답하고, 숫자와 링크와 승인 표현은 코드가 다시 검사합니다. 읽기 전용이고 대화는 저장하지 않습니다.\n평일 오전 8시에 직무별로 오늘 볼 것을 슬랙 개인 메시지로 보내는 아침 브리핑도 있습니다.", en: "The chat helper at the bottom right answers only from the app guide, the evidence tables on screen and fixed query results, and code re-checks every number, link and approval phrase. It is read only and stores no conversations.\nA morning briefing also sends each role a Slack direct message with what to look at, on weekdays at 8 am." },
        key: { ko: "AI가 판정하지 않는 선", en: "AI never decides" },
        stuck: { ko: "도우미가 지금 보는 화면에서만 찾아서 최근 문제가 자주 생긴 제품을 물으면 답하지 못했습니다.", en: "The helper only looked at the current screen, so it could not answer which product has had the most problems lately." },
        fix: { ko: "앱 전체 기록을 읽는 조회 13가지를 미리 정해 두고, Claude가 그중에서 고르면 서버가 로그인한 사람의 권한으로 다시 검사해 읽게 했습니다.", en: "Thirteen fixed read only queries across the whole app were prepared. Claude picks among them and the server re-checks and runs the pick with the signed in user's permissions." }
      },
      {
        tag: "CHECK", title: { ko: "검증", en: "Checks" },
        line: { ko: "자동 시험 521개를 모두 통과시키고, 사람이 직접 확인하는 QA 25건을 팀이 나눠 수행했습니다. 24건이 통과했고 아침 브리핑 자동 발송 1건은 10월 30일 아침에 확인할 예정입니다.\n공공데이터는 실제 키로 호출해 응답을 확인했고, 인터뷰로 고친 숫자는 문서에 근거를 남겼습니다.", en: "All 521 automated tests pass, and the team split 25 manual QA checks. 24 passed; the automatic morning briefing is still to be confirmed on the morning of Oct 30.\nOpen data calls were checked with a real key, and the numbers I corrected from interviews keep their evidence in the docs." },
        key: { ko: "직접 QA 25건 중 24건 통과", en: "24 of 25 manual checks" },
        stuck: { ko: "시험 자료에 없던 실제 응답의 날짜 형식 때문에 배포된 화면에서 GMP 칸이 비어 보였습니다.", en: "A date format that the test data did not have left the GMP panel looking empty on the live app." },
        fix: { ko: "실제 응답으로 원인을 찾고, 시험 2개를 먼저 써서 실패를 확인한 뒤 고쳤습니다.", en: "Found the cause from the real response, wrote two failing tests first, then fixed it." }
      }
    ],
    role: {
      ko: [
        "문제 정의를 직접 썼습니다. SCQA와 네 칸 표로 문제를 잡고, 확인할 것을 하나로 좁혔습니다.",
        "페르소나 5명과 인터뷰 질문지를 설계하고, 답변을 패턴으로 정리해 처음 가설 3개를 고치는 근거를 만들었습니다.",
        "화면 UI 개편을 맡아 클리니컬 글라스 디자인, 홈 도식, 한 화면 비교를 만들고 디자인 결정을 문서로 남겼습니다.",
        "발표 자료를 문제, 해결, 증거 순서의 피치 형식으로 다시 디자인하고 발표자 안내문을 썼습니다."
      ],
      en: [
        "Wrote the problem definition: framed it with SCQA and a four box table and narrowed it to one question to test.",
        "Designed five personas and the interview guide, and grouped the answers into patterns that corrected three first hypotheses.",
        "Led the UI redesign, building the clinical glass look, home charts and single-screen comparisons, and documented the design decisions.",
        "Redesigned the presentation deck as a problem, solution, evidence pitch and wrote the presenter guide."
      ]
    },
    stack: ["HTML", "CSS", "JavaScript", "Supabase", "Google 로그인", "Vercel", "식약처 공공데이터", "Slack 알림", "Claude API", "Claude Code"],
    note: { ko: "회사, 로트, 시험값, 규격은 모두 교육용 가상 자료이고, 허가정보와 회수 등 공공데이터만 실제 자료입니다. 인터뷰한 5명도 AI가 설정한 가상 페르소나입니다.\n로그인 기록이 남는 앱이라 주소는 공개하지 않습니다. 화면의 사람 이름은 흐리게 가렸습니다.", en: "All companies, lots, results and specs are fictional training data; only the MFDS open data is real. The five interviewees are also AI generated personas.\nThe app records logins, so the address is not public. Names on screen are blurred." },
    images: [
      { src: "assets/pharmaflow/home.jpg", alt: { ko: "홈: 지금 할 일, 보류 로트, 로트 상태, 주별 품질 이슈, 이탈이 많은 항목, 최근 회수 공지", en: "Home: today's tasks, held lots, lot status, weekly issues, top deviations, recent recalls" } },
      { src: "assets/pharmaflow/lot.jpg", alt: { ko: "로트 상세: 출하 판단 근거와 시험값마다 규격, 관리기준, 같은 제품 로트 비교", en: "Lot page: release checklist and each result against spec, alert limits and sibling lots" } },
      { src: "assets/pharmaflow/process.jpg", alt: { ko: "공정 단계: 세포 배양, 정제, 원액 여과, 충전, 포장 단계별 담당과 공정 조건", en: "Process steps: cell culture to packaging with owners and conditions" } },
      { src: "assets/pharmaflow/issue.jpg", alt: { ko: "품질 이슈: 이탈, 영향 평가, 조치, 종결, 내부 출하 검토 5단계와 품질 영향 평가", en: "Quality issue: five stages from deviation to release review, with the impact assessment" } },
      { src: "assets/pharmaflow/regulatory.jpg", alt: { ko: "공개 규제 현황: 식약처 GMP 유효기간과 국가출하승인 이력", en: "Public regulatory status: MFDS GMP validity and national lot release history" } },
      { src: "assets/pharmaflow/assistant.jpg", alt: { ko: "AI 도우미: 오른쪽 아래 버튼으로 여는 대화 창과 예시 질문 세 개", en: "AI helper: the chat window opened from the bottom right button, with three example questions" } }
    ]
  }
];
