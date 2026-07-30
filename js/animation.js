class ScrollReveal {
  constructor() {
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          if (entry.target.dataset.revealType === 'skill') {
            this.animateSkillBar(entry.target);
          }
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    this.init();
  }

  init() {
    document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
      this.observer.observe(el);
    });
  }

  animateSkillBar(skillCard) {
    const progress = skillCard.querySelector('.skill-progress');
    if (progress && !progress.dataset.animated) {
      const targetWidth = progress.dataset.progress || '0%';
      progress.style.width = targetWidth;
      progress.dataset.animated = 'true';
    }
  }
}

class CountUp {
  constructor() {
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.counted) {
          this.animateCount(entry.target);
        }
      });
    }, { threshold: 0.5 });
  }

  init() {
    document.querySelectorAll('.stat-number').forEach(el => {
      this.observer.observe(el);
    });
  }

  animateCount(element) {
    const text = element.textContent.trim();
    const match = text.match(/(\d+)\+?/);
    if (!match) return;

    const target = parseInt(match[1]);
    const hasPlus = text.includes('+');
    const suffix = hasPlus ? '+' : '';
    let current = 0;
    const increment = Math.ceil(target / 60);
    element.dataset.counted = 'true';

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      element.textContent = current + suffix;
    }, 20);
  }
}

class MagneticButton {
  constructor() {
    document.querySelectorAll('.magnetic-btn').forEach(btn => {
      btn.addEventListener('mousemove', (e) => this.move(e, btn));
      btn.addEventListener('mouseleave', (e) => this.leave(e, btn));
    });
  }

  move(e, btn) {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
  }

  leave(e, btn) {
    btn.style.transform = '';
  }
}

class RippleEffect {
  constructor() {
    document.querySelectorAll('.btn').forEach(btn => {
      btn.addEventListener('click', (e) => this.ripple(e, btn));
    });
  }

  ripple(e, btn) {
    const rect = btn.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;

    btn.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  }
}

class SmoothScroll {
  constructor() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => this.scroll(e, anchor));
    });
  }

  scroll(e, anchor) {
    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;

    const offset = 70;
    const position = target.getBoundingClientRect().top + window.scrollY - offset;

    window.scrollTo({
      top: position,
      behavior: 'smooth'
    });
  }
}
