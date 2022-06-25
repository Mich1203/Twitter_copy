import React, { FC } from "react";
import { StyleSheet, View } from "react-native";
import { Login } from "./Login";
import Constants from "expo-constants";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Register } from "./Register";

const Stack = createNativeStackNavigator();

export const Auth: FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ title: "Login" }}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{ title: "Register" }}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  topBar: {
    paddingTop: Constants.statusBarHeight + 10,
    height: 100,
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingBottom: 10,
    backgroundColor: "#cccf",
  },
  container: {},
});
