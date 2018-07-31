# facebook-page-manager

There are many wordpress plugins written to import Facebook events into a wordpress site, but not many that work the other direction.

This is a small application written to help sync events from the wordpress event calendar at www.onetaiko.org and the public Facebook page for ONETaiko at www.facebook.com/OdaikoNewEngland.

The general workflow of this app are:

1. Scrape contents from the wordpress website
2. Using a cusomized facebook app and the faceboook graph API, check to see if the events are posted to Facebook
3. If the events are not there, post the events


## Latest Update 2018-07-30
This project is currently not possible given the current state of Facebook's API offerings and test environment

1. There is no true backend-only way to retrieve a Facebook oauth 2.0 token. The only APIs availble to retrieve this initial token requires a front-end web component to display
an interactive login interface, along with a callback URL to send the new token to. I could hack around this on my wordpress site by creating some custom PHP CGI endpoints, but I'd not feel very good doing it.
2. We [cannot create a test page](https://developers.facebook.com/support/bugs/1379799389014320/?disable_redirect=0) for test users. There may be a workaround to create a test page _with_ the graph API, but that is one more extra step for testing.
3. Most importantly, the APIs that let you manage a page's events [are not available](https://developers.facebook.com/docs/graph-api/reference/page/events/). They
seem to be in a restricted access mode, whatever that means...

Maybe some other time I'll revisit this.