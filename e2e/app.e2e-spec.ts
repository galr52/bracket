import { FifaPage } from './app.po';

describe('fifa App', function() {
  let page: FifaPage;

  beforeEach(() => {
    page = new FifaPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
