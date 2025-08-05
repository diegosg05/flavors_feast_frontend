import { Component, Input } from '@angular/core';
import { Producto } from '../../interfaces/producto';
import { Cart } from '../../services/cart';

@Component({
  selector: 'app-card-product',
  imports: [],
  templateUrl: './card-product.html',
  styleUrl: './card-product.css',
})
export class CardProduct {
  @Input()
  productoAgregado!: Producto;

  constructor(private cart: Cart) {}

  agregarProducto(producto: Producto) {
    this.cart.agregarProducto(producto);
  }

}
