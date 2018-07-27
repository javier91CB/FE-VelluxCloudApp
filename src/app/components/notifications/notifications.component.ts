import { Component, OnInit } from '@angular/core';

export enum TypeStatus {
  Good= 1,
  Alert= 2,
  Danger= 3
}

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  registerServices: object[];
  registerCount: number;
  paginator: boolean;

  constructor() {
    this.registerServices = [
      {
        Service: 'Sala 1 - 005F',
        Owner: 'John Doe',
        Status: TypeStatus.Alert,
        Timer: '04:00',
        serviceCall: 1,
        serviceBill: 2
      },
      {
        Service: 'Sala 1 - 011F',
        Owner: 'John Doe',
        Status: TypeStatus.Good,
        Timer: '02:00',
        serviceCall: 1,
        serviceBill: 2
      },
      {
        Service: 'Sala 1 - 006F',
        Owner: 'John Doe',
        Status: TypeStatus.Danger,
        Timer: '15:00',
        serviceCall: 1,
        serviceBill: 2
      },
      {
        Service: 'Sala 1 - 001F',
        Owner: 'John Doe',
        Status: TypeStatus.Alert,
        Timer: '05:00',
        serviceCall: 1,
        serviceBill: 2
      },
      {
      Service: 'Sala 1 - 005F',
      Owner: 'John Doe',
      Status: TypeStatus.Alert,
      Timer: '04:00',
      serviceCall: 1,
      serviceBill: 2
    },
    {
      Service: 'Sala 1 - 011F',
      Owner: 'John Doe',
      Status: TypeStatus.Good,
      Timer: '02:00',
      serviceCall: 1,
      serviceBill: 2
    },
    {
      Service: 'Sala 1 - 006F',
      Owner: 'John Doe',
      Status: TypeStatus.Danger,
      Timer: '15:00',
      serviceCall: 1,
      serviceBill: 2
    },
    {
      Service: 'Sala 1 - 001F',
      Owner: 'John Doe',
      Status: TypeStatus.Alert,
      Timer: '05:00',
      serviceCall: 1,
      serviceBill: 2
    },
    {
      Service: 'Sala 1 - 005F',
      Owner: 'John Doe',
      Status: TypeStatus.Alert,
      Timer: '04:00',
      serviceCall: 1,
      serviceBill: 2
    },
    {
      Service: 'Sala 1 - 005F',
      Owner: 'John Doe',
      Status: TypeStatus.Alert,
      Timer: '04:00',
      serviceCall: 1,
      serviceBill: 2
    },
    {
      Service: 'Sala 1 - 011F',
      Owner: 'John Doe',
      Status: TypeStatus.Good,
      Timer: '02:00',
      serviceCall: 1,
      serviceBill: 2
    },
    {
      Service: 'Sala 1 - 006F',
      Owner: 'John Doe',
      Status: TypeStatus.Danger,
      Timer: '15:00',
      serviceCall: 1,
      serviceBill: 2
    },
    {
      Service: 'Sala 1 - 001F',
      Owner: 'John Doe',
      Status: TypeStatus.Alert,
      Timer: '05:00',
      serviceCall: 1,
      serviceBill: 2
    },
    {
    Service: 'Sala 1 - 005F',
    Owner: 'John Doe',
    Status: TypeStatus.Alert,
    Timer: '04:00',
    serviceCall: 1,
    serviceBill: 2
  }
    ];
      this.paginator = true;
  }

  ngOnInit() { }

}
