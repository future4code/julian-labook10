import {Request, Response} from "express"
import { GeneratorId } from "../services/GeneratorId"
import { UserDatabase } from "../data/UserDatabase"
import { HashManager } from "../services/HashManager"
import {Authenticator} from "../services/Authenticator"
import { PostsDatabase } from "../data/PostsDatabase"

export const createPostEndpoint = async (req: Request, res: Response): Promise<void> =>{
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

        console.log(postData)

        const postDb = new PostsDatabase()
        await postDb.create(
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
