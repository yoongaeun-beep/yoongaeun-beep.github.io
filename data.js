// 프로필·경력 데이터 (사람이 직접 고치는 파일)
// 공개 범위: 이력서 수준(이름·이메일·학교·기관명 공개, 전화번호·주소·사진 비공개). 상세: pipeline\collector.md
window.SITE_DATA = {
  email: "yoongaeun@gmail.com",
  name: { ko: "윤가은", en: "Gaeun Yoon" },
  // 어떤 사람인지 — 첫 화면 맨 위에 표시 (특정 직무에 묶이지 않게)
  identity: {
    ko: "과학을 이해하는 커뮤니케이터 · 일하는 방식을 바꾸는 사람",
    en: "A communicator who understands science · someone who changes how work gets done"
  },
  // 첫 화면 이름 아래 한 문단: 어떤 일을 해왔는지
  headline: {
    ko: "생명공학을 전공하고 연구실, 제약사, 화장품 연구소를 거치며 복잡한 기술을 읽히는 문서로 바꾸고 연구소와 해외를 잇는 일을 해왔습니다. 지금은 AI로 일하는 방식을 바꾸는 법을 배우고 있습니다.",
    en: "A genetic engineering graduate who moved through research labs, a pharma company and a cosmetics R&D center, turning complex technology into readable documents and connecting the lab with overseas partners. Now learning to change how work gets done with AI."
  },
  // 첫 화면 핵심 성과 3개 (숫자가 먼저 보이게)
  highlights: [
    { v: { ko: "24 → 100+", en: "24 → 100+" }, l: { ko: "연간 해외 방문팀", en: "overseas visiting teams a year" }, s: { ko: "영문 연구소 투어 신설 · 코스맥스", en: "launched English R&D tours · COSMAX" } },
    { v: { ko: "12종", en: "12" }, l: { ko: "백신 판촉 자료 (목표 10종)", en: "vaccine promo pieces (target 10)" }, s: { ko: "총 50여 개 제작·배포 · 사노피", en: "50+ produced in total · Sanofi" } },
    { v: { ko: "AUC 0.88–0.94", en: "AUC 0.88–0.94" }, l: { ko: "설비 고장 예측 모델", en: "failure prediction model" }, s: { ko: "채택 부품 기준 · LS Jump Up 조장", en: "adopted parts · LS Jump Up team lead" } }
  ],
  // 첫 화면 "한눈에 보기" 줄
  glance: [
    { k: { ko: "총 경력", en: "Experience" }, v: { ko: "2년 1개월 + 인턴 7개월", en: "2 yrs 1 mo + 7-mo internship" } },
    { k: { ko: "학력", en: "Education" }, v: { ko: "경희대 유전생명공학과", en: "Kyung Hee Univ., Genetic Engineering" } },
    { k: { ko: "어학", en: "English" }, v: { ko: "TOEIC 975 · OPIc AL", en: "TOEIC 975 · OPIc AL" } },
    { k: { ko: "지금", en: "Now" }, v: { ko: "LS Jump Up AI 과정 (~2026.11)", en: "LS Jump Up AI program (to Nov 2026)" } }
  ],
  role: {
    ko: "R&D 기획 · 글로벌 커뮤니케이션 · AI 바이브코딩",
    en: "R&D planning · Global communication · AI vibe coding"
  },
  thesis: {
    ko: "어려운 기술을 읽히는 문서로 바꿔왔고, 이제는 직접 만들어 보입니다.",
    en: "I turn complex technology into documents people can read. Now I build things to show it."
  },
  status: {
    ko: "LS Jump Up 과정에서 AI 바이브코딩 학습 중",
    en: "Learning AI vibe coding at LS Jump Up"
  },
  // 소개 첫 문단. *별표* 안은 강조색
  aboutLead: {
    ko: "생명공학을 전공하고 KIST와 대학 연구실에서 실험을 했고, 사노피 백신 마케팅을 거쳐 코스맥스에서 연구소 경영과 해외영업을 맡았습니다. 하는 일의 중심은 늘 같았습니다. *복잡한 기술을 읽히는 문서로 바꾸고, 연구소와 해외를 잇는 일.*",
    en: "I studied genetic engineering and ran experiments at KIST and a university lab, then did vaccine marketing at Sanofi and R&D management and overseas sales at COSMAX. The core never changed: *turning complex technology into documents people read, and connecting the lab with the world.*"
  },
  about: {
    ko: [
      "글로벌 제약사 백신 마케팅 인턴을 거쳐 화장품 제조사에서 연구소 경영과 해외영업을 맡았습니다. 어느 자리에서든 하는 일의 중심은 같았습니다. 복잡한 기술과 데이터를 이해하기 쉬운 문서로 정리하고, 연구소와 해외 고객, 해외 법인 사이를 잇는 일입니다.",
      "지금은 Claude로 직접 만들어 보는 법을 배우고 있습니다. 아래 프로젝트는 그 과정에서 나온 결과물이며, 매일 자동으로 갱신됩니다."
    ],
    en: [
      "After a vaccine marketing internship at a global pharmaceutical company, I worked in R&D management and then overseas sales at a cosmetics manufacturer. The core of the work stayed the same: turn complex technology and data into clear documents, and connect the R&D center with overseas customers and subsidiaries.",
      "I am now learning to build things myself with Claude. The projects below come out of that process and update automatically every day."
    ]
  },
  strengths: [
    {
      figure: { ko: "100+", en: "100+" },
      title: { ko: "기술을 문서로", en: "Technology into documents" },
      body: {
        ko: "베스트셀러 100여 개를 분석해 유럽 화장품 기술 트렌드 리포트를 매월 전 연구소에 배포했고, 임원 보고 자료로 쓰였습니다.",
        en: "Analyzed 100+ best-sellers for a monthly European cosmetics technology report sent to every lab; it fed into executive reporting."
      }
    },
    {
      figure: { ko: "단독 담당", en: "Solo lead" },
      title: { ko: "해외와 연구소를 잇기", en: "Connecting R&D with the world" },
      body: {
        ko: "인도네시아 연구소 커뮤니케이션을 혼자 맡아 기술 이관을 조율하고 선크림 공동 기획을 완성했습니다. 국문뿐이던 연구소 투어에 영문 투어도 직접 만들었습니다.",
        en: "Ran communication with the Indonesian R&D center on my own, coordinating technology transfer and completing a joint sunscreen project. I also created the English version of the R&D tour."
      }
    },
    {
      figure: { ko: "3시간", en: "3 hrs" },
      title: { ko: "반복을 구조로 바꾸기", en: "Turning repetition into systems" },
      body: {
        ko: "제품 분석 작업을 VBA와 AI 크롤링으로 자동화해 3시간으로 줄였습니다. 같은 문제를 반복하지 않도록 일하는 방식부터 바꾸는 편입니다.",
        en: "Automated product analysis with VBA and AI crawling, cutting it to three hours. When a problem repeats, I change how the work is done."
      }
    }
  ],
  experience: [
    {
      period: "2024.06 – 2026.07",
      duration: { ko: "2년 1개월", en: "2 yrs 1 mo" },
      org: { ko: "코스맥스", en: "COSMAX" }, orgSub: { ko: "화장품 ODM", en: "cosmetics ODM" },
      roles: [
        {
          period: "2024.06 – 2026.04",
          role: { ko: "연구소 경영", en: "R&D Management" },
          points: {
            ko: [
              "유럽 화장품 기술 트렌드를 조사해 R&D 방향 검토용 월간 리포트 작성 및 전 연구소 배포. 베스트셀러 제품 100여 개를 분석했고 임원 보고에 활용됨",
              "국문 전용이던 연구소 투어에 영문 투어를 신설·운영. 3년간 24팀이던 방문이 연 100팀 이상으로 늘어 해외 고객 방문 필수 코스로 정착",
              "인도네시아 연구소 커뮤니케이션 단독 담당. 연수연구원 교육과 기술 이관을 조율하고 선크림 공동 기획을 완성",
              "제품 특징 정리 작업을 Excel VBA와 AI 크롤링으로 자동화해 3시간으로 단축. 프롬프트를 직접 설계하고 무작위 검증으로 정확도 확인",
              "연구소 8개층 전시공간 기획 주도. 방문객을 세 유형으로 나눠 유형별 기술 공개 범위를 설계"
            ],
            en: [
              "Researched European cosmetics technology trends and wrote a monthly R&D direction report shared with every lab; analyzed 100+ best-selling products, used in executive reporting",
              "Launched and ran an English version of the Korean-only R&D tour; visits grew from 24 teams over three years to 100+ a year, making it a standard stop for overseas clients",
              "Sole communication lead for the Indonesian R&D center: coordinated trainee education and technology transfer, and completed a joint sunscreen project",
              "Automated product-feature summaries with Excel VBA and AI crawling, cutting the work to three hours; designed the prompts and verified accuracy by random sampling",
              "Led planning of an eight-floor R&D exhibition space, defining how much technology to disclose to each of three visitor types"
            ]
          }
        },
        {
          period: "2026.05 – 2026.07",
          role: { ko: "해외영업", en: "Overseas Sales" },
          points: {
            ko: ["사내 이동으로 해외영업팀에서 근무"],
            en: ["Internal transfer to the overseas sales team"]
          }
        }
      ]
    },
    {
      period: "2021.07 – 2022.01",
      duration: { ko: "7개월", en: "7 mo" },
      org: { ko: "사노피 파스퇴르", en: "Sanofi Pasteur" }, orgSub: { ko: "글로벌 제약사", en: "global pharma" },
      roles: [
        {
          role: { ko: "백신 마케팅 인턴", en: "Vaccine Marketing Intern" },
          points: {
            ko: [
              "독감·폐렴구균 등 백신 판촉 자료 12종 기획·제작(목표 10종 초과), 총 50여 개 제작 및 배포 관리",
              "독감 백신 동시접종 메시지를 담은 신규 마케팅 자료를 직접 제안해 완성",
              "카피 근거가 되는 학술 문헌을 조사·관리하고 유관부서 검토 과정을 조율",
              "영업 현장 워크숍에 자원해 참석하고, 영업사원에게 들은 현장 의견을 자료 제작에 반영"
            ],
            en: [
              "Planned and produced 12 vaccine promotional pieces (target: 10) and managed 50+ materials in total",
              "Proposed and completed new materials on flu vaccine co-administration",
              "Researched and managed the scientific references behind copy, and coordinated cross-functional review",
              "Volunteered for field sales workshops and fed sales reps' feedback into the materials"
            ]
          }
        }
      ]
    }
  ],
  activities: [
    {
      period: "2026 – 진행 중",
      periodEn: "2026 – present",
      title: { ko: "LS Jump Up AI 부트캠프", en: "LS Jump Up AI Bootcamp" },
      sub: { ko: "약 4개월 집중 과정", en: "Four-month intensive program" },
      // 대외활동 맨 위 강조 카드
      featured: {
        badge: { ko: "2026 – 진행 중 · 팀장", en: "2026 – present · team lead" },
        title: { ko: "LS Jump Up AI 부트캠프 · 설비 고장 예측 AI", en: "LS Jump Up AI Bootcamp · Equipment failure prediction" },
        line: { ko: "고장 예측보다 부품 발주 시점이 진짜 문제라는 걸 찾아 설계를 바꿨습니다.", en: "Found that the real problem was when to order parts, not predicting failure, and redesigned around it." },
        stats: [
          { v: { ko: "87만", en: "870k" }, l: { ko: "센서 데이터", en: "sensor records" } },
          { v: { ko: "36", en: "36" }, l: { ko: "모델", en: "models" } },
          { v: { ko: "0.88–0.94", en: "0.88–0.94" }, l: { ko: "AUC (채택 부품)", en: "AUC (adopted parts)" } }
        ]
      },
      points: {
        ko: [
          "데이터 분석·시각화, 바이브코딩 웹 개발, 생성형 AI 업무 자동화, AI 에이전트 구축 학습",
          "팀 프로젝트 '설비 고장 예측 기반 정비·발주 의사결정 지원 시스템'(4인 팀, 조장): 예측만 해도 부품이 없으면 무의미하다고 보고, 고장 확률을 D-day와 발주 시한으로 바꿔 보여주도록 설계",
          "고장 예측 모델 담당: 센서 데이터 87만 건으로 LightGBM 모델 36개 구축, 채택 부품 3개의 결정 기간 기준 AUC 0.88–0.94"
        ],
        en: [
          "Data analysis and visualization, vibe-coded web development, generative-AI workflow automation, AI agents",
          "Team project 'Equipment failure prediction AI and predictive maintenance dashboard' (team of 3, team lead): found that technicians struggle less with predicting failure than with timing part orders, and redesigned the output to recommend order timing",
          "Owned the prediction model: 36 LightGBM models on 870k sensor records; AUC 0.88–0.94 for the 3 adopted parts at their decision horizons"
        ]
      }
    },
    {
      period: "2022.12 – 2023.05",
      title: { ko: "뇌질환 연구 참여", en: "Neuroscience research" },
      sub: { ko: "KIST 뇌과학연구소 뇌질환연구단 · 학부연구생", en: "KIST Brain Science Institute · undergraduate researcher" },
      points: {
        ko: ["신경퇴행성 질환 연구에서 유전자 발현 억제 후 병리적 변화를 조직 수준에서 관찰하는 실험을 직접 계획하고 수행"],
        en: ["Planned and ran experiments observing tissue-level pathological changes after gene knock-down in a neurodegenerative disease study"]
      },
      methods: ["Perfusion", "Cryosection", "Immunohistochemistry", "Confocal microscopy", "Virus injection"]
    },
    {
      period: "2022.08 – 2022.12",
      title: { ko: "줄기세포·암 연구 참여", en: "Stem cell & cancer research" },
      sub: { ko: "경희대 줄기세포 및 암 연구실 · 학부연구생", en: "Kyung Hee Univ. stem cell & cancer lab · undergraduate researcher" },
      points: {
        ko: ["암 미세환경이 줄기세포에 주는 영향을 RNA 수준에서 보는 예비 연구를 계획하고 수행"],
        en: ["Planned and ran a preliminary study on how the tumor microenvironment affects stem cells at the RNA level"]
      },
      methods: ["Cell culture", "RNA isolation", "qRT-PCR", "Western blot"]
    },
    {
      period: "2020.03 – 2021.02",
      title: { ko: "교내 방송국 VOU 기술실 실장", en: "Head of technical team, VOU campus broadcasting" },
      sub: { ko: "영상 촬영·편집, 장비 운영 총괄", en: "Video production and equipment operations" },
      points: {
        ko: ["매 학기 반복되던 부원 이탈의 원인을 개별 면담으로 찾아 자습형 교육 체계를 만들고 업무 분담을 개편. 이탈 0명, 다음 기수 지원율 4–5배"],
        en: ["Interviewed members to find why people kept leaving each semester, built a self-study curriculum and redistributed work. Zero dropouts; applications rose 4–5x the next term"]
      }
    },
    {
      period: "2020.04 – 2020.11",
      title: { ko: "유엔해비타트 한국위원회 청년위원단", en: "UN-Habitat Korea youth committee" },
      sub: { ko: "UN 세계 청년의 날 행사 기획 참여", en: "Planning for UN International Youth Day" },
      points: {
        ko: ["위원단 브랜딩 총괄(네이밍, 로고, 굿즈)과 카드뉴스·번역·홍보 영상 제작, 다문화·글로벌 청년 네트워킹 행사 기획과 운영"],
        en: ["Led the committee's branding (name, logo, merchandise), produced card news, translations and promo videos, and ran networking events for multicultural and international youth"]
      }
    },
    {
      period: "2020.04 – 2020.11",
      title: { ko: "온애드 광고 동아리", en: "ONAD advertising club" },
      sub: { ko: "동원 F&B 실제 제품 광고 기획", en: "Campaigns for Dongwon F&B products" },
      points: {
        ko: ["생수 브랜드의 시장 분석과 타겟 선정 후 MZ세대 대상 굿즈·캠페인을 기획해 경쟁 PT 발표, 밀크티 제품 영상 광고 제작"],
        en: ["Analyzed the market for a bottled water brand, targeted Gen Z with merchandise and a campaign pitched in a competitive presentation; produced a video ad for a milk tea product"]
      }
    }
  ],
  // 학력
  school: { ko: "경희대학교 유전생명공학과", en: "Kyung Hee University, Genetic Engineering (B.S.)" },
  schoolPeriod: "2018.03 – 2024.02",
  schoolNote: { ko: "학점 3.75/4.5 · 바이오 임상설계, 분자생물학, 인체생리학, 유기화학", en: "GPA 3.75/4.5 · clinical trial design, molecular biology, human physiology, organic chemistry" },
  education: [
    { ko: "GMP 전문가 양성과정 (192시간, 2024)", en: "GMP specialist training (192 hours, 2024)" },
    { ko: "의약품 인허가(RA) 기본교육 (2026)", en: "Pharmaceutical regulatory affairs basics (2026)" },
    { ko: "바이오 미래인재스쿨 고급과정 (2024)", en: "Bio future talent school, advanced (2024)" }
  ],
  languages: ["TOEIC 975", "OPIc AL"]
};
