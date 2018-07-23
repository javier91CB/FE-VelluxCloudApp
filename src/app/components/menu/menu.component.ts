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
  showAdminClaim: boolean;

  constructor(public router: Router) {}

  ngOnInit() {
    this.showMoreSubmenu = false;
    this.showAdminSubmenu = false;
    this.showAdminClaim = false;
  }

  activeMenuMore() {
    if (!this.showMoreSubmenu) {
      this.showMoreSubmenu = true;
      if (this.showAdminClaim) {
        this.showAdminSubmenu = true;
      }
    } else {
      this.showMoreSubmenu = false;
      this.showAdminSubmenu = false;
    }
  }

  activeMenuMoreLeave() {
    this.showMoreSubmenu = true;
  }

  activeMenuAdmin() {
    if (!this.showAdminSubmenu) {
      this.showAdminSubmenu = true;
    } else {
      this.showAdminSubmenu = false;
    }
  }

  activeMenuAdminLeave() {
    this.showAdminSubmenu = true;
  }
}
