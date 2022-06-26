import { Avatar } from "@rneui/themed";
import React, { FC, useState } from "react";
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View,
} from "react-native";
import { useAppSelector } from "../../hooks/store";
import { useGetTweetsQuery } from "../../services/tweets";
import { selectUser } from "../../store/auth";
import { CreateTweetForm } from "../common/CreateTweetForm";
import { Tweet } from "../common/Tweet/Tweet";

export const Timeline: FC = () => {
  const [isCreating, setIsCreating] = useState(false);
  const { data, isLoading } = useGetTweetsQuery();
  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  const handleToggleCreate = () => {
    setIsCreating((prev) => !prev);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={data?.body || []}
        renderItem={({ item }) => <Tweet tweet={item} />}
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
