import authenticate from "../middleware/authenticate";
import Cookie from "cookie-universal";
import { Router } from "express";

describe("authenticate middleware tests", () => {
  afterEach(() => {
    let testCookies = Cookie();
    testCookies.removeAll();
  });

  it("should not set authenticated to true without spotify token cookies", async () => {
    let testConfig = {};
    await authenticate({
      app: {
        $cookies: Cookie()
      },
      $config: testConfig
    });

    expect(testConfig.authenticated).toBeFalsy();
  });

  it("should set authenticated to true with spotify_access_token cookie", async () => {
    let testCookies = Cookie();
    testCookies.set("spotify_access_token", "test_access_token");
    let testConfig = {};

    await authenticate({
      app: {
        $cookies: testCookies
      },
      $config: testConfig
    });

    expect(testConfig.authenticated).toBeTruthy();
  });

  it("should refresh access_token it has expired", async () => {
    const access_token_response = {
      access_token: "test_access_token",
      token_type: "Bearer",
      expires_in: 3600
    };

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(access_token_response)
      })
    );

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

    let testConfig = {};

    await authenticate({
      app: {
        $cookies: testCookies,
        router: { app: { refresh: jest.fn() } }
      },
      $config: testConfig,
      req: { headers: { cookie: {} } }
    });

    expect(testCookies.get("spotify_access_token")).toBe(
      access_token_response.access_token
    );
  });
});
