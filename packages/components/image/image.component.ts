import {
  Component,
  ChangeDetectionStrategy,
  Input,
  ElementRef,
  AfterViewInit,
  OnDestroy,
  OnChanges,
} from '@angular/core';

export enum ImageFit {
  Contain = 'contain',
  Cover = 'cover',
  Scale = 'scale',
  Fill = 'fill',
  None = 'none',
  Default = 'contain',
}

// transparent png
const DEFAULT_IMAGE_SRC =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=';

@Component({
  selector: 'img[ot-image]',
  template: '',
  styleUrls: ['image.component.css'],
  host: {
    '[attr.src]': 'deferredSrc',
    '[attr.fit]': 'fit',
    '[style.width]': 'width ? width : null',
    '[style.height]': 'height ? height : null',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Image implements AfterViewInit, OnDestroy, OnChanges {
  @Input()
  alt: string;

  @Input()
  src: string;

  @Input()
  width: string;

  @Input()
  height: string;

  @Input()
  fit: ImageFit = ImageFit.Default;

  @Input()
  deferLoad = false;

  private intersectionObserver: IntersectionObserver;

  constructor(private elementRef: ElementRef) {}

  get deferredSrc() {
    return this.deferLoad ? DEFAULT_IMAGE_SRC : this.src;
  }

  ngAfterViewInit() {
    if (this.deferLoad) {
      this.registerIntersectionObserver();
      if (this.intersectionObserver && this.elementRef.nativeElement) {
        this.intersectionObserver.observe(<Element>this.elementRef.nativeElement);
      }
    }
  }

  ngOnChanges(changes) {
    if (
      changes.alt &&
      (changes.alt.currentValue === undefined || changes.alt.currentValue === null)
    ) {
      throw new Error(
        'A valid alt attribute must be specified for ot-image. Use alt="" for presentational images.'
      );
    }
  }

  ngOnDestroy() {
    if (this.intersectionObserver) {
      this.intersectionObserver.disconnect();
    }
  }

  private registerIntersectionObserver(): void {
    if (this.intersectionObserver) {
      return;
    }
    this.intersectionObserver = new IntersectionObserver((entries) => {
      this.checkForIntersection(entries);
    }, {});
  }

  private checkForIntersection = (entries: Array<IntersectionObserverEntry>) => {
    entries.forEach((entry: IntersectionObserverEntry) => {
      if (this.checkIfIntersecting(entry)) {
        this.deferLoad = false;
        if (this.intersectionObserver && this.elementRef.nativeElement) {
          this.intersectionObserver.unobserve(<Element>this.elementRef.nativeElement);
          this.intersectionObserver.disconnect();
        }
      }
    });
  };

  private checkIfIntersecting(entry: IntersectionObserverEntry) {
    if (entry && entry.time) {
      return (<any>entry).isIntersecting && entry.target === this.elementRef.nativeElement;
    } else {
      return false;
    }
  }
}
