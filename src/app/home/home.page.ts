import { Component, OnInit } from '@angular/core';
import { Setting } from 'laas-setting';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  settings: Setting[] = [];

  constructor(
    private toasCtrl: ToastController
  ) {}

  ngOnInit() {
    this.settings = [
      {
        key: 'KEY_TEXT',
        type: 'text',
        title: 'Text Configuration',
        disabled: false,
        value: 'Default Value'
      },
      {
        key: 'KEY_CHECKBOX',
        type: 'checkbox',
        title: 'Checkbox Configuration',
        disabled: false,
        value: true,
        description: 'This is a setting description'
      },
      {
        key: 'KEY_LIST',
        type: 'list',
        title: 'List Configuration',
        disabled: false,
        description: 'This is a setting description',
        options: [
          {
            label: '1 - Item',
            value: { value: 1 }
          },
          {
            label: '2 - Item',
            value: { value: 2 }
          },
          {
            label: '3 - Item',
            value: { value: 3 }
          }
        ]
      },
      {
        type: 'button',
        title: 'Button Configuration',
        disabled: false,
        onClick: async () => {
          (await this.toasCtrl.create({
            message: 'Button configuration clicked',
            duration: 2000
          })).present();
        }
      }
    ];
  }
}
