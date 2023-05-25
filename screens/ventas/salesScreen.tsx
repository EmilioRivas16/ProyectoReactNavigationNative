import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, RefreshControl } from 'react-native';
import { Button, ListItem } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { Venta } from '../../interfaces/salesInterfaces';


export default function Sales({navigation}: any) {

    const [ventas, setVentas] = useState<Venta[]>([]);

    useEffect(() => {
        fetch('https://6466937d2ea3cae8dc1a4b97.mockapi.io/ventas')
            .then(response => response.json())
            .then(data => setVentas(data))
            .catch(error => console.error(error));
    }, []);

    const [refreshing, setRefreshing] = React.useState(false);

    const handleRefresh = () => {
        setRefreshing(true);
        fetch('https://6466937d2ea3cae8dc1a4b97.mockapi.io/ventas')
            .then(response => response.json())
            .then(data => setVentas(data))
            .catch(error => console.error(error))
            .finally(() => setRefreshing(false));
    };

    return (
        <View style={styles.container}>
            <Button title="Agregar venta" onPress={() => navigation.navigate("InsertarVentas")}></Button>
            <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}>
                {
                    ventas.map(({ id, articulo_comprado, cantidad_comprada, fecha_venta, subtotal, total }) => 
                        (
                            <ListItem
                                key={id}
                                title={`Articulo: ${articulo_comprado}`}
                                trailing={
                                    <View style={styles.iconContainer}>
                                        <Icon name="eye" size={25} style={styles.icon} onPress={() => navigation.navigate("VerVentas", {id, articulo_comprado, cantidad_comprada, fecha_venta, subtotal, total})}/>
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