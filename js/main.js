document.addEventListener('DOMContentLoaded', () => {

  // ============================
  // TYPING EFFECT
  // ============================
  const typingElement = document.getElementById('typingText');
  if (typingElement) {
    const typing = new TypingEffect(typingElement, [
      'Flutter Developer',
      'Mobile Application Developer'
    ], {
      wait: 2000,
      typeSpeed: 80,
      deleteSpeed: 40
    });
    typing.start();
  }

  // ============================
  // SCROLL REVEAL
  // ============================
  const scrollReveal = new ScrollReveal();

  // ============================
  // COUNT UP
  // ============================
  const countUp = new CountUp();
  countUp.init();

  // ============================
  // MAGNETIC BUTTONS
  // ============================
  new MagneticButton();

  // ============================
  // RIPPLE EFFECT
  // ============================
  new RippleEffect();

  // ============================
  // SMOOTH SCROLL
  // ============================
  new SmoothScroll();

  // ============================
  // NAVBAR SCROLL
  // ============================
  const navbar = document.getElementById('navbar');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;

    if (currentScroll > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    lastScroll = currentScroll;

    // Scroll to top button
    const scrollTop = document.getElementById('scrollTop');
    if (currentScroll > 400) {
      scrollTop.classList.add('visible');
    } else {
      scrollTop.classList.remove('visible');
    }

    // Active nav link
    updateActiveNavLink(currentScroll);
  });

  // ============================
  // MOBILE MENU
  // ============================
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');

  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
  });

  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navMenu.classList.remove('active');
      document.body.style.overflow = '';
    });
  });

  // ============================
  // ACTIVE NAV LINK
  // ============================
  function updateActiveNavLink(scrollY) {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-link');
    const offset = 120;

    sections.forEach(section => {
      const top = section.offsetTop - offset;
      const bottom = top + section.offsetHeight;

      if (scrollY >= top && scrollY < bottom) {
        const id = section.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  // ============================
  // SCROLL TO TOP
  // ============================
  document.getElementById('scrollTop').addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ============================
  // TESTIMONIAL CAROUSEL
  // ============================
  const track = document.getElementById('testimonialTrack');
  const dotsContainer = document.getElementById('carouselDots');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const slides = track ? track.querySelectorAll('.testimonial-card') : [];
  let currentSlide = 0;

  if (slides.length > 0) {
    slides.forEach((_, i) => {
      const dot = document.createElement('div');
      dot.className = `carousel-dot${i === 0 ? ' active' : ''}`;
      dot.addEventListener('click', () => goToSlide(i));
      dotsContainer.appendChild(dot);
    });

    prevBtn.addEventListener('click', () => goToSlide(currentSlide - 1));
    nextBtn.addEventListener('click', () => goToSlide(currentSlide + 1));

    let autoSlide = setInterval(() => goToSlide(currentSlide + 1), 5000);

    const carousel = document.querySelector('.testimonial-carousel');
    carousel.addEventListener('mouseenter', () => clearInterval(autoSlide));
    carousel.addEventListener('mouseleave', () => {
      clearInterval(autoSlide);
      autoSlide = setInterval(() => goToSlide(currentSlide + 1), 5000);
    });
  }

  function goToSlide(index) {
    if (!track || slides.length === 0) return;

    if (index < 0) index = slides.length - 1;
    if (index >= slides.length) index = 0;

    currentSlide = index;
    track.style.transform = `translateX(-${index * 100}%)`;

    document.querySelectorAll('.carousel-dot').forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
  }

  // ============================
  // SKILL BARS OBSERVER
  // ============================
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const progress = entry.target.querySelector('.skill-progress');
        if (progress && !progress.dataset.animated) {
          progress.style.width = progress.dataset.progress || '0%';
          progress.dataset.animated = 'true';
        }
      }
    });
  }, { threshold: 0.2 });

  document.querySelectorAll('.skill-card').forEach(card => {
    card.dataset.revealType = 'skill';
    skillObserver.observe(card);
  });

  // ============================
  // PARALLAX FLOATING SHAPES
  // ============================
  window.addEventListener('mousemove', (e) => {
    const shapes = document.querySelectorAll('.shape');
    const xFactor = e.clientX / window.innerWidth - 0.5;
    const yFactor = e.clientY / window.innerHeight - 0.5;

    shapes.forEach((shape, i) => {
      const speed = (i + 1) * 5;
      shape.style.transform = `translate(${xFactor * speed}px, ${yFactor * speed}px)`;
    });
  });
});
