// ============ NAV TOGGLE (mobile) ============
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Tutup menu mobile setelah klik salah satu link
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
  });
});

// ============ NAVBAR STYLE ON SCROLL ============
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    navbar.style.borderBottomColor = 'rgba(139, 149, 167, 0.32)';
  } else {
    navbar.style.borderBottomColor = 'rgba(139, 149, 167, 0.18)';
  }
});

// ============ LIGHTBOX SERTIFIKAT ============
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxClose = document.getElementById('lightboxClose');
const certItems = document.querySelectorAll('.cert-item');

certItems.forEach(item => {
  item.addEventListener('click', () => {
    const imgSrc = item.getAttribute('data-img');
    lightboxImg.setAttribute('src', imgSrc);
    lightboxImg.setAttribute('alt', item.querySelector('.cert-name').textContent);
    lightbox.classList.add('active');
  });
});

function closeLightbox() {
  lightbox.classList.remove('active');
  lightboxImg.setAttribute('src', '');
}

lightboxClose.addEventListener('click', closeLightbox);

lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeLightbox();
});
