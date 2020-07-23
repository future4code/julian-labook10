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
        const result = await friendsDb.checkFriendship(authenticationData.id, id)
        console.log(result)

        if(result[0]){
            throw new Error("essa amizade ja existe")
        }
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

        const validation = await friendsDb.checkFriendship(idToken, id)
        const validationSecond = await friendsDb.checkFriendship(id, idToken)

        if(!validation && !validationSecond){
            throw new Error("Voce não tem amizade com esta pessoa ;-;")
        }

        await friendsDb.deleteFriends(idToken, id)

        res.status(200).send("amizade desfeita...")
    } catch (error) {
        res.status(400).send({error: error.message})
    }
}