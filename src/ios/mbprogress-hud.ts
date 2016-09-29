import {OptionsCommon} from '../interfaces';
import {Color} from 'color';
import * as utils from 'utils/utils';

declare var MBProgressHUD: any;
declare var MBProgressHUDModeCustomView: any;
declare var UIApplication: any;
declare var UIImageView: any;
declare var UIImage: any;

export class LoadingIndicator {
  private _hud: any;

  public show(options?: OptionsCommon) {
    if (typeof this._hud === 'undefined') this._hud = MBProgressHUD.showHUDAddedToAnimated(this._getRootWindow(), true);
    if (typeof options === 'undefined') options = {};

    // options
    if (options.message) this._hud.labelText = options.message;
    if (options.progress) this._hud.progress = options.progress;

    // ios specific
    if (options.ios) {
      if (options.ios.details) this._hud.detailsLabelText = options.ios.details;
      if (options.ios.square) this._hud.square = true;
      if (options.ios.margin) this._hud.margin = options.ios.margin;
      if (options.ios.dimBackground) this._hud.dimBackground = true;
      if (options.ios.color) {
        this._hud.color = new Color(options.ios.color).ios;
      }

      if (options.ios.mode) {
        this._hud.mode = options.ios.mode;
        if (options.ios.mode === MBProgressHUDModeCustomView && options.ios.customView) {
          this._hud.customView = UIImageView.alloc().initWithImage(UIImage.imageNamed(options.ios.customView));
        }
      }
    }

    return this._hud;
  }

  public hide() {
    MBProgressHUD.hideHUDForViewAnimated(this._getRootWindow(), true);
    this._hud = undefined;
  }

  private _getRootWindow() {
    return utils.ios.getter(UIApplication, UIApplication.sharedApplication).windows[0];
  }
}
