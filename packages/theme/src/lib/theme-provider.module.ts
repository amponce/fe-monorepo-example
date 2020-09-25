import { NgModule } from '@angular/core';

import { ThemeProvider } from './theme-provider.component';

@NgModule({
  declarations: [ThemeProvider],
  exports: [ThemeProvider],
})
export class ThemeProviderModule {
  // TODO: we can provide a forRoot method here to set the array of themes and the active theme from the app
}
