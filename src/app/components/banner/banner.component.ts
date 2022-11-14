import { AfterContentChecked, Component, Input, OnInit } from '@angular/core';
// import Swiper core and required modules
import SwiperCore, { Keyboard, Pagination, SwiperOptions } from 'swiper';

// install Swiper modules
SwiperCore.use([Pagination, Keyboard]);

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss'],
})
export class BannerComponent implements OnInit, AfterContentChecked {

  @Input() bannerImages: any[];
  config: SwiperOptions = {};

  constructor() { }

  ngOnInit() {}

  ngAfterContentChecked(): void {
    this.config = {
      slidesPerView: 1.1,
      // navigation: true,
      pagination: { clickable: true },
      keyboard: { enabled: true }
      // centeredSlides: true
    };
  }

}
