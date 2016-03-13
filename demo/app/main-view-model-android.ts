import {Observable} from "data/observable";
import {LoadingIndicator} from "nativescript-loading-indicator";

export class LoadingAndroidTest extends Observable {
  private indicator: LoadingIndicator;
  
  constructor() {
    super();
    this.indicator = new LoadingIndicator();
  }
  
  public showLoader() {
    this.indicator.show({ message: 'Loading test...' });
    this.demoLoader();
  }
  
  public showLoaderIndeterminate() {
    this.indicator.show({ android: { indeterminate: true } });
    this.demoProgress();
  }
  
  private demoLoader() {
    setTimeout(() => {
      this.indicator.hide();
    }, 3000);
  }
  
  private demoProgress() {
    setTimeout(() => {
      this.indicator.show({ progress: 15 });
    }, 500);
    setTimeout(() => {
      this.indicator.show({ progress: 35 });
    }, 1500);
    setTimeout(() => {
      this.indicator.show({ progress: 65 });
    }, 2500);
    setTimeout(() => {
      this.indicator.show({ progress: 85 });
    }, 4000);
    setTimeout(() => {
      this.indicator.show({ progress: 99 });
    }, 4500);
    setTimeout(() => {
      this.indicator.hide();
    }, 5000);
  }
};
