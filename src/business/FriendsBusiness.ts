import {FriendsDatabase} from "../data/FriendsDatabase"

export class FriendsBusiness{
    private friendsDatabase = new FriendsDatabase()

    public async create(idFriendOne:string, idFriendTwo: string){
        await this.friendsDatabase.create(idFriendOne, idFriendTwo)
    }

    public async deleteFriends(idFriendOne:string, idFriendTwo: string){
        await this.friendsDatabase.deleteFriends(idFriendOne, idFriendTwo)
    }

    public async checkFriendship(idFriendOne: string, idFriendTwo: string){
        return await this.friendsDatabase.checkFriendship(idFriendOne, idFriendTwo)
    }
}