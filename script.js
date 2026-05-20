/* ════════════════════════════════════════════════════════════
   ERASMUS+ CNNT – Main Script
   Galeria citește din galerie.js (generat de update-galerie.ps1)
   ════════════════════════════════════════════════════════════ */

// ─── Navbar scroll effect ──────────────────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
}, { passive: true });

// ─── Hamburger menu ────────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const navLinksEl = document.querySelector('.nav-links');
hamburger.addEventListener('click', () => {
  const open = navLinksEl.style.display === 'flex';
  navLinksEl.style.display = open ? 'none' : 'flex';
  if (!open) {
    Object.assign(navLinksEl.style, {
      flexDirection: 'column',
      position: 'fixed',
      top: '72px',
      left: '0',
      right: '0',
      background: 'rgba(10,15,30,0.97)',
      padding: '24px',
      gap: '20px',
      backdropFilter: 'blur(20px)',
      zIndex: '999',
    });
  }
});
navLinksEl.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    // Only collapse the menu on mobile (when hamburger button is visible)
    if (window.getComputedStyle(hamburger).display !== 'none') {
      navLinksEl.style.display = 'none';
    }
  });
});

// ─── Animated particles in hero ───────────────────────────
(function spawnParticles() {
  const container = document.getElementById('particles');
  const colors = ['#FFCC00', '#4facfe', '#ffffff', '#0052cc', '#f093fb'];
  for (let i = 0; i < 40; i++) {
    const p = document.createElement('div');
    p.classList.add('particle');
    const size = Math.random() * 6 + 2;
    p.style.cssText = `
      width:${size}px; height:${size}px;
      left:${Math.random() * 100}%;
      background:${colors[Math.floor(Math.random() * colors.length)]};
      animation-duration:${Math.random() * 12 + 8}s;
      animation-delay:${Math.random() * 10}s;
    `;
    container.appendChild(p);
  }
})();

// ─── Intersection Observer (scroll animations) ─────────────
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('aos-visible'); observer.unobserve(e.target); }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });
document.querySelectorAll('[data-aos]').forEach(el => observer.observe(el));

// ─── Categoria auto-detectată din numele fișierului ────────
// Cuvinte cheie pentru auto-tagging pe baza numelui fișierului
const TAG_KEYWORDS = {
  cultura:  ['castel','muzeu','catedrala','biserica','monument','oras','piata','apeduct','ruine','arhitectura','amfiteatru','mozaic','cetate','palat'],
  natura:   ['plaja','mare','munte','padure','lac','apus','rasarit','peisaj','natura','parc','flori','troodos','retiro'],
  grup:     ['grup','prieteni','elevi','echipa','selfie','foto','together','team','noi','clasa'],
  scoala:   ['scoala','liceu','atelier','lectie','workshop','prezentare','diploma','erasmus','seminar','curs'],
};

function autoTag(filename) {
  const name = filename.toLowerCase();
  const tags = [];
  for (const [tag, keywords] of Object.entries(TAG_KEYWORDS)) {
    if (keywords.some(kw => name.includes(kw))) tags.push(tag);
  }
  return tags.length > 0 ? tags : ['grupa']; // fallback
}

function enrichEntry(entry) {
  return {
    src: entry.src,
    caption: entry.caption || '',
    tags: entry.tags || autoTag(entry.src.split('/').pop()),
  };
}

// ─── Placeholder când nu există poze ──────────────────────
function renderEmptyState(container, folder) {
  container.innerHTML = `
    <div class="gallery-empty">
      <div class="gallery-empty-icon">📁</div>
      <h4>Nicio fotografie încă</h4>
      <p>Adaugă imagini în folderul <code>${folder}</code> și rulează <strong>update-galerie.ps1</strong>.</p>
    </div>
  `;
}

// ─── Gallery Engine ────────────────────────────────────────
const INITIAL_LOAD   = 30;
const LOAD_MORE_COUNT = 24;

class Gallery {
  constructor(containerId, rawData, btnId) {
    this.container = document.getElementById(containerId);
    this.btn       = document.getElementById(btnId);
    this.data      = (rawData || []).map(enrichEntry);
    this.filtered  = this.data;
    this.shown     = 0;
    this.allItems  = [];

    if (this.data.length === 0) {
      const folder = containerId.includes('cipru') ? 'poze\\cipru' : 'poze\\spania';
      renderEmptyState(this.container, folder);
      this.btn.style.display = 'none';
      return;
    }

    this.render(INITIAL_LOAD);

    this.btn.addEventListener('click', () => this.render(LOAD_MORE_COUNT));
  }

  applyFilter(tag) {
    this.filtered = (tag === 'all') ? this.data : this.data.filter(d => d.tags.includes(tag));
    this.shown = 0;
    this.container.innerHTML = '';
    this.allItems = [];
    this.render(INITIAL_LOAD);
  }

  render(count) {
    const slice = this.filtered.slice(this.shown, this.shown + count);
    slice.forEach((item, i) => {
      const globalIdx = this.shown + i;
      this.container.appendChild(this.createItem(item, globalIdx));
      this.allItems.push({ src: item.src, caption: item.caption });
    });
    this.shown += slice.length;
    this.btn.style.display = this.shown >= this.filtered.length ? 'none' : 'block';

    if (this.filtered.length === 0) {
      this.container.innerHTML = '<p style="color:rgba(255,255,255,.5);text-align:center;padding:32px">Nicio poză pentru filtrul selectat.</p>';
    }
  }

