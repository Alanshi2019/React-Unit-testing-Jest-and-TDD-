import React from "react";
import { shallow } from "enzyme";
import UndoList from "../../components/UndoList";
import { findTestWrapper } from "../../../../utils/testUtils";

// it("Header 渲染正常", () => {
//   const wrapper = shallow(<Header />);
//   expect(wrapper).toMatchSnapshot();
// }); // 这个测试的目的在于 相当于是锁死了UI 只要发生一点变化 就会报错

it("UndoList列表初始化 count为0 列表无内容", () => {
  const wrapper = shallow(<UndoList list={[]} />);
  const countElem = findTestWrapper(wrapper, "count");
  const listElem = findTestWrapper(wrapper, "list-item");
  expect(countElem.text()).toEqual("0");
  expect(listElem.length).toEqual(0);
});

it("UndoList列表有内容时 count变化 长度变化", () => {
  const wrapper = shallow(<UndoList list={["学习Jest", "学习TDD"]} />);
  const countElem = findTestWrapper(wrapper, "count");
  const listElem = findTestWrapper(wrapper, "list-item");
  expect(countElem.text()).toEqual("2");
  expect(listElem.length).toEqual(2);
});

it("UndoList列表有内容时 存在的删除按钮", () => {
  const wrapper = shallow(<UndoList list={["学习Jest", "学习TDD"]} />);

  const deleteElem = findTestWrapper(wrapper, "delete-item");

  expect(deleteElem.length).toEqual(2);
});

it("UndoList列表有内容时 点击按钮调用删除方法", () => {
  const fn = jest.fn();
  const index = 1;
  const wrapper = shallow(
    <UndoList deleteItem={fn} list={["学习Jest", "学习TDD"]} />
  );
  const deleteElem = findTestWrapper(wrapper, "delete-item");
  deleteElem.at(index).simulate("click");
  expect(fn).toHaveBeenLastCalledWith(index);
});
