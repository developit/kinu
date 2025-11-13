import {createSimpleComponent} from '../../lib/create-simple-component';
import {useId} from 'preact/hooks';
import './style.css';

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function padZero(n: number) {
  return String(n).padStart(2, '0');
}

function getCalendarDays(year: number, month: number) {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startingDayOfWeek = firstDay.getDay();

  const days = [];

  // Previous month's days
  const prevMonth = month === 0 ? 11 : month - 1;
  const prevYear = month === 0 ? year - 1 : year;
  const daysInPrevMonth = new Date(prevYear, prevMonth + 1, 0).getDate();
  for (let i = startingDayOfWeek - 1; i >= 0; i--) {
    days.push({
      date: new Date(prevYear, prevMonth, daysInPrevMonth - i),
      isCurrentMonth: false,
    });
  }

  // Current month's days
  for (let i = 1; i <= daysInMonth; i++) {
    days.push({
      date: new Date(year, month, i),
      isCurrentMonth: true,
    });
  }

  // Next month's days
  const remaining = 42 - days.length; // 6 weeks * 7 days
  for (let i = 1; i <= remaining; i++) {
    days.push({
      date: new Date(year, month + 1, i),
      isCurrentMonth: false,
    });
  }

  return days;
}

function parseMonthString(str: string) {
  const [year, month] = str.split('-').map(Number);
  return [year, month - 1];
}

const CalendarRoot = createSimpleComponent(
  'calendar',
  'div',
  {},
  (el: HTMLElement) => {
    const handleCommand = (e: any) => {
      const hiddenInput = el.querySelector('[data-month-input]') as HTMLInputElement;
      if (!hiddenInput) return;

      const [year, month] = parseMonthString(hiddenInput.value);
      const cmd = e.command;
      let newYear = year;
      let newMonth = month;

      if (cmd === '--prev') {
        newMonth--;
        if (newMonth < 0) {
          newMonth = 11;
          newYear--;
        }
      } else if (cmd === '--next') {
        newMonth++;
        if (newMonth > 11) {
          newMonth = 0;
          newYear++;
        }
      }

      hiddenInput.value = `${newYear}-${padZero(newMonth + 1)}`;
    };

    el.addEventListener('command', handleCommand);
    return () => el.removeEventListener('command', handleCommand);
  },
);

export function Calendar({
  value,
  onChange,
}: {
  value?: Date;
  onChange?: (date: Date) => void;
}) {
  const id = useId();
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  const displayDate = value || today;
  const [displayYear, displayMonth] = [displayDate.getFullYear(), displayDate.getMonth()];
  const monthString = `${displayYear}-${padZero(displayMonth + 1)}`;

  const calendarDays = getCalendarDays(displayYear, displayMonth);

  const handleDayClick = (date: Date) => {
    onChange?.(date);
  };

  return (
    <CalendarRoot id={id}>
      <input
        type="hidden"
        data-month-input
        value={monthString}
      />

      <div p="calendar-header">
        <button
          p="calendar-prev"
          command="--prev"
          commandfor={id}
          aria-label="Previous month"
        >
          ←
        </button>
        <div p="calendar-month-year">
          {displayDate.toLocaleString('default', {month: 'long', year: 'numeric'})}
        </div>
        <button
          p="calendar-next"
          command="--next"
          commandfor={id}
          aria-label="Next month"
        >
          →
        </button>
      </div>

      <div p="calendar-weekdays">
        {daysOfWeek.map((day) => (
          <div p="calendar-weekday" key={day}>
            {day}
          </div>
        ))}
      </div>

      <div p="calendar-grid">
        {calendarDays.map((day, idx) => {
          const isToday = day.date.getTime() === today.getTime();
          const isSelected =
            value && day.date.getTime() === value.getTime();

          return (
            <button
              key={idx}
              p="calendar-day"
              onClick={() => handleDayClick(day.date)}
              aria-current={isToday ? 'date' : undefined}
              aria-selected={isSelected ? 'true' : 'false'}
              aria-disabled={day.isCurrentMonth ? 'false' : 'true'}
            >
              {day.date.getDate()}
            </button>
          );
        })}
      </div>
    </CalendarRoot>
  );
}
