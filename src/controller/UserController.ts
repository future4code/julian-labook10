import {Request, Response} from "express"
import { GeneratorId } from "../services/GeneratorId"
import { HashManager } from "../services/HashManager"
import {Authenticator} from "../services/Authenticator"
import {UserBusiness} from "../business/UserBusiness"

export class UserController {

     async createEndpoint (req: Request, res: Response): Promise<void>{
        
        try {
            const generatorId = new GeneratorId()
            const id = generatorId.generate()
    
            const authenticator = new Authenticator()
            const token = authenticator.generateToken({id})
    
            const hashManager = new HashManager()
            const hashPassword = await hashManager.hash(req.body.password)
    
            const user = {
                id: id,
                name: req.body.name,
                email: req.body.email,
                password: hashPassword
            }

            const userBusiness = new UserBusiness()
            await userBusiness.create(
                user.id,
                user.name,
                user.email,
                user.password
            )
            
            
            res.status(200).send({token: token})
    
        } catch (error) {
            res.status(400).send(error)
        }
    }
    
    async loginEndpoint(req: Request, res: Response):Promise<any>{
        try {
            const email = req.body.email
            const password = req.body.password
    
            const userBusiness = new UserBusiness()
            const user = await userBusiness.getByEmail(email)
    
            const hashManager = new HashManager()
            const passwordIsCorrect = hashManager.compare(password, user.password)
    
            if(!passwordIsCorrect){
                throw new Error("Invalid Password")
            }
    
            const authenticator = new Authenticator()
            const token = authenticator.generateToken({id: user.id})
    
            res.status(200).send({token: token})
    
        } catch (error) {
            res.status(400).send(error)
        }
    }
}