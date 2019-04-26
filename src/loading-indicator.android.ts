import { Mode, OptionsCommon } from './loading-indicator.common';
import * as application from 'tns-core-modules/application';
import { topmost } from 'tns-core-modules/ui/frame';
import { screen } from 'tns-core-modules/platform';
import { Color } from 'tns-core-modules/color';
import { fromFileOrResource } from 'tns-core-modules/image-source';

export * from './loading-indicator.common';
declare var android: any, com: any;

const R_ATTR_PROGRESS_BAR_STYLE_HORIZONTAL = 0x01010078;
const PACKAGE = 'com.github.triniwiz.ns.loading.indicator';

export class LoadingIndicator {
  private _popOver: android.widget.PopupWindow;
  private _currentProgressColor: Color;
  private _defaultProgressColor: Color;
  private _progressId: number;
  private _messageId: number;
  private _detailsId: number;
  private _customViewId: number;

  constructor() {
    this._defaultProgressColor = new Color('#007DD6');
    this._progressId = android.view.View.generateViewId();
    this._messageId = android.view.View.generateViewId();
    this._detailsId = android.view.View.generateViewId();
    this._customViewId = android.view.View.generateViewId();
  }

  public show(options?: OptionsCommon) {
    let context = this._getContext();
    if (context) {
      options = options || {};
      options.android = options.android || {};
      options.android.userInteractionEnabled = options.android.userInteractionEnabled !== undefined || true;
      options.mode = options.android.mode || options.mode;
      if (!this._popOver) {
        this._createPopOver(context, options);
      } else {
        this._updatePopOver(context, options);
      }
    }
  }

