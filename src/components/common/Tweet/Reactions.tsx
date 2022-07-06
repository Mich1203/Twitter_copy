import { Icon } from "@rneui/themed";
import React, { FC } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useAppSelector } from "../../../hooks/store";
import { ITweet } from "../../../interfaces/tweets";
import {
  useToggleLikeMutation,
  useToggleRetweetMutation,
} from "../../../services/tweets";
import { selectUser } from "../../../store/auth";

export interface IReactionsProps {
  tweet: ITweet;
}

export const Reactions: FC<IReactionsProps> = ({ tweet }) => {
  const user = useAppSelector(selectUser);
  const [toggleLike, { isLoading: isLikeLoading }] = useToggleLikeMutation();
  const [toggleRetweet, { isLoading: isRtLoading }] =
    useToggleRetweetMutation();
  const handleToggleLike = () => {
    toggleLike(tweet._id);
  };

  const handleToggleRetweet = () => {
    toggleRetweet(tweet._id);
  };
  return (
    <View style={styles.container}>
      <View style={styles.reactionContainer}>
        <Icon
          name={
            tweet.likes.some((lik) => lik._id === user?._id)
              ? "heart"
              : "heart-o"
          }
          color={
            tweet.likes.some((lik) => lik._id === user?._id) ? "#ff0000" : ""
          }
          type="font-awesome"
          onPress={handleToggleLike}
          disabled={isLikeLoading}
        />
        <Text style={{ marginLeft: 5, textAlign: "center" }}>
          {tweet.likes.length}
        </Text>
      </View>
      {tweet.owner._id !== user?._id && (
        <View style={styles.reactionContainer}>
          <Icon
            name="retweet"
            type="font-awesome"
            disabled={isRtLoading}
            onPress={handleToggleRetweet}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  reactionContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});
