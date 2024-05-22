import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { NewsDetail

 } from "../models/newsDetal.interface";
@Injectable({
    providedIn: 'root',
})
export class NewsDetailService{
    constructor(private http: HttpClient){}

    getNewsDetailId(id:number){
        return this.http.get<NewsDetail>(`${environment.apiUrl}/project/${id}`);
    }
}