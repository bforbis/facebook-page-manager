import { Parser }  from 'xml2js';

import * as constants from './constants'
import * as request from 'request-promise';
import * as _ from 'lodash';
import * as fs from 'fs-extra';
import {
  TaikoEvent
} from '../interfaces/oneTaiko'
import { EROFS } from 'constants';


/**
 * Scrapes events from the main Odaiko New England website
 * and returns the data
 * 
 * @param {Object} args - Arguments to the scrapeEvent function
 * @param {Boolean} args.cached - If true, uses cached events xml from the filesystem. Otherwise makes a web
 *  request against the onetaiko.org website
 * 
 * @returns {Promise<Array<TaikoEvent>>} - A promise to an array of parsed TaikoEvents
 * @async
 */
export async function scrapeEvents({cached = false}: {cached?: boolean}): Promise<Array<TaikoEvent>> {
  if (!cached) {
    try {
      const response: string = await request.get(constants.EVENTS_URL);
      await fs.outputFile(constants.EVENT_XML, response);
    }
    catch (err) {
      console.error(`There was an error retrieving event data from onetaiko.org: ${err.message}`);
      throw (err);
    }
  }
  const xmlBuffer = await fs.readFile(constants.EVENT_XML);
  const parsedData = _parseEventXML(xmlBuffer.toString());
  console.log(`Got parsed data`);
  return parsedData;
}


/**
 * Given an events XML string, parses the content into an array of TaikoEvent objects
 * @param {string} eventXml - The events XML
 * 
 * @returns {Array<TaikoEvent>} - The parsed taiko event objects
 * @private
 */
function _parseEventXML(eventXml: string): Array<TaikoEvent> {
  const parsedEvents: Array<TaikoEvent> = [];
  const xmlParser = new Parser({ explicitArray: false });
  
  xmlParser.parseString(eventXml, (error: any, result: any) => {
    if (error) {
      throw new Error(`Error processing XML: ${error.message}`);
    }
    result.vcalendar.vevent.forEach((e: any) => {
      try {
        parsedEvents.push({
          location		: e.location,
          uid					: e.uid,
          categories	: e.categories.split(','),
          contact			: e.contact,
          summary			: e.summary,
          costType		: e['x-cost-type'],
          cost				: e['x-cost'],
          description	: e.description,
          startTime		: _.get(e, 'dtstart._'),
          endTime			: _.get(e, 'dtend._'),
          url					: _.get(e, 'url.$.uri'),
          tags				: _.get(e, 'dtstart._'),
        });
      }
      catch(err) {
        console.error(`Error parsing event ${e.summary}`);
        throw err;
      }
    });
  });

  return parsedEvents;
}