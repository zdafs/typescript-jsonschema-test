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
        },
        "TemporaryBlock": {
            "type": "object",
            "properties": {
                "days": {
                    "description": "Days of the year to be blocked",
                    "minItems": 1,
                    "items": {
                        "type": "string",
                        "pattern": "^[12]\\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\\d|3[01])$"
                    },
                    "type": "array"
                },
                "isEntireDay": {
                    "description": "Represents if the block is for the entire day",
                    "type": "boolean"
                },
                "intervals": {
                    "description": "Array with the intervals to be blocked",
                    "type": "array",
                    "items": {
                        "$ref": "TemporaryBlock#/definitions/Interval"
                    }
                }
            },
            "required": [
                "days",
                "intervals",
                "isEntireDay"
            ]
        }
    },
    "$id": "TemporaryBlock"
};

ajv.addSchema(parentSchema, 'TemporaryBlock');

const validators = Object.keys(parentSchema.definitions).reduce((validators, key) => (
    { ...validators, [`validate${key}`]: ajv.compile(parentSchema.definitions[key]) }
), {});

module.exports = validators;
