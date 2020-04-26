import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { LoginService } from '../services/login.service';
import { AuthorizeService } from '../services/authorize.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	loginForm =  new FormGroup({
    //'username': new FormControl(), //add this later
    'email': new FormControl(),
    'password': new FormControl()
  });

  constructor(private service: LoginService, private authService: AuthorizeService, private router: Router) { }

  ngOnInit(): void {
  }

  token;
  userID;
  invalidLogin;

  login() {
    let user = this.loginForm.value;
		console.log('user', user);
  	this.service.loginUser(user)
  		.subscribe(response => {
  			//localStorage.setItem('access_token', response.token);
        //this.token = response.body.token;
        //this.userID = response.body._id;
        //this.authorize();
        console.log('response of Express login API to Angular', response);
        this.router.navigate(['/me']); //set a boolean of valid login, only then move to welcome page
        localStorage.setItem('token', response.body['token']);
        /*
        if (response) 
          this.router.navigate(['/me']);
        else
          this.invalidLogin = true;
        */
  	});
  }
  /*
  authorize() {
    console.log('Token provided to authorize service in Angular', this.token);
    this.authService.authorizeUser(this.token, this.userID)
      .subscribe(response => {
        console.log('Response by Express after authorization', response);
      })
  }
  */

}
