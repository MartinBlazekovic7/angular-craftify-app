import { Component, Input } from '@angular/core';
import { Comment } from '../../models/comment.interface';

@Component({
  selector: 'app-comments',
  standalone: true,
  imports: [],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.scss',
})
export class CommentsComponent {
  @Input() comments?: Comment[];
}
