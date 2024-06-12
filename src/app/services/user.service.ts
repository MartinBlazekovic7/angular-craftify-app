/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Comment } from '../models/comment.interface';
import { LikeData } from '../models/like.interface';
import { Project } from '../models/project.interface';
import { UserProfile } from '../models/user-profile.interface';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/users/all`);
  }

  getUserProfile(id: number): Observable<any> {
    return this.http.get(`${environment.apiUrl}/users/${id}`);
  }

  createProject(projectData: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/project`, projectData);
  }

  getUserComments(id: number) {
    return this.http.get<Comment[]>(
      `${environment.apiUrl}/comments/byUserId/${id}`
    );
  }

  getUserLikes(id: number) {
    return this.http.get<LikeData[]>(`${environment.apiUrl}/users/liked/${id}`);
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

  createUser(user: UserProfile) {
    return this.http.post(`${environment.apiUrl}/users`, user);
  }

  deleteUser(userId: number) {
    return this.http.delete(`${environment.apiUrl}/users/${userId}`);
  }
}
