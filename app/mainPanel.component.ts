/*
 mainPanel.component.ts - Main Panel component of angular2
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

import {Component} from '@angular/core';
import {PriceComponent} from "./price.component";
import {HistoryComponent} from "./history.component";
import {InfoComponent} from "./info.component";
import {SchedulesComponent} from "./schedules.component";

@Component({
    selector: 'main-panel',
    templateUrl: 'app/mainPanel.component.html',
    directives: [PriceComponent, HistoryComponent, InfoComponent, SchedulesComponent],
    inputs: ['token']
})

export class MainPanelComponent {
    loadHistory:boolean = false;
    loadSchedules:boolean = false;

    eventLoaded(component) {
        console.log("emited: " + component)
        if (component == "info") // don't load history until components with more priority are ready
            this.loadSchedules = true;
        if (component == "schedules") // don't load history until components with more priority are ready
            this.loadHistory = true;
    }
}
