// 사이드 프로젝트 책등과 표지 디자인
  /* ---------- 책등·표지 디자인 ----------
     전용 디자인 6종 + 새 결과물용 generic(팔레트·무늬·모티프로 조합). 글자는 모두 esc() 처리 */
  var MONO = "'IBM Plex Mono', monospace", GOTHIC = "'Gothic A1', sans-serif", HAN = "'Black Han Sans', sans-serif", SERIF = "'Hahmlet', serif";
  var SPINE_BOX = "position:relative;width:72px;border-radius:4px 4px 0 0;overflow:hidden;font-family:" + GOTHIC + ";color:#fff;box-shadow:inset 7px 0 9px -7px #FFFFFF55, inset -10px 0 12px -8px #00000066;";
  var COVER_BOX = "position:relative;width:320px;height:452px;border-radius:3px 10px 10px 3px;overflow:hidden;font-family:" + GOTHIC + ";box-shadow:inset 12px 0 14px -10px #00000070, inset 2px 0 0 #FFFFFF30;";
  var V = "writing-mode:vertical-rl;";

  var PATTERNS = {
    dots: function (a) { return "background-image:radial-gradient(" + a + " 2px, transparent 2.6px);background-size:11px 11px;"; },
    stripes: function (a) { return "background-image:repeating-linear-gradient(0deg, " + a + "33 0 2px, transparent 2px 9px);"; },
    lanes: function (a) { return "background-image:repeating-linear-gradient(90deg, transparent 0 17px, " + a + "55 17px 18px);"; },
    grid: function (a) { return "background-image:linear-gradient(" + a + "33 1px, transparent 1px), linear-gradient(90deg, " + a + "33 1px, transparent 1px);background-size:12px 12px;"; },
    stars: function () { return "background-image:radial-gradient(#FFFFFF 1px, transparent 1.6px), radial-gradient(#FFFFFFAA .8px, transparent 1.4px);background-size:23px 31px, 17px 13px;background-position:3px 5px, 11px 2px;"; },
    hazard: function (a, bg) { return "background-image:repeating-linear-gradient(45deg, " + a + " 0 8px, " + bg + " 8px 16px);"; },
    airmail: function (a, bg) { return "background-image:repeating-linear-gradient(180deg, #C8372D 0 12px, " + bg + " 12px 18px, #2B4C9A 18px 30px, " + bg + " 30px 36px);"; },
    none: function () { return ""; }
  };

  function spineHTML(p) {
    if (isNote(p)) return noteSpineHTML(p);
    var h = p.spineH || 400, title = esc(L(p.label) || L(p.title)), no = esc(p._no); // 책등에는 누구나 알아볼 분류명(label)
    var box = SPINE_BOX + "height:" + h + "px;";
    switch (p.design) {
      case "bomber":
        return '<div class="spine" style="' + box + 'display:flex;flex-direction:column;background:#24206B">' +
          '<div style="height:70px;flex:none;background:#FF3D8B;display:flex;align-items:center;justify-content:center"><span style="width:44px;height:44px;border-radius:50%;border:2.5px solid #FFD43B;color:#FFD43B;display:flex;align-items:center;justify-content:center;font:400 14px/1 ' + HAN + ';transform:rotate(-12deg)">合格</span></div>' +
          '<div style="flex:1;display:flex;align-items:center;justify-content:center;min-height:0"><span style="' + V + 'font:400 20px/1 ' + HAN + ';color:#FFD43B;text-shadow:2px 2px 0 #FF3D8B;letter-spacing:.02em">' + title + '</span></div>' +
          '<div style="height:54px;flex:none;' + PATTERNS.dots("#FFD43B") + 'border-top:2px solid #FFD43B"></div>' +
          '<div style="height:34px;flex:none;background:#FFD43B;color:#24206B;display:flex;align-items:center;justify-content:center;font:500 12px/1 ' + MONO + '">' + no + '</div></div>';
      case "p0":
        return '<div class="spine" style="' + box + 'display:flex;flex-direction:column;background-color:#1C1859;' + PATTERNS.lanes("#38F2C0") + '">' +
          '<div style="height:110px;flex:none;position:relative;border-bottom:2px solid #FFE14D">' +
          '<span style="position:absolute;left:4px;top:14px;width:12px;height:7px;border-radius:2px;background:#FF3D8B"></span><span style="position:absolute;left:22px;top:38px;width:12px;height:7px;border-radius:2px;background:#FFE14D"></span><span style="position:absolute;left:40px;top:24px;width:12px;height:7px;border-radius:2px;background:#38F2C0"></span><span style="position:absolute;left:58px;top:64px;width:12px;height:7px;border-radius:2px;background:#9B8CFF"></span><span style="position:absolute;left:22px;top:84px;width:12px;height:7px;border-radius:2px;background:#FF3D8B"></span></div>' +
          '<div style="flex:1;display:flex;align-items:center;justify-content:center;min-height:0"><span style="' + V + 'font:900 19px/1 ' + GOTHIC + ';letter-spacing:.02em">' + title + '</span></div>' +
          '<div style="height:40px;flex:none;display:flex;align-items:center;justify-content:center;color:#38F2C0;font:500 12px/1 ' + MONO + '">♪ ' + no + '</div></div>';
      case "beat":
        return '<div class="spine" style="' + box + 'display:flex;flex-direction:column;background:#121528">' +
          '<div style="height:76px;flex:none;display:flex;align-items:center;justify-content:center"><span style="width:48px;height:48px;border-radius:50%;border:3px solid #E5483A;color:#E5483A;box-shadow:inset 0 0 0 2px #121528, inset 0 0 0 3.5px #E5483A;display:flex;align-items:center;justify-content:center;font:400 15px/1 ' + HAN + '">合格</span></div>' +
          '<div style="flex:1;display:flex;align-items:center;justify-content:center;gap:4px;min-height:0"><span style="' + V + 'font:400 21px/1 ' + HAN + ';color:#FFE14D">' + title + '</span><span style="' + V + 'font:500 9.5px/1 ' + MONO + ';color:#8E93C2;letter-spacing:.2em">PASS BEAT</span></div>' +
          '<div style="height:46px;flex:none;' + PATTERNS.hazard("#FFE14D", "#121528") + '"></div>' +
          '<div style="height:32px;flex:none;display:flex;align-items:center;justify-content:center;color:#FFE14D;font:500 12px/1 ' + MONO + '">' + no + '</div></div>';
      case "inbox":
        return '<div class="spine" style="' + box + 'display:flex;background:#F2EEE5">' +
          '<div style="width:7px;flex:none;' + PATTERNS.airmail(null, "#F2EEE5") + '"></div>' +
          '<div style="flex:1;display:flex;flex-direction:column;align-items:center;padding:14px 0 12px;gap:12px;color:#1F2A5C;min-width:0">' +
          '<svg width="26" height="20" viewBox="0 0 26 20" fill="none" stroke="#1F2A5C" stroke-width="1.8" aria-hidden="true"><rect x="1" y="1" width="24" height="18" rx="2"></rect><path d="M1 3l12 9 12-9"></path></svg>' +
          '<span style="flex:1;' + V + 'font:900 19px/1 ' + GOTHIC + ';letter-spacing:.02em">' + title + '</span>' +
          '<span style="' + V + 'font:500 9px/1 ' + MONO + ';letter-spacing:.2em;color:#C8372D">AIR MAIL</span><span style="font:500 11px/1 ' + MONO + '">' + no + '</span></div>' +
          '<div style="width:7px;flex:none;background-image:repeating-linear-gradient(180deg, #2B4C9A 0 12px, #F2EEE5 12px 18px, #C8372D 18px 30px, #F2EEE5 30px 36px)"></div></div>';
      case "timeline":
        return '<div class="spine" style="' + box + 'display:flex;flex-direction:column;align-items:center;background-color:#262A5E;background-image:repeating-linear-gradient(0deg, #FFFFFF08 0 1px, transparent 1px 3px);padding:16px 0 14px;gap:10px;color:#EDE3C8">' +
          '<div style="width:52px;height:5px;flex:none;border-top:1px solid #C9A55C;border-bottom:1px solid #C9A55C"></div><span style="font:500 10px/1 ' + MONO + ';color:#C9A55C;letter-spacing:.12em">VOL.I</span>' +
          '<span style="flex:1;' + V + 'font:500 20px/1 ' + SERIF + ';letter-spacing:.06em">' + title + '</span>' +
          '<span style="width:9px;height:9px;border-radius:50%;background:#C9A55C;flex:none"></span><div style="width:52px;height:5px;flex:none;border-top:1px solid #C9A55C;border-bottom:1px solid #C9A55C"></div>' +
          '<span style="font:500 11px/1 ' + MONO + ';color:#C9A55C">' + no + '</span></div>';
      case "daily":
        return '<div class="spine" style="' + box + 'display:flex;flex-direction:column;align-items:center;background-color:#0F1A3A;' + PATTERNS.stars() + 'padding:18px 0 14px;gap:14px">' +
          '<span style="width:30px;height:30px;border-radius:50%;box-shadow:inset 9px -5px 0 0 #F2C14E;transform:rotate(-20deg);flex:none"></span>' +
          '<span style="flex:1;' + V + 'font:800 18px/1 ' + GOTHIC + ';letter-spacing:.02em">' + title + '</span>' +
          '<span style="font:500 11px/1 ' + MONO + ';color:#F2C14E">02:00</span>' +
          '<span style="font:500 11px/1 ' + MONO + ';color:#F2C14E">' + no + '</span></div>';
      default:
        var pal = p.palette || { bg: "#2A2F55", ink: "#F4F1EA", accent: "#F2B84B" };
        var pat = (PATTERNS[p.pattern] || PATTERNS.none)(pal.accent, pal.bg);
        return '<div class="spine" style="' + box + 'display:flex;flex-direction:column;align-items:center;background:' + pal.bg + ';color:' + pal.ink + ';padding:0 0 12px;gap:12px">' +
          '<div style="width:100%;height:64px;flex:none;' + pat + 'border-bottom:2px solid ' + pal.accent + ';display:flex;align-items:center;justify-content:center">' +
          (p.stamp ? '<span style="width:40px;height:40px;border-radius:50%;border:2.5px solid ' + pal.accent + ';background:' + pal.bg + ';color:' + pal.accent + ';display:flex;align-items:center;justify-content:center;font:400 14px/1 ' + HAN + '">' + esc(p.stamp) + '</span>' : '') + '</div>' +
          '<span style="flex:1;' + V + 'font:900 19px/1 ' + GOTHIC + ';letter-spacing:.02em">' + title + '</span>' +
          '<span style="font:500 11px/1 ' + MONO + ';color:' + pal.accent + '">' + no + '</span></div>';
    }
  }

  function barcode(color) {
    return '<span style="width:74px;height:26px;background-image:repeating-linear-gradient(90deg, ' + color + ' 0 2px, transparent 2px 4px, ' + color + ' 4px 5px, transparent 5px 8px, ' + color + ' 8px 11px, transparent 11px 12px)"></span>';
  }
  function coverImg(p, style) {
    return p.cover ? '<img src="' + esc(p.cover) + '" alt="" style="display:block;' + style + '">' : '<span style="display:block;' + style + 'background:linear-gradient(135deg,#3B3591,#24206B)"></span>';
  }

  // 실행 가능한 결과물의 표지: 꾸민 그림 대신 실제 화면(라이브 축소본)을 보여줌
  var COVER_COLORS = {
    bomber: { bg: "#24206B", ink: "#FFFFFF", accent: "#FFD43B" },
    p0: { bg: "#1C1859", ink: "#FFFFFF", accent: "#38F2C0" },
    beat: { bg: "#121528", ink: "#FFFFFF", accent: "#FFE14D" },
    timeline: { bg: "#262A5E", ink: "#EDE3C8", accent: "#C9A55C" }
  };
  // 조사 브리프 사이트 전용 표지: 결론 카드와 숫자 칩을 크게 세운 디자인
  function briefCoverHTML(p) {
    var chip = function (n, s, bg, ink) { return '<div style="flex:1;background:' + bg + ';color:' + ink + ';border-radius:8px;padding:8px 6px;text-align:center"><div style="font:900 24px/1 ' + MONO + '">' + n + '</div><div style="font:600 10.5px/1.3 ' + GOTHIC + ';margin-top:3px">' + s + '</div></div>'; };
    var en = lang === "en";
    return '<div class="cover cover-live" style="' + COVER_BOX + 'background-color:#14204A;background-image:radial-gradient(#FFFFFF12 1.4px, transparent 1.8px), linear-gradient(160deg,#1B2C66 0%,#0F1838 70%);background-size:16px 16px,100% 100%;color:#F5EFDF;display:flex;flex-direction:column;cursor:pointer">' +
      '<div style="padding:18px 20px 0 28px;display:flex;justify-content:space-between;font:500 10.5px/1.3 ' + MONO + ';letter-spacing:.08em;color:#FFD94D"><span>' + (en ? "TREND BRIEF" : "트렌드 브리프") + '</span><span>No.' + esc(p._no) + '</span></div>' +
      '<div style="padding:12px 20px 0 28px;font:900 31px/1.2 ' + GOTHIC + ';letter-spacing:-.03em">' + (en ? "Is it obvious?<br>Show the evidence." : "뻔한 답 말고,<br><span style=\"color:#FFD94D\">근거</span>를 보여줘") + '</div>' +
      '<div style="position:relative;margin:16px 16px 0 24px;transform:rotate(-1.6deg)">' +
      '<div class="cover-screen" style="position:relative;height:198px;border-radius:8px;overflow:hidden;background:#fff;border:3px solid #FFD94D;box-shadow:6px 6px 0 #070C22"></div>' +
      '<span style="position:absolute;right:-8px;top:-14px;background:#FFD94D;color:#14204A;border-radius:999px;padding:4px 11px;font:900 11px/1.2 ' + GOTHIC + ';transform:rotate(6deg);box-shadow:2px 2px 0 #070C22">' + (en ? "Sample data" : "샘플 데이터") + '</span></div>' +
      '<div style="display:flex;gap:8px;margin:18px 18px 0 26px">' + chip("4", en ? "trends" : "트렌드", "#4F63C4", "#fff") + chip("13", en ? "sources" : "근거", "#F5EFDF", "#14204A") + chip("3", en ? "to verify" : "원문 확인", "#FFD94D", "#14204A") + '</div>' +
      '<div style="padding:12px 18px 14px 28px;margin-top:auto"><div style="font:900 17px/1.25 ' + GOTHIC + '">' + esc(L(p.title)) + '</div>' +
      '<div style="display:flex;justify-content:space-between;margin-top:6px;font:600 12px/1.3 ' + GOTHIC + ';color:#FFD94D"><span>' + (en ? "▶ Click to try" : "▶ 눌러서 직접 보기") + '</span><span style="font:500 10.5px/1.3 ' + MONO + ';color:#F5EFDF99">' + esc(dot(p.date)) + '</span></div></div></div>';
  }
  function liveCoverHTML(p) {
    if (p.design === "brief") return briefCoverHTML(p);
    var c = COVER_COLORS[p.design] || p.palette || { bg: "#1B2550", ink: "#FFFFFF", accent: "#F2B84B" };
    return '<div class="cover cover-live" style="' + COVER_BOX + 'background:' + c.bg + ';color:' + c.ink + ';display:flex;flex-direction:column;cursor:pointer">' +
      '<div style="padding:16px 18px 10px 26px;display:flex;justify-content:space-between;gap:8px;font:500 10.5px/1.3 ' + MONO + ';letter-spacing:.06em;color:' + c.accent + '"><span>' + esc(L(p.label) || "") + '</span><span>No.' + esc(p._no) + '</span></div>' +
      '<div class="cover-screen" style="position:relative;margin:0 14px 0 22px;height:236px;border-radius:8px;overflow:hidden;background:#000;border:2px solid ' + c.accent + '"></div>' +
      '<div style="padding:14px 18px 16px 26px;display:flex;flex-direction:column;gap:6px;flex:1">' +
      '<div style="font:900 24px/1.25 ' + GOTHIC + ';letter-spacing:-.02em">' + esc(L(p.title)) + '</div>' +
      '<div style="font:500 11px/1.4 ' + MONO + ';opacity:.75">' + esc(dot(p.date)) + '</div>' +
      '<div style="margin-top:auto;font:600 12.5px/1.3 ' + GOTHIC + ';color:' + c.accent + '">' + (lang === "en" ? "▶ Click the screen to run" : "▶ 화면을 누르면 실행") + '</div></div></div>';
  }
  function mountCoverScreen(wrap, p) {
    var box = wrap.querySelector(".cover-screen");
    if (!box) return;
    var f = document.createElement("iframe");
    var w = box.clientWidth || 280, scale = w / 1280;
    f.setAttribute("aria-hidden", "true"); f.tabIndex = -1;
    f.style.cssText = "position:absolute;top:0;left:0;border:0;width:1280px;height:" + Math.round(236 / scale) + "px;transform:scale(" + scale + ");transform-origin:0 0;pointer-events:none;background:#000";
    loadDoc(p.link).then(function (html) { f.srcdoc = html; }, function () { f.src = p.link; });
    box.appendChild(f);
    wrap.addEventListener("click", function () { openPlayer(p); });
  }

  function coverHTML(p) {
    if (isNote(p)) return noteCoverHTML(p);
    if (isLocal(p.link)) return liveCoverHTML(p);
    var title = esc(L(p.title)), no = esc(p._no), date = esc(dot(p.date));
    var head = function (left, color) { return '<div style="display:flex;justify-content:space-between;font:500 10.5px/1.3 ' + MONO + ';letter-spacing:.08em;color:' + color + '"><span>' + left + '</span><span>No.' + no + '</span></div>'; };
    switch (p.design) {
      case "bomber":
        return '<div class="cover" style="' + COVER_BOX + 'background-color:#24206B;background-image:radial-gradient(#FFFFFF14 1.5px, transparent 2px);background-size:14px 14px;padding:22px 22px 18px 28px;display:flex;flex-direction:column;gap:14px;color:#FFD43B">' +
          head(lang === "en" ? "Gaeun Yoon's portfolio" : "윤가은 포트폴리오", "#FFD43B") +
          '<div style="font:400 50px/1.02 ' + HAN + ';text-shadow:3px 3px 0 #FF3D8B, 6px 6px 0 #0A0830">' + title + '</div>' +
          '<div style="position:relative;margin-top:4px">' + coverImg(p, "width:100%;aspect-ratio:16/10;object-fit:cover;border:3px solid #FFD43B;border-radius:8px;transform:rotate(2.5deg);box-shadow:6px 6px 0 #0A0830;") +
          '<span style="position:absolute;right:-6px;top:-26px;width:72px;height:72px;border-radius:50%;background:#FF3D8B;color:#fff;display:flex;align-items:center;justify-content:center;text-align:center;font:900 12.5px/1.2 ' + GOTHIC + ';transform:rotate(14deg);box-shadow:3px 3px 0 #0A0830">' + (lang === "en" ? "Dopamine<br>guaranteed" : "도파민<br>보장") + '</span></div>' +
          '<div style="margin-top:auto;display:flex;align-items:flex-end;justify-content:space-between"><span style="font:500 10.5px/1.4 ' + MONO + ';color:#FFFFFFB0">' + date + '<br>' + (lang === "en" ? "3 min · collect endings" : "3분 · 엔딩 수집형") + '</span>' + barcode("#FFD43B") + '</div></div>';
      case "p0":
        var note = function (l, tp, c) { return '<span style="position:absolute;left:' + l + 'px;top:' + tp + 'px;width:56px;height:14px;border-radius:4px;background:' + c + ';border:2px solid #0A0830"></span>'; };
        return '<div class="cover" style="' + COVER_BOX + 'background:#1C1859;padding:22px 22px 18px 28px;display:flex;flex-direction:column;gap:12px;color:#fff">' +
          head(lang === "en" ? "PHASE 0 · RHYTHM ENGINE" : "PHASE 0 · 리듬 엔진", "#38F2C0") +
          '<div style="position:relative;height:190px;flex:none;border-radius:10px;overflow:hidden;background-color:#231C8A;background-image:repeating-linear-gradient(90deg, transparent 0 66px, #FFFFFF22 66px 67px)">' +
          note(6, 18, "#FF3D8B") + note(73, 52, "#FFE14D") + note(140, 8, "#38F2C0") + note(207, 96, "#9B8CFF") + note(73, 120, "#FFE14D") +
          '<span style="position:absolute;left:0;right:0;bottom:30px;height:4px;background:#FFE14D;box-shadow:0 0 12px #FFE14D"></span></div>' +
          '<div style="font:900 26px/1.15 ' + GOTHIC + ';letter-spacing:-.03em">' + title + '</div>' +
          '<div style="display:flex;gap:6px;flex-wrap:wrap;font:500 11px/1.5 ' + MONO + '"><span style="border:1.5px solid #38F2C0;color:#38F2C0;border-radius:999px;padding:2px 10px">' + (lang === "en" ? "Easy" : "쉬움") + ' 120</span><span style="background:#38F2C0;color:#0A0830;border-radius:999px;padding:2px 10px">' + (lang === "en" ? "Normal" : "보통") + ' 155</span><span style="border:1.5px solid #38F2C0;color:#38F2C0;border-radius:999px;padding:2px 10px">' + (lang === "en" ? "Hard" : "어려움") + ' 185</span></div>' +
          '<div style="margin-top:auto;display:flex;justify-content:space-between;font:500 10.5px/1.4 ' + MONO + ';color:#FFFFFFB0"><span>♪ ' + (lang === "en" ? "Can-can 16 bars × 3" : "캉캉 16마디 × 3절") + '</span><span>' + date + '</span></div></div>';
      case "beat":
        var stage = function (s, on) { return '<span style="' + (on ? 'background:#FFE14D;color:#121528;' : 'border:1px solid #FFE14D88;') + 'border-radius:4px;padding:5px 7px">' + s + '</span>'; };
        var st = lang === "en" ? ["Docs", "Aptitude", "Round 1", "Final"] : ["서류", "인적성", "1차", "임원"];
        return '<div class="cover" style="' + COVER_BOX + 'background:#121528;display:flex;flex-direction:column;color:#FFE14D">' +
          '<div style="position:relative;height:200px;flex:none">' + coverImg(p, "width:100%;height:100%;object-fit:cover;opacity:.85;") +
          '<span style="position:absolute;inset:0;background:linear-gradient(180deg, transparent 40%, #121528 100%)"></span>' +
          '<span style="position:absolute;left:22px;bottom:-30px;width:66px;height:66px;border-radius:50%;border:3px solid #E5483A;background:#121528;box-shadow:inset 0 0 0 3px #121528, inset 0 0 0 5px #E5483A;color:#E5483A;display:flex;align-items:center;justify-content:center;font:400 20px/1 ' + HAN + ';transform:rotate(-10deg)">合格</span></div>' +
          '<div style="padding:40px 22px 0 28px;display:flex;flex-direction:column;gap:8px"><div style="font:400 46px/1 ' + HAN + '">' + title + '</div>' +
          '<div style="font:500 10.5px/1 ' + MONO + ';letter-spacing:.24em;color:#8E93C2">PASS BEAT · 4 STAGES · No.' + no + '</div>' +
          '<div style="display:flex;flex-wrap:wrap;align-items:center;gap:5px;margin-top:8px;font:700 12px/1 ' + GOTHIC + ';color:#fff">' + stage(st[0]) + '<span style="color:#FFE14D">›</span>' + stage(st[1]) + '<span style="color:#FFE14D">›</span>' + stage(st[2]) + '<span style="color:#FFE14D">›</span>' + stage(st[3], true) + '</div></div>' +
          '<div style="margin-top:auto;height:22px;' + PATTERNS.hazard("#FFE14D", "#121528").replace("8px", "10px").replace("8px 16px", "10px 20px") + '"></div></div>';
      case "inbox":
        var dots = "", pat = "oocobocooboocboocobo";
        for (var i = 0; i < 20; i++) {
          var k = pat[i];
          dots += k === "o" ? '<span style="width:12px;height:12px;border-radius:50%;border:2px solid #2B4C9A;box-sizing:border-box"></span>' : '<span style="width:12px;height:12px;border-radius:50%;background:' + (k === "c" ? "#C8372D" : "#1F2A5C") + '"></span>';
        }
        return '<div class="cover" style="' + COVER_BOX + 'padding:10px;background-image:repeating-linear-gradient(135deg, #C8372D 0 14px, #F2EEE5 14px 22px, #2B4C9A 22px 36px, #F2EEE5 36px 44px)">' +
          '<div style="position:relative;height:100%;box-sizing:border-box;background:#F7F4EC;padding:18px 18px 16px 22px;display:flex;flex-direction:column;gap:12px;color:#1F2A5C">' +
          '<div style="display:flex;justify-content:space-between;align-items:flex-start"><span style="font:500 10.5px/1.4 ' + MONO + ';letter-spacing:.08em">PAR AVION<br>No.' + no + '</span>' +
          '<span style="width:70px;height:84px;border:2px dashed #C8372D;outline:3px solid #F7F4EC;background:#FBE9E4;display:flex;flex-direction:column;align-items:center;justify-content:center;color:#C8372D;transform:rotate(4deg)"><span style="font:500 20px/1 ' + MONO + '">2,173</span><span style="font:700 9.5px/1.3 ' + GOTHIC + '">' + (lang === "en" ? "threads" : "통의 대화") + '</span></span></div>' +
          '<div style="font:900 30px/1.18 ' + GOTHIC + ';letter-spacing:-.03em">' + title + '</div>' +
          '<div style="display:grid;grid-template-columns:repeat(10,12px);gap:7px;margin-top:4px">' + dots + '</div>' +
          '<span style="font:500 11px/1.5 ' + MONO + ';color:#4A5280">' + (lang === "en" ? "hollow = mail one filter removes" : "빈 점 = 필터 하나로 사라지는 메일") + '</span>' +
          '<span style="position:absolute;right:18px;bottom:54px;width:84px;height:84px;border-radius:50%;border:2px solid #2B4C9A88;color:#2B4C9A;display:flex;align-items:center;justify-content:center;text-align:center;font:500 9.5px/1.4 ' + MONO + ';transform:rotate(-16deg)">GMAIL<br>' + date + '</span>' +
          '<span style="margin-top:auto;font:700 11.5px/1.4 ' + GOTHIC + ';color:#C8372D">' + esc(L(p.note)) + '</span></div></div>';
      case "timeline":
        var tl = "";
        for (var j = 0; j < 4; j++) tl += '<span style="width:10px;height:10px;border-radius:50%;' + (j % 2 ? "border:1.5px solid #C9A55C;box-sizing:border-box" : "background:#C9A55C") + '"></span><span style="width:1px;height:22px;background:#C9A55C"></span>';
        return '<div class="cover" style="' + COVER_BOX + 'background-color:#262A5E;background-image:repeating-linear-gradient(0deg, #FFFFFF07 0 1px, transparent 1px 3px), repeating-linear-gradient(90deg, #00000010 0 1px, transparent 1px 4px);padding:18px 18px 18px 24px;color:#EDE3C8">' +
          '<div style="height:100%;box-sizing:border-box;border:1px solid #C9A55C;outline:1px solid #C9A55C66;outline-offset:-6px;padding:26px 20px;display:flex;flex-direction:column;align-items:center;gap:14px;text-align:center">' +
          '<span style="font:500 10px/1 ' + MONO + ';letter-spacing:.3em;color:#C9A55C">VOL. I · No.' + no + '</span><span style="width:40px;height:1px;background:#C9A55C"></span>' +
          '<div style="font:500 32px/1.25 ' + SERIF + ';letter-spacing:.04em">' + title + '</div>' +
          '<div style="flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center">' + tl + '<span style="width:14px;height:14px;border-radius:50%;background:#C9A55C;box-shadow:0 0 0 4px #C9A55C33"></span></div>' +
          '<span style="font:300 12.5px/1.5 ' + SERIF + ';color:#D9CCAA">' + (lang === "en" ? "Scattered documents, one timeline" : "흩어진 문서를 한 권의 연표로") + '</span>' +
          '<span style="font:500 10px/1 ' + MONO + ';color:#C9A55C">' + esc(p.note ? L(p.note) : (lang === "en" ? "Click any year to unfold" : "누르면 펼쳐지는 연표")) + '</span></div></div>';
      case "daily":
        return '<div class="cover" style="' + COVER_BOX + 'background-color:#0F1A3A;background-image:radial-gradient(#FFFFFF 1px, transparent 1.6px), radial-gradient(#FFFFFF99 .8px, transparent 1.4px), radial-gradient(ellipse at 70% 20%, #2A3B7A 0%, transparent 60%);background-size:41px 37px, 23px 19px, 100% 100%;background-position:7px 9px, 15px 4px, 0 0;padding:22px 22px 18px 28px;display:flex;flex-direction:column;gap:10px;color:#fff">' +
          head(lang === "en" ? "Published nightly" : "매일 새벽 자동 발행", "#F2C14E") +
          '<span style="align-self:flex-end;width:92px;height:92px;border-radius:50%;box-shadow:inset 26px -14px 0 0 #F2C14E, 0 0 40px #F2C14E33;transform:rotate(-24deg);margin:6px 6px 0 0"></span>' +
          '<div style="font:500 76px/1 ' + MONO + ';color:#F2C14E;letter-spacing:-.04em">02:00</div>' +
          '<div style="font:900 24px/1.25 ' + GOTHIC + ';letter-spacing:-.02em">' + title + '</div>' +
          '<span style="font:500 12.5px/1.5 ' + GOTHIC + ';color:#B8C2E8">' + (lang === "en" ? "A shelf that fills while I sleep" : "제가 자는 동안 채워지는 서가") + '</span>' +
          '<div style="margin-top:auto;border-top:1px dashed #F2C14E66;padding-top:10px;display:flex;justify-content:space-between;font:500 10.5px/1.4 ' + MONO + ';color:#B8C2E8"><span>' + esc(L(p.note)) + '</span><span>' + date + '</span></div></div>';
      default:
        var pal = p.palette || { bg: "#2A2F55", ink: "#F4F1EA", accent: "#F2B84B" };
        var pt = (PATTERNS[p.pattern] || PATTERNS.none)(pal.accent, pal.bg);
        return '<div class="cover" style="' + COVER_BOX + 'background:' + pal.bg + ';color:' + pal.ink + ';display:flex;flex-direction:column">' +
          (p.cover ? '<div style="position:relative;height:190px;flex:none">' + coverImg(p, "width:100%;height:100%;object-fit:cover;") + '</div>' : '<div style="height:150px;flex:none;' + pt + 'border-bottom:2px solid ' + pal.accent + '"></div>') +
          '<div style="padding:20px 22px 18px 28px;display:flex;flex-direction:column;gap:10px;flex:1">' +
          '<span style="font:500 10.5px/1.3 ' + MONO + ';letter-spacing:.08em;color:' + pal.accent + '">No.' + no + ' · ' + date + '</span>' +
          (p.motif ? '<div style="font:500 56px/1 ' + MONO + ';color:' + pal.accent + ';letter-spacing:-.03em">' + esc(p.motif) + '</div>' : '') +
          '<div style="font:900 26px/1.2 ' + GOTHIC + ';letter-spacing:-.02em">' + title + '</div>' +
          '<div style="margin-top:auto;display:flex;justify-content:flex-end">' + barcode(pal.accent) + '</div></div></div>';
    }
  }

