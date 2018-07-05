import { Component, OnInit, ViewChild } from '@angular/core';
import { FullCalendarModule } from 'ng-fullcalendar';
import { Options } from 'fullcalendar';
import { EventSesrvice } from '../../services/calendar/event.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  calendarOptions: Options;
  displayEvent: any;
  events = null;

  @ViewChild(FullCalendarModule) ucCalendar: FullCalendarModule;
  constructor(public eventService: EventSesrvice) { }

  ngOnInit() {
    this.calendarOptions = {
      locale: 'Es',
      editable: true,
      eventLimit: false,
      header: {
        left: 'prev',
        center: 'title',
        right: 'next'
      },
      events: [],
      themeSystem: 'bootstrap3',
      contentHeight: 'auto',
      views: {
        month: {
          titleFormat: 'MMMM YYYY'
        }
      },
      fixedWeekCount: false
    };
    this.loadevents();
  }
  loadevents() {
    this.eventService.getEvents().subscribe(data => {
      this.calendarOptions.events = data;
    });
  }
  clickButton(model: any) {
    this.displayEvent = model;
  }
  dayClick(model: any) {
    console.log(model);
  }
  eventClick(model: any) {
    model = {
      event: {
        id: model.event.id,
        start: model.event.start,
        end: model.event.end,
        title: model.event.title,
        allDay: model.event.allDay
      },
      duration: {}
    };
    this.displayEvent = model;
  }
  updateEvent(model: any) {
    model = {
      event: {
        id: model.event.id,
        start: model.event.start,
        end: model.event.end,
        title: model.event.title
      },
      duration: {
        _data: model.duration._data
      }
    };
    this.displayEvent = model;
  }
}
