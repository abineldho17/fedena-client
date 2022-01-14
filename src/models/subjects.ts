import { TransformKeyNames } from "src/providers/transformKeyNames";
// import { TransformKeyNames } from '../transformKeyNames';
export class SubjectsModel {
 
  success: boolean;
  totalcourses: number;
 
  subjects: SubjectModel[];

  private transform = new TransformKeyNames();
  constructor(subject?: any) {

        // Transform all underscore keynames to camelCase
    if (subject) {
            // tslint:disable-next-line:max-line-length
      const flattenedsubject = this.transform.fromUnderscoreToCamelCase(subject);
            // console.log('The flattenedEvents object is:', flattenedEvents);
      const flattendedObjectKeys = Object.keys(flattenedsubject);
      flattendedObjectKeys.forEach((key) => {
        const object = flattenedsubject[key];
        if (key === 'subjects' && object) {
          const temp = [];
          object.forEach((i) => {
            temp.push(new SubjectModel(i));
          });
          this[key] = temp;
       
        } else this[key] = object;
      });
            // console.log('The Events is:', this);
    }
  }
}







export class SubjectModel {
    id: number;
    name: string;
   
  
    private transform = new TransformKeyNames();
    constructor(subject?: any) {
  
          // Transform all underscore keynames to camelCase
      if (subject) {
              // tslint:disable-next-line:max-line-length
        const flattenedsubject = this.transform.fromUnderscoreToCamelCase(subject);
              // console.log('The flattenedEvents object is:', flattenedEvents);
        const flattendedObjectKeys = Object.keys(flattenedsubject);
        flattendedObjectKeys.forEach((key) => {
          const object = flattenedsubject[key];
          this[key] = object;
                  // console.log('The Events is:', this);
        });
      }
    }
  }
  