declare global {
  interface Window {
    iniciarReservaForm: () => void;
  }
}

import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Nav } from '../../components/nav/nav';
import { Header } from '../../components/header/header';
import { Footer } from '../../components/footer/footer';
import flatpickr from 'flatpickr';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ReservaService } from '../../services/reserva-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reserva',
  imports: [Nav, Header, Footer, ReactiveFormsModule],
  templateUrl: './reserva.html',
  styleUrl: './reserva.css',
})
export class Reserva implements AfterViewInit {
  @ViewChild('fecha') fecha!: ElementRef;
  @ViewChild('hora') hora!: ElementRef;

  reservaForm: FormGroup;
  personas: FormControl;
  fechaReserva: FormControl;
  horaReserva: FormControl;
  sucursal: FormControl;

  loading: boolean = false;
  error: string | null = null;

  constructor(private reservaService: ReservaService, private router: Router){
      this.personas = new FormControl('', [Validators.required, Validators.min(1), Validators.max(6)]);
      this.fechaReserva = new FormControl('', [Validators.required]);
      this.horaReserva = new FormControl('', [Validators.required]);
      this.sucursal = new FormControl('', [Validators.required]);

      this.reservaForm = new FormGroup({
        personas: this.personas,
        fechaReserva: this.fechaReserva,
        horaReserva: this.horaReserva,
        sucursal: this.sucursal,
      });
  }

  fechaActual: Date = new Date();

  ngAfterViewInit(): void {
    const fechaMin = new Date(this.fechaActual);
    fechaMin.setDate(fechaMin.getDate() + 1);

    const fechaMax: Date = new Date(this.fechaActual);
    fechaMax.setMonth(fechaMax.getMonth() + 2);

    window.iniciarReservaForm?.();

    flatpickr(this.fecha.nativeElement, {
      dateFormat: 'Y-m-d',
      inline: true,
      minDate: fechaMin,
      maxDate: fechaMax,
    });

    flatpickr(this.hora.nativeElement, {
      enableTime: true,
      noCalendar: true,
      dateFormat: 'H:i',
      minTime: '13:00',
      maxTime: '18:00',
    });
  }

  text: string = 'Reserva';
  image: string = 'images-header/bannerreserva.jpg';

  HandleSubmit() {
    this.loading = true;
    this.error = null;

    if (this.reservaForm.valid) {
      this.reservaService.postReserva(this.reservaForm.value).subscribe({
        next: (data) => {
          this.loading = false;
          this.router.navigate(['/']);
        },
        error: (error) => {
          this.loading = false;
          this.error = error.message;
        }
      });
    }
  }
}
