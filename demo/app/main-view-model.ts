import { Observable } from 'data/observable';
import { Page } from 'ui/page';
import { LoadingIndicator } from 'nativescript-loading-indicator';

declare var MBProgressHUDModeDeterminate, MBProgressHUDModeAnnularDeterminate, MBProgressHUDModeDeterminateHorizontalBar, MBProgressHUDModeText, MBProgressHUDModeCustomView;

export class LoadingTest extends Observable {
  private indicator: LoadingIndicator;
  private stackView: any;
  private _testTarget: boolean;

  constructor(page: Page) {
    super();
    // uncomment - test target view
    // this.stackView = page.getViewById('stackView');
    this.indicator = new LoadingIndicator();
  }


  public showLoader() {
    this.indicator.show({
      message: 'Loading test...'
    });
    this.demoLoader();

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

  public showLoaderMsgAndDetails() {
    this.indicator.show({ message: 'One moment', ios: { details: 'Updating data...' } });
    setTimeout(() => {
      this.indicator.show({ ios: { details: 'Transferring secret codes...' } });
      this.demoLoader();
    }, 1000);
  }

  public showLoaderSquare() {
    this.indicator.show({ ios: { square: true } });
    this.demoLoader();
  }

  public showLoaderMargin() {
    this.indicator.show({ message: 'Message offset margin...', ios: { margin: 30 } });
    this.demoLoader();
  }

  public showLoaderDimBg() {
    this.indicator.show({ ios: { dimBackground: true } });
    this.demoLoader();
  }

  public showLoaderColor() {
    this.indicator.show({ ios: { color: '#fff', backgroundColor: '#4B9ED6' } });
    this.demoLoader();
  }

  public showLoaderDeterminate() {
    this.indicator.show({ ios: { mode: MBProgressHUDModeDeterminate } });
    this.demoProgress();
  }

  public showLoaderAnnularDeterminate() {
    this.indicator.show({ ios: { mode: MBProgressHUDModeAnnularDeterminate } });
    this.demoProgress();
  }

  public showLoaderDeterminateHorizontalBar() {
    this.indicator.show({ ios: { mode: MBProgressHUDModeDeterminateHorizontalBar } });
    this.demoProgress();
  }

  public showLoaderModeText() {
    this.indicator.show({ message: 'Text only', ios: { mode: MBProgressHUDModeText } });
    this.demoLoader();
  }

  public showLoaderModeCustom() {
    this.indicator.show({ message: 'Completed', ios: { mode: MBProgressHUDModeCustomView, customView: 'Checkmark.png' } });
    this.demoLoader();
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
      this.indicator.hide();
    }, 5000);
  }
};
