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
            .select("*")
            .from(FriendsDatabase.tableName)
            .where({
                id_friend_one: idFriendOne,
                id_friend_two: idFriendTwo
            })

            return result[0]
        } catch (error) {
            console.log(error)
        }
    }
    async allFriendsOne(idFriendOne: string): Promise<any>{
        try {
            const result = await this.getConnection()
            .select("id_friends_two")
            .from(FriendsDatabase.tableName)
            .where({
                id_friend_one: idFriendOne
            })

            return result[0]
        } catch (error) {
            console.log(error)
        }
    }


    async allFriendsTwo(idFriendTwo: string): Promise<any>{
        try {
            const result = await this.getConnection()
            .select("id_friend_one")
            .from(FriendsDatabase.tableName)
            .where({
                id_friend_two: idFriendTwo
            })

            return result[0]
        } catch (error) {
            console.log(error)
        }
    }
}