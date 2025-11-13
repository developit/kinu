import {createSimpleComponent} from '../../lib/create-simple-component';
import {useState} from 'preact/hooks';
import './style.css';

const pad = (n: number) => String(n).padStart(2, '0');

const CalendarRoot = createSimpleComponent('calendar', 'div');

function dateStr(d: Date) {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

export function Calendar({defaultValue}: {defaultValue?: Date} = {}) {
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
  for (let i = 0; i < 42; i++) {
    grid.push(i < first ? [prevDays - first + i + 1, -1] : i < first + days ? [i - first + 1, 0] : [i - first - days + 1, 1]);
  }

  const nav = (d: number) => {
    let [ny, nm] = [dy, dm - 1 + d];
    if (nm < 0) { nm = 11; ny--; }
    if (nm > 11) { nm = 0; ny++; }
    setMonth(`${ny}-${pad(nm + 1)}`);
  };

  return (
    <CalendarRoot>
      <input type="hidden" data-date value={date} />
      <div>
        <button onClick={() => nav(-1)}>←</button>
        <div>{new Date(dy, dm - 1).toLocaleString('default', {month: 'long', year: 'numeric'})}</div>
        <button onClick={() => nav(1)}>→</button>
      </div>
      <div>
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => <div key={d}>{d}</div>)}
      </div>
      <div>
        {grid.map(([gd, m], i) => {
          const d = new Date(dy, dm - 1 + m, gd);
          const ds = dateStr(d);
          return (
            <button key={i} p="calendar-day" onClick={() => setDate(ds)} aria-current={ds === today ? 'date' : undefined} aria-selected={ds === date ? 'true' : 'false'}>
              {gd}
            </button>
          );
        })}
      </div>
    </CalendarRoot>
  );
}
