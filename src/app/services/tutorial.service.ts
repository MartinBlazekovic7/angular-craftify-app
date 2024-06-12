import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Tutorial, TutorialDTO } from '../models/tutorial.interface';

@Injectable({
  providedIn: 'root',
})
export class TutorialService {
  constructor(private http: HttpClient) {}

  getTutorialById(id: number) {
    return this.http.get<Tutorial>(`${environment.apiUrl}/tutorial/${id}`);
  }

  getAllTutorials() {
    return this.http.get<Tutorial[]>(`${environment.apiUrl}/tutorial/all`);
  }

  editTutorial(tutorialData: TutorialDTO) {
    return this.http.put(
      `${environment.apiUrl}/tutorial/${tutorialData.id}`,
      tutorialData
    );
  }

  deleteTutorial(id: number) {
    return this.http.delete(`${environment.apiUrl}/tutorial/${id}`);
  }
}
