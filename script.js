// Sidebar toggle
const menuBtn = document.getElementById('menu-toggle');
const sidebar = document.getElementById('sidebar');
const content = document.getElementById('content');

menuBtn.addEventListener('click', () => {
  const open = sidebar.classList.toggle('active');
  sidebar.setAttribute('aria-hidden', !open);
  // shift content for accessibility/focus
  if(open) content.style.marginLeft = '300px'; else content.style.marginLeft = '0';
});

// Keyboard: close sidebar with ESC
document.addEventListener('keydown', (e) => {
  if(e.key === 'Escape' && sidebar.classList.contains('active')) {
    sidebar.classList.remove('active');
    sidebar.setAttribute('aria-hidden', 'true');
    content.style.marginLeft = '0';
  }
});

// PROJECT THUMB CLICK -> open gallery modal (carousel)
const thumbnails = document.querySelectorAll('.project-thumb');
const modal = document.getElementById('gallery-modal') || document.createElement('div');
let galleryState = { images: [], index: 0 };

thumbnails.forEach(thumb => {
  thumb.addEventListener('click', () => {
    openGalleryFromThumb(thumb);
  });
  thumb.addEventListener('keypress', (e) => {
    if(e.key === 'Enter') openGalleryFromThumb(thumb);
  });
});
function openGalleryFromThumb(thumb){
  const images = JSON.parse(thumb.dataset.images || '[]');
  const title = thumb.dataset.title || '';
  const desc = thumb.dataset.desc || '';
  if(images.length === 0) return;
  openGallery(images, title, desc, 0);
}

function openGallery(images, title, desc, startIndex=0){
  galleryState.images = images; galleryState.index = startIndex;
  // create modal if not present
  let gm = document.getElementById('gallery-modal');
  if(!gm) return;
  gm.classList.add('open');
  gm.setAttribute('aria-hidden','false');
  document.body.style.overflow = 'hidden';
  updateGallery();
  document.getElementById('gallery-title').textContent = title;
  document.getElementById('gallery-desc').textContent = desc;
}

function updateGallery(){
  const imgEl = document.getElementById('gallery-image');
  imgEl.src = galleryState.images[galleryState.index];
  imgEl.alt = document.getElementById('gallery-title').textContent + ' — imagen ' + (galleryState.index+1);
}

// controls
document.getElementById('prev').addEventListener('click', () => {
  galleryState.index = (galleryState.index - 1 + galleryState.images.length) % galleryState.images.length;
  updateGallery();
});
document.getElementById('next').addEventListener('click', () => {
  galleryState.index = (galleryState.index + 1) % galleryState.images.length;
  updateGallery();
});
document.querySelector('.gallery-close').addEventListener('click', closeGallery);

// close when clicking outside
document.getElementById('gallery-modal').addEventListener('click', (e) => {
  if(e.target.id === 'gallery-modal') closeGallery();
});

function closeGallery(){
  const gm = document.getElementById('gallery-modal');
  gm.classList.remove('open');
  gm.setAttribute('aria-hidden','true');
  document.body.style.overflow = '';
}

// FORM handling (simple UX)
const contactForm = document.getElementById('contact-form');
const formMsg = document.getElementById('form-msg');
if(contactForm){
  contactForm.addEventListener('submit', (e) => {
    // default Formspree works by form action — here we add UX message
    formMsg.textContent = 'Enviando…';
    setTimeout(()=>{ formMsg.textContent = 'Formulario enviado. Gracias.'; contactForm.reset(); }, 800);
  });
}

// small: animate hero card based on mouse (parallax)
const cardHero = document.getElementById('card-hero');
if(cardHero){
  document.addEventListener('mousemove', (e) => {
    const x = (e.clientX - window.innerWidth/2) / 60;
    const y = (e.clientY - window.innerHeight/2) / 60;
    cardHero.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  });
}
