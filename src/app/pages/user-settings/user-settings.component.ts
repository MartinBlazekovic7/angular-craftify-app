import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, ReactiveFormsModule} from '@angular/forms';
import { userService } from '../../services/user.service';

@Component({
  selector: 'app-user-settings',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './user-settings.component.html',
  styleUrl: './user-settings.component.scss'
})
export class UserSettingsComponent implements OnInit{

  profileForm!: FormGroup

  constructor(private formBuilder: FormBuilder, private userService: userService){}

  ngOnInit(): void {
      this.profileForm = this.formBuilder.group({
        name: ['', Validators.required],
        userName: ['', Validators.required, 
                       Validators.minLength(6), 
                       Validators.maxLength(28)],
        email: ['', Validators.required, Validators.email],
        password: ['',Validators.required,
                      Validators.minLength(6),
                      Validators.maxLength(30)]  
      });
  }
 
  onSubmit(){
    if(this.profileForm?.valid){
      console.log('Form submitted', this.profileForm.value);
    }else{
      console.log('Form is invalid');
    }
  }
}
