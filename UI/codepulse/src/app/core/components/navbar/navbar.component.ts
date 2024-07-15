import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../features/auth/services/auth.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';




@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, HttpClientModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})

export class NavbarComponent implements OnInit{

  constructor(private authService: AuthService){}

  ngOnInit(): void {
    this.authService.user().subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

}