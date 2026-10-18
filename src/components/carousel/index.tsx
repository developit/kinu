import {createContext, type ComponentProps} from 'preact';
import {useContext} from 'preact/hooks';
import {createSimpleComponent} from '../../lib/create-simple-component';
import {forwardRef} from '../../lib/forwardref';
import {overlayRoot} from '../../lib/overlay';
import type {
  CarouselOwnProps,
  CarouselContentOwnProps,
  CarouselItemOwnProps,
  CarouselPreviousProps,
  CarouselNextProps,
} from './types';
import './style.css';

const IdCtx = createContext<string | undefined>(undefined);

export const Carousel = /*#__PURE__*/ overlayRoot<CarouselOwnProps>(IdCtx, 'carousel-root', 'div');

/* `oncommand`, lowercase: Preact then always listens for `command`, where the
 * camel-case prop is only mapped when the engine has an `oncommand` property. */
const CarouselContentRoot = createSimpleComponent<'div', CarouselContentOwnProps>('carousel', 'div', {
  oncommand(e: Event & {command: string}) {
    const el = e.currentTarget as HTMLElement;
    const w = el.clientWidth;
    const cmd = e.command;
    if (cmd === '--prev') el.scrollBy({left: -w, behavior: 'smooth'});
    else if (cmd === '--next') el.scrollBy({left: w, behavior: 'smooth'});
    else el.scrollTo({left: +cmd.slice(7) * w, behavior: 'smooth'});
  },
} as object);

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

/* kinu's `command`/`commandfor` come after the caller's props, so they win. */
function carouselButton<P extends CarouselPreviousProps>(k: string, command: string) {
  return forwardRef((props: P) => (
    <button type="button" {...(props as object)} k={k} command={command} commandfor={useContext(IdCtx)} />
  ));
}

export const CarouselPrevious = /*#__PURE__*/ carouselButton<CarouselPreviousProps>('carousel-previous', '--prev');
export const CarouselNext = /*#__PURE__*/ carouselButton<CarouselNextProps>('carousel-next', '--next');
