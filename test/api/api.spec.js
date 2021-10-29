import ApiMiddlewareObject from "~/api/index.js";
import request from "supertest";
import axios from "axios";

jest.mock("axios");

describe("middleware for serverside requests to Google Cloud Datastore", () => {
  it("should return access_token when a refresh_token is provided", async () => {
    const testSpotifyResponse = {
      data: {
        access_token: "NgA6ZcYI...ixn8bUQ",
        token_type: "Bearer",
        expires_in: 3600
      }
    };

    axios.mockResolvedValue(testSpotifyResponse);
    const app = ApiMiddlewareObject.handler;
    await request(app)
      .get("/access_token")
      .set("Accept", "application/json")
      .expect(200)
      .expect("Content-Type", /json/)
      .expect(testSpotifyResponse.data);
  });
});
