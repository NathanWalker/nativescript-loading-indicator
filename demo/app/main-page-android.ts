import {LoadingAndroidTest} from "./main-view-model-android";
function pageLoaded(args) {
    var page = args.object;
    page.bindingContext = new LoadingAndroidTest();
}
exports.pageLoaded = pageLoaded;
