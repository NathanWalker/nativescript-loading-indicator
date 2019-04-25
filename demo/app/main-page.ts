import {LoadingTest} from './main-view-model';
function pageLoaded(args) {
    const page = args.object;
    page.bindingContext = new LoadingTest(page);
}
exports.pageLoaded = pageLoaded;
