import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

	private url = 'http://localhost:8080/api/signup';
	//private url = 'api/signup'; //prod

  constructor(private httpClient: HttpClient) { 

  }

  createUser(user) {
  	return this.httpClient.post(this.url, user, {observe: 'response'}); //No need to stringify the user object
  	//return this.httpClient.post(this.url, JSON.stringify(user));
  }

}
