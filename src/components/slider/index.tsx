import {createSimpleComponent} from '../../lib/create-simple-component';
import type {JSX} from 'preact';
import './style.css';

function updateSlider(this: HTMLInputElement) {
  const progress = `${(((+this.min || 0) + +this.value) / (+this.max || 100)) * 100}%`;
  this.style.setProperty('--progress', progress);
}

export const Slider = createSimpleComponent(
  'slider',
  'input',
  {type: 'range'} as Partial<JSX.HTMLAttributes<HTMLInputElement>>,
  (el: HTMLInputElement) => {
    el.addEventListener('input', updateSlider);
    updateSlider.call(el);
    return () => el.removeEventListener('input', updateSlider);
  },
);
