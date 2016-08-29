import {Component} from '@angular/core';

@Component({
    selector: 'login',
    templateUrl: 'app/login.component.html',
})

export class LoginComponent {
    login (token: string) {
        console.log(token);
    }
}
