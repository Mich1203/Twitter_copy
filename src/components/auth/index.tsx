import React, { FC, useEffect } from "react";
import { StyleSheet } from "react-native";
import { Login } from "./Login";
import Constants from "expo-constants";
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import { Register } from "./Register";
import { useAppDispatch, useAppSelector } from "../../hooks/store";
import { selectToken, setCredentials } from "../../store/auth";
import { useNavigation } from "@react-navigation/native";
import { RootStackParams } from "../../../App";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLazyGetProfileQuery } from "../../services/auth";

const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem("@token");
    return token;
  } catch (error) {
    console.error(error);
  }
};

const Stack = createNativeStackNavigator();

export const Auth: FC = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const token = useAppSelector(selectToken);
  const dispatch = useAppDispatch();
  const [trigger] = useLazyGetProfileQuery();

  const storeToken = async (token: string) => {
    try {
      await AsyncStorage.setItem("@token", token);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getToken().then((token) => {
      if (token) {
        dispatch(setCredentials({ user: null, token }));
        trigger()
      }
    });
  }, []);

  useEffect(() => {
    if (token) {
      storeToken(token);
      navigation.navigate("Main", { screen: "Timeline" });
    }
  }, [navigation, token]);
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
