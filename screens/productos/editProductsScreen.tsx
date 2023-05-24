import React, { useReducer, useState } from 'react';
import { StyleSheet,Text,TextInput,TouchableOpacity,View,TouchableWithoutFeedback,Keyboard} from 'react-native';

interface ProductState {
    nombre_producto?: string;
    precio_compra?: string;
    precio_venta?: string;
    inventario?: string;
}

interface UpdateProductAction {
    type: 'UPDATE_PRODUCT';
    payload: ProductState;
}

type ProductAction = UpdateProductAction;

function productReducer(state: ProductState, action: ProductAction): ProductState {
    switch (action.type) {
        case 'UPDATE_PRODUCT':
            return {
                ...action.payload
        };
        default:
            return state;
    }
}

export default function EditProduct({ navigation, route }: any) {

    const [validationError, setValidationError] = useState<ProductState>({});
    
    const { id, nombre_producto, precio_compra, precio_venta, inventario } = route.params;

    const initialState: ProductState = {
        nombre_producto: '',
        precio_compra: '',
        precio_venta: '',
        inventario: ''
    };

    const [productState, dispatch] = useReducer(productReducer, initialState);

    function actualizarProducto() {

        let hasError = false;
        const errorMessages: ProductState = {};

        if (!productState.nombre_producto) {
            errorMessages.nombre_producto = 'Campo obligatorio';
            hasError = true;
        }

        if (!productState.precio_compra) {
            errorMessages.precio_compra = 'Campo obligatorio';
            hasError = true;
        }

        if (!productState.precio_venta) {
            errorMessages.precio_venta = 'Campo obligatorio';
            hasError = true;
        }

        if (!productState.inventario) {
            errorMessages.inventario = 'Campo obligatorio';
            hasError = true;
        }

        if (
            productState.precio_compra &&
            productState.precio_venta &&
            parseFloat(productState.precio_venta) <= parseFloat(productState.precio_compra)
        ) {
            errorMessages.precio_venta = 'El precio de venta debe ser mayor que el precio de compra';
            hasError = true;
        }

        if (hasError) {
            setValidationError(errorMessages);
            return;
        }

        fetch(`https://6464e4f3228bd07b353c1f9d.mockapi.io/productos/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productState)
        });

        navigation.navigate("Productos");
    }

    const dismissKeyboard = () => {
        Keyboard.dismiss();
    };

    return (
        <TouchableWithoutFeedback onPress={dismissKeyboard}>
            <View style={styles.container}>
                <View style={styles.containerLogin}>
                    <Text style={styles.upText}>Nombre producto actual: {nombre_producto}</Text>
                    <TextInput
                    style={styles.input}
                    onChangeText={text =>
                        dispatch({
                        type: 'UPDATE_PRODUCT',
                        payload: {
                            ...productState,
                            nombre_producto: text
                        }
                        })
                    }
                    />
                    {validationError.nombre_producto && (
                    <Text style={styles.errorText}>{validationError.nombre_producto}</Text>
                    )}


                    <Text style={styles.upText}>Precio compra actual: ${precio_compra}</Text>
                    <TextInput
                    style={styles.input}
                    onChangeText={text =>
                        dispatch({
                        type: 'UPDATE_PRODUCT',
                        payload: {
                            ...productState,
                            precio_compra: text
                        }
                        })
                    }
                    />
                    {validationError.precio_compra && (
                    <Text style={styles.errorText}>{validationError.precio_compra}</Text>
                    )}


                    <Text style={styles.upText}>Precio venta actual: ${precio_venta}</Text>
                    <TextInput
                    style={styles.input}
                    onChangeText={text =>
                        dispatch({
                        type: 'UPDATE_PRODUCT',
                        payload: {
                            ...productState,
                            precio_venta: text
                        }
                        })
                    }
                    />
                    {validationError.precio_venta && (
                    <Text style={styles.errorText}>{validationError.precio_venta}</Text>
                    )}


                    <Text style={styles.upText}>Inventario actual: {inventario}</Text>
                    <TextInput
                    style={styles.input}
                    onChangeText={text =>
                        dispatch({
                        type: 'UPDATE_PRODUCT',
                        payload: {
                            ...productState,
                            inventario: text
                        }
                        })
                    }
                    />
                    {validationError.inventario && (
                    <Text style={styles.errorText}>{validationError.inventario}</Text>
                    )}


                    <TouchableOpacity style={styles.button} onPress={actualizarProducto}>
                    <Text style={styles.buttonText}>Actualizar</Text>
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
    }
});
