import {type ComponentChildren, createContext} from 'preact';
import {useId, useContext} from 'preact/hooks';
import {createSimpleComponent} from '../../lib/create-simple-component';
import {installCommands} from '../../lib/commands';
import './style.css';

const IdCtx = createContext<string | undefined>(undefined);

export function Carousel({
  id: idProp,
  children,
}: {id?: string; children: ComponentChildren}) {
  installCommands();
  const id = idProp ?? useId();

  return (
    <IdCtx.Provider value={id}>
      <div style={{position: 'relative'}}>{children}</div>
    </IdCtx.Provider>
  );
}

const CarouselContentRoot = createSimpleComponent(
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

export function CarouselContent({children}: {children: ComponentChildren}) {
  const id = useContext(IdCtx);
  return <CarouselContentRoot id={id}>{children}</CarouselContentRoot>;
}

export const CarouselItem = createSimpleComponent('carousel-item', 'div');

export function CarouselPrevious({
  children,
  ...props
}: {
  children: ComponentChildren;
} & preact.JSX.HTMLAttributes<HTMLButtonElement>) {
  const id = useContext(IdCtx);
  return (
    <button p="carousel-previous" command="--prev" commandfor={id} {...props}>
      {children}
    </button>
  );
}

export function CarouselNext({
  children,
  ...props
}: {
  children: ComponentChildren;
} & preact.JSX.HTMLAttributes<HTMLButtonElement>) {
  const id = useContext(IdCtx);
  return (
    <button p="carousel-next" command="--next" commandfor={id} {...props}>
      {children}
    </button>
  );
}
