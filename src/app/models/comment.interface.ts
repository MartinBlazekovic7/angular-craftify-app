import { Project } from './project.interface';
import { UserProfile } from './user-profile.interface';

export interface Comment {
  id?: number;
  comment: string;
  user: UserProfile;
  commentTime: string;
  project?: Project;
}

export interface CommentDTO {
  comment: string;
  projectId: number;
  userId: number;
  parentCommentId?: number;
}
