export interface OptionsAndroid {
  cancelable?: boolean;
  indeterminate?: boolean;
  max?: number;
  progressNumberFormat?: string;
  progressPercentFormat?: number;
  progressStyle?: number;
  secondaryProgress?: number;
  details?: string;
  square?: boolean;
  margin?: number;
  dimBackground?: boolean;
  hideBezel?: boolean; // hide bezel around indicator
  color?: string;
  backgroundColor?: string;
  userInteractionEnabled?: boolean;
  view?: any; // UIView to target
  mode?: any;
  customView?: string;
  cancelListener?: (dialog: any) => void;
}
export interface OptionsIOS {
  details?: string;
  square?: boolean;
  margin?: number;
  dimBackground?: boolean;
  hideBezel?: boolean; // hide bezel around indicator
  color?: string;
  backgroundColor?: string;
  userInteractionEnabled?: boolean;
  view?: any; // UIView to target
  mode?: any;
  customView?: string;
}
export interface OptionsCommon {
  message?: string;
  details?: string;
  progress?: number;
  ios?: OptionsIOS;
  android?: OptionsAndroid;
  mode?: Mode;
}

export enum Mode {
  Determinate,
  AnnularDeterminate,
  DeterminateHorizontalBar,
  Text,
  CustomView
}

export class LoadingIndicator {
  show(options?: OptionsCommon): any;
  hide(): void;
}
