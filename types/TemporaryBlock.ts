import { Interval } from './Interval';

export interface TemporaryBlock {
	/**
	 * Days of the year to be blocked
	 *
	 * @TJS-minItems 1
	 * @items {"type":"string", "pattern":"^[12]\\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\\d|3[01])$"}
	 */
	days: string[]
	/**
	 * Represents if the block is for the entire day
	 */
	isEntireDay: boolean
	/**
	 * Array with the intervals to be blocked
	 */
	intervals: Interval[]
}