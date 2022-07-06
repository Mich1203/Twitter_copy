import { Avatar } from "@rneui/themed";
import React, { FC, useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View,
} from "react-native";
import { useLazyGetTweetsQuery } from "../../services/tweets";
import { useGetFollowingQuery } from "../../services/user";
import { CreateTweetForm } from "../common/CreateTweetForm";
import { Retweet } from "../common/Tweet/Retweet";
import { Tweet } from "../common/Tweet/Tweet";

export const Timeline: FC = () => {
  const [isCreating, setIsCreating] = useState(false);
  const { data: following, isLoading: isFollowingLoading } =
    useGetFollowingQuery(undefined);
  const [getTweets, { data: tweetsData, isLoading: isTweetsLoading }] =
    useLazyGetTweetsQuery();

  useEffect(() => {
    if (following && !isFollowingLoading) {
      getTweets(following.body?.length > 0 ? "followers" : "all");
    }
  }, [following]);

  if (isTweetsLoading || isFollowingLoading) {
    return <Text>Loading...</Text>;
  }

  const handleToggleCreate = () => {
    setIsCreating((prev) => !prev);
  };
  console.log(tweetsData?.body.retweets);
  return (
    <View style={styles.container}>
      <FlatList
        data={[
          ...(tweetsData?.body.tweets ?? []),
          ...(tweetsData?.body.retweets ?? []),
        ].sort((a, b) => (a.created_date > b.created_date ? -1 : 1))}
        renderItem={({ item }) =>
          "content" in item ? (
            <Tweet tweet={item} />
          ) : (
            <Retweet retweet={item} />
          )
        }
        ListFooterComponent={() => <Text></Text>}
      ></FlatList>
      <View style={styles.floatingBtn}>
        <TouchableNativeFeedback onPress={handleToggleCreate}>
          <Avatar
            size={60}
            rounded
            icon={{ name: "pencil", type: "font-awesome" }}
            containerStyle={{ backgroundColor: "#00a7f7" }}
          />
        </TouchableNativeFeedback>
      </View>
      <CreateTweetForm isOpen={isCreating} close={() => setIsCreating(false)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  floatingBtn: {
    position: "absolute",
    bottom: 20,
    right: 20,
  },
});
