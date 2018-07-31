
/**
 * This URL hosts the data that represents the current events on the ONETaiko website. Events are in XML format
 */
import * as path from 'path';

export const EVENTS_URL: string = 'http://onetaiko.org/web/?plugin=all-in-one-event-calendar&controller=ai1ec_exporter_controller&action=export_events&ai1ec_cat_ids=16,14,17&xml=true';
export const EVENT_XML: string = path.resolve(__dirname, 'data/events.xml');

export const FB_BASE_API_URL: string = 'https://graph.facebook.com';
export const FB_APP_ID: string = '302467046997656';