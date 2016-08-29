import {Component} from '@angular/core';
import {PriceComponent} from "./price.component";
import {HistoryComponent} from "./history.component";

@Component({
    selector: 'main-panel',
    templateUrl: 'app/mainPanel.component.html',
    directives: [PriceComponent, HistoryComponent]
})

export class MainPanelComponent {
}
