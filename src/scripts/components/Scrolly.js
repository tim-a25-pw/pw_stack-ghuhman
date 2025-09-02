export default class Scrolly {
  constructor(element) {
    this.element = element;
    this.options = {
      rootMargin: '0px',
      rootRepeat: true,
    };

    this.init();
  }

  setOptions() {
    // data-no-repeat
    if ('noRepeat' in this.element.dataset) {
      this.options.rootRepeat = false;
    }
  }

  init() {
    const observer2 = new IntersectionObserver(
      this.watch.bind(this),
      this.options
    );

    const items = this.element.querySelectorAll('[data-scrolly]');
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      observer2.observe(item);
    }
  }

  watch(entries, observer) {
    for (let i = 0; i < entries.length; i++) {
      const entry = entries[i];
      const target = entry.target;

      if (entry.isIntersecting) {
        target.classList.add('is-active');

        this.setOptions();

        if (this.options.rootRepeat == false) {
          observer.unobserve(target);
        }
      } else {
        target.classList.remove('is-active');
      }
    }
  }
}
