import { Component } from '@angular/core';
import {NavbarComponent} from "./navbar.component";
import {LoginComponent} from "./login.component";
import {MainPanelComponent} from "./mainPanel.component";
import './rxjs-operators';
import {MockComponent} from "./mock.component";
import {CookieService} from 'angular2-cookie/core';

@Component({
    selector: 'my-app',
    templateUrl: 'app/app.component.html',
    directives: [NavbarComponent, LoginComponent, MainPanelComponent, MockComponent],
    providers: [CookieService]
})

export class AppComponent {
    master = 'Master Node';
    nodes = ['Test node1', 'Test node2'];
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