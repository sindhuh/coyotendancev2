import { Component } from '@angular/core';
import {Page, NavController, NavParams} from 'ionic-angular';
import {Backend} from '../../providers/backend/backend';
import {ShowAttendanceOfDatePage} from '../show-attendance-of-date/show-attendance-of-date';

@Component({
  templateUrl: 'build/pages/previous-attendance-dates/previous-attendance-dates.html',
})
export class PreviousAttendanceDatesPage {
  courseId : any;
  courseDates: any[] = [];
  monthNames: any[] = [];
  constructor(public nav: NavController , public backend: Backend, public navParams: NavParams) {
    this.courseId = this.navParams.get('id');
    this.monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  }
  ionViewWillEnter() {
    var date = "";
    if ( this.courseId != undefined) {
      this.backend.getCourse( this.courseId).then(course => {
        for(var key in course.dateAndAttendance) {
          var date = key.split("_");
          key = this.monthNames[parseInt(date[0].split("").pop()) - 1] + " " +  date[1] + " " +date[2];
          this.courseDates.push(key);
        }
      })
    } 
  }
  showAttendance(date) {
    date = date.split(" ");
    var key = "date" + (this.monthNames.indexOf(date[0]) + 1) + "_" + date[1] + "_" +date[2]; 
    console.log("showAttendance : " ,date);
    this.nav.push(ShowAttendanceOfDatePage, { id: this.courseId, date : key});
  }
}
