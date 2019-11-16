import React from "react";
import { shallow } from "enzyme";

import TodoList from "../../index";

it("TodoList 初始化列表为空", () => {
  const wrapper = shallow(<TodoList />);
  expect(wrapper.state("undoList")).toEqual([]);
});

it("TodoList 应该给header传递一个 undoList 内容的方法", () => {
  const wrapper = shallow(<TodoList />);
  const Header = wrapper.find("Header");
  expect(Header.prop("addUndoItem")).toBeTruthy();
  //这里需要注意 instance表示TodoList本身的某个函数 名字是addUndoItem
});

it("addUndoItem被执行的时候 undoList应该新增内容", () => {
  //在这里我们遵循一个原则 能用todolist本身的东西解决 就一定要用
  //我们不去判断回车之类的 只是说判断传回来的函数运行后 list内容是否会增加？
  const wrapper = shallow(<TodoList />);
  wrapper.instance().addUndoItem("学习React");
  expect(wrapper.state("undoList").length).toBe(1);
  expect(wrapper.state("undoList")[0]).toEqual({
    status: "div",
    value: "学习React"
  });
  //这里需要注意 instance表示TodoList本身的某个函数 名字是addUndoItem
});

it("TodoList 应该给UndoList传递一个List的数据,删除元素和修改元素的方法 以及失去焦点 以及valueChange", () => {
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

  //这里需要注意 instance表示TodoList本身的某个函数 名字是addUndoItem
});

it("Delete Item被执行时 undolist内容应该被删除", () => {
  const wrapper = shallow(<TodoList />);
  wrapper.setState({
    undoList: [
      {
        status: "div",
        value: "学习Jest"
      },
      {
        status: "div",
        value: "学习TDD"
      }
    ]
  });
  wrapper.instance().deleteItem(1); //模拟执行该函数！！！
  expect(wrapper.state("undoList")).toEqual([
    {
      status: "div",
      value: "学习Jest"
    }
  ]);
});

it("Change被执行时 undolist的status应该被修改", () => {
  const wrapper = shallow(<TodoList />);
  wrapper.setState({
    undoList: [
      {
        status: "div",
        value: "学习Jest"
      },
      {
        status: "div",
        value: "学习TDD"
      }
    ]
  });
  wrapper.instance().changeStatus(1); //模拟执行该函数！！！
  expect(wrapper.state("undoList")[1]).toEqual({
    status: "input",
    value: "学习TDD"
  });
});

it("handleBlur被执行 undolist的status应该被修改", () => {
  const wrapper = shallow(<TodoList />);
  wrapper.setState({
    undoList: [
      {
        status: "input",
        value: "学习Jest"
      },
      {
        status: "div",
        value: "学习TDD"
      }
    ]
  });
  wrapper.instance().handleBlur(0); //模拟执行该函数！！！
  expect(wrapper.state("undoList")[0]).toEqual({
    status: "div",
    value: "学习Jest"
  });
});

it("valueChange undolist内容应该被修改", () => {
  const wrapper = shallow(<TodoList />);
  const newValue = "不再学习Jest";
  wrapper.setState({
    undoList: [
      {
        status: "input",
        value: "学习Jest"
      }
    ]
  });
  wrapper.instance().valueChange(0, newValue); //模拟执行该函数！！！
  expect(wrapper.state("undoList")[0]).toEqual({
    status: "input",
    value: "不再学习Jest"
  });
});
