import { Component } from '@angular/core';
import {Page, ActionSheet, Platform, Alert, NavController, Loading} from 'ionic-angular';
import {LoginPage} from "../login/login"
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
        this.studentData = this.backend.userDetails;
        var date = new Date();
        var todayDate = "date" + (date.getMonth() + 1) + "_" + date.getDate() + "_" + date.getFullYear();
        for (var course of this.enrolledCourses) {
          var differenceBetweenTimes = ((new Date()).getTime()) - parseInt(course.startAttendanceTime)
          if (differenceBetweenTimes / 1000 / 60 < 15) {
            console.log(course.dateAndAttendance[todayDate].length);
            if (course.dateAndAttendance[todayDate].length == 0) {
              course.markAttendanceButton = null;
            } else {
              for (var i = 0; i < course.dateAndAttendance[todayDate].length; i++) {
                console.log(course.dateAndAttendance[todayDate][i], this.studentData._id)
                if (course.dateAndAttendance[todayDate][i] == this.studentData._id) {
                  course.markAttendanceButton = true;
                  console.log("reaching 3")
                  break;
                } else {
                  course.markAttendanceButton = null;
                  console.log("reaching 4")
                }
              }
            }
          } else {
            course.markAttendanceButton = true;
            console.log("reaching 2");
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
    this.backend.getLocation().then(location => {
      this.backend.markAttendance(course._id, location).then(data => {
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
    })
  }

  logOut() {
    this.backend.logout();
    this.nav.push(LoginPage);
    this.enrolledCourses = [];
  }
}