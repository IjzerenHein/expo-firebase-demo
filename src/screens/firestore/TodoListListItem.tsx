import * as React from "react";
import { observer } from "mobx-react";
import { Document, Collection } from "firestorter";
import { TodoList, TodoItem } from "./types";
import { ListItem } from "../../components";

type PropsType = {
  navigation: any;
  todoList: Document<TodoList>;
  editable?: boolean;
};

export default observer(function TodoListListItem(props: PropsType) {
  const { todoList, navigation, editable } = props;
  if (!todoList) return null;
  const [todoItems] = React.useState(
    () =>
      new Collection<Document<TodoItem>>("todoItems", {
        query: ref =>
          ref
            .where("todoListId", "==", todoList.id)
            .orderBy("createdAt", "desc")
      })
  );
  const { name } = todoList.data;
  return (
    <ListItem
      label={name}
      value={`${todoItems.docs.length} items`}
      onPress={() =>
        navigation.navigate("TodoList", {
          title: name,
          editable,
          todoList,
          todoItems
        })
      }
    />
  );
});
