const envelope = document.getElementById("envelope");
const openBtn = document.getElementById("openBtn");

let opened = false;

function openLetter() {
  if (opened) return;
  opened = true;

  document.body.classList.add("letter-opening");
  envelope.classList.add("open");
  envelope.setAttribute("aria-expanded", "true");

  // 1) Nắp thư mở ra, con dấu biến mất, lá thư nhô lên.
  window.setTimeout(() => {
    envelope.classList.add("extracted");
  }, 900);

  // 2) Sau khi lá thư đã tách khỏi phong bì, chuyển sang trạng thái đọc.
  window.setTimeout(() => {
    document.body.classList.remove("letter-opening");
    document.body.classList.add("letter-open");

    const paper = envelope.querySelector(".paper");
    if (paper) paper.scrollTop = 0;
  }, 1500);
}

envelope.addEventListener("click", openLetter);
openBtn.addEventListener("click", openLetter);

envelope.addEventListener("keydown", (event) => {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    openLetter();
  }
});
