import dotenv from "dotenv"
import { AddressInfo } from "net";
import express from "express"
import {createEndpoint, loginEndpoint} from "../src/endpoints/Users"
import {createFriendsEndpoint, deleteFriendsEndpoint} from "../src/endpoints/Friends"
import {createPostEndpoint, feedPostsEndpoint, feedFilterByTypeEndpoint} from "../src/endpoints/Posts"

dotenv.config();

const app = express()

app.use(express.json())

app.post("/signup", createEndpoint)

app.post("/login", loginEndpoint)

app.post("/friends", createFriendsEndpoint)

app.delete("/deletefriend", deleteFriendsEndpoint)

app.post("/createPost", createPostEndpoint)

app.get("/feed", feedPostsEndpoint)

app.get("/feedFilter/:type", feedFilterByTypeEndpoint)

const server = app.listen(process.env.PORT || 3003, () => {
    if (server) {
      const address = server.address() as AddressInfo;
      console.log(`Server is running in http://localhost:${address.port}`);
      }else {
      console.error(`Failure upon starting server.`);
      }
});

