import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { NewsDetail } from '../../models/newsDetail.interface';
import { NewsDetailService } from '../../services/newsDetail.service';

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './news.component.html',
  styleUrl: './news.component.scss',
})
export class NewsComponent implements OnInit, OnDestroy{
  subscription?: Subscription;
  searchTerm: string = '';
  newsDetail?: NewsDetail[] = [];

  constructor(private newsDetailService: NewsDetailService){}

  ngOnInit(): void {
      this.getNews();
  }

  getNews(): void{
    this.subscription = this.newsDetailService.getAllNews().subscribe({
      next: (news: NewsDetail[]) =>{
        this.newsDetail = news;
        console.log(this.newsDetail);
      },
      error: () => {
        this.newsDetail = [];
      },
    });
  }

  ngOnDestroy(): void {
      this.subscription?.unsubscribe();
  }

}
