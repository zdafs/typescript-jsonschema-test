import Ajv from 'ajv';

import { Interval } from '../types/Interval';

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

const validate = new Ajv()
  .addSchema(parentSchema, 'Interval')
  .compile(parentSchema.definitions.Interval);

export function isValid(payload: any): payload is Interval {
	return (<boolean> validate(payload));
}
