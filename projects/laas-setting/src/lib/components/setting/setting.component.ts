import { Component, OnInit, Input } from '@angular/core';
import { AlertInput } from '@ionic/core';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Setting } from './../../models/setting.model';

@Component({
  selector: 'laas-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss'],
})
export class SettingComponent implements OnInit {

  @Input() cancelLabel = 'Cancelar';
  @Input() saveLabel = 'Salvar';
  @Input() textPlaceholder = 'Novo Valor';

  @Input() setting: Setting;

  constructor(
    private storage: Storage,
    private alertCtrl: AlertController
  ) { }

  async ngOnInit() {
    this.storage.create();

    if (this.setting) {
      // Try to restore the value to the store, if it fails, use the value attribute set in the configuration creation.
      this.setting.value = await this.storage.get(this.setting.key) ?? this.setting.value;

      if (this.setting.type === 'list') {
        this.setLabel();
      }
    }
  }

  /**
   * Invoked when the user clicks the setting, but only if it is active.
   * @param event The click event.
   */
  onClick(event: Event): void {
    event.stopPropagation();

    switch (this.setting.type) {
      case 'checkbox':
        this.onClickCheckBox();
        break;
      case 'list':
        this.onClickList();
        break;
      case 'button':
        this.setting.onClick(this.setting);
        break;
      case 'text':
        this.onClickText();
        break;
    }
  }

  /**
   * Assigns the label value of the setting.
   */
  private setLabel() {
    for (const option of this.setting.options) {
      if (JSON.stringify(option.value) === JSON.stringify(this.setting.value)) {
        this.setting.label = option.label;
      }
    }
  }

  /**
   * Calls the change listener and if the return is true the value of the setting
   * persists.
   *
   * @param newer The new value of the setting.
   * @return Returns true if and only if the value persisted in storage.
   */
  private async save(newer: any): Promise<boolean> {
    let save = true;

    if (this.setting.onChange) {
      const older = this.setting.value;
      try {
        this.setting.value = newer;
        save = await this.setting.onChange(this.setting, older, newer);
      } catch (e) {
        // if throws an error, do not persist the value
        this.setting.value = older;
        save = false;
      }
    }

    if (save) {
      await this.storage.set(this.setting.key, newer);
      this.setting.value = newer;
    }

    return save;
  }

  /**
   * Processes the click when the configuration is checkbox type.
   */
  private onClickCheckBox(): void {
    this.save(!this.setting.value);
  }

  /**
   * Processes the click when the configuration is list type.
   */
  private async onClickList(): Promise<void> {
    const inputs: AlertInput[] = [];

    this.setting.options.forEach(option => {
      inputs.push({
        type: 'radio',
        label: option.label,
        value: option.value,
        checked: JSON.stringify(option.value) === JSON.stringify(this.setting.value)
      });
    });

    (await this.alertCtrl.create({
      header: this.setting.title,
      message: this.setting.description,
      buttons: [
        this.cancelLabel,
        {
          text: this.saveLabel,
          handler: async (data: any) => {
            const persisted = await this.save(data);

            if (persisted) {
              this.setLabel();
            }
          }
        }
      ],
      inputs
    })).present();
  }

  /**
   * Processa o click quando a configura&ccedil;&atilde;o for do tipo text
   */
  private async onClickText(): Promise<void> {
    (await this.alertCtrl.create({
      header: this.setting.title,
      inputs: [
        {
          type: 'text',
          name: 'value',
          value: this.setting.value,
          placeholder: this.textPlaceholder,
        }
      ],
      buttons: [
        this.cancelLabel,
        {
          text: this.saveLabel,
          handler: data => {
            this.save(data.value);
          }
        }
      ]
    })).present();
  }
}
