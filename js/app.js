// 전체 그리기, 언어 전환, 연락처 복사. 다른 js 파일을 모두 읽은 뒤 마지막에 실행한다.
function render() {
  document.documentElement.lang = lang;
  document.title = t("title");
  document.querySelectorAll("[data-i18n]").forEach(function (n) { n.textContent = t(n.getAttribute("data-i18n")); });
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
