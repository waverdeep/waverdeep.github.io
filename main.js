// Theme toggle
const themeToggle = document.querySelector('.theme-toggle');

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const root = document.documentElement;
    const current = root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
    const next = current === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    try {
      localStorage.setItem('theme', next);
    } catch (e) { /* storage unavailable */ }
  });
}

// Follow system theme changes unless user has explicitly chosen
const mql = window.matchMedia('(prefers-color-scheme: dark)');
mql.addEventListener('change', (e) => {
  let stored = null;
  try { stored = localStorage.getItem('theme'); } catch (err) {}
  if (!stored) {
    document.documentElement.setAttribute('data-theme', e.matches ? 'dark' : 'light');
  }
});

// Mobile nav toggle
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

if (navToggle) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  // Close menu on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
    });
  });
}

// Scroll fade-in animation
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.1 }
);

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// Active nav link highlight
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY + 100;

  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');

    if (scrollY >= top && scrollY < top + height) {
      navItems.forEach(a => {
        a.classList.remove('active');
        if (a.getAttribute('href') === '#' + id) {
          a.classList.add('active');
        }
      });
    }
  });
});

// Back link — 동일 오리진에서 유입되었으면 history.back()으로 스크롤 위치까지 복원.
// 새 탭·외부 유입·직접 접근이면 href 폴백으로 자연스럽게 이동.
const backLink = document.querySelector('.back-link');
if (backLink) {
  backLink.addEventListener('click', (e) => {
    let sameOriginReferrer = false;
    try {
      sameOriginReferrer =
        !!document.referrer &&
        new URL(document.referrer).origin === location.origin;
    } catch (err) { /* malformed referrer — ignore */ }

    if (sameOriginReferrer && history.length > 1) {
      e.preventDefault();
      history.back();
    }
  });
}
