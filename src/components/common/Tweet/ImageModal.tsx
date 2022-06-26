import React, { FC } from "react";
import { Image, Modal, StyleSheet, View } from "react-native";

export interface IImageModalProps {
  image: string;
  isOpen: boolean;
  close: () => void;
}

export const ImageModal: FC<IImageModalProps> = ({ image, isOpen, close }) => {
  return (
    <Modal animationType="slide" visible={isOpen} onRequestClose={close}>
      <View style={{ backgroundColor: "#000", height: "100%" }}>
        <Image source={{ uri: image }} style={styles.image} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
});
