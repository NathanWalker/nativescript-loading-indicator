import {OptionsCommon} from '../interfaces';
import * as application from 'application';

declare var android: any;

export class LoadingIndicator {
  private _progressDialog: any;
  
  public show(options?: OptionsCommon) {
    let context = this._getContext();
    if (context) {
      if (options === undefined) options = {};
      if (this._progressDialog === undefined) {
        // Create
        let indeterminate = true;
        let cancelable = false;
        if (options.android) {
          if (options.android.indeterminate !== undefined) indeterminate = options.android.indeterminate;
          if (options.android.cancelable !== undefined) cancelable = options.android.cancelable;
        }
        
        this._progressDialog = android.app.ProgressDialog.show(context, "", options.message || "Loading", indeterminate, cancelable);  
      } else {
        // options
        if (options.message) this._progressDialog.setMesssage(options.message);
        if (options.progress) this._progressDialog.setProgress(options.progress);
        // android specific
        if (options.android) {
          if (options.android.indeterminate) this._progressDialog.setIndeterminate(true);
          if (options.android.max) this._progressDialog.setMax(options.android.max);
          if (options.android.progressNumberFormat) this._progressDialog.setProgressNumberFormat(options.android.progressNumberFormat);
          if (options.android.progressPercentFormat) this._progressDialog.setProgressPercentFormat(options.android.progressPercentFormat);
          if (options.android.progressStyle) this._progressDialog.setProgressStyle(options.android.progressStyle);
          if (options.android.secondaryProgress) this._progressDialog.setSecondaryProgress(options.android.secondaryProgress);  
        }
      }
      return this._progressDialog;
    }
  }
  
  public hide() {
    if (this._progressDialog !== undefined) this._progressDialog.hide();
    this._progressDialog = undefined;
  }
  
  private _getContext() {
    return application.android.foregroundActivity;
  }
}
