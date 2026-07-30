class TypingEffect {
  constructor(element, words, options = {}) {
    this.element = element;
    this.words = words;
    this.wait = options.wait || 2000;
    this.typeSpeed = options.typeSpeed || 80;
    this.deleteSpeed = options.deleteSpeed || 40;
    this.loop = options.loop !== undefined ? options.loop : true;
    this.wordIndex = 0;
    this.charIndex = 0;
    this.isDeleting = false;
    this.isPaused = false;
  }

  start() {
    this.tick();
  }

  tick() {
    const currentWord = this.words[this.wordIndex];

    if (this.isDeleting) {
      this.charIndex--;
    } else {
      this.charIndex++;
    }

    this.element.textContent = currentWord.substring(0, this.charIndex);

    if (!this.isDeleting && this.charIndex === currentWord.length) {
      this.isPaused = true;
      setTimeout(() => {
        this.isDeleting = true;
        this.isPaused = false;
        this.tick();
      }, this.wait);
      return;
    }

    if (this.isDeleting && this.charIndex === 0) {
      this.isDeleting = false;
      this.wordIndex = (this.wordIndex + 1) % this.words.length;
      if (!this.loop && this.wordIndex === 0) return;
      setTimeout(() => this.tick(), 500);
      return;
    }

    const speed = this.isDeleting ? this.deleteSpeed : this.typeSpeed;
    setTimeout(() => this.tick(), speed);
  }
}
