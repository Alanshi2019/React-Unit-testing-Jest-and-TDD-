import React from "react";
import { shallow } from "enzyme";
import Header from "../../components/Header";
import { findTestWrapper } from "../../../../utils/testUtils";

it("Header render", () => {
  const wrapper = shallow(<Header />);
  expect(wrapper).toMatchSnapshot();
}); // 这个测试的目的在于 相当于是锁死了UI 只要发生一点变化 就会报错

it("Header-input check", () => {
  const wrapper = shallow(<Header />);
  const inputElem = findTestWrapper(wrapper, "input");
  expect(inputElem).toExist();
});

it("Header-input init", () => {
  const wrapper = shallow(<Header />);
  const inputElem = findTestWrapper(wrapper, "input");
  expect(inputElem.prop("value")).toEqual("");
});

it("Header-input onChange", () => {
  const wrapper = shallow(<Header />);
  const inputElem = findTestWrapper(wrapper, "input");
  //simulate可以模仿用户动作
  inputElem.simulate("change", {
    target: {
      value: "First thing I need to do"
    }
  });
  expect(wrapper.state("value")).toEqual("First thing I need to do");
});

it("Enter typed when there is nothing in the inputline.", () => {
  const fn = jest.fn();
  const wrapper = shallow(<Header addUndoItem={fn} />);
  const inputElem = findTestWrapper(wrapper, "input");
  wrapper.setState({
    value: ""
  });
  //simulate可以模仿用户动作
  inputElem.simulate("keyUp", {
    keyCode: 13
  });
  expect(fn).not.toHaveBeenCalled();
});

it("Enter typed when there is something in the inputline, function called", () => {
  const fn = jest.fn();
  const wrapper = shallow(<Header addUndoItem={fn} />);
  const inputElem = findTestWrapper(wrapper, "input");
  wrapper.setState({
    value: "First thing I need to do"
  });
  //simulate可以模仿用户动作
  inputElem.simulate("keyUp", {
    keyCode: 13
  });
  expect(fn).toHaveBeenCalled();
  expect(fn).toHaveBeenLastCalledWith("First thing I need to do"); //参数是....
  expect(wrapper.state("value")).toBe("");
});
