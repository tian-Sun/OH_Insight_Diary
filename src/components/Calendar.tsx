import React from 'react';
import ReactCalendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { format } from 'date-fns';
import { useJournal } from '../hooks/useJournal';

interface CalendarProps {
  onSelect: (date: Date) => void;
}

const Calendar: React.FC<CalendarProps> = ({ onSelect }) => {
  const { hasEntry } = useJournal();
  
  const tileClassName = ({ date, view }: { date: Date; view: string }) => {
    if (view === 'month') {
      const dateStr = format(date, 'yyyy-MM-dd');
      return hasEntry(dateStr) ? 'react-calendar__tile--hasEntry' : null;
    }
    return null;
  };

  return (
    <div className="calendar-wrapper">
      <ReactCalendar 
        onClickDay={onSelect}
        tileClassName={tileClassName}
      />
    </div>
  );
};

export default Calendar;