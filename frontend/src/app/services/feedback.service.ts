import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

	private url = 'http://localhost:8080/api/loggedIn/feedback';
  //private url = 'api/loggedIn/feedback'; //prod

  constructor(private httpClient: HttpClient) {

  }

  postFeedback(feedback, token) {

  	let requestOptions = {
  		headers: new HttpHeaders({ 'x-auth-token': token})
  	}

  	//headers is not stored in req.body
  	//where is headers stored

  	return this.httpClient.post(this.url, feedback, requestOptions);
  	//based on the url express auth and then express feedback api will be calle don its own
  }

}
