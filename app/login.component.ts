import {Component, Output, EventEmitter} from '@angular/core';

@Component({
    selector: 'login',
    templateUrl: 'app/login.component.html',
})

export class LoginComponent {
    token: string;

    login (token: string) {
        this.token = token;
        console.log(token);
        this.eventLogin.emit(this.token);
    }

    @Output() eventLogin = new EventEmitter();
}
