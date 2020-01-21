import * as React from "react";
import { observer } from "mobx-react";
import { Document } from "firestorter";
import { TodoItem } from "./types";
import { ListItem, Switch } from "../../components";

type PropsType = {
  todoItem: Document<TodoItem>;
  editable?: boolean;
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
      const { todoItem, editable } = this.props;
      if (!todoItem) return null;
      const { text, finished } = todoItem.data;
      return (
        <ListItem
          editable={editable}
          label={editable ? "Text" : text}
          value={editable ? text : undefined}
          onChangeValue={this.onChangeText}
          accessory={
            <Switch
              value={finished || false}
              disabled={!editable}
              onValueChange={this.onChangeFinished}
            />
          }
        />
      );
    }
  }
);
