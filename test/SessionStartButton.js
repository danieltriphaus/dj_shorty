import SessionStartButton from "../components/SessionStartButton";
import { mount } from "@vue/test-utils";
import BaseInput from "../components/BaseInput";

/*
describe("SessionStartButton", () => {
  
  it("should redirect to authorize endpoint", async () => {
    const wrapper = mount(SessionStartButton, {
      stubs: {
        NuxtLink: true
      }
    });

    const link = wrapper.find(".spotify_authorize");

    expect(link.attributes("to")).toContain("/authorize");
  });

  it("should correctly set wait_time parameter", async () => {
    const wrapper = mount(SessionStartButton, {
      stubs: {
        NuxtLink: true
      },
      propsData: {
        waitTime: 5
      }
    });

    const link = wrapper.find(".spotify_authorize");

    expect(link.attributes("to")).toContain("waitTime=5");
  });

  it("should not include wait_time parameter when prop empty", async () => {
    const wrapper = mount(SessionStartButton, {
      stubs: {
        NuxtLink: true
      }
    });

    const link = wrapper.find(".spotify_authorize");

    expect(link.attributes("to").search("waitTime")).toEqual(-1);
  });
  *

  it("should redirect to authorize endpoint after submit", async () => {
    const wrapper = mount(SessionStartButton, {
      stubs: {
        BaseInput: true
      }
    });

    await SessionStartButton.fetch.call(wrapper.vm, {
      req: { method: "POST" }
    });
  });
  
});
*/
