import {Component} from '@angular/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES, NgClass} from '@angular/common';
import {CHART_DIRECTIVES} from 'ng2-charts/ng2-charts';

@Component({
    selector: 'prices',
    templateUrl: 'app/price.component.html',
    directives: [CHART_DIRECTIVES, NgClass, CORE_DIRECTIVES, FORM_DIRECTIVES]
})

export class PriceComponent {
    // lineChart
    public lineChartData:Array<any> = [
        {data: [65, 59, 80, 81, 56, 55, 40], label: 'Cost (€/KWh)'},
    ];
    public lineChartLabels:Array<any> = [1, 2, 3, 4, 5, 6, 7];
    public lineChartOptions:any = {
        animation: false,
        responsive: true
    };
    public lineChartColours:Array<any> = [
        { // grey
            backgroundColor: 'rgba(100,255,100,0.2)',
            borderColor: 'rgba(0,170,0,1)',
            pointBackgroundColor: 'rgba(0,170,0,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(0,170,0,0.8)'
        }
    ];
    public lineChartLegend:boolean = false;
    public lineChartType:string = 'line';
}