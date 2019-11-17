import React, { Component } from "react";
import Header from "./components/Header";
import UndoList from "./components/UndoList";
import FinishedList from "./components/FinishedList";
import "./style.css";

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      undoList: [],
      finishedList: []
    };
    this.addUndoItem = this.addUndoItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.changeStatus = this.changeStatus.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.valueChange = this.valueChange.bind(this);
    this.deleteFinished = this.deleteFinished.bind(this);
    this.addIntoFinishedList = this.addIntoFinishedList.bind(this);
  }
  render() {
    return (
      <div>
        <Header addUndoItem={this.addUndoItem} />
        <UndoList
          List={this.state.undoList}
          changeStatus={this.changeStatus}
          deleteItem={this.deleteItem}
          handleBlur={this.handleBlur}
          valueChange={this.valueChange}
          addIntoFinishedList={this.addIntoFinishedList}
        />
        <FinishedList
          List={this.state.finishedList}
          deleteItem={this.deleteFinished}
        />
      </div>
    );
  }
  addUndoItem(value) {
    this.setState({
      undoList: [
        ...this.state.undoList,
        {
          status: "div",
          value
        }
      ]
    });
  }

  deleteItem(index) {
    const newState = this.state.undoList;
    newState.splice(index, 1); //删除一项
    this.setState({ undoList: newState });
  }
  changeStatus(index) {
    const newList = this.state.undoList;
    // newList[index].status = newList[index].status === "div" ? "input" : "div";
    newList[index].status = "input";
    this.setState({ undoList: newList });
  }
  handleBlur(index) {
    const newList = this.state.undoList;
    newList[index].status = "div";
    this.setState({ undoList: newList });
  }
  valueChange(index, value) {
    const newList = this.state.undoList;
    newList[index].value = value;
    this.setState({ undoList: newList });
  }
  deleteFinished(index) {
    const newState = this.state.finishedList;
    newState.splice(index, 1); //删除一项
    this.setState({ finishedList: newState });
  }
  addIntoFinishedList(index) {
    const newUndoList = this.state.undoList;
    const newValue = newUndoList[index].value;
    const newFinishedList = [...this.state.finishedList, newValue];
    newUndoList.splice(index, 1);
    this.setState({ undoList: newUndoList, finishedList: newFinishedList });
  }
}

export default TodoList;
