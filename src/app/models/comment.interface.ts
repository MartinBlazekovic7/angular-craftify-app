import { Project } from './project.interface';
import { UserData } from './user-data.interface';

export interface Comment {
  id: number;
  comment: string;
  user: UserData;
  commentTime: string;
  project?: Project;
}
