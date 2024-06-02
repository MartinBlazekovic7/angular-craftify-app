import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { userService } from '../../services/user.service';
import { Project } from '../../models/project.interface';
import { CommonModule } from '@angular/common';

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
  likes : any[] = [];
  comments: any[] = [];
  userId!: number;
  isOwnProfile: boolean = false;
  categoryId!: number;
  showCommentsLikes: any;


  constructor(
    private route: ActivatedRoute,
    private userService: userService,
    private router: Router
  ){}

  ngOnInit(): void {
      const userId = +this.route.snapshot.paramMap.get('id')!;
      this.isOwnProfile = userId === this.userId;

      this.userService.getUserProfile(userId).subscribe(data => {
        this.user= data;
        this.loadUserDetails(userId);
      });
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

    navigateToCreateProject(): void{
      this.router.navigate(['/create-project']);
    }

    removeCategory(categoryId:number, userId: number): void{
      if( categoryId !== undefined && userId !== undefined){
        this.userService.removeUserCategory(userId, categoryId).subscribe(() =>{
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
