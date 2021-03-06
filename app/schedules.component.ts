/*
 schedules.component.ts - Schedules component of angular2
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

import {Component, OnInit, Input, EventEmitter, Output} from '@angular/core';
import {IOTService} from "./IOT.service";
import {Schedule} from "./schedule";
declare var $:any;

@Component({
    selector: 'schedules',
    templateUrl: 'app/schedules.component.html',
    providers: [IOTService],
})

export class SchedulesComponent implements OnInit {
    loaded:boolean = false;
    @Input() token:string;
    errorMessage:string;
    schedules:Schedule[];
    model:Schedule = new Schedule({"r":0});

    constructor (private iotService: IOTService) { }

    ngOnInit() {
        this.getSchedules();
        $('[data-toggle="tooltip"]').tooltip();
        $('#schedule-repeat').selectpicker({
            size: 4
        });
    }

    getSchedules() {
        this.iotService.getSchedules(this.token)
            .subscribe(
                schedules => {
                    this.schedules = schedules.map(schedule => new Schedule(schedule));
                    this.isLoaded();
                },
                error =>  this.errorMessage = <any>error);
    }

    isLoaded() {
        this.loaded = true;
        this.eventLoaded.emit("schedules");
    }

    add() {
        this.model = new Schedule({});
        $('#schedule-repeat').selectpicker('val', "Don't repeat");
    }

    mod(schedule){
        this.model.copyFrom(schedule);
        $('#schedule-repeat').selectpicker('val', this.model.repeat);
    }

    addOrUpdate() {
        this.model.repeat = $('#schedule-repeat').find("option:selected").text();
        if (!this.model.validate())
        {
            alert("Los datos no son correctos");
            return;
        }

        var schedule = this.model.toSchedule();

        if (this.model.id == null){
            this.iotService.addSchedule(this.token, schedule)
                .subscribe(object => this.updateScheduleInfo(schedule, object));

        }
        else{
            this.iotService.updateSchedule(this.token, schedule)
                .subscribe(() => this.findAndUpdate(schedule));
        }
    }

    delete(){
        this.iotService.deleteSchedule(this.token, this.model.id)
            .subscribe(() => this.findAndDelete(this.model.id));
    }

    updateScheduleInfo(schedule, object) {
        this.model.id = object.id;
        this.schedules.push(this.model);
    }

    findAndUpdate(schedule){
        for (var i = 0; i < this.schedules.length; i++) {
            if (this.schedules[i].id == schedule.id)
                this.schedules[i] = new Schedule(schedule);
        }
        //this.schedules = this.schedules.slice();
    }

    findAndDelete(id){
        for (var i = 0; i < this.schedules.length; i++) {
            if (this.schedules[i].id == id)
                this.schedules.splice(i, 1);
        }
    }


    @Output() eventLoaded = new EventEmitter();
}
