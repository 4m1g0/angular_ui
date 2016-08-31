import { Injectable }     from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import { Observable }     from 'rxjs/Observable';

@Injectable()
export class IOTService {
    constructor (private http: Http) {}

    private baseUrl = 'http://137.74.114.25:9001/'
    private historyUrl = this.baseUrl + 'history';  // URL to history endpoint
    private infoUrl = this.baseUrl + 'info';
    private stateUrl = this.baseUrl + 'state';

    getHistory (token): Observable<number[]> {
        var authHeader = new Headers();
        authHeader.append('Network-token', token);

        return this.http.get(this.historyUrl, {headers: authHeader})
            .map(this.extractData)
            .catch(this.handleError);
    }

    getInfo (token): Observable<number[]> {
        var authHeader = new Headers();
        authHeader.append('Network-token', token);

        return this.http.get(this.infoUrl, {headers: authHeader})
            .map(this.extractData)
            .catch(this.handleError);
    }

    updateState(token, info): Observable {
        var authHeader = new Headers();
        authHeader.append('Network-token', token);
        let body = JSON.stringify({ "s":info.s, "t":info.t });
        let headers = new Headers({ 'Network-token': token });
        let options = new RequestOptions({ headers: headers });

        return this.http.put(this.stateUrl, body, options)
            .catch(this.handleError);
    }

    private extractData(res: Response) {
        if (res == null || res.totalBytes == 0)
            return "";
        let body = res.json();
        return body || { };
    }

    private handleError (error: any) {
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message

        if (error == null)
            return Observable.throw("");
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }
}