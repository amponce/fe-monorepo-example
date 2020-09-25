import { Injectable } from '@angular/core';

import { ThemeVO } from './theme.vo';
import { ThemeIdentifier } from './theme.identifier';
import { theme } from './light.theme';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  static readonly defaultTheme: ThemeVO = new ThemeVO(ThemeIdentifier.Light, theme, '--ot-');

  // TODO: these could be injected to provide more control over the themes at the app level
  themes: ThemeVO[] = [ThemeService.defaultTheme];
  activeThemeId: string = ThemeService.defaultTheme.id;

  constructor() {}

  get theme(): ThemeVO {
    const theme = this.themes.find((t) => t.id === this.activeThemeId);
    if (!theme) {
      throw new Error(`Theme not found: '${this.activeThemeId}'`);
    }
    return theme;
  }
}
