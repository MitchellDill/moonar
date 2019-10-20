import React from "react";
import { shallow, mount } from "enzyme";
import Moon from "../client/components/moon.jsx";

const testLunarSchedule = [{ lunation: 0.0, day: 0, month: 0 }];

describe("Moon component", () => {
  test("should shallow render without throwing an error", () => {
    expect(
      shallow(
        <Moon
          lunationNumber={0.5}
          loading={false}
          lunarSchedule={testLunarSchedule}
          date={new Date()}
        />
      )
    );
  });

  test("should mount in a full DOM render", () => {
    expect(
      mount(
        <Moon
          lunationNumber={0.5}
          loading={false}
          lunarSchedule={testLunarSchedule}
          date={new Date()}
        />
      )
    );
  });
});
