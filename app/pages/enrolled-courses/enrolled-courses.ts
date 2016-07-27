import { Component } from '@angular/core';
import {Page, ActionSheet, Platform, Alert, NavController, Loading} from 'ionic-angular';
import {AuthPage} from "../auth/auth"
import {Backend} from '../../providers/backend/backend';
import {CourseDetailsPage} from '../course-details/course-details';

@Component({
  templateUrl: 'build/pages/enrolled-courses/enrolled-courses.html',
})

export class EnrolledCoursesPage {
  enrolledCourses: any[];
  courseTimings: any[];
  studentData: any;
  constructor(public nav: NavController, public platform: Platform, public backend: Backend) {
    this.backend.enrolledCourses(this.backend.userDetails._id)
      .then(enrolledCourses => {
        this.enrolledCourses = enrolledCourses;
        console.log("reaching here : -1", this.enrolledCourses);
    this.studentData = this.backend.userDetails;
    var date = new Date();
    var todayDate = "date" + (date.getMonth() + 1) + "_" + date.getDate() + "_" + date.getFullYear();
    for (var course of this.enrolledCourses) {
      console.log("reaching here : 0");
      if (course.dateAndAttendance[todayDate] != undefined) {
        console.log("reaching here : 1");
        this.courseTimings = course.timings;
        var data = this.backend.getCourseTiming(this.courseTimings);
        var startTime = new Date(date.getFullYear(), date.getMonth(), date.getDate(),
          data.startTime.split(":")[0], data.startTime.split(":")[1]);
        var endTime = new Date(date.getFullYear(), date.getMonth(), date.getDate(),
          data.endTime.split(":")[0], data.endTime.split(":")[1]);
        if ((new Date()).getTime() >= startTime.getTime() && (new Date()).getTime() < endTime.getTime()) {
          console.log("reaching here : 2");
          if (course.dateAndAttendance[todayDate].length == 0) {
            console.log("reaching here : 3");
            course.markAttendanceButton = null;
          }
          for (var i = 0; i < course.dateAndAttendance[todayDate].length; i++) {
            console.log(course.dateAndAttendance[todayDate][i], this.studentData._id);
            if (course.dateAndAttendance[todayDate][i] == this.studentData._id) {
              console.log("reaching here : 4");
              course.markAttendanceButton = true;
              break;
            } else {
              console.log("reaching here : 5");
              course.markAttendanceButton = null;
            }
          }
        } else {
          console.log("reaching here : 6");
          course.markAttendanceButton = true;
        }
      }
    }
      });
  }
  ionViewWillEnter() {
   
  }

  viewCourse(course) {
    this.nav.push(CourseDetailsPage, { id: course._id })
  }

  dropCourse(course) {
    let dropConfirm = Alert.create({
      title: 'Drop Course',
      message: 'Are you sure you want to drop this class?',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Drop',
          handler: () => {
            this.backend.dropCourse(course._id).then(function () {
              console.log("successfully dropped");
            });
          }
        }
      ]
    });
    this.nav.present(dropConfirm);
  }

  markAttendance(course) {
    let loading = Loading.create({
      content: 'Please wait...'
    });
    this.nav.present(loading);
    var userDetails = this.backend.userDetails;
    var studentData = {
      id: userDetails._id,
      name: userDetails.name,
      coyoteId: userDetails.coyoteID
    }
    this.backend.markAttendance(course._id, this.backend.userDetails._id).then(data => {
      setTimeout(() => {
        loading.dismiss();
      });
      let alert = Alert.create({
        title: "Hi " + userDetails.name + "!",
        subTitle: "Your attendance has recorded successfully!",
        buttons: ['OK']
      });
      this.nav.present(alert);
      course.markAttendanceButton = true;
    });
  }
  logOut() {
    this.backend.logout();
    this.nav.push(AuthPage);
    this.enrolledCourses = [];
  }
}
