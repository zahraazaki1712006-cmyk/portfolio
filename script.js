/**
 * Portfolio JavaScript
 * - Typing Animation
 * - Count Up Animation
 * - Scroll Reveal (Intersection Observer)
 * - Skill Progress Bars
 * - Testimonial Carousel
 * - Navbar Scroll Effects
 * - Active Navigation Highlight
 * - Mobile Menu Toggle
 * - Back to Top Button
 * - Mouse Glow Effect
 * - Ripple Effect
 * - Magnetic Buttons
 * - Smooth Scroll
 */

'use strict';

// Wait for DOM content to be fully loaded
document.addEventListener('DOMContentLoaded', () => {

  // ============================================================
  // 1. TYPING ANIMATION
  // ============================================================
  const typingText = document.getElementById('typingText');
  if (typingText) {
    const words = ['Flutter Developer', 'Mobile Application Developer'];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingTimeout;

    function typeEffect() {
      const currentWord = words[wordIndex];
      if (!isDeleting) {
        typingText.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
        if (charIndex === currentWord.length) {
          isDeleting = true;
          typingTimeout = setTimeout(typeEffect, 2000);
          return;
        }
        typingTimeout = setTimeout(typeEffect, 100);
      } else {
        typingText.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
        if (charIndex === 0) {
          isDeleting = false;
          wordIndex = (wordIndex + 1) % words.length;
          typingTimeout = setTimeout(typeEffect, 500);
          return;
        }
        typingTimeout = setTimeout(typeEffect, 50);
      }
    }

    typeEffect();
  }

  // ============================================================
  // 2. NAVBAR SCROLL EFFECT
  // ============================================================
  const navbar = document.getElementById('navbar');
  const backToTop = document.getElementById('backToTop');

  function handleNavbarScroll() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Back to top button
    if (window.scrollY > 500) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  }

  window.addEventListener('scroll', handleNavbarScroll);

  // ============================================================
  // 3. ACTIVE NAVIGATION HIGHLIGHT
  // ============================================================
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('.section');

  function highlightActiveSection() {
    let current = '';
    const scrollPos = window.scrollY + 150;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', highlightActiveSection);

  // ============================================================
  // 4. MOBILE MENU TOGGLE
  // ============================================================
  const navToggle = document.getElementById('navToggle');
  const navLinksContainer = document.getElementById('navLinks');

  if (navToggle) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('active');
      navLinksContainer.classList.toggle('open');
      const isExpanded = navLinksContainer.classList.contains('open');
      navToggle.setAttribute('aria-expanded', isExpanded);
    });

    // Close menu on link click
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navLinksContainer.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });

    // Close menu on outside click
    document.addEventListener('click', (e) => {
      if (!navbar.contains(e.target) && navLinksContainer.classList.contains('open')) {
        navToggle.classList.remove('active');
        navLinksContainer.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // ============================================================
  // 5. SCROLL REVEAL (Intersection Observer)
  // ============================================================
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // ============================================================
  // 6. SKILL PROGRESS BARS
  // ============================================================
  const skillBars = document.querySelectorAll('.skill-progress');

  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const progress = entry.target.getAttribute('data-progress');
        entry.target.style.width = progress + '%';
        skillObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.3
  });

  skillBars.forEach(bar => skillObserver.observe(bar));

  // ============================================================
  // 7. COUNT UP ANIMATION
  // ============================================================
  const statNumbers = document.querySelectorAll('.stat-number');

  const countObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const targetCount = parseInt(target.getAttribute('data-count'));
        let currentCount = 0;
        const increment = Math.ceil(targetCount / 30);
        const countInterval = setInterval(() => {
          currentCount += increment;
          if (currentCount >= targetCount) {
            currentCount = targetCount;
            clearInterval(countInterval);
          }
          target.textContent = currentCount;
        }, 50);
        countObserver.unobserve(target);
      }
    });
  }, {
    threshold: 0.5
  });

  statNumbers.forEach(num => countObserver.observe(num));

  // ============================================================
  // 8. TESTIMONIAL CAROUSEL
  // ============================================================
  const carouselTrack = document.getElementById('carouselTrack');
  const carouselDots = document.querySelectorAll('.carousel-dot');
  const testimonialCards = carouselTrack ? carouselTrack.querySelectorAll('.testimonial-card') : [];
  let currentSlide = 0;
  let autoplayInterval;

  function goToSlide(index) {
    if (!carouselTrack || testimonialCards.length === 0) return;
    currentSlide = index;
    const cardWidth = testimonialCards[0].offsetWidth + 20; // gap
    carouselTrack.style.transform = `translateX(-${currentSlide * cardWidth}px)`;

    carouselDots.forEach((dot, i) => {
      dot.classList.toggle('active', i === currentSlide);
    });
  }

  function nextSlide() {
    if (!carouselTrack || testimonialCards.length === 0) return;
    const next = (currentSlide + 1) % testimonialCards.length;
    goToSlide(next);
  }

  // Dot click handlers
  carouselDots.forEach(dot => {
    dot.addEventListener('click', () => {
      const index = parseInt(dot.getAttribute('data-index'));
      goToSlide(index);
      resetAutoplay();
    });
  });

  function startAutoplay() {
    autoplayInterval = setInterval(nextSlide, 4000);
  }

  function resetAutoplay() {
    clearInterval(autoplayInterval);
    startAutoplay();
  }

  // Initialize carousel
  if (carouselTrack && testimonialCards.length > 0) {
    goToSlide(0);
    startAutoplay();

    // Pause on hover
    carouselTrack.addEventListener('mouseenter', () => clearInterval(autoplayInterval));
    carouselTrack.addEventListener('mouseleave', startAutoplay);
  }

  // Handle resize for carousel
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      if (carouselTrack) goToSlide(currentSlide);
    }, 200);
  });

  // ============================================================
  // 9. MOUSE GLOW EFFECT
  // ============================================================
  const mouseGlow = document.getElementById('mouseGlow');

  if (mouseGlow) {
    document.addEventListener('mousemove', (e) => {
      mouseGlow.style.left = e.clientX + 'px';
      mouseGlow.style.top = e.clientY + 'px';
    });
  }

  // ============================================================
  // 10. RIPPLE EFFECT
  // ============================================================
  const rippleButtons = document.querySelectorAll('.btn');

  rippleButtons.forEach(btn => {
    btn.addEventListener('click', function (e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const ripple = document.createElement('span');
      ripple.classList.add('ripple');
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      ripple.style.width = ripple.style.height = '20px';

      this.appendChild(ripple);

      ripple.addEventListener('animationend', () => {
        ripple.remove();
      });
    });
  });

  // ============================================================
  // 11. MAGNETIC BUTTONS
  // ============================================================
  const magneticBtns = document.querySelectorAll('.magnetic-btn');

  magneticBtns.forEach(btn => {
    btn.addEventListener('mousemove', function (e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      this.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    });

    btn.addEventListener('mouseleave', function () {
      this.style.transform = 'translate(0, 0)';
    });
  });

  // ============================================================
  // 12. BACK TO TOP
  // ============================================================
  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ============================================================
  // 13. SMOOTH SCROLL FOR NAV LINKS (enhancement)
  // ============================================================
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      if (targetId === '#') return;
      const targetSection = document.querySelector(targetId);
      if (targetSection) {
        const navHeight = navbar.offsetHeight;
        const targetPos = targetSection.offsetTop - navHeight;
        window.scrollTo({ top: targetPos, behavior: 'smooth' });
      }
    });
  });

  // ============================================================
  // 14. SHADOW ANIMATION WHILE SCROLLING
  // ============================================================
  let lastScrollY = 0;

  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;

    // Dynamic shadow on navbar based on scroll velocity
    if (navbar) {
      const scrollDiff = Math.abs(currentScrollY - lastScrollY);
      if (scrollDiff > 5 && currentScrollY > 50) {
        const shadowIntensity = Math.min(currentScrollY / 500, 1);
        navbar.style.boxShadow = `0 4px ${20 + shadowIntensity * 20}px rgba(0, 0, 0, ${0.2 + shadowIntensity * 0.3})`;
      }
    }

    lastScrollY = currentScrollY;
  });

  // ============================================================
  // 15. HERO ANIMATION - Staggered reveal on load
  // ============================================================
  const heroReveals = document.querySelectorAll('.hero .reveal');
  heroReveals.forEach((el, index) => {
    el.style.transitionDelay = `${0.1 * index}s`;
  });

  // Trigger hero animations after a small delay
  setTimeout(() => {
    heroReveals.forEach(el => el.classList.add('visible'));
  }, 300);

});
