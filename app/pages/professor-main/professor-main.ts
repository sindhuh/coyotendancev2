import { Component } from '@angular/core';
import { Platform, Alert, Page, ActionSheet, NavController, Loading} from 'ionic-angular';
import {Backend} from '../../providers/backend/backend';
import {AddEditCoursePage} from '../add-edit-course/add-edit-course';
import {LoginPage} from '../login/login';
import {CourseDetailsPage} from '../course-details/course-details';
import {Geolocation} from 'ionic-native'

@Component({
  templateUrl: 'build/pages/professor-main/professor-main.html',
})

export class ProfessorMainPage {
  courses: any[];
  locations: any[];
  professorLocation: {};
  constructor(public nav: NavController, public backend: Backend, public platform: Platform) {
    this.backend.initialize(this.backend.userDetails._id).then(success => {
      if (success) {
        this.backend.loadCourses(this.backend.userDetails._id).then(courses => {
          this.courses = courses;
          var date = new Date();
          var todayDate = "date" + (date.getMonth() + 1) + "_" + date.getDate() + "_" + date.getFullYear();
          for (var course of this.courses) {
            console.log("course name :", course.name);
            if (course.dateAndAttendance[todayDate] != undefined) {
              var courseTime = this.backend.getTodayTimeAndDateFromTimings(course.timings);
              var startTime = new Date(date.getFullYear(), date.getMonth(), date.getDate(),
                courseTime.startTime.split(":")[0], courseTime.startTime.split(":")[1]);
              var endTime = new Date(date.getFullYear(), date.getMonth(), date.getDate(),
                courseTime.endTime.split(":")[0], courseTime.endTime.split(":")[1]);
              console.log((new Date()).getTime(), startTime, startTime.getTime(), endTime, endTime.getTime())
              if ((new Date()).getTime() >= startTime.getTime() && (new Date()).getTime() < endTime.getTime()) {
                console.log("reaching attendance: 1");
                course.startAttendanceButton = null;
              } else {
                course.startAttendanceButton = true;
                console.log("reaching attendance: 2");

              }
            } else {
              course.startAttendanceButton = true;
              console.log("reaching attendance: 3");
            }
          }
        });
      }
    });
  }

  startAttendance(course) {
    let loading = Loading.create({
      content: 'Please wait...'
    });
    this.nav.present(loading);
    this.backend.getLocation().then(location => {
      this.backend.setLocation(location, course._id).then(data => {
        setTimeout(() => {
          loading.dismiss();
        });
        let alert = Alert.create({
          subTitle: "You can start attendance now!",
          buttons: ['OK']
        });
        this.nav.present(alert);
        course.startAttendanceButton = true
      })
    });
  }

  addCourse() {
    this.nav.push(AddEditCoursePage);
  }

  viewCourse(course) {
    this.nav.push(CourseDetailsPage, { id: course._id })
  }

  deleteCourse(course) {
    let dropConfirm = Alert.create({
      title: 'Delete Course',
      message: 'Are you sure you want to delete this class?',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Delete',
          handler: () => {
            this.backend.deleteCourse(course._id).then(function () {
              console.log("successfully dropped");
            });
          }
        }
      ]
    });
    this.nav.present(dropConfirm);
  }

  editCourse(course) {
    this.nav.push(AddEditCoursePage, { id: course._id });
  }
}
