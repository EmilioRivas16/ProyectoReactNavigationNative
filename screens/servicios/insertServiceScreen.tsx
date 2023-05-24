import React, { useReducer, useState } from 'react';
import { StyleSheet,Text,TextInput,TouchableOpacity,View,TouchableWithoutFeedback,Keyboard} from 'react-native';

import { useValidation } from '../../hooks/useValidationService';
import { ServiceState } from '../../interfaces/servicesInterfaces';
import { InsertServiceAction } from '../../interfaces/servicesInterfaces';

type ServiceAction = InsertServiceAction;

function serviceReducer(state: ServiceState, action: ServiceAction): ServiceState {
    switch (action.type) {
        case 'INSERT_SERVICE':
            return {
                ...action.payload
            };
        default:
            return state;
    }
}

export default function InsertService({ navigation }: any) {

    const [validationError, setValidationError] = useState<ServiceState>({});

    const initialState: ServiceState = {
        nombre_servicio: '',
        costo_servicio: '',
        precio_venta: ''
    };

    const [ServiceState, dispatch] = useReducer(serviceReducer, initialState);

    const validations = {
        nombre_producto: {
            required: true,
            errorMessage: 'Campo obligatorio',
        },
        precio_compra: {
            required: true,
            errorMessage: 'Campo obligatorio',
        },
        precio_venta: {
            required: true,
            errorMessage: 'Campo obligatorio',
        },
        inventario: {
            required: true,
            errorMessage: 'Campo obligatorio',
        },
    };

    const [errors, validateField] = useValidation(validations);

    function insertarServicio() {
        let hasError = false;
        const errorMessages: ServiceState = {};

        if (!ServiceState.nombre_servicio) {
            errorMessages.nombre_servicio = 'Campo obligatorio';
            hasError = true;
        }

        if (!ServiceState.costo_servicio) {
            errorMessages.costo_servicio = 'Campo obligatorio';
            hasError = true;
        }

        if (!ServiceState.precio_venta) {
            errorMessages.precio_venta = 'Campo obligatorio';
            hasError = true;
        }

        if (
            ServiceState.costo_servicio &&
            ServiceState.precio_venta &&
            parseFloat(ServiceState.precio_venta) <= parseFloat(ServiceState.costo_servicio)
        ) {
            errorMessages.precio_venta = 'El precio de venta debe ser mayor que el costo del servicio';
            hasError = true;
        }

        if (hasError) {
            setValidationError(errorMessages);
            return;
        }

        fetch(`https://6466937d2ea3cae8dc1a4b97.mockapi.io/servicios`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(ServiceState)
        });

        navigation.navigate('Servicios');
    }

    const dismissKeyboard = () => {
        Keyboard.dismiss();
    };

    return (
        <TouchableWithoutFeedback onPress={dismissKeyboard}>
            <View style={styles.container}>
                <View style={styles.containerLogin}>
                    <Text style={styles.upText}>Nombre servicio:</Text>
                    <TextInput
                    style={styles.input}
                    onChangeText={text =>
                        dispatch({
                        type: 'INSERT_SERVICE',
                        payload: {
                            ...ServiceState,
                            nombre_servicio: text
                        }
                        })
                    }
                    />
                    {validationError.nombre_servicio && (
                    <Text style={styles.errorText}>{validationError.nombre_servicio}</Text>
                    )}



                    <Text style={styles.upText}>Costo servicio:</Text>
                    <TextInput
                    style={styles.input}
                    onChangeText={text =>
                        dispatch({
                        type: 'INSERT_SERVICE',
                        payload: {
                            ...ServiceState,
                            costo_servicio: text
                        }
                        })
                    }
                    />
                    {validationError.costo_servicio && (
                    <Text style={styles.errorText}>{validationError.costo_servicio}</Text>
                    )}



                    <Text style={styles.upText}>Precio venta:</Text>

                    <TextInput
                    style={styles.input}
                    onChangeText={text =>
                        dispatch({
                        type: 'INSERT_SERVICE',
                        payload: {
                            ...ServiceState,
                            precio_venta: text
                        }
                        })
                    }
                    />
                    {validationError.precio_venta && (
                    <Text style={styles.errorText}>{validationError.precio_venta}</Text>
                    )}


                    <TouchableOpacity style={styles.button} onPress={insertarServicio}>
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
    }
});
