import React from "react";
import { Text } from "react-native";
import { useAppSelector } from "../../hooks/store";
import { selectUser } from "../../store/auth";

export const Home = () => {
  const user = useAppSelector(selectUser);
  return <Text>This is home {JSON.stringify(user)}</Text>;
};
