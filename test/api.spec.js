import ApiMiddlewareObject from "../api/index.js";
import request from "supertest";
import axios from "axios";

jest.mock("axios");

describe("middleware for serverside requests to Google Cloud Datastore", () => {
  let app = ApiMiddlewareObject.handler;
  it("responds with status code 200", async () => {
    const response = await request(app).get("/api/test");
    expect(response.status).toEqual(200);
  });

  it("should return access_token when a refresh_token is provided", async () => {
    const testSpotifyResponse = {
      data: {
        access_token: "NgA6ZcYI...ixn8bUQ",
        token_type: "Bearer",
        expires_in: 3600
      }
    };

    axios.mockResolvedValue(testSpotifyResponse);

    await request(app)
      .get("/access_token")
      .set("Accept", "application/json")
      .expect(200)
      .expect("Content-Type", /json/)
      .expect(testSpotifyResponse.data);
  });
});
