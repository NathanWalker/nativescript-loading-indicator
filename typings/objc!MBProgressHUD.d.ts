
declare class MBBackgroundView extends UIView {

	static alloc(): MBBackgroundView; // inherited from NSObject

	static appearance(): MBBackgroundView; // inherited from UIAppearance

	static appearanceForTraitCollection(trait: UITraitCollection): MBBackgroundView; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedIn(trait: UITraitCollection, ContainerClass: typeof NSObject): MBBackgroundView; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedInInstancesOfClasses(trait: UITraitCollection, containerTypes: NSArray<typeof NSObject> | typeof NSObject[]): MBBackgroundView; // inherited from UIAppearance

	static appearanceWhenContainedIn(ContainerClass: typeof NSObject): MBBackgroundView; // inherited from UIAppearance

	static appearanceWhenContainedInInstancesOfClasses(containerTypes: NSArray<typeof NSObject> | typeof NSObject[]): MBBackgroundView; // inherited from UIAppearance

	static new(): MBBackgroundView; // inherited from NSObject

	blurEffectStyle: UIBlurEffectStyle;

	color: UIColor;

	style: MBProgressHUDBackgroundStyle;
}

declare class MBBarProgressView extends UIView {

	static alloc(): MBBarProgressView; // inherited from NSObject

	static appearance(): MBBarProgressView; // inherited from UIAppearance

	static appearanceForTraitCollection(trait: UITraitCollection): MBBarProgressView; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedIn(trait: UITraitCollection, ContainerClass: typeof NSObject): MBBarProgressView; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedInInstancesOfClasses(trait: UITraitCollection, containerTypes: NSArray<typeof NSObject> | typeof NSObject[]): MBBarProgressView; // inherited from UIAppearance

	static appearanceWhenContainedIn(ContainerClass: typeof NSObject): MBBarProgressView; // inherited from UIAppearance

	static appearanceWhenContainedInInstancesOfClasses(containerTypes: NSArray<typeof NSObject> | typeof NSObject[]): MBBarProgressView; // inherited from UIAppearance

	static new(): MBBarProgressView; // inherited from NSObject

	lineColor: UIColor;

	progress: number;

	progressColor: UIColor;

	progressRemainingColor: UIColor;
}

declare class MBProgressHUD extends UIView {

	static HUDForView(view: UIView): MBProgressHUD;

	static allHUDsForView(view: UIView): NSArray<any>;

	static alloc(): MBProgressHUD; // inherited from NSObject

	static appearance(): MBProgressHUD; // inherited from UIAppearance

	static appearanceForTraitCollection(trait: UITraitCollection): MBProgressHUD; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedIn(trait: UITraitCollection, ContainerClass: typeof NSObject): MBProgressHUD; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedInInstancesOfClasses(trait: UITraitCollection, containerTypes: NSArray<typeof NSObject> | typeof NSObject[]): MBProgressHUD; // inherited from UIAppearance

	static appearanceWhenContainedIn(ContainerClass: typeof NSObject): MBProgressHUD; // inherited from UIAppearance

	static appearanceWhenContainedInInstancesOfClasses(containerTypes: NSArray<typeof NSObject> | typeof NSObject[]): MBProgressHUD; // inherited from UIAppearance

	static hideAllHUDsForViewAnimated(view: UIView, animated: boolean): number;

	static hideHUDForViewAnimated(view: UIView, animated: boolean): boolean;

	static new(): MBProgressHUD; // inherited from NSObject

	static showHUDAddedToAnimated(view: UIView, animated: boolean): MBProgressHUD;

	activityIndicatorColor: UIColor;

	animationType: MBProgressHUDAnimation;

	readonly backgroundView: MBBackgroundView;

	readonly bezelView: MBBackgroundView;

	readonly button: UIButton;

	color: UIColor;

	completionBlock: () => void;

	contentColor: UIColor;

	cornerRadius: number;

