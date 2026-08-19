import {createContext, type ComponentProps} from 'preact';
import {useId, useContext} from 'preact/hooks';
import {createSimpleComponent} from '../../lib/create-simple-component';
import {forwardRef} from '../../lib/forwardref';
import {installCommands} from '../../lib/commands';
import type {
  CarouselOwnProps,
  CarouselContentOwnProps,
  CarouselItemOwnProps,
  CarouselPreviousProps,
  CarouselNextProps,
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

export const CarouselContent = /*#__PURE__*/ forwardRef(function CarouselContent(
  props: ComponentProps<typeof CarouselContentRoot>,
) {
  const id = useContext(IdCtx);
  return <CarouselContentRoot {...props} id={id} />;
});

export const CarouselItem = createSimpleComponent<'div', CarouselItemOwnProps>(
  'carousel-item',
  'div',
);

export const CarouselPrevious = /*#__PURE__*/ forwardRef(function CarouselPrevious({
  children,
  command: _c,
  commandFor: _cf,
  ...props
}: CarouselPreviousProps) {
  const id = useContext(IdCtx);
  return (
    <button {...props} k="carousel-previous" command="--prev" commandfor={id ?? undefined}>
      {children}
    </button>
  );
});

export const CarouselNext = /*#__PURE__*/ forwardRef(function CarouselNext({
  children,
  command: _c,
  commandFor: _cf,
  ...props
}: CarouselNextProps) {
  const id = useContext(IdCtx);
  return (
    <button {...props} k="carousel-next" command="--next" commandfor={id ?? undefined}>
      {children}
    </button>
  );
});
