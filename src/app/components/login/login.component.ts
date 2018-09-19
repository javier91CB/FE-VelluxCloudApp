import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from '../../services/login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService]
})
export class LoginComponent {

  model: any = {};
  token: string;
  isLoginError = false;
  constructor(
    private loginService: LoginService,
    private router: Router,
    private route: ActivatedRoute) { }

  OnSubmit(userName, password) {

      this.loginService.userAuthentication(userName, password)
      .subscribe(
        data => {
          localStorage.setItem('userToken', data);
          this.router.navigate(['/home']);
        },
        error => {
          debugger;
          console.log(error);
            this.isLoginError = true;
        });
  }
}
