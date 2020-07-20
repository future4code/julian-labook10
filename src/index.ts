import dotenv from "dotenv"
import { AddressInfo } from "net";
import express from "express"
import {createEndpoint, loginEndpoint} from "../src/endpoints/Users"

dotenv.config();

const app = express()

app.use(express.json())

app.post("/signup", createEndpoint)

app.post("/login", loginEndpoint)

const server = app.listen(process.env.PORT || 3003, () => {
    if (server) {
      const address = server.address() as AddressInfo;
      console.log(`Server is running in http://localhost:${address.port}`);
      }else {
      console.error(`Failure upon starting server.`);
      }
});

