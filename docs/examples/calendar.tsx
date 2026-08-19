import {Calendar} from 'kinu';
import {useRef, useState} from 'preact/hooks';

export function Demo() {
  const calendarRef = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState('');

  const handleDateChange = () => {
    const dateInput = calendarRef.current?.querySelector('[data-date]') as HTMLInputElement;
    if (dateInput?.value) {
      setSelected(dateInput.value);
    }
  };

  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
      <div ref={calendarRef} onChange={handleDateChange}>
        <Calendar />
      </div>
      {selected && (
        <p>
          Selected: <strong>{new Date(selected).toLocaleDateString()}</strong>
        </p>
      )}
    </div>
  );
}

export const code = `// The Calendar exposes its selected date via a hidden input with data-date attribute
// You can listen to changes on the calendar's hidden date input

<Calendar />

// Access the date value:
const dateInput = calendarRef.current?.querySelector('[data-date]');
const selectedDate = new Date(dateInput?.value || '');`;

export default {Demo, code};
