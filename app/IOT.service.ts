/*
 IOT.service.ts - IOT Service
 Copyright (c) 2016 Oscar Blanco.  All right reserved.

 This library is free software; you can redistribute it and/or
 modify it under the terms of the GNU Lesser General Public
 License as published by the Free Software Foundation; either
 version 2.1 of the License, or (at your option) any later version.

 This library is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 Lesser General Public License for more details.

 You should have received a copy of the GNU Lesser General Public
 License along with this library; if not, write to the Free Software
 Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA
 */

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
    private schedulesUrl = this.baseUrl + 'schedules';

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

    updateState(token, info): Observable<void> {
        var authHeader = new Headers();
        authHeader.append('Network-token', token);
        let body = JSON.stringify({ "s":info.s, "t":info.t });
        let headers = new Headers({ 'Network-token': token });
        let options = new RequestOptions({ headers: headers });

        return this.http.put(this.stateUrl, body, options)
            .catch(this.handleError);
    }

    getSchedules (token): Observable<any[]> {
        var authHeader = new Headers();
        authHeader.append('Network-token', token);

        return this.http.get(this.schedulesUrl, {headers: authHeader})
            .map(this.extractData)
            .catch(this.handleError);
    }

    updateSchedule(token, schedule): Observable<void> {
        var authHeader = new Headers();
        authHeader.append('Network-token', token);
        let body = JSON.stringify(schedule);
        let headers = new Headers({ 'Network-token': token });
        let options = new RequestOptions({ headers: headers });

        return this.http.put(this.schedulesUrl, body, options)
            .catch(this.handleError);
    }

    addSchedule(token, schedule): Observable<any> {
        var authHeader = new Headers();
        authHeader.append('Network-token', token);
        let body = JSON.stringify(schedule);
        let headers = new Headers({ 'Network-token': token });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.schedulesUrl, body, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    deleteSchedule(token, id): Observable<void> {
        var authHeader = new Headers();
        authHeader.append('Network-token', token);
        let headers = new Headers({ 'Network-token': token });
        let options = new RequestOptions({ headers: headers });

        return this.http.delete(this.schedulesUrl + '/' + id, options)
            .catch(this.handleError);
    }

    private extractData(res: Response) {
        if (res == null || res.totalBytes == 0)
            return "";
        //console.log(res);
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
