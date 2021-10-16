import express from "express";
import { Datastore } from "@google-cloud/datastore";

const app = express();

app.use(express.json());

/**
 * logic for our api will go here
 */
export default {
  path: "/api",
  handler: app
};

app.get("/api/test", async (req, res) => {
  res.status(200);
  res.end();
});

app.post("/access_token", async (req, res) => {
  let datastore = new Datastore({
    projectId: "decent-line-328815",
    keyFilename: "ext_config/decent-line-328815-ec89f13a00e0.json"
  });
  const kind = "spotify_access_token";

  // The name/ID for the new entity
  const name = "sampletask1";

  // The Cloud Datastore key for the new entity
  const taskKey = datastore.key([kind, name]);

  // Prepares the new entity
  const task = {
    key: taskKey,
    data: {
      description: "Buy milk"
    }
  };

  // Saves the entity
  //await datastore.save(task);
  //console.log(`Saved ${task.key.name}: ${task.data.description}`);
  res.send("Hello World");
});
