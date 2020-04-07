const { validateSomeType, validateAnotherType, validateSomeTypeArray } = require('./json-types/type1');
const { validateSomeType: validateSomeType2 } = require('./json-types/types2');

// console.log(validateSomeType({ propA: 0, propB: 123 }));
// console.log(validateAnotherType({ propB: -2 }));
// console.log(validateSomeType2({ propC: 'banana' }));

console.log(validateSomeTypeArray([{ propC: 0 }]));
