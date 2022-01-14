
    import { TransformKeyNames } from "src/providers/transformKeyNames";
    // import { TransformKeyNames } from '../transformKeyNames';
    export class ReadmoreModel {
     
      success: boolean;
      totalcourses: number;
     
      news: ReadModel[];
    
      private transform = new TransformKeyNames();
      constructor(readmore?: any) {
    
            // Transform all underscore keynames to camelCase
        if (readmore) {
                // tslint:disable-next-line:max-line-length
          const flattenedsubject = this.transform.fromUnderscoreToCamelCase(readmore);
                // console.log('The flattenedEvents object is:', flattenedEvents);
          const flattendedObjectKeys = Object.keys(flattenedsubject);
          flattendedObjectKeys.forEach((key) => {
            const object = flattenedsubject[key];
            if (key === 'news' && object) {
              const temp = [];
              object.forEach((i) => {
                temp.push(new ReadModel(i));
              });
              this[key] = temp;
           
            } else this[key] = object;
          });
                // console.log('The Events is:', this);
        }
      }
    }
    
    
    
    
    
    
    
    export class ReadModel {
        id: number;
        name: string;
       
      
        private transform = new TransformKeyNames();
        constructor(readmore?: any) {
      
              // Transform all underscore keynames to camelCase
          if (readmore) {
                  // tslint:disable-next-line:max-line-length
            const flattenedsubject = this.transform.fromUnderscoreToCamelCase(readmore);
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
      