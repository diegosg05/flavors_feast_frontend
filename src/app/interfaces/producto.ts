export interface Categoria{
    nombre: string,
    productos: Producto[]
}

export interface Producto{
    idProducto: number,
    nombre: string,
    descripcion: string,
    precio: number,
    imagenUrl: string
}

export interface ProductoCart extends Producto{
    cantidad: number
}