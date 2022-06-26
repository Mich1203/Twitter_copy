import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Button, Input } from "@rneui/themed";
import React, { FC, useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { RootStackParams } from "../../../App";
import { useRegisterMutation } from "../../services/auth";

const initialFormValue = {
  email: "",
  name: "",
  username: "",
  password: "",
  confirmPassword: "",
};

export const Register: FC = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const [hidePassword, setHidePassword] = useState(true);
  const [formValue, setFormValue] = useState(initialFormValue);
  const [register, { isLoading, error }] = useRegisterMutation();

  const handleEyePress = () => {
    setHidePassword((prev) => !prev);
  };

  const isValid = () => {
    const { email, name, password, confirmPassword } = formValue;
    return (
      email &&
      name &&
      password &&
      password.length > 6 &&
      password === confirmPassword
    );
  };

  const handleFormChange = (name: string) => (value: string) => {
    setFormValue((prevValue) => ({ ...prevValue, [name]: value }));
  };

  const handleRegister = async () => {
    try {
      await register(formValue).unwrap();
    } catch (error) {
      Alert.alert("Error", "An error has ocurred. Please try again later.");
      console.error("rejected", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Register {JSON.stringify(error)}</Text>
      <Input
        value={formValue.email}
        onChangeText={handleFormChange("email")}
        placeholder="E-mail *"
        leftIcon={{ type: "font-awesome", name: "envelope" }}
      />
      <Input
        value={formValue.name}
        onChangeText={handleFormChange("name")}
        placeholder="Full Name *"
        leftIcon={{ type: "font-awesome", name: "id-card" }}
      />
      <Input
        value={formValue.username}
        onChangeText={handleFormChange("username")}
        placeholder="Username *"
        leftIcon={{ type: "font-awesome", name: "user" }}
      />
      <Input
        value={formValue.password}
        onChangeText={handleFormChange("password")}
        placeholder="Password *"
        leftIcon={{ type: "font-awesome", name: "key" }}
        rightIcon={{
          type: "font-awesome",
          name: "eye",
          onPress: handleEyePress,
        }}
        secureTextEntry={hidePassword}
      />
      <Input
        value={formValue.confirmPassword}
        onChangeText={handleFormChange("confirmPassword")}
        placeholder="Confirm Password"
        leftIcon={{ type: "font-awesome", name: "key" }}
        rightIcon={{
          type: "font-awesome",
          name: "eye",
          onPress: handleEyePress,
        }}
        secureTextEntry={hidePassword}
        errorMessage={
          formValue.confirmPassword !== "" &&
          formValue.password !== formValue.confirmPassword
            ? "Passwords don't match"
            : undefined
        }
      />
      <TouchableWithoutFeedback
        onPress={() => navigation.navigate("Auth", { screen: "Login" })}
      >
        <Text style={styles.link}>Already have an account ?</Text>
      </TouchableWithoutFeedback>
      <Button
        title="Submit"
        onPress={handleRegister}
        disabled={!isValid()}
        loading={isLoading}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  header: {
    textAlign: "center",
    fontSize: 40,
    margin: 20,
  },
  link: {
    color: "#0000FF",
    paddingVertical: 10,
  },
});
