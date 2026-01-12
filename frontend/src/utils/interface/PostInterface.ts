// frontend/src/utils/interface/PostInterface.ts

export type PostAuthorDTO = {
    _id: string;
    username: string;
    firstname?: string;
    lastname?: string;
    avatarUrl?: string;
};

export type PostMediaType = "image" | "video";

export type PostMediaDTO = {
    url: string;
    publicId: string;
    type: PostMediaType;
    mime?: string;
    width?: number;
    height?: number;
    duration?: number;
};

export type PostDataObject = {
    _id: string;
    author?: PostAuthorDTO;
    content: string;

    // legacy fallback
    imageUrl?: string;

    // new
    media?: PostMediaDTO[];

    createdAt: string;
    updatedAt: string;
};

// payloads
export type CreatePostObject = {
    content: string;
    files?: File[]; // ✅ allow multipart create
};

export type UpdatePostObject = Partial<Pick<CreatePostObject, "content">>;
