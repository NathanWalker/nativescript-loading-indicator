import { Color } from 'tns-core-modules/color';
import { Mode, OptionsCommon } from './loading-indicator.common';

export * from './loading-indicator.common';

export class LoadingIndicator {
  private _hud: MBProgressHUD;
  // iOS allows indicator to be shown on specific views if desired
  // fallback to entire window
  private _targetView: any; // UIView

  show(options?: OptionsCommon) {
    if (typeof options === 'undefined') options = {};
    const ios = options.ios;

    if (typeof this._hud === 'undefined') {
      // use specific target, fallback to entire window
      this._targetView =
        options && options.view ? options.view : this._getRootWindow();
      this._hud = MBProgressHUD.showHUDAddedToAnimated(this._targetView, true);
    }

    // options
    if (options.message) {
      this._hud.labelText = options.message;
    }

    if (options.progress) {
      this._hud.progress = options.progress;
    }

    if (options.mode) {
      (this._hud as any).mode = options.mode; // casting bc we use a custom enum and not MBProgessHUD enum for mode
    } else {
      (this._hud as any).mode = Mode.Indeterminate;
    }

    if (options.dimBackground) this._hud.dimBackground = options.dimBackground;

    if (options.margin) this._hud.margin = options.margin;

    if (options.userInteractionEnabled)
      this._hud.userInteractionEnabled = options.userInteractionEnabled;

    if (options.backgroundColor) {
      this._hud.color = new Color(options.backgroundColor).ios;
    }

    if (options.color) {
      // make activity and main label same color
      this._hud.activityIndicatorColor = new Color(options.color).ios;
      this._hud.contentColor = new Color(options.color).ios; // setting this seems to enforce coloring the activity indicator correctly
      this._hud.labelColor = new Color(options.color).ios;
    }

    if (options.details) {
      this._hud.detailsLabelText = options.details;
      // detail label same color with 80% opacity of that color
      // TODO: allow specific control
      this._hud.detailsLabelColor =
        options && options.color
          ? new Color(options.color).ios
          : new Color('#333').ios;
      this._hud.detailsLabel.alpha = 0.8;
    }

    if (options.hideBezel) {
      this._hud.backgroundColor = UIColor.clearColor;
      this._hud.bezelView.style = MBProgressHUDBackgroundStyle.SolidColor;
      this._hud.bezelView.backgroundColor = UIColor.clearColor;
    }

    // handle mode setting for custom view Mode
    if (
      this._hud.mode &&
      (this._hud as any).mode === Mode.CustomView && // casting to any for custom enum we map to
      options.customView
    ) {
      console.log('setting customView', options.customView);
      if (options.customView instanceof UIImage) {
        this._hud.customView = UIImageView.alloc().initWithImage(
          options.customView
        );
      } else if (options.customView instanceof UIView) {
        this._hud.customView = options.customView;
      } else if (typeof options.customView === 'string') {
        this._hud.customView = UIImageView.alloc().initWithImage(
          UIImage.imageNamed(options.customView)
        );
      }
    }

    // ios specific
    if (ios) {
      if (ios.square) this._hud.square = true;
    }

    return this._hud;
  }

  hide(targetView?: any) {
    targetView = targetView || this._targetView || this._getRootWindow();
    MBProgressHUD.hideHUDForViewAnimated(targetView, true);
    this._hud = undefined;
  }

  private _getRootWindow() {
    return UIApplication.sharedApplication.windows[0];
  }
}
