const envelope = document.getElementById("envelope");
const openBtn = document.getElementById("openBtn");

let opened = false;

function openLetter() {
  if (opened) return;
  opened = true;

  envelope.classList.add("open");
  envelope.setAttribute("aria-expanded", "true");
  document.body.classList.add("letter-open");

  window.setTimeout(() => {
    envelope.classList.add("extracted");

    window.setTimeout(() => {
      const paper = envelope.querySelector(".paper");
      if (paper) paper.scrollTop = 0;
    }, 150);
  }, 1050);
}

envelope.addEventListener("click", openLetter);
openBtn.addEventListener("click", openLetter);

envelope.addEventListener("keydown", (event) => {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    openLetter();
  }
});
