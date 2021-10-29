import index from "../pages/index";
import { mount, enableAutoDestroy } from "@vue/test-utils";
import BaseInput from "../components/BaseInput";
import SpotifyClient from "~/lib/SpotifyClient";

jest.mock("~/lib/SpotifyClient");

enableAutoDestroy(afterEach);

describe("index page tests", () => {
  let mountOptions = {};
  beforeEach(() => {
    mountOptions = {
      stubs: ["SessionStartButton", "NuxtLink"],
      components: {
        BaseInput
      },
      mocks: {
        $router: [],
        $route: { name: "index" },
        $axios: {},
        $config: {},
        $spotifyClient: new SpotifyClient()
      }
    };
  });

  it("is a Vue Instance", async () => {
    let wrapper = mount(index, mountOptions);

    expect(wrapper.vm).toBeTruthy();
  });

  /*
  it("should redirect to /authorize on form submit", async () => {
    const testSessionId = "1234567890";

    //mountOptions.mocks.$axios.post = jest.fn().mockResolvedValueOnce();
    mountOptions.mocks.$axios.post = jest.fn().mockImplementationOnce(() => {
      return Promise.resolve({ data: { musicSessionId: testSessionId } });
    });
    let wrapper = mount(index, mountOptions);

    await wrapper.find("form").trigger("submit");

    expect(wrapper.vm.$router).toStrictEqual([
      {
        name: "authorize",
      }
    ]);
  });

  it("should not redirect on error on middleware call", async () => {
    mountOptions.mocks.$axios.post = jest.fn().mockRejectedValueOnce("error");

    let wrapper = mount(index, mountOptions);

    await wrapper.find("form").trigger("submit");

    expect(wrapper.vm.$router).toStrictEqual([]);
  });
  */
});
