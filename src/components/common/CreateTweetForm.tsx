import { Avatar, Button, Icon, Input } from "@rneui/themed";
import React, { FC, useState } from "react";
import { Modal, StyleSheet, Text, View } from "react-native";
import { DocumentPickerResponse } from "react-native-document-picker";
import { useAppSelector } from "../../hooks/store";
import {
  useAddTweetMutation,
  useUploadAttachmentMutation,
} from "../../services/tweets";
import { selectToken, selectUser } from "../../store/auth";
import transformToFormData from "../../utils/tranformToFormData";
import { FilePicker } from "./FilePicker";

export interface ICreateTweetFormProps {
  isOpen: boolean;
  close: () => void;
}

const MAX_ALLOWED_CHARS = 255;

const initialFormValue = {
  content: "",
};

export const CreateTweetForm: FC<ICreateTweetFormProps> = ({
  isOpen,
  close,
}) => {
  const user = useAppSelector(selectUser);
  const token = useAppSelector(selectToken);
  const [formValue, setFormValue] = useState(initialFormValue);
  const [selectedFiles, setSelectedFiles] = useState<DocumentPickerResponse[]>(
    []
  );
  const [addTweet, { isLoading: loadingAdd }] = useAddTweetMutation();
  const [uploadAttachment, { isLoading: loadingAttachment }] =
    useUploadAttachmentMutation();

  const handleChangeForm = (name: string) => (value: string) =>
    setFormValue((prev) => ({ ...prev, [name]: value }));

  const handleSubmit = async () => {
    try {
      const { body: tweet } = await addTweet(formValue).unwrap();
      if (selectedFiles.length > 0) {
        const fd = transformToFormData({ files: selectedFiles });
        await uploadAttachment({ tweetId: tweet._id, form: fd });
      }
      handleClose();
    } catch (error) {
      console.error("Ok this is an error:", error);
    }
  };

  const handleClose = () => {
    setFormValue(initialFormValue);
    close();
  };

  return (
    <Modal animationType="slide" visible={isOpen} onRequestClose={handleClose}>
      <View style={styles.modal}>
        <View style={styles.header}>
          <Text style={[styles.textHeader, styles.text]}>
            Write your thoughts...
          </Text>
          <Icon
            size={40}
            color="#fff"
            name="close"
            type="font-awesome"
            onPress={handleClose}
          />
        </View>
        <View>
          <Avatar size={48} rounded source={{ uri: user?.profileImg }} />
          <Input
            inputStyle={styles.text}
            containerStyle={{ paddingHorizontal: 0 }}
            multiline
            placeholder="What are you thinking?"
            value={formValue.content}
            onChangeText={handleChangeForm("content")}
            disabled={loadingAdd || loadingAttachment}
          />
          <Text style={styles.text}>
            Characters left {MAX_ALLOWED_CHARS - formValue.content.length}
          </Text>
        </View>
        <FilePicker
          selectedFiles={selectedFiles}
          onSelectFiles={setSelectedFiles}
        />
        <Button
          containerStyle={{ marginTop: 20 }}
          title="Submit tweet"
          onPress={handleSubmit}
          loading={loadingAdd || loadingAttachment}
          disabled={formValue.content.length > MAX_ALLOWED_CHARS}
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    padding: 10,
    backgroundColor: "#202A44",
    flex: 1,
  },
  textHeader: {
    fontSize: 25,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  text: {
    color: "#fff",
  },
});
