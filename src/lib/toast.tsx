import {useEffect, useState} from 'preact/hooks';
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
    <div k="toast-container">
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
