import {useState, useRef, useEffect} from 'preact/hooks';
import type {JSX} from 'preact';
import './style.css';

export interface ComboboxOption {
  value: string;
  label?: string;
}

export interface ComboboxProps {
  options: ComboboxOption[];
  value?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
}

export function Combobox({
  options,
  value: valueProp,
  placeholder,
  onChange,
}: ComboboxProps) {
  const [value, setValue] = useState(valueProp || '');
  const [open, setOpen] = useState(false);
  const [highlight, setHighlight] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => setValue(valueProp || ''), [valueProp]);

  const filtered = value
    ? options.filter((o) =>
        (o.label || o.value).toLowerCase().includes(value.toLowerCase()),
      )
    : options;

  function select(val: string) {
    setValue(val);
    onChange?.(val);
    setOpen(false);
    setHighlight(-1);
  }

  function onInput(e: JSX.TargetedEvent<HTMLInputElement>) {
    setValue(e.currentTarget.value);
    setOpen(true);
    setHighlight(-1);
  }

  function onKeyDown(e: JSX.TargetedKeyboardEvent<HTMLInputElement>) {
    if (!filtered.length) return;
    if (e.key === 'ArrowDown') {
      setHighlight((h) => (h + 1) % filtered.length);
      e.preventDefault();
    } else if (e.key === 'ArrowUp') {
      setHighlight((h) => (h - 1 + filtered.length) % filtered.length);
      e.preventDefault();
    } else if (e.key === 'Enter' && highlight >= 0) {
      select(filtered[highlight].value);
      e.preventDefault();
    }
  }

  function onBlur(e: FocusEvent) {
    if (!e.currentTarget.contains(e.relatedTarget as Node)) setOpen(false);
  }

  return (
    <div
      p="combobox"
      open={open && filtered.length ? '' : undefined}
      onBlur={onBlur}
      onFocus={() => setOpen(true)}
    >
      <input
        p="combobox-input"
        ref={inputRef}
        value={value}
        placeholder={placeholder}
        onInput={onInput}
        onKeyDown={onKeyDown}
        autocomplete="off"
      />
      <ul p="combobox-list">
        {filtered.map((o, i) => (
          <li
            p="combobox-option"
            highlighted={highlight === i ? '' : undefined}
            onMouseDown={(e) => {
              e.preventDefault();
              select(o.value);
            }}
          >
            {o.label || o.value}
          </li>
        ))}
      </ul>
    </div>
  );
}
