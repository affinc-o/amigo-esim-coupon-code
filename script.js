'use strict';

// ─── FAQ DATA ────────────────────────────────────────────────────────────────
const faqs = [
  {
    q: 'Does Amigo eSIM offer a coupon code in 2026?',
    a: 'Yes. The current active Amigo eSIM coupon code is <strong>ESIMDUDE</strong>, which gives you 12% off all plans — including country, regional, and global options. This code is verified and working as of March 2026 for both new and existing users.',
  },
  {
    q: 'How much can I save with the Amigo eSIM coupon?',
    a: 'Savings scale with your plan cost. A $6 regional plan drops to ~$5.28 (saving $0.72), while a $25 global plan drops to ~$22 (saving $3). On higher-tier data plans priced at $30–$40+, you save $3.60 to $4.80+ per purchase — significant for frequent travelers who buy multiple plans per year.',
  },
  {
    q: 'Can I use the ESIMDUDE coupon on all plans?',
    a: 'Yes. Code ESIMDUDE applies to all Amigo eSIM plan types — country-specific, regional multi-country, and global plans. It also works on plans that include voice calls and SMS.',
  },
  {
    q: 'Is there a free trial for Amigo eSIM?',
    a: 'Amigo eSIM does not offer a traditional free trial. However, the combination of low entry pricing (plans from $5) and a money-back guarantee allows you to test the service with minimal financial risk.',
  },
  {
    q: 'Does Amigo eSIM have a money-back guarantee?',
    a: 'Yes. Amigo eSIM offers a money-back guarantee, providing a safety net if the service doesn\'t perform as expected. This makes trying it for the first time essentially risk-free.',
  },
  {
    q: 'Is Amigo eSIM worth the price in 2026?',
    a: 'For international travelers, absolutely. Traditional roaming rates from carriers run $10–$15/day — Amigo users typically save over 80% versus standard roaming. At 12% off with ESIMDUDE, the savings gap widens further. The multi-network 4G/5G access, hotspot on all plans, and no-account setup make it one of the more practical travel eSIM options available.',
  },
  {
    q: 'What\'s the cheapest way to get Amigo eSIM?',
    a: 'Use coupon code <strong>ESIMDUDE</strong> at checkout for 12% off any plan. Country plans start at $5 before the discount, making entry-level access under $5 with the code applied — one of the lowest-priced entry points among major travel eSIM providers.',
  },
];

// ─── COPY TO CLIPBOARD ───────────────────────────────────────────────────────
function copyToClipboard(text, btn, successText = 'Copied!') {
  navigator.clipboard.writeText(text).then(() => {
    if (!btn) return;
    const original = btn.innerHTML;
    btn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:14px;height:14px"><polyline points="20 6 9 17 4 12"/></svg> ${successText}`;
    setTimeout(() => { btn.innerHTML = original; }, 2000);
  }).catch(() => {
    // Fallback
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
  });
}

// ─── POPUP ───────────────────────────────────────────────────────────────────
function openPopup(code, link) {
  const popup = document.getElementById('coupon-popup');
  const codeEl = document.getElementById('popup-code-text');
  const dealBtn = document.getElementById('popup-deal-btn');
  if (!popup) return;
  if (codeEl) codeEl.textContent = code;
  if (dealBtn) dealBtn.href = link;
  popup.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
  // open affiliate link in new tab
  window.open(link, '_blank', 'noopener,noreferrer');
}

function closePopup() {
  const popup = document.getElementById('coupon-popup');
  if (popup) popup.classList.add('hidden');
  document.body.style.overflow = '';
}

