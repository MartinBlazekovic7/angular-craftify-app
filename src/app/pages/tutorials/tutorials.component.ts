import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tutorials',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tutorials.component.html',
  styleUrl: './tutorials.component.scss',
})
export class TutorialsComponent {
  searchTerm: string = '';

  tutorialsList = [
    {
      id: 1,
      title: 'Mastering the Basics: Intro to Crafting',
      content:
        'Dive into the world of crafting with our beginner-friendly tutorials designed to teach you the fundamental techniques needed to kickstart your creative journey.',
      rating: 8.2,
    },
    {
      id: 2,
      title: 'Crafting Essentials: Must-Have Tools and Tips',
      content:
        'Equip yourself with the essential knowledge and tools necessary to tackle any craft project with confidence and flair.',
      rating: 8.5,
    },
    {
      id: 3,
      title: 'Crafting 101: A Crash Course in Creativity',
      content:
        'Learn the ABCs of crafting as we break down the basics and guide you through simple yet satisfying projects to ignite your passion for handmade creations.',
      rating: 9.0,
    },
  ];
}
