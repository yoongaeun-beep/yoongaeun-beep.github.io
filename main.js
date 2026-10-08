// 메인 프로젝트 — 사람이 직접 관리하는 파일. 매일 자동 수집은 이 파일을 건드리지 않습니다.
// 사이드 프로젝트(projects.js, 서가)보다 크게, 프로젝트 섹션 맨 위에 나옵니다.
// 근거: github.com/jgi0117/2team_project (README, src/, data/processed/model_metrics.csv, model_comparison.csv, 커밋 기록)
window.SITE_MAIN = [
  {
    id: "predictive-maintenance",
    period: "2026.09",
    team: { ko: "LS Jump Up 2팀 · 조장", en: "LS Jump Up Team 2 · team lead" },
    title: { ko: "설비 고장 예측 기반 정비·발주 의사결정 지원 시스템", en: "Failure prediction for maintenance and parts-ordering decisions" },
    oneLiner: {
      ko: "고장이 날지 맞히는 데서 멈추지 않고, '지금 발주해야 부품을 제때 받을 수 있는가'까지 답하는 예지보전 대시보드입니다.",
      en: "A predictive-maintenance dashboard that goes past 'will it fail?' to answer 'do we need to order parts now to have them in time?'"
    },
    stats: [
      { v: { ko: "87.6만", en: "876k" }, l: { ko: "센서 데이터 (설비 100대, 1년)", en: "sensor records (100 machines, 1 year)" } },
      { v: { ko: "36개", en: "36" }, l: { ko: "예측 모델 (부품 4 × 예측 기간 9)", en: "models (4 parts × 9 horizons)" } },
      { v: { ko: "0.88–0.95", en: "0.88–0.95" }, l: { ko: "AUC · 채택 부품 3개, 결정 기간 기준", en: "AUC · 3 adopted parts at decision horizon" } },
      { v: { ko: "4.2–6.5배", en: "4.2–6.5×" }, l: { ko: "상위 10% 위험군 적중 (Lift)", en: "top-10% lift" } }
    ],
    problem: {
      ko: "정비·자재 담당자에게 어려운 것은 고장 예측 자체보다 '언제 부품을 발주해야 정비에 맞출 수 있는가'였습니다. 부품마다 조달 기간이 7일에서 35일까지 달라, 같은 위험 점수라도 대응 시점이 달라야 했습니다.",
      en: "For maintenance and materials staff, the hard part was less predicting failure than knowing when to order parts in time. Lead times range from 7 to 35 days, so the same risk score needs different timing per part."
    },
    approach: {
      ko: [
        "부품별 예측 기간을 '조달 기간 + 정비 준비 기간'(8·16·24·42일)으로 맞추고, 발주 마감일을 역산하도록 설계",
        "센서 4종의 기간별 통계, 에러 빈도, 교체 후 경과일로 피처를 만들고 5개 모델을 비교. 정확도가 비슷한 랜덤포레스트 대신 학습이 2.5배 빠른 LightGBM 채택",
        "미래 값이 섞이는 누수(결측 뒤채움)를 제거하고, 설비 ID 피처를 빼서 '고장 잘 나는 설비'를 외우는 대신 '언제' 고장 나는지를 학습하게 함",
        "예측력이 낮은 부품(AUC 0.62)은 모델을 억지로 쓰지 않고 안전재고로 관리하도록 결정"
      ],
      en: [
        "Set each part's horizon to lead time + preparation time (8, 16, 24, 42 days) and back-calculate the order deadline",
        "Built features from rolling sensor stats, error counts and days since replacement; compared 5 models and chose LightGBM over a similarly accurate random forest for 2.5× faster retraining",
        "Removed future-value leakage (backfilling) and dropped machine-ID features so the model learns when, not which machine",
        "For the part the model couldn't predict well (AUC 0.62), chose safety stock instead of forcing a model"
      ]
    },
    result: {
      ko: [
        "Dash 대시보드: 위험이 가장 많이 오른 설비 Top 3, 발주 마감 달력, 부품별 위험과 최근 72시간 센서 그래프, 발주 지연일별 비용 시나리오, 설비별 위험 히트맵, 로컬 LLM 한 줄 요약",
        "채택 3개 부품에서 단순 규칙(교체 후 경과일) 대비 AUC 0.75–0.80 → 0.88–0.95"
      ],
      en: [
        "Dash dashboard: top-3 rising-risk machines, order-deadline calendar, per-part risk with 72-hour sensor charts, cost scenarios by order delay, risk heatmap, one-line local-LLM summary",
        "For the 3 adopted parts, AUC rose from 0.75–0.80 (days-since-replacement rule) to 0.88–0.95"
      ]
    },
    role: {
      ko: [
        "조장, 고장 예측 모델 담당",
        "미래값 누수 수정, 5개 모델 비교, 위험 상승 시점 계산 보정과 상태 분류(정상·관찰·주의·즉시)",
        "대시보드 UI 리디자인: 설비 도면 화면, 발주 화면 신설, 발주 비용 곡선 검토"
      ],
      en: [
        "Team lead; owned the failure prediction model",
        "Fixed leakage, ran the 5-model comparison, corrected risk-rise timing and added status levels",
        "Redesigned the dashboard UI: equipment-drawing view, new ordering screen, cost-curve review"
      ]
    },
    stack: ["Python", "pandas", "scikit-learn", "LightGBM", "PyTorch (GRU)", "Isolation Forest", "Dash", "Plotly", "MySQL", "Qwen3-1.7B"],
    links: [
      { label: { ko: "GitHub 저장소", en: "GitHub repository" }, href: "https://github.com/jgi0117/2team_project" }
    ],
    images: []
  }
];
