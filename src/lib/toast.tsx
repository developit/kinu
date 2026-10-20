import {useEffect, useState} from 'preact/hooks';
import type {ComponentChild} from 'preact';
import type {ToastOptions, ToastInternal, ToastApi} from '../components/toast/types';
import './toast.css';

const EVENT_NAME = 'kinu-toast-show';
let nextId = Date.now();

function dispatchToast(content: ComponentChild, opts?: ToastOptions) {
  dispatchEvent(new CustomEvent(EVENT_NAME, {detail: {content, ...opts}}));
}

export const toast: ToastApi = {show: dispatchToast};

/* The container is a manual popover so toasts join the top layer and render
 * above open modal dialogs/sheets/drawers (z-index can't beat the top layer).
 * The top layer stacks in insertion order, so being last in is being on top:
 * join once on mount, and rejoin only when something else opens after us.
 * Adding a toast doesn't change that order, so it must NOT re-promote —
 * hide+show takes the container out of the box tree and back, which cancels
 * any transition that hasn't had a frame to start yet. A new toast is painted
 * transparent at rest and then flipped to [data-mounted] on the next frame, so
 * a re-promote there lands in exactly that gap and eats the enter animation
 * (and the [data-closing] exit the same way).
 *
 * A module-level ref callback, so it runs once per mount rather than per
 * render; what it returns is its cleanup. */
function topLayer(el: HTMLDivElement | null) {
  if (!el?.showPopover) return;
  const promote = (e?: Event) => {
    if (e && (e.target === el || (e as ToggleEvent).newState !== 'open')) return;
    if (el.matches(':popover-open')) el.hidePopover();
    el.showPopover();
  };
  promote();
  // capture: toggle events don't bubble
  addEventListener('toggle', promote, true);
  return () => removeEventListener('toggle', promote, true);
}

export function ToastContainer() {
  const [toasts, setToasts] = useState<ToastInternal[]>([]);

  useEffect(() => {
    const handler = (e: Event) => {
      const item = (e as CustomEvent<ToastInternal>).detail;
      const id = (item.id = nextId++);
      const update = (patch: Partial<ToastInternal>) =>
        setToasts((t) => t.map((i) => (i.id === id ? {...i, ...patch} : i)));
      setToasts((t) => t.slice(-3).concat(item));
      // allow CSS transitions to apply
      requestAnimationFrame(() => requestAnimationFrame(() => update({mounted: true})));
      setTimeout(() => {
        update({closing: true});
        setTimeout(() => setToasts((t) => t.filter((i) => i.id !== id)), 400);
      }, item.duration || 3000);
    };
    addEventListener(EVENT_NAME, handler);
    return () => removeEventListener(EVENT_NAME, handler);
  }, []);

  return (
    <div k="toast-container" popover="manual" ref={topLayer}>
      {toasts.map((t) => (
        <div
          key={t.id}
          k="toast"
          data-toast={t.id}
          data-mounted={t.mounted || undefined}
          data-closing={t.closing || undefined}
        >
          {t.title && <h6 k="toast-title">{t.title}</h6>}
          <div k="toast-content">{t.content}</div>
          <div k="toast-icon">{t.icon}</div>
          {t.action && <div k="toast-action">{t.action}</div>}
        </div>
      ))}
    </div>
  );
}
