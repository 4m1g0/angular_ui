import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule, JsonpModule } from '@angular/http';

import { AppComponent }  from './app.component';
import {FormsModule} from "@angular/forms";
import {SchedulesComponent} from "./schedules.component";

@NgModule({
    imports:      [ BrowserModule, HttpModule, JsonpModule, FormsModule ],
    declarations: [ AppComponent, SchedulesComponent ],
    bootstrap:    [ AppComponent ]
})
export class AppModule { }