// 프로필과 경력 데이터 (사람이 직접 고치는 파일)
// 공개 범위: 이력서 수준(이름, 이메일, 학교, 기관명 공개 / 전화번호, 주소, 사진 비공개). 상세: pipeline\collector.md
// 문장 규칙: 문장 중간에 중간점이나 대시를 쓰지 않는다. 줄바꿈은 \n, 목록은 배열로 쓴다.
window.SITE_DATA = {
  email: "yoongaeun@gmail.com",
  name: { ko: "윤가은", en: "Gaeun Yoon" },
  // 어떤 사람인지: 첫 화면 맨 위에 표시 (특정 직무에 묶이지 않게)
  identity: {
    ko: "과학을 이해하는 커뮤니케이터\n일하는 방식을 바꾸는 사람",
    en: "A communicator who understands science\nSomeone who changes how work gets done"
  },
  // 첫 화면 이름 아래 한 문단: 어떤 일을 해왔는지
  headline: {
    ko: "생명공학을 전공하고 연구실, 제약사, 화장품 연구소를 거쳤습니다.\n복잡한 기술을 읽히는 문서로 바꾸고, 연구소와 해외를 잇는 일을 했습니다.\n지금은 AI로 일하는 방식을 바꾸는 법을 배우고 있습니다.",
    en: "I studied genetic engineering and worked in research labs, a pharma company and a cosmetics R&D center.\nI turned complex technology into documents people could read and connected the lab with overseas partners.\nNow I am learning to change how work gets done with AI."
  },
  // 첫 화면 핵심 성과 3개: 어디서(where), 숫자(v), 무엇을(l)
  highlights: [
    { where: { ko: "코스맥스 연구소 경영", en: "COSMAX R&D Management" }, v: { ko: "24 → 100+팀", en: "24 → 100+" }, l: { ko: "영문 연구소 투어를 새로 만든 뒤\n늘어난 연간 해외 방문팀", en: "overseas visiting teams a year\nafter I launched an English R&D tour" } },
    { where: { ko: "사노피 파스퇴르 마케팅 인턴", en: "Sanofi Pasteur marketing intern" }, v: { ko: "12종", en: "12" }, l: { ko: "직접 기획하고 만든 백신 판촉 자료\n(목표 10종)", en: "vaccine promotional pieces I planned and made\n(target: 10)" } },
    { where: { ko: "LS Jump Up AI 과정 팀 프로젝트", en: "LS Jump Up AI team project" }, v: { ko: "AUC 0.88~0.94", en: "AUC 0.88~0.94" }, l: { ko: "조장으로 만든 설비 고장 예측 모델\n(채택 부품 기준)", en: "equipment failure model I built as team lead\n(adopted parts)" } }
  ],
  // 첫 화면 "한눈에 보기" 줄
  glance: [
    { k: { ko: "총 경력", en: "Experience" }, v: { ko: "2년 1개월 + 인턴 7개월", en: "2 yrs 1 mo + 7-mo internship" } },
    { k: { ko: "학력", en: "Education" }, v: { ko: "경희대 유전생명공학과", en: "Kyung Hee Univ., Genetic Engineering" } },
    { k: { ko: "어학", en: "English" }, v: { ko: "TOEIC 975, OPIc AL", en: "TOEIC 975, OPIc AL" } },
    { k: { ko: "지금", en: "Now" }, v: { ko: "LS Jump Up AI 과정 (2026.11 수료 예정)", en: "LS Jump Up AI program (until Nov 2026)" } }
  ],
  role: {
    ko: "R&D 기획, 글로벌 커뮤니케이션, AI 바이브코딩",
    en: "R&D planning, global communication, AI vibe coding"
  },
  thesis: {
    ko: "어려운 기술을 읽히는 문서로 바꿔왔고, 이제는 직접 만들어 보입니다.",
    en: "I turn complex technology into documents people can read. Now I build things to show it."
  },
  status: {
    ko: "LS Jump Up 과정에서 AI 바이브코딩 학습 중",
    en: "Learning AI vibe coding at LS Jump Up"
  },
  // 소개 첫 문단. *별표* 안은 강조색, \n은 줄바꿈
  aboutLead: {
    ko: "생명공학을 전공하고 KIST와 대학 연구실에서 실험을 했습니다.\n사노피에서 백신 마케팅을 거쳐 코스맥스에서 연구소 경영과 해외영업을 맡았습니다.\n자리는 달라도 하는 일은 같았습니다.\n*복잡한 기술을 읽히는 문서로 바꾸고, 연구소와 해외를 잇는 일입니다.*",
    en: "I studied genetic engineering and ran experiments at KIST and a university lab.\nI did vaccine marketing at Sanofi, then R&D management and overseas sales at COSMAX.\nThe roles changed, but the work did not.\n*I turn complex technology into documents people read, and connect the lab with the world.*"
  },
  about: {
    ko: [
      "글로벌 제약사 백신 마케팅 인턴을 거쳐 화장품 제조사에서 연구소 경영과 해외영업을 맡았습니다.",
      "지금은 Claude로 직접 만들어 보는 법을 배우고 있습니다. 아래 프로젝트는 그 과정에서 나온 결과물이며, 매일 자동으로 갱신됩니다."
    ],
    en: [
      "After a vaccine marketing internship at a global pharmaceutical company, I worked in R&D management and then overseas sales at a cosmetics manufacturer.",
      "I am now learning to build things myself with Claude. The projects below come out of that process and update automatically every day."
    ]
  },
  strengths: [
    {
      figure: { ko: "100+", en: "100+" },
      title: { ko: "기술을 문서로", en: "Technology into documents" },
      body: {
        ko: "유럽 베스트셀러 100여 개를 분석해 매달 기술 트렌드 리포트를 썼습니다.\n전 연구소에 배포됐고 임원 보고에 쓰였습니다.",
        en: "Analyzed 100+ European best-sellers for a monthly technology trend report.\nIt went to every lab and fed into executive reporting."
      }
    },
    {
      figure: { ko: "단독 담당", en: "Solo lead" },
      title: { ko: "해외와 연구소를 잇기", en: "Connecting R&D with the world" },
      body: {
        ko: "인도네시아 연구소와의 소통을 혼자 맡아 기술 이관을 조율하고 선크림 공동 기획을 완성했습니다.\n국문뿐이던 연구소 투어에 영문 투어도 만들었습니다.",
        en: "Ran communication with the Indonesian R&D center on my own, coordinating technology transfer and completing a joint sunscreen project.\nI also created an English version of the R&D tour."
      }
    },
    {
      figure: { ko: "3시간", en: "3 hrs" },
      title: { ko: "반복을 구조로 바꾸기", en: "Turning repetition into systems" },
      body: {
        ko: "최대 이틀 걸리던 제품 정리를 엑셀 매크로와 AI로 자동화해 3시간으로 줄였습니다.\n같은 문제가 반복되면 일하는 방식부터 바꿉니다.",
        en: "Automated product summaries that took up to two days with Excel macros and AI, cutting them to three hours.\nWhen a problem repeats, I change how the work is done."
      }
    }
  ],
  experience: [
    {
      period: "2024.06 ~ 2026.07",
      duration: { ko: "2년 1개월", en: "2 yrs 1 mo" },
      org: { ko: "코스맥스", en: "COSMAX" }, orgSub: { ko: "화장품 ODM", en: "cosmetics ODM" },
      roles: [
        {
          period: "2024.06 ~ 2026.04",
          role: { ko: "연구소 경영", en: "R&D Management" },
          points: {
            ko: [
              "유럽 화장품 기술 트렌드를 조사해 R&D 방향을 검토하는 월간 리포트를 쓰고 전 연구소에 배포했습니다.\n베스트셀러 100여 개를 분석했고 임원 보고에 쓰였습니다.",
              "국문으로만 하던 연구소 투어에 영문 투어를 새로 만들어 운영했습니다.\n3년간 24팀이던 방문이 연 100팀 이상으로 늘어 해외 고객이 꼭 들르는 코스가 됐습니다.",
              "인도네시아 연구소와의 소통을 혼자 맡았습니다.\n연수연구원 교육과 기술 이관을 조율하고 선크림 공동 기획을 완성했습니다.",
              "제품 특징 정리를 엑셀 VBA와 AI로 자동화해 3시간으로 줄였습니다.\nAI에게 줄 질문을 직접 설계하고, 무작위로 뽑아 원문과 대조해 정확도를 확인했습니다.",
              "연구소 8개 층 전시공간 기획을 이끌었습니다.\n방문객을 세 유형으로 나누고 유형별로 기술을 어디까지 공개할지 정했습니다.",
              "소비자 리포트를 분석해 신사업팀과 헤어사업팀에 직접 발표했습니다.",
              "기관생명윤리위원회(IRB) 행정간사를 맡고, 매달 연구개발 데이터를 정리해 시스템에 등록했습니다."
            ],
            en: [
              "Researched European cosmetics technology trends and wrote a monthly R&D direction report for every lab.\nAnalyzed 100+ best-sellers; the report was used in executive reporting.",
              "Launched an English version of the Korean-only R&D tour.\nVisits grew from 24 teams over three years to 100+ a year.",
              "Sole communication lead for the Indonesian R&D center.\nCoordinated trainee education and technology transfer, and completed a joint sunscreen project.",
              "Automated product-feature summaries with Excel VBA and AI, cutting the work to three hours.\nDesigned the prompts and checked accuracy by random sampling against the source.",
              "Led planning of an eight-floor R&D exhibition space.\nDecided how much technology to show each of three visitor types.",
              "Analyzed consumer reports and presented them to the new business and hair care teams.",
              "Served as administrative secretary of the IRB and registered monthly R&D data in the company system."
            ]
          }
        },
        {
          period: "2026.05 ~ 2026.07",
          role: { ko: "해외영업", en: "Overseas Sales" },
          points: {
            ko: ["사내 이동으로 해외영업팀에서 근무했습니다."],
            en: ["Internal transfer to the overseas sales team."]
          }
        }
      ]
    },
    {
      period: "2021.07 ~ 2022.01",
      duration: { ko: "7개월", en: "7 mo" },
      org: { ko: "사노피 파스퇴르", en: "Sanofi Pasteur" }, orgSub: { ko: "글로벌 제약사", en: "global pharma" },
      roles: [
        {
          role: { ko: "백신 마케팅 인턴", en: "Vaccine Marketing Intern" },
          points: {
            ko: [
              "독감과 폐렴구균 등 백신 판촉 자료 12종을 기획하고 만들었습니다(목표 10종).\n모두 50여 개의 제작과 배포를 관리했습니다.",
              "사수와 일하는 방식이 달라 일정이 밀리자 역할을 다시 나누자고 제안했습니다.\n사수가 뼈대를 잡고, 제가 근거 조사와 문구 검증으로 마무리했습니다.",
              "독감 백신 동시접종 메시지를 담은 새 자료를 직접 제안해 완성했습니다.",
              "영업 현장 워크숍에 자원해 참석하고, 영업사원에게 들은 의견을 자료에 반영했습니다."
            ],
            en: [
              "Planned and produced 12 vaccine promotional pieces (target: 10).\nManaged 50+ materials in total.",
              "When our different working styles delayed the schedule, I proposed splitting the work by stage.\nMy senior drafted, and I finished with evidence checks and copy review.",
              "Proposed and completed new materials on flu vaccine co-administration.",
              "Volunteered for field sales workshops and fed sales reps' feedback into the materials."
            ]
          }
        }
      ]
    }
  ],
  // 대외활동: summary는 닫힌 상태에 보이는 줄(줄마다 bullet), details는 '자세히'를 눌러야 보이는 줄
  activities: [
    {
      period: "2022.12 ~ 2023.05",
      title: { ko: "KIST 뇌과학연구소 뇌질환연구단", en: "KIST Brain Science Institute" },
      sub: { ko: "학부연구생", en: "Undergraduate researcher" },
      summary: {
        ko: ["신경퇴행성 질환 연구에서 조직 관찰 실험을 직접 계획하고 수행"],
        en: ["Planned and ran tissue-level experiments in a neurodegenerative disease study"]
      },
      details: {
        ko: ["TTYH 채널 연구를 보조하며, 유전자 발현을 억제한 뒤 생기는 병리적 변화를 조직 수준에서 관찰하는 실험을 맡음", "실험 계획부터 수행과 결과 정리까지 직접 진행"],
        en: ["Supported TTYH channel research, observing tissue-level pathological changes after gene knock-down", "Ran the work from planning to results"]
      },
      methods: ["Perfusion", "Cryosection", "Immunohistochemistry", "Confocal microscopy", "Virus injection"]
    },
    {
      period: "2022.08 ~ 2022.12",
      title: { ko: "경희대 줄기세포 및 암 연구실", en: "Kyung Hee Univ. stem cell & cancer lab" },
      sub: { ko: "학부연구생", en: "Undergraduate researcher" },
      summary: {
        ko: ["암 미세환경이 줄기세포에 주는 영향을 RNA 수준에서 보는 예비 실험을 맡음"],
        en: ["Ran a preliminary study on how the tumor microenvironment affects stem cells at the RNA level"]
      },
      details: {
        ko: ["세포 배양, RNA 분리, qRT-PCR, Western blot을 배워 직접 수행"],
        en: ["Learned and performed cell culture, RNA isolation, qRT-PCR and Western blot"]
      },
      methods: ["Cell culture", "RNA isolation", "qRT-PCR", "Western blot"]
    },
    {
      period: "2022.07 ~ 2022.11",
      title: { ko: "같이에듀 그루터기 학습멘토링", en: "Gachi Edu learning mentoring" },
      sub: { ko: "청소년그루터기재단 봉사", en: "Youth foundation volunteer" },
      summary: {
        ko: ["청소년 학습 멘토링 55시간, 활동우수상 수상"],
        en: ["55 hours of mentoring for teenagers; received an outstanding volunteer award"]
      }
    },
    {
      period: "2020.03 ~ 2021.02",
      title: { ko: "교내 방송국 VOU 기술실", en: "VOU campus broadcasting, technical team" },
      sub: { ko: "정국원 6개월, 실장 6개월", en: "Member 6 months, head 6 months" },
      summary: {
        ko: ["3년째 반복되던 부원 이탈을 면담으로 원인부터 찾아 해결", "이탈 0명, 다음 기수 지원율 4~5배"],
        en: ["Found why members kept leaving by interviewing them, then fixed it", "Zero dropouts; applications rose 4 to 5 times the next term"]
      },
      details: {
        ko: [
          "학교 축제와 홈페이지 영상의 촬영과 편집, 장비 구매와 수리 관리를 총괄",
          "개별 면담으로 이탈 이유를 두 가지로 좁힘. 신입은 배울 교육 체계가 없었고, 기존 부원은 기술실에 몰린 업무로 지쳐 있었음",
          "교재와 단계별 커리큘럼을 만들어 신입이 혼자 익힐 수 있게 하고, 타 부서와 협의해 업무를 나눠 맡는 구조로 바꿈"
        ],
        en: [
          "Ran filming and editing for school festivals and the website, plus equipment purchasing and repairs",
          "Interviews narrowed the cause to two things: new members had no training path, and existing members were worn out by work piled on the team",
          "Built a self-study curriculum with materials, and agreed with other teams to share the workload"
        ]
      }
    },
    {
      period: "2020.04 ~ 2020.11",
      title: { ko: "유엔해비타트 한국위원회 청년위원단", en: "UN-Habitat Korea youth committee" },
      sub: { ko: "UN 세계 청년의 날 행사 기획 참여", en: "Planning for UN International Youth Day" },
      summary: {
        ko: ["청년위원단 브랜딩을 총괄하고 홍보 콘텐츠를 만듦"],
        en: ["Led the committee's branding and produced promotional content"]
      },
      details: {
        ko: ["위원단 이름(버플리)과 로고, 청년의 날 굿즈를 직접 만듦", "카드뉴스, 기사 번역, 홍보 영상 제작을 맡음", "다문화 청년과 해외 청년이 함께하는 네트워킹 행사를 기획하고 운영"],
        en: ["Created the committee's name, logo and Youth Day merchandise", "Made card news, translated articles and produced promo videos", "Planned and ran networking events for multicultural and international youth"]
      }
    },
    {
      period: "2020.04 ~ 2020.11",
      title: { ko: "온애드 광고 동아리", en: "ONAD advertising club" },
      sub: { ko: "동원 F&B 실제 제품 광고 기획", en: "Campaigns for Dongwon F&B products" },
      summary: {
        ko: ["생수 브랜드 캠페인을 기획해 경쟁 PT에서 발표", "밀크티 제품 영상 광고 제작"],
        en: ["Pitched a bottled water campaign in a competitive presentation", "Produced a video ad for a milk tea product"]
      },
      details: {
        ko: ["동원샘물: 시장을 분석해 타깃을 정하고, MZ세대를 겨냥한 굿즈와 캠페인을 기획해 동아리 내부 경쟁 PT에서 발표", "동원홍차밀크티: 영상 광고 제작을 맡음"],
        en: ["Dongwon Spring Water: analyzed the market, chose the target and pitched Gen Z merchandise and a campaign", "Dongwon milk tea: produced the video ad"]
      }
    },
    {
      period: "2020.05 ~ 2020.08",
      title: { ko: "메이크어위시 한국지부", en: "Make-A-Wish Korea" },
      sub: { ko: "봉사", en: "Volunteer" },
      summary: {
        ko: ["난치병 아이들의 소원을 이뤄 주는 봉사 활동에 참여"],
        en: ["Volunteered to grant wishes for children with critical illnesses"]
      }
    }
  ],
  // 교육 및 자격 (별도 섹션). 형식은 대외활동과 같음
  training: [
    {
      period: "2026 ~ 2026.11",
      title: { ko: "LS Jump Up AI 부트캠프", en: "LS Jump Up AI Bootcamp" },
      sub: { ko: "약 4개월 집중 과정, 진행 중", en: "Four-month intensive, in progress" },
      summary: {
        ko: ["제조 데이터 분석부터 AI 에이전트까지 실습 위주로 배우는 중", "3인 팀 프로젝트 조장으로 설비 고장 예측 대시보드 제작 (아래 프로젝트 참고)"],
        en: ["Hands-on training from manufacturing data analysis to AI agents", "Team lead of a 3-person project that built an equipment failure dashboard (see Projects)"]
      },
      details: {
        ko: ["배우는 내용: 제조업 디지털 전환, 데이터 분석과 시각화, 바이브 코딩 웹 개발, 생성형 AI 업무 자동화, AI 에이전트 구축", "팀 프로젝트에서 데이터 전처리, 부품별 고장 예측 모델, 대시보드 화면 통합을 맡음", "센서 데이터 87만 건으로 만든 모델의 AUC는 채택 부품 기준 0.88~0.94"],
        en: ["Topics: manufacturing digital transformation, data analysis and visualization, vibe-coded web development, generative AI automation, AI agents", "In the team project I handled preprocessing, per-part failure models and dashboard integration", "AUC 0.88~0.94 for the adopted parts, trained on 870k sensor records"]
      }
    },
    {
      period: "2026.07 ~ 2026.08",
      title: { ko: "의약품 인허가(RA) 기본교육", en: "Pharmaceutical regulatory affairs basics" },
      sub: { ko: "한국제약바이오협회, 6시간", en: "Korea Pharmaceutical and Bio-Pharma Manufacturers Association, 6 hours" },
      summary: {
        ko: ["약사법 등 규제 법령, 인허가와 심사, 임상시험, 품질관리를 배움"],
        en: ["Drug regulation, approval and review, clinical trials and quality control"]
      }
    },
    {
      period: "2024.02 ~ 2024.03",
      title: { ko: "GMP 전문가 양성과정", en: "GMP specialist training" },
      sub: { ko: "한국산업기술시험원(KTL), 192시간", en: "KTL, 192 hours" },
      summary: {
        ko: ["GMP 규정과 품질관리 체계, 밸리데이션 이론을 배우고 분석 장비를 실습"],
        en: ["GMP rules, quality systems and validation theory, with hands-on analytical equipment"]
      }
    },
    {
      period: "2024.01",
      title: { ko: "바이오 미래인재스쿨 4기 고급과정", en: "Bio future talent school, advanced" },
      sub: { ko: "충북창조경제혁신센터, 10시간", en: "Chungbuk Center for Creative Economy & Innovation, 10 hours" },
      summary: {
        ko: ["제약 바이오 가치사슬, 글로벌 제약사와 M&A 동향을 분석"],
        en: ["Pharma and bio value chain, global pharma companies and M&A trends"]
      }
    }
  ],
  certs: [
    { name: "TOEIC 975", date: "2026.02", note: { ko: "990점 만점", en: "out of 990" } },
    { name: "OPIc AL", date: "2025.12", note: { ko: "영어 말하기 최고 등급", en: "highest English speaking level" } }
  ],
  // 학력
  school: { ko: "경희대학교 유전생명공학과", en: "Kyung Hee University, Genetic Engineering (B.S.)" },
  schoolPeriod: "2018.03 ~ 2024.02",
  schoolNote: { ko: "학점 3.75/4.5\n주요 과목: 바이오 임상설계, 분자생물학, 인체생리학, 유기화학", en: "GPA 3.75/4.5\nCourses: clinical trial design, molecular biology, human physiology, organic chemistry" },
  languages: ["TOEIC 975", "OPIc AL"]
};
