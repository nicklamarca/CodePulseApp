import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './core/components/navbar/navbar.component';
import { HttpClient, HttpClientModule } from '@angular/common/http'; // Import HttpClientModule
import { AuthService } from './features/auth/services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, HttpClientModule], 
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [AuthService]
})
export class AppComponent {
  title = 'codepulse';
}