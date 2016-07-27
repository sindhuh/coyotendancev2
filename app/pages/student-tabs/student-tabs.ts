import { Component } from '@angular/core';
import {Page, NavController} from 'ionic-angular';
import {EnrolledCoursesPage} from "../enrolled-courses/enrolled-courses";
import {AvailableCoursesPage} from "../available-courses/available-courses"

@Component({
  templateUrl: 'build/pages/student-tabs/student-tabs.html',
})

export class StudentTabsPage {
  tab1Root: any = EnrolledCoursesPage;
  tab2Root: any = AvailableCoursesPage;
 
  constructor(public nav: NavController) {
    
  }
}
