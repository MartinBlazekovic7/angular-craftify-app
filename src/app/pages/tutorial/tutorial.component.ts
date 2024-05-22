import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { TutorialService } from '../../services/tutorial.service';
import { Tutorial } from '../../models/tutorial.interface';

@Component({
  selector: 'app-tutorial',
  standalone: true,
  imports: [],
  templateUrl: './tutorial.component.html',
  styleUrl: './tutorial.component.scss'
})

export class TutorialComponent implements OnInit, OnDestroy {
  subscription?: Subscription;

  tutorial?: Tutorial;

  tutorialId?: number;

  inFavorites = false;

  constructor(
    private tutorialService: TutorialService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getTutorialId();
    this.getTutorial();
  }

  getTutorialId(): void {
    this.subscription = this.route.params.subscribe((params) => {
      this.tutorialId = params['id'];
    });
  }

  getTutorial(): void {
    if (!this.tutorialId) {
      return;
    }

    this.subscription = this.tutorialService
      .getTutorialById(this.tutorialId)
      .subscribe({
        next: (tutorial: Tutorial) => {
          this.tutorial = tutorial;
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