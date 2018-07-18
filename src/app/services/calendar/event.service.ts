import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
export class EventSesrvice {
debuger;
    public getEvents(): Observable<any> {
        const dateObj = new Date();
        const yearMonth = dateObj.getUTCFullYear() + '-' + (dateObj.getUTCMonth() + 1);
        const data: any = [
        {
            start: new Date().setDate(10),
            end: new Date().setDate(10),
            allDay: false,
            description: 'Turno 1'
        },
        {
            start: new Date(),
            end: new Date(),
            allDay: false,
            description: 'Turno 1'
        },
        {
            start: new Date().setDate(7),
            end: new Date().setDate(7),
            allDay: false,
            description: 'Turno 1'
        },
        {
            start: new Date().setDate(6),
            end: new Date().setDate(6),
            allDay: false,
            description: 'Turno 1'
        },
        {
            start: new Date().setDate(5),
            end: new Date().setDate(5),
            allDay: false,
            description: 'Turno 1'
        },
        {
            start: new Date().setDate(4),
            end: new Date().setDate(4),
            allDay: false,
            description: 'Turno 1'
        },
        {
            start: new Date().setDate(3),
            end: new Date().setDate(3),
            allDay: false,
            description: 'Turno 1'
        }];
        return of(data);
    }
}
