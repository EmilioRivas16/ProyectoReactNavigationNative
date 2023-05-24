export interface Venta {
    id: number;
    articulo_comprado: string,
    cantidad_comprada: string,
    fecha_venta: string,
    subtotal: string,
    total: string
}

export interface SaleState {
    articulo_comprado?: string,
    cantidad_comprada?: number,
    fecha_venta?: string,
    subtotal?: string,
    total?: string,
    posicion_seleccionada?: number
}

export interface InsertSaleAction {
    type: 'INSERT_SALE';
    payload: SaleState;
}