import React, { useReducer, useState, useEffect } from 'react';
import { StyleSheet,Text,TextInput,TouchableOpacity,View,TouchableWithoutFeedback,Keyboard} from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list'
import axios from 'axios';

import { useValidation } from '../../hooks/useValidationProduct';
import { SaleState } from '../../interfaces/salesInterfaces';
import { InsertSaleAction } from '../../interfaces/salesInterfaces';

interface Product {
    id: string;
    nombre_producto: string;
    precio_venta: string;
    inventario: string;
}

interface Service {
    id: string;
    nombre_servicio: string;
    precio_venta: string;
}

type SaleAction = InsertSaleAction;

function saleReducer(state: SaleState, action: SaleAction): SaleState {
    switch (action.type) {
        case 'INSERT_SALE':
            return {
                ...action.payload
            };
        default:
            return state;
    }
}

export default function InsertSales({ navigation }: any) {

    const [selected, setSelected] = useState("");
    const [selectedPosition, setSelectedPosition] = useState(0);
    const [data, setData] = useState<{ key: string, value: string }[]>([]);
    const [precios, setPrecios] = useState<{ precio: string }[]>([]);
    const [precioItemActual, setPrecioItemActual] = useState("");
    const [cantidadArticulos, setCantidadArticulos] = useState("");

    useEffect(() => {
        const getProductData = axios.get<Product[]>('https://6464e4f3228bd07b353c1f9d.mockapi.io/productos');
        const getServiceData = axios.get<Service[]>('https://6466937d2ea3cae8dc1a4b97.mockapi.io/servicios');

    Promise.all([getProductData, getServiceData])
        .then(([productResponse, serviceResponse]) => {
            const products = productResponse.data.map((item: Product) => ({ key: item.id, value: item.nombre_producto }));
            const services = serviceResponse.data.map((item: Service) => ({ key: item.id, value: item.nombre_servicio }));
    
            const productsPrices = productResponse.data.map((item: Product) => ({ precio: item.precio_venta }));
            const servicesPrices = serviceResponse.data.map((item: Service) => ({ precio: item.precio_venta }));
    
            const combinedData = [...products, ...services];
            setData(combinedData);
    
            const combinedPrices = [...productsPrices, ...servicesPrices];
            setPrecios(combinedPrices);

        })
        .catch(error => {
            console.error('Error al obtener los datos de las APIs:', error);
        });
    }, []);

    const handleSelected = (val: string) => {
        setSelected(val);
        const selectedIdx = data.findIndex((item) => item.value === val);
        setSelectedPosition(selectedIdx);

        const precioItemSeleccionado = precios[selectedIdx].precio;
        setPrecioItemActual(precioItemSeleccionado);
    };

    const handleSelect = () => {
        dispatch({
            type: 'INSERT_SALE',
            payload: {
                ...saleState,
                articulo_comprado: selected,
                posicion_seleccionada: selectedPosition
            }
        });
    };

    const [validationError, setValidationError] = useState<SaleState>({});

    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split('T')[0];

    const initialState: SaleState = {
        articulo_comprado: '',
        cantidad_comprada: 0,
        fecha_venta: formattedDate,
        subtotal: '',
        total: ''
    };

    const [saleState, dispatch] = useReducer(saleReducer, initialState);

    const validations = {
        articulo_comprado: {
            required: true,
            errorMessage: 'Campo obligatorio',
        },
        cantidad_comprada: {
            required: true,
            errorMessage: 'Campo obligatorio',
        }
    };

    const [errors, validateField] = useValidation(validations);

    const obtenerIdProducto = async (nombreProducto: string | undefined): Promise<string | null> => {
        try {
            const response = await fetch('https://6464e4f3228bd07b353c1f9d.mockapi.io/productos');
            const data = await response.json();

            const productoEncontrado = data.find((producto: any) => producto.nombre_producto === nombreProducto);

            if (productoEncontrado) {
                return productoEncontrado.id;
            } else {
                return null;
            }
        } catch (error) {
            console.error('Error al obtener el ID del producto:', error);
            return null;
        }
    };

    const insertarProducto = () => {
        let hasError = false;
        const errorMessages: SaleState = {};
    
        if (!saleState.articulo_comprado) {
            errorMessages.articulo_comprado = 'Campo obligatorio';
            hasError = true;
        }
    
        if (hasError) {
            setValidationError(errorMessages);
            return;
        }

        const subtotal = precioItemActual
        const total = Number(precioItemActual) * Number(cantidadArticulos)

        const updatedSaleState: SaleState = {
            ...saleState,
            subtotal: subtotal.toString(),
            total: total.toString()
        };

        fetch(`https://6466937d2ea3cae8dc1a4b97.mockapi.io/ventas`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedSaleState)
        });

        const nombreProducto = saleState.articulo_comprado

        obtenerIdProducto(nombreProducto)
        .then((idProducto) => {

            if (idProducto) {

                const fetchProducto = async () => {
                    try {
                        const response = await axios.get('https://6464e4f3228bd07b353c1f9d.mockapi.io/productos');
                        const productos: Product[] = response.data;
                        const productoEncontrado = productos.find(producto => producto.id === idProducto);
                
                        if (productoEncontrado) {
                        const stockActualProduct = productoEncontrado.inventario;

                        const restarCantidadArticulos = async (idProducto: string, cantidadArticulos: number): Promise<void> => {
                            try {
                                console.log("Stock actual: ", stockActualProduct)
                                console.log("Cantidad de articulos a comprar: ", cantidadArticulos)
                            const response = await fetch(`https://6464e4f3228bd07b353c1f9d.mockapi.io/productos/${idProducto}`, {
                                method: 'PUT',
                                headers: {
                                'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({
                                inventario: Number(stockActualProduct) - cantidadArticulos,
                                }),
                                
                            });
                        
                            if (!response.ok) {
                                throw new Error('No se pudo actualizar el inventario del producto');
                            }
                        
                            console.log(`Se ha actualizado el inventario del producto con ID "${idProducto}"`);
                            } catch (error) {
                            console.error('Error al restar la cantidad de artículos al inventario:', error);
                            }
                        };
    
                        restarCantidadArticulos(idProducto, Number(cantidadArticulos));

                        } else {
                        console.log('Producto no encontrado');
                        }
                    } catch (error) {
                        console.log('Error al obtener los productos:', error);
                    }
                };

                fetchProducto()

            } else {
            console.log(`No se encontró ningún producto con el nombre "${nombreProducto}"`);
            }
        })
        .catch((error) => {
            console.error('Error al obtener el ID del producto:', error);
        });


        navigation.navigate('Ventas');
    }

    const dismissKeyboard = () => {
        Keyboard.dismiss();
    };

    useEffect(() => {
        updateTotal();
    }, [saleState.cantidad_comprada]);

    const updateTotal = () => {
        const cantidadCompradaNumber = saleState.cantidad_comprada;
        setCantidadArticulos(cantidadCompradaNumber !== undefined ? cantidadCompradaNumber.toString() : '0');
    };



    return (
        <TouchableWithoutFeedback onPress={dismissKeyboard}>
            <View style={styles.container}>
                <View style={styles.containerLogin}>
                    <Text style={styles.upText}>Nombre producto/servicio:</Text>
                    <SelectList
                        placeholder="Seleccione el producto/servicio"
                        boxStyles={{ marginBottom: 30 }}
                        setSelected={handleSelected}
                        data={data}
                        save="value"
                        onSelect={handleSelect}
                    />

                    {validationError.articulo_comprado && (
                        <Text style={styles.errorText}>{validationError.articulo_comprado}</Text>
                    )}



                    <Text style={styles.upText}>Cantidad de artículos:</Text>
                    <TextInput
                    style={styles.input}
                    onChangeText={text => {
                        dispatch({
                            type: 'INSERT_SALE',
                            payload: {
                                ...saleState,
                                cantidad_comprada: Number(text)
                            }
                        });
                        updateTotal();
                    }}
                    />
                    {validationError.cantidad_comprada && (
                    <Text style={styles.errorText}>{validationError.cantidad_comprada}</Text>
                    )}



                    <Text style={styles.upText}>Subtotal:</Text>
                    <Text style={styles.inputText}>{precioItemActual}</Text>



                    <Text style={styles.upText}>Total:</Text>
                    <Text style={styles.input}>{Number(precioItemActual) * Number(cantidadArticulos)}</Text>




                    <TouchableOpacity style={styles.button} onPress={insertarProducto}>
                        <Text style={styles.buttonText}>Insertar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#BBDFDC'
    },
    containerLogin: {
        width: '90%',
        borderColor: '#6FA19C',
        borderWidth: 3,
        backgroundColor: '#E5E5E5',
        padding: 20,
        borderRadius: 8
    },
    contenedorImagen: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    imagen: {
        width: 100,
        height: 100
    },
    input: {
        width: '100%',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 12,
        paddingHorizontal: 10,
        borderRadius: 5
    },
    upText: {
        margin: 5,
        fontSize: 15
    },
    button: {
        backgroundColor: '#189E90',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 4,
        marginTop: 15
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    errorText: {
        color: 'red'
    },
    inputText: {
        width: '100%',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 12,
        paddingHorizontal: 10,
        borderRadius: 5,
        textAlign: 'center',
        paddingTop: 10
    },
});
