import { Observable } from "rxjs";
import { Tutorial } from "../models/tutorial.interface";

export interface GetAllTutorialsService{
    getAll_Tutorials(): Observable<Tutorial[]>;
}