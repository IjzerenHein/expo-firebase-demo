import * as React from "react";
import { StyleSheet, ScrollView, Alert } from "react-native";
import { ListSeparator, Button, Margins } from "../../components";
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
    myTodoLists = new Collection<Document<TodoList>>("todoLists", {
      query: ref => {
        const { currentUser } = firebase.auth();
        return currentUser
          ? ref
              .where("userId", "==", currentUser.uid)
              .orderBy("createdAt", "desc")
              .limit(50)
          : null;
      }
    });
    publicTodoLists = new Collection<Document<TodoList>>("todoLists", {
      query: ref =>
        ref
          .where("public", "==", true)
          .orderBy("createdAt", "desc")
          .limit(50)
    });

    onPressAdd = async () => {
      try {
        await this.myTodoLists.add({
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
      const { myTodoLists, publicTodoLists } = this;
      return (
        <ScrollView style={styles.container}>
          <ListSeparator label="My lists" />
          {currentUser
            ? myTodoLists.docs.map(doc => (
                <TodoListListItem
                  key={doc.id}
                  todoList={doc}
                  editable
                  navigation={navigation}
                />
              ))
            : undefined}
          {currentUser ? (
            <Button
              style={styles.button}
              label="Add todo list"
              onPress={this.onPressAdd}
            />
          ) : (
            <Button
              style={styles.button}
              label="Sign in to Add todo lists"
              disabled
            />
          )}
          <ListSeparator label="Public lists" />
          {publicTodoLists.docs.map(doc => (
            <TodoListListItem
              key={doc.id}
              todoList={doc}
              navigation={navigation}
            />
          ))}
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
