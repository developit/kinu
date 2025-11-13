import {createSimpleComponent} from '../../lib/create-simple-component';
import {useId, useState} from 'preact/hooks';
import {installCommands} from '../../lib/commands';
import './style.css';

const pad = (n: number) => String(n).padStart(2, '0');

const CalendarRoot = createSimpleComponent(
  'calendar',
  'div',
  {},
  (el: HTMLElement) => {
    const handleCommand = (e: any) => {
      const input = el.querySelector('[data-month]') as HTMLInputElement;
      if (!input) return;

      const [y, m] = input.value.split('-').map(Number);
      let [ny, nm] = [y, m - 1];

      if (e.command === '--prev') nm--;
      else if (e.command === '--next') nm++;
      else return;

      if (nm < 0) {
        nm = 11;
        ny--;
      }
      if (nm > 11) {
        nm = 0;
        ny++;
      }

      input.value = `${ny}-${pad(nm + 1)}`;
      input.dispatchEvent(new Event('change'));
    };

    el.addEventListener('command', handleCommand);
    return () => el.removeEventListener('command', handleCommand);
  },
);

function dateStr(d: Date) {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

export function Calendar({defaultValue}: {defaultValue?: Date} = {}) {
  installCommands();
  const id = useId();
  const now = new Date();
  const [y, m] = [now.getFullYear(), now.getMonth()];
  const [month, setMonth] = useState(`${y}-${pad(m + 1)}`);
  const [date, setDate] = useState(defaultValue ? dateStr(defaultValue) : '');

  const [dy, dm] = month.split('-').map(Number);
  const today = dateStr(now);
  const first = new Date(dy, dm - 1, 1).getDay();
  const days = new Date(dy, dm, 0).getDate();
  const prevDays = new Date(dy, dm - 1, 0).getDate();

  const grid = [];
  for (let i = first - 1; i >= 0; i--) grid.push({d: prevDays - i, m: -1});
  for (let i = 1; i <= days; i++) grid.push({d: i, m: 0});
  for (let i = 1; i <= 42 - grid.length; i++) grid.push({d: i, m: 1});

  return (
    <CalendarRoot id={id}>
      <input
        type="hidden"
        data-month
        value={month}
        onChange={(e) => setMonth(e.currentTarget.value)}
      />
      <input
        type="hidden"
        data-date
        value={date}
        onChange={(e) => setDate(e.currentTarget.value)}
      />

      <div p="calendar-header">
        <button p="calendar-prev" command="--prev" commandfor={id}>
          ←
        </button>
        <div p="calendar-month-year">
          {new Date(dy, dm - 1).toLocaleString('default', {
            month: 'long',
            year: 'numeric',
          })}
        </div>
        <button p="calendar-next" command="--next" commandfor={id}>
          →
        </button>
      </div>

      <div p="calendar-weekdays">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
          <div p="calendar-weekday" key={d}>
            {d}
          </div>
        ))}
      </div>

      <div p="calendar-grid">
        {grid.map((g, i) => {
          const d = new Date(dy, dm - 1 + g.m, g.d);
          const ds = dateStr(d);
          return (
            <button
              key={i}
              p="calendar-day"
              onClick={() => setDate(ds)}
              aria-current={ds === today ? 'date' : undefined}
              aria-selected={ds === date ? 'true' : 'false'}
            >
              {g.d}
            </button>
          );
        })}
      </div>
    </CalendarRoot>
  );
}
