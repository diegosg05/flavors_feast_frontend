import { Component } from '@angular/core';
import { Nav } from '../../components/nav/nav';
import { Footer } from '../../components/footer/footer';
import { UserService } from '../../services/user-service';
import { UserProfile } from '../../interfaces/user';
import { AuthService } from '../../services/auth-service';
import { PedidoResponse } from '../../interfaces/pedido';
import { PedidoService } from '../../services/pedido-service';
import { ReservaService } from '../../services/reserva-service';
import { ReservaResponse } from '../../interfaces/Reserva';

@Component({
  selector: 'app-profile',
  imports: [Nav, Footer],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile {
  userProfile!: UserProfile;
  pedidos: PedidoResponse[] = [];
  reservas: ReservaResponse[] = [];
  loading: boolean = false;
  error: string | null = null;

  authenticated: boolean = false;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private pedidoService: PedidoService,
    private reservaService: ReservaService
  ) {}

  ngOnInit() {
    this.loading = true;
    if (this.authService.isAuthenticated()) {
      this.authenticated = true;
      this.getProfileUser();
      this.getPurchases();
      this.getReservas();
    } else {
      this.authenticated = false;
    }
  }

  getProfileUser() {
    this.loading = true;
    this.error = null;

    this.userService.getUserProfile().subscribe({
      next: (response) => {
        this.userProfile = response.data;
        this.loading = false;
      },
      error: (error) => {
        this.error = error.message;
        this.loading = false;
      },
    });
  }

  getPurchases() {
    this.loading = true;
    this.error = null;

    this.pedidoService.getPedidos().subscribe({
      next: (response) => {
        this.pedidos = response.data;

        this.loading = false;
      },
      error: (error) => {
        this.error = error.message;
        this.loading = false;
      },
    });
  }

  getReservas() {
    this.loading = true;
    this.error = null;

    this.reservaService.getReservas().subscribe({
      next: (response) => {
        this.reservas = response.data;
        this.loading = false;
      },
      error: (error) => {
        this.error = error.message;
        this.loading = false;
      },
    });
  }
}
