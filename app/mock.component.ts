import {Component, OnInit} from '@angular/core';
import {MockService} from "./mock.service";

@Component({
    selector: 'mock',
    templateUrl: 'app/mock.component.html',
    providers: [MockService]
})


export class MockComponent implements OnInit {
    errorMessage: string;
    prices: number[];
    mode = 'Observable';

    constructor (private mockService: MockService) {}

    ngOnInit() { this.getPrices(); }

    getPrices() {
        this.mockService.getPrices()
            .subscribe(
                prices => this.prices = prices,
                error =>  this.errorMessage = <any>error);
    }
}