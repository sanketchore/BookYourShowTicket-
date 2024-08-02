import { Component } from '@angular/core';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { ApiServiceService } from '../services/api-service.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NGXLogger } from 'ngx-logger';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  hide=true;
  constructor(private fb:FormBuilder,
    private apiService:ApiServiceService,
    private auth:AuthService,
    private router:Router,
    private snack : MatSnackBar,
    private logger : NGXLogger
    ){}

  loginData = this.fb.group(
    {loginId:['',Validators.required],
    password:['',Validators.required]}
  );

login(loginForm:any){
  this.apiService.login(loginForm.value).subscribe(
    (response:any)=>{
      this.snack.open('You have successfully logged in!','Ok',{duration:3000});
      this.auth.setToken(response.accessToken);
      // this.auth.setCustomer(response.customer);
      this.auth.setRole(response.roles[0].authority);
      this.auth.setUserName(response.userName);
      let role=response.roles[0].authority
      // let jsonStr = JSON.parse(str);
      // let role=jsonStr.name
      if(role==='ADMIN'){
        
        this.router.navigate(['/admin']);
      }else{
      
        this.router.navigate(['/']);
      }
    },
    (error)=>{
      alert("Please check your userName and password")
      console.log(error);
      this.logger.info(error);
    }
  )
}
}
