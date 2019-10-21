import React from "react";
import { shallow, mount } from "enzyme";
import Zodiac from "../client/components/zodiac";

const testMoonProps = { phase: "full", day: 1, month: 2 };

describe("Zodiac component", () => {
  test("should shallow render without throwing an error", () => {
    expect(shallow(<Zodiac {...testMoonProps} />));
  });

  test("should mount in a full DOM render", () => {
    expect(mount(<Zodiac {...testMoonProps} />));
  });
});
