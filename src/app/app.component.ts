import { Component, OnInit, ViewChild } from '@angular/core';
import { MessagingService } from './services/shared/messaging.service';
import { MenuComponent } from './components/menu/menu.component';
import { QualificationComponent } from './components/tools/qualification/qualification.component';
import { observable, fromEvent } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {
  // @ViewChild('QualificationComponent') childOne:QualificationComponent;
  // @ViewChild('MenuComponent') childTwo:MenuComponent;
  
  title = 'app';

  constructor(private messagingService: MessagingService){
  }

  ngOnInit() {
    this.messagingService.receiveMessage();
    debugger;
    // this.childOne.emitEvent
    // .subscribe(
    //   res =>
    //   {
    //   console.log("Atributo:" + res);
    //   this.childTwo.dataShared = res;
    //   }
    // );
  }

  // change():void{
  //   this.childOne.hideMenuAdmin();
  // }
}