// ─── FAQ ─────────────────────────────────────────────────────────────────────
function renderFaq() {
  const list = document.getElementById('faq-list');
  if (!list) return;
  list.innerHTML = faqs.map((f, i) => `
    <div class="faq-item" id="faq-${i}">
      <button class="faq-question" aria-expanded="false" data-index="${i}">
        ${f.q}
        <span class="faq-arrow">▾</span>
      </button>
      <div class="faq-answer">${f.a}</div>
    </div>
  `).join('');

  list.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const isOpen = item.classList.contains('open');
      list.querySelectorAll('.faq-item').forEach(el => {
        el.classList.remove('open');
        el.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
      });
      if (!isOpen) {
        item.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

// ─── MOBILE MENU ─────────────────────────────────────────────────────────────
function initMobileMenu() {
  const btn   = document.getElementById('mobile-menu-btn');
  const nav   = document.getElementById('mobile-nav');
  const iMenu = btn?.querySelector('.icon-menu');
  const iClose = btn?.querySelector('.icon-close');
  if (!btn || !nav) return;

  btn.addEventListener('click', () => {
    const isOpen = !nav.classList.contains('hidden');
    nav.classList.toggle('hidden');
    iMenu?.classList.toggle('hidden', !isOpen);
    iClose?.classList.toggle('hidden', isOpen);
  });

  nav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      nav.classList.add('hidden');
      iMenu?.classList.remove('hidden');
      iClose?.classList.add('hidden');
    });
  });
}

// ─── HEADER SCROLL ───────────────────────────────────────────────────────────
function initScrollHeader() {
  const h = document.getElementById('header');
  if (!h) return;
  window.addEventListener('scroll', () => {
    h.style.boxShadow = window.scrollY > 15 ? '0 2px 24px rgba(0,0,0,.35)' : '';
  }, { passive: true });
}

// ─── SMOOTH SCROLL ───────────────────────────────────────────────────────────
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const y = target.getBoundingClientRect().top + window.scrollY - 72;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    });
  });
}

// ─── SCROLL ANIMATIONS ───────────────────────────────────────────────────────
function initAnimations() {
  if (!('IntersectionObserver' in window)) return;
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.opacity = '1';
        e.target.style.transform = 'translateY(0)';
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.07 });

  document.querySelectorAll(
    '.feature-card, .step-item, .faq-item, .deal-cta-card, .pricing-note-card'
  ).forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(16px)';
    el.style.transition = 'opacity .42s ease, transform .42s ease';
    obs.observe(el);
  });
}

// ─── INIT ────────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  renderFaq();
  initMobileMenu();
  initScrollHeader();
  initSmoothScroll();
  setTimeout(initAnimations, 80);

  // Footer year
  const yr = document.getElementById('current-year');
  if (yr) yr.textContent = new Date().getFullYear();

  // ── Hero copy button ──
  document.getElementById('hero-copy-btn')?.addEventListener('click', function () {
    const code = this.dataset.code || 'ESIMDUDE';
    copyToClipboard(code, this, 'Copied!');
  });

  // ── Code apply copy buttons ──
  document.querySelectorAll('.code-apply-copy').forEach(btn => {
    btn.addEventListener('click', function () {
      const code = this.dataset.code || 'ESIMDUDE';
      navigator.clipboard.writeText(code).then(() => {
        const orig = this.textContent;
        this.textContent = 'Copied!';
        setTimeout(() => { this.textContent = orig; }, 2000);
      });
    });
  });

  // ── Popup ──
  document.getElementById('popup-close')?.addEventListener('click', closePopup);
  document.getElementById('popup-continue')?.addEventListener('click', closePopup);
  document.getElementById('coupon-popup')?.addEventListener('click', e => {
    if (e.target === document.getElementById('coupon-popup')) closePopup();
  });

  document.getElementById('popup-copy-btn')?.addEventListener('click', function () {
    const code = document.getElementById('popup-code-text')?.textContent || 'ESIMDUDE';
    copyToClipboard(code, this, 'Copied!');
    const dealBtn = document.getElementById('popup-deal-btn');
    if (dealBtn?.href) window.open(dealBtn.href, '_blank', 'noopener,noreferrer');
  });

  // Keyboard escape to close popup
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closePopup();
  });
});
