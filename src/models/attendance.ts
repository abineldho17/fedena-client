import { TransformKeyNames } from "src/providers/transformKeyNames";
// import { TransformKeyNames } from '../transformKeyNames';
export class AttendanceModel {
 
  success: boolean;
  totalcourses: number;
  courses: CourseModel[];
  // batches: BatchModel[];
  // subjects: SubjectModel[];

  private transform = new TransformKeyNames();
  constructor(attendance?: any) {

        // Transform all underscore keynames to camelCase
    if (attendance) {
            // tslint:disable-next-line:max-line-length
      const flattenedAttendance = this.transform.fromUnderscoreToCamelCase(attendance);
            // console.log('The flattenedEvents object is:', flattenedEvents);
      const flattendedObjectKeys = Object.keys(flattenedAttendance);
      flattendedObjectKeys.forEach((key) => {
        const object = flattenedAttendance[key];
        if (key === 'courses' && object) {
          const temp = [];
          object.forEach((i) => {
            temp.push(new CourseModel(i));
          });
          this[key] = temp;
        
        } else this[key] = object;
      });
            // console.log('The Events is:', this);
    }
  }
}

export class CourseModel {
  id: number;
  courseName: string;
  name: string;
 

  private transform = new TransformKeyNames();
  constructor(attendance?: any) {

        // Transform all underscore keynames to camelCase
    if (attendance) {
            // tslint:disable-next-line:max-line-length
      const flattenedAttendance = this.transform.fromUnderscoreToCamelCase(attendance);
            // console.log('The flattenedEvents object is:', flattenedEvents);
      const flattendedObjectKeys = Object.keys(flattenedAttendance);
      flattendedObjectKeys.forEach((key) => {
        const object = flattenedAttendance[key];
        this[key] = object;
                // console.log('The Events is:', this);
      });
    }
  }
}


