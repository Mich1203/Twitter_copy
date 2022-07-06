import { Input } from "@rneui/themed";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useLazySearchTermQuery } from "../../services/search";
import { Tweet } from "../common/Tweet/Tweet";

export const Search = () => {
  const [search, { isLoading, data }] = useLazySearchTermQuery();
  const [searchTerm, setSearchTerm] = useState("");

  const { tweets } = data?.body || { tweets: [] };

  useEffect(() => {
    search(searchTerm);
  }, [searchTerm]);

  return (
    <View style={styles.container}>
      <Input
        leftIcon={{ name: "search", type: "font-awesome" }}
        value={searchTerm}
        onChangeText={setSearchTerm}
        placeholder="Search something..."
      />
      <View style={{ width: '100%', flex: 1 }}>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <FlatList
            data={tweets || []}
            renderItem={({ item }) => <Tweet tweet={item} />}
            ListFooterComponent={() => <Text></Text>}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    height: '100%'
  },
});
