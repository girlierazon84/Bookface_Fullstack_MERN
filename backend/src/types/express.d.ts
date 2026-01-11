// backend/src/types/express.d.ts

export { };

declare global {
    namespace Express {
        interface Request {
            user?: {
                id: string;
                username?: string;
            };
            file?: Multer.File;
            files?: Multer.File[];
        }
    }
}
