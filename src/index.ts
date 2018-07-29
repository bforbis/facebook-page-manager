'use strict';

import * as eventScraper from './app/event-scraper';

eventScraper.scrapeEvents({
  cached: true,
}).then((parsedData) => {console.log(parsedData)});