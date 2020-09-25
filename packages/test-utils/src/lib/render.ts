import { render as _render } from '@testing-library/angular';
import { ThemeProviderModule } from '@otus/theme';

export const render = (ComponentUnderTest: any, options: any) => {
  const { template, imports, ...rest } = options;
  let t = template;
  let i = imports || [];

  if (template && process.env.ENABLE_SCREENSHOTS) {
    t = `<ot-theme-provider>${template}</ot-theme-provider>`;
  }

  if (process.env.ENABLE_SCREENSHOTS) {
    i = [ThemeProviderModule, ...imports];
  }

  return _render(ComponentUnderTest, {
    excludeComponentDeclaration: true,
    imports: i,
    template: t,
    ...rest,
  });
};
