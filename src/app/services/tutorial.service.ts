import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Tutorial, TutorialDTO } from '../models/tutorial.interface';
import { Observable } from 'rxjs';
import { GetAllTutorialsService } from '../interface/getAllTutorials.interface';
import { TutorialManagmentService } from '../interface/tutorialManagment.interface';

@Injectable({
  providedIn: 'root',
})


export class TutorialService implements GetAllTutorialsService, TutorialManagmentService{
  constructor(private http: HttpClient) {}

  getTutorialById(id: number) {
    return this.http.get<Tutorial>(`${environment.apiUrl}/tutorial/${id}`);
  }

  getAll_Tutorials(): Observable<Tutorial[]> {
    return this.http.get<Tutorial[]>(`${environment.apiUrl}/tutorial/all`);
  }

  edit_Tutorial(tutorialData: TutorialDTO) {
    return this.http.put(
      `${environment.apiUrl}/tutorial/${tutorialData.id}`,
      tutorialData
    );
  }

  delete_Tutorial(id: number) {
    return this.http.delete(`${environment.apiUrl}/tutorial/${id}`);
  }
}
