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
  	//var = this.x.servcice.enethid
  	//var will be different for different url
  	//if other servic eposts to other url, auth is called.post
  	//No need to have auth servcice
  	//Just call it in another service.
  	return this.httpClient.post(this.url, userID, {headers: {'x-auth-token': token}, observe: 'response'} ); //No need to stringify the user object
  	//return this.httpClient.post(this.url, JSON.stringify(user));

  }

}
