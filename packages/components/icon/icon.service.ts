import { Injectable } from '@angular/core';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { BehaviorSubject } from 'rxjs';

import { faSpinner } from '@otus/svg-icons';

export enum IconPrefix {
  Base = 'fa',
  Solid = 'fas',
  Regular = 'far',
  Brand = 'fab',
  Default = 'fas',
  Duotone = 'fad',
  MaterialBase = 'ma',
  MaterialFilled = 'maf',
  MaterialOutline = 'mao',
  MaterialRounded = 'mar',
  MaterialTwoTone = 'mat',
  MaterialSharp = 'mas',
}

@Injectable({
  providedIn: 'root',
})
export class IconService {
  static readonly DEFAULT_ICON_DEF: IconDefinition = faSpinner;

  private importedIcons: any = {};
  private readonly iconDefinitions: BehaviorSubject<any> = new BehaviorSubject({});

  icons$ = this.iconDefinitions.asObservable();

  constructor(private library: FaIconLibrary) {
    library.addIcons(IconService.DEFAULT_ICON_DEF);

    import('@otus/svg-icons')
      .then(({ icons }) => {
        Object.keys(icons).forEach((prefix: string) => {
          this.importedIcons[prefix] = icons[prefix];
          this.updateDefinitions(
            Object.keys(this.iconDefinitions.getValue()),
            prefix as IconPrefix
          );
        });
        return;
      })
      .catch((e) => console.error(e));
  }

  updateDefinitions(iconNames: string[], prefix: IconPrefix = IconPrefix.Default): void {
    const iconDefinitions = { ...this.iconDefinitions.getValue() };
    const iconDefsToAdd: IconDefinition[] = [];

    iconNames.forEach((iconName) => {
      let iconDef = IconService.DEFAULT_ICON_DEF;
      const iconExportName = this.formatIconExport(iconName, prefix);

      if (this.importedIcons[prefix]) {
        iconDef = this.importedIcons[prefix][iconExportName];
        if (iconDef) {
          iconDefsToAdd.push(iconDef);
        }
      }

      iconDefinitions[iconName] = iconDefinitions[iconName] || {};
      iconDefinitions[iconName][prefix] = iconDef;
    });

    this.iconDefinitions.next(iconDefinitions);
    this.library.addIcons(...iconDefsToAdd);
  }

  use(
    iconName: string = IconService.DEFAULT_ICON_DEF.iconName,
    prefix: IconPrefix = IconPrefix.Default
  ): void {
    this.updateDefinitions([iconName], prefix);
  }

  formatIconExport(iconName: string, prefix: IconPrefix): string {
    let exportName = prefix.substr(0, 2);

    if (!iconName.startsWith(exportName)) {
      // kebab case to camel case:
      for (const word of iconName.split('-'))
        exportName = exportName.concat(word.charAt(0).toUpperCase()).concat(word.substr(1));
    }

    return exportName;
  }
}
