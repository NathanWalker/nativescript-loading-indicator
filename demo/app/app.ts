import application = require("application");
if (application.ios) {
  application.mainModule = "main-page";  
} else if (application.android) {
  application.mainModule = "main-page-android";
}

application.cssFile = "./app.css";
application.start();
