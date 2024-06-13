import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TutorialService } from '../../services/tutorial.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Tutorial } from '../../models/tutorial.interface';

@Component({
  selector: 'app-tutorials',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tutorials.component.html',
  styleUrl: './tutorials.component.scss',
})
export class TutorialsComponent implements OnInit, OnDestroy{
  searchTerm: string = '';

  subscription?: Subscription

  tutorials?: Tutorial[] = [];

  constructor(private tutorialService: TutorialService, private router: Router){}


  ngOnInit(): void {
      this.getTutorials();
  }

  getTutorials(): void{
    this.subscription = this.tutorialService.getAllTutorials().subscribe({
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
