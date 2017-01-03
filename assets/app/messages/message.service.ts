import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Message } from './message.model';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Rx';
import {ErrorService} from '../errors/error.service';

@Injectable()

export class MessageService {
	private messages: Message[] = [];
	editState = new EventEmitter<Message>();
	private url = 'https://angular2nodedeploy.herokuapp.com/';

	constructor(private http: Http, private errorService: ErrorService){}

	addMessage(message: Message){
		let body = JSON.stringify(message);
		const headers = new Headers({'Content-Type': 'application/json'});
		const token = localStorage.getItem('token')
			? '?token='+localStorage.getItem('token') : '';
		return this.http.post(this.url+'message'+token, body, {headers:headers})
			.map((res: Response) => {
				let result = res.json();
				let message = new Message(
					result.obj.content,
					result.obj.user.firstName, 
					result.obj._id, 
					result.obj.user._id
				);
				this.messages.push(message);
				return message;
			})
			.catch((err: Response) => {
				this.errorService.handleError(err.json());
				return Observable.throw(err.json());
			});
	}
	getMessages(){
		return this.http.get(this.url+'message')
			.map((response: Response)=>{
				let messages = response.json().obj;
				let transformed: Message[] = [];
				for(let message of messages){
					transformed.push(new Message(
						message.content,
						message.user.firstName,
						message._id,
						message.user._id)
					);
				}
				this.messages = transformed;
				return transformed;
			})
			.catch((err: Response) => {
				this.errorService.handleError(err.json());
				return Observable.throw(err.json());
			});
	}

	editMessage(message: Message){
		this.editState.emit(message);
	}

	updateMessage(message: Message){
		let body = JSON.stringify(message);
		const headers = new Headers({'Content-Type': 'application/json'});
		const token = localStorage.getItem('token')
			? '?token='+localStorage.getItem('token') : '';
		return this.http.patch(this.url+'message/'+message.messageId+token, body, {headers:headers})
			.map((res: Response) => res.json())
			.catch((err: Response) => {
				this.errorService.handleError(err.json());
				return Observable.throw(err.json());
			});
	}

	deleteMessage(message: Message){
		this.messages.splice(this.messages.indexOf(message), 1);
		const token = localStorage.getItem('token')
			? '?token='+localStorage.getItem('token') : '';
		return this.http.delete(this.url+'message/'+message.messageId+token)
			.map((res: Response) => res.json())
			.catch((err: Response) => {
				this.errorService.handleError(err.json());
				return Observable.throw(err.json());
			});
	}
}