  private _createPopOver(context, options?: OptionsCommon) {
    this._popOver = new android.widget.PopupWindow();
    const ref = new WeakRef(this);
    this._popOver.setTouchable(options.android.userInteractionEnabled);
    const contentView = new android.widget.LinearLayout(context);
    contentView.setOnTouchListener(new android.view.View.OnTouchListener({
      onTouch(view: android.view.View, event: android.view.MotionEvent): boolean {
        const cancelListener = options.android.cancelListener;
        const cancelable = options.android.cancelable;
        const owner = ref.get();
        if (cancelListener && typeof cancelListener === 'function') {
          if (owner && cancelable) {
            owner._popOver.dismiss();
            cancelListener(owner._popOver);
            owner._popOver = null;
          }
        }
        return true;
      }
    }));
    const defaultBackgroundColor = android.graphics.Color.WHITE;
    contentView.setBackgroundColor(
      options.android.dimBackground
        ? new Color('#80000000').android
        : android.graphics.Color.TRANSPARENT
    );
    contentView.setGravity(android.view.Gravity.CENTER);
    contentView.setLayoutParams(
      new android.view.ViewGroup.LayoutParams(
        android.view.ViewGroup.LayoutParams.FILL_PARENT,
        android.view.ViewGroup.LayoutParams.FILL_PARENT
      )
    );
    const parentView = new android.widget.LinearLayout(context);
    parentView.setOnTouchListener(new android.view.View.OnTouchListener({
      onTouch(view: android.view.View, event: android.view.MotionEvent): boolean {
        return true;
      }
    }));
    android.support.v4.view.ViewCompat.setElevation(parentView, 9.0);
    const params = parentView.getLayoutParams() as android.widget.LinearLayout.LayoutParams;
    const parentViewParams = params ? params : new android.widget.LinearLayout.LayoutParams(
      android.view.ViewGroup.LayoutParams.WRAP_CONTENT,
      android.view.ViewGroup.LayoutParams.WRAP_CONTENT
    );

    const defaultPadding = 10 * screen.mainScreen.scale;
    parentView.setPadding(defaultPadding, defaultPadding, defaultPadding, defaultPadding);
    if (options.android.margin !== undefined) {
      const margin = options.android.margin * screen.mainScreen.scale;
      parentViewParams.setMargins(margin, margin, margin, margin);
    }
    parentView.setLayoutParams(parentViewParams);
    const border = new android.graphics.drawable.ShapeDrawable();
    const backgroundColor = options.android.backgroundColor
      ? new Color(options.android.backgroundColor).android
      : defaultBackgroundColor;
    border.getPaint().setColor(backgroundColor);
    const cornerRadiusValue = 8;
    const cornerRadius = Array.create('float', 8);
    cornerRadius[0] = cornerRadiusValue;
    cornerRadius[1] = cornerRadiusValue;
    cornerRadius[2] = cornerRadiusValue;
    cornerRadius[3] = cornerRadiusValue;
    cornerRadius[4] = cornerRadiusValue;
    cornerRadius[5] = cornerRadiusValue;
    cornerRadius[6] = cornerRadiusValue;
    cornerRadius[7] = cornerRadiusValue;
    const shape = new android.graphics.drawable.shapes.RoundRectShape(cornerRadius, null, null);
    border.setShape(shape);
    if (options.android.hideBezel) {
      parentView.setBackgroundColor(
        android.graphics.Color.TRANSPARENT
      );
    } else {
      parentView.setBackgroundDrawable(border);
    }

    parentView.setGravity(android.view.Gravity.CENTER);
    parentView.setOrientation(android.widget.LinearLayout.VERTICAL);

    let progressView: android.widget.ProgressBar;
    const customOrText = options.mode === Mode.CustomView || options.mode === Mode.Text;
    if (!customOrText) {
      const determinate = options.progress !== undefined || options.mode === Mode.Determinate || options.mode === Mode.DeterminateHorizontalBar || options.mode === Mode.AnnularDeterminate;

      if (determinate) {
        progressView = new android.widget.ProgressBar(context, null, R_ATTR_PROGRESS_BAR_STYLE_HORIZONTAL);
      } else {
        progressView = new android.widget.ProgressBar(context);
      }

      progressView.setId(this._progressId);

      parentView.addView(progressView);
    }

    if (options.mode === Mode.CustomView) {
      if (options.android.customView) {
        let customView = this._createCustomView(context, options);
        if (customView) {
          parentView.addView(customView);
        }
      }
    }

    if (options.message && options.mode !== Mode.CustomView) {
      const messageView = new android.widget.TextView(context);
      messageView.setText(options.message);
      messageView.setId(this._messageId);
      parentView.addView(messageView);
    }

    if (options.android.details && options.mode !== Mode.CustomView) {
      const detailsView = new android.widget.TextView(context);
      detailsView.setText(options.android.details);
      detailsView.setId(this._detailsId);
      parentView.addView(detailsView);
    }

    switch (options.mode) {
      case Mode.CustomView:

        break;
      case Mode.AnnularDeterminate:
        progressView.setIndeterminate(false);
        progressView.setMax(100);
        progressView.setProgress(0);
        progressView.setProgressDrawable(this._getProgressDrawable());
        progressView.setBackgroundDrawable(this._getBackgroundDrawable());
        progressView.setLayoutParams(
          new android.widget.LinearLayout.LayoutParams(60 * screen.mainScreen.scale, 60 * screen.mainScreen.scale)
        );
        break;
      case Mode.Determinate:
        progressView.setIndeterminate(false);
        progressView.setMax(100);
        progressView.setProgress(0);
        progressView.setProgressDrawable(this._getProgressDrawableThick());
        progressView.setBackgroundDrawable(this._getBackgroundDrawable());
        progressView.setLayoutParams(
          new android.widget.LinearLayout.LayoutParams(60 * screen.mainScreen.scale, 60 * screen.mainScreen.scale)
        );
        break;
      case Mode.DeterminateHorizontalBar:
        progressView.setIndeterminate(false);
        progressView.setMax(100);
        progressView.setProgress(0);
        break;
      case Mode.Text:
        break;
      default:
        progressView.setIndeterminate(options.progress !== undefined ? false : options.android.indeterminate);
        break;
    }

    if (options.progress !== undefined || options.mode === Mode.Determinate || options.mode === Mode.AnnularDeterminate || options.mode === Mode.DeterminateHorizontalBar || !options.mode) {
      if (options.android.color) {
        this._setColor(options.android.color, progressView);
        this._currentProgressColor = new Color(options.android.color);
      }
      if (options.android.backgroundColor) {
        this._setBackgroundColor(options.android.backgroundColor, progressView);
      }
    }
    contentView.addView(parentView);
    this._popOver.setContentView(contentView);
    const view = topmost().android.rootViewGroup || topmost().currentPage.android;
    if (options.android.view) {
      const nativeView = options.android.view as android.view.View;
      this._popOver.setWidth(nativeView.getWidth());
      this._popOver.setHeight(nativeView.getHeight());
      this._popOver.showAtLocation(nativeView, android.view.Gravity.CENTER, 0, 0);
    } else {
      this._popOver.setWidth(screen.mainScreen.widthPixels);
      this._popOver.setHeight(screen.mainScreen.heightPixels);
      this._popOver.showAtLocation(view, android.view.Gravity.CENTER, 0, 0);
    }
  }

