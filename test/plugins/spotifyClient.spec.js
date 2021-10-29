import spotifyClientPlugin from "~/plugins/spotifyClient";
import axios from "axios";

jest.mock("axios");

describe("spotifyClient tests", () => {
  it("should return current User", async () => {
    let spotifyClient = {};
    spotifyClientPlugin({}, (name, object) => {
      spotifyClient = object;
    });

    const testResponse = {
      country: "DE",
      display_name: "y1xx",
      email: "dtriphaus@web.de",
      explicit_content: {
        filter_enabled: false,
        filter_locked: false
      },
      external_urls: {
        spotify: "https://open.spotify.com/user/y1xx"
      },
      followers: {
        href: null,
        total: 2
      },
      href: "https://api.spotify.com/v1/users/y1xx",
      id: "y1xx",
      images: [],
      product: "open",
      type: "user",
      uri: "spotify:user:y1xx"
    };

    axios.get.mockResolvedValueOnce(testResponse);

    expect(spotifyClient.getCurrentUser()).toBe(testResponse);
  });
});
