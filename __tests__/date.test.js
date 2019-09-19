import React from "react";
import { shallow, mount } from "enzyme";
import Date from "../client/components/date.jsx";

// REMINDER: addd test around default props, add default props

describe("Date component", () => {
  test("should shallow render without throwing an error", () => {
    expect(shallow(<Date />));
  });

  test("should mount in a full DOM render", () => {
    expect(mount(<Date />));
  });
});
