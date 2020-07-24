import {Request, Response} from "express"
import { GeneratorId } from "../services/GeneratorId"
import { HashManager } from "../services/HashManager"
import {Authenticator} from "../services/Authenticator"
import {FriendsBusiness} from "../business/FriendsBusiness"

export class FriendsController{
    async createFriendsEndpoint(req: Request, res: Response): Promise<void>{
        try {
            const token = req.headers.authorization as string
            const id = req.body.id
    
            const authenticator = new Authenticator()
            const authenticationData = authenticator.checkToken(token)
    
            const idToken = authenticationData.id 
    
            const friendsBusiness = new FriendsBusiness()
            const result = await friendsBusiness.checkFriendship(authenticationData.id, id)
    
            if(result[0]){
                throw new Error("essa amizade ja existe")
            }
            await friendsBusiness.create(idToken, id)
    
            res.status(200).send("amizade realizada")
    
        } catch (error) {
            res.status(400).send({error: error.message})
        }
    }
    
    async deleteFriendsEndpoint(req: Request, res: Response): Promise<void>{
        try {
            const token = req.headers.authorization as string
            const id = req.body.id
    
            const authenticator = new Authenticator()
            const authenticationData = authenticator.checkToken(token)
    
            const idToken = authenticationData.id 
    
            const friendsBusiness = new FriendsBusiness()
    
            const validation = await friendsBusiness.checkFriendship(idToken, id)
            const validationSecond = await friendsBusiness.checkFriendship(id, idToken)
    
            if(!validation && !validationSecond){
                throw new Error("Voce não tem amizade com esta pessoa ;-;")
            }
    
            await friendsBusiness.deleteFriends(idToken, id)
    
            res.status(200).send("amizade desfeita...")
        } catch (error) {
            res.status(400).send({error: error.message})
        }
    }
}