import {createContext} from 'preact';
import {useId, useContext} from 'preact/hooks';
import {createSimpleComponent} from '../../lib/create-simple-component';
import {installCommands} from '../../lib/commands';
import type {
  CarouselOwnProps,
  CarouselContentOwnProps,
  CarouselItemOwnProps,
  CarouselPreviousOwnProps,
  CarouselNextOwnProps,
} from './types';
import './style.css';

const IdCtx = createContext<string | undefined>(undefined);

export function Carousel({id: idProp, children}: CarouselOwnProps) {
  installCommands();
  const id = idProp ?? useId();

  return (
    <IdCtx.Provider value={id}>
      <div style={{position: 'relative'}}>{children}</div>
    </IdCtx.Provider>
  );
}

export const CarouselContent = createSimpleComponent<'div', CarouselContentOwnProps>(
  'carousel',
  'div',
  (p: any) => ({
    ...p,
    id: p.id ?? useContext(IdCtx),
  }),
  (el: HTMLElement) => {
    const handleCommand = (e: any) => {
      const w = el.clientWidth;
      const cmd = e.command;
      if (cmd === '--prev') el.scrollBy({left: -w, behavior: 'smooth'});
      else if (cmd === '--next') el.scrollBy({left: w, behavior: 'smooth'});
      else el.scrollTo({left: cmd.slice(7) * w, behavior: 'smooth'});
    };
    el.addEventListener('command', handleCommand);
    return () => el.removeEventListener('command', handleCommand);
  },
);

export const CarouselItem = createSimpleComponent<'div', CarouselItemOwnProps>(
  'carousel-item',
  'div',
);

export const CarouselPrevious = createSimpleComponent<
  'button',
  CarouselPreviousOwnProps
>('carousel-previous', 'button', (p: any) => ({
  ...p,
  command: '--prev',
  commandfor: useContext(IdCtx) ?? undefined,
}));

export const CarouselNext = createSimpleComponent<
  'button',
  CarouselNextOwnProps
>('carousel-next', 'button', (p: any) => ({
  ...p,
  command: '--next',
  commandfor: useContext(IdCtx) ?? undefined,
}));