  createItem(item, index) {
    const div = document.createElement('div');
    div.className = 'gallery-item';
    div.innerHTML = `
      <img src="${item.src}"
           alt="${item.caption}"
           loading="lazy"
           onerror="this.parentElement.style.display='none'" />
      <div class="gallery-item-overlay">
        <span class="gallery-item-caption">${item.caption}</span>
      </div>
      <div class="gallery-item-zoom">🔍</div>
    `;
    div.addEventListener('click', () => openLightbox(this.allItems, index));
    return div;
  }
}

// ─── Init galleries ────────────────────────────────────────
let galleryCipru, galleriaSpania;

document.addEventListener('DOMContentLoaded', () => {
  // galleryDataCipru / galleryDataSpania vin din galerie.js
  galleryCipru   = new Gallery('gallery-cipru',  typeof galleryDataCipru  !== 'undefined' ? galleryDataCipru  : [], 'load-more-cipru');
  galleriaSpania = new Gallery('gallery-spania', typeof galleryDataSpania !== 'undefined' ? galleryDataSpania : [], 'load-more-spania');

  // Filters – Cipru
  document.querySelectorAll('#cipru .filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('#cipru .filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      galleryCipru.applyFilter(btn.dataset.filter);
    });
  });

  // Filters – Spania
  document.querySelectorAll('#spania .filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('#spania .filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      galleriaSpania.applyFilter(btn.dataset.filter);
    });
  });
});

// ─── Lightbox ──────────────────────────────────────────────
let lbItems = [], lbIndex = 0;

function openLightbox(items, index) {
  lbItems = items; lbIndex = index;
  showLb();
  document.getElementById('lightbox').classList.add('active');
  document.body.style.overflow = 'hidden';
}
function showLb() {
  const item = lbItems[lbIndex];
  if (!item) return;
  const img = document.getElementById('lb-img');
  img.src = item.src;
  img.alt = item.caption;
  document.getElementById('lb-caption').textContent = item.caption;
  document.getElementById('lb-counter').textContent = `${lbIndex + 1} / ${lbItems.length}`;
}
function closeLightbox() {
  document.getElementById('lightbox').classList.remove('active');
  document.body.style.overflow = '';
}

document.getElementById('lb-close').addEventListener('click', closeLightbox);
document.getElementById('lb-overlay').addEventListener('click', closeLightbox);
document.getElementById('lb-prev').addEventListener('click', () => { lbIndex = (lbIndex - 1 + lbItems.length) % lbItems.length; showLb(); });
document.getElementById('lb-next').addEventListener('click', () => { lbIndex = (lbIndex + 1) % lbItems.length; showLb(); });
document.addEventListener('keydown', e => {
  if (!document.getElementById('lightbox').classList.contains('active')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft')  { lbIndex = (lbIndex - 1 + lbItems.length) % lbItems.length; showLb(); }
  if (e.key === 'ArrowRight') { lbIndex = (lbIndex + 1) % lbItems.length; showLb(); }
});

// Touch swipe
let touchStartX = 0;
document.getElementById('lightbox').addEventListener('touchstart', e => { touchStartX = e.changedTouches[0].screenX; }, { passive: true });
document.getElementById('lightbox').addEventListener('touchend', e => {
  const dx = e.changedTouches[0].screenX - touchStartX;
  if (Math.abs(dx) > 50) {
    lbIndex = dx < 0 ? (lbIndex + 1) % lbItems.length : (lbIndex - 1 + lbItems.length) % lbItems.length;
    showLb();
  }
});

// ─── Review Tabs ───────────────────────────────────────────
document.querySelectorAll('.review-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.review-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    const target = tab.dataset.tab;
    document.getElementById('reviews-elevi').classList.toggle('hidden', target !== 'elevi');
    document.getElementById('reviews-profesori').classList.toggle('hidden', target !== 'profesori');
  });
});

// ─── Animated counters ─────────────────────────────────────
function animateCounter(el, target, duration = 1500) {
  const start = performance.now();
  const span = el.querySelector('span');
  const update = (time) => {
    const p = Math.min((time - start) / duration, 1);
    const v = Math.round((1 - Math.pow(1 - p, 3)) * target);
    el.childNodes[0].textContent = v;
    if (p < 1) requestAnimationFrame(update);
  };
  el.childNodes[0].textContent = '0';
  requestAnimationFrame(update);
}

const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const num = entry.target.querySelector('.stat-number');
      if (num && !num.dataset.animated) {
        num.dataset.animated = '1';
        const raw = parseInt(num.textContent.replace(/\D/g, ''));
        if (!isNaN(raw) && num.childNodes.length) animateCounter(num, raw);
      }
      statObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });
document.querySelectorAll('.stat-card').forEach(c => statObserver.observe(c));

// ─── Active nav link ───────────────────────────────────────
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => { if (window.scrollY >= sec.offsetTop - 120) current = sec.id; });
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.classList.toggle('active-link', a.getAttribute('href') === `#${current}`);
  });
}, { passive: true });

// ─── Theme Toggle ──────────────────────────────────────────
const themeToggle = document.getElementById('theme-toggle');
const htmlEl = document.documentElement;

// Function to set theme
function setTheme(theme) {
  htmlEl.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
}

// Init theme from LocalStorage or default to dark
const savedTheme = localStorage.getItem('theme') || 'dark';
setTheme(savedTheme);

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const currentTheme = htmlEl.getAttribute('data-theme');
    setTheme(currentTheme === 'dark' ? 'light' : 'dark');
  });
}

// ─── Scroll Top Button ─────────────────────────────────────
const scrollTopBtn = document.getElementById('scroll-top');
if (scrollTopBtn) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  }, { passive: true });

  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
