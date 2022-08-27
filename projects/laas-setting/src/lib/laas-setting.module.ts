import { ModuleWithProviders, NgModule, Type } from '@angular/core';
import { SettingComponent } from './components/setting/setting.component';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { IonicStorageModule, Storage } from '@ionic/storage-angular';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [SettingComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot()
  ],
  exports: [SettingComponent]
})
export class LaasSettingModule {
  public static forRoot(config?: { storageClass?: Type<Storage> }): ModuleWithProviders<LaasSettingModule> {
    return {
      ngModule: LaasSettingModule,
      providers: [
        { provide: Storage, useClass: config?.storageClass }
      ]
    }
  }
}
