import { tinycolor, ColorInput as ColorInputType } from '@thebespokepixel/es-tinycolor';

export type ColorInput = ColorInputType;
export type Color = tinycolor;

export interface ColorPalette {
  white: ColorInput;
  black: ColorInput;
  transparent: ColorInput;
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
}

export interface ColorSwatch {
  100: ColorInput;
  200: ColorInput;
  300: ColorInput;
  400: ColorInput;
  500: ColorInput;
  600: ColorInput;
  700: ColorInput;
  800: ColorInput;
  900: ColorInput;
}
