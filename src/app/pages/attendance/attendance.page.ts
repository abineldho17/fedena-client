import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Attendance } from 'src/providers/attendance';
import {AttendanceModel} from 'src/models/attendance'
import {BatchesModel } from 'src/models/batches'
// import { CourseModel } from 'src/models/course';
import{SubjectsModel} from 'src/models/subjects'

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.page.html',
  styleUrls: ['./attendance.page.scss'],
})
export class AttendancePage implements OnInit {
  full_detail = [];
  batch_detail = [];
  subjects_detail = [];
  batches: string;
  subjects: string;
  subjectAPI= '';



  courses = [];
  batchesz = [];
  coursesData: any;
  batchData: any;
  subjectData: any;
  subjectz = [];
  

  //  api_url ="https://fconnect.fedena.org/api/";
  ;
  constructor(private http: HttpClient, private attendanceService: Attendance) { }

  ngOnInit() {
    
  }
  Course: any = {
    header: 'Course',
    
  };

  Batch: any = {
    header: 'Batch',
    
  };

  Subjects: any = {
    header: 'Subjects',
   
  };
  getCourse() {
    this.attendanceService.getCourse().subscribe(
   
      (res: any) => {
        // this.coursesData = new AttendanceModel(res);
// console.log(this.coursesData);
        if (res.courses && res.courses != null) {




          res.courses.forEach(i => {
            this.courses.push(new AttendanceModel(i));
          });


          console.log(this.courses);


          console.log(this.full_detail);
          // for (let courses of res.courses) {

            // this.coursesData = new CourseModel(res);
            // this.courses = this.coursesData.courses;

            // this.full_detail.push(courses);

          // }

        }

      }, error => {
        console.log(error);
      })
  }



  selectedCourse(course) {

    // let courseAPI = course.target.value
     window.localStorage.setItem("course_id", course.target.value);
    this.batches = '';
    this.subjects = '';
    this.batch_detail = [];
    this.batchesz=[];
    
    this.attendanceService. getBatches().subscribe(
      (res: any) => {

        // this.batchData = new BatchesModel(res);
        // console.log(this.batchData);
        if (res.batches && res.batches != null) {




          res.batches.forEach(i => {
            this.batchesz.push(new BatchesModel(i));
          });


          
          // console.log(this.batch_detail);
          // for (let batches of res.batches) {

            // this.batchData = new BatchModel(res);
            // this.batchesz = this.batchData.batches;
            // this.batch_detail.push(batches);


          // }

        }


      }, error => {
        console.log(error);
      })

  }


  selectedBatch(batches) {
    
    // this.subjectAPI = batches.target.value
     window.localStorage.setItem("batch_id", batches.target.value);
    this.subjects = '';

  }


  getSubjects() {
   
    this.subjects_detail = [];
    this.subjectz = [];
    
    this.attendanceService. getSubjects().subscribe(
      (res: any) => {

        // this.subjectData = new SubjectsModel(res);
        // console.log(this.subjectData);
        if (res.subjects && res.subjects != null) {
        


          res.subjects.forEach(i => {
            this.subjectz.push(new SubjectsModel(i));
          });



          // for (let subjects of res.subjects) {

            // console.log(courses);
            //  console.log(courses.id);

            // this.subjectData = new SubjectModel(res);
            // this.subjectz = this.subjectData.subjects;
            // this.subjects_detail.push(subjects);
            // console.log(subjects.name);


          // }


          // this.batch_detail.push(res.batches );

          //console.log(this.batch_detail.batch_name);

        }





      }, error => {
        console.log(error);
      })




  }

  onChange(deviceValue) {
    console.log(deviceValue);
  }
}

