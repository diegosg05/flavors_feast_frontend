import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Categoria, Producto } from '../../interfaces/producto';
import { Product } from '../../services/product';

@Component({
  selector: 'app-card-article-carta',
  imports: [],
  templateUrl: './card-article-carta.html',
  styleUrl: './card-article-carta.css',
})
export class CardArticleCarta implements OnInit {
  @ViewChildren('seccion') secciones!: QueryList<ElementRef>;

  productos: Categoria[] = [];

  constructor(private productsResult: Product){
    this.productos = this.productsResult.getProducts();
  }

  groupedMenu: { categoria: string; grupos: { image: string, products: Producto[] }[] }[] = [];

  ngOnInit() {
    this.groupedMenu = this.productos.map(cat => {
      const grupos: { image: string, products: Producto[] }[] = [];
      for (let i = 0; i < cat.productos.length; i += 3) {
        grupos.push({ image: cat.productos[i].imagenUrl, products: cat.productos.slice(i, i + 3)});
      }
      return { categoria: cat.nombre, grupos };
    });
  }

  irASeccion(seccionId: string) {
    const target = this.secciones.find((el) => el.nativeElement.getAttribute('id') === seccionId);
    if (target) {
      target.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
