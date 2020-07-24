import {PostsDatabase} from "../data/PostsDatabase"

export class PostsBusiness {
    private postsDatabase = new PostsDatabase()

    public async create(
        id: string, 
        photo: string,
        type: string,
        description: string,
        id_user: string ){
            await this.postsDatabase.create(id, photo, type, description, id_user)
        }

    public async feedPosts(id: string){
        return await this.postsDatabase.feedPosts(id)
    }

    public async feedFilter(id: string, type: string){
        return await this.postsDatabase.feedFilter(id, type)
    }
}