import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthProvider, useAuth } from "./app/context/AuthContext";
import { Button } from "react-native-paper";
import Login from "./app/screens/Login";
import Home from "./app/screens/Home";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <AuthProvider>
      <Layout />
    </AuthProvider>
  );
}

export const Layout = () => {
  const { authState, logout } = useAuth();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {authState?.authenticated ? (
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              headerRight: () => (
                <Button onPress={logout} style={styles.signOutButton}>
                  Sign Out
                </Button>
              ),
            }}
          />
        ) : (
          <Stack.Screen name="Login" component={Login} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = {
  signOutButton: {
    marginRight: 10,
    color: "white", // Change color to contrast with header background
  },
};
