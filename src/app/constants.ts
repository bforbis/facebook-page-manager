
/**
 * This URL hosts the data that represents the current events on the ONETaiko website. Events are in XML format
 */
import * as path from 'path';

export const EVENTS_URL: string = 'http://onetaiko.org/web/?plugin=all-in-one-event-calendar&controller=ai1ec_exporter_controller&action=export_events&ai1ec_cat_ids=16,14,17&xml=true';
export const EVENT_XML: string = path.resolve(__dirname, 'data/events.xml');