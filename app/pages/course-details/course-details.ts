import { Component } from '@angular/core';
import {Page, NavParams, NavController, Platform, Alert} from 'ionic-angular';
import {Geolocation} from 'ionic-native'
import {AddEditCoursePage} from '../add-edit-course/add-edit-course';
import {Backend} from '../../providers/backend/backend';
import {AttendanceTabsPage} from '../attendance-tabs/attendance-tabs';
import {PreviousAttendanceDatesPage} from '../previous-attendance-dates/previous-attendance-dates';



@Component({
  templateUrl: 'build/pages/course-details/course-details.html',
})

export class CourseDetailsPage {
  absentStudentsCount: any;
  presentStudentsCount: any;
  course: any;
  enrolledStudents: any[] = [];
  professor: any;
  isProfessor : boolean;
  courseId: any;
  attendanceDate: any;
  constructor(public nav: NavController, public backend: Backend, public navParams: NavParams, public platform: Platform) {
    this.course = {};
    this.professor = {};
    this.courseId = this.navParams.get('id');
    var date = new Date();
    this.attendanceDate = "date" + (date.getMonth() + 1) + "_" + date.getDate() + "_" + date.getFullYear();
    
  }
  public chartClicked(e: any): void {
  }
  public chartHovered(e: any): void {
  }

  editClass() {
    this.nav.push(AddEditCoursePage, { id: this.course._id });
  }

  ionViewWillEnter() {
    this.isProfessor = this.backend.userDetails.isProfessor;
    if (this.courseId != undefined) {
      this.backend.getCourseForced(this.courseId, true).then(course => {
        this.professor = course.users[course.professorID];
        this.enrolledStudents = course.students.map(studentId => course.users[studentId]);
        this.course = course;
      });
    }
  }

  showTodayAttendance(course) {
    if(course.dateAndAttendance[this.attendanceDate] == undefined) {
      let alert = Alert.create({
          title: "Sorry!",
          subTitle: "No class today to show the attendance. You can check previous class attendance.",
          buttons: ['OK']
        });
        this.nav.present(alert);
    } else {
    this.nav.push(AttendanceTabsPage, { id: this.course._id, date : this.attendanceDate});
    }
  }

  showPreviousAttendance() {
    this.nav.push(PreviousAttendanceDatesPage, { id: this.course._id });
  }
}
