import * as application from "tns-core-modules/application";

application.setCssFileName('./app.css');
if (application.ios) {
  application.start('main-page');
} else if (application.android) {
  application.start('main-page-android');
}
