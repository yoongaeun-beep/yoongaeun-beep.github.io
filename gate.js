// 임시 안내창: 영상을 보러 온 사람만 영상으로 가고, 나머지는 포트폴리오를 그대로 봅니다.
// 정해 둔 날짜가 지나면 아무 일도 하지 않습니다(안내창이 뜨지 않습니다).
(function () {
  var EXPIRE = new Date('2026-12-31T23:59:59+09:00').getTime();
  if (Date.now() > EXPIRE) return;
  try { if (sessionStorage.getItem('gate-seen')) return; } catch (e) { /* 저장 못 해도 계속 */ }

  var css = document.createElement('style');
  css.textContent = '#gate-wrap{position:fixed;inset:0;z-index:99999;background:rgba(15,12,9,.72);display:flex;align-items:center;justify-content:center;padding:20px;font-family:"Noto Sans KR","Malgun Gothic",sans-serif}' +
    '#gate-box{background:#fffaf0;color:#2b2118;border-radius:22px;max-width:440px;width:100%;padding:28px 26px 22px;box-shadow:0 20px 60px rgba(0,0,0,.4)}' +
    '#gate-box h2{margin:0 0 10px;font-size:22px;line-height:1.35}#gate-box p{margin:0 0 20px;font-size:15px;line-height:1.6;color:#5a4a3c}' +
    '#gate-box button{font:inherit;font-weight:800;font-size:16px;border:0;border-radius:999px;padding:13px 18px;cursor:pointer;width:100%;margin-top:10px}' +
    '#gate-go{background:#F4A93A;color:#17120E}#gate-skip{background:#efe6d6;color:#2b2118}';
  document.head.appendChild(css);

  var wrap = document.createElement('div');
  wrap.id = 'gate-wrap'; wrap.setAttribute('role', 'dialog'); wrap.setAttribute('aria-modal', 'true'); wrap.setAttribute('aria-label', '영상 안내');
  wrap.innerHTML = '<div id="gate-box"><h2>2분 영상을 보러 오셨나요?</h2>' +
    '<p>면세점 매장 속 고객 여정을 게임으로 풀어 본 영상입니다. 소리가 나오니 이어폰이나 스피커를 확인해 주세요.</p>' +
    '<button id="gate-go" type="button">영상 보러 왔어요</button>' +
    '<button id="gate-skip" type="button">포트폴리오를 둘러볼게요</button></div>';
  document.body.appendChild(wrap);

  function close() { try { sessionStorage.setItem('gate-seen', '1'); } catch (e) { /* 무시 */ } wrap.remove(); }
  document.getElementById('gate-go').onclick = function () { try { sessionStorage.setItem('gate-seen', '1'); } catch (e) { /* 무시 */ } location.href = 'play/'; };
  document.getElementById('gate-skip').onclick = close;
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });
  document.getElementById('gate-go').focus();
})();
