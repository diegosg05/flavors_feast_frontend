import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import currency from 'currency.js';
import { RegularExpressions } from '../../services/regular-expressions';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import flatpickr from 'flatpickr';
import { ProductoCart } from '../../interfaces/producto';
import { Cart } from '../../services/cart';
import { PedidoService } from '../../services/pedido-service';
import { Pedido, DetallePedido } from '../../interfaces/pedido';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment-form',
  imports: [ReactiveFormsModule],
  templateUrl: './payment-form.html',
  styleUrl: './payment-form.css',
})
export class PaymentForm implements AfterViewInit {
  @ViewChild('fecha') fecha!: ElementRef;

  @Input()
  totalPrecio: number = 0;
  @Input()
  igv!: currency;
  @Input()
  delivery: number = 0;
  @Input()
  subtotal!: currency;
  @Input()
  tipoEntrega: string = '';
  @Input()
  direccion: string = '';
  @Input()
  sucursal: string = '';

  productsCart!: ProductoCart[];

  loading: boolean = false;
  error: string | null = null;
  payload!: Pedido;
  detalle!: DetallePedido[];

  fechaActual = new Date();

  pagoForm: FormGroup;
  nombreTitular: FormControl;
  numeroTarjeta: FormControl;
  fechaExp: FormControl;
  cvv: FormControl;

  regularExpressions!: any;

  constructor(private regularExp: RegularExpressions, private cart: Cart, private pedidoService: PedidoService, private router: Router) {
    this.regularExpressions = this.regularExp.getRegularExpressions();

    this.productsCart = this.cart.getProductos();

    this.nombreTitular = new FormControl('', {
      nonNullable: true,
      validators: [Validators.required]
    });
    this.numeroTarjeta = new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.pattern(this.regularExpressions.numeroTarjeta)
      ]
    });
    this.fechaExp = new FormControl('', {
      nonNullable: true,
      validators: [Validators.required]
    });
    this.cvv = new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.pattern(this.regularExpressions.cvv)
      ]
    });

    this.pagoForm = new FormGroup({
      nombreTitular: this.nombreTitular,
      numeroTarjeta: this.numeroTarjeta,
      fechaExp: this.fechaExp,
      cvv: this.cvv
    });
  }

  ngAfterViewInit() {
    const fechaMin = new Date(this.fechaActual);

    flatpickr(this.fecha.nativeElement, {
      dateFormat: 'm-y',
      minDate: fechaMin
    });
  }

  handleSubmit() {
    this.loading = true;
    this.error = null;

    if (this.pagoForm.valid) {
      this.payload = this.realizarCompra();

      this.pedidoService.postPedido(this.payload).subscribe({
        next: (response) => {
          this.loading = false;
          this.router.navigate(['/']);
        },
        error: (error) => {
          this.loading = false;
          this.error = error.message;
        },
      });

    } else {
      this.pagoForm.markAllAsTouched();
    }
  }

  ngOnInit() {
    // Limpieza automática y sincronización segura con Angular
    this.numeroTarjeta.valueChanges.subscribe((val) => {
      const limpio = val.replace(/[^0-9]/g, '').slice(0, 16);
      if (val !== limpio) {
        this.numeroTarjeta.setValue(limpio, { emitEvent: false });
      }
    });

    this.cvv.valueChanges.subscribe((val) => {
      const limpio = val.replace(/[^0-9]/g, '').slice(0, 3);
      if (val !== limpio) {
        this.cvv.setValue(limpio, { emitEvent: false });
      }
    });
  }

  realizarCompra(): Pedido {
    this.detalle = this.productsCart.map((producto) => ({
      idProducto: producto.idProducto,
      cantidad: producto.cantidad
    }));

    return {
      tipoEntrega: this.tipoEntrega,
      direccion: this.direccion,
      sucursal: this.sucursal,
      detallePedido: this.detalle,
      subtotal: this.subtotal.value
    };
  }
}
