import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { AuthProvider, useAuth } from './app/context/AuthContext';
import { Button } from 'react-native-paper';
import Login from './app/screens/Login';
import Home from './app/screens/Home';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <AuthProvider>
      <Layout></Layout>
    </AuthProvider>
  );
}

export const Layout = ()=> {
  const {authState, logout} = useAuth();
  return (
    <NavigationContainer>
      <Stack.Navigator>
{authState?.authenticated?(
  <Stack.Screen name="Home" component={Home}
  options={{
    headerRight:()=><Button onPress={logout} title="Sign Out" />
  }}
  ></Stack.Screen>
):(
  <Stack.Screen name='Login' component={Login}></Stack.Screen>
)}
      </Stack.Navigator>
    </NavigationContainer>
  );
}