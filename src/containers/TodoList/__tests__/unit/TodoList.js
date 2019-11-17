import React from "react";
import { shallow } from "enzyme";

import TodoList from "../../index";

it("TodoList init, List is empty", () => {
  const wrapper = shallow(<TodoList />);
  expect(wrapper.state("undoList")).toEqual([]);
});

it("TodoList pass addUndoItem to header component", () => {
  const wrapper = shallow(<TodoList />);
  const Header = wrapper.find("Header");
  expect(Header.prop("addUndoItem")).toBeTruthy();
  //这里需要注意 instance表示TodoList本身的某个函数 名字是addUndoItem
});

it("addUndoItem been called, undoList should add new item.", () => {
  //在这里我们遵循一个原则 能用todolist本身的东西解决 就一定要用
  //我们不去判断回车之类的 只是说判断传回来的函数运行后 list内容是否会增加？
  const wrapper = shallow(<TodoList />);
  wrapper.instance().addUndoItem("First thing I need to do");
  expect(wrapper.state("undoList").length).toBe(1);
  expect(wrapper.state("undoList")[0]).toEqual({
    status: "div",
    value: "First thing I need to do"
  });
  //这里需要注意 instance表示TodoList本身的某个函数 名字是addUndoItem
});

it("TodoList pass to UndoList: List, deleteItem, changeStatus, handleBlur, valueChange and addIntoFinishedList", () => {
  const wrapper = shallow(<TodoList />);
  const UndoList = wrapper.find("UndoList");
  // expect(UndoList.prop("deleteItem")).toBe(
  //   wrapper.instance().deleteItem
  // ); 需要严重注意： 这里这两个都是Undefined 所以测试会通过 必须先判断他是存在的！！！

  expect(UndoList.prop("List")).toBeTruthy();
  expect(UndoList.prop("deleteItem")).toBeTruthy();
  expect(UndoList.prop("changeStatus")).toBeTruthy();
  expect(UndoList.prop("handleBlur")).toBeTruthy();
  expect(UndoList.prop("valueChange")).toBeTruthy();
  expect(UndoList.prop("addIntoFinishedList")).toBeTruthy();

  //这里需要注意 instance表示TodoList本身的某个函数 名字是addUndoItem
});

it("Delete Item been called, item should be deleted in undolist", () => {
  const wrapper = shallow(<TodoList />);
  wrapper.setState({
    undoList: [
      {
        status: "div",
        value: "First"
      },
      {
        status: "div",
        value: "Second"
      }
    ]
  });
  wrapper.instance().deleteItem(1); //模拟执行该函数！！！
  expect(wrapper.state("undoList")).toEqual([
    {
      status: "div",
      value: "First"
    }
  ]);
});

it("ChangeStatus been called,  status should be changed", () => {
  const wrapper = shallow(<TodoList />);
  wrapper.setState({
    undoList: [
      {
        status: "div",
        value: "First"
      },
      {
        status: "div",
        value: "Second"
      }
    ]
  });
  wrapper.instance().changeStatus(1); //模拟执行该函数！！！
  expect(wrapper.state("undoList")[1]).toEqual({
    status: "input",
    value: "Second"
  });
});

it("handleBlur been called, status should be changed", () => {
  const wrapper = shallow(<TodoList />);
  wrapper.setState({
    undoList: [
      {
        status: "input",
        value: "First"
      },
      {
        status: "div",
        value: "Second"
      }
    ]
  });
  wrapper.instance().handleBlur(0); //模拟执行该函数！！！
  expect(wrapper.state("undoList")[0]).toEqual({
    status: "div",
    value: "First"
  });
});

it("valueChange been called, value should be changed", () => {
  const wrapper = shallow(<TodoList />);
  const newValue = "Third";
  wrapper.setState({
    undoList: [
      {
        status: "input",
        value: "First"
      }
    ]
  });
  wrapper.instance().valueChange(0, newValue); //模拟执行该函数！！！
  expect(wrapper.state("undoList")[0]).toEqual({
    status: "input",
    value: "Third"
  });
});

it("TodoList pass a list and deleteItem() to FinishedList ", () => {
  const wrapper = shallow(<TodoList />);
  const FinishedList = wrapper.find("FinishedList");
  expect(FinishedList.prop("List")).toBeTruthy();
  expect(FinishedList.prop("deleteItem")).toBeTruthy();
});

it("DeletedItem been called, item should be deleted", () => {
  const wrapper = shallow(<TodoList />);
  wrapper.setState({
    finishedList: ["First", "Second"]
  });
  const index = 1;
  wrapper.instance().deleteFinished(index);
  expect(wrapper.state("finishedList")).toEqual(["First"]);
});

it("AddIntoFinished been called,  item should be removed from undoList and insert into finishedList", () => {
  const wrapper = shallow(<TodoList />);
  wrapper.setState({
    undoList: [
      {
        status: "div",
        value: "First"
      },
      {
        status: "div",
        value: "Second"
      },
      {
        status: "div",
        value: "Third"
      }
    ],
    finishedList: []
  });
  wrapper.instance().addIntoFinishedList(1); //模拟执行该函数！！！
  expect(wrapper.state("undoList")).toEqual([
    {
      status: "div",
      value: "First"
    },
    {
      status: "div",
      value: "Third"
    }
  ]);
  expect(wrapper.state("finishedList")).toEqual(["Second"]);
});
