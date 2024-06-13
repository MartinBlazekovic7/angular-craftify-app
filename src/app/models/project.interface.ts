import { Category } from './category.interface';
import { Comment } from './comment.interface';
import { Complexity } from './complexity.interface';
import { Media } from './media.interface';
import { UserData } from './user-data.interface';
import { UserProfile } from './user-profile.interface';

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
  userLikes: UserProfile[];
  projectFollowers: UserData[];
}

export interface ProjectDTO {
  id: number;
  title: string;
  description: string;
  content: string;
  categoryId: number;
  complexityId: number;
  mediaList: Media[];
}

export interface ProjectForm {
  userId: number;
  title: string;
  description: string;
  content: string;
  categoryId: number;
  complexityId: number;
  mediaList: Media[];
  commentIdList: number[];
  userLikesIdList: number[];
  favoriteProjectUserIdList: number[];
  projectFollowersIdList: number[];
}