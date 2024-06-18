import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { NewsDTO, NewsDetail } from '../models/newsDetail.interface';

@Injectable({
  providedIn: 'root',
})
export class NewsDetailService {
  constructor(private http: HttpClient) {}

  getNewsDetailId(id: number) {
    return this.http.get<NewsDetail>(`${environment.apiUrl}/news/${id}`);
  }

  getAllNews() {
    return this.http.get<NewsDetail[]>(`${environment.apiUrl}/news/all`);
  }

  editNews(newsData: NewsDTO) {
    return this.http.put(`${environment.apiUrl}/news/${newsData.id}`, newsData);
  }

  deleteNews(id: number) {
    return this.http.delete(`${environment.apiUrl}/news/${id}`);
  }
}
