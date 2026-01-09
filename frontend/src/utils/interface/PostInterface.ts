// frontend/src/utils/interface/PostInterface.ts

export type PostAuthorDTO = {
    _id: string;
    username: string;
    firstname?: string;
    lastname?: string;
    avatarUrl?: string;
};

export type PostDataObject = {
    _id: string;
    author?: PostAuthorDTO;
    content: string;
    imageUrl?: string;
    createdAt: string;
    updatedAt: string;
};

// payloads
export type CreatePostObject = {
    content: string;
    imageUrl?: string;
};

export type UpdatePostObject = Partial<CreatePostObject>;
