import {Component, Input, OnInit, EventEmitter, Output, ElementRef} from '@angular/core';
import {IOTService} from "./IOT.service";
import {Observable} from 'rxjs/Rx';
declare var $:any;

@Component({
    selector: 'info',
    templateUrl: 'app/info.component.html',
    providers: [IOTService],
})

export class InfoComponent implements OnInit{
    errorMessage: string;
    info: any = {"s":1,"t":0};
    mode = 'Observable';
    loaded:boolean = false;
    @Input() token:string;
    principal:string ="btn-default";
    secundario:string="btn-primary active";
    time:string ="";


    constructor (private iotService: IOTService, private el: ElementRef) { }

    ngOnInit() {
        this.getInfo();
        $(this.el.nativeElement.querySelector('#checkbox')).bootstrapSwitch();
        $('.selectpicker').selectpicker({
            size: 4
        });

        let timer = Observable.timer(1000,1000);
        timer.subscribe(t=>this.time = this.startTime());
    }

    startTime() {
        var today = new Date();
        var h = today.getHours();
        var m = today.getMinutes();
        var s = today.getSeconds();
        var i,j;
        if (m < 10) i = "0" + m;
        else i = m;
        if (s < 10) j = "0" + s;
        else j = s;
        return h + ":" + i + ":" + j;
    }


    getInfo() {
        this.iotService.getInfo(this.token)
            .subscribe(
                info => {this.info = info; this.isLoaded(); },
                error =>  this.errorMessage = <any>error);
    }

    isLoaded() {
        console.log("hola");
        console.log(this.info.s);
        this.loaded = true;
        this.eventLoaded.emit("info");
        $(this.el.nativeElement.querySelector('#checkbox')).bootstrapSwitch('state', this.info.s);
        $('.selectpicker').selectpicker('val', this.info.t==0 ? "Schedulable" : "Real time");
        $(this.el.nativeElement.querySelector('#checkbox')).on('switchChange.bootstrapSwitch', () => {this.toggleStatus();});
        $('.selectpicker').on('change', () => { this.toggleStatusMode(); });

    }

    toggleStatus(){
        console.log("toggled");
        this.info.s = this.info.s == 1 ? 0 : 1;
        this.iotService.updateState(this.token, this.info)
            .subscribe();
    }

    toggleStatusMode(){
        console.log("toggledMode");
        this.info.t = this.info.t == 1 ? 0 : 1;
        this.iotService.updateState(this.token, this.info)
            .subscribe();
    }

    @Output() eventLoaded = new EventEmitter();
}