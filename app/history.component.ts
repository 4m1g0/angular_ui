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
    history: number[] = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    mode = 'Observable';
    loaded = false;
    @Input() token:string;

    public lineChartData:Array<any>;

    constructor (private historyService: HistoryService) {}

    ngOnInit() { this.getPrices(); }

    getPrices() {
        this.historyService.getHistory(this.token)
            .subscribe(
                history => {this.history = history.map((value) => { return value / 1 } ); console.log("AAAA" + history); this.isLoaded()},
                error =>  this.errorMessage = <any>error);
    }

    // lineChart
    isLoaded(){
        this.lineChartData = [
            {data: this.history, label: 'Power (W)'},
        ];
        this.loaded = true;
    }


    public lineChartLabels:Array<any> = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'];
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