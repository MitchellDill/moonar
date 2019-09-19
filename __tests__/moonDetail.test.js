import React from "react";
import { shallow, mount } from "enzyme";
import MoonDetail from "../client/components/moonDetail";

const testNextMoon = { lunation: 0.2, day: 0, month: 0 };

describe("Date component", () => {
  test("should shallow render without throwing an error", () => {
    expect(shallow(<MoonDetail nextMoon={testNextMoon} />));
  });

  test("should mount in a full DOM render", () => {
    expect(mount(<MoonDetail nextMoon={testNextMoon} />));
  });
});
