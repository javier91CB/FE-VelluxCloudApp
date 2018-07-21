import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { debug } from 'util';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  showMoreSubmenu: boolean;
  showAdminSubmenu: boolean;

  constructor(public router: Router) {}

  ngOnInit() {
    this.showMoreSubmenu = true;
    this.showAdminSubmenu = true;
  }

  activeMenuMore() {
    this.showMoreSubmenu = false;
  }

  activeMenuMoreLeave() {
    this.showMoreSubmenu = true;
  }

  activeMenuAdmin() {
    this.showAdminSubmenu = false;
  }

  activeMenuAdminLeave() {
    this.showAdminSubmenu = true;
  }
}
