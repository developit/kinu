import {createSimpleComponent} from '../../lib/create-simple-component';
import './style.css';

export const Radio = createSimpleComponent('radio', 'input', {type: 'radio'});
export const RadioGroup = createSimpleComponent('radio-group', 'div');
