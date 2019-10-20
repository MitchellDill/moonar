import React from "react";
import { shallow, mount } from "enzyme";
import MoonDisplay from "../client/components/moonDisplay";

const testMoonProps = { phase: "new", day: 3, month: 9 };

describe("MoonDisplay component", () => {
  test("should shallow render without throwing an error", () => {
    expect(shallow(<MoonDisplay {...testMoonProps} />));
  });

  test("should mount in a full DOM render", () => {
    expect(mount(<MoonDisplay {...testMoonProps} />));
  });
});
