import React from "react";
import { shallow, mount } from "enzyme";
import App from "../client/components/app.jsx";

window.fetch = jest.fn().mockImplementation(address => {
  const fetchObject = {
    moon: 0.5,
    isMercuryRetrograde: true,
    month: new Array(27),
  };
  return {
    json: jest.fn(() => {
      return fetchObject;
    }),
  };
});

describe("App component", () => {
  test("should shallow render without throwing an error", () => {
    expect(shallow(<App />));
  });

  test("should mount in a full DOM render", () => {
    expect(mount(<App />));
  });

  test("should render two subcomponents", () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find("div").children()).toHaveLength(2);
  });
});
