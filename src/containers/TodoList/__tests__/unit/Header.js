import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Header from "../../components/Header";

Enzyme.configure({ adapter: new Adapter() });

it("组件包含input框", () => {
  const wrapper = shallow(<Header />);
  const inputElem = wrapper.find("[data-test='input']");
  expect(inputElem).toExist();
});

it("组件input框内容初始化为空", () => {
  const wrapper = shallow(<Header />);
  const inputElem = wrapper.find("[data-test='input']");
  expect(inputElem.prop("value")).toEqual("");
});

it("当用户输入时，input框会跟随变化", () => {
  const wrapper = shallow(<Header />);
  const inputElem = wrapper.find("[data-test='input']");
  //simulate可以模仿用户动作
  inputElem.simulate("change", {
    target: {
      value: "今天要学习Jest"
    }
  });
  expect(wrapper.state("value")).toEqual("今天要学习Jest");
});

it("按回车的时候如果input无内容无操作", () => {
  const fn = jest.fn();
  const wrapper = shallow(<Header addUndoItem={fn} />);
  const inputElem = wrapper.find("[data-test='input']");
  wrapper.setState({
    value: ""
  });
  //simulate可以模仿用户动作
  inputElem.simulate("keyUp", {
    keyCode: 13
  });
  expect(fn).not.toHaveBeenCalled();
});

it("按回车的时候如果input有内容 函数被调用", () => {
  const fn = jest.fn();
  const wrapper = shallow(<Header addUndoItem={fn} />);
  const inputElem = wrapper.find("[data-test='input']");
  wrapper.setState({
    value: "学习react"
  });
  //simulate可以模仿用户动作
  inputElem.simulate("keyUp", {
    keyCode: 13
  });
  expect(fn).toHaveBeenCalled();
  expect(fn).toHaveBeenLastCalledWith("学习react"); //参数是....
  expect(wrapper.state("value")).toBe("");
});
