/*
 navbar.component.ts - Nav bar component of angular2
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
