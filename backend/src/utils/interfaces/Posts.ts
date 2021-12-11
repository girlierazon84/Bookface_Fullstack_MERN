export interface CreatePost {
    content: string;
    likes: object[];
    author: object;
    timestamp: Date;
    photo: string;
}