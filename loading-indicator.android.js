var application = require("application");

var indicator = {}

indicator.show = function() {
  this._progressDialog = android.app.ProgressDialog.show(this._getContext(), "", "Loading");
};

indicator.hide = function() {
  if (this._progressDialog !== undefined) this._progressDialog.hide();
};

indicator._getContext = function() {
  return application.android.foregroundActivity;
};

module.exports = indicator;
