import { Category } from './category.interface';
import { Complexity } from './complexity.interface';
import { UserData } from './user-data.interface';
import { Media } from './media.interface';

export interface Tutorial {
  id: number;
  title: string;
  content: string;
  user: UserData;
  category: Category;
  complexity: Complexity;
  mediaList: Media;
  description: string;
}
