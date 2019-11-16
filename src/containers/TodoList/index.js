import React, { Component } from "react";
import Header from "./components/Header";
import UndoList from "./components/UndoList";
import "./style.css";

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      undoList: []
    };
    this.addUndoItem = this.addUndoItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
  }
  render() {
    return (
      <div>
        <Header addUndoItem={this.addUndoItem} />
        <UndoList List={this.state.undoList} deleteItem={this.deleteItem} />
      </div>
    );
  }
  addUndoItem(value) {
    this.setState({
      undoList: [...this.state.undoList, value]
    });
  }

  deleteItem(index) {
    const newState = [...this.state.undoList];
    newState.splice(index, 1); //删除一项
    this.setState({ undoList: newState });
  }
}

export default TodoList;
