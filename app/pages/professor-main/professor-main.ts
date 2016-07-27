import { Component } from '@angular/core';
import { Platform, Alert, Page, ActionSheet, NavController } from 'ionic-angular';
import {Backend} from '../../providers/backend/backend';
import {AddEditCoursePage} from '../add-edit-course/add-edit-course';
import {AuthPage} from '../auth/auth';
import {CourseDetailsPage} from '../course-details/course-details';

@Component({
  templateUrl: 'build/pages/professor-main/professor-main.html',
})

export class ProfessorMainPage  {
  courses: any[];
  locations : any[];
  constructor(public nav: NavController, public backend: Backend, public platform: Platform) {
    this.backend.initialize(this.backend.userDetails._id).then(success => {
      if (success) {
        this.backend.loadCourses(this.backend.userDetails._id).then(courses => {       
          this.courses = courses;  
        });
      }
    });
  }
  
  addCourse() {
    this.nav.push(AddEditCoursePage);
  }
  
  viewCourse(course) {
    this.nav.push(CourseDetailsPage, { id: course._id })
  }
 
  deleteCourse(course){
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
  
  logOut() {
    this.backend.logout();
    this.nav.push(AuthPage);
  }
  
  editCourse(course) {
    this.nav.push(AddEditCoursePage, {id: course._id});
  }
}
  