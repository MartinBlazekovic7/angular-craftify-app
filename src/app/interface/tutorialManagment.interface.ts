import { Observable } from "rxjs";
import { TutorialDTO } from "../models/tutorial.interface";

export interface TutorialManagmentService{
    edit_Tutorial(tutorialData: TutorialDTO):Observable<any>;
    delete_Tutorial(id: number):Observable<any>;
}