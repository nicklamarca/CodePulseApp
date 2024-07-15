import { Component, OnDestroy } from '@angular/core';
import { LoginRequest } from '../models/login-request.model';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnDestroy {

  model: LoginRequest;
  private loginSubscription: Subscription | undefined;

  constructor(private authService: AuthService, 
              private cookieService: CookieService, 
              private router: Router
  ){
    this.model = {
      email: '',
      password: ''
    };
  }
  ngOnDestroy(): void {
    this.loginSubscription?.unsubscribe();
  }

  onSubmit(): void
  {

    this.loginSubscription = this.authService.login(this.model).subscribe({
      next: (response) => {
         //set the cookie
         this.cookieService.set('Authorization', `Bearer ${response.token}`, undefined, '/', undefined, true, 'Strict');
          

           //set user in localstorage
        this.authService.setUser({
          email: response.email,
          roles: response.roles
        });

        //redirect back to home
        this.router.navigateByUrl('/');
      },
      error: (error) => {
        console.log(error);
      }
  });
  }

}