import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { userService } from '../../services/user.service';
import { AuthenticationService } from '../../services/authentication.service';
import { Comment } from '../../models/comment.interface';
import { LikeData } from '../../models/like.interface';
import { Project } from '../../models/project.interface';
import { UserProfile } from '../../models/user-profile.interface';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})

export class ProfileComponent implements OnInit {
  user: UserProfile | undefined;
  projects: Project[] = [];
  likes : LikeData[] = [];
  comments: Comment[] = [];
  userId!: number;
  isOwnProfile: boolean = false;
  categoryId!: number;
  showCommentsLikes: any;
  subscription?: Subscription

  constructor(
    private userService: userService,
    private router: Router,
    private authService: AuthenticationService
  ){}


  ngOnInit(): void {

    const userJson = localStorage.getItem('user');
    if(userJson){
      const user: UserProfile = JSON.parse(userJson);
      this.user = user;
      this.userId = user.id;
    }

    this.loadUserComments();
    this.loadUserLikes();
    this.loadUserProjects();

    }

    loadUserComments():void{
      this.subscription = this.userService.getUserComments(this.userId).subscribe({
        next: (commnets: Comment[]) =>{
          this.comments = commnets;
          console.log(this.comments);
        },
        error: () =>{
          this.comments
        },
      });
    }

    loadUserLikes():void{
      this.subscription = this.userService.getUserLikes(this.userId).subscribe({
        next: (likes: LikeData[])=>{
          this.likes = likes;
          console.log(this.likes)
        },
        error: () => {
          this.likes
        },
      });
    }

    loadUserProjects():void{
      this.subscription = this.userService.getUserProjects(this.userId).subscribe({
        next: (projects: Project[])=>{
          this.projects = projects;
          console.log(this.projects);
        },
        error:() =>{
          this.projects
        }
      })
    }

    navigateToCreateProject(): void{
      this.router.navigate(['/create-project']);
    }

    removeCategory(categoryId:number, userid: number): void{
      this.userService.removeUserCategory(this.userId, categoryId).subscribe(response =>{
        console.log('category removed', response);
      })
    }

}
