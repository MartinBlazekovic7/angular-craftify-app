import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Comment } from '../../models/comment.interface';

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss',
})
export class CommentComponent {
  @Input() comment?: Comment;
}
