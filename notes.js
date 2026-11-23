// 기획과 AI 설계 노트(무형 결과물). 사이드 프로젝트 서가에 노트 모양으로 꽂히고, 리프레임 스크롤(첫 문제 → 진짜 문제)에도 쓰인다.
// 근거: 대화 기록과 각 폴더의 STATUS, decisions, QA 문서(2026-11-23 조사). 사용자 확인: 스킬 17개 표기, 하네스 틀은 수업 + 본인 방식으로 고침,
// 시장조사 툴킷은 이전 직장 경험에서 출발(업체명, 브랜드명은 쓰지 않음). ed: "bio"면 유관산업 사이트에만.
// 문장 규칙: 중간점과 대시 금지. **핵심**은 하이라이트.
window.SITE_NOTES = [
  {
    id: "note-auto-collect", date: "2026-10-06",
    key: { ko: "게시 전 사람 승인", en: "Human approval before publishing" },
    viz: { type: "flow", gate: 2, cap: { ko: "그래서 정한 흐름", en: "The flow I set" }, steps: { ko: ["새벽 수집", "초안", "내 승인", "게시"], en: ["Nightly collect", "Draft", "My approval", "Publish"] } },
    title: { ko: "자동 수집의 규칙과 멈춤", en: "Rules for auto-collection" },
    sub: { ko: "결과물을 매일 모아 주는 자동화에서 올리면 안 되는 것을 거르고, 필요가 줄자 멈춘 기록", en: "Setting what a daily collector must never publish, then switching it off" },
    first: { ko: "만든 것을 자동으로 모아 올리면 편하다", en: "Auto-publishing everything I build is convenient" },
    real: { ko: "자동화는 올리면 안 되는 것까지 올릴 수 있다", en: "Automation can publish what must never go out" },
    problem: { ko: "채팅과 프로젝트 곳곳의 결과물을 시간 들이지 않고 보여 주고 싶었지만, 자동화가 개인 자료까지 올릴 위험이 있었다", en: "I wanted outputs gathered without effort, but automation risked publishing private material" },
    decided: {
      ko: ["지원서 관련 결과물은 **절대 올리지 않기**, 공개는 이력서 수준까지", "게시는 내가 '올려'라고 한 뒤에만", "필요가 줄자 매일 자동 실행을 **멈춤**(11월 9일)"],
      en: ["Application material is **never** published; disclosure stays at resume level", "Nothing goes live until I say so", "**Stopped** the daily run once it was no longer needed (Nov 9)"]
    },
    ai: { ko: ["매일 새벽 2시 수집과 사이트 초안 작성", "첫 화면 문구 후보를 기준 4개로 채점해 제안"], en: ["Collects at 2 a.m. and drafts site updates", "Scores headline candidates on four criteria"] },
    checked: { ko: ["게시 전 승인, 애매하면 빼고 '빠진 것'에 한 줄만 남김"], en: ["Approval before publishing; anything unclear is left out and noted"] },
    result: { ko: "수집 지침과 판단 기록, 블로그 초안 5편. 이 서가가 이렇게 채워졌다", en: "A collection rulebook, a decision log, 5 blog drafts. This shelf was filled this way" },
    tags: ["Claude Code", { ko: "예약 작업", en: "Scheduled tasks" }, { ko: "개인정보 거르기", en: "Privacy filter" }]
  },
  {
    id: "note-recruiter", date: "2026-10-07",
    key: { ko: "빠진 관점 다시 지정", en: "Reset the missing lens" },
    viz: { type: "flow", gate: 1, cap: { ko: "그래서 정한 흐름", en: "The flow I set" }, steps: { ko: ["AI 비평", "빠진 관점 지적", "다시 비평", "사이트 수정"], en: ["AI critique", "Flag missing lens", "Critique again", "Fix the site"] } },
    title: { ko: "AI에게 채용담당자 역할 맡기기", en: "AI as a tough recruiter" },
    sub: { ko: "처음 보는 사람의 눈으로 AI에게 포트폴리오를 비평시키고, 빠진 관점은 직접 바로잡음", en: "Had AI critique this portfolio as a first-time reader, and corrected what it missed" },
    first: { ko: "만든 것을 잘 정리해 보여 주면 된다", en: "Just show what I built, neatly" },
    real: { ko: "처음 보는 사람은 무엇을 왜 했는지 알 수 없다", en: "A first-time reader can't tell what I did or why" },
    problem: { ko: "내가 지은 이름과 결과 위주 설명으로는 처음 보는 사람이 무엇을 왜 했는지 알 수 없었다", en: "My own names and result-only notes didn't tell a stranger what or why" },
    decided: {
      ko: ["이름은 누구나 알아볼 분류명으로", "결과보다 목적과 과정을 앞에, 단 궁금할 때 열어 보게", "AI 비평에서 기획 역량이 빠지자 **관점을 다시 지정**"],
      en: ["Names became plain categories", "Purpose and process first, details on demand", "When the critique missed planning skills, I **reset its lens**"]
    },
    ai: { ko: ["깐깐한 채용담당자 역할로 사이트 점검과 문구 수정안"], en: ["Reviewed the site as a strict recruiter and proposed edits"] },
    checked: { ko: ["점검을 그대로 받지 않고 빠진 관점(기획, AI 활용)을 지적해 다시 점검"], en: ["Didn't accept the review as is; pointed out missing angles and reran it"] },
    result: { ko: "프로젝트 카드의 기획 흐름과 '내가 한 일' 칸, 그리고 이 노트들", en: "The planning flow and 'Me' rows on project cards, and these notes" },
    tags: [{ ko: "역할 지정", en: "Role prompting" }, { ko: "정보 구조", en: "Information design" }]
  },
  {
    id: "note-docking", date: "2026-10-08", ed: "bio",
    key: { ko: "60% 대 14%", en: "60% vs 14%" },
    viz: { type: "compare", unit: "%", cap: { ko: "같은 결과, 다른 판단", en: "Same data, different call" }, items: [{ l: { ko: "최고 예측 하나", en: "Best pose only" }, v: 60 }, { l: { ko: "예측 5개 중앙값", en: "Median of 5" }, v: 14 }] },
    title: { ko: "AI 예측을 손으로 되짚기", en: "Checking an AI prediction by hand" },
    sub: { ko: "약물이 단백질에 붙는 모양을 AI가 예측한 결과를 얼마나 믿을지 직접 확인", en: "How far to trust an AI docking prediction" },
    first: { ko: "AI가 고른 최고 예측 하나를 보여 주면 된다", en: "Show the AI's single best pose" },
    real: { ko: "최고 예측 하나만 믿으면 틀릴 수 있다", en: "Trusting only the best pose can mislead" },
    problem: { ko: "AI가 내놓은 최고 예측 하나를 그대로 보여 주고 있었는데, 얼마나 믿어도 되는지 알 수 없었다", en: "I showed the AI's top pose as is, without knowing how far to trust it" },
    decided: { ko: ["분석 전에 결과를 먼저 짐작하고 나중에 비교", "'이게 무슨 의미가 있냐'고 따져 해석을 요구"], en: ["Guessed the result before analysis, then compared", "Pushed for what the numbers actually mean"] },
    ai: { ko: ["분석 스크립트와 확인 스크립트 작성"], en: ["Wrote the analysis and check scripts"] },
    checked: { ko: ["원자 사이 거리를 **손으로 계산**(2.43Å)해 스크립트 값과 대조"], en: ["**Calculated by hand** one atom distance (2.43 Å) and matched the script"] },
    result: { ko: "확인 12건 모두 통과. 최고 예측 하나는 60%, 예측 5개 중앙값은 14%라 '이 데이터로 말할 수 없는 것'을 따로 적음", en: "12/12 checks pass. Best pose 60% vs median 14%, so I listed what this data cannot claim" },
    tags: ["Claude Code", { ko: "검증 설계", en: "Verification" }]
  },
  {
    id: "note-problem-lab", date: "2026-10-12",
    key: { ko: "AI는 채점만", en: "AI only grades" },
    viz: { type: "flow", gate: 0, cap: { ko: "역할을 바꾼 흐름", en: "Roles swapped" }, steps: { ko: ["내가 문제 작성", "AI가 6가지 기준으로 채점", "내가 고쳐 씀"], en: ["I write the problem", "AI grades on 6 frameworks", "I rewrite"] } },
    title: { ko: "문제 발굴소", en: "Problem Lab" },
    sub: { ko: "AI가 답을 대신 써 주지 않고, 내가 쓴 문제 정의를 채점하는 연습 도구", en: "A practice tool where AI grades my problem statements instead of writing them" },
    first: { ko: "AI에게 문제 정의를 물으면 된다", en: "Ask AI to define the problem" },
    real: { ko: "AI가 답을 대신 써 버려 내 생각이 자라지 않는다", en: "AI writes the answer, so my own thinking doesn't grow" },
    problem: { ko: "문제 정의를 AI에게 물으면 AI가 답을 써 버려, 내 문제를 뾰족하게 만드는 연습이 되지 않았다", en: "Asking AI meant it wrote the answer, so I never practiced sharpening my own problem" },
    decided: { ko: ["AI 역할을 '답하는 쪽'이 아니라 **'평가하는 쪽'**으로", "수업 도구 6개(5 Whys, 이슈 트리, 가설과 반례, 5 Hows, 피시본, SCQA)를 채점 기준으로"], en: ["Made AI the **grader**, not the answerer", "Used six class frameworks (5 Whys, issue tree, hypothesis and counterexample, 5 Hows, fishbone, SCQA) as the rubric"] },
    ai: { ko: ["로컬 서버 구현, 다른 프로젝트 지침이 섞이지 않게 빈 폴더에서 호출"], en: ["Built a local server that calls AI from an empty folder so other instructions don't leak in"] },
    checked: { ko: ["시험 세션 1건으로 채점 동작 확인"], en: ["Checked grading with one test session"] },
    result: { ko: "동작하는 로컬 시제품(공개하지 않음)", en: "A working local prototype (not published)" },
    tags: ["Claude Code", { ko: "AI 역할 설계", en: "AI role design" }]
  },
  {
    id: "note-market-toolkit", date: "2026-10-19",
    key: { ko: "맞는 가설 1/5", en: "1 of 5 hypotheses fit" },
    viz: { type: "ratio", n: 5, hit: 1, big: { ko: "1/5", en: "1/5" }, cap: { ko: "첫 회차, 우리 상황에 맞는 가설", en: "First round: hypotheses that fit" }, note: { ko: "이후 스킬 4개, 결정 기록 11개, 시험 53개 통과", en: "Then 4 skills, 11 decision records, 53 tests passing" } },
    title: { ko: "해외 시장조사 툴킷", en: "Overseas market research toolkit" },
    sub: { ko: "AI 시장조사가 뻔한 결론으로 끝나지 않게 만든 스킬과 점검 도구", en: "Skills and checks so AI market research doesn't end in generic conclusions" },
    first: { ko: "AI로 시장조사를 빠르게 요약하면 된다", en: "Use AI to summarize market research faster" },
    real: { ko: "결론이 누구나 볼 만큼 뻔하고 우리 상황에 맞지 않는다", en: "The conclusions are generic and don't fit our situation" },
    problem: { ko: "화장품 ODM에서 해외 시장 리포트를 쓰며, AI 조사 결과가 경쟁사도 똑같이 볼 결론으로 끝나는 문제를 겪었다", en: "Writing overseas market reports at a cosmetics ODM, AI research kept landing on conclusions any competitor would reach" },
    decided: {
      ko: ["5 Whys로 원인을 좁혀 '우리 상황에 맞지 않음'을 **가장 심각한 문제**로 고름", "AI 가설을 하나씩 '뻔하다'고 판정하고 결과 형식을 **'지금 뜨는 것, 우리 상황, 접근'** 순으로 다시 정의", "추가 결제 금지, 사이트에서 AI 호출 차단, 기업 데이터는 저장소에 올리지 않기"],
      en: ["Used 5 Whys to pick 'doesn't fit our situation' as **the core problem**", "Judged each AI hypothesis as generic and redefined the output as **what's rising, our situation, our approach**", "No extra spending, no AI calls from the site, no company data in the repo"]
    },
    ai: { ko: ["해결안 3개의 웹 타당성 조사", "스킬, 스크립트, 사이트 구현과 시험 실행"], en: ["Web checks on three solution options", "Built the skills, scripts and site, and ran tests"] },
    checked: { ko: ["트렌드 브리프를 직접 평가해 **'규제 대응 전략' 단계**를 추가", "확인할 수 없는 규제 문장은 원문을 요구"], en: ["Reviewed the trend brief myself and added a **regulatory strategy step**", "Asked for the source text of any regulation claim I couldn't verify"] },
    result: { ko: "첫 회차에 우리 상황에 맞는 가설은 5개 중 1개(20%). 이후 스킬 4개, 결정 기록 11개, 사이트 시험 53개 통과. 실제 사례 시험이 남아 최종 판정은 조건부 통과", en: "First round: 1 of 5 hypotheses fit (20%). Then 4 skills, 11 decision records, 53 site tests passing. Final verdict: conditional pass, real-case test pending" },
    tags: ["Claude Code", { ko: "스킬", en: "Skills" }, "Supabase", "5 Whys"]
  },
  {
    id: "note-harness", date: "2026-10-20",
    key: { ko: "점검 16개 중 14개 통과", en: "14 of 16 checks pass" },
    viz: { type: "flow", gate: 4, cap: { ko: "그래서 정한 일하는 순서", en: "The order I set" }, steps: { ko: ["문제 정의", "IA", "유저 저니", "PRD", "문서마다 사람 승인", "spec", "개발", "QA"], en: ["Problem", "IA", "User journey", "PRD", "Human approval each doc", "spec", "Build", "QA"] } },
    title: { ko: "AI 작업 규칙과 스킬 17개", en: "AI work rules and 17 skills" },
    sub: { ko: "AI가 일하는 순서와 사람이 승인하는 지점을 정한 작업 규칙(하네스)", en: "A harness that sets the order AI works in and where a person must approve" },
    first: { ko: "프로젝트마다 같은 지시를 반복해야 한다", en: "I repeat the same instructions every project" },
    real: { ko: "AI가 지금 무엇을 어디까지 했는지 내가 볼 수 없다", en: "I can't see what the AI has done or how far it got" },
    problem: { ko: "프로젝트마다 같은 지시를 반복했고, 비전공자라 AI가 어디까지 했는지 알 수 없었다", en: "Same instructions every project, and as a non-engineer I couldn't see how far the AI had gone" },
    decided: {
      ko: ["수업에서 배운 작업 순서(문제 정의, IA, 유저 저니, PRD, ERD, spec)를 **내 방식에 맞게 고쳐** 규칙으로 고정", "단계마다 현황판, 사람이 최종 확인할 목록, 질문은 선택지 창으로", "삭제, 외부 전송, 커밋은 항상 먼저 묻는 **승인 규칙**"],
      en: ["Took the class workflow (problem, IA, user journey, PRD, ERD, spec) and **adapted it** into fixed rules", "A status board each step, a human final-check list, questions as multiple choice", "**Approval rules**: always ask before deleting, sending out or committing"]
    },
    ai: { ko: ["설계 원칙과 줄 수 기준의 근거 조사, 출처 기록", "스킬 초안과 점검 스크립트 작성"], en: ["Researched and cited the design principles", "Drafted skills and a checking script"] },
    checked: { ko: ["작은 앱으로 9단계를 끝까지 돌려 보고 **조건부 승인**", "AI가 적용한 디자인이 별로라 원래대로 되돌림"], en: ["Ran a small app through all 9 steps and gave a **conditional approval**", "Rolled back a design the AI applied that I didn't like"] },
    result: { ko: "전역 규칙 1개와 스킬 17개(직접 만든 6, 고쳐 쓴 5, 디자인 6). 시험 운전 자동 점검 16개 중 14개, 코드 시험 21개 통과. 이후 프로젝트가 이 순서로 진행", en: "One global rulebook and 17 skills (6 new, 5 adapted, 6 design). Trial run: 14 of 16 checks, 21 code tests passing. Later projects follow this order" },
    tags: ["Claude Code", "CLAUDE.md", { ko: "스킬", en: "Skills" }]
  },
  {
    id: "note-workflow-app", date: "2026-10-21",
    key: { ko: "인터뷰 4명, 가설 5개 판정", en: "4 interviews, 5 hypotheses" },
    viz: { type: "verdict", cap: { ko: "인터뷰 4명으로 판정한 가설", en: "Hypotheses judged by 4 interviews" }, items: [{ h: "H1", s: "strong" }, { h: "H3", s: "ok" }, { h: "H2", s: "part" }, { h: "H5", s: "part" }, { h: "H4", s: "weak" }] },
    title: { ko: "업무 흐름 앱 가설 검증", en: "Testing a work-flow app idea" },
    sub: { ko: "새 업무를 맡은 직장인의 실수를 줄일 앱, 만들기 전에 인터뷰로 범위를 좁힘", en: "An app to cut mistakes in new jobs, scoped by interviews before building" },
    first: { ko: "새 업무 내용을 정리해 주는 학습 도구가 필요하다", en: "People need a tool that summarizes a new job" },
    real: { ko: "문서에 없는 확인, 승인, 중복 체크 같은 '관문'을 놓친다", en: "They miss unwritten checkpoints: checks, approvals, duplicates" },
    problem: { ko: "새 업무를 맡은 직장인이 업무 순서와 관문을 놓쳐 실수하는데, 문서에는 관문이 적혀 있지 않았다", en: "New hires miss steps and checkpoints that no document lists" },
    decided: { ko: ["앱 도구 선택은 문제 정의와 해법이 정해진 뒤로", "인터뷰 4명을 **직접 진행**", "검증되지 않은 '학습 정리' 기능은 **범위에서 뺌**"], en: ["Tool choice waits until the problem and solution are set", "**Ran 4 interviews myself**", "**Cut** the unvalidated 'learning summary' feature"] },
    ai: { ko: ["비슷한 서비스 6개 조사, 가설 5개와 질문지 작성", "인터뷰 결과를 가설별로 판정"], en: ["Surveyed 6 similar services; drafted 5 hypotheses and the guide", "Scored interview results per hypothesis"] },
    checked: { ko: ["문제 정의와 해법 문서 7개 항목을 모두 확인", "핵심 전제가 약해진 결과도 숨기지 않고 기록"], en: ["Reviewed all 7 problem and solution items", "Kept the result that weakened a key assumption"] },
    result: { ko: "가설 5개 중 1개 강하게 지지, 핵심 전제 1개 약화. 화면 10개, 핵심 여정 4개, 기능 13개로 기획하고 개발 전 단계에서 멈춤", en: "1 of 5 hypotheses strongly supported, 1 key assumption weakened. Planned 10 screens, 4 journeys, 13 features; paused before development" },
    tags: [{ ko: "인터뷰", en: "Interviews" }, { ko: "가설 검증", en: "Hypothesis testing" }, "PRD"]
  }
];
