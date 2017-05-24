# nativescript-loading-indicator

**nativescript-loading-indicator** is a plugin for NativeScript which overlays a loading indicator on the current page. Can be used, for example, to prevent the UI being interacted with while data is being fetched from an API, while informing the user that something is happening.

* iOS: [MBProgressHUD](https://github.com/jdg/MBProgressHUD)
* Android: [ProgressDialog](http://developer.android.com/reference/android/app/ProgressDialog.html)


## Installation

```bash
tns plugin add nativescript-loading-indicator
```

## Example

```js
var LoadingIndicator = require("nativescript-loading-indicator").LoadingIndicator;

// or with TypeScript:
// import {LoadingIndicator} from "nativescript-loading-indicator";

var loader = new LoadingIndicator();

// optional options
// android and ios have some platform specific options
var options = {
  message: 'Loading...',
  progress: 0.65,
  android: {
    indeterminate: true,
    cancelable: true,
    cancelListener: function(dialog) { console.log("Loading cancelled") },
    max: 100,
    progressNumberFormat: "%1d/%2d",
    progressPercentFormat: 0.53,
    progressStyle: 1,
    secondaryProgress: 1
  },
  ios: {
    details: "Additional detail note!",
    margin: 10,
    dimBackground: true,
    color: "#4B9ED6", // color of indicator and labels
    // background box around indicator
    // hideBezel will override this if true
    backgroundColor: "yellow",
    hideBezel: true, // default false, can hide the surrounding bezel
    view: UIView, // Target view to show on top of (Defaults to entire window)
    mode: // see iOS specific options below
  }
};

loader.show(options); // options is optional

// Do whatever it is you want to do while the loader is showing, then

loader.hide();
```

### Options

* message: `string` Your message!
* progress: `number` Set progress display

#### Android Specific

* Reference: http://developer.android.com/intl/zh-tw/reference/android/app/ProgressDialog.html

#### iOS Specific

* Reference: https://github.com/jdg/MBProgressHUD/blob/master/Demo/Classes/MBHudDemoViewController.m

Quick `Mode` Reference:

* `MBProgressHUDModeDeterminate`
* `MBProgressHUDModeAnnularDeterminate`
* `MBProgressHUDModeDeterminateHorizontalBar`
* `MBProgressHUDModeText`
* `MBProgressHUDModeCustomView`
  * use with `customView: string` - local path to an image file

## Screenshots

<img width="40%" src="screenshots/ios.png" alt="Loading indicator on iOS" float="left">

<img width="50%" src="screenshots/android.png" alt="Loading indicator on Android" float="left">
