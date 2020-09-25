import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

export interface MaterialIconDefinition {
  prefix: 'maf' | 'mao' | 'mar' | 'mas' | 'mat';
  iconName: string;
  icon: IconDefinition['icon'];
}
