import React from "react";
import { shallow } from "enzyme";
import FinishedList from "../../components/FinishedList";
import { findTestWrapper } from "../../../../utils/testUtils";

it("FinishedList render", () => {
  const wrapper = shallow(<FinishedList List={[]} />);
  expect(wrapper).toMatchSnapshot();
}); // 这个测试的目的在于 相当于是锁死了UI 只要发生一点变化 就会报错

it("FinishedList init count = 0, List is enmpyt ", () => {
  const wrapper = shallow(<FinishedList List={[]} />);
  const countElem = findTestWrapper(wrapper, "count");
  const listElem = findTestWrapper(wrapper, "list-item");
  expect(countElem.text()).toEqual("0");
  expect(listElem.length).toEqual(0);
});
it("FinishedList is not empyt, count changing, List changing", () => {
  const wrapper = shallow(
    <FinishedList
      List={["First thing I need to do", "Second thing I need to do"]}
    />
  );
  const countElem = findTestWrapper(wrapper, "count");
  const listElem = findTestWrapper(wrapper, "list-item");
  expect(countElem.text()).toEqual("2");
  expect(listElem.length).toEqual(2);
});

it("FinishedList is not empty, RemoveButtons exist.", () => {
  const wrapper = shallow(
    <FinishedList
      List={["First thing I need to do", "Second thing I need to do"]}
    />
  );
  const deleteElem = findTestWrapper(wrapper, "delete-item");
  expect(deleteElem.length).toEqual(2);
});

it("FinishedList is not empty RemoveButtons onClick check.", () => {
  const fn = jest.fn();
  const index = 0;
  const wrapper = shallow(
    <FinishedList
      List={["First thing I need to do", "Second thing I need to do"]}
      deleteItem={fn}
    />
  );
  const deleteElem = findTestWrapper(wrapper, "delete-item");
  deleteElem.at(index).simulate("click", { stopPropagation: () => {} });
  expect(fn).toHaveBeenLastCalledWith(index);
});
