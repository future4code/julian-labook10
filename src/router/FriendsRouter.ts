import express from "express"
import {FriendsController} from "../controller/FriendsController"

export const friendsRouter = express.Router()

const friendsController = new FriendsController()

friendsRouter.post("/create", friendsController.createFriendsEndpoint)

friendsRouter.delete("/delete", friendsController.deleteFriendsEndpoint)