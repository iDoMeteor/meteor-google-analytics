# @iDoMeteor's Google Analytics Meteor Package <small>v0.0.1</small>

# Synopsis

First attempt at a real package, loading locally works right now, loading
remotely from http://google-analytics.com/analytics.js is not working in
this version (not really my priority).  The drop-in code with working remote
loading & official Google debugging goodies will be made available after I
get it running very cleanly within #OnePageWonder.

I will migrate those changes to this package shortly thereafter, but to do
so I am going to have to perform some wizardry that I don't have head space
for just now. :)

* You can diff or hash my real-google-analytics.js w/the one from the link above, it is unchanged. :>

# Usage

## Installation

>meteor add idometeor:google-analytics

## To configure:

>Set Meteor.settings.public.google in settings.json

## Usage (client):

    gaEvent(category, action, label, debug);
               (string, string, string, boolean)
    gaPageview(relative_url);
                  (string, boolean)
Reference:
  https://developers.google.com/analytics/devguides/collection/analyticsjs

# Settings

    {
      "public": {
        "google": {
          "account": "UA-23671882-14",
          "cookie": {
            "auto": "true",
            "domain": "false",
            "expires": "false",
            "name": "false",
            "localMode": "false"
          },
          "debug": "false",
          "enable": "true",
          "trackInPage": "false",
          "trackInterests": "false"
        }
      }
    }

* There are a few more options in the upcoming drop-in.

# Example

I built up a (quick) example based on the official Meteor skeleton that is
installed when you `meteor create app`:

* https://github.com/iDoMeteor/meteor-google-analytics-example

# Extended Notes

  The whole purpose of writing this was to figure out a way to *not*
  use Meteor.settings (I prefer to have things like this in a database
  so that people who don't code can change them and I don't have to do it
  for them).  The drop-in version works great, but the package
  version.. has ended up almost like the version it was intended to
  replace (you will be able to tell by the drop-in that this is based on
  that code and not GAnalytics package, but this package ended up quite
  similar).  Therefore, I have stripped it of rank and bumped the version
  all the way back to 0.0.1! lol

  Also, I killed the value and data options on the event sending, they
  are right next to useless.

  The drop-in successfully works loading from any of the three sources
  (local, remote, remote debug).  I think to get this doing everything I
  want, I may have to read some Meteor source code for a week. :D

  I will figure it all out eventually! :D

# Caveat

  You may need to tune your browser policy code, especially if you turn on
  trackInterests which will do all sorts of stuff with Doubleclick that will
  crank your load time way up.  Is it worth losing traffic just let someone
  else analyse your consumers' shopping trends?  No.

# Bonus:

  The one thing this does do right, is load the analytics.js locally,
  saving an insane amount of loading time.  Seriously.
