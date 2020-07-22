import {Request, Response} from "express"
import { GeneratorId } from "../services/GeneratorId"
import { UserDatabase } from "../data/UserDatabase"
import { HashManager } from "../services/HashManager"
import {Authenticator} from "../services/Authenticator"
import { FriendsDatabase } from "../data/FriendsDatabase"

export const createFriendsEndpoint = async (req: Request, res: Response): Promise<void> =>{
    try {
        const token = req.headers.authorization as string
        const id = req.body.id

        const authenticator = new Authenticator()
        const authenticationData = authenticator.checkToken(token)

        const idToken = authenticationData.id 

        const friendsDb = new FriendsDatabase()
        await friendsDb.create(idToken, id)

        res.status(200).send("amizade realizada")
    } catch (error) {
        res.status(400).send({error: error.message})
    }
}

export const deleteFriendsEndpoint = async (req: Request, res: Response): Promise<void> => {
    try {
        const token = req.headers.authorization as string
        const id = req.body.id

        const authenticator = new Authenticator()
        const authenticationData = authenticator.checkToken(token)

        const idToken = authenticationData.id 

        const friendsDb = new FriendsDatabase()

        const validation = await friendsDb.buscarFriends(idToken, id)
        const validationSecond = await friendsDb.buscarFriends(id, idToken)

        if(!validation && !validationSecond){
            throw new Error("Voce não tem amizade com esta pessoa ;-;")
        }

        await friendsDb.deleteFriends(idToken, id)

        res.status(200).send("amizade desfeita...")
    } catch (error) {
        res.status(400).send({error: error.message})
    }
}