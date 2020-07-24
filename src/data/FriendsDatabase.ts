import { BaseDatabase } from "./BaseDatabase";

export class FriendsDatabase extends BaseDatabase{
    private static tableName = "LaBookFriends"

    async create(idFriendOne:string, idFriendTwo: string): Promise<any> {
        try {
            await this.getConnection()
            .insert({
                id_friend_one: idFriendOne,
                id_friend_two: idFriendTwo
            })
            .into(FriendsDatabase.tableName)


        } catch (error) {
            console.log(error)
        }
    }

    async deleteFriends(idFriendOne:string, idFriendTwo: string): Promise<void>{
        try {
            await this.getConnection()
            .delete()
            .from(FriendsDatabase.tableName)
            .where({
                id_friend_one: idFriendOne,
                id_friend_two: idFriendTwo
            })
        } catch (error) {
            console.log(error)
        }
    }

    async checkFriendship(idFriendOne: string, idFriendTwo: string): Promise<any>{
        try {
            const result = await this.getConnection()
            .raw(`
            SELECT * 
            FROM LaBookFriends as f
            WHERE (f.id_friend_one = "${idFriendOne}" AND f.id_friend_two = "${idFriendTwo}")
            OR  (f.id_friend_two = "${idFriendOne}" AND f.id_friend_one = "${idFriendTwo}");
            `)
            return result[0]
        } catch (error) {
            console.log(error)
        }
    }
}
