import { NgCliTestPage } from './app.po';

describe('ng-cli-test App', () => {
  let page: NgCliTestPage;

  beforeEach(() => {
    page = new NgCliTestPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
