import { NgModule } from '@angular/core';
import { SettingComponent } from './components/setting/setting.component';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage';

@NgModule({
  declarations: [SettingComponent],
  imports: [
    CommonModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot()
  ],
  exports: [SettingComponent]
})
export class LaasSettingModule { }
