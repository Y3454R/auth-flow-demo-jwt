import { View, Image, Button, StyleSheet, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import { API_URL, useAuth } from "../context/AuthContext";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, register } = useAuth();

  useEffect(() => {
    const testCall = async () => {
      const result = await axios.get(`${API_URL}/users`);
      // console.log("result[login:16]: ", result);
    };

    testCall();
  }, []);

  const onLogin = async () => {
    const result = await login(email, password);
    if (result && result.error) {
      alert(result.msg);
    }
  };

  const onRegister = async () => {
    const result = await register(email, password);
    if (result && result.error) {
      alert(result.msg);
    } else {
      login();
    }
  };

  return (
    <View>
      <View style={styles.form}>
        <TextInput
          styles={styles.input}
          placeholder="Email"
          onChangeText={(text) => {
            setEmail(text);
          }}
          value={email}
        />
        <TextInput
          styles={styles.input}
          placeholder="password"
          secureTextEntry={true}
          onChangeText={(text) => {
            setPassword(text);
          }}
          value={password}
        />
        <Button onPress={onLogin} title="Sign In" />
        <Button onPress={onRegister} title="Create Account" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  form: {
    gap: 10,
    width: "60",
  },
  input: {
    heigh: 44,
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    backgroundColor: "#fff",
  },
  container: {
    alignItems: "center",
    width: "100",
  },
});

export default Login;
