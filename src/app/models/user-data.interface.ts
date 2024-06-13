import { Category } from "./category.interface";
import { Comment } from "./comment.interface";
import { Media } from "./media.interface";
import { Project } from "./project.interface";

export interface UserData {
    id: number;
    name: string;
    username: string;
    projects: Project[];
    category: Category[];
    media: Media[];
    comments: Comment[];
    likes: UserData[];
    
}