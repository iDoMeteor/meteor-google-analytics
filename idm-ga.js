// console.log ('Loading iDoMeteor:Google-Analytics');
/*******************************************************************************
 *
 * @Summary     @iDoMeteor Google Analytics
 * @Version     v0.0.1
 *
 ******************************************************************************/

// Import Google's function
/*global Meteor:true ga:true window:true */
ga = window.ga || null;

var settings = (
    Meteor.settings
    && Meteor.settings['public']
    && Meteor.settings['public'].google
  ) ? Meteor.settings['public'].google
    : null;

// Make sure we got something
if (!settings) {
  console.log('iDM-GA WARNING: idometeor:google-analytics is configured '
              + 'improperly, disabling');
  settings = {
    account: 'XXX',
    enabled: false,
  };
}


// Locals
var account     = settings.account;
var auto        = (/false/i.test(settings.cookie.auto))
                  ? false : true;
var cookie      = {};
var debug       = (/true/i.test(settings.debug))
                  ? true : false;
var enabled     = (/true/i.test(settings.enable) && !/XXX/.test(account))
                  ? true : false;
var localMode   = (/true/i.test(settings.cookie.localMode))
                  ? true : false;
var tip         = (/true/i.test(settings.trackInPage))
                  ? true : false;
var tit         = (/true/i.test(settings.trackInterests))
                  ? true : false;


// Set up for debugging mode
if (debug && enabled) {

  console.log('** Google Analytics DEBUG Mode **\n'
              + 'Using settings: '
              + JSON.stringify(settings, null, 4));

}

// Set up the tracker
if (ga && enabled) {

  // Cookie settings
  if (localMode) {
    console.log('iDM-GA INFO: Localhost mode, setting cookie domain to "none"');
    cookie = {cookieDomain: 'none'};
  } else if (auto) {
    if (debug) console.log('iDM-GA DEBUG: Using auto cookie');
    cookie = 'auto';
  } else {
    cookie.cookieDomain  = settings.cookieDomain;
    cookie.cookieExpires = settings.cookieExpires;
    cookie.cookieName    = settings.cookieName;
    if (debug) {
      console.log('iDM-GA DEBUG: Using manual cookie settings: '
                  + JSON.stringify(cookie, null, 4));
    }
  }

  // Call function from analytics.js and connect to GA
  if (debug) console.log('iDM-GA DEBUG: Creating tracker');
  ga('create', account, cookie);

  // Track in page events
  if (tip) {
    if (debug) console.log('iDM-GA DEBUG: Tracking in page events');
    ga('require', 'linkid', 'linkid.js');
  }

  // Track interests
  if (tit) {
    if (debug) console.log('iDM-GA DEBUG: Tracking interests');
    ga('require', 'displayfeatures');
  }

  window.gaEvent = function (options) {

    var g = ga;

    // Debug
    if (options && options.debug) {
      console.log('iDM-GA DEBUG: Logging GA event: '
                  + JSON.stringify(options, null, 4));
    }

    // Send it
    // TODO: Send the object version instead and allow for value & data again
    g('send',
       'event',
       options.category,
       options.action,
       options.label
      );
    return;

  };

  // Define pageview action
  // TODO: This could also take a data object if anyone has a reason
  window.gaPageview = function (url, d) {

    var g = ga;

    // Debug
    if (d) {
      console.log('iDM-GA DEBUG: Logging GA pageview: ' + url);
    }

    if (!url) {
      url = window.location.pathname;
      if (d) {
        console.log('Logging current window location ' + url);
      }
    }

    // Send it
    g('send', 'pageview', url);
    return;

  };

}
