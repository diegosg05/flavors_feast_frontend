export interface Reserva {
  personas: number;
  fechaReserva: string;
  horaReserva: string;
  sucursal: string;
}

export interface ReservaResponse {
  personas: number;
  fechaReserva: string;
  horaReserva: string;
  sucursal: string;
  estado: string;
}
