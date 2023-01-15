export interface UploadInformation {
  id: string;
  public_id: string;
  name: string | null;
  file: string | null;
  fileType: string | null;
  url: string;
  postId: string | null;
  createdAt: Date;
  updatedAt: Date;
}
