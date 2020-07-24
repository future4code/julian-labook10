import {Request, Response} from "express"
import { GeneratorId } from "../services/GeneratorId"
import { HashManager } from "../services/HashManager"
import {Authenticator} from "../services/Authenticator"
import {PostsBusiness} from "../business/PostsBusiness"

export class PostsController{
    async createPostEndpoint(req: Request, res: Response): Promise<void>{
        try {
            const generatorId = new GeneratorId()
            const id = generatorId.generate()
    
            const token = req.headers.authorization as string
    
            const authenticator = new Authenticator()
            const authentication = authenticator.checkToken(token)
    
            const postData = {
                id: id,
                photo: req.body.photo,
                description: req.body.description,
                type: req.body.type,
                id_user: authentication.id
            }
    
            const postsBusiness = new PostsBusiness()
            await postsBusiness.create(
                postData.id, 
                postData.photo,
                postData.type,
                postData.description,
                postData.id_user
                )
    
            res.status(200).send("Post criado com sucesso!")
        } catch (error) {
            res.status(400).send({error: error.message})
        }
    } 
    
    async feedPostsEndpoint(req: Request, res: Response): Promise<void>{
        try {   
            const token = req.headers.authorization as string
    
            const authenticator = new Authenticator()
            const authentication = authenticator.checkToken(token)
    
            const postsBusiness = new PostsBusiness()
            const feedPosts = await postsBusiness.feedPosts(authentication.id)
    
            res.status(200).send(feedPosts)
        } catch (error) {
            res.status(400).send({error: error.message})
        }
    }
    
    async feedFilterByTypeEndpoint(req: Request, res: Response): Promise<void>{
        try {
            const type = req.params.type as string
            const token = req.headers.authorization as string
            const authenticator = new Authenticator()
            const authentication = authenticator.checkToken(token)
    
            const postsBusiness = new PostsBusiness()
            const feedFilterData = await postsBusiness.feedFilter(authentication.id, type)
    
            res.status(200).send(feedFilterData)
        } catch (error) {
            res.status(400).send({error: error.message})
        }
    }
}