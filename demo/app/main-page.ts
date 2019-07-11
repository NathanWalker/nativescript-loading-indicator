import { LoadingTest } from './main-view-model';

export function navigatedTo(args) {
  const page = args.object;
  page.bindingContext = new LoadingTest(page);
}
