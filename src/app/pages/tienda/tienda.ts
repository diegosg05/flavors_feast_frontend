import { Component, OnInit } from '@angular/core';
import { Footer } from "../../components/footer/footer";
import { Nav } from "../../components/nav/nav";
import { Header } from "../../components/header/header";
import { ProductService } from '../../services/product-service';
import { CardProduct } from "../../components/card-product/card-product";
import { Categoria, ProductoCart } from '../../interfaces/producto';
import { Cart } from '../../services/cart';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-tienda',
  imports: [Footer, Nav, Header, CardProduct, RouterLink],
  templateUrl: './tienda.html',
  styleUrl: './tienda.css'
})
export class Tienda implements OnInit{

  productsResult: Categoria[] = [];
  loading: boolean = false;
  error: string | null = null;

  productsCart: ProductoCart[] = [];
  totalProductosCart: number = 0;

  constructor(private productService: ProductService, private cart: Cart){}

  ngOnInit() {
    
    this.cart.productCart$.subscribe(data => {
      this.productsCart = data;
    });
    this.cart.totalProductos$.subscribe(total => {
      this.totalProductosCart = total;
    });
    this.getProducts();
  }

  getProducts() {
    this.loading = true;
    this.error = null;

    this.productService.getProducts().subscribe(
      {
        next: ((response) => {
          this.productsResult = response.data;
          this.loading = false;
        }),
        error: ((error) => {
          this.error = error.message;
          this.loading = false;
        })
      }
    );
  }

  eliminarProducto(id: number) {
    this.cart.eliminarProducto(id);
  }

  agregarProducto(producto: ProductoCart) {
    this.cart.agregarProducto(producto);
  }

  text: string = 'Nuestra Tienda';
  image: string = 'images-header/bannerstore.jpg';

}
