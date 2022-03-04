import { Post } from "../@types";
import Service from "../Service";
import generateQueryString from "../utils/generateQueryString";

class PostService extends Service {

    static getAllPosts(search: Post.Query) {

        const queryString = generateQueryString(search)
        //console.log(queryString) // Mostra a queryString

        return this.Http
            .get<Post.Paginated>('/posts'.concat(queryString)) // concatena a uri posts com a queryString
            //.then(res => res.data)
            .then(this.getData) // Simplificacao da linha anterior
    }


    static getExistingPost(id: number) {
        return this.Http
            .get<Post.Detailed>(`/posts/${id}`)
            //.then(res => res.data)
            .then(this.getData)  // Simplificacao da linha anterior
    }

    
    static insertNewPost(post: Post.Input) {

        //console.log('Servico InsertNewPost => post.tags: ', post.tags)

        return this.Http
            .post<Post.Detailed>('/posts', post)
            .then(this.getData)
    }


    static publishExistingPost(postId: number) {
        return this.Http
            .put<{}>(`/posts/${postId}/publishing`)
            .then(this.getData)
    }


    static updateExistingPost(postId: number, post: Post.Input) {

        //console.log('Servico UpdateExistingPost => post.tags: ', post.tags)

        return this.Http
            .put<Post.Detailed>(`/posts/${postId}`, post)
            .then(this.getData)
    }


} 

export default PostService
