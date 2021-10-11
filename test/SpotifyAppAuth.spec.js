import { mount } from "@vue/test-utils";
import SpotifyAppAuth from "@/components/SpotifyAppAuth.vue";

describe("SpotifyAppAuth", () => {
  test("is a Vue instance", () => {
    const wrapper = mount(SpotifyAppAuth);
    expect(wrapper.vm).toBeTruthy();
  });
});
