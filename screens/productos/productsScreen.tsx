import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, RefreshControl } from 'react-native';
import { Button, ListItem } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { Producto } from '../../interfaces/productsInterfaces';


export default function Products({navigation}: any) {

    const [productos, setProductos] = useState<Producto[]>([]);

    useEffect(() => {
        fetch('https://6464e4f3228bd07b353c1f9d.mockapi.io/productos')
            .then(response => response.json())
            .then(data => setProductos(data))
            .catch(error => console.error(error));
    }, []);

    const handleDeleteProducto = (id: any) => {
        fetch(`https://6464e4f3228bd07b353c1f9d.mockapi.io/productos/${id}`, {
            method: 'DELETE',
        })
        .then(response => {
            setProductos(prevProductos => prevProductos.filter(productos => productos.id !== id));
        })
        .catch(error => console.error(error));    
    };

    const [refreshing, setRefreshing] = React.useState(false);

    const handleRefresh = () => {
        setRefreshing(true);
        fetch('https://6464e4f3228bd07b353c1f9d.mockapi.io/productos')
            .then(response => response.json())
            .then(data => setProductos(data))
            .catch(error => console.error(error))
            .finally(() => setRefreshing(false));
    };

    return (
        <View style={styles.container}>
            <Button title="Agregar producto" onPress={() => navigation.navigate("InsertarProductos")}></Button>
            <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}>
                {
                    productos.map(({ id, nombre_producto, precio_venta, precio_compra, inventario }) => 
                        (
                            <ListItem
                                key={id}
                                title={`Producto: ${nombre_producto}\nPrecio Venta: $${precio_venta}\nPrecio Compra: $${precio_compra}\nInventario: ${inventario}`}
                                trailing={
                                    <View style={styles.iconContainer}>
                                        <Icon name="pencil" size={25} style={styles.icon} onPress={() => navigation.navigate("EditarProductos", {id, nombre_producto, precio_venta, precio_compra, inventario})}/>
                                        <Icon name="delete" size={25} style={styles.icon} onPress={() => handleDeleteProducto(id)}/>
                                    </View>
                                }
                            />
                        )
                    )
                }
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ecf0f1',
        padding: 5,
    },
    refreshButtonContainer: {
        alignItems: 'center',
        marginBottom: 30
    },
    refreshIcon: {
        fontSize: 30,
        color: '#007AFF'
    },
    paragraph: {
        margin: 24,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    iconContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',

        alignItems: 'center',
    },
    icon: {
        marginHorizontal: 10,
        width: 40
    },
});