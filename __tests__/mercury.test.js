import React from "react";
import { shallow, mount } from "enzyme";
import Mercury from "../client/components/mercury.jsx";

describe("Mercury component --->", () => {
  test("should shallow render without throwing an error", () => {
    expect(shallow(<Mercury retrograde={true} />));
  });

  test("should mount in a full DOM render", () => {
    expect(mount(<Mercury retrograde={true} />));
  });
});
