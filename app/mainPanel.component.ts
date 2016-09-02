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
