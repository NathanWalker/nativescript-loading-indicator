import {LoadingTest} from './main-view-model';
function pageLoaded(args) {
    var page = args.object;
    page.bindingContext = new LoadingTest(page);
}
exports.pageLoaded = pageLoaded;
