import { Icon, Image } from "@rneui/themed";
import React, { FC, useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  TouchableHighlight,
  View,
} from "react-native";
import DocumentPicker, {
  DocumentPickerResponse,
} from "react-native-document-picker";

const MAX_ALLOWED_FILES = 4;

export interface IFilePickerProps {
  selectedFiles: DocumentPickerResponse[];
  onSelectFiles: (files: DocumentPickerResponse[]) => void;
}

export const FilePicker: FC<IFilePickerProps> = ({
  selectedFiles,
  onSelectFiles,
}) => {
  const handlePickFile = async () => {
    try {
      const res = await DocumentPicker.pickMultiple({
        type: [DocumentPicker.types.images],
      });
      onSelectFiles(res.slice(0, MAX_ALLOWED_FILES));
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }
  };

  const handleRemoveFile = (index: number) => {
    Alert.alert("Do you wish to remove this file?", "", [
      {
        text: "YES",
        onPress() {
          onSelectFiles(selectedFiles.filter((file, i) => i !== index));
        },
      },
      {
        text: "CANCEL",
        style: "cancel",
      },
    ]);
  };
  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {selectedFiles.length < MAX_ALLOWED_FILES && (
          <TouchableHighlight onPress={handlePickFile}>
            <View style={styles.picker}>
              <Icon name="plus" color="#fff" type="font-awesome" size={36} />
            </View>
          </TouchableHighlight>
        )}
        {selectedFiles.map((file, index) => (
          <TouchableHighlight
            key={file.uri}
            onPress={() => handleRemoveFile(index)}
          >
            <View style={styles.picker}>
              <Image
                resizeMode="cover"
                style={styles.image}
                source={{ uri: file.uri || "" }}
              />
            </View>
          </TouchableHighlight>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginTop: 15,
  },
  picker: {
    width: 80,
    height: 80,
    borderColor: "#fff",
    borderWidth: 2,
    borderRadius: 15,
    justifyContent: "center",
    marginHorizontal: 5,
    alignItems: "center",
    overflow: "hidden",
  },
  image: {
    flex: 1,
    width: 80,
    height: 80,
  },
});
