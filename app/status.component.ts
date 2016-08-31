import {Component, OnInit} from '@angular/core';
import {PricingService} from "./pricing.service";

@Component({
    selector: 'prices',
    templateUrl: 'app/price.component.html',
    providers: [PricingService]
})

export class StatusComponent implements OnInit {
    errorMessage: string;
    prices: number[] = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    mode = 'Observable';
    loaded = false;
    public lineChartData:Array<any>;

    constructor (private pricingService: PricingService) {}

    ngOnInit() { this.getPrices(); }

    getPrices() {
        this.pricingService.getPrices()
            .subscribe(
                prices => {this.prices = prices.map((value) => { return value / 100000 }); this.isLoaded()},
                error =>  this.errorMessage = <any>error);
    }

    // lineChart
    isLoaded(){
        this.lineChartData = [
            {data: this.prices, label: 'Cost (€/KWh)'},
        ];
        this.loaded = true;
    }


    public lineChartLabels:Array<any> = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'];
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