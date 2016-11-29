import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable }     from 'rxjs/Observable';

@Injectable()
export class PricingService {
    constructor (private http: Http) {}

    //private pricesUrl = 'http://137.74.114.25:9000/';  // URL to web API
    private pricesUrl = 'http://aalborgiot.4m1g0.com:9000/';  // URL to web API

    getPrices (): Observable<number[]> {
        var date = new Date();
        var day = date.getDate();
        var month = date.getMonth()+1;
        var year = date.getFullYear();
        var dateStr = day + '-' + month + '-' + year;
        return this.http.get(this.pricesUrl + dateStr)
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