import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { Tutorial} from "../models/tutorial.interface";

@Injectable({
    providedIn: 'root',
})
export class TutorialService{
    constructor(private http: HttpClient){}

    getTutorialById(id:number){
        return this.http.get<Tutorial>(`${environment.apiUrl}/project/${id}`);
    }
}