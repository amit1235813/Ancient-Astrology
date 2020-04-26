import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { SignupService } from '../services/signup.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm =  new FormGroup({
    'firstname': new FormControl(),
    'username': new FormControl(),
    'email': new FormControl(),
    'password': new FormControl()
  });

  constructor(private service: SignupService, private router: Router) {

   }

  ngOnInit(): void {
  }

  signup() {
    let user = this.signupForm.value;
		console.log('user', user);
    //console.log('stringified user', JSON.stringify(user));	  	
  	//Get user from the html
  	this.service.createUser(user)
  		.subscribe(response => {
  			console.log('response of Express login API to Angular on signup', response);
        this.router.navigate(['/me']); //set a boolean of valid login, only then move to welcome page
        localStorage.setItem('token', response.body['token']);
  	});
  }

}
