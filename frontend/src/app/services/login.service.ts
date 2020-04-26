import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { pipe } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

	//private url = 'http://localhost:3000/api/login';
  private url = 'api/login'; //prod
	private welcomeUrl = 'http://localhost:3000/api/loggedin/me';


  constructor(private httpClient: HttpClient) {

  }

  loginUser(user) {
  	return this.httpClient.post(this.url, user, {observe: 'response'});
        //console.log('Reached before map operator');
     // .pipe(map(response => { //LEarn about pipe and map and add later
        //console.log('Response from Express login API to Angular,', response);
     // })); //No need to stringify the user object
  	//return this.httpClient.post(this.url, JSON.stringify(user));
    //Maybe did not work becuase we did nto return true
  }

  welcomeUser(user) {
  	var headers = new Headers();
  	return this.httpClient.post(this.welcomeUrl, user); //No need to stringify the user object
  	//return this.httpClient.post(this.url, JSON.stringify(user));
  }

}
