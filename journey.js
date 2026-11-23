// LS Jump Up 여정(프로젝트3 개인 과제 10절): 바이브코딩 기초부터 프로젝트3까지 "내가 달라진 과정".
// 단계마다 배운 것, 달라진 점, 증거, 내가 한 일 / 팀 / Claude를 나눠 적는다. 팀의 일을 혼자 한 것처럼 쓰지 않는다.
// 근거: LS 시간표(xlsx), main.js(프로젝트 1~2), notes.js(노트 날짜와 결과). 공개 사이트에는 PR 번호만 쓰고 링크는 넣지 않는다.
// 프로젝트3은 다른 컴퓨터에서 진행 중이라 pending으로 두고, 확정되면 그쪽에서 채운다.
window.SITE_JOURNEY = {
  stages: [
    {
      id: "basics", period: "2026.08 ~ 09",
      title: { ko: "데이터 기초", en: "Data basics" },
      learned: { ko: "파이썬, 데이터 전처리와 탐색, 머신러닝과 예지보전, 시계열, Dash 웹", en: "Python, preprocessing and EDA, machine learning and predictive maintenance, time series, Dash" },
      changed: { ko: "엑셀과 VBA로 하던 정리를 **코드로 직접** 다루기 시작", en: "Moved from Excel and VBA to **handling data in code**" },
      proof: { ko: ["프로젝트1의 재료가 됨"], en: ["Fed straight into Project 1"] }
    },
    {
      id: "p1", period: "2026.09.14 ~ 09.30", project: "predictive-maintenance",
      title: { ko: "프로젝트1 부품 발주 시점", en: "Project 1 Order timing" },
      learned: { ko: "센서 데이터로 고장을 예측하고, 결과를 비용과 행동으로 바꾸는 법", en: "Predicting failures from sensors and turning results into cost and action" },
      changed: { ko: "너무 좋은 숫자를 **먼저 의심**: AUC 0.98에서 정답 누출을 걷어내 **0.88~0.94**", en: "**Doubting numbers that look too good**: removed leakage from 0.98 to **0.88~0.94**" },
      proof: { ko: ["AUC 0.88~0.94", "합치기 전 테스트 47건", "발표 화면"], en: ["AUC 0.88~0.94", "47 tests before merge", "Demo screens"] },
      mine: { ko: "조장. 전처리, 부품별 고장 예측 모델, 대시보드 화면 통합 (기여도 35%)", en: "Team lead. Preprocessing, per-part models, dashboard integration (35%)" },
      team: { ko: "팀원 2명이 나머지 화면과 분석", en: "Two teammates: other screens and analysis" },
      ai: { ko: "Claude Code가 화면 기능과 배치를 구현, 결과는 테스트로 확인", en: "Claude Code built screens and layout; checked by tests" }
    },
    {
      id: "vibe", period: "2026.10.05 ~ 10.21",
      title: { ko: "바이브 코딩과 AI 작업 규칙", en: "Vibe coding and AI rules" },
      learned: { ko: "바이브 코딩 기초, 웹앱 풀사이클 개발", en: "Vibe coding basics, full-cycle web apps" },
      changed: { ko: "바로 만들지 않고 **규칙과 문서를 먼저**: 문제 정의, IA, PRD, spec 순서를 스킬로 고정", en: "**Rules and docs first**: problem, IA, PRD and spec fixed as skills" },
      proof: { ko: ["스킬 17개, 코드 시험 21개 통과", "해외 시장조사 툴킷 시험 53개 통과", "기획과 AI 설계 노트"], en: ["17 skills, 21 code tests pass", "Market toolkit: 53 site tests pass", "Planning and AI notes"] },
      mine: { ko: "무엇을 왜 만들지, 규칙과 순서, 결과 판정", en: "What and why, rules and order, final judgment" },
      team: { ko: "개인 작업", en: "Solo work" },
      ai: { ko: "Claude가 초안, 코드, 자체 점검. 채용담당자 역할로 비평", en: "Claude drafted, coded, self-checked, and critiqued as a recruiter" },
      notes: ["note-harness", "note-market-toolkit", "note-workflow-app"]
    },
    {
      id: "p2", period: "2026.10.22 ~ 10.30", project: "pharmaflow",
      title: { ko: "프로젝트2 PharmaFlow Bio", en: "Project 2 PharmaFlow Bio" },
      learned: { ko: "인터뷰로 문제를 좁히고, 팀이 PR과 리뷰로 함께 만드는 법", en: "Narrowing a problem through interviews; building as a team with PRs and reviews" },
      changed: { ko: "기능보다 **문제를 다시 정의**: '흩어진 기록'이 아니라 '전달되지 않는 종결 상태'", en: "**Redefined the problem** first: not scattered records but closure status that never arrives" },
      proof: { ko: ["PR #11 인터뷰 설계", "PR #22 화면 개편", "리뷰 PR #25, #27", "자동 시험 536개, 팀 QA 25건 통과"], en: ["PR #11 interview design", "PR #22 UI redesign", "Reviews on PR #25, #27", "536 tests, 25 QA checks pass"] },
      mine: { ko: "문제 정의, 인터뷰 설계와 현직자 인터뷰, 화면 개편, 발표 자료 디자인", en: "Problem definition, interviews, UI redesign, slides" },
      team: { ko: "팀원 2명이 DB, 서버, AI 기능과 시험 보고서", en: "Two teammates: DB, server, AI features, test report" },
      ai: { ko: "Claude Code가 기획 문서와 구현. 앱 안 AI는 읽기 전용, 숫자는 코드가 재검사", en: "Claude Code for docs and build; in-app AI is read-only, code re-checks numbers" }
    },
    {
      id: "auto", period: "2026.11.02 ~ 11.13",
      title: { ko: "업무 자동화와 이 포트폴리오", en: "Automation and this portfolio" },
      learned: { ko: "n8n과 Claude Code로 업무 자동화", en: "Work automation with n8n and Claude Code" },
      changed: { ko: "AI 결과를 **AI에게 다시 비평**시키고 사람이 고침: 과장 표현을 걷어내고 지원 산업별로 사이트를 나눔", en: "**Had AI critique AI output**, then fixed it myself: removed overstatement and split the site by industry" },
      proof: { ko: ["매일 자동 수집과 초안", "이 사이트와 이력서 페이지"], en: ["Daily auto-collection and drafts", "This site and the resume page"] },
      mine: { ko: "방향, 문구 사실 확인, 디자인 시안 선택", en: "Direction, fact-checking copy, picking design options" },
      team: { ko: "개인 작업", en: "Solo work" },
      ai: { ko: "Claude가 수집, 초안, 화면 구현, 채용담당자 비평", en: "Claude collected, drafted, built and critiqued" },
      notes: ["note-auto-collect", "note-recruiter"]
    },
    {
      id: "p3", period: "2026.11.17 ~ 11.23", project: "voicefishing",
      title: { ko: "프로젝트3 안물어(魚)", en: "Project 3 An-mul-eo" },
      learned: { ko: "실시간 공공 데이터 수집, 사건 감지와 사람 승인, 위키와 챗봇, 4인 팀의 PR과 리뷰", en: "Live public data, incident detection with human approval, wiki and chatbot, PRs and reviews in a team of 4" },
      changed: { ko: "코드를 고치기 전에 **채점부터**: 정답 샘플 147건으로 놓침 0건, 잘못 울림 5건을 확인하고 **사람 승인을 남김**", en: "**Scoring before fixing**: 147 labeled samples showed 0 misses and 5 false alarms, so **human approval stayed**" },
      proof: { ko: ["PR #31 위키 챗봇과 채점", "PR #41 판정 규칙", "PR #71, #75 화면 개편", "리뷰 PR #14, #25, #35, #36", "챗봇 고정 질문 5/5"], en: ["PR #31 chatbot and scoring", "PR #41 judgement rules", "PR #71, #75 UI redesign", "Reviews on PR #14, #25, #35, #36", "Chatbot 5/5"] },
      mine: { ko: "판정 규칙, 채점, 위키 챗봇, 문자 문구, QA 기록, 화면 개편", en: "Judgement rules, scoring, wiki chatbot, SMS copy, QA logs, UI redesign" },
      team: { ko: "팀원 3명이 앱 뼈대와 DB, 발송, 데이터 수집, 발표와 AI 인터뷰", en: "Three teammates: skeleton and DB, delivery, collection, slides and AI interviews" },
      ai: { ko: "Claude Code가 구현과 검토, 서버 AI가 문구 초안, 승인은 사람", en: "Claude Code built and reviewed; server AI drafts copy; people approve" }
    }
  ],
  next: {
    ko: "다음에는 가상 페르소나보다 **실제 사용자 인터뷰**를 먼저 늘리고, 감지가 틀린 사례를 정답 샘플에 쌓아 채점부터 돌려 보겠습니다.",
    en: "Next, I will start with **more real user interviews** than personas, and keep wrong cases in the answer set so scoring runs first."
  }
};
