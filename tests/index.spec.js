const {MainPage} = require('../lib/MainPage');

describe("Example.com", () => {
  const mainPage = new MainPage();
  
  beforeAll(async function() {
    await mainPage.get('https://Froom32.github.io');
  });

  afterAll(async function() {
    await mainPage.close();
  });

  beforeEach(async function() {
    await mainPage.selectBoardSize('board_3');
  });

  it("X player should win by vertical line", async () => {
    await mainPage.clickByID('00');
    await mainPage.clickByID('01');
    await mainPage.clickByID('10');
    await mainPage.clickByID('02');
    await mainPage.clickByID('20');
    let modalWindow = await mainPage.findByID('content');
    await expect(await modalWindow.getText()).toEqual("X Won!");
  });

  it("0 player should win by horizontal line", async () => {
    await mainPage.clickByID('10');
    await mainPage.clickByID('00');
    await mainPage.clickByID('11');
    await mainPage.clickByID('01');
    await mainPage.clickByID('20');
    await mainPage.clickByID('02');
    let modalWindow = await mainPage.findByID('content');
    await expect(await modalWindow.getText()).toEqual("0 Won!");
  });

  it("X player should win by diagonal line", async () => {
    await mainPage.clickByID('00');
    await mainPage.clickByID('01');
    await mainPage.clickByID('11');
    await mainPage.clickByID('02');
    await mainPage.clickByID('22');
    let modalWindow = await mainPage.findByID('content');
    await expect(await modalWindow.getText()).toEqual("X Won!");
  });

  it("0 player should win by opposite diagonal line", async () => {
    await mainPage.clickByID('00');
    await mainPage.clickByID('02');
    await mainPage.clickByID('10');
    await mainPage.clickByID('11');
    await mainPage.clickByID('22');
    await mainPage.clickByID('20');
    let modalWindow = await mainPage.findByID('content');
    await expect(await modalWindow.getText()).toEqual("0 Won!");
  });

  it("There should be a draw", async () => {
    await mainPage.clickByID('00');
    await mainPage.clickByID('01');
    await mainPage.clickByID('02');
    await mainPage.clickByID('11');
    await mainPage.clickByID('10');
    await mainPage.clickByID('12');
    await mainPage.clickByID('21');
    await mainPage.clickByID('20');
    await mainPage.clickByID('22');
    let modalWindow = await mainPage.findByID('content');
    await expect(await modalWindow.getText()).toEqual("Nobody Won!");
  });

  it("Players could not make one step twice in one box", async () => {
    await mainPage.clickByID('00');
    await mainPage.clickByID('00');
    let box = await mainPage.findByID('00');
    await expect(await box.getText()).toEqual('X');
  });
});
