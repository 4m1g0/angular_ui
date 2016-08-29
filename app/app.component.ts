import { Component } from '@angular/core';
import {NavbarComponent} from "./navbar.component";
import {LoginComponent} from "./login.component";
import {MainPanelComponent} from "./mainPanel.component";

@Component({
    selector: 'my-app',
    templateUrl: 'app/app.component.html',
    directives: [NavbarComponent, LoginComponent, MainPanelComponent]
})

export class AppComponent {
    master = 'Master Node';
    nodes = ['Test node1', 'Test node2'];

}