import { axe, render, screenshot } from '@otus/test-utils';

import { Button, ButtonModule } from '@otus/components/button';

describe('Button', () => {
  it(`should render the projected content`, async () => {
    const project = 'I am an example';
    const { findByText } = await render(Button, {
      template: `<button ot-button>${project}</button>`,
      imports: [ButtonModule],
    });
    const content = await findByText(project);
    expect(content).toBeInTheDocument();
    await screenshot();
  });
  it(`should be accessible`, async () => {
    const { container } = await render(Button, {
      template: `<button ot-button>hello</button>`,
      imports: [ButtonModule],
    });
    expect(await axe(container)).toHaveNoViolations();
  });
});
