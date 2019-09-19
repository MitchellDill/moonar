import React from "react";
import { shallow, mount } from "enzyme";
import MoonDetail from "../client/components/moonDetail";

// REMINDER: addd test around default props, add default props

describe("Date component", () => {
  test("should shallow render without throwing an error", () => {
    expect(shallow(<MoonDetail />));
  });

  test("should mount in a full DOM render", () => {
    expect(mount(<MoonDetail />));
  });
});
