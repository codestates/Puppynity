declare namespace Express {
  export interface Request {
    newAccessToken?: string | undefined;
    userId?: number | undefined;
    userEmail?: string | undefined;
    uploadImageName?: string | undefined;
  }
}
