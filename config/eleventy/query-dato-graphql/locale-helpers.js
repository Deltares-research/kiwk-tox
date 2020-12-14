const { mapObjIndexed } = require('ramda');

module.exports = {
  addLocaleToAllDataRecords: locale => data =>
    mapObjIndexed(value => {
      // For multiple records, add locale to each record
      if (Array.isArray(value)) {
        return value.map(dataObj => ({
          ...dataObj,
          locale,
        }));
      }
      // Otherwise, add it to the single record
      else {
        return { ...value, locale };
      }
    }, data),

  deepFlattenLocaleRecords: objArray =>
    objArray.reduce(
      (accObj, currObj) =>
        mapObjIndexed((value, key) => {
          const accArr = accObj[key] || [];
          // For multiple records, merge the arrays
          if (Array.isArray(value)) {
            return [...accArr, ...value];
          }
          // For single records, add record to array
          else {
            return [...accArr, value];
          }
        }, currObj),
      {}
    ),
};
