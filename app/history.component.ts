/*
 history.component.ts - History component of angular2
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

import {Component, Input, OnInit} from '@angular/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES, NgClass} from '@angular/common';
//import {CHART_DIRECTIVES} from 'ng2-charts/ng2-charts';

import {IOTService} from "./IOT.service";

@Component({
    selector: 'history',
    templateUrl: 'app/history.component.html',
    directives: [NgClass, CORE_DIRECTIVES, FORM_DIRECTIVES],
    providers: [IOTService],
})

export class HistoryComponent implements OnInit {
    errorMessage: string;
    history: number[];
    mode = 'Observable';
    loaded = false;
    @Input() token:string;
    public lineChartLabels:Array<any> =[];

    public lineChartData:Array<any>;

    constructor (private historyService: IOTService) {
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
                history => {this.history = history.map((value) => {
                    var power = value * 220 / 100;
                    power -= 20;
                    if (power < 0) power = 0;
                    return power;
                } ); this.isLoaded()},
                error =>  this.errorMessage = <any>error);
    }

    // lineChart
    isLoaded(){
        this.lineChartData = [
            {data: this.history, label: 'Power (W)'},
        ];
        this.loaded = true;
    }


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

    public lineChartOptions:any = {
        animation: false,
        responsive: true,
        scales: {
            yAxes: [{
                ticks: {
                    min: 0,
                    max: 2000,
                }
            }]
        }
    };
}