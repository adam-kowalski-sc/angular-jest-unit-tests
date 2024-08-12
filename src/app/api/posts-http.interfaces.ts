export interface PostDto {
  title: string;
  content: string;
  id: number;
  userId: number;
}

export interface PostCreationDto {
  title: string;
  content: string;
  userId: number;
}
