var indicator = {}

indicator.show = function() {
	MBProgressHUD.showHUDAddedToAnimated(this._getRootWindow(), true);
};

indicator.hide = function() {
	MBProgressHUD.hideHUDForViewAnimated(this._getRootWindow(), true);
};

indicator._getRootWindow = function() {
	return UIApplication.sharedApplication().windows[0];
}

module.exports = indicator;
