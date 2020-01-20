import * as React from "react";
import { ScrollView, Alert, ActivityIndicator, StyleSheet } from "react-native";
import {
  ListItem,
  ListSeparator,
  Switch,
  Button,
  Margins
} from "../../components";
import { Collection, Document } from "firestorter";
import { observer } from "mobx-react";
import { firebase } from "../../firebase";
import TodoItemListItem from "./TodoItemListItem";
import { TodoItem, TodoList } from "./types";

type PropsType = {
  navigation: any;
  route: {
    params: {
      todoList: Document<TodoList>;
      todoItems: Collection<Document<TodoItem>>;
    };
  };
};

export default observer(
  class TodoListScreen extends React.Component<PropsType> {
    onChangeName = async (text: string) => {
      const { route } = this.props;
      const { todoList } = route.params;
      return todoList.update({
        name: text
      });
    };

    onChangePublic = async (value: boolean) => {
      const { route } = this.props;
      const { todoList } = route.params;
      return todoList.update({
        public: value
      });
    };

    onPressAdd = async () => {
      const { route } = this.props;
      const { todoItems, todoList } = route.params;
      try {
        await todoItems.add({
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          todoListId: todoList.id,
          text: "",
          finished: false
        });
      } catch (err) {
        Alert.alert("Firestore error", err.message);
      }
    };

    render() {
      const { currentUser } = firebase.auth();
      const { navigation, route } = this.props;
      const { todoList, todoItems } = route.params;
      const { name, public: isPublic } = todoList.data;
      const { docs, isLoading } = todoItems;
      const editable = !!currentUser;
      return (
        <ScrollView style={styles.container}>
          {currentUser ? (
            <React.Fragment>
              <ListSeparator label="Settings" />
              <ListItem
                editable
                label="Name"
                value={name}
                onChangeValue={this.onChangeName}
              />
              <ListItem
                label="Public"
                accessory={
                  <Switch
                    value={isPublic || false}
                    onValueChange={this.onChangePublic}
                  />
                }
              />
            </React.Fragment>
          ) : (
            undefined
          )}
          <ListSeparator label="Items" value="Finished" />
          {docs.map(doc => (
            <TodoItemListItem key={doc.id} todoItem={doc} editable={editable} />
          ))}
          {isLoading ? (
            <ActivityIndicator style={styles.loader} />
          ) : editable ? (
            <Button
              style={styles.button}
              label="Add todo item"
              onPress={this.onPressAdd}
            />
          ) : (
            undefined
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
