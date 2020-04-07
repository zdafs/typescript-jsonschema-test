const Ajv = require('ajv');
const fs = require('fs');

const parentSchema = JSON.parse(fs.readFileSync('json-types/type1.json', 'utf8'));

console.log(Object.keys(parentSchema.definitions));
const ajv = new Ajv();

const validators = Object.keys(parentSchema.definitions).reduce((validators, key) => (
	{ ...validators, [`validate${key}`]: ajv.compile(parentSchema.definitions[key]) }
), {});

const obj = { propA: -1 };

console.log(validators.validateSomeType(obj));
