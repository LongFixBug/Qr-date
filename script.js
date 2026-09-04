const envelope = document.getElementById("envelope");
const openBtn = document.getElementById("openBtn");

let opened = false;

function openLetter() {
  if (opened) return;
  opened = true;

  document.body.classList.add("letter-opening");
  envelope.classList.add("open");
  envelope.setAttribute("aria-expanded", "true");

  // 1) Gỡ con dấu trước.
  window.setTimeout(() => {
    envelope.classList.add("unsealed");
  }, 180);

  // 2) Sau đó mới lật nắp phong bì.
  window.setTimeout(() => {
    envelope.classList.add("flap-open");
  }, 760);

  // 3) Chờ nắp mở gần hết rồi mới kéo lá thư lên.
  window.setTimeout(() => {
    envelope.classList.add("lift");
  }, 1650);

  // 4) Lá thư tách hẳn khỏi phong bì và bung thành tờ đầy đủ.
  window.setTimeout(() => {
    envelope.classList.add("extracted");
  }, 2850);

  // 5) Kết thúc animation rồi mới cho cuộn trang.
  window.setTimeout(() => {
    document.body.classList.remove("letter-opening");
    document.body.classList.add("letter-open");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, 3700);
}

envelope.addEventListener("click", openLetter);
openBtn.addEventListener("click", openLetter);

envelope.addEventListener("keydown", (event) => {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    openLetter();
  }
});
