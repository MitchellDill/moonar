import React from "react";
import { shallow, mount } from "enzyme";
import Date from "../client/components/date.jsx";

describe("Date component", () => {
  test("should shallow render without throwing an error", () => {
    expect(shallow(<Date />));
  });

  test("should mount in a full DOM render", () => {
    expect(mount(<Date />));
  });
});
