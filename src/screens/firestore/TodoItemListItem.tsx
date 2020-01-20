import * as React from "react";
import { observer } from "mobx-react";
import { Document } from "firestorter";
import { TodoItem } from "./types";
import { ListItem, Switch } from "../../components";

type PropsType = {
  todoItem: Document<TodoItem>;
};

export default observer(
  class TodoItemListItem extends React.Component<PropsType> {
    onChangeText = async (value: string) => {
      const { todoItem } = this.props;
      return todoItem.update({
        text: value
      });
    };

    onChangeFinished = async (value: boolean) => {
      const { todoItem } = this.props;
      return todoItem.update({
        finished: value
      });
    };

    render() {
      const { todoItem } = this.props;
      if (!todoItem) return null;
      const { text, finished } = todoItem.data;
      return (
        <ListItem
          editable
          label="Text"
          value={text}
          onChangeValue={this.onChangeText}
          accessory={
            <Switch
              value={finished || false}
              onValueChange={this.onChangeFinished}
            />
          }
          //value={`${todoItems.docs.length} items`}
          /*onPress={() =>
        navigation.navigate("TodoList", {
          col: todoItems
        })
      }*/
        />
      );
    }
  }
);
