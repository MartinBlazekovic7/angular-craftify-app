import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProjectService } from '../../services/project.service';



@Component({
  selector: 'app-project-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './project-form.component.html',
  styleUrl: './project-form.component.scss'
})

export class ProjectFormComponent implements OnInit{

  title = "";
  projectForm!: FormGroup;
  isSubmit = true;
  submitMessage ="";
  categoryTags= ['Home Decoration', 'Floral', 'Painting', 'Art', 'Nature'];
  complexityTags = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];

  constructor(private projectBuilder: FormBuilder, private projectService: ProjectService){}

  ngOnInit(): void {
    this.projectForm = this.projectBuilder.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      complexity: ['', Validators.required],
      category: ['', Validators.required]
    });
  }

  onSubmit(){
    if(this.projectForm.valid){
      const formData = this.projectForm.value;

      this.projectService.submitProject(formData).subscribe(
        response => {
          this.submitMessage = "Project submitted successfully";
          this.projectForm.reset();
        },
        error => {
          console.error(error);
          this.submitMessage = "Project not submitted";
        },
        () => {
          this.isSubmit =true;
          setTimeout(() => {
            this.isSubmit = false;
          }, 5000);
        }
      );    
    }
  }
}
