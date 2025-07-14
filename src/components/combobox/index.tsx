import {createSimpleComponent} from '../../lib/create-simple-component';
import './style.css';

export const ComboboxInput = createSimpleComponent('combobox-input', 'input');
export const ComboboxList = createSimpleComponent('combobox-list', 'datalist');
export const ComboboxOption = createSimpleComponent(
  'combobox-option',
  'option',
);
