import { Avatar, Button, Card, Icon } from "@rneui/themed";
import React, { FC, useState } from "react";
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableHighlight,
  View,
} from "react-native";
import { useAppSelector } from "../../../hooks/store";
import { ITweet } from "../../../interfaces/tweets";
import { useDeleteTweetMutation } from "../../../services/tweets";
import {
  useFollowUserMutation,
  useGetFollowingQuery,
} from "../../../services/user";
import { selectUser } from "../../../store/auth";
import { getAcronym, getRandomColor } from "../../../utils/utils";
import { ImageModal } from "./ImageModal";
import { Reactions } from "./Reactions";

export interface ITweetProps {
  tweet: ITweet;
  noMargin?: boolean;
}

export const Tweet: FC<ITweetProps> = ({ tweet, noMargin }) => {
  const user = useAppSelector(selectUser);
  const { data: following } = useGetFollowingQuery(undefined);
  const [currentImage, setCurrentImage] = useState("");
  const [deleteTweet, { isLoading: isDeleteLoading }] =
    useDeleteTweetMutation();
  const [followUser, { isLoading: isFollowLoading }] = useFollowUserMutation();

  const handleDelete = () => {
    Alert.alert("Are you sure you want to delete this tweet?", undefined, [
      {
        text: "OK",
        onPress() {
          deleteTweet(tweet._id);
        },
      },
      { text: "CANCEL", style: "cancel" },
    ]);
  };

  const handleToggleFollow = async () => {
    try {
      const { message } = await followUser(tweet.owner._id).unwrap();
      ToastAndroid.show(message, ToastAndroid.LONG);
    } catch (error: any) {
      ToastAndroid.show("Error: " + error.message, ToastAndroid.LONG);
    }
  };
  return (
    <Card containerStyle={{ marginTop: noMargin ? 0 : 20 }}>
      <View style={styles.header}>
        <View style={styles.authorContainer}>
          <Avatar
            size={30}
            rounded
            {...(tweet.owner.profileImg
              ? { source: { uri: tweet.owner.profileImg } }
              : {
                  title: getAcronym(tweet.owner.name),
                  containerStyle: { backgroundColor: 'black' },
                })}
          />
          <Text style={styles.userHandle}>{tweet.owner.name}</Text>
        </View>

        {tweet.owner._id === user?._id && (
          <Icon
            name="trash-o"
            type="font-awesome"
            size={24}
            onPress={handleDelete}
            disabled={isDeleteLoading}
          />
        )}
        {tweet.owner._id !== user?._id && (
          <Button
            title={
              following?.body.map((user) => user._id).includes(tweet.owner._id)
                ? "Unfollow"
                : "Follow"
            }
            onPress={handleToggleFollow}
            loading={isFollowLoading}
          />
        )}
      </View>
      <Card.Divider />
      <View style={{ marginBottom: 10 }}>
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
      <Card.Divider />
      <Reactions tweet={tweet} />
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
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 5,
    paddingBottom: 10,
  },
  authorContainer: {
    flexDirection: "row",
    alignItems: "center",
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
