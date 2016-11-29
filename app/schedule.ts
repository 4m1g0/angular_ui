/*
 schedule.ts - Class to represent schedules
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

export class Schedule {
    startTime:string;
    startDate:string;
    startDateValue:string;
    endTime:string;
    nextDay:string;
    duration: string;
    repeat:string;
    id:number;
    durationValue:string;
    endDate:string;

    constructor(s:any) {
        var end = s.s + s.i;
        this.id = s.id;
        this.startDate = this.toDate(s.s);
        this.startTime = this.toTime(s.s);
        this.endTime = this.toTime(end);
        this.nextDay = this.toDateDiff(s.s, end);
        this.duration = this.toDuration(s.d);
        this.repeat = this.toRepeatString(s.r);
        this.startDateValue = this.toDateInputValue(s.s);
        this.durationValue = this.toTime(s.d);
        this.endDate = this.getEndDate(this.startTime, this.endTime);
    }

    copyFrom(origin:Schedule) {
        this.id = origin.id;
        this.startDate = origin.startDate;
        this.startTime = origin.startTime;
        this.endTime = origin.endTime;
        this.nextDay = origin.nextDay;
        this.duration = origin.duration;
        this.repeat = origin.repeat;
        this.startDateValue = origin.startDateValue;
        this.durationValue = origin.durationValue;
        this.endDate = origin.endDate;
    }

    dateFromUnixTimestamp(timestamp) {
        return new Date((timestamp + new Date().getTimezoneOffset()* 60)*1000)
    }

    validate(){
        var d = new Date(this.startDateValue);
        this.startDate = this.toDate(this.toUnixTimestamp(d));


        var s = this.toSchedule();
        if (s.i > 86400) // interval > 24h
            return 0;

        if (s.d > 86400) // duration > 24h
        if (s.d > 86400) // duration > 24h
            return 0;

        this.duration = this.toDuration(this.fromTimeValue(this.durationValue));
        this.nextDay = this.toDateDiff(s.s, s.s + s.i);

        return 1;
    }

    toSchedule() {
        var start = this.fromDateValue(this.startDateValue) + this.fromTimeValue(this.startTime);
        var end =  this.fromDateValue(this.startDateValue) + this.fromTimeValue(this.endTime)
        if (this.endTime < this.startTime)
            end += 86400; // 1d (next day)

        return {
            "id":this.id,
            "s":start,
            'i':end-start,
            'd':this.fromTimeValue(this.durationValue),
            'r':this.fromRepeatString(this.repeat)
        };
    }

    updateEndDate() {
        this.endDate = this.getEndDate(this.startTime, this.endTime);
    }

    fromRepeatString(value){
        if (value == "Weekly")
            return 60 * 60 * 24 * 7;

        if (value == "Daily")
            return 60 * 60 * 24;

        if (value == "Hourly")
            return 60 * 60;

        return 0;
    }

    fromDateValue(value){
        var date = new Date(value);
        date.setSeconds(date.getSeconds() + date.getTimezoneOffset()*60);
        return this.toUnixTimestamp(date);
    }

    fromTimeValue(value){
        var date = new Date("1970-01-01" + " " + value);
        date.setSeconds(date.getSeconds() + (date.getTimezoneOffset()+60)*60);
        return this.toUnixTimestamp(date);
    }

    getEndDate(start, end){
        return (end < start) ? "Next day" : "Same day";
    }

    toUnixTimestamp(date) {
        if (date == null)
            return 0;

        var d = new Date(date);
        return (d.getTime() - (d.getTimezoneOffset() * 60 * 1000)) / 1000;
    }

    toDate(timestamp){
        var d = this.dateFromUnixTimestamp(timestamp);
        var month = '' + (d.getMonth() + 1);
        var day = '' + d.getDate();
        var year = '' + d.getFullYear();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        return [day, month, year].join('-');
    }

    toTime(timestamp){
        var hour = '' + Math.floor((timestamp % 86400) / 3600);
        var minute = '' + Math.floor((timestamp  % 3600) / 60);

        if (hour.length < 2) hour = '0' + hour;
        if (minute.length < 2) minute = '0' + minute;

        return [hour, minute].join(':');
    }

    toDateTime(timestamp) {
        var date = this.toDate(timestamp);
        var time = this.toTime(timestamp);
        return [date, time].join(' ');
    }

    toDateDiff(start, end) {
        return (this.toDate(start) != this.toDate(end)) ? "(next day)" : "";
    }

    toDuration(timestamp){
        var hours = Math.floor(timestamp / (60 * 60));
        var minutes = Math.floor(timestamp % (60 * 60) / 60);

        var result = '';
        if (hours > 0) result += hours + 'h ';

        if (minutes > 0) result += minutes + 'm';

        return result;
    }

    toRepeatString(timestamp){
        if (timestamp >= 60 * 60 * 24 * 7)
            return "Weekly";

        if (timestamp >= 60 * 60 * 24)
            return "Daily";

        if (timestamp >= 60 * 60)
            return "Hourly";

        return "Don't repeat";
    }

    toDateInputValue(timestamp) {
        if (timestamp == null)
            return "";
        var date = this.dateFromUnixTimestamp(timestamp);
        return date.toJSON().slice(0,10);
    }

}
