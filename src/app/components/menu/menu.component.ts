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
  hidenTitleAdmin: boolean;
  
  constructor(public router: Router) {}

  ngOnInit() {
    this.showMoreSubmenu = false;
    this.showAdminSubmenu = false;
    this.showAdminClaim = true;
    this.hidenTitleAdmin = false;
  }

  activeMenuMore() {
    if (!this.showMoreSubmenu) {
      if (this.showAdminClaim && window.screen.width <= 566) {
        this.showAdminSubmenu = true;
        this.hidenTitleAdmin = true;
      }
      if (this.showAdminClaim && window.screen.width >= 566) {
        this.showAdminSubmenu = false;
        this.hidenTitleAdmin = true;
      }
        this.showMoreSubmenu = true;
    } else {
      this.showMoreSubmenu = false;
      this.showAdminSubmenu = false;
      this.hidenTitleAdmin = false;
    }
  }

  activeMenuAdmin() {
    if (!this.showAdminSubmenu) {
      this.showAdminSubmenu = true;
      if (window.screen.width >= 566) {
        this.showMoreSubmenu = false;
      }
    } else {
      this.showMoreSubmenu = false;
      this.showAdminSubmenu = false;
    }
  }

  OnQuit() {
    localStorage.removeItem('userToken');
    this.router.navigate(['/login']);
  }
}
