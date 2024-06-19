import { Observable } from "rxjs";
import { UserProfile } from "../models/user-profile.interface";
import { UserDTO } from "../models/tokens.interface";

export interface UserActions{
    getAllUsers(): Observable<any>;
    getUserProfile(id: number): Observable<UserProfile>;
    createProject(projectData: any): Observable<any>;
    getUserComments(id: number): Observable <any>;
    getUserLikes(id: number): Observable <any>;
    getUserProjects(id: number): Observable <any>;
    removeUserCategory(userId: number, categoryId: number): Observable <any>;
    updateUser(userId: number): Observable <any>;
    editUser(user: UserDTO): Observable <any>;
    createUser(user: UserDTO): Observable <any>;
    deleteUser(userId: number): Observable <any>;
    getFavorites(userId: number): Observable <any>;
    addFavorite(userId: number, projectId: number): Observable <any>;
    removeFavorite(userId: number, projectId: number): Observable <any>;
    addLike(userId: number, projectId: number): Observable <any>;
    removeLike(userId: number, projectId: number): Observable <any>;
    removeComment(commentId: number): Observable <any>;
}