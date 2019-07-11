<a align="center" href="https://www.npmjs.com/package/nativescript-loading-indicator">
    <h3 align="center">NativeScript Loading Indicator</h3>
</a>
<h4 align="center">
NativeScript-Loading-Indicator is a plugin for NativeScript which overlays a loading indicator on the current page. Can be used, for example, to prevent the UI being interacted with while data is being fetched from an API, while informing the user that something is happening.
</h4>

<p align="center">
    <a href="https://www.npmjs.com/package/nativescript-loading-indicator">
        <img src="https://img.shields.io/npm/v/nativescript-loading-indicator.svg" alt="npm">
    </a>
    <a href="https://www.npmjs.com/package/nativescript-loading-indicator">
        <img src="https://img.shields.io/npm/dt/nativescript-loading-indicator.svg?label=npm%20downloads" alt="npm">
    </a>
    <a href="https://github.com/NathanWalker/nativescript-loading-indicator/stargazers">
        <img src="https://img.shields.io/github/stars/NathanWalker/nativescript-loading-indicator.svg" alt="stars">
    </a>
     <a href="https://github.com/NathanWalker/nativescript-loading-indicator/network">
        <img src="https://img.shields.io/github/forks/NathanWalker/nativescript-loading-indicator.svg" alt="forks">
    </a>
    <a href="https://github.com/NathanWalker/nativescript-loading-indicator/blob/master/LICENSE">
        <img src="https://img.shields.io/github/license/NathanWalker/nativescript-loading-indicator.svg" alt="license">
    </a>
    <a href="http://nstudio.io">
      <img src="https://github.com/nstudio/media/blob/master/images/nstudio-banner.png?raw=true" alt="nStudio banner">
    </a>
    <h5 align="center">Do you need assistance on your project or plugin? Contact the nStudio team anytime at <a href="mailto:team@nstudio.io">team@nstudio.io</a> to get up to speed with the best practices in mobile and web app development.
    </h5>
</p>

---

## Installation

```bash
tns plugin add nativescript-loading-indicator
```

## Native Libraries

- iOS: [MBProgressHUD](https://github.com/jdg/MBProgressHUD)
- Android: [PopupWindow](https://developer.android.com/reference/android/widget/PopupWindow.html) + [ProgressBar](https://developer.android.com/reference/android/widget/ProgressBar.html)

## Example

```js
const LoadingIndicator = require('nativescript-loading-indicator')
  .LoadingIndicator;
const Mode = require('nativescript-loading-indicator').Mode;

// or with TypeScript:
// import { LoadingIndicator, Mode } from 'nativescript-loading-indicator';

const loader = new LoadingIndicator();

// optional options
// android and ios have some platform specific options
const options = {
  message: 'Loading...',
  progress: 0.65,
  android: {
    details: 'Additional detail note!',
    margin: 10,
    dimBackground: true,
    color: '#4B9ED6', // color of indicator and labels
    // background box around indicator
    // hideBezel will override this if true
    backgroundColor: 'yellow',
    userInteractionEnabled: false, // default true. Set false so that the touches will fall through it.
    hideBezel: true, // default false, can hide the surrounding bezel
    view: android.view.View, // Target view to show on top of (Defaults to entire window)
    mode: Mode.AnnularDeterminate, // see options below
    indeterminate: true,
    cancelable: true,
    cancelListener: function(dialog) {
      console.log('Loading cancelled');
    }
  },
  ios: {
    details: 'Additional detail note!',
    margin: 10,
    dimBackground: true,
    color: '#4B9ED6', // color of indicator and labels
    // background box around indicator
    // hideBezel will override this if true
    backgroundColor: 'yellow',
    userInteractionEnabled: false, // default true. Set false so that the touches will fall through it.
    hideBezel: true, // default false, can hide the surrounding bezel
    view: UIView, // Target view to show on top of (Defaults to entire window)
    mode: null // see iOS specific options below
  }
};

loader.show(options); // options is optional

// Do whatever it is you want to do while the loader is showing, then

loader.hide();
```

### Options

- message: `string` Your message!
- progress: `number` Set progress display

#### Android Specific

Quick `Mode` Reference:

- `Determinate`
- `AnnularDeterminate`
- `DeterminateHorizontalBar`
- `Text`
- `CustomView`
- use with `customView: string` - local path to an image file

#### iOS Specific

- Reference: https://github.com/jdg/MBProgressHUD/blob/master/Demo/HudDemo/MBHudDemoViewController.m

Quick `Mode` Reference:

- `MBProgressHUDModeDeterminate`
- `MBProgressHUDModeAnnularDeterminate`
- `MBProgressHUDModeDeterminateHorizontalBar`
- `MBProgressHUDModeText`
- `MBProgressHUDModeCustomView`
- use with `customView: string` - local path to an image file

## Screenshots

<img width="40%" src="screenshots/ios.png" alt="Loading indicator on iOS" float="left">

<img width="50%" src="screenshots/android.png" alt="Loading indicator on Android" float="left">
