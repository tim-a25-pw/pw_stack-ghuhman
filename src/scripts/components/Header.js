export default class Header {
  constructor(element) {
    this.element = element;
    this.options = {
      threshold: 0.1,
    };
    this.scrollPosition = 0;
    this.lastScrollPosition = 0;
    this.html = document.documentElement;

    this.init();
    this.initNavMobile();
  }

  init() {
    this.setOptions();

    const headerBtns = this.html.querySelectorAll('.js-nav-item');
    for (let i = 0; i < headerBtns.length; i++) {
      const headerBtn = headerBtns[i];
      headerBtn.addEventListener('click', this.onItemClick.bind(this));
    }

    window.addEventListener('scroll', this.onScroll.bind(this));
  }

  setOptions() {
    //
    //console.log(this.element.dataset);
    if ('threshold' in this.element.dataset) {
      this.options.threshold = this.element.dataset.threshold;
      //console.log('threshold : ' + this.options.threshold);
    }
  }

  onScroll() {
    //console.log('Scoll');
    this.lastScrollPosition = this.scrollPosition;
    this.scrollPosition = document.scrollingElement.scrollTop;
    //console.log(this.scrollPosition, this.lastScrollPosition);

    this.setHeaderState();
    this.setDirections();
  }

  setHeaderState() {
    /*
    if(this.scrollPosition > document.scrollingElement.scrollHeight * this.options.threshold){
      this.html.classList.add('header-is-hidden');
    }
    else if(this.scrollPosition > this.lastScrollPosition){
      this.html.classList.remove('header-is-hidden');
    }
    */

    if (
      this.scrollPosition >
        document.scrollingElement.scrollHeight * this.options.threshold &&
      !this.html.hasAttribute('data-always-show')
    ) {
      this.html.classList.add('header-is-hidden');
    } /*if(this.scrollPosition > this.lastScrollPosition)*/ else {
      this.html.classList.remove('header-is-hidden');
    }
  }

  setDirections() {
    if (this.scrollPosition >= this.lastScrollPosition) {
      this.html.classList.remove('is-scrolling-up');
      this.html.classList.add('is-scrolling-down');
    } else {
      this.html.classList.add('is-scrolling-up');
      this.html.classList.remove('is-scrolling-down');
    }
  }

  initNavMobile() {
    const toggle = this.element.querySelector('.js-toggle');
    //console.log(toggle);
    toggle.addEventListener('click', this.onToggleNav.bind(this));
  }

  onToggleNav() {
    this.html.classList.toggle('nav-is-active');
  }

  onItemClick() {
    this.html.classList.remove('nav-is-active');
  }
}
