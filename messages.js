import { FlatList, SafeAreaView, StyleSheet, View, } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useLayoutEffect } from "react";
import Message from "./Message";
import { useGetMessagestQuery } from "../store/coreApi";

export default function Messages() {
  const [currentPage, setCurrentPage] = useState(1);
  const { isSuccess, data } = useGetMessagestQuery()
  const loadMoreItem = () => {
    setCurrentPage(currentPage + 1);
  };
  const renderLoader = () => {
    return (
      isSuccess ?
        <View style={styles.loaderStyle}>
          <ActivityIndicator size="large" color="#aaa" />
        </View> : null
    );
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        data={data}
        keyExtractor={(item) => {
          return item.id;
        }}
        renderItem={({ item }) => {
          return <Message message={item} />;
        }}
        ListHeaderComponentStyle={{ backgroundColor: "#ccc" }}
        ItemSeparatorComponent={() => <View style={styles.divider} />}
        ListFooterComponent={renderLoader}
        onEndReached={loadMoreItem}
      />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  divider: {
    width: "100%",
    height: StyleSheet.hairlineWidth,
    backgroundColor: "#DDD",
  },
  loaderStyle: {
    marginVertical: 16,
    alignItems: "center",
  }
});

