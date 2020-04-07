const Ajv = require('ajv');
const fs = require('fs');

const ajv = new Ajv();

const parentSchema = {
    "$schema": "http://json-schema.org/draft-07/schema#",
    "definitions": {
        "Interval": {
            "type": "object",
            "properties": {
                "startTime": {
                    "description": "Inteval start time with the format HH:MM",
                    "pattern": "^(([01]\\d)|2[0-3]):[0-5]\\d$",
                    "type": "string"
                },
                "endTime": {
                    "description": "Inteval end time with the format HH:MM",
                    "pattern": "^(([01]\\d)|2[0-3]):[0-5]\\d$",
                    "type": "string"
                }
            },
            "required": [
                "endTime",
                "startTime"
            ]
        }
    },
    "$id": "Interval"
};

ajv.addSchema(parentSchema, 'Interval');

const validators = Object.keys(parentSchema.definitions).reduce((validators, key) => (
    { ...validators, [`validate${key}`]: ajv.compile(parentSchema.definitions[key]) }
), {});

module.exports = validators;
