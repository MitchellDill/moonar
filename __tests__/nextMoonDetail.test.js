import React from "react";
import { shallow, mount } from "enzyme";
import NextMoonDetail from "../client/components/nextMoonDetail";

const testNextMoon = { phase: "full", day: 0, month: 0 };

describe("NextMoonDetail component", () => {
  test("should shallow render without throwing an error", () => {
    expect(
      shallow(<NextMoonDetail nextMoon={testNextMoon} nextMoonCountdown={3} />)
    );
  });

  test("should mount in a full DOM render", () => {
    expect(
      mount(<NextMoonDetail nextMoon={testNextMoon} nextMoonCountdown={3} />)
    );
  });
});
