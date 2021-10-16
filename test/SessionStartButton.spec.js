import SessionStartButton from "../components/SessionStartButton";
import { mount } from "@vue/test-utils";
import NuxtLink from "nuxt";

describe("SessionStartButton", () => {
  it("should redirect to authorize endpoint on click", async () => {
    const wrapper = mount(SessionStartButton, {
      stubs: {
        NuxtLink: "<div></div>"
      }
    });

    const link = wrapper.findComponent({ name: "NuxtLink" });
    console.log(link);

    expect(link.attributes("to").toBe("/authorize"));
  });
});
