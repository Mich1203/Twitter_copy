import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Button, Input } from "@rneui/themed";
import { FC, useEffect, useState } from "react";
import { Text, ToastAndroid, View } from "react-native";
import { DocumentPickerResponse } from "react-native-document-picker";
import { RootStackParams } from "../../../App";
import { useAppDispatch, useAppSelector } from "../../hooks/store";
import { IUser } from "../../interfaces/auth";
import { useUpdateProfileMutation } from "../../services/auth";
import { selectUser, setCredentials } from "../../store/auth";
import { FilePicker } from "../common/FilePicker";

const defaultFormValue: IUser = {
  _id: "",
  email: "",
  name: "",
  phoneNumber: "",
  profileImg: "",
  username: "",
};

export const Profile: FC = () => {
  const user = useAppSelector(selectUser);
  const [formValue, setFormValue] = useState<IUser>(user ?? defaultFormValue);
  const [profilePic, setProfilePic] = useState<DocumentPickerResponse>();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const dispatch = useAppDispatch();
  const [updateProfile, { isLoading: isProfileLoading }] =
    useUpdateProfileMutation();

  useEffect(() => {
    console.log(user);
    user && setFormValue(user);
  }, [user]);

  const handleLogout = () => {
    dispatch(setCredentials({ user: null, token: null }));
    setTimeout(() => navigation.navigate("Auth", { screen: "Login" }));
  };

  const handleSaveChanges = async () => {
    try {
      await updateProfile(formValue);
      ToastAndroid.show("Changes saved successfully!", ToastAndroid.LONG);
    } catch (error) {
      ToastAndroid.show("Error: " + error, ToastAndroid.LONG);
    }
  };

  const handleFormChange = (name: string) => (value: string) => {
    setFormValue((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <View style={{ padding: 10 }}>
      <FilePicker
        selectedFiles={profilePic ? [profilePic] : []}
        onSelectFiles={(files) => setProfilePic(files[0])}
      />
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
      <Button
        title="Save Profile Changes"
        loading={isProfileLoading}
        onPress={handleSaveChanges}
      />
      <Text />
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};
