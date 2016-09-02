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
        console.log("id;");
        console.log(s.id);
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

    toSchedule() {
        var start = this.fromDateValue(this.startDateValue) + this.fromTimeValue(this.startTime);
        var end =  this.fromDateValue(this.startDateValue) + this.fromTimeValue(this.endTime)
        if (this.endTime < this.startTime)
            end += 86400; // 1d (next day)

        console.log("toSchedule");
        console.log(start);
        console.log(this.startDateValue);
        console.log(this.startTime);
        console.log(end);
        console.log(this.endDate);
        console.log(this.endTime);
        console.log("id");
        console.log(this.id);
        return {
            "id":this.id,
            "s":start,
            'i':end,
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
        return this.toUnixTimestamp(date);
    }

    fromTimeValue(value){
        var date = new Date("1970-01-01" + " " + value);
        return this.toUnixTimestamp(date);
    }

    getEndDate(start, end){
        return (end < start) ? "Next day" : "Same day";
    }

    toUnixTimestamp(date) {
        if (date == null)
            return 0;
        return new Date(date).getTime()/1000;
    }

    toDate(timestamp){
        var d = new Date(timestamp*1000);
        var month = '' + (d.getMonth() + 1)
        var day = '' + d.getDate()
        var year = '' + d.getFullYear()

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        return [day, month, year].join('-');
    }

    toTime(timestamp){
        var d = new Date(timestamp * 1000);
        var hour = '' + d.getHours();
        var minute = '' + d.getMinutes();

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
        if (timestamp > 60 * 60 * 24 * 7)
            return "Weekly";

        if (timestamp > 60 * 60 * 24)
            return "Daily";

        if (timestamp > 60 * 60)
            return "Hourly";

        return "Don't repeat";
    }

    toDateInputValue(timestamp) {
        if (timestamp == null)
            return "";
        var date = new Date(timestamp * 1000);
        return date.toJSON().slice(0,10);
    }

}