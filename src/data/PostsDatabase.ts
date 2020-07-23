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

    async feedPosts(id: string): Promise<any> {
        try {
            const result = await this.getConnection().raw(`
            SELECT p.id,p.description,p.photo,p.create_date,p.id_user, p.type
            FROM LaBookPosts as p
            JOIN LaBookUser as u
            ON p.id_user = u.id
            JOIN LaBookFriends as f
            ON p.id_user = f.id_friend_two
            OR p.id_user = f.id_friend_one
            WHERE (f.id_friend_one = "${id}" OR f.id_friend_two = "${id}") AND p.id_user <> "${id}" 
            ORDER BY create_date DESC;
        `)
        return result[0]

        } catch (error) {
            console.log(error)
        }
    }

    async feedFilter(id: string, type: string): Promise<any> {
        try {
            const result = await this.getConnection().raw(`
            SELECT p.id,p.description,p.photo,p.create_date,p.id_user, p.type
            FROM LaBookPosts as p
            JOIN LaBookUser as u
            ON p.id_user = u.id
            JOIN LaBookFriends as f
            ON p.id_user = f.id_friend_two
            OR p.id_user = f.id_friend_one
            WHERE (f.id_friend_one = "${id}" OR f.id_friend_two = "${id}") AND p.id_user <> "${id}" AND p.type = "${type}"
            ORDER BY create_date DESC;
        `)
        return result[0]

        } catch (error) {
            console.log(error)
        }
    }
}