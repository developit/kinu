import {Calendar} from 'pui';
import {useState} from 'preact/hooks';

export function Demo() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
      <Calendar value={selectedDate} onChange={setSelectedDate} />
      {selectedDate && (
        <p>
          Selected: <strong>{selectedDate.toLocaleDateString()}</strong>
        </p>
      )}
    </div>
  );
}

export const code = `const [selectedDate, setSelectedDate] = useState<Date | undefined>();

return (
  <div>
    <Calendar value={selectedDate} onChange={setSelectedDate} />
    {selectedDate && <p>Selected: {selectedDate.toLocaleDateString()}</p>}
  </div>
);`;

export default {Demo, code};
