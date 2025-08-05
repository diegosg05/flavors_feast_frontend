import { Injectable } from '@angular/core';
import { Categoria } from '../interfaces/producto';

@Injectable({
  providedIn: 'root',
})
export class Product {
  
  private productsResult: Categoria[] = [
    {
      nombre: 'Bebidas',
      productos: [
        {
          idProducto: 1,
          nombre: 'Chicha Morada Ancestral',
          descripcion:
            'Infusión de maíz morado, piña, clavo y canela, con reducción de chancaca y toque cítrico.',
          imagenUrl: 'images-products/chicha.jpg',
          precio: 28,
        },
        {
          idProducto: 2,
          nombre: 'Limonada Andina',
          descripcion:
            'Limón fresco, hierbaluisa y esencia de muña, endulzada con miel de abeja serrana.',
          imagenUrl: '',
          precio: 24,
        },
        {
          idProducto: 3,
          nombre: 'Mate de Coca Premium',
          descripcion:
            'Infusión de hojas seleccionadas de coca y hierbas andinas con notas florales.',
          imagenUrl: '',
          precio: 26,
        },
        {
          idProducto: 4,
          nombre: 'Jugo de Camu Camu',
          descripcion:
            'Fruta amazónica con alto contenido de vitamina C, servido en pureza.',
          imagenUrl: 'images-products/Pisco-Sour.jpg',
          precio: 30,
        },
        {
          idProducto: 5,
          nombre: 'Emoliente Gourmet',
          descripcion:
            'Infusión de cebada, linaza y hierbas aromáticas, con un toque de pisco.',
          imagenUrl: '',
          precio: 32,
        },
        {
          idProducto: 6,
          nombre: 'Chilcano de Maracuyá',
          descripcion:
            'Pisco premium, ginger ale, jugo de maracuyá y gotas de amargo de angostura.',
          imagenUrl: '',
          precio: 38,
        },
      ],
    },
    {
      nombre: 'Entradas',
      productos: [
        {
          idProducto: 7,
          nombre: 'Causa Limeña de Trucha Ahumada',
          descripcion:
            'Puré de papa amarilla orgánica, trucha ahumada, palta y emulsión de ají amarillo.',
          imagenUrl: 'images-products/Causa.jpg',
          precio: 58,
        },
        {
          idProducto: 8,
          nombre: 'Tiradito de Ají Amarillo',
          descripcion:
            'Láminas de pescado fresco, leche de tigre cremosa, ají amarillo y crocante de maíz.',
          imagenUrl: '',
          precio: 72,
        },
        {
          idProducto: 9,
          nombre: 'Ocopa Andina con Quinua',
          descripcion:
            'Salsa de huacatay y ají mirasol sobre papas nativas y crocante de quinua.',
          imagenUrl: '',
          precio: 55,
        },
      ],
    },
    {
      nombre: 'Platos',
      productos: [
        {
          idProducto: 10,
          nombre: 'Lomo Saltado de Res Wagyu',
          descripcion:
            'Salteado en wok con cebolla roja, tomate, sillao artesanal y papas nativas crocantes.',
          imagenUrl: 'images-products/lomo-saltado.jpg',
          precio: 145,
        },
        {
          idProducto: 11,
          nombre: 'Arroz con Pato Norteño',
          descripcion:
            'Confit de pato sobre arroz meloso con culantro, cerveza negra y ají amarillo.',
          imagenUrl: '',
          precio: 128,
        },
        {
          idProducto: 12,
          nombre: 'Seco de Cabrito al Pisco',
          descripcion:
            'Cabrito tierno marinado en chicha de jora, acompañado de loche y frejoles.',
          imagenUrl: '',
          precio: 135,
        },
        {
          idProducto: 13,
          nombre: 'Ají de Gallina de Corral',
          descripcion:
            'Pechuga deshilachada en crema de ají amarillo, con pecanas y queso andino.',
          imagenUrl: 'images-products/aji-de-gallina.jpg',
          precio: 95,
        },
        {
          idProducto: 14,
          nombre: 'Ceviche Clásico de Corvina',
          descripcion:
            'Corvina fresca en leche de tigre, ají limo, cebolla roja y maíz chulpe crocante.',
          imagenUrl: '',
          precio: 110,
        },
        {
          idProducto: 15,
          nombre: 'Tacu Tacu con Lomo Fino',
          descripcion:
            'Tacu tacu de frejoles negros y arroz, con lomo fino y salsa criolla.',
          imagenUrl: '',
          precio: 120,
        },
        {
          idProducto: 16,
          nombre: 'Pachamanca Moderna',
          descripcion:
            'Carnes selectas (cordero, cerdo, pollo) al vapor con hierbas andinas, servidas con papas nativas y habas.',
          imagenUrl: 'images-products/pachamanca.jpg',
          precio: 140,
        },
        {
          idProducto: 17,
          nombre: 'Chupe de Camarones Arequipeño',
          descripcion:
            'Sopa cremosa con camarones del sur, leche, papas y ají panca.',
          imagenUrl: '',
          precio: 115,
        },
        {
          idProducto: 18,
          nombre: 'Cuy Crocante con Salsa de Maní',
          descripcion:
            'Cuy dorado en manteca andina, acompañado de papa dorada y ensalada criolla.',
          imagenUrl: '',
          precio: 130,
        },
      ],
    },
    {
      nombre: 'Postres',
      productos: [
        {
          idProducto: 19,
          nombre: 'Suspiro Limeño de Autor',
          descripcion:
            'Clásico manjar con merengue al Oporto y toque de cacao amazónico.',
          imagenUrl: 'images-products/picarones.jpg',
          precio: 45,
        },
        {
          idProducto: 20,
          nombre: 'Picarones con Miel de Chancaca y Pisco',
          descripcion:
            'Masa de zapallo y camote, bañada en miel artesanal con un toque alcohólico.',
          imagenUrl: '',
          precio: 42,
        },
        {
          idProducto: 21,
          nombre: 'Tarta de Lúcuma y Chocolate Bitter',
          descripcion:
            'Base crocante, mousse de lúcuma y cobertura de chocolate peruano.',
          imagenUrl: '',
          precio: 50,
        },
        {
          idProducto: 22,
          nombre: 'Helado de Quinua y Algarrobina',
          descripcion:
            'Cremoso helado artesanal con sabores andinos y amazónicos.',
          imagenUrl: 'images-products/mazamorra-morada.jpg',
          precio: 38,
        },
        {
          idProducto: 23,
          nombre: 'Mazamorra Morada con Crocante de Quinua',
          descripcion:
            'Postre clásico con un twist crocante y frutos deshidratados.',
          imagenUrl: '',
          precio: 35,
        },
        {
          idProducto: 24,
          nombre: 'Cheesecake de Maracuyá Amazónica',
          descripcion:
            'Base de galleta andina con mousse de maracuyá y coulis tropical.',
          imagenUrl: '',
          precio: 48,
        },
      ],
    },
  ];

  constructor() {}

  getProducts(): Categoria[] {
    return this.productsResult;
  }
}
