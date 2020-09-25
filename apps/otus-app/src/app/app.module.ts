import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ThemeProviderModule } from '@otus/theme';

import { ImageModule } from '@otus/components/image';
import { ButtonModule } from '@otus/components/button';
import { IconModule } from '@otus/components/icon';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, ButtonModule, ImageModule, IconModule, ThemeProviderModule],
  providers: [],
  bootstrap: [AppComponent],
  exports: [AppComponent],
})
export class AppModule {}
