const DEFAULT_REGEX = /[-_]+(.)?/g;
export class TransformKeyNames {

  constructor() {

  }

  public fromUnderscoreToCamelCase(object: Object) {
    const DEFAULT_REGEX = /[-_]+(.)?/g;
    // Flatten the object
    return this.flattenObject(object);
    // return this.transform(input, '_', DEFAULT_REGEX);
  }

  private transform(str, delimiters, DEFAULT_REGEX) {
    // tslint:disable-next-line:max-line-length
    return str.replace(delimiters ? new RegExp('[' + delimiters + ']+(.)?', 'g') : DEFAULT_REGEX, this.toUpper);
  }

  private toUpper(match, group1) {
    return group1 ? group1.toUpperCase() : '';
  }

  private flattenObject(ob) {

    // tslint:disable-next-line:prefer-const
    let toReturn = {};
    for (const i in ob) {
      if (!ob.hasOwnProperty(i)) continue;
      if (ob[i] && (typeof ob[i]) === 'object' && !Array.isArray(ob[i])) {
        // i is the object key
        const newKey1 = this.transform(i, '_', DEFAULT_REGEX);
        toReturn[newKey1] = {};
        const flatObject = this.flattenObject(ob[i]);
        for (const x in flatObject) {
          if (!flatObject.hasOwnProperty(x)) continue;
          // Converting i and x to camelCase
          const newKey2 = this.transform(x, '_', DEFAULT_REGEX);
          // toReturn[newKey1 + '.' + newKey2] = flatObject[x];
          toReturn[newKey1][newKey2] = flatObject[x];
        }
      } else {
        const newKey1 = this.transform(i, '_', DEFAULT_REGEX);
        toReturn[newKey1] = ob[i];
      }
    }
    return toReturn;
  }
}