  private _updatePopOver(context, options?: OptionsCommon) {
    const contentView = this._popOver.getContentView() as android.widget.LinearLayout;
    const parentView = contentView.getChildAt(
      0
    ) as android.widget.LinearLayout;
    let count = parentView.getChildCount();
    if (options.mode === Mode.Text) {
      let progressView = parentView.getChildAt(0) as any;
      if (progressView) {
        const progressViewId = progressView.getId();
        if (progressViewId === this._progressId) {
          parentView.removeView(progressView);
          count = parentView.getChildCount();
        }
      }
    }
    if (options.mode === Mode.CustomView) {
      for (let i = 0; i < count; i++) {
        const view = parentView.getChildAt(i);
        parentView.removeView(view);
      }
      let customView = this._createCustomView(context, options);
      if (customView) {
        parentView.addView(customView);
      }
      count = parentView.getChildCount();
    }
    if (options.progress && options.mode !== Mode.Text && options.mode !== Mode.CustomView) {
      let progressView = parentView.getChildAt(0) as any;
      const progressViewId = progressView.getId();
      if (progressViewId === this._progressId && progressView.isIndeterminate()) {
        parentView.removeView(progressView);
        progressView = this._createDeterminateProgressView(context);
        parentView.addView(progressView, 0);
      }

      if (!(progressView instanceof android.widget.ProgressBar)) {
        progressView = this._createDeterminateProgressView(context);
        parentView.addView(progressView, 0);
      }
      count = parentView.getChildCount();
      progressView.setProgress(options.progress * 100);
    }
    if (!options.progress && options.mode !== Mode.Text && options.mode !== Mode.CustomView && options.android.indeterminate) {
      const progressView = new android.widget.ProgressBar(context);
      progressView.setId(this._progressId);
      parentView.addView(progressView, 0);
      count = parentView.getChildCount();
    }
    if (options.message) {
      let messageView;
      let view;
      const firstView = parentView.getChildAt(0) as any;
      switch (count) {
        case 1:
          if (firstView.getId() === this._messageId) {
            firstView.setText(options.message);
          } else {
            messageView = new android.widget.TextView(context);
            messageView.setId(this._messageId);
            messageView.setText(options.message);
            parentView.addView(messageView);
          }

          break;
        case 2:
          view = parentView.getChildAt(1) as any;
          const viewId = view.getId();
          if (viewId === this._messageId) {
            view.setText(options.message);
          } else if (viewId === this._detailsId) {
            messageView = new android.widget.TextView(context);
            messageView.setId(this._messageId);
            messageView.setText(options.message);
            parentView.addView(messageView, 1);
          }
          break;
        case 3:
          view = parentView.getChildAt(2) as any;
          view.setText(options.message);
          break;
        default:
          break;
      }
      count = parentView.getChildCount();
    }
    if (options.android.details) {
      let detailsView;
      switch (count) {
        case 1:
          const firstView = parentView.getChildAt(0) as any;
          if (firstView === this._detailsId) {
            firstView.setText(options.android.details);
          } else {
            detailsView = new android.widget.TextView(context);
            detailsView.setId(this._detailsId);
            detailsView.setText(options.android.details);
            parentView.addView(detailsView);
          }

          break;
        case 2:
          detailsView = parentView.getChildAt(
            1
          ) as android.widget.TextView;
          const detailsViewId = detailsView.getId();
          if (detailsViewId === this._detailsId) {
            detailsView.setText(options.android.details);
          } else if (detailsViewId === this._messageId) {
            detailsView = new android.widget.TextView(context);
            detailsView.setId(this._detailsId);
            detailsView.setText(options.android.details);
            parentView.addView(detailsView, 2);
          }
          break;
        case 3:
          detailsView = parentView.getChildAt(
            2
          ) as android.widget.TextView;
          detailsView.setText(options.android.details);
          break;
        default:
          break;
      }
    }
    this._popOver.update();
  }

