import {
  Component,
  ChangeDetectionStrategy,
  ElementRef,
  Inject,
  PLATFORM_ID,
  OnInit,
  LOCALE_ID,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { uniqueId } from 'lodash-es';

import { ThemeService } from './theme.service';

@Component({
  selector: 'ot-theme-provider',
  templateUrl: 'theme-provider.component.html',
  styleUrls: ['theme-provider.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThemeProvider implements OnInit {
  private id: string = uniqueId('ot-theme-provider-');

  constructor(
    private themeService: ThemeService,
    @Inject(PLATFORM_ID) private platformId: any,
    @Inject(ElementRef) private elementRef: ElementRef,
    @Inject(LOCALE_ID) private locale: string,
    private sanitizer: DomSanitizer
  ) {}

  get styles() {
    return this.sanitizer.bypassSecurityTrustHtml(
      `<style data-theme="${this.id}">
      ${this.themeService.theme.toCSS(false, this.locale)}
      </style>`
    );
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      const { properties } = this.themeService.theme;

      Object.keys(properties).forEach((name) => {
        this.elementRef.nativeElement.style.setProperty(name, properties[name]);
      });
    }
  }
}
