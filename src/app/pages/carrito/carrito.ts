import { Component, OnInit } from '@angular/core';
import { Nav } from '../../components/nav/nav';
import { Footer } from '../../components/footer/footer';
import { RouterLink } from '@angular/router';
import { PaymentForm } from '../../components/payment-form/payment-form';
import { Cart } from '../../services/cart';
import { ProductoCart } from '../../interfaces/producto';
import currency  from 'currency.js';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-carrito',
  imports: [Nav, Footer, RouterLink, PaymentForm, FormsModule],
  templateUrl: './carrito.html',
  styleUrl: './carrito.css',
})
export class Carrito implements OnInit {

  constructor(private cart: Cart) {}

  productsCart: ProductoCart[] = [];
  totalPrecio: number = 0;
  igv!: currency;
  delivery: number = 12;
  subtotal!: currency;

  tipoEntrega: string = 'delivery';
  direccion: string = '';
  sucursal: string = '';

  ngOnInit() {

    this.cart.productCart$.subscribe((data) => {
      this.productsCart = data;
    });

    this.getPrecio();
    this.getIGV();
    this.getSubtotal();

  }

  getPrecio() {
    this.totalPrecio = this.cart.getTotalPrecio();
  }

  getIGV() {
    this.igv = currency(this.totalPrecio).divide(100).multiply(18);
  }

  getSubtotal() {
    this.subtotal = currency(this.totalPrecio).add(this.igv).add(this.delivery);
  }

  elegirTipoEntrega(tipo: string) {
    if (tipo === 'delivery') {
      this.tipoEntrega = 'delivery';
      this.sucursal = '';
      this.delivery = 12;
      this.getSubtotal();
    } else {
      this.tipoEntrega = 'retiro';
      this.direccion = '';
      this.delivery = 0;
      this.getSubtotal();
    }
  }

}
