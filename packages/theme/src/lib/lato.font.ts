import { FontFamilyDefinition } from './font.types';

export const lato: FontFamilyDefinition = {
  name: 'Lato',
  url: 'https://fonts.gstatic.com/s/lato/v16/',
  subsets: [
    {
      name: 'latin',
      unicodeRange:
        'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;',
    },
    {
      name: 'latin-ext',
      unicodeRange:
        'U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF',
    },
  ],
  fonts: [
    {
      local: ['Lato Light', 'Lato-Light'],
      weight: 300,
      style: 'normal',
      resources: [
        {
          subset: 'latin',
          format: 'woff2',
          file: 'S6u9w4BMUTPHh7USSwiPGQ3q5d0.woff2',
        },
        {
          subset: 'latin-ext',
          format: 'woff2',
          file: 'S6u9w4BMUTPHh7USSwaPGQ3q5d0N7w.woff2',
        },
      ],
    },
    {
      local: ['Lato Regular', 'Lato-Regular'],
      weight: 400,
      style: 'normal',
      resources: [
        {
          subset: 'latin',
          format: 'woff2',
          file: 'S6uyw4BMUTPHjx4wXiWtFCc.woff2',
        },
        {
          subset: 'latin-ext',
          format: 'woff2',
          file: 'S6uyw4BMUTPHjxAwXiWtFCfQ7A.woff2',
        },
      ],
    },
    {
      local: ['Lato Bold', 'Lato-Bold'],
      weight: 700,
      style: 'normal',
      resources: [
        {
          subset: 'latin',
          format: 'woff2',
          file: 'S6u9w4BMUTPHh6UVSwiPGQ3q5d0.woff2',
        },
        {
          subset: 'latin-ext',
          format: 'woff2',
          file: 'S6u9w4BMUTPHh6UVSwaPGQ3q5d0N7w.woff2',
        },
      ],
    },
    {
      local: ['Lato Black', 'Lato-Black'],
      weight: 900,
      style: 'normal',
      resources: [
        {
          subset: 'latin',
          format: 'woff2',
          file: 'S6u9w4BMUTPHh50XSwiPGQ3q5d0.woff2',
        },
        {
          subset: 'latin-ext',
          format: 'woff2',
          file: 'S6u9w4BMUTPHh50XSwaPGQ3q5d0N7w.woff2',
        },
      ],
    },
  ],
};
