import { LogBox } from 'react-native';
import 'react-native-gesture-handler';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreLogs([{ level: 'error' }]);
LogBox.ignoreAllLogs();
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Second from './Screens/Second';
import First from './Screens/First';
import Home from './Screens/Home';
import Login from './Screens/Login';
import Shop from './Screens/Shop';
import Bill from './Screens/Bill';
import Bag from './Screens/Bag';
import Table from './Screens/Table';

const Stack = createNativeStackNavigator();
// const Drawer = createDrawerNavigator();
function App() {
  
  return (
    
   
    <NavigationContainer>
     
      <Stack.Navigator
        initialRouteName="First"
        screenOptions={{headerShown: false}}>
        {/* <Stack.Screen name="Test" component={Test} /> */}
        <Stack.Screen name="First" component={First} />
        <Stack.Screen name="Second" component={Second} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Shop" component={Shop} />
        <Stack.Screen name="Bag" component={Bag} />
        <Stack.Screen name="Bill" component={Bill} />
        <Stack.Screen name="Table" component={Table} />
        {/* <Stack.Screen name="CustomDrawer" component={CustomDrawer} /> */}
      </Stack.Navigator>
     
      {/* <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen name="PM" component={PM}  />
      
      </Drawer.Navigator>
    </NavigationContainer> */}
    </NavigationContainer>
  );
}

export default App;

