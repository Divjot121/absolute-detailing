import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';
import './BookingCalendar.css';

export const BookingCalendar = ({ selectedDate, onSelectDate, minDate }) => {
  // Parse minDate (YYYY-MM-DD) or default to today
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const initialDate = selectedDate ? new Date(selectedDate + 'T00:00:00') : today;
  const [currentMonth, setCurrentMonth] = useState(initialDate.getMonth());
  const [currentYear, setCurrentYear] = useState(initialDate.getFullYear());

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Days in current month
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay();

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(prev => prev - 1);
    } else {
      setCurrentMonth(prev => prev - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(prev => prev + 1);
    } else {
      setCurrentMonth(prev => prev + 1);
    }
  };

  // Format date as YYYY-MM-DD
  const formatDateStr = (year, month, day) => {
    const mm = String(month + 1).padStart(2, '0');
    const dd = String(day).padStart(2, '0');
    return `${year}-${mm}-${dd}`;
  };

  // Generate calendar days
  const calendarDays = [];
  // Leading empty slots
  for (let i = 0; i < firstDayIndex; i++) {
    calendarDays.push(null);
  }
  // Days of month
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day);
  }

  const isPrevDisabled = (currentYear === today.getFullYear() && currentMonth <= today.getMonth()) || currentYear < today.getFullYear();

  return (
    <div className="custom-calendar-card" role="group" aria-label="Appointment Date Picker">
      {/* Calendar Header */}
      <div className="calendar-header">
        <div className="calendar-title-wrap">
          <CalendarIcon className="calendar-header-icon" size={16} aria-hidden="true" />
          <span className="calendar-month-year">
            {monthNames[currentMonth]} {currentYear}
          </span>
        </div>

        <div className="calendar-nav-buttons">
          <button
            type="button"
            className="calendar-nav-btn"
            onClick={handlePrevMonth}
            disabled={isPrevDisabled}
            aria-label="Previous Month"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            type="button"
            className="calendar-nav-btn"
            onClick={handleNextMonth}
            aria-label="Next Month"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Weekday Labels */}
      <div className="calendar-weekdays" aria-hidden="true">
        {dayNames.map((d) => (
          <span key={d} className="calendar-weekday-cell">{d}</span>
        ))}
      </div>

      {/* Days Grid */}
      <div className="calendar-grid" role="grid">
        {calendarDays.map((day, idx) => {
          if (day === null) {
            return <div key={`empty-${idx}`} className="calendar-empty-cell" aria-hidden="true" />;
          }

          const dateStr = formatDateStr(currentYear, currentMonth, day);
          const cellDate = new Date(currentYear, currentMonth, day);
          cellDate.setHours(0, 0, 0, 0);

          const isPast = cellDate < today;
          const isSelected = selectedDate === dateStr;
          const isToday = cellDate.getTime() === today.getTime();

          return (
            <button
              key={dateStr}
              type="button"
              role="gridcell"
              aria-selected={isSelected}
              disabled={isPast}
              className={`calendar-day-btn ${isSelected ? 'is-selected' : ''} ${isPast ? 'is-past' : ''} ${isToday ? 'is-today' : ''}`}
              onClick={() => !isPast && onSelectDate(dateStr)}
              aria-label={`${monthNames[currentMonth]} ${day}, ${currentYear}${isPast ? ' (Unavailable)' : ''}${isSelected ? ' (Selected)' : ''}`}
            >
              <span className="calendar-day-num">{day}</span>
              {isToday && !isSelected && <span className="today-dot" aria-hidden="true" />}
            </button>
          );
        })}
      </div>

      {/* Selected Date Caption */}
      {selectedDate && (
        <div className="calendar-selection-caption">
          <span className="caption-label">Selected Date:</span>
          <span className="caption-date">
            {new Date(selectedDate + 'T00:00:00').toLocaleDateString('en-CA', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </span>
        </div>
      )}
    </div>
  );
};
