import { AppModule } from './app.module';
import { AppComponent } from './app.component';

import { axe, render } from '@otus/test-utils';

describe('AppComponent', () => {
  it(`should render`, async () => {
    const { findByText } = await render(AppComponent, {
      template: `<app-root></app-root>`,
      imports: [AppModule],
    });
    const content = await findByText('Hello World');
    expect(content).toBeInTheDocument();
  });
  it(`should be accessible`, async () => {
    const { container } = await render(AppComponent, {
      template: `<app-root></app-root>`,
      imports: [AppModule],
    });
    expect(await axe(container)).toHaveNoViolations();
  });
});
