import { Avatar, Card } from "@rneui/themed";
import React, { FC, useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from "react-native";
import { ITweet } from "../../../interfaces/tweets";
import { ImageModal } from "./ImageModal";

export interface ITweetProps {
  tweet: ITweet;
}

export const Tweet: FC<ITweetProps> = ({ tweet }) => {
  const [currentImage, setCurrentImage] = useState("");
  return (
    <Card>
      <View style={styles.header}>
        <Avatar size={30} rounded source={{ uri: tweet.owner.profileImg }} />
        <Text style={styles.userHandle}>{tweet.owner.name}</Text>
      </View>
      <Card.Divider></Card.Divider>
      <View>
        <Text>{tweet.content}</Text>
        <View style={styles.imagesContainer}>
          {tweet.attachments.map((image, index) => (
            <TouchableHighlight
              key={image}
              onPress={() => setCurrentImage(image)}
              style={{
                width:
                  tweet.attachments.length === 1
                    ? "100%"
                    : index === 2 && tweet.attachments.length === 3
                    ? "100%"
                    : "50%",
                ...styles.image,
              }}
            >
              <Image
                style={{ width: "100%", height: "100%" }}
                source={{ uri: image }}
              />
            </TouchableHighlight>
          ))}
        </View>
      </View>
      <ImageModal
        image={currentImage}
        isOpen={!!currentImage}
        close={() => setCurrentImage("")}
      />
    </Card>
  );
};

const styles = StyleSheet.create({
  header: {
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 5,
    paddingBottom: 10,
  },
  userHandle: {
    color: "#cccc",
    fontSize: 15,
    marginHorizontal: 10,
  },
  imagesContainer: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  image: {
    height: 100,
    resizeMode: "cover",
    borderWidth: 2,
    borderColor: "#ccc",
    borderRadius: 5,
  },
});
