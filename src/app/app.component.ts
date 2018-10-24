import { Component, OnInit } from '@angular/core';
import { MessagingService } from './services/shared/messaging.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {
 
  title = 'app';

  constructor(private messagingService: MessagingService){
  }

  ngOnInit() {
    this.messagingService.receiveMessage();
  }

}
