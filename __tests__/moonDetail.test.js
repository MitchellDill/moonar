import React from "react";
import { shallow, mount } from "enzyme";
import MoonDetail from "../client/components/moonDetail";

const testNextMoon = { phase: "full", day: 0, month: 0 };

describe("MoonDetail component", () => {
  test("should shallow render without throwing an error", () => {
    expect(
      shallow(<MoonDetail nextMoon={testNextMoon} nextMoonCountdown={3} />)
    );
  });

  test("should mount in a full DOM render", () => {
    expect(mount(<MoonDetail nextMoon={testNextMoon} nextMoonCountdown={3} />));
  });
});
