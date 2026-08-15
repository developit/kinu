// @vitest-environment jsdom
import {describe, expect, it} from 'vitest';
import {render} from 'preact';
import {useState} from 'preact/hooks';
import {createSimpleComponent} from '../lib/create-simple-component';
import {AspectRatio} from '../components/aspect-ratio';
import {Avatar} from '../components/avatar';
import {Button} from '../components/button';
import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from '../components/carousel';
import {Chip} from '../components/chip';
import {Dialog} from '../components/dialog';
import {Drawer} from '../components/drawer';
import {Input} from '../components/input';
import {Item} from '../components/item';
import {Popover, PopoverContent, PopoverTrigger} from '../components/popover';
import {Sheet} from '../components/sheet';

type Obj<T> = {current: T | null};

function scratch() {
  const el = document.createElement('div');
  document.body.appendChild(el);
  return el;
}

/** No defaults, no internal ref: the caller's ref goes straight to the DOM. */
const Plain = createSimpleComponent<'div', object>('plain', 'div');
/** Defaults, but still no internal ref of its own. */
const WithDefaults = createSimpleComponent<'div', object>('with-defaults', 'div', {
  tabIndex: -1,
});

const internal: {attached: unknown[]; detached: number} = {attached: [], detached: 0};
/** The proxying path: the component has a ref handler of its own to merge. */
const WithInternalRef = createSimpleComponent<'div', object>(
  'with-internal',
  'div',
  undefined,
  (el) => {
    // Component-internal refs are typed `(el: T) => …` and dereference `el`
    // freely, so they must never be handed null.
    if (!el) throw new Error('internal ref called without an element');
    internal.attached.push(el);
    return () => {
      internal.detached++;
    };
  },
);

describe('createSimpleComponent ref forwarding', () => {
  const variants: Array<[string, typeof Plain]> = [
    ['plain', Plain],
    ['with defaultProps', WithDefaults],
    ['with an internal ref', WithInternalRef],
  ];
  for (const [label, C] of variants) {
    describe(label, () => {
      it('attaches an object ref to the DOM element', () => {
        const ref: Obj<HTMLDivElement> = {current: null};
        render(<C ref={ref} />, scratch());
        expect(ref.current).toBeInstanceOf(HTMLDivElement);
        expect(ref.current?.getAttribute('k')).toBe(C.displayName);
      });

      it('detaches an object ref on unmount', () => {
        const root = scratch();
        const ref: Obj<HTMLDivElement> = {current: null};
        render(<C ref={ref} />, root);
        render(null, root);
        expect(ref.current).toBe(null);
      });

      it('calls a callback ref with the element, then with null', () => {
        const root = scratch();
        const calls: unknown[] = [];
        // Returns a number, not a cleanup — a common shape that must not be
        // mistaken for one.
        render(<C ref={(el: HTMLDivElement | null) => calls.push(el)} />, root);
        render(null, root);
        expect(calls[0]).toBeInstanceOf(HTMLDivElement);
        expect(calls[1]).toBe(null);
      });

      it('runs the cleanup returned by a callback ref instead of calling it with null', () => {
        const root = scratch();
        const calls: unknown[] = [];
        let cleaned = 0;
        render(
          <C
            ref={(el: HTMLDivElement) => {
              calls.push(el);
              return () => {
                cleaned++;
              };
            }}
          />,
          root,
        );
        render(null, root);
        expect(calls).toHaveLength(1);
        expect(cleaned).toBe(1);
      });

      it('picks up a ref that only arrives on a later render', () => {
        const root = scratch();
        const ref: Obj<HTMLDivElement> = {current: null};
        let show!: (v: boolean) => void;
        function App() {
          const [on, set] = useState(false);
          show = set;
          return <C ref={on ? ref : undefined} />;
        }
        render(<App />, root);
        expect(ref.current).toBe(null);
        show(true);
        render(<App />, root);
        expect(ref.current).toBeInstanceOf(HTMLDivElement);
      });

      it('follows a ref swapped between renders', () => {
        const root = scratch();
        const a: Obj<HTMLDivElement> = {current: null};
        const b: Obj<HTMLDivElement> = {current: null};
        let swap!: (v: boolean) => void;
        function App() {
          const [useB, set] = useState(false);
          swap = set;
          return <C ref={useB ? b : a} />;
        }
        render(<App />, root);
        expect(a.current).toBeInstanceOf(HTMLDivElement);
        swap(true);
        render(<App />, root);
        expect(b.current).toBeInstanceOf(HTMLDivElement);
        expect(a.current).toBe(null);
      });

      it('keeps the ref attached across unrelated updates', () => {
        const root = scratch();
        const ref: Obj<HTMLDivElement> = {current: null};
        let bump!: (n: number) => void;
        function App() {
          const [n, set] = useState(0);
          bump = set;
          return <C ref={ref} title={String(n)} />;
        }
        render(<App />, root);
        const el = ref.current;
        bump(1);
        render(<App />, root);
        expect(ref.current).toBe(el);
        expect(el?.isConnected).toBe(true);
      });

      it('does not render ref as an attribute', () => {
        const root = scratch();
        render(<C ref={{current: null}} />, root);
        expect(root.innerHTML).not.toContain('ref=');
      });
    });
  }

  it('runs the component internal ref alongside the caller ref', () => {
    const root = scratch();
    internal.attached = [];
    internal.detached = 0;
    const ref: Obj<HTMLDivElement> = {current: null};
    render(<WithInternalRef ref={ref} />, root);
    expect(internal.attached).toHaveLength(1);
    expect(internal.attached[0]).toBe(ref.current);
    render(null, root);
    expect(internal.detached).toBe(1);
    expect(ref.current).toBe(null);
  });

  it('runs the internal ref even when the caller passes none', () => {
    const root = scratch();
    internal.attached = [];
    internal.detached = 0;
    render(<WithInternalRef />, root);
    expect(internal.attached).toHaveLength(1);
    render(null, root);
    expect(internal.detached).toBe(1);
  });

  it('gives each instance its own ref plumbing', () => {
    const a: Obj<HTMLDivElement> = {current: null};
    const b: Obj<HTMLDivElement> = {current: null};
    render(
      <div>
        <WithInternalRef ref={a} />
        <WithInternalRef ref={b} />
      </div>,
      scratch(),
    );
    expect(a.current).toBeInstanceOf(HTMLDivElement);
    expect(b.current).toBeInstanceOf(HTMLDivElement);
    expect(a.current).not.toBe(b.current);
  });

  it('follows a polymorphic tag swap', () => {
    const root = scratch();
    const ref: Obj<any> = {current: null};
    let setHref!: (v: string | undefined) => void;
    function App() {
      const [href, set] = useState<string | undefined>(undefined);
      setHref = set;
      return <Button ref={ref} href={href} />;
    }
    render(<App />, root);
    expect(ref.current?.tagName).toBe('BUTTON');
    setHref('/x');
    render(<App />, root);
    expect(ref.current?.tagName).toBe('A');
    expect(ref.current?.isConnected).toBe(true);
  });

  it('does not leak ref or k back onto the caller props object', () => {
    const props = {title: 'x'};
    render(<Plain {...props} ref={{current: null}} />, scratch());
    expect(Object.keys(props)).toEqual(['title']);
  });
});

