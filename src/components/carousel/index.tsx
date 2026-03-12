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

const CarouselContentRoot = createSimpleComponent<'div', CarouselContentOwnProps>(
  'carousel',
  'div',
  {},
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

export function CarouselContent({children}: CarouselContentOwnProps) {
  const id = useContext(IdCtx);
  return <CarouselContentRoot id={id}>{children}</CarouselContentRoot>;
}

export const CarouselItem = createSimpleComponent<'div', CarouselItemOwnProps>(
  'carousel-item',
  'div',
);

export function CarouselPrevious({
  children,
  commandFor: _commandFor,
  command: _command,
  ...props
}: CarouselPreviousOwnProps & JSX.HTMLAttributes<HTMLButtonElement>) {
  const id = useContext(IdCtx);
  return (
    <button {...props} k="carousel-previous" command="--prev" commandfor={id ?? undefined}>
      {children}
    </button>
  );
}

export function CarouselNext({
  children,
  commandFor: _commandFor,
  command: _command,
  ...props
}: CarouselNextOwnProps & JSX.HTMLAttributes<HTMLButtonElement>) {
  const id = useContext(IdCtx);
  return (
    <button {...props} k="carousel-next" command="--next" commandfor={id ?? undefined}>
      {children}
    </button>
  );
}
