import { Component } from '@angular/core';
import {Page, NavParams, NavController} from 'ionic-angular';
import {AddEditCoursePage} from '../add-edit-course/add-edit-course';
import {Backend} from '../../providers/backend/backend';
import {CORE_DIRECTIVES, FORM_DIRECTIVES, NgClass} from '@angular/common';
import {CHART_DIRECTIVES} from 'ng2-charts/ng2-charts';

import {AttendanceTabsPage} from '../attendance-tabs/attendance-tabs';
import {PreviousAttendanceDatesPage} from '../previous-attendance-dates/previous-attendance-dates';


@Component({
  templateUrl: 'build/pages/course-details/course-details.html',
  directives: [CHART_DIRECTIVES, NgClass, CORE_DIRECTIVES, FORM_DIRECTIVES]
})

export class CourseDetailsPage {
  absentStudentsCount : any;
  presentStudentsCount : any;
  public chartLabels:string[] = ['Present Students', 'Absent Students'];
  chartData:number[] = [];
  public chartType:string = 'doughnut';
  course: any;
  enrolledStudents: any[] = [];
  professor: any;
  courseId: any;
  constructor(public nav: NavController, public backend: Backend, public navParams: NavParams) {
    this.course = {};
    this.professor = {};
    this.courseId = this.navParams.get('id');
  }

  public chartClicked(e:any):void {
    console.log(e);
  }
  public chartHovered(e:any):void {
    console.log(e);
  }

  editClass() {
    this.nav.push(AddEditCoursePage, { id: this.course._id });
  }

  ionViewWillEnter() {
    if (this.courseId != undefined) {
      this.backend.getCourseForced(this.courseId, true).then(course => {
        var date = new Date();
        var todayDate = "date" + (date.getMonth() + 1) + "_" + date.getDate() + "_" + date.getFullYear();
        this.professor = course.users[course.professorID];
        this.enrolledStudents = course.students.map(studentId => course.users[studentId]); 
        this.course = course;
        this.chartData.push(this.course.dateAndAttendance[todayDate].length);
        this.chartData.push(this.course.students.length - this.course.dateAndAttendance[todayDate].length);
      });
    }
  }
  
  showTodayAttendance() {
    this.nav.push(AttendanceTabsPage, { id: this.course._id });
  }

  showPreviousAttendance(){
    this.nav.push(PreviousAttendanceDatesPage, { id: this.course._id });
  }
}
