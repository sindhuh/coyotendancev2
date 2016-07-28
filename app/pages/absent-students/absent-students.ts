import { Component } from '@angular/core';
import {Page, NavController, NavParams, Events} from 'ionic-angular';
import {Backend} from '../../providers/backend/backend';
import {StudentTabsPage} from '../student-tabs/student-tabs'
import {ProfessorMainPage} from '../professor-main/professor-main';
import * as _ from 'lodash';
import {CourseDetailsPage} from '../course-details/course-details';

@Component({
  templateUrl: 'build/pages/absent-students/absent-students.html',
})

export class AbsentStudentsPage {
  enrolledStudents: any[] = [];
  absentStudents: any[] = [];
  isThereClassToday: boolean =  true;
  course: any;
  constructor(public nav: NavController, public backend: Backend, public navParams: NavParams, public events: Events)  {
    
  }

  ionViewWillEnter() {
    this.backend.getCourse(this.navParams.data).then(course => {
      console.log(">>> ", course)
      this.course = course;
      var date = new Date();
      var todayDate = "date" + (date.getMonth() + 1) + "_" + date.getDate() + "_" +date.getFullYear(); 
      var attendedStudentIds = course.dateAndAttendance[todayDate];
      var absentStudentIds;
      if(!course.dateAndAttendance[todayDate]) {
          this.isThereClassToday =  false;
          return;
      }
      if (attendedStudentIds) {
        absentStudentIds = _.difference(course.students, attendedStudentIds);
      } else {
        absentStudentIds = course.students;
      }
      console.log("absentStudentIds :", absentStudentIds);
      this.absentStudents = absentStudentIds.map(studentId => course.users[studentId]);
    });
  }

  markAsPresent(student) {
      this.backend.markAttendance(this.navParams.data, student._id).then(data => {
        console.log(data);
        var index = this.absentStudents.findIndex(obj => obj._id == student._id);
        this.absentStudents.splice(index, 1);
      })
  }

  goBack() {
    this.events.publish('professor:main', "");
  }
}