	customView: UIView;

	defaultMotionEffectsEnabled: boolean;

	delegate: MBProgressHUDDelegate;

	readonly detailsLabel: UILabel;

	detailsLabelColor: UIColor;

	detailsLabelFont: UIFont;

	detailsLabelText: string;

	dimBackground: boolean;

	graceTime: number;

	readonly label: UILabel;

	labelColor: UIColor;

	labelFont: UIFont;

	labelText: string;

	margin: number;

	minShowTime: number;

	minSize: CGSize;

	mode: MBProgressHUDMode;

	offset: CGPoint;

	opacity: number;

	progress: number;

	progressObject: NSProgress;

	removeFromSuperViewOnHide: boolean;

	readonly size: CGSize;

	square: boolean;

	taskInProgress: boolean;

	xOffset: number;

	yOffset: number;

	constructor(o: { view: UIView; });

	constructor(o: { window: UIWindow; });

	hide(animated: boolean): void;

	hideAfterDelay(animated: boolean, delay: number): void;

	hideAnimated(animated: boolean): void;

	hideAnimatedAfterDelay(animated: boolean, delay: number): void;

	initWithView(view: UIView): this;

	initWithWindow(window: UIWindow): this;

	show(animated: boolean): void;

	showAnimated(animated: boolean): void;

	showAnimatedWhileExecutingBlock(animated: boolean, block: () => void): void;

	showAnimatedWhileExecutingBlockCompletionBlock(animated: boolean, block: () => void, completion: () => void): void;

	showAnimatedWhileExecutingBlockOnQueue(animated: boolean, block: () => void, queue: NSObject): void;

	showAnimatedWhileExecutingBlockOnQueueCompletionBlock(animated: boolean, block: () => void, queue: NSObject, completion: () => void): void;

	showWhileExecutingOnTargetWithObjectAnimated(method: string, target: any, object: any, animated: boolean): void;
}

declare const enum MBProgressHUDAnimation {

	Fade = 0,

	Zoom = 1,

	ZoomOut = 2,

	ZoomIn = 3
}

declare const enum MBProgressHUDBackgroundStyle {

	SolidColor = 0,

	Blur = 1
}

interface MBProgressHUDDelegate extends NSObjectProtocol {

	hudWasHidden?(hud: MBProgressHUD): void;
}
declare var MBProgressHUDDelegate: {

	prototype: MBProgressHUDDelegate;
};

declare const enum MBProgressHUDMode {

	Indeterminate = 0,

	Determinate = 1,

	DeterminateHorizontalBar = 2,

	AnnularDeterminate = 3,

	CustomView = 4,

	Text = 5
}

declare var MBProgressHUDVersionNumber: number;

declare var MBProgressHUDVersionString: interop.Reference<number>;

declare var MBProgressMaxOffset: number;

declare class MBRoundProgressView extends UIView {

	static alloc(): MBRoundProgressView; // inherited from NSObject

	static appearance(): MBRoundProgressView; // inherited from UIAppearance

	static appearanceForTraitCollection(trait: UITraitCollection): MBRoundProgressView; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedIn(trait: UITraitCollection, ContainerClass: typeof NSObject): MBRoundProgressView; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedInInstancesOfClasses(trait: UITraitCollection, containerTypes: NSArray<typeof NSObject> | typeof NSObject[]): MBRoundProgressView; // inherited from UIAppearance

	static appearanceWhenContainedIn(ContainerClass: typeof NSObject): MBRoundProgressView; // inherited from UIAppearance

	static appearanceWhenContainedInInstancesOfClasses(containerTypes: NSArray<typeof NSObject> | typeof NSObject[]): MBRoundProgressView; // inherited from UIAppearance

	static new(): MBRoundProgressView; // inherited from NSObject

	annular: boolean;

	backgroundTintColor: UIColor;

	progress: number;

	progressTintColor: UIColor;
}
