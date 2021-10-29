import express, { urlencoded } from "express";
import { Datastore } from "@google-cloud/datastore";
import axios from "axios";
import spotifyConfig from "../ext_config/spotify.config";
import cookieParser from "cookie-parser";
import accessToken from "./routes/access_token";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(accessToken);

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "bu7be.sse.codesandbox.io"); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

export default {
  path: "/api",
  handler: app
};

app.post("/music_session", async (req, res) => {
  let datastore = new Datastore({
    projectId: "decent-line-328815",
    keyFilename: "ext_config/decent-line-328815-995cf814fd9b.json"
  });
  const kind = "music_session";

  // The Cloud Datastore key for the new entity
  const taskKey = datastore.key(kind);

  // Prepares the new entity
  const music_session = {
    key: taskKey,
    data: {
      waitTime: req.body.waitTime,
      created_at: new Date()
    }
  };

  // Saves the entity
  await datastore.save(music_session);

  //send music_session_id to httponly cookie

  res.end();
});

app.post("/access_token", async (req, res) => {
  //get music_session_id from httponly cookie
  //send access_token and refresh token to music_session in datastore

  let datastore = new Datastore({
    projectId: "decent-line-328815",
    keyFilename: "ext_config/decent-line-328815-995cf814fd9b.json"
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
