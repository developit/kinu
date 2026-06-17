import {createSimpleComponent} from '../../lib/create-simple-component';
import type {TagsInputOwnProps, TagsInputProps} from './types';
// Pull in Chip styling so the imperatively-created tag chips are styled even
// when TagsInput is imported on its own.
import '../chip/style.css';
import './style.css';

// TagsInput is the one place a little array state is honest. Rather than a
// framework store, a single per-mount ref manages the chips imperatively and
// mirrors the value into a hidden form field. Config is read from data-*
// attributes so the ref stays module-scoped (set up once, torn down on unmount)
// and SSR-safe — the ref never runs without a DOM.
const TagsInputRoot = createSimpleComponent<'div', TagsInputOwnProps>(
  'tags-input',
  'div',
  {},
  (root: HTMLElement) => {
    const field = root.querySelector<HTMLInputElement>(
      '[k="tags-input-field"]',
    );
    const hidden = root.querySelector<HTMLInputElement>(
      '[k="tags-input-hidden"]',
    );
    if (!field || !hidden) return;

    const separator = root.getAttribute('data-separator') || ',';
    const maxAttr = root.getAttribute('data-max');
    const max = maxAttr ? Number(maxAttr) : Number.POSITIVE_INFINITY;
    const allowDuplicates = root.hasAttribute('data-duplicates');

    let tags: string[] = [];
    try {
      tags = JSON.parse(root.getAttribute('data-value') || '[]');
    } catch {
      tags = [];
    }

    function sync() {
      if (!hidden) return;
      hidden.value = tags.join(separator);
      hidden.dispatchEvent(new Event('input', {bubbles: true}));
      hidden.dispatchEvent(new Event('change', {bubbles: true}));
    }

    function render() {
      for (const chip of root.querySelectorAll('[k="chip"]')) chip.remove();
      tags.forEach((tag, index) => {
        const chip = document.createElement('button');
        chip.setAttribute('k', 'chip');
        chip.type = 'button';
        chip.tabIndex = -1;
        chip.textContent = tag;
        const close = document.createElement('span');
        close.setAttribute('k', 'chip-button');
        close.setAttribute('role', 'button');
        close.setAttribute('tabindex', '0');
        close.setAttribute('aria-label', `Remove ${tag}`);
        close.dataset.index = String(index);
        close.textContent = '×';
        chip.appendChild(close);
        root.insertBefore(chip, field);
      });
    }

    function addTag(text: string) {
      const value = text.trim();
      if (!value || tags.length >= max) return;
      if (!allowDuplicates && tags.includes(value)) return;
      tags.push(value);
      render();
      sync();
    }

    function removeAt(index: number) {
      tags.splice(index, 1);
      render();
      sync();
    }

    const onKeydown = (e: KeyboardEvent) => {
      if (!field) return;
      if ((e.key === 'Enter' || e.key === separator) && field.value.trim()) {
        e.preventDefault();
        addTag(field.value);
        field.value = '';
      } else if (e.key === 'Backspace' && !field.value && tags.length) {
        removeAt(tags.length - 1);
      }
    };

    const onClick = (e: MouseEvent) => {
      const close = (e.target as HTMLElement | null)?.closest<HTMLElement>(
        '[k="chip-button"]',
      );
      if (close) {
        e.preventDefault();
        removeAt(Number(close.dataset.index));
      } else if (field && e.target === root) {
        field.focus();
      }
    };

    field.addEventListener('keydown', onKeydown);
    root.addEventListener('click', onClick);
    render();
    sync();

    return () => {
      field.removeEventListener('keydown', onKeydown);
      root.removeEventListener('click', onClick);
    };
  },
);

export function TagsInput({
  name,
  value,
  separator = ',',
  max,
  duplicates,
  placeholder,
  ...props
}: TagsInputProps) {
  return (
    <TagsInputRoot
      data-separator={separator ?? ','}
      data-value={JSON.stringify(value ?? [])}
      data-max={max != null ? String(max) : undefined}
      data-duplicates={duplicates ? '' : undefined}
      {...props}
    >
      <input
        k="tags-input-field"
        type="text"
        placeholder={placeholder ?? undefined}
      />
      <input k="tags-input-hidden" type="hidden" name={name ?? undefined} />
    </TagsInputRoot>
  );
}
