import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserService } from '../../services/user-service';

@Component({
  selector: 'app-login',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  loginForm: FormGroup;
  correo: FormControl;
  password: FormControl;

  loading: boolean = false;
  error: string | null = null;

  constructor(private userService: UserService, private router: Router) {
    this.correo = new FormControl('', [Validators.required, Validators.email]);
    this.password = new FormControl('', [Validators.required]);

    this.loginForm = new FormGroup({
      correo: this.correo,
      password: this.password,
    });
  }

  handleSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    } else {
      this.loading = true;
      this.error = null;

      this.userService.loginUser(this.loginForm.value).subscribe({
        next: (response) => {
          localStorage.setItem('token', response.data.token);
          this.loading = false;
          this.router.navigate(['/']);
        },
        error: (error) => {
          this.error = error.error?.mensaje;
          this.loading = false;
        },
      });
    }
  }
}
