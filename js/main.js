
(() => {
  const header = document.querySelector('[data-header]');
  const toggle = document.querySelector('[data-menu-toggle]');
  const mobileMenu = document.querySelector('[data-mobile-menu]');

  const closeMenu = () => {
    if (!toggle || !mobileMenu) return;
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Otevřít menu');
    mobileMenu.hidden = true;
    header?.classList.remove('menu-open');
    document.body.style.overflow = '';
  };

  toggle?.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') !== 'true';
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Zavřít menu' : 'Otevřít menu');
    mobileMenu.hidden = !open;
    header?.classList.toggle('menu-open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });
  mobileMenu?.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));

  window.addEventListener('scroll', () => header?.classList.toggle('scrolled', window.scrollY > 8), {passive:true});

  // Active nav works for direct file opening and production paths.
  const path = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  const pageMap = {'index.html':'home','':'home','sluzby.html':'services','sluzby':'services','galerie.html':'gallery','fotogalerie':'gallery','cenik.html':'pricing','cenik':'pricing','kontakt.html':'contact','kontakt':'contact'};
  const active = pageMap[path] || document.documentElement.dataset.page;
  document.querySelectorAll('[data-nav]').forEach(a => {
    if (a.dataset.nav === active) a.setAttribute('aria-current','page'); else a.removeAttribute('aria-current');
  });

  document.querySelectorAll('[data-year]').forEach(el => el.textContent = new Date().getFullYear());

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const reveals = [...document.querySelectorAll('.reveal')];
  if (reduceMotion || !('IntersectionObserver' in window)) reveals.forEach(el => el.classList.add('is-visible'));
  else {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
    }), {threshold:.12, rootMargin:'0px 0px -35px'});
    reveals.forEach(el => observer.observe(el));
  }

  // Pricing accordions
  document.querySelectorAll('.price-accordion-trigger').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const panel = trigger.nextElementSibling;
      const open = trigger.getAttribute('aria-expanded') === 'true';
      trigger.setAttribute('aria-expanded', String(!open));
      if (panel) panel.style.display = open ? 'none' : 'block';
    });
  });

  // Gallery lightbox
  const modal = document.querySelector('[data-lightbox-modal]');
  const items = [...document.querySelectorAll('[data-lightbox]')];
  let current = 0, previousFocus = null;
  const image = modal?.querySelector('[data-lightbox-image]');
  const caption = modal?.querySelector('[data-lightbox-caption]');
  const show = i => {
    if (!modal || !items.length) return;
    current = (i + items.length) % items.length;
    const item = items[current];
    const src = item.dataset.src || item.querySelector('img')?.src;
    const alt = item.dataset.alt || item.querySelector('img')?.alt || '';
    image.src = src; image.alt = alt; caption.textContent = alt;
  };
  const openLightbox = i => { previousFocus = document.activeElement; show(i); modal.hidden = false; document.body.style.overflow='hidden'; modal.querySelector('.lightbox-close')?.focus(); };
  const closeLightbox = () => { if (!modal) return; modal.hidden=true; document.body.style.overflow=''; previousFocus?.focus?.(); };
  items.forEach((item,i) => item.addEventListener('click',()=>openLightbox(i)));
  modal?.querySelector('.lightbox-close')?.addEventListener('click',closeLightbox);
  modal?.querySelector('.lightbox-prev')?.addEventListener('click',()=>show(current-1));
  modal?.querySelector('.lightbox-next')?.addEventListener('click',()=>show(current+1));
  modal?.addEventListener('click', e => { if (e.target === modal) closeLightbox(); });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') { if (modal && !modal.hidden) closeLightbox(); else closeMenu(); }
    if (modal && !modal.hidden && e.key === 'ArrowRight') show(current+1);
    if (modal && !modal.hidden && e.key === 'ArrowLeft') show(current-1);
  });
  let touchStartX = null;
  modal?.addEventListener('touchstart', e => touchStartX = e.changedTouches[0].clientX, {passive:true});
  modal?.addEventListener('touchend', e => { if (touchStartX === null) return; const dx=e.changedTouches[0].clientX-touchStartX; if (Math.abs(dx)>50) show(current + (dx<0?1:-1)); touchStartX=null; }, {passive:true});

  // Progressive archive gallery. Only the first 15 thumbnails appear initially.
  const more = document.querySelector('[data-gallery-more]');
  const archiveImages = [...document.querySelectorAll('[data-archive-grid] > button')];
  const galleryCount = document.querySelector('[data-gallery-count]');
  let revealed = 15;
  more?.addEventListener('click', () => {
    revealed = Math.min(revealed + 18, archiveImages.length);
    archiveImages.forEach((item, index) => { item.hidden = index >= revealed; });
    if (galleryCount) galleryCount.textContent = `Ukázáno ${revealed} z ${archiveImages.length} fotografií`;
    if (revealed >= archiveImages.length) more.hidden = true;
  });

  // Static GitHub Pages cannot deliver mail by themselves. Opening a composed
  // e-mail is an honest, usable fallback without a third-party collection endpoint.
  const form = document.querySelector('[data-contact-form]');
  form?.addEventListener('submit', e => {
    e.preventDefault();
    let valid = true;
    form.querySelectorAll('[required]').forEach(field => {
      const label = field.closest('label');
      label?.classList.remove('has-error');
      const error = label?.querySelector('.field-error');
      if (error) error.textContent = '';
      const empty = field.type === 'checkbox' ? !field.checked : !field.value.trim();
      const invalidEmail = field.type === 'email' && field.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value);
      if (empty || invalidEmail) {
        valid = false;
        label?.classList.add('has-error');
        if (error) error.textContent = invalidEmail ? 'Zkontrolujte formát e-mailu.' : 'Toto pole je povinné.';
      }
    });
    const status = form.querySelector('[data-form-status]');
    if (!valid) {
      if (status) { status.className = 'form-status'; status.textContent = 'Zkontrolujte prosím označená pole.'; }
      form.querySelector('.has-error input,.has-error select,.has-error textarea')?.focus();
      return;
    }
    const data = new FormData(form);
    const value = key => String(data.get(key) || '').trim();
    const subject = `Poptávka zahradnických služeb – ${value('location')}`;
    const body = [
      'Dobrý den, rád/a bych poptal/a zahradnické práce.', '',
      `Jméno: ${value('name')}`,
      `Telefon: ${value('phone')}`,
      `E-mail: ${value('email')}`,
      `Služba: ${value('service')}`,
      `Lokalita: ${value('location')}`, '',
      'Popis zakázky:', value('message'), '',
      'Děkuji.'
    ].join('\n');
    const uri = `mailto:info@zahrada-liberec.cz?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    if (status) {
      status.className = 'form-status demo';
      status.innerHTML = 'Otevírá se vaše e-mailová aplikace s připravenou poptávkou. <strong>E-mail je třeba ještě ručně odeslat.</strong> Pokud se nic neotevře, napište na <a href="mailto:info@zahrada-liberec.cz">info@zahrada-liberec.cz</a>.';
    }
    window.location.href = uri;
  });
})();
