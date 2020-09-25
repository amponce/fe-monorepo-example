import { ColorSwatch, ColorPalette, ColorInput } from './color.types';
import { FontFamilyDefinition } from './font.types';

export interface Theme {
  fonts: FontFamilyDefinition[];
  colorPalette: ColorPalette;
  variables: ThemeVariables;
}

export interface ThemeVariables {
  color: ColorVariables;
  opacity: OpacityVariables;
  fontFamily: FontFamilyVariables;
  fontWeight: FontWeightVariables;
  fontSize: FontSizeVariables;
  lineHeight: LineHeightVariables;
  letterSpacing: LetterSpacingVariables;
  spacing: SpacingVariables;
  borderRadius: BorderRadiusVariables;
  border: BorderVariables;
  shadow: ShadowVariables;
  stacking: StackingVariables;
  duration: DurationVariables;
  easing: EasingVariables;
}

export interface LineHeightVariables {
  none: string;
  minimum: string;
  tight: string;
  snug: string;
  normal: string;
  relaxed: string;
  loose: string;
}

export interface ColorVariables {
  white: ColorInput;
  black: ColorInput;
  gray: ColorSwatch;
  red: ColorSwatch;
  orange: ColorSwatch;
  yellow: ColorSwatch;
  green: ColorSwatch;
  teal: ColorSwatch;
  blue: ColorSwatch;
  indigo: ColorSwatch;
  purple: ColorSwatch;
  pink: ColorSwatch;
  background: ColorInput;
  foreground: ColorInput;
  primary: ColorSwatch;
  secondary: ColorSwatch;
  neutral: ColorSwatch;
  negative: ColorSwatch;
  notice: ColorSwatch;
  positive: ColorSwatch;
  info: ColorSwatch;
}

export interface OpacityVariables {
  overlay: number;
  disabled: number;
}

export interface FontFamilyVariables {
  base: string;
  sans: string;
  serif: string;
  mono: string;
}

export interface FontWeightVariables {
  hairline: number | string;
  thin: number | string;
  light: number | string;
  normal: number | string;
  medium: number | string;
  semibold: number | string;
  bold: number | string;
  extrabold: number | string;
  black: number | string;
}

export interface FontSizeVariables {
  xxl: string;
  xl: string;
  l: string;
  m: string;
  s: string;
  xs: string;
}

export interface LetterSpacingVariables {
  tighter: string;
  tight: string;
  normal: string;
  wide: string;
  wider: string;
  widest: string;
}

export interface SpacingVariables {
  xxl: string;
  xl: string;
  l: string;
  m: string;
  s: string;
  xs: string;
  xxs: string;
  auto: string;
  none: string;
}

export interface BorderRadiusVariables {
  m: string;
  s: string;
  none: string;
}

export interface BorderVariables {
  l: string;
  m: string;
  s: string;
  dashed: string;
  none: string;
}

export interface ShadowVariables {
  topmost: string;
  above: string;
  resting: string;
  inner: string;
  outline: string;
  none: string;
}

export interface StackingVariables {
  auto: string | number;
  topmost: string | number;
  above: string | number;
  below: string | number;
  deepest: string | number;
}

export interface DurationVariables {
  fast: string;
  moderate: string;
  slow: string;
}

export interface EasingVariables {
  inOut: string;
  in: string;
  out: string;
  linear: string;
}
