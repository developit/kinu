import {useEffect, useState} from 'preact/hooks';
import type {ComponentChild} from 'preact';
import './toast.css';

interface ToastOptions {
  duration?: number;
}

interface ToastInternal extends ToastOptions {
  id: number;
  content: ComponentChild;
  mounted?: boolean;
  closing?: boolean;
}

const EVENT_NAME = 'pui-toast-show';
let nextId = Date.now();

function dispatchToast(content: ComponentChild, opts: ToastOptions = {}) {
  const detail = {content, duration: opts.duration ?? 3000};
  dispatchEvent(new CustomEvent(EVENT_NAME, {detail}));
}

export const toast = {show: dispatchToast};

export function ToastContainer() {
  const [toasts, setToasts] = useState<ToastInternal[]>([]);

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<ToastInternal>).detail;
      const item: ToastInternal = {
        id: nextId++,
        content: detail.content,
        duration: detail.duration,
      };
      setToasts((t) => [item, ...t.slice(0, 3)]);
      // allow CSS transitions to apply
      requestAnimationFrame(() => {
        setToasts((t) =>
          t.map((i) => (i.id === item.id ? {...i, mounted: true} : i)),
        );
      });
      setTimeout(startRemove, item.duration, item.id);
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
      }, 300);
      return t.map((i) => (i.id === id ? {...i, closing: true} : i));
    });
  }

  return (
    <div p="toast-container">
      {toasts.map((t) => (
        <div
          key={t.id}
          p="toast"
          data-toast={t.id}
          data-mounted={t.mounted || undefined}
          data-closing={t.closing || undefined}
        >
          {t.content}
        </div>
      ))}
    </div>
  );
}
