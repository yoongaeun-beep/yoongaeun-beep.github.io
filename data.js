// 프로필과 경력 데이터 (사람이 직접 고치는 파일)
// 공개 범위: 이력서 수준(이름, 이메일, 학교, 기관명 공개 / 전화번호, 주소, 사진 비공개). 상세: pipeline\collector.md
// 문장 규칙: 문장 중간에 중간점이나 대시를 쓰지 않는다. 줄바꿈은 \n, 목록은 배열로 쓴다.
window.SITE_DATA = {
  email: "yoongaeun@gmail.com",
  name: { ko: "윤가은", en: "Gaeun Yoon" },
  // 어떤 사람인지: 첫 화면 맨 위에 표시 (특정 직무에 묶이지 않게)
  identity: {
    ko: "생명공학 전공\n제약사 인턴과 화장품 연구소 2년",
    en: "Genetic engineering graduate\nPharma internship, then two years at a cosmetics R&D center"
  },
  // 첫 화면 이름 아래 한 문단: 어떤 일을 해왔는지
  headline: {
    ko: "생명공학을 전공하고 연구실, 제약사, 화장품 연구소를 거쳤습니다.\n근거를 찾아 문서로 정리하고, 내보내기 전에 확인하는 일을 해 왔습니다.\n지금은 AI로 일하는 방식을 바꾸는 법을 배우고 있습니다.",
    en: "I studied genetic engineering and have worked in research labs, at a pharma company and at a cosmetics R&D center.\nMy work has been to find evidence, write it up, and check it before it goes out.\nI am now learning how AI can change the way work gets done."
  },
  // 첫 화면 핵심 성과 3개: 어디서(where), 숫자(v), 무엇을(l)
  highlights: [
    { where: { ko: "코스맥스 연구소 경영", en: "COSMAX R&D Management" }, v: { ko: "9건", en: "9" }, l: { ko: "유럽 시장 리포트 (월간 정기호와 특별판)\n리포트마다 베스트셀러 100개 이상 분석", en: "European market reports\neach analyzing 100+ best-sellers" } },
    { where: { ko: "사노피 파스퇴르 마케팅 인턴", en: "Sanofi Pasteur marketing intern" }, v: { ko: "12종", en: "12" }, l: { ko: "목표 10종, 사수와 역할을 나눠 완성한 판촉 자료\nMedical과 RA 검토 통과", en: "vaccine promotional pieces against a target of 10\neach cleared Medical and RA review" } },
    { where: { ko: "코스맥스 연구소 경영", en: "COSMAX R&D Management" }, v: { ko: "연 100팀+", en: "100+ a year" }, l: { ko: "영문 연구소 투어 신설 후 해외 방문팀\n(이전 3년간 24팀)", en: "overseas visiting teams after I launched the English R&D tour\n(up from 24 over the previous 3 years)" } }
  ],
  // 첫 화면 "한눈에 보기" 줄
  glance: [
    { k: { ko: "총 경력", en: "Experience" }, v: { ko: "2년 1개월 + 인턴 6개월", en: "2 yrs 1 mo + 6-mo internship" } },
    { k: { ko: "학력", en: "Education" }, v: { ko: "경희대 유전생명공학과", en: "Kyung Hee Univ., Genetic Engineering" } },
    { k: { ko: "어학", en: "English" }, v: { ko: "TOEIC 975, OPIc AL", en: "TOEIC 975, OPIc AL" } },
    { k: { ko: "지금", en: "Now" }, v: { ko: "LS Jump Up AI 과정 (2026.11 수료 예정)", en: "LS Jump Up AI program (until Nov 2026)" } }
  ],
  role: {
    ko: "R&D 기획, 글로벌 커뮤니케이션, AI 바이브코딩",
    en: "R&D planning, global communication, AI vibe coding"
  },
  thesis: {
    ko: "근거를 찾고, 읽는 사람이 이해할 문서로 정리하고, 내보내기 전에 확인합니다.",
    en: "I find the evidence, write it up for the reader, and check it before it goes out."
  },
  status: {
    ko: "LS Jump Up 과정에서 AI 바이브코딩 학습 중",
    en: "Learning AI vibe coding at LS Jump Up"
  },
  // 소개 첫 문단. *별표* 안은 강조색, \n은 줄바꿈
  aboutLead: {
    ko: "생명공학을 전공하고 KIST와 대학 연구실에서 실험을 했습니다.\n사노피에서 백신 마케팅을 거쳐 코스맥스에서 연구소 경영과 해외영업을 맡았습니다.\n*인도네시아 연구소의 주 담당 창구를 맡았고, 영문 연구소 투어를 새로 만들었습니다.*",
    en: "I studied genetic engineering and ran experiments at KIST and a university lab.\nI worked in vaccine marketing at Sanofi, then in R&D management and overseas sales at COSMAX.\n*I was the primary contact for the Indonesian R&D lab and created an English version of the R&D tour.*"
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
      where: { ko: "코스맥스 연구소 경영", en: "COSMAX R&D Management" },
      figure: { ko: "9건", en: "9 reports" },
      title: { ko: "시장 자료를 리포트로", en: "Market research into reports" },
      body: {
        ko: "월간 정기호와 특별판을 합쳐 유럽 시장 리포트 9건 작성\n리포트마다 베스트셀러 100개 이상 분석, 연구원 300명 이상에게 배포",
        en: "Wrote 9 European market reports, monthly issues plus special editions.\nEach analyzed 100+ best-sellers and went to 300+ R&D staff."
      }
    },
    {
      where: { ko: "코스맥스 연구소 경영", en: "COSMAX R&D Management" },
      figure: { ko: "주 담당 창구", en: "Primary contact" },
      title: { ko: "해외 연구소와의 소통", en: "Communication with overseas labs" },
      body: {
        ko: "인도네시아 연구소(60명)의 주 담당 창구, 문의 정리와 연수연구원 7명 지원\n국문뿐이던 연구소 투어에 영문 투어 신설",
        en: "Primary contact for the Indonesian R&D lab (60 staff): organized enquiries and supported 7 trainees.\nCreated an English version of the Korean-only R&D tour."
      }
    },
    {
      where: { ko: "코스맥스 연구소 경영", en: "COSMAX R&D Management" },
      figure: { ko: "3시간", en: "3 hrs" },
      title: { ko: "자동화와 검증", en: "Automation with a check" },
      body: {
        ko: "최대 이틀 걸리던 제품 정리를 엑셀 VBA와 AI로 자동화해 3시간으로 단축\nAI에게 줄 질문을 직접 설계하고, 무작위 표본을 원문과 대조해 정확도 확인",
        en: "Automated product data processing with Excel VBA and AI, cutting up to two days of work to three hours.\nDesigned the prompts and checked random samples against the source."
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
          role: { ko: "연구소 경영", en: "R&I Management Associate, R&D Center" },
          points: {
            ko: [
              "유럽 화장품 시장을 조사해 R&D 방향 검토용 시장 리포트를 월간 정기호와 특별판 포함 9건 작성\n리포트마다 베스트셀러 100개 이상 분석, 연구원 300명 이상에게 배포, 임원 보고 자료로 활용",
              "국문으로만 하던 연구소 투어에 영문 투어를 신설해 운영\n3년간 24팀이던 방문이 연 100팀 이상으로 늘어 해외 고객 필수 방문 코스로 정착",
              "인도네시아 연구소(60명)의 주 담당 창구\n문의 정리, 연수연구원 7명 지원",
              "제품 특징 정리를 엑셀 VBA와 AI로 자동화해 3시간으로 단축\nAI에게 줄 질문을 직접 설계하고, 무작위 표본을 원문과 대조해 정확도 확인",
              "연구소 4개 층, 7개 섹션의 전시공간 기획 주도\n방문객을 세 유형으로 나누고 유형별 기술 공개 범위 설계",
              "소비자 리포트를 분석해 신사업팀과 헤어사업팀에 직접 발표",
              "사내 기관생명윤리위원회(IRB) 행정간사, 월간 연구개발 데이터 정리와 시스템 등록"
            ],
            en: [
              "Researched the European cosmetics market and wrote 9 market reports, monthly issues plus special editions, to guide R&D.\nEach analyzed 100+ best-sellers, was shared with 300+ R&D staff and was used in executive reporting.",
              "Launched an English version of the Korean-only R&D tour.\nVisits grew from 24 teams over three years to 100+ a year.",
              "Primary contact for the Indonesian R&D lab (60 staff).\nOrganized enquiries and supported 7 trainees.",
              "Automated product-feature summaries with Excel VBA and AI, cutting the work to three hours.\nDesigned the prompts and checked accuracy against the source with random samples.",
              "Led planning of an R&D exhibition space across 4 floors and 7 sections.\nDecided how much technology to show each of three visitor types.",
              "Analyzed consumer reports and presented them to the new business and hair care teams.",
              "Served as administrative secretary of the in-house IRB and registered monthly R&D data in the company system."
            ]
          }
        },
        {
          period: "2026.05 ~ 2026.07",
          role: { ko: "해외영업", en: "Project Coordinator, Overseas Sales Team" },
          points: {
            ko: ["사내 이동, 고객사 11곳의 프로젝트 25개 이상에서 샘플링부터 생산까지 연락 창구"],
            en: ["After an internal transfer, served as point of contact for 11 customers across 25+ projects, from sampling to production."]
          }
        }
      ]
    },
    {
      period: "2021.07 ~ 2022.01",
      duration: { ko: "6개월", en: "6 mo" },
      org: { ko: "사노피 파스퇴르", en: "Sanofi Pasteur" }, orgSub: { ko: "글로벌 제약사", en: "global pharma" },
      roles: [
        {
          role: { ko: "백신 마케팅 인턴", en: "Marketing Intern, PMED Franchise (vaccines)" },
          points: {
            ko: [
              "독감과 폐렴구균 등 백신 판촉 자료 12종 완성 (목표 10종)\n일하는 방식이 다른 사수에게 역할 재분배를 제안해, 사수가 뼈대를 잡고 근거 조사와 문구 검증으로 마무리",
              "판촉물 총 50여 개의 제작과 배포 관리",
              "Medical(과학적 정확성)과 RA(규정 준수) 검토를 거쳐 수치마다 출처를 붙인 문구 작성",
              "담당 백신의 근거를 문헌과 ClinicalTrials.gov에서 직접 조사, 다른 독감 백신 자료는 배경으로만 참고",
              "독감 백신 동시접종 메시지를 담은 신규 자료를 직접 제안해 완성",
              "영업 현장 워크숍에 자원해 참석, 영업사원에게 들은 의견을 자료에 반영"
            ],
            en: [
              "Delivered 12 vaccine promotional pieces against a target of 10.\nProposed splitting the work by stage: my senior drafted, and I finished with evidence checks and copy review.",
              "Managed production and distribution of about 50 materials.",
              "Wrote copy with a source for every figure, reviewed by Medical (scientific accuracy) and RA (compliance).",
              "Searched the literature and ClinicalTrials.gov for evidence on my vaccine; read data on other influenza vaccines only for context.",
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
      period: "2026 ~ 2026.11",
      title: { ko: "LS Jump Up AI 부트캠프", en: "LS Jump Up AI Bootcamp" },
      sub: { ko: "약 3개월 반 집중 과정, 진행 중", en: "3.5-month intensive, in progress" },
      summary: {
        ko: ["제조 데이터 분석부터 AI 에이전트까지 실습 위주로 배우는 중", "3인 팀 조장으로 설비 고장 예측 대시보드 제작, LightGBM 모델 36개 구축 (프로젝트 참고)"],
        en: ["Hands-on training from manufacturing data analysis to AI agents", "Led a 3-person team building an equipment failure dashboard and built 36 LightGBM models (see Projects)"]
      },
      details: {
        ko: ["배우는 내용: 제조업 디지털 전환, 데이터 분석과 시각화, 바이브 코딩 웹 개발, 생성형 AI 업무 자동화, AI 에이전트 구축", "팀 프로젝트에서 데이터 전처리, 부품별 고장 예측 모델, 대시보드 화면 통합을 맡음", "센서 데이터 87만 건으로 만든 모델의 AUC는 채택 부품 기준 0.88~0.94"],
        en: ["Topics: manufacturing digital transformation, data analysis and visualization, vibe-coded web development, generative AI automation, AI agents", "In the team project I handled preprocessing, per-part failure models and dashboard integration", "AUC 0.88~0.94 for the adopted parts, trained on 870k sensor records"]
      }
    },
    {
      period: "2024.01",
      title: { ko: "바이오 미래인재스쿨 4기 고급과정", en: "Bio Future Talent School, advanced course" },
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
