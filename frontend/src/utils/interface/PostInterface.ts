// frontend/src/utils/interface/PostInterface.ts

export interface CreatePostObject {
    author: string;
    title: string;
    content: string;
}

export interface PostDataObject extends CreatePostObject {
    _id: string;
    createdAt?: string;
    updatedAt?: string;
}
