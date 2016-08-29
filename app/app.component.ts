import { Component } from '@angular/core';
import {NavbarComponent} from "./navbar.component";
import {LoginComponent} from "./login.component";
import {MainPanelComponent} from "./mainPanel.component";
import './rxjs-operators';
import {MockComponent} from "./mock.component";

@Component({
    selector: 'my-app',
    templateUrl: 'app/app.component.html',
    directives: [NavbarComponent, LoginComponent, MainPanelComponent, MockComponent]
})

export class AppComponent {
    master = 'Master Node';
    nodes = ['Test node1', 'Test node2'];

}