import Swiper from 'swiper/bundle';

export default class Carousel {
  constructor(element) {
    this.element = element;
    this.options = {
      slidesPerView: 1,
      spaceBetween: 30,
      direction: 'horizontal',
      pagination: {
        //el: '.swiper-pagination',
        el: this.element.querySelector('.swiper-pagination'),
      },
      navigation: {
        //nextEl: '.swiper-button-next',
        nextEl: this.element.querySelector('.swiper-button-next'),
        //prevEl: '.swiper-button-prev',
        prevEl: this.element.querySelector('.swiper-button-prev'),
      },
    };

    this.setOptions();
    this.init();
  }

  setOptions() {
    // split
    if ('split' in this.element.dataset) {
      this.options.breakpoints = {
        1024: {
          slidesPerView: 3,
        },

        768: {
          slidesPerView: 2,
        },

        480: {
          slidesPerView: 1,
        },
      };
    }

    // autoplay
    if ('autoplay' in this.element.dataset) {
      this.options.autoplay = {
        delay: 3000,
        pauseOnMouseEnter: true,
        disableOnInteraction: false,
      };
    }

    // loop
    if ('loop' in this.element.dataset) {
      this.options.loop = true;
    }

    // slides
    if ('slides' in this.element.dataset) {
      this.options.slidesPerView =
        parseFloat(this.element.dataset.slides, 10) ||
        this.options.slidesPerView;
    }

    // vertical
    if ('vertical' in this.element.dataset) {
      this.options.direction = 'vertical';
    }
  }

  init() {
    //console.log('Initialisation de ma composante Carousel');
    this.setOptions();
    const swiper = new Swiper(this.element, this.options);
  }
}
