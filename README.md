# facebook-page-manager

There are many wordpress plugins written to import Facebook events into a wordpress site, but not many that work the other direction.

This is a small application written to help sync events from the wordpress event calendar at www.onetaiko.org and the public Facebook page for ONETaiko at www.facebook.com/OdaikoNewEngland.

The general workflow of this app are:

1. Scrape contents from the wordpress website
2. Using a cusomized facebook app and the faceboook graph API, check to see if the events are posted to Facebook
3. If the events are not there, post the events

