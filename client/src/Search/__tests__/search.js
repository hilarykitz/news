import React from "react";
import { configure, shallow, mount } from "enzyme";
import sinon from "sinon";
import Search from "../Search";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

let wrapper;
const mockFetch = sinon.spy();

beforeEach(() => {
  wrapper = shallow(<Search fetchNewsByQuery={mockFetch} />);
});

describe("<Search />", () => {
  it("should render successfully", () => {
    expect(wrapper.find("#searchForm").length).toEqual(1);
  });

  it("fetches news on submit", () => {
    wrapper.find("form").simulate("submit", {
      preventDefault: () => {}
    });
    const articlesWereFetched = mockFetch.callCount === 1;
    expect(articlesWereFetched).toEqual(true);
  });
});
