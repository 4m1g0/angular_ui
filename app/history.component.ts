import {Component, Input} from '@angular/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES, NgClass} from '@angular/common';
import {CHART_DIRECTIVES} from 'ng2-charts/ng2-charts';
import {HistoryService} from "./history.service";

@Component({
    selector: 'history',
    templateUrl: 'app/history.component.html',
    directives: [CHART_DIRECTIVES, NgClass, CORE_DIRECTIVES, FORM_DIRECTIVES],
    providers: [HistoryService],
})

export class HistoryComponent {
    errorMessage: string;
    history: number[];
    mode = 'Observable';
    loaded = false;
    @Input() token:string;
    public lineChartLabels:Array<any> =[];

    public lineChartData:Array<any>;

    constructor (private historyService: HistoryService) {
        var date = new Date();
        date.setHours(date.getHours()-1);
        for (var i=0; i <= 30; i++){
            if (i % 5 == 0)
                this.lineChartLabels[i] = this.stringFromNumber(date.getHours()) + ':' + this.stringFromNumber(date.getMinutes());
            else
                this.lineChartLabels[i] = '';

            date.setMinutes(date.getMinutes() + 2);
        }
    }

    stringFromNumber(number){
        var text = '';
        if (number < 10)
            text += '0';

        return text + number;
    }

    ngOnInit() { this.getHistory(); }

    getHistory() {
        this.historyService.getHistory(this.token)
            .subscribe(
                history => {this.history = history.map((value) => { return value * 230 / 100 } ); console.log("AAAA" + history); this.isLoaded()},
                error =>  this.errorMessage = <any>error);
    }

    // lineChart
    isLoaded(){
        this.lineChartData = [
            {data: this.history, label: 'Power (W)'},
        ];
        this.loaded = true;
    }

    public lineChartOptions:any = {
        animation: false,
        responsive: true
    };
    public lineChartColours:Array<any> = [
        { // red
            backgroundColor: 'rgba(255,100,100,0.2)',
            borderColor: 'rgba(170,0,0,1)',
            pointBackgroundColor: 'rgba(170,0,0,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(170,0,0,0.8)'
        }
    ];
    public lineChartLegend:boolean = false;
    public lineChartType:string = 'line';
}