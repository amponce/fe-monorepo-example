import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Button } from './button.component';

@NgModule({
  declarations: [Button],
  imports: [CommonModule],
  exports: [Button],
})
export class ButtonModule {}
