# cordova-template
A base template for cordova using material design.

# Setup
Set up the environment

## Cordova Setup
Install cordova according to their documentation found here https://cordova.apache.org/docs/en/latest/guide/cli/

## Add platforms
After checking it out, run
`cordova platform add browser`

`cordova platform add ios`

`cordova platform add android`

# Add plugins
`cordova plugin add cordova-plugin-browsersync`

This adds the browser sync plugin that you can use to do testing of your app in a browser without the need for emulators, or devices.

## Running browsersync
`cordova run browser -- --live-reload`


## More plugins
https://cordova.apache.org/plugins/
