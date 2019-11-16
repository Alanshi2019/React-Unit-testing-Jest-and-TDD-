import React from "react";
import { shallow } from "enzyme";
import UndoList from "../../components/UndoList";
import { findTestWrapper } from "../../../../utils/testUtils";

it("UndoList 渲染正常", () => {
  const wrapper = shallow(<UndoList List={[]} />);
  expect(wrapper).toMatchSnapshot();
}); // 这个测试的目的在于 相当于是锁死了UI 只要发生一点变化 就会报错

it("UndoList列表初始化 count为0 列表无内容", () => {
  const wrapper = shallow(<UndoList List={[]} />);
  const countElem = findTestWrapper(wrapper, "count");
  const listElem = findTestWrapper(wrapper, "list-item");
  expect(countElem.text()).toEqual("0");
  expect(listElem.length).toEqual(0);
});

it("UndoList列表有内容时 count变化 长度变化", () => {
  const wrapper = shallow(
    <UndoList
      List={[
        {
          status: "div",
          value: "学习Jest"
        },
        {
          status: "div",
          value: "学习TDD"
        }
      ]}
    />
  );
  const countElem = findTestWrapper(wrapper, "count");
  const listElem = findTestWrapper(wrapper, "list-item");
  expect(countElem.text()).toEqual("2");
  expect(listElem.length).toEqual(2);
});

it("UndoList列表有内容时 存在的删除按钮", () => {
  const wrapper = shallow(
    <UndoList
      List={[
        {
          status: "div",
          value: "学习Jest"
        },
        {
          status: "div",
          value: "学习TDD"
        }
      ]}
    />
  );

  const deleteElem = findTestWrapper(wrapper, "delete-item");

  expect(deleteElem.length).toEqual(2);
});

it("UndoList列表有内容时 点击按钮调用删除方法", () => {
  const fn = jest.fn();
  const index = 1;
  const wrapper = shallow(
    <UndoList
      deleteItem={fn}
      List={[
        {
          status: "div",
          value: "学习Jest"
        },
        {
          status: "div",
          value: "学习TDD"
        }
      ]}
    />
  );
  const deleteElem = findTestWrapper(wrapper, "delete-item");
  deleteElem.at(index).simulate("click");
  expect(fn).toHaveBeenLastCalledWith(index);
});

it("当某一项被点击时，触发执行changeStatus函数", () => {
  const fn = jest.fn();
  const index = 1;
  const wrapper = shallow(
    <UndoList
      changeStatus={fn}
      List={[
        {
          status: "div",
          value: "学习Jest"
        },
        {
          status: "div",
          value: "学习TDD"
        }
      ]}
    />
  );
  const modifyElem = findTestWrapper(wrapper, "list-item");
  modifyElem.at(index).simulate("click");
  expect(fn).toHaveBeenLastCalledWith(index);
});

it("当某一项状态是input时，展示输入框", () => {
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

it("当某一个input失去焦点时，触发执行handleBlur方法", () => {
  const fn = jest.fn();
  const index = 0;
  const wrapper = shallow(
    <UndoList
      handleBlur={fn}
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
  const inputElem = findTestWrapper(wrapper, "input");
  inputElem.simulate("blur");
  // inputElem.at(index).simulate("blur"); 表示元素失去焦点 应该被用在所有地方而不是某特定元素
  expect(fn).toHaveBeenLastCalledWith(index);
});

it("当修改item内容时，触发执行valueChange", () => {
  const fn = jest.fn();
  const index = 0;
  const wrapper = shallow(
    <UndoList
      valueChange={fn}
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
  const inputElem = findTestWrapper(wrapper, "input");
  inputElem.simulate("change", {
    target: { value: "学习TDD" }
  }); //e.target.value注意一定要匹配格式！！！！

  // inputElem.at(index).simulate("blur"); 表示元素失去焦点 应该被用在所有地方而不是某特定元素
  expect(fn).toHaveBeenLastCalledWith(index, "学习TDD");
});
