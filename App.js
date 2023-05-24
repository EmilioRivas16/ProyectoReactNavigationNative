import LoginAndCreateAccount from './screens/LoginCreateAccountScreen';

import Sales from './screens/ventas/salesScreen';
import App2 from './App2';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Stack = createStackNavigator();
const Tabs = createBottomTabNavigator();

export default function App() {

  return (
    <NavigationContainer>

        <Tabs.Navigator
          initialRouteName={Sales}
        >
          <Tabs.Screen
            name="Login"
            component={LoginAndCreateAccount}
            options={{ title: 'LOGIN',
            tabBarButton: () => null }}
          />
          <Tabs.Screen
            name="Panel"
            component={App2}
            options={{ 
              tabBarButton: () => null,
              headerShown: false
            }}
          />
        </Tabs.Navigator>
    </NavigationContainer>
  );
}