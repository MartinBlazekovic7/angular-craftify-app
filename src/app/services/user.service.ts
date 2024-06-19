/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Comment } from '../models/comment.interface';
import { Project } from '../models/project.interface';
import { UserProfile } from '../models/user-profile.interface';
import { UserDTO } from '../models/tokens.interface';
import { UserActions } from '../interface/user.action.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService implements UserActions{
  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/users/all`);
  }

  getUserProfile(id: number): Observable<UserProfile> {
    return this.http.get<UserProfile>(`${environment.apiUrl}/users/${id}`);
  }

  createProject(projectData: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/project`, projectData);
  }

  getUserComments(id: number) {
    return this.http.get<Comment[]>(
      `${environment.apiUrl}/users/comments/${id}`
    );
  }

  getUserLikes(id: number) {
    return this.http.get<Project[]>(`${environment.apiUrl}/users/liked/${id}`);
  }

  getUserProjects(id: number) {
    return this.http.get<Project[]>(
      `${environment.apiUrl}/users/projects/${id}`
    );
  }

  removeUserCategory(userId: number, categoryId: number) {
    return this.http.delete(
      `${environment.apiUrl}/category/${categoryId}/user/${userId}`
    );
  }

  updateUser(userId: number) {
    return this.http.put(`${environment.apiUrl}/users/${userId}`, userId);
  }

  editUser(user: UserDTO) {
    return this.http.put(`${environment.apiUrl}/users/${user.id}`, user);
  }

  createUser(user: UserDTO) {
    return this.http.post(`${environment.apiUrl}/users`, user);
  }

  deleteUser(userId: number) {
    return this.http.delete(`${environment.apiUrl}/users/${userId}`);
  }

  getFavorites(userId: number) {
    return this.http.get<Project[]>(
      `${environment.apiUrl}/users/favorite/${userId}`
    );
  }

  addFavorite(userId: number, projectId: number) {
    return this.http.post(
      `${environment.apiUrl}/users/${userId}/addFavorite/${projectId}`,
      {}
    );
  }

  removeFavorite(userId: number, projectId: number) {
    return this.http.delete(
      `${environment.apiUrl}/users/${userId}/removeFavorite/${projectId}`,
      {}
    );
  }

  addLike(userId: number, projectId: number) {
    return this.http.post(
      `${environment.apiUrl}/users/${userId}/like/${projectId}`,
      {}
    );
  }

  removeLike(userId: number, projectId: number) {
    return this.http.delete(
      `${environment.apiUrl}/users/${userId}/dislike/${projectId}`
    );
  }

  removeComment(commentId: number) {
    return this.http.delete(`${environment.apiUrl}/comments/${commentId}`);
  }
}
