import { mount, shallowMount } from "@vue/test-utils";
import SpotifyAppAuth from "@/components/SpotifyAppAuth.vue";

describe("SpotifyAppAuth", () => {
  test("is a Vue instance", () => {
    const wrapper = mount(SpotifyAppAuth);
    expect(wrapper.vm).toBeTruthy();
  });

  test("emits access token response", async () => {
    window.location = {
      ...window.location,
      assign: jest.fn()
    };

    let wrapper = shallowMount(SpotifyAppAuth, {
      mocks: {
        $route: { query: { code: "test_authorization_code" } }
      }
    });

    const test_api_response = {
      access_token: "test_access_token",
      token_type: "Bearer",
      scope: "playlist-public-modify",
      refresh_token: "test_refresh_token",
      expires_in: 3600
    };

    wrapper.vm.$axios = jest.fn((url, options) =>
      Promise.resolve({
        data: test_api_response
      })
    );
    await SpotifyAppAuth.fetch.call(wrapper.vm); // using `call` to inject `this`
    await SpotifyAppAuth.mounted.call(wrapper.vm); // using `call` to inject `this`

    expect(wrapper.emitted("access-token")[0][0]).toBe(test_api_response);
  });

  test("builds url to spotify without oauth authorization_code", () => {
    delete window.location;

    window.location = {
      assign: jest.fn()
    };

    let wrapper = mount(SpotifyAppAuth);

    expect(wrapper.vm.$data.oauth_redirect_url).toBe(
      "https://accounts.spotify.com/authorize?" +
        new URLSearchParams({
          client_id: "5d32c6be193a454aa17e5b420ed8501e",
          response_type: "code",
          redirect_uri: "https://bu7be.sse.codesandbox.io/",
          //ToDo: state: CSRF Token
          scopes: "playlist-modify-public"
        })
    );
  });
});
