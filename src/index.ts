import dotenv from "dotenv"
import { AddressInfo } from "net";
import express from "express"
import {userRouter} from "../src/router/UserRouter"
import {friendsRouter} from "../src/router/FriendsRouter"
import {postsRouter} from "../src/router/PostsRouter"
import cors from "cors" 


// 



dotenv.config();

export const app = express()


app.use(cors({ origin: true})) 
app.use(express.json()) 

app.use(express.json())

app.use("/user", userRouter)

app.use("/friends", friendsRouter)

app.use("/post", postsRouter)

const server = app.listen(process.env.PORT || 3003, () => {
    if (server) {
      const address = server.address() as AddressInfo;
      console.log(`Server is running in http://localhost:${address.port}`);
      }else {
      console.error(`Failure upon starting server.`);
      }
});

