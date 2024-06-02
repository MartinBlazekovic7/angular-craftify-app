import { Project } from "./project.interface";

export interface LikeData {
    id: number;
    username: string;
    projects: Project[];
}