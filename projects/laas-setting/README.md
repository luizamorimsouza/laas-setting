# Laas Setting

Library that creates configuration items simply for **Ionic v4**

## Installing

```bash
$ npm install --save laas-setting
```
## Quickstart

Import **laas-setting** module in Angular app.

```typescript
import { LaasSettingModule } from 'laas-setting'

@NgModule({
  (...)
  imports: [
    LaasSettingModule
  ]
  (...)
})
```
#### Usage

```typescript
import { Setting } from 'laas-setting';

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
```

```html
<laas-setting [setting]="setting" cancelLabel="Cancel" saveLabel="Ok" textPlaceholder="New Value">
</laas-setting>
```

![Component Preview](/src/assets/images/screenshot.png)