import ApiMiddlewareObject from "../api/index.js";
import request from "supertest";

describe("middleware for serverside requests to Google Cloud Datastore", () => {
  let app = ApiMiddlewareObject.handler;
  it("responds with status code 200", async () => {
    const response = await request(app).get("/api/test");
    expect(response.status).toEqual(200);
  });
});
