import { TransformKeyNames } from "src/providers/transformKeyNames";
// import { TransformKeyNames } from '../transformKeyNames';
export class GalleryModel {
  currentPage: number;
  success: boolean;
  totalAlbums: number;
  albums: AlbumModel[];

  private transform = new TransformKeyNames();
  constructor(gallery?: any) {

        // Transform all underscore keynames to camelCase
    if (gallery) {
            // tslint:disable-next-line:max-line-length
      const flattenedGallery = this.transform.fromUnderscoreToCamelCase(gallery);
            // console.log('The flattenedEvents object is:', flattenedEvents);
      const flattendedObjectKeys = Object.keys(flattenedGallery);
      flattendedObjectKeys.forEach((key) => {
        const object = flattenedGallery[key];
        if (key === 'albums' && object) {
          const temp = [];
          object.forEach((i) => {
            temp.push(new AlbumModel(i));
          });
          this[key] = temp;
        } else this[key] = object;
      });
            // console.log('The Events is:', this);
    }
  }
}

export class AlbumModel {
  id: number;
  lastImage: string;
  name: string;
  publishedDate: string;
  totalPhotos: number;

  private transform = new TransformKeyNames();
  constructor(gallery?: any) {

        // Transform all underscore keynames to camelCase
    if (gallery) {
            // tslint:disable-next-line:max-line-length
      const flattenedGallery = this.transform.fromUnderscoreToCamelCase(gallery);
            // console.log('The flattenedEvents object is:', flattenedEvents);
      const flattendedObjectKeys = Object.keys(flattenedGallery);
      flattendedObjectKeys.forEach((key) => {
        const object = flattenedGallery[key];
        this[key] = object;
                // console.log('The Events is:', this);
      });
    }
  }
}
