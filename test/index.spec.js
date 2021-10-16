import index from "../pages/index";
import { shallowMount } from "@vue/test-utils";

describe("index page tests", () => {
  it("is a Vue Instance", async () => {
    let wrapper = shallowMount(index, {
      stubs: {
        SessionStartButton: true
      }
    });

    expect(wrapper.vm).toBeTruthy();
  });
});
