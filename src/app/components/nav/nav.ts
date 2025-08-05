import { Component, Input, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth-service';
import { UserService } from '../../services/user-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav',
  imports: [RouterLink, CommonModule],
  templateUrl: './nav.html',
  styleUrl: './nav.css',
})
export class Nav implements OnInit {
  @Input()
  downScroll: boolean = false;

  username: string = '';
  email: string = '';

  loading: boolean = false;
  error: string | null = null;

  authenticated: boolean = false;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loading = true;
    if (this.authService.isAuthenticated()) {
      this.authenticated = true;
      this.getProfileUser();
    } else {
      this.authenticated = false;
    }
  }

  getProfileUser() {
    this.loading = true;
    this.error = null;

    this.userService.getUserProfile().subscribe({
      next: (response) => {
        this.username = response.data.username;
        this.email = response.data.correo;
        this.loading = false;
      },
      error: (error) => {
        this.error = error.message;
        this.loading = false;
      },
    });
  }

  logout() {
    this.authService.logout();
    this.authenticated = false;
    this.username = '';
    this.email = '';
    this.router.navigate(['/']);
    const dropdown = document.getElementById('user-dropdown');
    if (dropdown) {
      dropdown.classList.add('hidden');
    }
  }
}
