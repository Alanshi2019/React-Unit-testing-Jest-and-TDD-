import React from "react";
import { shallow } from "enzyme";
import UndoList from "../../components/UndoList";
import { findTestWrapper } from "../../../../utils/testUtils";

it("UndoList render", () => {
  const wrapper = shallow(<UndoList List={[]} />);
  expect(wrapper).toMatchSnapshot();
});

it("UndoList init count = 0, list is empty", () => {
  const wrapper = shallow(<UndoList List={[]} />);
  const countElem = findTestWrapper(wrapper, "count");
  const listElem = findTestWrapper(wrapper, "list-item");
  expect(countElem.text()).toEqual("0");
  expect(listElem.length).toEqual(0);
});

it("UndoList is not empty count changing, list changing", () => {
  const wrapper = shallow(
    <UndoList
      List={[
        {
          status: "div",
          value: "First"
        },
        {
          status: "div",
          value: "Second"
        }
      ]}
    />
  );
  const countElem = findTestWrapper(wrapper, "count");
  const listElem = findTestWrapper(wrapper, "list-item");
  expect(countElem.text()).toEqual("2");
  expect(listElem.length).toEqual(2);
});

it("UndoList is not empty, checkbox and removeButton exist", () => {
  const wrapper = shallow(
    <UndoList
      List={[
        {
          status: "div",
          value: "First"
        },
        {
          status: "div",
          value: "Second"
        }
      ]}
    />
  );

  const deleteElem = findTestWrapper(wrapper, "delete-item");
  const checkElem = findTestWrapper(wrapper, "check-item");
  expect(deleteElem.length).toEqual(2);
  expect(checkElem.length).toEqual(2);
});

it("UndoList is not empty, onClick check", () => {
  const fn = jest.fn();
  const index = 1;
  const wrapper = shallow(
    <UndoList
      deleteItem={fn}
      List={[
        {
          status: "div",
          value: "First"
        },
        {
          status: "div",
          value: "Second"
        }
      ]}
    />
  );
  const deleteElem = findTestWrapper(wrapper, "delete-item");
  deleteElem.at(index).simulate("click", { stopPropagation: () => {} }); //这里为了匹配之前e.stopPropagation 因为传递的e没有那个方法 所以自己定义一个假的
  expect(fn).toHaveBeenLastCalledWith(index);
});

it("Item been Clicked，changeStatus been called", () => {
  const fn = jest.fn();
  const index = 1;
  const wrapper = shallow(
    <UndoList
      changeStatus={fn}
      List={[
        {
          status: "div",
          value: "First"
        },
        {
          status: "div",
          value: "Second"
        }
      ]}
    />
  );
  const modifyElem = findTestWrapper(wrapper, "list-item");
  modifyElem.at(index).simulate("click");
  expect(fn).toHaveBeenLastCalledWith(index);
});

it("Item status: input，inputline showed", () => {
  const wrapper = shallow(
    <UndoList
      List={[
        {
          status: "input",
          value: "学习Jest"
        },
        {
          status: "div",
          value: "学习TDD"
        }
      ]}
    />
  );
  const inputItems = findTestWrapper(wrapper, "input"); //判断input这个类型在undolist中一共有一个
  expect(inputItems.length).toBe(1);
});

it("Inputline onblur，handleBlur been called", () => {
  const fn = jest.fn();
  const index = 0;
  const wrapper = shallow(
    <UndoList
      handleBlur={fn}
      List={[
        {
          status: "input",
          value: "First"
        },
        {
          status: "div",
          value: "Second"
        }
      ]}
    />
  );
  const inputElem = findTestWrapper(wrapper, "input");
  inputElem.simulate("blur");
  // inputElem.at(index).simulate("blur"); 表示元素失去焦点 应该被用在所有地方而不是某特定元素
  expect(fn).toHaveBeenLastCalledWith(index);
});

it("Modiy item，valueChange been called", () => {
  const fn = jest.fn();
  const index = 0;
  const wrapper = shallow(
    <UndoList
      valueChange={fn}
      List={[
        {
          status: "input",
          value: "First"
        },
        {
          status: "div",
          value: "Second"
        }
      ]}
    />
  );
  const inputElem = findTestWrapper(wrapper, "input");
  inputElem.simulate("change", {
    target: { value: "Second" }
  }); //e.target.value注意一定要匹配格式！！！！

  // inputElem.at(index).simulate("blur"); 表示元素失去焦点 应该被用在所有地方而不是某特定元素
  expect(fn).toHaveBeenLastCalledWith(index, "Second");
});

it("UndoList is not empty, click checkbox to call addFinishedList", () => {
  const fn = jest.fn();
  const index = 1;
  const wrapper = shallow(
    <UndoList
      addIntoFinishedList={fn}
      List={[
        {
          status: "div",
          value: "First"
        },
        {
          status: "div",
          value: "Second"
        }
      ]}
    />
  );
  const checkElem = findTestWrapper(wrapper, "check-item");
  checkElem.at(index).simulate("click", { stopPropagation: () => {} }); //这里为了匹配之前e.stopPropagation 因为传递的e没有那个方法 所以自己定义一个假的
  expect(fn).toHaveBeenLastCalledWith(index);
});
