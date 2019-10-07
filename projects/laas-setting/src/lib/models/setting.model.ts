import { Option } from './option.model';

/**
 * Represents an item in the settings list.
 */
export class Setting {

  constructor() {
    this.disabled = false;
  }

  /**
   * This key must be unique. This value will be used as id and as an index to
   * save the setting value to internal storage.
   * Note: Required except for button type.
   */
  key?: string;

  /**
   * The title of the setting.
   */
  title: string;

  /**
   * A short description to display on the item when it is of type checkbox or
   * button, or to be displayed in the dialog for list type.
   * Note: Not required in text type.
   */
  description?: string;

  /**
   * Enables or disables the setting.
   */
  disabled: boolean;

  /**
   * The value of the setting.
   * Note: The component itself will fill this atribute.
   */
  value?: any;

  /**
   * This property returns the label to be displayed by the list type setting of
   * the current value.
   * Note: The component itself will fill this attribute.
   */
  label?: string;

  /**
   * This attribute is required for list type only. It represents the options
   * that will be presented to the user.
   */
  options?: Option[];

  /**
   * The type of the setting.
   */
  type: SettingType;

  /**
   * Invoked after the user changes the setting value.
   *
   * @param setting The changed setting.
   * @param older The old value.
   * @param newer The new value.
   *
   * @returns If the function returns true the new value will be automatically
   * stored by the component.
   */
  onChange?: (setting: Setting, older: any, newer: any) => Promise<boolean>;

  /**
   * Invoked after the user clicks a button setting.
   *
   * @param setting The setting clicked.
   */
  onClick?: (setting: Setting) => void;
}

/**
 * checkbox: Type on and off.
 * list: A radio type list.
 * button: Performs an action after being clicked.
 * text: Stores a text.
 */
export type SettingType = 'checkbox' | 'list' | 'button' | 'text';
