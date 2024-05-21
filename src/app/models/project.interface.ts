import { Category } from './category.interface';
import { Comment } from './comment.interface';
import { Complexity } from './complexity.interface';
import { Media } from './media.interface';
import { UserData } from './user-data.interface';

export interface Project {
  id: number;
  title: string;
  description: string;
  content: string;
  user: UserData;
  category: Category;
  complexity: Complexity;
  mediaList: Media[];
  comments: Comment[];
  userLikes: UserData[];
  projectFollowers: UserData[];
}
