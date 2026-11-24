// 따라다니는 목차(2026-11-24): 화면 왼쪽에 구역 번호와 이름을 세로로 두고, 스크롤하면 지금 읽는 구역을 표시한다.
// 누르면 그 구역으로 간다. 위쪽 메뉴 줄 대신 쓴다. 휴대폰에서는 위쪽에 가로로 밀어 보는 줄로 바뀐다.
var tocObs = null;

function renderToc() {
  var old = document.getElementById("toc"); if (old) old.remove();
  var secs = Array.prototype.slice.call(document.querySelectorAll("main > section[id]")).filter(function (s) { return s.querySelector("h2.label") && !s.hidden; });
  if (!secs.length) return;
  var nav = el("nav", "toc"); nav.id = "toc"; nav.setAttribute("aria-label", t("toc.label"));
  var ol = el("ol");
  var links = secs.map(function (s) {
    var h = s.querySelector("h2.label"), a = el("a"); a.href = "#" + s.id;
    var no = h.querySelector(".lb-no"), nm = h.querySelector(".lb-name");
    a.appendChild(el("span", "toc-no mono", no ? no.textContent : ""));
    a.appendChild(el("span", "toc-name", nm ? nm.textContent : h.textContent));
    var li = el("li"); li.appendChild(a); ol.appendChild(li);
    return a;
  });
  nav.appendChild(ol);
  document.body.appendChild(nav);
  watchToc(secs, links);
}

// 화면 가운데 줄을 지나는 구역을 '지금 읽는 곳'으로 표시한다
function watchToc(secs, links) {
  if (tocObs) tocObs.disconnect();
  if (!("IntersectionObserver" in window)) return;
  function mark(id) {
    links.forEach(function (a) {
      var on = a.getAttribute("href") === "#" + id;
      a.classList.toggle("on", on);
      if (on) { a.setAttribute("aria-current", "location"); if (window.innerWidth < 900) a.scrollIntoView({ block: "nearest", inline: "center" }); }
      else a.removeAttribute("aria-current");
    });
  }
  tocObs = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) { if (e.isIntersecting) mark(e.target.id); });
  }, { rootMargin: "-45% 0px -54% 0px" });
  secs.forEach(function (s) { tocObs.observe(s); });
}
