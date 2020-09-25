import {
  Component,
  Input,
  SimpleChanges,
  OnChanges,
  OnDestroy,
  OnInit,
  ChangeDetectionStrategy,
} from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { BehaviorSubject, Subscription } from 'rxjs';

import { IconService } from './icon.service';

export enum IconColor {
  Inverse = 'inverse',
  Neutral = 'neutral',
  Primary = 'primary',
  Secondary = 'secondary',
  Negative = 'negative',
  Notice = 'notice',
  Positive = 'positive',
  Info = 'info',
  Inherit = 'inherit',
}

export enum IconDisplay {
  Flex = 'flex',
  InlineFlex = 'inline-flex',
  Default = 'inline-flex',
}

export enum IconWidth {
  Fixed = 'fixed',
  Dynamic = 'dynamic',
  Default = 'fixed',
}

@Component({
  selector: 'ot-icon, [ot-icon]',
  templateUrl: 'icon.component.html',
  styleUrls: ['icon.component.css'],
  host: {
    '[attr.aria-hidden]': 'true',
    '[attr.color]': 'color',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Icon implements OnInit, OnChanges, OnDestroy {
  @Input() name: string | null = null;
  @Input() prefix: string = IconService.DEFAULT_ICON_DEF.prefix;
  @Input() color: IconColor = IconColor.Inherit;

  // Rendering svg as 'flex' rather than 'inline-flex' can help
  // prevent pesky extra sub-pixel spacing which makes placement
  // inconsistent when rendering multiple items in a list.
  @Input() display: IconDisplay = IconDisplay.Default;
  @Input() width: IconWidth = IconWidth.Default;

  private subscription: Subscription | null = null;

  iconDef: BehaviorSubject<IconDefinition> = new BehaviorSubject(IconService.DEFAULT_ICON_DEF);

  constructor(private icons: IconService) {}

  get shouldSpin(): boolean {
    const iconDef = this.iconDef.getValue();
    return iconDef && iconDef.iconName === IconService.DEFAULT_ICON_DEF.iconName;
  }

  ngOnInit(): void {
    this.icons.icons$.subscribe((icons) => {
      if (this.name && icons[this.name]) {
        this.iconDef.next(icons[this.name][this.prefix]);
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.name || changes.prefix) {
      this.icons.use(
        changes.name?.currentValue || this.name,
        changes.prefix?.currentValue || this.prefix
      );
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
