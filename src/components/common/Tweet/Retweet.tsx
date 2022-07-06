import { Avatar, Icon, Text } from "@rneui/themed";
import React, { FC } from "react";
import { StyleSheet, View } from "react-native";
import { IRetweet } from "../../../interfaces/tweets";
import { getAcronym } from "../../../utils/utils";
import { Tweet } from "./Tweet";

export interface IRetweetProps {
  retweet: IRetweet;
}

export const Retweet: FC<IRetweetProps> = ({ retweet }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Avatar
          size={30}
          rounded
          {...(retweet.user.profileImg
            ? { source: { uri: retweet.user.profileImg } }
            : {
                title: getAcronym(retweet.user.name),
                titleStyle: { color: "white" },
                containerStyle: { backgroundColor: "black" },
              })}
        />
        <Icon
          style={{ marginHorizontal: 10 }}
          name="retweet"
          type="font-awesome"
          size={12}
        />
        <Text>{retweet.user.name} retweeted</Text>
      </View>

      <Tweet tweet={retweet.tweet} noMargin></Tweet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    marginTop: 20,
  },
  header: {
    marginHorizontal: 15,
    padding: 5,
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
});
