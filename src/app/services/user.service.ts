import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";
import { Comment } from "../models/comment.interface";
import { LikeData } from "../models/like.interface";
import { Project } from "../models/project.interface";

@Injectable({
    providedIn:'root'
})

export class userService {
    constructor(private http: HttpClient){}

    getUserProfile(id:number): Observable<any>{
        return this.http.get(`${environment.apiUrl}/users/${id}`);
    }

    createProject(projectData: any) : Observable<any>{
        return this.http.post(`${environment.apiUrl}/project`, projectData);
    }

    getUserComments(id:number){
        return this.http.get<Comment[]>(`${environment.apiUrl}/comments/byUserId/${id}`)
    }

    getUserLikes(id:number){
        return this.http.get<LikeData[]>(`${environment.apiUrl}/users/liked/${id}`)
    }

    getUserProjects(id:number){
        return this.http.get<Project[]>(`${environment.apiUrl}/users/projects/${id}`)
    }
    
    removeUserCategory(userId:number, categoryId: number){
        return this.http.delete(`${environment.apiUrl}/category/${categoryId}/user/${userId}`)
    }
}