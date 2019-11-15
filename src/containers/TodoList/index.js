import React, { Component } from "react";
import Header from "./components/Header";
import "./style.css";

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      undoList: []
    };
    this.addUndoItem = this.addUndoItem.bind(this);
  }
  render() {
    return (
      <div>
        <Header addUndoItem={this.addUndoItem} />
        {this.state.undoList.map((item, index) => {
          return <div key={index}>{item}</div>;
        })}
      </div>
    );
  }
  addUndoItem(value) {
    this.setState({
      undoList: [...this.state.undoList, value]
    });
  }
}

export default TodoList;
