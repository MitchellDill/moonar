import React from "react";
import { shallow, mount } from "enzyme";
import MoonPhaseImage from "../client/components/moonPhaseImage";

describe("MoonPhaseImage component", () => {
  test("should shallow render without throwing an error", () => {
    expect(shallow(<MoonPhaseImage phase={"new"} />));
  });

  test("should mount in a full DOM render", () => {
    expect(mount(<MoonPhaseImage phase={"new"} />));
  });
});
