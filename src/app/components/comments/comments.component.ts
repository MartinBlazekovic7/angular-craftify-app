import { Component, Input, OnInit } from '@angular/core';
import { Comment } from '../../models/comment.interface';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { CommentComponent } from '../comment/comment.component';

@Component({
  selector: 'app-comments',
  standalone: true,
  imports: [FormsModule, CommonModule, CommentComponent],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.scss',
})
export class CommentsComponent implements OnInit {
  @Input() comments?: Comment[];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    console.log('CommentsComponent initialized');
  }
}
