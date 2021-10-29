import authorize from "../middleware/authorize.js";
import Cookie from "cookie-universal";

describe("/authorize tests", () => {
  afterEach(() => {
    let testCookies = Cookie();
    testCookies.removeAll();
  });

  it("should redirect to spotify without auth_code", () => {
    let url = "";
    const baseURL = "https://test.com/";
    authorize({
      $config: {
        baseURL
      },
      query: {},
      redirect: jest.fn((redirect_url) => (url = redirect_url))
    });

    expect(url).toBe(
      "https://accounts.spotify.com/authorize?" +
        new URLSearchParams({
          client_id: "5d32c6be193a454aa17e5b420ed8501e",
          response_type: "code",
          redirect_uri: baseURL + "authorize",
          //ToDo: state: CSRF Token
          scopes: "playlist-modify-public"
        })
    );
  });

  it("should set access_token cookie", async () => {
    const access_token_response = {
      access_token: "test_access_token",
      token_type: "Bearer",
      expires_in: 3600,
      refresh_token: "test_refresh_token"
    };

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(access_token_response)
      })
    );

    let headers = {};
    const baseURL = "https://test.com/";
    await authorize({
      app: { $cookies: Cookie() },
      $config: {
        baseURL
      },
      query: { code: "test_auth_code" },
      res: {
        setHeader: jest.fn((name, header) => {
          headers[name] = header;
        })
      }
    });

    expect(headers["Set-Cookie"]).toContain(
      "spotify_access_token=" +
        access_token_response.access_token +
        "; max-age=" +
        access_token_response.expires_in +
        "; Secure; HttpOnly"
    );

    expect(headers["Set-Cookie"]).toContain(
      "spotify_refresh_token=" +
        access_token_response.refresh_token +
        "; max-age=" +
        10 * 365 * 24 * 60 * 60 +
        "; Secure; HttpOnly"
    );
  });
});
