Package.describe({
  name: 'idometeor:google-analytics',
  version: '0.0.1',
  summary: 'Google Analytics with local analytics.js loads very fast. Thorough debugging messages.',
  git: 'https://github.com/iDoMeteor/meteor-google-analytics',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.1.0.2');
  api.addFiles('real-google-analytics.js', 'client');
  api.addFiles('idm-ga.js', 'client');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.addFiles('idm-ga.js');
  api.addFiles('idm-ga-tests.js');
});
