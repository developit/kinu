import {createSimpleComponent} from '../../lib/create-simple-component';
import type {JSX} from 'preact';
import './style.css';

export const ComboboxInput = createSimpleComponent('combobox-input', 'input');
export const ComboboxList = createSimpleComponent('combobox-list', 'datalist');
export const ComboboxOption = createSimpleComponent(
  'combobox-option',
  'option',
) as unknown as (props: JSX.HTMLAttributes<HTMLOptionElement>) => JSX.Element;
