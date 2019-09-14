import React from "react";
import { shallow, mount } from "enzyme";
import Moon from "../client/components/moon.jsx";

describe("Moon component --->", () => {
  test("should shallow render without throwing an error", () => {
    expect(shallow(<Moon lunationNumber={0.5} />));
  });

  test("should mount in a full DOM render", () => {
    expect(mount(<Moon lunationNumber={0.5} />));
  });
});
