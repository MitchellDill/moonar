import React from "react";
import { shallow, mount } from "enzyme";
import MoonPhaseText from "../client/components/moonPhaseText";

const testMoonProps = { phase: "full", day: 4, month: 7 };

describe("MoonPhaseText component", () => {
  test("should shallow render without throwing an error", () => {
    expect(shallow(<MoonPhaseText {...testMoonProps} />));
  });

  test("should mount in a full DOM render", () => {
    expect(mount(<MoonPhaseText {...testMoonProps} />));
  });
});
