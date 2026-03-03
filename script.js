// Greeting functionality
function sayHello() {
  const name = document.getElementById("nameInput").value;
  const greeting = document.getElementById("greeting");
  if (name.trim() === "") {
    greeting.textContent = "Please enter your name!";
  } else {
    greeting.textContent = `Hello, ${name}! Nice to meet you.`;
  }
}

// Image gallery functionality
const images = [
  "https://source.unsplahttps://www.publicdomainpictures.net/pictures/240000/velka/tree-landscape.jpg",
  "https://tse1.mm.bing.net/th/id/OIP.AzKGVH3XhgtmFDwsLV1VGAHaE7?pid=ImgDet&w=181&h=120&c=7&dpr=1.5&o=7&rm=3"
];

const gallery = document.getElementById('gallery');
let currentIndex = 0;

function populateGallery() {
  images.forEach((src, i) => {
    const section = document.createElement('section');
    section.className = 'slide';
    section.id = `slide-${i}`;

    const img = document.createElement('img');
    img.src = src;
    img.alt = `Tree photo ${i + 1}`;

    section.appendChild(img);
    gallery.appendChild(section);
  });
}

function updateIndicator() {
  const el = document.getElementById('positionIndicator');
  el.textContent = `${currentIndex + 1} / ${images.length}`;
}

function showIndex(i) {
  if (i < 0) i = 0;
  if (i >= images.length) i = images.length - 1;
  currentIndex = i;
  const el = document.getElementById(`slide-${i}`);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
  updateIndicator();
}

function next() { showIndex(currentIndex + 1); }
function prev() { showIndex(currentIndex - 1); }

// Keep track of which slide is centered using IntersectionObserver
function attachObserver() {
  const options = { root: gallery, threshold: 0.6 };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id; // slide-X
        const idx = parseInt(id.split('-')[1], 10);
        if (!Number.isNaN(idx)) {
          currentIndex = idx;
          updateIndicator();
        }
      }
    });
  }, options);

  document.querySelectorAll('.slide').forEach(s => observer.observe(s));
}

// Keyboard navigation
function attachKeyboard() {
  window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown' || e.key === 'PageDown') next();
    if (e.key === 'ArrowUp' || e.key === 'PageUp') prev();
  });
}

// Wire up UI
document.addEventListener('DOMContentLoaded', () => {
  populateGallery();
  updateIndicator();
  attachObserver();
  attachKeyboard();

  document.getElementById('nextBtn').addEventListener('click', next);
  document.getElementById('prevBtn').addEventListener('click', prev);
  document.getElementById('helloBtn').addEventListener('click', sayHello);
  // allow Enter to trigger greeting
  document.getElementById('nameInput').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') sayHello();
  });
});
