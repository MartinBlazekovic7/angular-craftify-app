import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { NewsDetailService } from '../../services/newsDetail.service';
import { NewsDetail } from '../../models/newsDetail.interface';

@Component({
  selector: 'app-news-detail',
  standalone: true,
  imports: [],
  templateUrl: './news-detail.component.html',
  styleUrl: './news-detail.component.scss'
})
export class NewsDetailComponent implements OnInit, OnDestroy{
  subscription?: Subscription;

  newsDetail?: NewsDetail;

  newsDetailId?: number;

  constructor(
    private newsDetailService: NewsDetailService,
    private route: ActivatedRoute,
    private router: Router,
  ){}

  ngOnInit(): void {
      this.getNewsDetailId();
      this.getNewsDetail();
  }

  getNewsDetailId(): void{
    this.subscription = this.route.params.subscribe((params) => {
      this.newsDetailId = params['id'];
    });
  }

  getNewsDetail(): void{
    if (!this.newsDetailId){
      return;
    }
    this.subscription = this.newsDetailService
      .getNewsDetailId(this.newsDetailId)
      .subscribe({
        next: (newsDetail: NewsDetail) => {
          this.newsDetail = newsDetail;
        },
        error: () => {
          this.router.navigate(['/']);
        },
      });
  }

  ngOnDestroy(): void {
      this.subscription?.unsubscribe();
  }

}