describe('component ref forwarding', () => {
  const cases: Array<[string, (ref: Obj<any>) => any, string]> = [
    ['Input', (ref) => <Input ref={ref} />, 'INPUT'],
    ['Item', (ref) => <Item ref={ref} />, 'BUTTON'],
    // Item.Field and Chip.Button both install an internal ref that writes to
    // el.onclick, so they exercise the proxying path against a real element.
    ['Item.Field', (ref) => <Item.Field ref={ref} />, 'LABEL'],
    ['Chip.Button', (ref) => <Chip.Button ref={ref} />, 'SPAN'],
    ['AspectRatio', (ref) => <AspectRatio ref={ref} ratio="16 / 9" />, 'DIV'],
    ['Avatar', (ref) => <Avatar ref={ref} alt="a" />, 'IMG'],
    ['Dialog.Content', (ref) => <Dialog.Content ref={ref} />, 'DIALOG'],
    ['Drawer.Content', (ref) => <Drawer.Content ref={ref} />, 'DIALOG'],
    ['Sheet.Content', (ref) => <Sheet.Content ref={ref} />, 'DIALOG'],
    ['Popover.Content', (ref) => <PopoverContent ref={ref} />, 'DIALOG'],
    ['CarouselPrevious', (ref) => <CarouselPrevious ref={ref} />, 'BUTTON'],
    ['CarouselNext', (ref) => <CarouselNext ref={ref} />, 'BUTTON'],
    [
      'CarouselContent',
      (ref) => (
        <Carousel>
          <CarouselContent ref={ref} />
        </Carousel>
      ),
      'DIV',
    ],
  ];

  for (const [name, mount, tag] of cases) {
    it(`${name} forwards ref to its ${tag} element`, () => {
      const root = scratch();
      const ref: Obj<HTMLElement> = {current: null};
      render(mount(ref), root);
      expect(ref.current).toBeInstanceOf(HTMLElement);
      expect(ref.current?.tagName).toBe(tag);
    });
  }

  it('a trigger forwards ref to the child it decorates', () => {
    const root = scratch();
    const ref: Obj<HTMLElement> = {current: null};
    render(
      <Popover>
        <PopoverTrigger ref={ref}>
          <button type="button">Open</button>
        </PopoverTrigger>
        <PopoverContent />
      </Popover>,
      root,
    );
    expect(ref.current?.tagName).toBe('BUTTON');
  });
});
