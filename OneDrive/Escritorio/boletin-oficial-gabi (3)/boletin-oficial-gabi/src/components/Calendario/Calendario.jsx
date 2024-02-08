import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './Calendario.css'

export const Calendario = () => {

    const [selectedDate, setSelectedDate] = useState(new Date());
    const decrees = [new Date(2024, 0, 10), new Date(2024, 0, 15), new Date(2024, 1, 5)];

    const tileContent = ({ date, view }) => {
        if (view === 'month') {
            const isDecreeDate = decrees.find((decreedDate) => decreedDate.toDateString() === date.toDateString());
            console.log(`${date.toDateString()} - isDecreeDate: ${isDecreeDate}`);
            return isDecreeDate ? <div className="decrees-marker"></div> : null;
        }
        return null;
    };

    const tileClassName = ({ date }) => {
        const isDecreeDate = decrees.find((decreedDate) => decreedDate.toDateString() === date.toDateString());
        console.log(`${date.toDateString()} - isDecreeDate: ${isDecreeDate}`);
        return isDecreeDate ? 'react-calendar__tile--decrees' : null;
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    return (
        <div className='calendarCont'>
            <Calendar
                onChange={handleDateChange}
                value={selectedDate}
                tileContent={tileContent}
                tileClassName={tileClassName}
                className={"calendario"}
            />

            <p>Fecha seleccionada: {selectedDate.toISOString().split('T')[0]}</p>
        </div>
    );
};
