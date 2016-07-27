import { Component } from '@angular/core';
import {Page, NavController, NavParams} from 'ionic-angular';
import {Backend} from '../../providers/backend/backend';
import {ProfessorMainPage} from '../professor-main/professor-main';
//import {CORE_DIRECTIVES, FORM_DIRECTIVES, NgClass} from 'angular2/common';
//import {CHART_DIRECTIVES} from 'ng2-charts/ng2-charts';


@Component({
  templateUrl: 'build/pages/present-students/present-students.html',
})

export class PresentStudentsPage {
  
  courseId: any;
  presentedStudents: any[] = [];
  isThereClassToday: boolean = true;
  constructor(public nav: NavController, public backend: Backend, public navParams: NavParams) {
    this.courseId = this.navParams.data;
  }

  //TODO absent student when deleted not getting added to present students in UI
  ionViewWillEnter() {
    if (this.courseId != undefined) {
      this.backend.getCourse(this.courseId).then(course => {
        //console.log("present : 1  ", course)
        var date = new Date();
        var todayDate = "date" + (date.getMonth() + 1) + "_" + date.getDate() + "_" + date.getFullYear();
        var attendedStudentIds = course.dateAndAttendance[todayDate];
        //console.log("present : 2 ", attendedStudentIds)
        if (!course.dateAndAttendance[todayDate]) {
          this.isThereClassToday = false;
        } else {
          if (attendedStudentIds) {
            this.presentedStudents = attendedStudentIds.map(studentId => course.users[studentId]);
            //console.log("present : 3  ", this.presentedStudents)
          }
        }
      });
    }
  }

  markAsAbsent(student) {
    this.backend.markAsAbsent(this.navParams.data, student._id).then(course => {
        console.log(course);
       var index = this.presentedStudents.findIndex(obj => obj._id == student._id);
       this.presentedStudents.splice(index, 1);
    })
  }

  goBack() {
    this.nav.push(ProfessorMainPage);
  }
}

