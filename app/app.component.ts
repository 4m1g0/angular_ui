/*
 app.components.ts - Test component
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

import { Component } from '@angular/core';
import {NavbarComponent} from "./navbar.component";
import {LoginComponent} from "./login.component";
import {MainPanelComponent} from "./mainPanel.component";
import './rxjs-operators';
import {CookieService} from 'angular2-cookie/core';

@Component({
    selector: 'my-app',
    templateUrl: 'app/app.component.html',
    directives: [NavbarComponent, LoginComponent, MainPanelComponent],
    providers: [CookieService]
})

export class AppComponent {
    master = 'Master Node';
    nodes = [];
    token: string;

    constructor(private _cookieService:CookieService){
        this.token = this._cookieService.get("token");
    }

    eventLogin(token) {
        this.token = token;
        this._cookieService.put("token", this.token)
    }

    eventLogout(token) {
        this.token = null;
        this._cookieService.remove("token");
    }

}
