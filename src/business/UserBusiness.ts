import {UserDatabase} from "../data/UserDatabase"

export class UserBusiness{
    private userDatabase = new UserDatabase()

    public async create(
        id:string, 
        name:string, 
        email: string, 
        password: string
    ){
        await this.userDatabase.create(id, name, email, password)
    }

    public async getByEmail(
        email:string
    ){
        return await this.userDatabase.getByEmail(email)
    }
}