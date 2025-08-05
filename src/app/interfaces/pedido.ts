export interface Pedido {
    direccion: string,
    sucursal: string,
    tipoEntrega: string,
    subtotal: number,
    detallePedido: DetallePedido[]
}

export interface DetallePedido {
    idProducto: number,
    cantidad: number
}

export interface PedidoResponse {
    idPedido: number,
    fechaPedido: string,
    tipoEntrega: string,
    direccion: string,
    sucursal: string,
    subtotal: number,
    detallePedido: DetallePedidoResponse[],
    Estado: string
}

export interface DetallePedidoResponse {
    nombre: string,
    descripcion: string,
    imagenUrl: string,
    cantidad: number,
    precioUnitario: number
}