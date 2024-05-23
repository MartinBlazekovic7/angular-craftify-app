import { Category } from './category.interface';
import { Complexity } from './complexity.interface';
import { UserData } from './user-data.interface';
import { Media } from './media.interface';

export interface Tutorial {
  rating: Float32Array;
  id: number;
  title: string;
  content: string;
  user: UserData;
  category: Category;
  complexity: Complexity;
  mediaList: Media;
}
