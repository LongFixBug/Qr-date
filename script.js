const envelope = document.getElementById("envelope");
const openBtn = document.getElementById("openBtn");

let opened = false;

// Heart animation colors matching the romantic palette:
const heartColors = [
  "#d6405f", "#c0354e", "#e85a71", "#7a3142", "#f391a0", "#ff758c", "#b83b5e", "#ff8fa3"
];

function createHeartSVG(color, size) {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", "0 0 24 24");
  svg.setAttribute("width", size);
  svg.setAttribute("height", size);
  svg.setAttribute("fill", color);
  svg.style.filter = "drop-shadow(0 2px 6px rgba(122, 49, 66, 0.3))";
  
  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute("d", "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z");
  svg.appendChild(path);
  return svg;
}

// Bắn chùm tim bay ra từ phong thư
function spawnHeartBurst(x, y, count = 25) {
  for (let i = 0; i < count; i++) {
    const heart = document.createElement("div");
    heart.className = "burst-heart";
    
    const size = Math.floor(Math.random() * 18) + 16;
    const color = heartColors[Math.floor(Math.random() * heartColors.length)];
    heart.appendChild(createHeartSVG(color, size));
    
    heart.style.left = `${x}px`;
    heart.style.top = `${y}px`;
    
    const angle = Math.random() * Math.PI * 2;
    const distance = Math.floor(Math.random() * 200) + 60;
    const tx = Math.cos(angle) * distance;
    const ty = Math.sin(angle) * distance - 80;
    const rot = (Math.random() - 0.5) * 80;
    const scale = (Math.random() * 0.7 + 0.8).toFixed(2);
    
    heart.style.setProperty("--tx", `${tx}px`);
    heart.style.setProperty("--ty", `${ty}px`);
    heart.style.setProperty("--rot", `${rot}deg`);
    heart.style.setProperty("--scale", scale);
    heart.style.animationDuration = `${(Math.random() * 0.8 + 1.5).toFixed(2)}s`;
    
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 2400);
  }
}

// Hiệu ứng tim bay nhẹ nhàng ở background
function spawnFloatingHeart() {
  const heart = document.createElement("div");
  heart.className = "floating-heart";
  
  const size = Math.floor(Math.random() * 16) + 14;
  const color = heartColors[Math.floor(Math.random() * heartColors.length)];
  heart.appendChild(createHeartSVG(color, size));
  
  const startX = Math.random() * (window.innerWidth - 40) + 20;
  heart.style.left = `${startX}px`;
  heart.style.bottom = "-30px";
  
  const swayX = (Math.random() - 0.5) * 120;
  const rot = (Math.random() - 0.5) * 60;
  const endScale = (Math.random() * 0.5 + 0.9).toFixed(2);
  const duration = (Math.random() * 2 + 3.8).toFixed(2);
  
  heart.style.setProperty("--sway-x", `${swayX}px`);
  heart.style.setProperty("--rot", `${rot}deg`);
  heart.style.setProperty("--end-scale", endScale);
  heart.style.animationDuration = `${duration}s`;
  
  document.body.appendChild(heart);
  setTimeout(() => heart.remove(), parseFloat(duration) * 1000 + 100);
}

// Khởi chạy tim bay lơ lửng đều đặn
setInterval(spawnFloatingHeart, 850);

// Chạm hoặc click bất kỳ đâu trên màn hình cũng thả tim bay lên
document.addEventListener("pointerdown", (e) => {
  if (e.target.closest("a")) return; // không can thiệp link bản đồ
  const heart = document.createElement("div");
  heart.className = "burst-heart";
  const size = Math.floor(Math.random() * 10) + 18;
  const color = heartColors[Math.floor(Math.random() * heartColors.length)];
  heart.appendChild(createHeartSVG(color, size));
  
  heart.style.left = `${e.clientX}px`;
  heart.style.top = `${e.clientY}px`;
  
  const tx = (Math.random() - 0.5) * 50;
  const ty = -(Math.random() * 60 + 50);
  heart.style.setProperty("--tx", `${tx}px`);
  heart.style.setProperty("--ty", `${ty}px`);
  heart.style.setProperty("--rot", `${(Math.random() - 0.5) * 40}deg`);
  heart.style.setProperty("--scale", "1.1");
  heart.style.animationDuration = "1.3s";
  
  document.body.appendChild(heart);
  setTimeout(() => heart.remove(), 1400);
});

function openLetter() {
  if (opened) return;
  opened = true;

  document.body.classList.add("letter-opening");
  envelope.classList.add("open");
  envelope.setAttribute("aria-expanded", "true");

  // 1) Gỡ con dấu trước & bung chùm tim đầu tiên
  window.setTimeout(() => {
    envelope.classList.add("unsealed");
    const rect = envelope.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height * 0.46;
    spawnHeartBurst(cx, cy, 26);
  }, 180);

  // 2) Sau đó mới lật nắp phong bì.
  window.setTimeout(() => {
    envelope.classList.add("flap-open");
  }, 760);

  // 3) Chờ nắp mở gần hết rồi mới kéo lá thư lên & bung tiếp chùm tim
  window.setTimeout(() => {
    envelope.classList.add("lift");
    const rect = envelope.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height * 0.35;
    spawnHeartBurst(cx, cy, 22);
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
