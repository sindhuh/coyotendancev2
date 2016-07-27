import { Component } from '@angular/core';
import {Page, NavParams, NavController} from 'ionic-angular';
import {AddEditCoursePage} from '../add-edit-course/add-edit-course';
import {Backend} from '../../providers/backend/backend';
//import {CORE_DIRECTIVES, FORM_DIRECTIVES, NgClass} from '@angular/common';
//import {CHART_DIRECTIVES} from '../../../ng2-charts';
import {AttendanceTabsPage} from '../attendance-tabs/attendance-tabs';
import {PreviousAttendanceDatesPage} from '../previous-attendance-dates/previous-attendance-dates';


@Component({
  templateUrl: 'build/pages/course-details/course-details.html',
 // directives: [CHART_DIRECTIVES, NgClass, CORE_DIRECTIVES, FORM_DIRECTIVES]
})

export class CourseDetailsPage {
  public doughnutChartLabels:string[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  public doughnutChartData:number[] = [350, 450, 100];
  public doughnutChartType:string = 'doughnut';
  course: any;
  enrolledStudents: any[] = [];
  professor: any;
  courseId: any;
  constructor(public nav: NavController, public backend: Backend, public navParams: NavParams) {
    this.course = {};
    this.professor = {};
    //this.doughnutChartData = [350, 450, 100];
    this.courseId = this.navParams.get('id');
  }
  // events
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
        this.professor = course.users[course.professorID];
        this.enrolledStudents = course.students.map(studentId => course.users[studentId]);  
        this.course = course;
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
