import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Tutorial } from '../../models/tutorial.interface';
import { TranslateModule } from '@ngx-translate/core';
import { GetAllTutorialsService } from '../../interface/getAllTutorials.interface';
import { TutorialService } from '../../services/tutorial.service';

@Component({
  selector: 'app-tutorials',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslateModule],
  templateUrl: './tutorials.component.html',
  styleUrl: './tutorials.component.scss',
})
export class TutorialsComponent implements OnInit, OnDestroy{
  searchTerm: string = '';

  subscription?: Subscription

  tutorials?: Tutorial[] = [];

  constructor(@Inject(TutorialService) private tutorialsService: GetAllTutorialsService, private router: Router){}


  ngOnInit(): void {
      this.getTutorials();
  }

  getTutorials(): void{
    this.subscription = this.tutorialsService.getAll_Tutorials().subscribe({
      next: (tutorials: Tutorial[]) =>{
        this.tutorials = tutorials;
        console.log(this.tutorials);
      },
      error: () => {
        this.tutorials
      },
    });
  }

  ngOnDestroy(): void {
      this.subscription?.unsubscribe();
  }
}
