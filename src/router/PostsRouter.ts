import express from "express"
import {PostsController} from "../controller/PostsController"

export const postsRouter = express.Router()

const postsController = new PostsController()


postsRouter.post("/createPost", postsController.createPostEndpoint)

postsRouter.get("/feed", postsController.feedPostsEndpoint)

postsRouter.get("/feedFilter/:type", postsController.feedFilterByTypeEndpoint)