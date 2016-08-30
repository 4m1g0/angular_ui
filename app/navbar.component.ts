import {Component, Output, EventEmitter} from '@angular/core';

@Component({
    selector: 'navbar',
    templateUrl: 'app/navbar.component.html',
    inputs: ['nodes', 'master']
})

export class NavbarComponent {
    logout() {
        this.eventLogout.emit();
    }

    @Output() eventLogout = new EventEmitter();
}
