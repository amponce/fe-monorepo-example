import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Image } from './image.component';

@NgModule({
  declarations: [Image],
  imports: [CommonModule],
  exports: [Image],
})
export class ImageModule {}
