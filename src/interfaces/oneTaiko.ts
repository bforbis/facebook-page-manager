
/**
 * Represents a parsed event from onetaiko's
 * event page (uses the all-in-one-event-calendar
 * wordpress plugin)
 */
export interface TaikoEvent {
  location: string,
	uid: string,
	categories: Array<string>,
	contact: string,
	summary: string,
	costType: string,
	cost: string,
	description: string,
	startTime: string,
	endTime: string,
	url: string,
	tags: Array<string>,
}