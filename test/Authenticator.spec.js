import Authenticator from "~/lib/Authenticator";
import Cookie from "cookie-universal";
import axios from "axios";

jest.mock("axios");

describe("tokenValidateAndRefresh Function tests", () => {
  afterEach(() => {
    let testCookies = Cookie();
    testCookies.removeAll();
  });

  it("should return authenticated=false without spotify token cookies", async () => {
    let authenticate = new Authenticator({
      cookies: Cookie()
    });

    expect(authenticate.isAuthenticated()).toStrictEqual(false);
  });

  it("should return authenticated=true with spotify_access_token cookie", async () => {
    let authenticate = new Authenticator({
      cookies: Cookie()
    });

    let testCookies = Cookie();
    testCookies.set("spotify_access_token", "test_access_token");

    expect(authenticate.isAuthenticated()).toStrictEqual(true);
  });

  it("should refresh access_token and set cookie when it has expired", async () => {
    const access_token_response = {
      status: 200,
      data: {
        access_token: "test_access_token",
        token_type: "Bearer",
        expires_in: 3600
      }
    };

    axios.get.mockResolvedValueOnce(access_token_response);

    let testCookies = Cookie();
    testCookies.orginalSetFunction = testCookies.set;
    testCookies.set = jest.fn((name, value, opts) => {
      if (opts) {
        opts.httpOnly = false;
        opts.secure = false;
      }
      testCookies.orginalSetFunction(name, value, opts);
    });
    testCookies.set("spotify_refresh_token", "test_refresh_token");

    let authenticate = new Authenticator({
      cookies: testCookies
    });

    await authenticate.attemptAccessTokenCookieRefresh();

    expect(testCookies.get("spotify_access_token")).toBe(
      access_token_response.data.access_token
    );
  });

  it("should not set access_token cookie if api response status is not 200", async () => {
    const access_token_response = {
      status: 400
    };

    axios.get.mockResolvedValueOnce(access_token_response);

    let testCookies = Cookie();
    testCookies.set("spotify_refresh_token", "test_refresh_token");

    let authenticate = new Authenticator({
      cookies: testCookies
    });

    authenticate.attemptAccessTokenCookieRefresh();

    expect(testCookies.get("spotify_access_token")).toBeFalsy();
  });
});
