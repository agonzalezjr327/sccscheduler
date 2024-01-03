import React, { useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import { useSelector } from "react-redux";
import { Container } from "reactstrap";
import moment from "moment";

export const ClassCalendar = () => {
    const allClasses = useSelector((state) => state.getClasses.isActive);
    let scheduledClassDays = [];
    const getDatesBetweenDates = (startingDate, endingDate) => {
    endingDate = new Date(endingDate);
    endingDate.setDate(endingDate.getDate() +1);
    let dates = [];
    //to avoid modifying the original date
    const theDate = new Date(startingDate);
    while (theDate < endingDate) {
      dates = [...dates, new Date(theDate)];
      theDate.setDate(theDate.getDate() + 1);
    }
    dates = [...dates, endingDate];
    return dates;
  };

  allClasses.map((activeClass) => {
    let dates = getDatesBetweenDates(activeClass.startDate, activeClass.endDate);
  dates.length < 2 && (dates=[moment(activeClass.startDate).toLocaleString()])
  let classDays = activeClass.days.map((d) => d.slice(0, 3));
  // checking the days the class to be scheduled and only pushing the actual days out of the range
    dates.map(c => {
      return classDays.map(d => c.toString().includes(d) ? scheduledClassDays.push([c, activeClass.startTime, activeClass.endTime, activeClass.classname]) : null)
    })
  })

  return (
    <Container>
      <FullCalendar
        events={scheduledClassDays.map((activeClass) => {
       let date = new Date(`${activeClass[0]}`)
                return {
                  start: moment(`${date.toDateString()} ${activeClass[1]}`).format(""),
                  end: moment(`${date.toDateString()} ${activeClass[2]}`).format(""),
                  title: activeClass[3],
                };
        
        })}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
        initialView="timeGrid"
        headerToolbar={{
          start: "today prev, next",
          center: "title",
          end: "dayGridMonth, timeGridWeek, timeGridDay, listDay",
        }}
        allDaySlot="false"
        nowIndicator="true"
        slotEventOverlap="true"
        handleWindowResize="true"
        displayEventEnd="true"
        slotMinTime="6:00"
        slotMaxTime="20:00"
      />
    </Container>
  );
};
