import { LoadingIndicator, Mode } from 'nativescript-loading-indicator';
import { Observable } from 'tns-core-modules/data/observable';
import { Page } from 'tns-core-modules/ui/page';

export class LoadingTest extends Observable {
  private indicator: LoadingIndicator;
  private stackView: any;
  private _testTarget: boolean;

  constructor(page: Page) {
    super();
    // uncomment - test target view
    // this.stackView = page.getViewById('stackView');
    this.indicator = new LoadingIndicator();
    console.log('new indicator', this.indicator);
  }

  public showLoader() {
    console.log('show loader');

    this.indicator.show({
      message: 'Loading test...'
    });
    setTimeout(() => {
      this.indicator.show({
        message: 'TextMode',
        android: { mode: Mode.Text }
      });
    }, 1000);
    setTimeout(() => {
      this.indicator.show({
        message: 'Updating',
        android: { indeterminate: true }
      });
      this.demoProgress();
    }, 3000);

    // to test target view
    // uncomment - then can toggle this method to show/hide in target
    // if (!this._testTarget) {
    //   this._testTarget = true;
    //   this.indicator.show({
    //     message: 'Loading test...',
    //     ios: {
    //       view: this.stackView.ios
    //     }
    //   });
    // } else {
    //   this._testTarget = false;
    //   this.indicator.hide();
    // }
  }

  public showLoaderNoBezel() {
    this.indicator.show({
      message: 'Loading, no bezel!',
      ios: {
        color: '#000',
        hideBezel: true
      },
      android: {
        color: '#000',
        hideBezel: true
      }
    });
    this.demoLoader();
  }

  public showLoaderMsgAndDetails() {
    this.indicator.show({
      message: 'One moment',
      ios: { details: 'Updating data...' }
    });
    setTimeout(() => {
      this.indicator.show({
        ios: { details: 'Transferring secret codes...' },
        android: { details: 'Transferring secret codes...' }
      });
      this.demoLoader();
    }, 1000);
  }

  public showLoaderSquare() {
    this.indicator.show({ ios: { square: true } });
    this.demoLoader();
  }

  public showLoaderMargin() {
    this.indicator.show({
      message: 'Message offset margin...',
      ios: { margin: 30 }
    });
    this.demoLoader();
  }

  public showLoaderDimBg() {
    this.indicator.show({
      ios: { dimBackground: true },
      android: { dimBackground: true }
    });
    this.demoLoader();
  }

  public showLoaderColor() {
    this.indicator.show({
      ios: { color: '#fff', backgroundColor: '#4B9ED6' },
      android: { color: '#fff', backgroundColor: '#4B9ED6' }
    });
    this.demoLoader();
  }

  public showLoaderDeterminate() {
    this.indicator.show({
      ios: { mode: MBProgressHUDMode.Determinate },
      mode: Mode.Determinate
    });
    this.demoProgress();
  }

  public showLoaderAnnularDeterminate() {
    this.indicator.show({
      ios: {
        mode: MBProgressHUDMode.AnnularDeterminate,
        color: '#fff',
        backgroundColor: '#4B9ED6'
      },
      mode: Mode.AnnularDeterminate,
      android: { color: 'red', backgroundColor: 'green' }
    });
    this.demoProgress();
  }

  public showLoaderDeterminateHorizontalBar() {
    this.indicator.show({
      ios: {
        mode: MBProgressHUDMode.DeterminateHorizontalBar,
        color: 'red',
        backgroundColor: 'white'
      },
      mode: Mode.DeterminateHorizontalBar,
      android: { color: 'red', backgroundColor: 'white' }
    });
    this.demoProgress();
  }

  public showLoaderModeText() {
    this.indicator.show({
      message: 'Text only',
      ios: { mode: MBProgressHUDMode.Text },
      mode: Mode.Text
    });
    this.demoLoader();
  }

  public showLoaderModeCustom() {
    this.indicator.show({
      message: 'Completed',
      ios: { mode: MBProgressHUDMode.CustomView, customView: 'Checkmark.png' },
      android: { customView: 'checkmark.png' },
      mode: Mode.CustomView
    });
    this.demoLoader();
  }

  public showLoaderCancel() {
    let interval;
    this.indicator.show({
      ios: { mode: MBProgressHUDMode.Determinate },
      mode: Mode.Determinate,
      android: {
        cancelable: true,
        cancelListener: dialog => {
          console.log('cancelled');
          clearInterval(interval);
        }
      }
    });

    let count = 0;

    interval = setInterval(() => {
      count += 1;
      this.indicator.show({ progress: count / 100 });
      if (count === 100) {
        clearInterval(interval);
        this.indicator.hide();
      }
    }, 500);
  }

  private demoLoader() {
    setTimeout(() => {
      this.indicator.hide();
    }, 3000);
  }

  private demoProgress() {
    setTimeout(() => {
      this.indicator.show({ progress: 0.15 });
    }, 500);
    setTimeout(() => {
      this.indicator.show({ progress: 0.35 });
    }, 1500);
    setTimeout(() => {
      this.indicator.show({ progress: 0.65 });
    }, 2500);
    setTimeout(() => {
      this.indicator.show({ progress: 0.85 });
    }, 4000);
    setTimeout(() => {
      this.indicator.show({ progress: 0.99 });
    }, 4500);
    setTimeout(() => {
      this.indicator.show({ progress: 1 });
      this.indicator.hide();
    }, 5000);
  }
}
