import { Component } from '@angular/core';
import {Page, NavController, NavParams} from 'ionic-angular';
import {Backend} from '../../providers/backend/backend';
import {AbsentStudentsPage} from '../absent-students/absent-students'
import {PresentStudentsPage} from '../present-students/present-students'


@Component({
  templateUrl: 'build/pages/attendance-tabs/attendance-tabs.html',
})

export class AttendanceTabsPage {
  courseId : any;
  tab1Root: any = PresentStudentsPage;
  tab2Root: any = AbsentStudentsPage;
  
  constructor(public nav: NavController, public backend: Backend, public navParams: NavParams) {
    this.courseId = this.navParams.get('id');
  }
}
