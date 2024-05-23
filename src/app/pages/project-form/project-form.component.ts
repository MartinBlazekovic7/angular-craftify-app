import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import axios from 'axios';
import { environment } from '../../../environments/environment';


@Component({
  selector: 'app-project-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './project-form.component.html',
  styleUrl: './project-form.component.scss'
})
export class ProjectFormComponent {
  title = "";

  projectForm!: FormGroup;
  isSubmit = true;
  submitMessage ="";

  categoryTags= ['Home Decoration', 'Floral', 'Painting', 'Art', 'Nature'];
  complexityTags = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];

  constructor(private projectBuilder: FormBuilder){}

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
      console.log(formData.kyc_update);

      axios
      .post(`${environment.apiUrl}/project`, formData)
      .then(response => {
        this.submitMessage = "Project submited successfully";
        this.projectForm.reset();
      })
      .catch(error => {
        console.error(error);
        this.submitMessage = "Project not submited!";
      })
      .finally(() => {
        this.isSubmit = true;
        setTimeout(() =>{
          this.isSubmit = false;
        }, 5000);
      });
    }
  }
}
