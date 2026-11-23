// 전체 그리기, 언어 전환, 연락처 복사. 다른 js 파일을 모두 읽은 뒤 마지막에 실행한다.
function render() {
  document.documentElement.lang = lang;
  document.title = t("title");
  document.querySelectorAll("[data-i18n]").forEach(function (n) { n.textContent = t(n.getAttribute("data-i18n")); });
  // 구역 이름 "01 소개"를 큰 번호와 이름 두 줄로 나눠, 구역이 바뀌는 자리가 또렷하게 보이게 한다
  document.querySelectorAll("h2.label").forEach(function (n) {
    var m = /^(\d{2})\s+(.*)$/.exec(n.textContent); if (!m) return;
    n.textContent = ""; n.appendChild(el("span", "lb-no mono", m[1])); n.appendChild(el("span", "lb-name", m[2]));
  });
  document.querySelectorAll(".lang button").forEach(function (b) { b.setAttribute("aria-pressed", String(b.getAttribute("data-lang") === lang)); });
  renderHero(); renderAbout(); renderTimeline(); renderExperience(); renderActivities();
  renderMain(); equalizeTops(); renderIndex(); renderAutoLog(); renderShelf(false);
  renderReframe(); renderJourney(); initMotion();
  document.getElementById("email").textContent = D.email;
  document.getElementById("mail-link").href = "mailto:" + D.email;
  document.getElementById("foot").textContent = t("foot", { date: dot(window.SITE_UPDATED) });
}

document.querySelectorAll(".lang button").forEach(function (b) {
  b.addEventListener("click", function () {
    lang = b.getAttribute("data-lang");
    try { localStorage.setItem("lang", lang); } catch (e) {}
    render();
  });
});

document.getElementById("copy-email").addEventListener("click", function () {
  var note = document.getElementById("copy-note");
  function selectIt() {
    var r = document.createRange(); r.selectNodeContents(document.getElementById("email"));
    var s = window.getSelection(); s.removeAllRanges(); s.addRange(r);
    note.textContent = t("contact.selected");
  }
  try { navigator.clipboard.writeText(D.email).then(function () { note.textContent = t("contact.copied"); }, selectIt); }
  catch (e) { selectIt(); }
});

render();
