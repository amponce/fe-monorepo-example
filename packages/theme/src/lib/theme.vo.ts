import { tinycolor } from '@thebespokepixel/es-tinycolor';
import { ThemeIdentifier } from './theme.identifier';
import { Theme, ThemeVariables } from './theme.types';
import { ColorInput } from './color.types';

const toKebabCase = (name): string => {
  return name
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/([A-Z])([A-Z])(?=[a-z])/g, '$1-$2')
    .toLowerCase();
};

export class ThemeVO {
  constructor(
    private readonly _id: ThemeIdentifier,
    private readonly _theme: Theme,
    private readonly _prefix: string = '--'
  ) {}

  get id(): string {
    return this._id;
  }

  get properties(): any {
    const variables = this._theme.variables;
    const properties = {};

    Object.keys(variables).forEach((section) => {
      Object.keys(variables[section]).forEach((variable) => {
        const value = variables[section][variable];
        if (section === 'color' && typeof value === 'object') {
          Object.keys(value).forEach((valueName) => {
            properties[
              this.formatColorVariableName(variable, valueName)
            ] = this.formatColorVariableValue(value[valueName]);
            properties[
              this.formatRGBVariableName(variable, valueName)
            ] = this.formatRGBVariableValue(value[valueName]);
          });
        } else {
          properties[this.formatVariableName(section, variable)] = variables[section][variable];
        }
      });
    });

    return properties;
  }

  get variables(): ThemeVariables {
    return this._theme.variables;
  }

  toCSS(withComments = false, locale = 'en-US'): string {
    let rules: string[] = [];

    // We can't use google fonts for China, so disable web fonts for now
    if (locale !== 'zh-CN') {
      this._theme.fonts.forEach((fontFamily) => {
        const { url, subsets } = fontFamily;

        fontFamily.fonts.forEach((font) => {
          const local = font.local.map((name) => `local('${name}')`);
          font.resources.forEach((resource) => {
            const subset = subsets.find((s) => s.name === resource.subset);
            const src = [...local, `url('${url}${resource.file}') format('${resource.format}')`];
            rules.push(`
    @font-face {
      font-family: '${fontFamily.name}';
      font-style: ${font.style};
      font-weight: ${font.weight};
      font-display: fallback;
      src: ${src.join(',\n')};
      unicode-range: ${subset?.unicodeRange}
    }
            `);
          });
        });
      });
    }

    const tokenMap = {
      color: 'Color',
      opacity: 'Opacity',
      border: 'Border',
      borderRadius: 'BorderRadius',
      fontFamily: 'FontFamily',
      lineHeight: 'LineHeight',
      fontWeight: 'FontWeight',
      fontSize: 'FontSize',
      shadow: 'Shadow',
      spacing: 'Spacing',
      easing: 'Easing',
    };

    Object.keys(this.variables).forEach((section) => {
      if (tokenMap[section] && withComments) {
        rules.push(`
/**
 * @tokens ${toKebabCase(section)}
 * @presenter ${tokenMap[section]}
 */`);
      }
      rules.push(':root {');
      const rgbVars = ['}', ':root {'];
      Object.keys(this.variables[section]).forEach((variable) => {
        const value = this.variables[section][variable];
        if (section === 'color' && typeof value === 'object') {
          // color swatches
          Object.keys(value).forEach((valueName) => {
            rules.push(
              `\t${this.formatColorVariableName(
                variable,
                valueName
              )}: ${this.formatColorVariableValue(value[valueName])};`
            );
            rgbVars.push(
              `\t${this.formatRGBVariableName(variable, valueName)}: ${this.formatRGBVariableValue(
                value[valueName]
              )};`
            );
          });
        } else {
          rules.push(`\t${this.formatVariableName(section, variable)}: ${value};`);
        }
      });
      if (section === 'color') {
        rules = rules.concat(rgbVars);
      }
      rules.push('}');
    });
    return rules.join('\n');
  }

  formatColorVariableValue(value: ColorInput) {
    return tinycolor(value).toRgbString();
  }

  formatRGBVariableValue(value: ColorInput) {
    const { r, g, b } = tinycolor(value).toRgb();
    return `${r}, ${g}, ${b}`;
  }

  formatVariableName(section, variableName): string {
    return `${this._prefix}${toKebabCase(section)}-${toKebabCase(variableName)}`;
  }

  formatColorVariableName(colorName, colorValue?): string {
    const name = this.formatVariableName('color', colorName);
    if (colorValue) {
      return `${name}-${toKebabCase(colorValue)}`;
    } else {
      return name;
    }
  }

  formatRGBVariableName(colorName, colorValue?): string {
    const name = this.formatVariableName('rgb', colorName);
    if (colorValue) {
      return `${name}-${toKebabCase(colorValue)}`;
    } else {
      return name;
    }
  }

