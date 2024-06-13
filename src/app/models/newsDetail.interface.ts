import { Category } from './category.interface';
import { Media } from './media.interface';
import { UserData } from './user-data.interface';

export interface NewsDetail {
  id: number;
  title: string;
  description: string;
  content: string;
  user: UserData;
  mediaList: Media[];
  category?: Category;
  imageUrl?: string;
}

export interface NewsDTO {
  id: number;
  title: string;
  content: string;
  categoryDTO: Category;
  imageUrl: string;
}
