import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import TodoList from "../../index";

Enzyme.configure({ adapter: new Adapter() });

it("TodoList 初始化列表为空", () => {
  const wrapper = shallow(<TodoList />);
  expect(wrapper.state("undoList")).toEqual([]);
});

it("TodoList 应该给header传递一个 undoList 内容的方法", () => {
  const wrapper = shallow(<TodoList />);
  const Header = wrapper.find("Header");
  expect(Header.prop("addUndoItem")).toBe(wrapper.instance().addUndoItem);
  //这里需要注意 instance表示TodoList本身的某个函数 名字是addUndoItem
});

it("当header调用回车是 undoList应该新增内容", () => {
  //在这里我们遵循一个原则 能用todolist本身的东西解决 就一定要用
  //我们不去判断回车之类的 只是说判断传回来的函数运行后 list内容是否会增加？
  const wrapper = shallow(<TodoList />);
  const Header = wrapper.find("Header");
  const addFunc = Header.prop("addUndoItem"); //这是一个函数！
  addFunc("学习React"); //调用这个函数

  expect(wrapper.state("undoList").length).toBe(1);
  expect(wrapper.state("undoList")[0]).toBe("学习React");
  //这里需要注意 instance表示TodoList本身的某个函数 名字是addUndoItem
});
