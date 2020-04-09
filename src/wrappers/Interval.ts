import Ajv from 'ajv';

import { Interval } from '../types/Interval';

import PayloadWrapper from './PayloadWrapper';

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

export class IntervalWrapper extends PayloadWrapper<Interval> {
    isValid() {
        return <boolean> validate(this.getPayload());
    }

    getErrors() {
        return validate.errors;
    }
}
