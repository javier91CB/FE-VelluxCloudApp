import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  items: Array<any> = [];

  constructor() {
    this.items = [
      {name:  '../../../assets/images/img_mountains_wide.jpg'}
    ];
  }

  ngOnInit() {
  }

}
