import React, { useReducer, useState } from 'react';
import { StyleSheet,Text,TextInput,TouchableOpacity,View,TouchableWithoutFeedback,Keyboard} from 'react-native';

export default function SeeSales({ navigation, route }: any) {

    
    const { id, articulo_comprado, cantidad_comprada, fecha_venta, subtotal, total } = route.params;

    return (
        <TouchableWithoutFeedback>
            <View style={styles.container}>
                <View style={styles.containerLogin}>
                    <Text style={styles.upText}>Articulo comprado:</Text>
                    <Text style={styles.input}>{articulo_comprado}</Text>


                    <Text style={styles.upText}>Cantidad comprada:</Text>
                    <Text style={styles.input}>{cantidad_comprada}</Text>



                    <Text style={styles.upText}>Fecha venta:</Text>
                    <Text style={styles.input}>{fecha_venta}</Text>


                    <Text style={styles.upText}>Subtotal:</Text>
                    <Text style={styles.input}>{subtotal}</Text>

                    
                    <Text style={styles.upText}>Total:</Text>
                    <Text style={styles.input}>{total}</Text>

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
        borderRadius: 5,
        textAlign: 'center',
        paddingTop: 10
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
