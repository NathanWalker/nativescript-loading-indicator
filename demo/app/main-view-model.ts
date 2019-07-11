import { LoadingIndicator, Mode } from 'nativescript-loading-indicator';
import { Observable } from 'tns-core-modules/data/observable';
import { confirm } from 'tns-core-modules/ui/dialogs';
import { Page } from 'tns-core-modules/ui/page';
import { openUrl } from 'tns-core-modules/utils/utils';

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

  nStudioIconTap() {
    confirm({
      message:
        'nStudio, LLC. specializes in custom software applications ranging from mobile, web, desktop, server and more. Would you like to visit nstudio.io?',
      okButtonText: 'Yes',
      cancelButtonText: 'Close'
    }).then(result => {
      if (result) {
        openUrl('https://nstudio.io');
      }
    });
  }

  public showLoader() {
    this.indicator.show({
      message: 'Loading test...'
    });

    setTimeout(() => {
      this.indicator.show({
        message: 'TextMode',
        mode: Mode.Text
      });
    }, 2000);

    setTimeout(() => {
      this.indicator.show({
        message: 'Updating',
        mode: Mode.Indeterminate
      });
      this.demoProgress('red');
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
      color: '#38ef7d',
      hideBezel: true
    });
    this.demoLoader();
  }

  public showLoaderMsgAndDetails() {
    this.indicator.show({
      message: 'One moment',
      details: 'Updating data...'
    });
    setTimeout(() => {
      this.indicator.show({
        details: 'Transferring secret codes...'
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
      margin: 30
    });
    this.demoLoader();
  }

  public showLoaderDimBg() {
    this.indicator.show({
      dimBackground: true,
      message: 'Dimmed the background.',
      color: '#3F5EFB'
    });
    this.demoLoader();
  }

  public showLoaderColor() {
    this.indicator.show({
      color: '#8A2BE2',
      backgroundColor: '#4B9ED6'
    });
    this.demoLoader();
  }

  public showLoaderIndeterminate() {
    this.indicator.show({
      message: 'Indeterminate Mode',
      backgroundColor: '#3F5EFB',
      color: '#fff000',
      mode: Mode.Indeterminate
    });

    setTimeout(() => {
      this.indicator.hide();
    }, 3500);
  }

  public showLoaderDeterminate() {
    this.indicator.show({
      message: 'Determinate Mode',
      backgroundColor: '#3F5EFB',
      color: '#fff000',
      mode: Mode.Determinate
    });
    this.demoProgress('#fff000');
  }

  public showLoaderAnnularDeterminate() {
    this.indicator.show({
      message: 'Annular Determinate Mode',
      color: '#38ef7d',
      backgroundColor: '#000',
      mode: Mode.AnnularDeterminate
    });
    this.demoProgress('#38ef7d');
  }

  public showLoaderDeterminateHorizontalBar() {
    this.indicator.show({
      message: 'Determinate Horizontal Bar Mode',
      color: '#FF0099',
      backgroundColor: '#240b36',
      mode: Mode.DeterminateHorizontalBar
    });
    this.demoProgress('#FF0099');
  }

  public showLoaderModeText() {
    this.indicator.show({
      message: 'Text only',
      mode: Mode.Text
    });
    this.demoLoader();
  }

  public showLoaderModeCustom() {
    this.indicator.show({
      message: 'Completed',
      details: 'Go wild!',
      customView: 'checkmark.png',
      mode: Mode.CustomView
    });
    this.demoLoader();
  }

  public showLoaderCancel() {
    let interval;
    this.indicator.show({
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

  private demoProgress(color = '#333') {
    setTimeout(() => {
      this.indicator.show({ progress: 0.15, color });
    }, 500);
    setTimeout(() => {
      this.indicator.show({ progress: 0.35, color });
    }, 1500);
    setTimeout(() => {
      this.indicator.show({ progress: 0.65, color });
    }, 2500);
    setTimeout(() => {
      this.indicator.show({ progress: 0.85, color });
    }, 4000);
    setTimeout(() => {
      this.indicator.show({ progress: 0.99, color });
    }, 4500);
    setTimeout(() => {
      this.indicator.show({ progress: 1, color });
      this.indicator.hide();
    }, 5000);
  }
}
