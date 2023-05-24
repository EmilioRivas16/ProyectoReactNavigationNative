import Products from './screens/productos/productsScreen';

import Sales from './screens/ventas/salesScreen';
import SeeSales from './screens/ventas/seeSalesScreen';
import InsertSales from './screens/ventas/insertSalesScreen';

import Services from './screens/servicios/servicesScreen';
import EditProduct from './screens/productos/editProductsScreen';
import InsertProduct from './screens/productos/insertProductsScreen';

import InsertService from './screens/servicios/insertServiceScreen';
import EditService from './screens/servicios/editServiceScreen';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Ionicons from 'react-native-vector-icons/Ionicons';

const Stack = createStackNavigator();
const Tabs = createBottomTabNavigator();

export default function App2() {

    return (
        <NavigationContainer independent={true}>
            <Tabs.Navigator
            initialRouteName={Sales}
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                let iconName;
                
                if (route.name === 'Ventas') {
                    iconName = focused ? 'cart' : 'cart-outline';
                } else if (route.name === 'Productos') {
                    iconName = focused ? 'cube' : 'cube-outline';
                } else if (route.name === 'EditarProductos') {
                    iconName = focused ? 'cart' : 'cart-outline';
                } else if (route.name === 'InsertarProductos') {
                    iconName = focused ? 'cart' : 'cart-outline';
                } else if (route.name === 'InsertarServicios') {
                    iconName = focused ? 'cart' : 'cart-outline';
                } else if (route.name === 'EditarServicios') {
                    iconName = focused ? 'cart' : 'cart-outline';
                } else if (route.name === 'VerVentas') {
                    iconName = focused ? 'cart' : 'cart-outline';
                } else if (route.name === 'InsertarVentas') {
                    iconName = focused ? 'cart' : 'cart-outline';
                } else if (route.name === 'Servicios') {
                    iconName = focused ? 'cog' : 'cog-outline';
                }
                return <Ionicons name={iconName} size={size} color={color} />;
                },
            })}
            >

            <Tabs.Screen
                name="Ventas"
                component={Sales}
                options={{ title: 'VENTAS' }}
            />
            
            <Tabs.Screen
                name="VerVentas"
                component={SeeSales}
                options={{ title: 'VER VENTAS',
                tabBarButton: () => null} }
            />
            <Tabs.Screen
                name="InsertarVentas"
                component={InsertSales}
                options={{ title: 'INSERTAR VENTAS',
                tabBarButton: () => null} }
            />

            <Tabs.Screen
                name="Productos"
                component={Products}
                options={{ title: 'PRODUCTOS' }}
            />
            <Tabs.Screen
                name="EditarProductos"
                component={EditProduct}
                options={{ title: 'EDITAR PRODUCTOS',
                tabBarButton: () => null} }
            />
            <Tabs.Screen
                name="InsertarProductos"
                component={InsertProduct}
                options={{ title: 'INSERTAR PRODUCTOS',
                tabBarButton: () => null} }
            />

            <Tabs.Screen
                name="Servicios"
                component={Services}
                options={{ title: 'SERVICIOS' }}
            />
            <Tabs.Screen
                name="EditarServicios"
                component={EditService}
                options={{ title: 'EDITAR SERVICIOS',
                tabBarButton: () => null} }
            />
            <Tabs.Screen
                name="InsertarServicios"
                component={InsertService}
                options={{ title: 'INSERTAR SERVICIOS',
                tabBarButton: () => null} }
            />
            </Tabs.Navigator>
        </NavigationContainer>
    );
}