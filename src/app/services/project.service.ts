/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Project } from '../models/project.interface';
import { FilterInterface } from '../models/filter.interface';
import { Observable } from 'rxjs';

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

  submitProject(projectData: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/project`, projectData);
  }

  editProject(projectData: any): Observable<any> {
    return this.http.put(
      `${environment.apiUrl}/project/${projectData.id}`,
      projectData
    );
  }

  deleteProject(id: number) {
    return this.http.delete(`${environment.apiUrl}/project/${id}`);
  }
}
