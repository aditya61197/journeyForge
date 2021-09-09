import { Component,ElementRef,ViewChild } from '@angular/core';
import KeenSlider from 'keen-slider';
@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css',"../../../../../node_modules/keen-slider/keen-slider.min.css"]
})
export class CarouselComponent {

  @ViewChild("sliderRef")
  sliderRef!: ElementRef<HTMLElement>;
  interval: any = 0
  pause: boolean = false
  currentSlide: number = 0
  dotHelper: Array<Number> = []
  slider: any = null

  resetInterval() {
    clearInterval(this.interval)
  }
  setInterval() {
    this.resetInterval()
    this.interval = setInterval(() => {
      if (!this.pause) {
        this.slider.next()
      }
    }, 2000)
  }

  setPause(active) {
    this.pause = active
    this.setInterval()
  }

  ngAfterViewInit() {
    this.slider = new KeenSlider(this.sliderRef.nativeElement, {
      loop: true,
      duration: 1000,
      dragStart: () => {
        this.setPause(true)
      },
      dragEnd: () => {
        this.setPause(false)
      },
    })
    this.setInterval()
    setTimeout(() => {
      this.slider = new KeenSlider(this.sliderRef.nativeElement, {
        loop: true,
        initial: this.currentSlide,
        slidesPerView: 1.400,
        mode: "free-snap",
      spacing: 15,
      centered: true,
        slideChanged: (s) => {
          this.currentSlide = s.details().relativeSlide
        },
      })
      this.dotHelper = [...Array(this.slider.details().size).keys()]
    })
  }

  ngOnDestroy() {
    if (this.slider) this.slider.destroy()
  }
}