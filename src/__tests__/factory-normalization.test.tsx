// @vitest-environment jsdom
import {expect, it} from 'vitest';
import {h, render} from 'preact';
import {act} from 'preact/test-utils';
import '../lib/forwardref';
import {createSimpleComponent} from '../lib/create-simple-component';

it('shares the factory instance between the normalizer and internal ref', () => {
  const state = new WeakMap<ComponentInstance, string>();
  let instance: ComponentInstance;
  let refresh: () => void;
  const Box = createSimpleComponent<'div', {children?: string}>(
    'normalizer-test',
    function (props) {
      expect(props.title).toBe('default');
      instance = this;
      props.children = state.get(this) ?? props.children;
      return 'div';
    },
    {title: 'default'},
    function () {
      expect(this).toBe(instance);
      refresh = () => { state.set(this, 'updated'); this.forceUpdate(); };
    },
  );
  const host = document.createElement('div');
  const ref = {current: null as HTMLDivElement | null};
  const props = {children: 'original', ref};
  const vnode = h(Box, props);
  act(() => render(vnode, host));
  expect(vnode.props.children).toBe('original');
  expect(props.children).toBe('original');
  expect(ref.current).toBe(host.firstElementChild);
  expect(host.textContent).toBe('original');
  act(() => refresh());
  expect(host.textContent).toBe('updated');
  act(() => render(null, host));
  expect(ref.current).toBeNull();
});
