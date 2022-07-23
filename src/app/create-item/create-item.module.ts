import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateItemPageRoutingModule } from './create-item-routing.module';

import { CreateItemPage } from './create-item.page';
import { CategoryFilterPipe } from './category-filter.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateItemPageRoutingModule
  ],
  declarations: [CreateItemPage],
  exports: [CreateItemPage]
})
export class CreateItemPageModule {}
