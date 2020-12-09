import React, {useState, useEffect} from 'react';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list';
import moment from 'moment';
import bootstrapPlugin from '@fullcalendar/bootstrap';


function Calendar() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    getTrainings();
  }, [])

  const getTrainings = () => {
    fetch('https://customerrest.herokuapp.com/gettrainings')
    .then(response => response.json())
    .then(data => {
      let list = [];
      for (let i=0; i<data.length; i++) {
        let event = {title:  data[i].customer.firstname+ ' ' + data[i].customer.lastname  + ': ' + data[i].activity,
                    start: data[i].date,
                    end: moment(data[i].date).add(data[i].duration, 'm').format()};
        list.push(event);
      }
      setEvents(list);
    })
    .catch(err => console.error(err))

  }

  

  return (
    <div className="calendar">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, listPlugin, bootstrapPlugin]}
        headerToolbar={{
          left: 'prev,today,next',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
        }}       
        initialView='timeGridWeek'
        events={events}
        themeSystem= 'bootstrap'
        slotMinTime= '06:00:00'
        slotMaxTime= '22:00:00' 
        eventBackgroundColor='#78c2ad'  
      />
    </div>
  )


}

export default Calendar;