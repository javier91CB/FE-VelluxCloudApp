import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from '../../services/login/login.service';
import * as CryptoJS from 'crypto-js';
import { MenuComponent } from '../menu/menu.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService]
})
export class LoginComponent {

  key: string = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXUyJ9eyJpc3MiOiJhdXRoMCJ9AbIJTDMFc7yUa5MhvcP03nJPyCPzZtQcGEpzWfOkEF"
  loading: boolean;
  model: any = {};
  token: string;
  isLoginError = false;
  constructor(
    private loginService: LoginService,
    private router: Router,
    private route: ActivatedRoute) {
      this.loading = false;
     }

  LoginOn(userName, password) {

    if(userName != "" && password != "")
    {
      this.loading = true;
      this.loginService.userAuthentication(userName, password)
      .subscribe(
        (data) => {
          localStorage.setItem('access_token', JSON.stringify(data));
          this.loading = false;
          this.router.navigate(['/home']);
          
       },
        error => {
          console.log(error);
          this.loading = false;
          this.isLoginError = true;
        });
    }
  }
 
}
