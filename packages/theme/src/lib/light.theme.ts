import { Theme } from './theme.types';
import { palette } from './palette';
import { lato } from './lato.font';

export const theme: Theme = {
  fonts: [lato],
  colorPalette: palette,
  variables: {
    color: {
      background: palette.white,
      foreground: palette.black,
      neutral: palette.gray,
      primary: palette.purple,
      secondary: palette.teal,
      negative: palette.red,
      notice: palette.yellow,
      positive: palette.green,
      info: palette.blue,
      ...palette,
    },
    opacity: {
      overlay: 0.8,
      disabled: 0.5,
    },
    fontFamily: {
      // Text
      base: 'Lato, Tahoma, Helvetica, Arial, sans-serif',
      sans: 'Lato, Tahoma, Helvetica, Arial, sans-serif',
      serif: 'Georgia, Cambria, "Times New Roman", Times, serif',
      mono: 'Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
    },
    fontWeight: {
      // Text
      hairline: 100,
      thin: 200,
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
      black: 900,
    },
    fontSize: {
      // Text
      xxl: '1.5rem', // 24px
      xl: '1.3125rem', // 21px
      l: '1.125rem', // 18px
      m: '0.9375rem', // 15px
      s: '0.75rem', // 12px
      xs: '0.625rem', // 10px
    },
    lineHeight: {
      // Text
      none: '1',
      minimum: '1.14', // min height required to show descenders
      tight: '1.2',
      snug: '1.375',
      normal: '1.5',
      relaxed: '1.625',
      loose: '2',
    },
    letterSpacing: {
      // Text
      tighter: '-0.05em',
      tight: '-0.025em',
      normal: '0',
      wide: '0.025em',
      wider: '0.05em',
      widest: '0.1em',
    },
    spacing: {
      // Box
      xxl: '4rem',
      xl: '2rem',
      l: '1.5rem',
      m: '1rem',
      s: '0.5rem',
      xs: '0.25rem',
      xxs: '0.125rem',
      auto: 'auto',
      none: 'none',
    },
    borderRadius: {
      // Box
      m: '0.3125rem', // 5px
      s: '0.1875rem', // 3px
      none: '0',
    },
    border: {
      // Box
      l: '0.25rem solid',
      m: '0.125rem solid',
      s: '0.0625rem solid',
      dashed: '0.125rem dashed',
      none: 'none',
    },
    shadow: {
      // Box
      topmost: '0 0.375rem 0.4375rem rgba(0, 0, 0, 0.1), 0 0.625rem 1.75rem rgba(0, 0, 0, 0.25)',
      above: '0 0.1875rem 0.375rem rgba(0, 0, 0, 0.1), 0 0.1875rem 0.375rem rgba(0, 0, 0, 0.16)',
      resting: '0 0.0625rem 0.125rem rgba(0, 0, 0, 0.2), 0 0.0625rem 0.1875rem rgba(0, 0, 0, 0.1)',
      inner: 'inset 0.125rem 0.25rem 0 rgba(0, 0, 0, 0.06)',
      outline: '0 0 0 0.1875rem rgba(66, 153, 225, 0.5)',
      none: 'none',
    },
    stacking: {
      // Box
      auto: 'auto',
      topmost: 9999,
      above: 1,
      below: -1,
      deepest: '-9999',
    },
    duration: {
      fast: '150ms',
      moderate: '200ms',
      slow: '400ms',
    },
    easing: {
      inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      in: 'cubic-bezier(0, 0, 0.2, 1)',
      out: 'cubic-bezier(0.4, 0, 0.7, 0.2)',
      linear: 'linear',
    },
  },
};
