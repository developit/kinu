import {useEffect, useRef, useState} from 'preact/hooks';
import type {ComponentChild} from 'preact';
import type {ToastOptions, ToastInternal, ToastApi} from '../components/toast/types';
import './toast.css';

const EVENT_NAME = 'kinu-toast-show';
let nextId = Date.now();

function dispatchToast(content: ComponentChild, opts: ToastOptions = {}) {
  const detail = {content, ...opts};
  dispatchEvent(new CustomEvent(EVENT_NAME, {detail}));
}

export const toast: ToastApi = {show: dispatchToast};

export function ToastContainer() {
  const [toasts, setToasts] = useState<ToastInternal[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  // The container is a manual popover so toasts join the top layer and render
  // above open modal dialogs/sheets/drawers (z-index can't beat the top
  // layer). The top layer stacks in insertion order, so re-promote (hide+show,
  // same task — no repaint between) on new toasts and whenever another
  // top-layer element opens after us.
  useEffect(() => {
    const el = containerRef.current;
    if (!el?.showPopover) return;
    const promote = () => {
      if (el.matches(':popover-open')) el.hidePopover();
      el.showPopover();
    };
    promote();
    const onToggle = (e: Event) => {
      if (e.target !== el && (e as ToggleEvent).newState === 'open') promote();
    };
    // capture: toggle events don't bubble
    addEventListener('toggle', onToggle, true);
    return () => removeEventListener('toggle', onToggle, true);
  }, [toasts]);

  useEffect(() => {
    const handler = (e: Event) => {
      const item = (e as CustomEvent<ToastInternal>).detail;
      item.id = nextId++;
      setToasts((t) => t.slice(-3).concat(item));
      // allow CSS transitions to apply
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setToasts((t) =>
            t.map((i) => (i.id === item.id ? {...i, mounted: true} : i)),
          );
        });
      });
      setTimeout(startRemove, item.duration || 3000, item.id);
    };
    addEventListener(EVENT_NAME, handler);
    return () => {
      removeEventListener(EVENT_NAME, handler);
    };
  }, []);

  function startRemove(id: number) {
    setToasts((t) => {
      const item = t.find((i) => i.id === id);
      if (!item || item.closing) return t;
      setTimeout(() => {
        setToasts((t2) => t2.filter((p) => p.id !== id));
      }, 400);
      return t.map((i) => (i.id === id ? {...i, closing: true} : i));
    });
  }

  return (
    <div k="toast-container" popover="manual" ref={containerRef}>
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
