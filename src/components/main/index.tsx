import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { FC, useEffect } from "react";
import { Alert } from "react-native";
import { RootStackParams } from "../../../App";
import { Home } from "./Home";

export type MainProps = NativeStackScreenProps<RootStackParams, "Main">;

const Tab = createBottomTabNavigator();

export const Main: FC<MainProps> = ({ navigation }) => {
  useEffect(() => {
    const unsubscribe = navigation.addListener("beforeRemove", (e) => {
      Alert.alert("cant");
      // e.preventDefault();
    });
    
    return unsubscribe;
  }, [navigation]);
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home}></Tab.Screen>
    </Tab.Navigator>
  );
};
