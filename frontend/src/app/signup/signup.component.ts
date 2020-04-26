import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { SignupService } from '../services/signup.service';

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

  constructor(private service: SignupService) {

   }

  ngOnInit(): void {
  }

  signup() {
    let user = this.signupForm.value;
		console.log('user', user);
    console.log('stringified user', JSON.stringify(user));	  	
  	//Get user from the html
  	this.service.createUser(user)
  		.subscribe(response => {
  			console.log('Response from signup API,', response);
  	});
  }

}
