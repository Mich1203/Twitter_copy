import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Icon } from "@rneui/themed";
import React, { FC, useEffect } from "react";
import { Alert } from "react-native";
import { RootStackParams } from "../../../App";
import { Home } from "./Home";
import { Timeline } from "./Timeline";

export type MainProps = NativeStackScreenProps<RootStackParams, "Main">;

const Tab = createBottomTabNavigator();

export const Main: FC<MainProps> = ({ navigation }) => {
  
  useEffect(() => {
    const unsubscribe = navigation.addListener("beforeRemove", (e) => {
      e.preventDefault();
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Timeline"
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon
              name="globe"
              type="font-awesome"
              color={focused ? "#00a7f7" : ""}
            />
          ),
        }}
        component={Timeline}
      />
      <Tab.Screen
        name="Home"
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon
              name="home"
              type="font-awesome"
              color={focused ? "#00a7f7" : ""}
            />
          ),
        }}
        component={Home}
      />
      <Tab.Screen
        name="Profile"
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon
              name="user"
              type="font-awesome"
              color={focused ? "#00a7f7" : ""}
            />
          ),
        }}
        component={Home}
      />
    </Tab.Navigator>
  );
};
