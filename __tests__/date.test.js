import React from "react";
import { shallow, mount } from "enzyme";
import Date from "../client/components/date.jsx";

const testZeroIndexDate = { zeroDay: 0, zeroMonth: 0 };

describe("Date component", () => {
  test("should shallow render without throwing an error", () => {
    expect(shallow(<Date zeroIndexDate={testZeroIndexDate} />));
  });

  test("should mount in a full DOM render", () => {
    expect(mount(<Date zeroIndexDate={testZeroIndexDate} />));
  });
});
