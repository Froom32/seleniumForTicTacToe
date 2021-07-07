const {Main} = require('../lib/main');

describe("Example.com", () => {
  const browser = new Main();
  
  beforeAll(async function() {
    await browser.get('https://Froom32.github.io');
  });

  afterAll(async function() {
    await browser.close();
  });

  beforeEach(async function() {
    await browser.selectBoardSize('board_3');
  });

  it("X player should win by vertical line", async () => {
    await browser.clickByID('00');
    await browser.clickByID('01');
    await browser.clickByID('10');
    await browser.clickByID('02');
    await browser.clickByID('20');
    let modalWindow = await browser.findByID('content');
    await expect(await modalWindow.getText()).toEqual("X Won!");
  });

  it("0 player should win by horizontal line", async () => {
    await browser.clickByID('10');
    await browser.clickByID('00');
    await browser.clickByID('11');
    await browser.clickByID('01');
    await browser.clickByID('20');
    await browser.clickByID('02');
    let modalWindow = await browser.findByID('content');
    await expect(await modalWindow.getText()).toEqual("0 Won!");
  });

  it("X player should win by diagonal line", async () => {
    await browser.clickByID('00');
    await browser.clickByID('01');
    await browser.clickByID('11');
    await browser.clickByID('02');
    await browser.clickByID('22');
    let modalWindow = await browser.findByID('content');
    await expect(await modalWindow.getText()).toEqual("X Won!");
  });

  it("0 player should win by opposite diagonal line", async () => {
    await browser.clickByID('00');
    await browser.clickByID('02');
    await browser.clickByID('10');
    await browser.clickByID('11');
    await browser.clickByID('22');
    await browser.clickByID('20');
    let modalWindow = await browser.findByID('content');
    await expect(await modalWindow.getText()).toEqual("0 Won!");
  });

  it("There should be a draw", async () => {
    await browser.clickByID('00');
    await browser.clickByID('01');
    await browser.clickByID('02');
    await browser.clickByID('11');
    await browser.clickByID('10');
    await browser.clickByID('12');
    await browser.clickByID('21');
    await browser.clickByID('20');
    await browser.clickByID('22');
    let modalWindow = await browser.findByID('content');
    await expect(await modalWindow.getText()).toEqual("Nobody Won!");
  });

  it("Players could not make one step twice in one box", async () => {
    await browser.clickByID('00');
    await browser.clickByID('00');
    let box = await browser.findByID('00');
    await expect(await box.getText()).toEqual('X');
  });
});
