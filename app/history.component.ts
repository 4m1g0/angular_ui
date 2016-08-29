import {Component} from '@angular/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES, NgClass} from '@angular/common';
import {CHART_DIRECTIVES} from 'ng2-charts/ng2-charts';

@Component({
    selector: 'history',
    templateUrl: 'app/history.component.html',
    directives: [CHART_DIRECTIVES, NgClass, CORE_DIRECTIVES, FORM_DIRECTIVES]
})

export class HistoryComponent {
    // lineChart
    public lineChartData:Array<any> = [
        {data: [9, 30, 55, 81, 56, 80, 40], label: 'Power (W)'},
    ];
    public lineChartLabels:Array<any> = [1, 2, 3, 4, 5, 6, 7];
    public lineChartOptions:any = {
        animation: false,
        responsive: true
    };
    public lineChartColours:Array<any> = [
        { // grey
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