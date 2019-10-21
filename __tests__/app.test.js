import React from "react";
import { shallow, mount } from "enzyme";
import App from "../client/components/app.jsx";

window.fetch = jest.fn().mockImplementation(address => {
  const fetchObject = {
    month: 0,
    year: 0,
    days: new Array(27).fill({ moon: 0, mercury: false }),
  };
  return {
    json: jest.fn(() => {
      return fetchObject;
    }),
  };
});

//need to mock the methods which fire during lifecycle

describe("App component", () => {
  test("should shallow render without throwing an error", () => {
    expect(shallow(<App />));
  });

  test("should mount in a full DOM render", () => {
    expect(mount(<App />));
  });

  test("should render one subcomponent when mercury is not retrograde", () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find("div").children()).toHaveLength(2);
  });
});
