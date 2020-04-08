export interface Interval {
	/**
	 * Inteval start time with the format HH:MM
	 *
	 * @TJS-pattern ^(([01]\d)|2[0-3]):[0-5]\d$
	 */
	startTime: string
	/**
	 * Inteval end time with the format HH:MM
	 *
	 * @TJS-pattern ^(([01]\d)|2[0-3]):[0-5]\d$
	 */
	endTime: string
}