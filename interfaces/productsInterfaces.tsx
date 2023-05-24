export interface Producto {
    id: number;
    nombre_producto: string,
    precio_venta: string,
    precio_compra: string,
    inventario: number
}

export interface ProductState {
    nombre_producto?: string;
    precio_compra?: string;
    precio_venta?: string;
    inventario?: string;
}

export interface InsertProductAction {
    type: 'INSERT_PRODUCT';
    payload: ProductState;
}