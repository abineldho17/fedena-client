import { TransformKeyNames } from "src/providers/transformKeyNames";
// import { TransformKeyNames } from '../transformKeyNames';
export class BatchesModel {
 
  success: boolean;
  totalbatches: number;
 
  batches: BatchModel[];


  private transform = new TransformKeyNames();
  constructor(batch?: any) {

        // Transform all underscore keynames to camelCase
    if (batch) {
            // tslint:disable-next-line:max-line-length
      const flattenedbatch = this.transform.fromUnderscoreToCamelCase(batch);
            // console.log('The flattenedEvents object is:', flattenedEvents);
      const flattendedObjectKeys = Object.keys(flattenedbatch);
      flattendedObjectKeys.forEach((key) => {
        const object = flattenedbatch[key];
        if (key === 'batches' && object) {
          const temp = [];
          object.forEach((i) => {
            temp.push(new BatchModel(i));
          });
          this[key] = temp;
       
        } else this[key] = object;
      });
            // console.log('The Events is:', this);
    }
  }
}



export class BatchModel {
    id: number;
    name: string;
   
  
    private transform = new TransformKeyNames();
    constructor(batch?: any) {
  
          // Transform all underscore keynames to camelCase
      if (batch) {
              // tslint:disable-next-line:max-line-length
        const flattenedbatch = this.transform.fromUnderscoreToCamelCase(batch);
              // console.log('The flattenedEvents object is:', flattenedEvents);
        const flattendedObjectKeys = Object.keys(flattenedbatch);
        flattendedObjectKeys.forEach((key) => {
          const object = flattenedbatch[key];
          this[key] = object;
                  // console.log('The Events is:', this);
        });
      }
    }
  }
  


  