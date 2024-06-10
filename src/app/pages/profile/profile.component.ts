import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { userService } from '../../services/user.service';
import { Project } from '../../models/project.interface';
import { AuthenticationService } from '../../services/authentication.service';
import { Subscriber } from 'rxjs';
import { Comment } from '../../models/comment.interface';
import { LikeData } from '../../models/like.interface';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  user: any;
  projects: Project[] = [];
  likes : LikeData[] = [];
  comments: Comment[] = [];
  isOwnProfile: boolean = false;
  categoryId!: number;
  showCommentsLikes: any;
  isUserLoggedIn= true;
  userid!: number;

  constructor(
    private route: ActivatedRoute,
    private userService: userService,
    private router: Router,
    private authService: AuthenticationService
  ){}

  ngOnInit(): void {

    this.isUserLoggedIn = this.authService.isUserLoggedIn();
      this.loadUserDetails(this.userid);
    }
      loadUserDetails(userId: number): void{
      this.userService.getUserProjects(userId).subscribe(data =>{
        this.projects = data;
      });

      this.userService.getUserComments(userId).subscribe(data =>{
        this.comments = data;
      });
      
      this.userService.getUserLikes(userId).subscribe(data =>{
        this.likes = data;
      });

    }

    userId = this.authService.getUserId();
    name = this.authService.getName();

    navigateToCreateProject(): void{
      this.router.navigate(['/project-form']);
    }

    removeCategory(categoryId:number, userid: number): void{
      if( categoryId !== undefined && userid !== undefined){
        this.userService.removeUserCategory(userid, categoryId).subscribe(() =>{
          this.user.category = this.user.category.filter((cat: { id: number; }) => cat.id !== categoryId);
        });
      } else{
        console.error('cannot remove category!');
      }
    }

    toggleCommentsLikes(): void{
      this.showCommentsLikes = !this.showCommentsLikes;
    }

}
