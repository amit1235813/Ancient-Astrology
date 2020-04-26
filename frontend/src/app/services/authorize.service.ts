import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthorizeService {

	private url = 'http://localhost:3000/api/loggedIn';

  constructor(private httpClient: HttpClient) {

  }

  authorizeUser(token, userID) {
  	return this.httpClient.post(this.url, userID, {headers: {'x-auth-token': token}, observe: 'response'} ); //No need to stringify the user object
  	//return this.httpClient.post(this.url, JSON.stringify(user));
  }

}
