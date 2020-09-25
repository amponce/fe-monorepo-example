import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { Icon } from './icon.component';

@NgModule({
  declarations: [Icon],
  imports: [CommonModule, FontAwesomeModule],
  exports: [Icon],
})
export class IconModule {}
