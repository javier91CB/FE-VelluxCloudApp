import { Component, OnInit, ViewChild } from '@angular/core';
import { FullCalendarModule } from 'ng-fullcalendar';
import { Options } from 'fullcalendar';
import { EventSesrvice } from '../../services/calendar/event.service';
import { getLocaleDateTimeFormat } from '@angular/common';

export enum TypeCard {
  Inability= 'Incapacidad',
  Schedule= 'Turno 1',
  Vacations= 'Vacaciones',
  FreeDay= 'Día libre'
}

export enum StatusCard {
  Approve= 'Aprobado',
  Rejected= 'Rechazado',
  pending= 'Pendiente',
  onCurse= 'En curso',
  finish= 'Finalizado'
}

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})

export class CalendarComponent implements OnInit {
  calendarOptions: Options;
  displayEvent: any;
  dateSelected: any;
  events = null;
  infoCards: Object[];
  urlImage: any;

  @ViewChild(FullCalendarModule) ucCalendar: FullCalendarModule;
  constructor(public eventService: EventSesrvice) {
     this.infoCards = [
       {
         site: 'CineColombia Gran Estación',
         location: 'Bogotá, Colombia',
         typeCard: TypeCard.Vacations,
         startDateTimeLocal: this.TimeStamp(new Date()),
         endDateTimeLocal: this.TimeStamp(new Date()),
         status: StatusCard.Rejected,
         image: this.imageCard(TypeCard.Vacations)
       },
       {
        site: 'CineColombia Gran Estación',
        location: 'B/manga, Colombia',
        typeCard: TypeCard.FreeDay,
        startDateTimeLocal: this.TimeStamp(new Date()),
        endDateTimeLocal: this.TimeStamp(new Date()),
        status: StatusCard.pending,
        image: this.imageCard(TypeCard.FreeDay)
      },
      {
        site: 'CineColombia Gran Estación',
        location: 'Bogotá, Colombia',
        typeCard: TypeCard.Inability,
        startDateTimeLocal: this.TimeStamp(new Date()),
        endDateTimeLocal: this.TimeStamp(new Date()),
        status: StatusCard.Approve,
        image: this.imageCard(TypeCard.Inability)
      },
      {
       site: 'CineColombia Gran Estación',
       location: 'B/manga, Colombia',
       typeCard: TypeCard.Schedule,
       startDateTimeLocal: this.TimeStamp(new Date()),
       endDateTimeLocal: this.TimeStamp(new Date()),
       status: StatusCard.onCurse,
       image: this.imageCard(TypeCard.Schedule),
       place: 'Sala 6|7|8 '
      }
     ];
   }

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
      eventColor: '#3959A0',
      eventRender: function(event, element) {
         element.find('.fc-ltr .fc-basic-view .fc-day-top .fc-day-number').
         css({float: 'right', width: '100%', textalign: 'center'});
         element.attr('title', event.title);
       },
      contentHeight: 'auto',
      views: {
        month: {
          titleFormat: 'MMMM YYYY',
        }
      },
      fixedWeekCount: false,
      displayEventTime: false,
      select:
      function(start) {
       this.dateSelected = start.toString();
      }
    };
    this.loadevents();
  }

  TimeStamp(date) {
    if (date != null) {
     return date.toString().substring(16, 21);
    }
  }

  imageCard(typeCard) {
    switch (typeCard) {
      case TypeCard.Inability: {
        this.urlImage = '../../../assets/icons/cards/health.png';
        break;
      }
      case TypeCard.Schedule: {
        this.urlImage = '../../../assets/icons/cards/schedule.png';
        break;
      }
      case TypeCard.Vacations: {
        this.urlImage = '../../../assets/icons/cards/health.png';
        break;
      }
      case TypeCard.FreeDay: {
        this.urlImage = '../../../assets/icons/cards/health.png';
        break;
      }
    }
    return this.urlImage;
  }

  loadevents() {
    this.eventService.getEvents().subscribe(data => {
      this.calendarOptions.events = data;
    });
  }
  dayClick(dateEvent: any) {
    this.dateSelected = dateEvent.date.format('YYYY/MM/DD');
  }
}
