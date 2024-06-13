/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Project, ProjectForm } from '../models/project.interface';
import { FilterInterface } from '../models/filter.interface';
import { Observable } from 'rxjs';
import { CommentDTO } from '../models/comment.interface';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  constructor(private http: HttpClient) {}

  getProjectById(id: number) {
    return this.http.get<Project>(`${environment.apiUrl}/project/${id}`);
  }

  getAllProjects() {
    return this.http.get<Project[]>(`${environment.apiUrl}/project/all`);
  }

  getFilteredProjets(filter: FilterInterface) {
    return this.http.post<Project[]>(
      `${environment.apiUrl}/project/filter`,
      filter
    );
  }

  submitProject(project: ProjectForm): Observable<any> {
    return this.http.post(`${environment.apiUrl}/project`, project);
  }

  editProject(projectData: any): Observable<any> {
    return this.http.put(
      `${environment.apiUrl}/project/${projectData.id}`,
      projectData
    );
  }

  addComment(commentData: CommentDTO): Observable<any> {
    return this.http.post(`${environment.apiUrl}/comments`, commentData);
  }

  deleteProject(id: number) {
    return this.http.delete(`${environment.apiUrl}/project/${id}`);
  }
}
