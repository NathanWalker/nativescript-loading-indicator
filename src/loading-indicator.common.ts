export interface OptionsAndroid {
  cancelable?: boolean;
  indeterminate?: boolean;
  max?: number;
  progressNumberFormat?: string;
  progressPercentFormat?: number;
  progressStyle?: number;
  secondaryProgress?: number;
  cancelListener?: (dialog: any) => void;
  details?: string;
  square?: boolean;
  margin?: number;
  dimBackground?: boolean;
  hideBezel?: boolean; // hide bezel around indicator
  color?: string;
  backgroundColor?: string;
  userInteractionEnabled?: boolean;
  view?: any; // UIView
  mode?: any;
  customView?: any;
  elevation?: number;
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
  view?: any; // UIView
  mode?: any;
  customView?: any;
}

export enum Mode {
  Determinate,
  AnnularDeterminate,
  DeterminateHorizontalBar,
  Text,
  CustomView
}

export interface OptionsCommon {
  message?: string;
  details?: string;
  progress?: number;
  ios?: OptionsIOS;
  android?: OptionsAndroid;
  mode?: Mode;
}
