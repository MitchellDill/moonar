import React from "react";
import { shallow, mount } from "enzyme";
import App from "../client/components/app.jsx";

window.fetch = jest.fn().mockImplementation(address => {
  return {
    json: jest.fn(() => {
      return { moon: 0.5, isMercuryRetrograde: true };
    }),
  };
});

describe("App component --->", () => {
  test("should shallow render without throwing an error", () => {
    expect(shallow(<App />));
  });

  test("should mount in a full DOM render", () => {
    expect(mount(<App />));
  });
});