  getColorValue(colorName, colorValue?) {
    const colors = this._theme.variables.color;
    if (!colors[colorName]) {
      throw new Error(`Invalid theme color name: ${colorName}.`);
    }

    if (colorValue && !colors[colorName][colorValue]) {
      throw new Error(`Invalid theme color value, ${colorValue}, for color: ${colorName}.`);
    }

    return colors[colorName];
  }

  getColorVariable(colorName, colorValue?): string {
    this.getColorValue(colorName, colorValue);
    return `var(${this.formatColorVariableName(colorName, colorValue)})`;
  }

  getRGBVariable(colorName, colorValue?): string {
    this.getColorValue(colorName, colorValue);
    return `var(${this.formatRGBVariableName(colorName, colorValue)})`;
  }

  getChartColors(numColors: number): string[] {
    const palette = this._theme.colorPalette;
    const defaultColors = [
      [palette.purple[700]],
      [palette.purple[700], palette.orange[600]],
      [palette.purple[700], palette.yellow[600], palette.orange[600]],
      [palette.purple[700], palette.green[700], palette.yellow[600], palette.orange[600]],
      [
        palette.purple[700],
        palette.green[700],
        palette.blue[700],
        palette.yellow[600],
        palette.orange[600],
      ],
      [
        palette.purple[700],
        palette.green[700],
        palette.blue[700],
        palette.indigo[700],
        palette.yellow[600],
        palette.orange[600],
      ],
      [
        palette.purple[700],
        palette.green[700],
        palette.blue[700],
        palette.indigo[700],
        palette.pink[700],
        palette.yellow[600],
        palette.orange[600],
      ],
      [
        palette.purple[700],
        palette.green[700],
        palette.blue[700],
        palette.indigo[700],
        palette.pink[700],
        palette.teal[700],
        palette.yellow[600],
        palette.orange[600],
      ],
      [
        palette.purple[700],
        palette.green[700],
        palette.blue[700],
        palette.indigo[700],
        palette.pink[700],
        palette.red[700],
        palette.teal[700],
        palette.yellow[600],
        palette.orange[600],
      ],
      [
        palette.purple[700],
        palette.green[700],
        palette.blue[700],
        palette.indigo[700],
        palette.pink[700],
        palette.red[700],
        palette.teal[700],
        palette.gray[600],
        palette.yellow[600],
        palette.orange[600],
      ],
    ];

    const quotient: number = Math.floor(numColors / 10);
    const rest: number = numColors % 10;
    let alphaScale = 0;
    const colorsResult: string[] = [];

    for (let i = 0; i < quotient; i++) {
      alphaScale = 1 - i * 0.25 > 0.24 ? 1 - i * 0.25 : 0.25;

      for (const color of defaultColors[9]) {
        colorsResult.push(tinycolor(color).setAlpha(alphaScale).toRgbString());
      }
    }

    if (rest) {
      alphaScale = 1 - quotient * 0.25 > 0.24 ? 1 - quotient * 0.25 : 0.25;

      for (const color of defaultColors[rest - 1]) {
        colorsResult.push(tinycolor(color).setAlpha(alphaScale).toRgbString());
      }
    }
    return colorsResult;
  }

  getColorById(colorId: number): string {
    const palette = this._theme.colorPalette;

    switch (colorId) {
      case 1:
        return palette.black;
      case 5:
        return palette.gray[500];
      case 23:
        return 'rgb(236, 86, 40)';
      case 26:
        return 'rgb(89, 190, 192)';
      case 28:
        return 'rgb(29, 118, 187)';
      case 29:
        return palette.indigo[900];
      case 30:
        return 'rgb(244, 149, 178)';
      case 31:
        return 'rgb(0, 159, 135)';
      case 32:
        return 'rgb(129, 67, 149)';
      case 33:
        return 'rgb(139, 198, 64)';
      case 34:
        return 'rgb(246, 174, 43)';
      case 89:
        return 'rgb(18, 81, 174)';
      case 90:
        return 'rgb(55, 123, 51)';
      case 91:
        return 'rgb(254, 155, 15)';
      case 92:
        return 'rgb(152, 22, 34)';
      case 93:
        return 'rgb(120, 100, 206)';
      case 94:
        return 'rgb(157, 165, 174)';
      case 95:
        return 'rgb(3, 145, 158)';
      case 96:
        return 'rgb(147, 229, 22)';
      case 97:
        return 'rgb(253, 206, 20)';
      case 98:
        return 'rgb(233, 20, 37)';
      case 99:
        return 'rgb(250, 66, 200)';

      default:
        return palette.indigo[900];
    }
  }
}
