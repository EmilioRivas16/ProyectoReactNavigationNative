export interface Servicio {
    id: number;
    nombre_servicio: string,
    precio_venta: string,
    costo_servicio: string
}

export interface ServiceState {
    nombre_servicio?: string;
    costo_servicio?: string;
    precio_venta?: string;
}

export interface InsertServiceAction {
    type: 'INSERT_SERVICE';
    payload: ServiceState;
}