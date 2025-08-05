import { Injectable } from '@angular/core';
import { Producto, ProductoCart } from '../interfaces/producto';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Cart {
  private productosCart: ProductoCart[] = [];

  // Observables para exponer en el DOM
  private totalProductosSubject = new BehaviorSubject<number>(0);
  public totalProductos$ = this.totalProductosSubject.asObservable(); // observable público

  private productCartSubject = new BehaviorSubject<ProductoCart[]>([]);
  public productCart$ = this.productCartSubject.asObservable();

  constructor() {}

  getProductos(): ProductoCart[] {
    return this.productosCart;
  }

  getTotalProductos(): number {
    return this.productosCart.reduce((acc, p) => acc + p.cantidad, 0);
  }

  getTotalPrecio(): number {
    return this.productosCart.reduce((acc, p) => acc + p.cantidad * p.precio, 0);
  }

  agregarProducto(producto: Producto) {
    const index = this.productosCart.findIndex(p => p.idProducto === producto.idProducto);
    if (index !== -1) {
      this.productosCart[index].cantidad++;
    } else {
      this.productosCart.push({ ...producto, cantidad: 1 });
    }

    this.actualizarEstado();
  }

  eliminarProducto(id: number) {
    this.productosCart = this.productosCart.filter(p => p.idProducto !== id);
    this.actualizarEstado();
  }

  private actualizarEstado() {
    this.productCartSubject.next([...this.productosCart]); // se emite una copia nueva
    this.totalProductosSubject.next(this.getTotalProductos());
  }
}
