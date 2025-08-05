import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserRegister } from '../../interfaces/user';
import { UserService } from '../../services/user-service';

@Component({
  selector: 'app-register',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {

  registerForm: FormGroup;
  nombre: FormControl;
  username: FormControl;
  email: FormControl;
  telefono: FormControl;
  password: FormControl;
  confirmPassword: FormControl;
  terms: FormControl;

  UserRegister!: UserRegister;

  loading = false;
  error: string | null = null;

  constructor(private userService: UserService, private router: Router) {

    this.nombre = new FormControl('', [Validators.required]);
    this.username = new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]);
    this.email = new FormControl('', [Validators.required, Validators.email]);
    this.telefono = new FormControl('', [Validators.required, Validators.pattern('^[0-9]{9}$')]);
    this.password = new FormControl('', [Validators.required, Validators.minLength(6)]);
    this.confirmPassword = new FormControl('', [Validators.required]);
    this.terms = new FormControl(false, [Validators.requiredTrue]);

    this.registerForm = new FormGroup({
      nombre: this.nombre,
      username: this.username,
      email: this.email,
      telefono: this.telefono,
      password: this.password,
      confirmPassword: this.confirmPassword,
      terms: this.terms
    }, {
      validators: this.passwordMatchValidator
    });
  }

  passwordMatchValidator(form: AbstractControl): ValidationErrors | null {
  const password = form.get('password')?.value;
  const confirmPassword = form.get('confirmPassword')?.value;

  if (password !== confirmPassword) {
    form.get('confirmPassword')?.setErrors({ passwordMismatch: true });
    return { passwordMismatch: true };
  }

  return null;
}

  onSubmit() {
    this.loading = true;
    this.error = null;
    
    if (this.registerForm.valid) {

      const datosFormulario = this.registerForm.value;

      this.UserRegister = {
        nombre: datosFormulario.nombre,
        username: datosFormulario.username,
        correo: datosFormulario.email,
        password: datosFormulario.password,
        telefono: datosFormulario.telefono,
      };

      console.log('Form submitted:', this.UserRegister);
      this.userService.registerUser(this.UserRegister).subscribe({
        next: (response) => {
          localStorage.setItem('token', response.data.token);
          this.loading = false;
          this.router.navigate(['/']);
        },
        error: (error) => {
          console.error('Error registering user', error);
          this.loading = false;
          this.error = error;
        }
      });
      
    } else {
       this.registerForm.markAllAsTouched();
    }
  }
}
