import { Injectable, EventEmitter } from '@angular/core';
import 'rxjs/Rx';
import {Error} from './error.model';

@Injectable()

export class ErrorService {
	errorOccurred = new EventEmitter<Error>();

	handleError(error: any){
		let errorData = new Error(error.title, error.error.message);
		this.errorOccurred.emit(errorData);
	}
}