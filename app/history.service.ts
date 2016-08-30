import { Injectable }     from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import { Observable }     from 'rxjs/Observable';

@Injectable()
export class HistoryService {
    constructor (private http: Http) {}

    private pricesUrl = 'http://137.74.114.25:9001/history';  // URL to web API

    getHistory (token): Observable<number[]> {
        var authHeader = new Headers();
        authHeader.append('Network-token', token);

        return this.http.get(this.pricesUrl, {headers: authHeader})
            .map(this.extractData)
            .catch(this.handleError);
    }

    private extractData(res: Response) {
        let body = res.json();
        console.log(body);
        return body || { };
    }

    private handleError (error: any) {
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }
}