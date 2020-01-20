import * as React from "react";
import { StyleSheet, ScrollView, Alert, ActivityIndicator } from "react-native";
import {
  ListItem,
  ListSeparator,
  Colors,
  Button,
  Margins
} from "../../components";
import { firebase } from "../../firebase";
import { Collection, Document } from "firestorter";
import { observer } from "mobx-react";
import TodoListListItem from "./TodoListListItem";
import { TodoList } from "./types";

type PropsType = {
  navigation: any;
  label: string;
};

export default observer(
  class TodoListsScreen extends React.Component<PropsType> {
    todoLists = new Collection<Document<TodoList>>("todoLists", {
      query: ref => {
        const { currentUser } = firebase.auth();
        return currentUser
          ? ref
              .where("userId", "==", currentUser.uid)
              .orderBy("createdAt", "desc")
              .limit(50)
          : ref
              .where("public", "==", true)
              .orderBy("createdAt", "desc")
              .limit(50);
      }
    });

    onPressAdd = async () => {
      try {
        await this.todoLists.add({
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          userId: firebase.auth().currentUser.uid,
          name: "New todo list"
        });
      } catch (err) {
        Alert.alert("Firestore error", err.message);
      }
    };

    render() {
      const { currentUser } = firebase.auth();
      const { navigation } = this.props;
      const { docs, isLoading } = this.todoLists;
      return (
        <ScrollView style={styles.container}>
          {docs.map(doc => (
            <TodoListListItem
              key={doc.id}
              todoList={doc}
              navigation={navigation}
            />
          ))}
          {isLoading ? <ActivityIndicator style={styles.loader} /> : undefined}

          {currentUser ? (
            <Button
              style={styles.button}
              label="Add todo list"
              onPress={this.onPressAdd}
            />
          ) : (
            <Button
              style={styles.button}
              label="Sign in to view own todo lists"
              disabled
            />
          )}
        </ScrollView>
      );
    }
  }
);

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  button: {
    margin: Margins.regular
  },
  loader: {
    marginTop: Margins.regular,
    alignSelf: "center"
  }
});
