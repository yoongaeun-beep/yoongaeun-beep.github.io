// 사실 데이터 (사람이 직접 고치는 파일). 두 사이트(유관산업 site/, 무관산업 site-global/)가 같이 쓴다.
// 사이트마다 다른 것(첫 화면 문구, 대표 숫자, 소개 카드, 순서)은 각 사이트의 edition.js에 있다.
// 공개 범위: 이력서 수준(이름, 이메일, 학교, 기관명 공개 / 전화번호, 주소, 사진 비공개). 상세: pipeline\collector.md
// 문장 규칙: 중간점과 대시 금지. 경력 한 줄은 화면에서 두 줄을 넘기지 않는다. **핵심**은 하이라이트로 보인다.
// ed: "bio" 또는 "global"이 붙은 항목은 그 사이트에서만 보인다.
// 해외영업은 3개월이라 성과를 키우거나 앞에 세우지 않는다(2026-11-19 사용자 지시).
window.SITE_DATA = {
  email: "yoongaeun@gmail.com",
  name: { ko: "윤가은", en: "Gaeun Yoon" },
  // 경력: 회사 → 직무 → 카테고리 묶음. 묶음 id는 소개 카드가 눌렸을 때 이동하는 자리다.
  experience: [
    {
      id: "exp-cosmax",
      period: "2024.06 ~ 2026.07",
      duration: { ko: "2년 1개월", en: "2 yrs 1 mo" },
      org: { ko: "코스맥스", en: "COSMAX" }, orgSub: { ko: "화장품 ODM (B2B 제조)", en: "cosmetics ODM (B2B manufacturing)" },
      roles: [
        {
          period: "2024.06 ~ 2026.04",
          role: { ko: "연구소 경영", en: "R&I Management Associate, R&D Center" },
          groups: [
            {
              id: "exp-cosmax-global", cat: { ko: "해외 고객 응대", en: "Overseas customers" },
              items: [
                { ko: "국문뿐이던 연구소 투어에 **영문 투어 신설**, 해외 방문이 3년간 24팀에서 **연 100팀 이상**으로", en: "**Launched an English R&D tour**; overseas visits grew from 24 teams in 3 years to **100+ a year**" },
                { ko: "방문 고객의 사업과 관심사를 미리 파악해 보여 줄 기술과 설명 수준을 매번 재구성", en: "Researched each visitor's business in advance and tailored which technologies to show" }
              ]
            },
            {
              id: "exp-cosmax-indonesia", cat: { ko: "해외 법인 협업", en: "Overseas subsidiary" },
              items: [
                { ko: "본사와 인도네시아 연구소(현지 60명) 사이 **단독 소통 창구**, 연수연구원 7명 지원", en: "**Sole contact** between HQ and the Indonesian R&D lab (60 local staff); supported 7 trainees" },
                { ko: "현지 시장용 선크림 공동 기획에서 양국 연구원 소통 담당과 미팅 주선", en: "Handled communication and meetings for a sunscreen jointly planned for Indonesia" }
              ]
            },
            {
              id: "exp-cosmax-market", cat: { ko: "시장 조사", en: "Market research" },
              // 샘플: 리포트 본문은 사내 자료라 제목줄만 남기고 흐리게 처리(2026-11-23 본인 제공)
              proof: [
                { src: "assets/samples/report-france.jpg", alt: { ko: "유럽 시장 리포트 한 페이지(프랑스), 본문은 흐리게 가림", en: "European report page (France), body blurred" } },
                { src: "assets/samples/report-italy.jpg", alt: { ko: "유럽 시장 리포트 한 페이지(이탈리아), 본문은 흐리게 가림", en: "European report page (Italy), body blurred" } }
              ],
              items: [
                { ko: "유럽 화장품 시장 리포트 **9건** 작성, 리포트마다 베스트셀러 100개 이상 분석", en: "Wrote **9** European market reports, each analyzing 100+ best-sellers" },
                { ko: "본사 연구소 **300명 이상**에게 배포, 임원 보고 자료로 활용", en: "Shared with **300+** HQ R&D staff and used in executive reporting" },
                { ko: "소비자 리포트를 분석해 신사업팀과 헤어사업팀에 직접 발표", en: "Presented consumer-report analysis to the new business and hair care teams" }
              ]
            },
            {
              id: "exp-cosmax-ai", cat: { ko: "업무 자동화", en: "Automation" },
              items: [
                { ko: "제품 특징 정리를 엑셀 VBA와 AI로 자동화, 최대 이틀 걸리던 작업을 **3시간**으로", en: "Automated product summaries with Excel VBA and AI, cutting up to two days to **3 hours**" },
                // 근거(2026-11-23 본인 답변): 엑셀에서 PPT로 옮기는 반복은 VBA 매크로, 제품 특징 추출은 Genspark에 직접 짠 프롬프트, 매번 표본 몇 개를 원문과 대조
                { ko: "엑셀에서 PPT로 옮기는 반복은 **VBA 매크로**, 제품 특징 추출은 **Genspark에 직접 짠 프롬프트**로 분담", en: "Split the work: **VBA macros** for moving Excel data into PPT, **my own Genspark prompts** for extracting product features" },
                { ko: "매번 무작위 표본 몇 개를 원문과 대조해 AI가 뽑은 특징이 맞는지 확인", en: "Checked a few random samples against the source every time" }
              ]
            },
            {
              id: "exp-cosmax-plan", cat: { ko: "기획과 운영", en: "Planning" },
              items: [
                { ko: "연구소 4개 층, 7개 구역 **전시공간 기획 주도**, 방문객 세 유형별 기술 공개 범위 설계", en: "**Led planning** of a 4-floor, 7-zone R&D exhibition and set what to show each visitor type" },
                { ed: "bio", ko: "사내 기관생명윤리위원회(IRB) 행정간사, 월간 연구개발 데이터 정리와 등록", en: "Administrative secretary of the in-house IRB; registered monthly R&D data" }
              ]
            }
          ]
        },
        {
          period: "2026.05 ~ 2026.07",
          role: { ko: "해외영업", en: "Project Coordinator, Overseas Sales Team" },
          groups: [
            {
              id: "exp-cosmax-sales", cat: { ko: "고객 프로젝트", en: "Customer projects" },
              items: [
                { ko: "사내 이동 후 3개월간 고객사 프로젝트의 샘플링부터 생산까지 연락 창구 (고객사 11곳)", en: "After an internal transfer, three months as contact for customer projects from sampling to production (11 customers)" }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "exp-sanofi",
      period: "2021.07 ~ 2022.01",
      duration: { ko: "6개월", en: "6 mo" },
      org: { ko: "사노피 파스퇴르", en: "Sanofi Pasteur" }, orgSub: { ko: "글로벌 제약사", en: "global pharma" },
      roles: [
        {
          role: { ko: "백신 마케팅 인턴", en: "Marketing Intern, PMED Franchise (vaccines)" },
          groups: [
            {
              id: "exp-sanofi-material", cat: { ko: "판촉 자료 제작", en: "Promotional materials" },
              // 샘플: 대외 공개된 광고 이미지라 그대로 쓴다(2026-11-23 본인 제공)
              proof: [
                { src: "assets/samples/sanofi-campaign.jpg", alt: { ko: "담당 독감 백신의 대외 광고 이미지", en: "Public ad for the flu vaccine I worked on" } }
              ],
              items: [
                { ko: "독감, 폐렴구균 등 백신 판촉 자료 **12종** 완성 (목표 10종)", en: "Delivered **12** vaccine promotional pieces against a target of 10" },
                { ko: "사수에게 역할 재분배를 제안해, 사수가 뼈대를 잡고 근거 조사와 문구 검증으로 마무리", en: "Proposed splitting the work: my senior drafted, I finished with evidence and copy checks" },
                { ko: "판촉물 총 50여 개의 제작과 배포 관리", en: "Managed production and distribution of about 50 materials" }
              ]
            },
            {
              id: "exp-sanofi-evidence", cat: { ko: "근거와 검토", en: "Evidence and review" },
              items: [
                { ko: "**Medical과 RA 검토**를 거쳐 수치마다 출처를 붙인 문구 작성", en: "Wrote copy with a source for every figure, cleared by **Medical and RA review**" },
                { ed: "bio", ko: "담당 백신의 근거를 문헌과 ClinicalTrials.gov에서 직접 조사", en: "Searched the literature and ClinicalTrials.gov for evidence on my vaccine" },
                { ko: "독감 백신 동시접종 메시지를 담은 신규 자료를 직접 제안해 완성", en: "Proposed and completed new materials on flu vaccine co-administration" }
              ]
            },
            {
              id: "exp-sanofi-field", cat: { ko: "영업 현장 협업", en: "Field sales" },
              items: [
                { ko: "영업 현장 워크숍에 자원해 참석, **영업사원 의견을 자료에 반영**", en: "Volunteered for field workshops and **built sales reps' feedback into the materials**" }
              ]
            }
          ]
        }
      ]
    }
  ],
  // 타임라인: 공백 없이 이어진 흐름을 보여 준다. lane은 줄(학업, 경력, 교육, 활동). 날짜는 YYYY-MM
  timelineFrom: "2020-01",
  timeline: [
    { lane: "edu", from: "2018-03", to: "2024-02", label: { ko: "경희대 유전생명공학과 재학", en: "Kyung Hee Univ., Genetic Engineering" } },
    { lane: "act", from: "2020-03", to: "2021-02", label: { ko: "방송국 기술실장, 광고 동아리, UN 청년위원단 등 4개", en: "Campus broadcasting, ad club, UN youth committee and more" } },
    { lane: "work", from: "2021-07", to: "2022-01", label: { ko: "사노피 파스퇴르 백신 마케팅 인턴", en: "Sanofi Pasteur vaccine marketing intern" } },
    { lane: "act", from: "2022-07", to: "2022-11", label: { ko: "학습 멘토링 55시간", en: "55 hours of mentoring" } },
    { lane: "act", from: "2022-08", to: "2023-05", ed: "bio", label: { ko: "학부 연구 (경희대 연구실, KIST)", en: "Undergraduate research (KHU lab, KIST)" } },
    { lane: "train", from: "2024-01", to: "2024-01", ed: "bio", label: { ko: "바이오 미래인재스쿨 10시간", en: "Bio Future Talent School, 10 h" } },
    { lane: "train", from: "2024-02", to: "2024-03", label: { ko: "GMP 전문가 양성과정 192시간", en: "GMP specialist training, 192 h" } },
    { lane: "work", from: "2024-06", to: "2026-07", label: { ko: "코스맥스 연구소 경영, 해외영업", en: "COSMAX R&D management, overseas sales" } },
    { lane: "train", from: "2026-07", to: "2026-08", ed: "bio", label: { ko: "의약품 인허가(RA) 기본교육", en: "Pharmaceutical RA basics" } },
    { lane: "train", from: "2026-08", to: "2026-11", label: { ko: "LS Jump Up AI 부트캠프", en: "LS Jump Up AI Bootcamp" }, now: true }
  ],
  // 대외활동: summary는 닫힌 상태에 보이는 줄(줄마다 bullet), details는 '자세히'를 눌러야 보이는 줄
  // 순서(2026-11-19): 사람과 조직을 움직인 활동을 앞에, 학부 연구는 뒤에 둔다.
  activities: [
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
        ko: ["다문화 청년과 해외 청년이 함께하는 네트워킹 행사 기획과 운영", "청년위원단 브랜딩 총괄과 홍보 콘텐츠 제작"],
        en: ["Planned and ran networking events for multicultural and international youth", "Led the committee's branding and produced promotional content"]
      },
      details: {
        ko: ["위원단 이름(버플리)과 로고, 청년의 날 굿즈를 직접 만듦", "카드뉴스, 기사 번역, 홍보 영상 제작을 맡음"],
        en: ["Created the committee's name, logo and Youth Day merchandise", "Made card news, translated articles and produced promo videos"]
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
      period: "2022.07 ~ 2022.11",
      title: { ko: "같이에듀 그루터기 학습멘토링", en: "Gachi Edu learning mentoring" },
      sub: { ko: "청소년그루터기재단 봉사", en: "Youth foundation volunteer" },
      summary: {
        ko: ["청소년 학습 멘토링 55시간, 활동우수상 수상"],
        en: ["55 hours of mentoring for teenagers; received an outstanding volunteer award"]
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
    },
    {
      period: "2022.12 ~ 2023.05",
      ed: "bio",
      title: { ko: "KIST 뇌과학연구소 뇌질환연구단", en: "KIST Brain Science Institute" }, compactIn: "global",
      sub: { ko: "학부연구생", en: "Undergraduate researcher" },
      summary: {
        ko: ["신경퇴행성 질환 연구에서 조직 관찰 실험을 직접 계획하고 수행"],
        en: ["Planned and ran tissue-level experiments in a neurodegenerative disease study"]
      },
      details: {
        ko: ["TTYH 채널 연구를 보조하며, 유전자 발현을 억제한 뒤 생기는 병리적 변화를 조직 수준에서 관찰하는 실험을 맡음", "실험 계획부터 수행과 결과 정리까지 직접 진행"],
        en: ["Supported TTYH channel research, observing tissue-level pathological changes after gene knock-down", "Ran the work from planning to results"]
      }
    },
    {
      period: "2022.08 ~ 2022.12",
      ed: "bio",
      title: { ko: "경희대 줄기세포 및 암 연구실", en: "Kyung Hee Univ. stem cell & cancer lab" }, compactIn: "global",
      sub: { ko: "학부연구생", en: "Undergraduate researcher" },
      summary: {
        ko: ["암 미세환경이 줄기세포에 주는 영향을 RNA 수준에서 보는 예비 실험을 맡음"],
        en: ["Ran a preliminary study on how the tumor microenvironment affects stem cells at the RNA level"]
      }
    }
  ],
  // 교육 및 자격 (별도 섹션). 형식은 대외활동과 같음. 해외영업 방향에 맞춰 제조 관련 교육을 앞에 둔다.
  training: [
    {
      period: "2026.08 ~ 2026.11",
      title: { ko: "LS Jump Up AI 부트캠프", en: "LS Jump Up AI Bootcamp" },
      sub: { ko: "약 3개월 반 집중 과정, 2026.11 수료 예정", en: "3.5-month intensive, finishing Nov 2026" },
      summary: {
        ko: ["제조 데이터 분석부터 AI 에이전트까지 실습 위주로 배우는 중", "팀 프로젝트 3개: 설비 고장 예측과 발주 시점 대시보드(3인, 조장), 백신 품질 관리 시스템(3인, 기획), 피싱 대응 훈련 서비스(4인, 판정 규칙과 챗봇) (프로젝트 참고)"],
        en: ["Hands-on training from manufacturing data analysis to AI agents", "Three team projects: a failure prediction and ordering dashboard (3, team lead), a vaccine quality system (3, planning) and an anti-phishing drill service (4, judgement rules and chatbot) (see Projects)"]
      },
      details: {
        ko: ["배우는 내용: 제조업 디지털 전환, 데이터 분석과 시각화, 바이브 코딩 웹 개발, 생성형 AI 업무 자동화, AI 에이전트 구축", "첫 팀 프로젝트에서 데이터 전처리, 부품별 고장 예측 모델, 대시보드 화면 통합을 맡음", "센서 데이터 87.6만 행으로 만든 모델의 AUC는 채택 부품 기준 0.88~0.94"],
        en: ["Topics: manufacturing digital transformation, data analysis and visualization, vibe-coded web development, generative AI automation, AI agents", "In the first team project I handled preprocessing, per-part failure models and dashboard integration", "AUC 0.88~0.94 for the adopted parts, trained on 876k sensor rows"]
      }
    },
    {
      period: "2024.02 ~ 2024.03",
      summaryBio: { ko: ["관련 프로젝트: PharmaFlow Bio(백신 품질 이탈과 출하 검토 흐름 기획)"], en: ["Related project: PharmaFlow Bio (vaccine deviation and release review flow)"] },
      title: { ko: "GMP 전문가 양성과정", en: "GMP specialist training" },
      sub: { ko: "한국산업기술시험원(KTL), 192시간", en: "KTL, 192 hours" },
      summary: {
        ko: ["제조 품질관리 규정(GMP)과 품질관리 체계, 밸리데이션 이론을 배우고 분석 장비를 실습"],
        en: ["Manufacturing quality rules (GMP), quality systems and validation theory, with hands-on analytical equipment"]
      }
    },
    {
      period: "2026.07 ~ 2026.08",
      ed: "bio",
      title: { ko: "의약품 인허가(RA) 기본교육", en: "Pharmaceutical regulatory affairs basics" },
      sub: { ko: "한국제약바이오협회, 6시간", en: "Korea Pharmaceutical and Bio-Pharma Manufacturers Association, 6 hours" },
      summary: {
        ko: ["약사법 등 규제 법령, 인허가와 심사, 임상시험, 품질관리를 배움"],
        en: ["Drug regulation, approval and review, clinical trials and quality control"]
      }
    },
    {
      period: "2024.01",
      ed: "bio",
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
  schoolNote: { ko: "학점 3.75/4.5", en: "GPA 3.75/4.5" },
  languages: ["TOEIC 975", "OPIc AL"]
};
