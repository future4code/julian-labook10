import { BaseDatabase } from "./BaseDatabase";

export class PostsDatabase extends BaseDatabase{
    private static tableName = "LaBookPosts"

    async create(
        id: string, 
        photo: string,
        type: string,
        description: string,
        id_user: string 
        ): Promise<void>{
            
            try {
                await this.getConnection().raw(`
                    INSERT INTO LaBookPosts (id, photo, description, type, id_user)
                    VALUES ("${id}", "${photo}", "${description}", "${type}", "${id_user}")
                `)
            } catch (error) {
                throw new Error(error)
            }
    }
}