import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

	private url = 'http://localhost:3000/api/signup';

  constructor(private httpClient: HttpClient) { 

  }

  createUser(user) {
  	return this.httpClient.post(this.url, user); //No need to stringify the user object
  	//return this.httpClient.post(this.url, JSON.stringify(user));
  }

}
