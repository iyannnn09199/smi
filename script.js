/* ================= REVEAL ================= */
const reveals = document.querySelectorAll(".reveal");
function revealOnScroll() {
  const h = window.innerHeight;
  reveals.forEach(el => {
    if (el.getBoundingClientRect().top < h - 100) {
      el.classList.add("active");
    }
  });
}
window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);


/* ================= IMAGE MODAL ADVANCED ================= */
document.addEventListener("DOMContentLoaded", () => {
  const images = Array.from(document.querySelectorAll(".card img"));
  const modal = document.getElementById("imageModal");
  const modalImg = document.getElementById("modalImage");
  const closeBtn = document.querySelector(".close-modal");
  const nextBtn = document.querySelector(".next");
  const prevBtn = document.querySelector(".prev");

  const zoomInBtn = document.getElementById("zoomIn");
  const zoomOutBtn = document.getElementById("zoomOut");
  const resetZoomBtn = document.getElementById("resetZoom");

  let currentIndex = 0;
  let scale = 1;
  let startX = 0;

  function openModal(index) {
    currentIndex = index;
    modalImg.src = images[index].src;
    scale = 1;
    modalImg.style.transform = "scale(1)";
    modal.classList.add("active");
  }

  function showNext() {
    currentIndex = (currentIndex + 1) % images.length;
    openModal(currentIndex);
  }

  function showPrev() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    openModal(currentIndex);
  }

  images.forEach((img, i) => {
    img.addEventListener("click", () => openModal(i));
  });

  closeBtn.onclick = () => modal.classList.remove("active");
  nextBtn.onclick = showNext;
  prevBtn.onclick = showPrev;

  /* ZOOM */
  zoomInBtn.onclick = () => {
    scale += 0.2;
    modalImg.style.transform = `scale(${scale})`;
  };

  zoomOutBtn.onclick = () => {
    scale = Math.max(1, scale - 0.2);
    modalImg.style.transform = `scale(${scale})`;
  };

  resetZoomBtn.onclick = () => {
    scale = 1;
    modalImg.style.transform = "scale(1)";
  };

  /* SCROLL ZOOM */
  modalImg.addEventListener("wheel", e => {
    e.preventDefault();
    scale += e.deltaY * -0.001;
    scale = Math.min(Math.max(1, scale), 3);
    modalImg.style.transform = `scale(${scale})`;
  });

  /* KEYBOARD */
  document.addEventListener("keydown", e => {
    if (!modal.classList.contains("active")) return;
    if (e.key === "Escape") modal.classList.remove("active");
    if (e.key === "ArrowRight") showNext();
    if (e.key === "ArrowLeft") showPrev();
  });

  /* SWIPE MOBILE */
  modalImg.addEventListener("touchstart", e => {
    startX = e.touches[0].clientX;
  });

  modalImg.addEventListener("touchend", e => {
    let diff = e.changedTouches[0].clientX - startX;
    if (diff > 60) showPrev();
    if (diff < -60) showNext();
  });
});
