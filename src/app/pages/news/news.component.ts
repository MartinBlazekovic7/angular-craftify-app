import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './news.component.html',
  styleUrl: './news.component.scss',
})
export class NewsComponent {
  searchTerm: string = '';

  newsList = [
    {
      id: 1,
      title: 'Innovative Upcycling: Turning Trash into Treasure',
      content:
        'Explore the latest trends in upcycling as crafters around the world transform discarded materials into beautiful and functional pieces, showcasing the power of creativity and sustainability',
      url: '../../../assets/images/news-placeholder.jpg',
    },
    {
      id: 2,
      title: 'Tech Meets Tradition: The Rise of DIY Electronics',
      content:
        'Discover how DIY enthusiasts are blending traditional crafting techniques with modern technology, creating innovative projects that merge artistry with functionality in exciting new ways.',
      url: '../../../assets/images/news-placeholder.jpg',
    },
    {
      id: 3,
      title: 'The Art of Mindfulness: Crafting as Therapy',
      content:
        'Delve into the therapeutic benefits of crafting as experts explore its calming effects on mental health and well-being, highlighting the growing trend of using creativity as a tool for self-care and stress relief.',
      url: '../../../assets/images/news-placeholder.jpg',
    },
  ];
}
