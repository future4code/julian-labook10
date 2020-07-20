import { BaseDatabase } from "./BaseDatabase";

export class UserDatabase extends BaseDatabase{
    private tableName = "LaBookUser"

    create = async (
        id:string, 
        name:string, 
        email: string, 
        password: string
        ): Promise<void> =>{
            try {
                await this.getConnection().insert({
                    id, 
                    name, 
                    email, 
                    password
                }).into(this.tableName)

            } catch (error) {
                throw new Error(
                    error.message
                )
            }
        }

    getByEmail = async (email: string): Promise<any> =>{
        const result = await this.getConnection()
        .select("*")
        .from(this.tableName)
        .where({
            email
        })
        return result[0]

    }
}