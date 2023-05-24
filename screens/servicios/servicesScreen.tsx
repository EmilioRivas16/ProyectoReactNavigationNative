import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, RefreshControl } from 'react-native';
import { Button, ListItem } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { Servicio } from '../../interfaces/servicesInterfaces';


export default function Services({navigation}: any) {

    const [servicios, setServicios] = useState<Servicio[]>([]);

    useEffect(() => {
        fetch('https://6466937d2ea3cae8dc1a4b97.mockapi.io/servicios')
            .then(response => response.json())
            .then(data => setServicios(data))
            .catch(error => console.error(error));
    }, []);

    const handleDeleteProducto = (id: any) => {
        fetch(`https://6466937d2ea3cae8dc1a4b97.mockapi.io/servicios/${id}`, {
            method: 'DELETE',
        })
        .then(response => {
            setServicios(prevServicios => prevServicios.filter(servicios => servicios.id !== id));
        })
        .catch(error => console.error(error));    
    };

    const [refreshing, setRefreshing] = React.useState(false);

    const handleRefresh = () => {
        setRefreshing(true);
        fetch('https://6466937d2ea3cae8dc1a4b97.mockapi.io/servicios')
            .then(response => response.json())
            .then(data => setServicios(data))
            .catch(error => console.error(error))
            .finally(() => setRefreshing(false));
    };

    return (
        <View style={styles.container}>
            <Button title="Agregar servicio" onPress={() => navigation.navigate("InsertarServicios")}></Button>
            <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}>
                {
                    servicios.map(({ id, nombre_servicio, precio_venta, costo_servicio }) => 
                        (
                            <ListItem
                                key={id}
                                title={`Servicio: ${nombre_servicio}\nPrecio Venta: $${precio_venta}\nCosto Servicio: $${costo_servicio}`}
                                trailing={
                                    <View style={styles.iconContainer}>
                                        <Icon name="pencil" size={25} style={styles.icon} onPress={() => navigation.navigate("EditarServicios", {id, nombre_servicio, precio_venta, costo_servicio})}/>
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