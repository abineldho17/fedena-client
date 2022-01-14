import { TransformKeyNames } from "src/providers/transformKeyNames";
export class AlbumModel {
  albumName: string;
  currentPage: number;
  totalImages: number;
  photos: PhotosModel[];
  success: boolean;
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
        if (key === 'photos' && object) {
          const temp = [];
          object.forEach((i) => {
            temp.push(new PhotosModel(i));
          });
          this[key] = temp;
        } else this[key] = object;
                  // console.log('The Events is:', this);
      });
    }
  }
}

export class PhotosModel {
  description: string;
  id: number;
  photoUrl: string;
  photoUrlThumb: string;
  private transform = new TransformKeyNames();
  constructor(photo?: any) {
          // Transform all underscore keynames to camelCase
    if (photo) {
              // tslint:disable-next-line:max-line-length
      const flattenedPhoto = this.transform.fromUnderscoreToCamelCase(photo);
              // console.log('The flattenedEvents object is:', flattenedEvents);
      const flattendedObjectKeys = Object.keys(flattenedPhoto);
      flattendedObjectKeys.forEach((key) => {
        const object = flattenedPhoto[key];
        this[key] = object;
                  // console.log('The Events is:', this);
      });
    }
  }
}
