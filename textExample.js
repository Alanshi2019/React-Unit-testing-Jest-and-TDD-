import React from "react";
import Enzyme, { shallow } from "enzyme"; // 相对 mount是深渲染 做集成测试的时候
import Adapter from "enzyme-adapter-react-16";
import App from "./App";

Enzyme.configure({ adapter: new Adapter() });

// import ReactDOM from "react-dom";
//Enzyme实际上是对ReactDom进行的封装 所以不用react dom了

it("renders without crashing", () => {
  // const div = document.createElement("div");

  // // throw new Error();  自己抛出的异常。
  // const container = div.getElementsByClassName("App");
  // // console.log(container);
  // expect(container.length).toBe(1);

  const wrapper = shallow(<App />);
  //浅渲染 只关注App这一个组件 这一层做测试 不管下面会怎么样 优点是速度快！（单元测试）
  console.log(wrapper.find("[data-test='container']")); // 类型是ShallowWrapper
  console.log(wrapper.find("[data-test='container']").length); //因为只有一个App class 所以长度为1

  // expect(wrapper.find(".App").length).toBe(1);
  expect(wrapper.find("[data-test='container']")).toExist();
  //如果想使用这个 必须在package.json中的 setupAfter... 中修改：
  // "setupFilesAfterEnv": [
  //   "./node_modules/jest-enzyme/lib/index.js"
  // ],

  // console.log(wrapper.debug()); 可以直接返回HTML码 方便于调试。
  // console.log(wrapper.find(".App").prop("title")); //通过prop属性找到title
  expect(wrapper.find("[data-test='container']")).toHaveProp(
    "title",
    "sdfsdfsdf"
  );
});
