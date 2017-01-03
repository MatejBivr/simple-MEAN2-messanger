import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Rx';
import { User } from './user.model';
import {ErrorService} from '../errors/error.service';

@Injectable()

export class AuthService {
	private url = 'https://angular2nodedeploy.herokuapp.com/';

	constructor(private http:Http, private errorService:ErrorService){}

	signup(user:User){
		let body = JSON.stringify(user);
		const headers = new Headers({'Content-Type': 'application/json'});
		return this.http.post(this.url+'user', body, {headers:headers})
			.map((res: Response) => res.json())
			.catch((err: Response) => {
				this.errorService.handleError(err.json());
				return Observable.throw(err.json());
			});
	}

	signin(user:User){
		let body = JSON.stringify(user);
		const headers = new Headers({'Content-Type': 'application/json'});
		return this.http.post(this.url+'user/signin', body, {headers:headers})
			.map((res: Response) => res.json())
			.catch((err: Response) => {
				this.errorService.handleError(err.json());
				return Observable.throw(err.json());
			});
	}

	logout(){
		localStorage.clear();
	}

	isLoggedIn(){
		return localStorage.getItem('token') !== null;
	}
}