  private _createCustomView(context, options) {
    let customView;
    if (options.android.customView instanceof android.graphics.Bitmap) {
      customView = new android.widget.ImageView(context);
      customView.setImageBitmap(options.android.customView);
    } else if (options.android.customView instanceof android.view.View) {
      customView = options.android.customView;
    } else if (typeof options.android.customView === 'string') {
      customView = new android.widget.ImageView(context);
      const fileName = options.android.customView.replace('.jpg', '')
        .replace('.png', '')
        .replace('.jpeg', '');
      const image = fromFileOrResource('res://' + fileName);
      if (image && image.android) {
        customView.setImageBitmap(image.android);
      }
    }
    customView.setId(this._customViewId);
    return customView;
  }

  private _createDeterminateProgressView(context) {
    const progressView = new android.widget.ProgressBar(context, null, R_ATTR_PROGRESS_BAR_STYLE_HORIZONTAL);
    progressView.setId(this._progressId);
    progressView.setMax(100);
    progressView.setProgress(0);
    progressView.setProgressDrawable(this._getProgressDrawable());
    progressView.setBackgroundDrawable(this._getBackgroundDrawable());
    progressView.setLayoutParams(
      new android.widget.LinearLayout.LayoutParams(60 * screen.mainScreen.scale, 60 * screen.mainScreen.scale)
    );
    return progressView;
  }

  private _setBackgroundColor(color: string, view: any) {
    const progressDrawable = view.getProgressDrawable() as any;
    const indeterminateDrawable = view.getIndeterminateDrawable() as any;
    if (progressDrawable instanceof android.graphics.drawable.LayerDrawable && progressDrawable.getNumberOfLayers() > 0) {
      const backgroundDrawable = progressDrawable.getDrawable(0);
      if (backgroundDrawable) {
        backgroundDrawable.setColorFilter(new Color(color).android, android.graphics.PorterDuff.Mode.SRC_IN);
      }
    }

    if (indeterminateDrawable instanceof android.graphics.drawable.LayerDrawable && indeterminateDrawable.getNumberOfLayers() > 0) {
      const backgroundDrawable = indeterminateDrawable.getDrawable(0);
      if (backgroundDrawable) {
        backgroundDrawable.setColorFilter(new Color(color).android, android.graphics.PorterDuff.Mode.SRC_IN);
      }
    }
  }

  private _setColor(color: string, view: any) {
    const progressDrawable = view.getProgressDrawable();
    const indeterminateDrawable = view.getIndeterminateDrawable();
    if (progressDrawable) {
      progressDrawable.setColorFilter(new Color(color).android, android.graphics.PorterDuff.Mode.SRC_IN);
    }
    if (indeterminateDrawable) {
      indeterminateDrawable.setColorFilter(new Color(color).android, android.graphics.PorterDuff.Mode.SRC_IN);
    }
  }

  private _getResources() {
    const ctx = application.android.foregroundActivity as android.app.Activity;
    return ctx.getResources();
  }

  private _getBackgroundDrawable() {
    return this._getResources().getDrawable(com.github.triniwiz.ns.loading.indicator.R.drawable.circle_shape);
  }

  private _getProgressDrawable() {
    return this._getResources().getDrawable(com.github.triniwiz.ns.loading.indicator.R.drawable.circular_progress_bar);
  }

  private _getProgressDrawableThick() {
    return this._getResources().getDrawable(com.github.triniwiz.ns.loading.indicator.R.drawable.circular_progress_bar_thick);
  }

  public hide() {
    if (this._popOver) {
      this._popOver.dismiss();
      this._popOver = null;
      this._currentProgressColor = null;
    }
  }

  private _getContext() {
    return application.android.foregroundActivity;
  }
}
