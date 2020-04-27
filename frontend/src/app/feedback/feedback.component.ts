import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl } from '@angular/forms';

import { AuthorizeService } from '../services/authorize.service';
import { FeedbackService } from '../services/feedback.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {

	feedbackForm =  new FormGroup({
    'feedbackText': new FormControl(),
  });

  constructor(private service: FeedbackService, private authService: AuthorizeService, private router: Router) { }

  ngOnInit(): void {
  }

  token = localStorage.getItem('token');
  //function which sumbits a feedback
  //is a seperate service needed - yes
  
  feedback() {
    let feedback = this.feedbackForm.value;
    feedback.feedbackType = 'Improvement';
		console.log('Token being sent by angular to Express feedback API', this.token);
		console.log('Feedback sent by angular to Express feedback API', feedback);
  	this.service.postFeedback(feedback, this.token)
  		.subscribe(response => {
  			console.log('response of Express login API to Angular on feedback api', response);
  	});
  }

}
