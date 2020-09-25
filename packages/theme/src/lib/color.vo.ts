import { tinycolor } from '@thebespokepixel/es-tinycolor';
import { ColorIdentifier } from './color.identifier';
import { ColorSwatch, Color, ColorInput } from './color.types';

export class ColorVO {
  constructor(
    private readonly _id: ColorIdentifier,
    private readonly _name: string,
    private readonly _color: ColorSwatch | ColorInput
  ) {}

  get id(): number {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  color(key?: string): Color {
    const color = (key && this._color[key]) || this._color['500'] || this._color;
    return tinycolor(color);
  }
}
