/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-namespace */
import '@testing-library/jest-dom';
import 'jest-axe/extend-expect';

declare global {
  namespace jest {
    interface Matchers<R> {
      toHaveNoViolations(options?: unknown): R;
    }
  }
}
