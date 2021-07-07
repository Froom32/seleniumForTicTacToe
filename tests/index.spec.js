const {Builder, By, Key, until} = require('selenium-webdriver');

describe("Example.com", () => {
  let driver;
  
  beforeAll(async function() {
    driver = await new Builder().forBrowser('chrome').build();
    await driver.get('https://Froom32.github.io');
  });

  afterAll(async function() {
    await driver.quit();
  });

  beforeEach(async function() {
    await click(driver, 'board_3');
    await click(driver, 'btn-new-game');
  });

  function click(driver, id) {
    return driver.findElement(By.id(id)).click();
  };

  function findByID(driver, id) {
    return driver.findElement(By.id(id));
  };

  it("X player should win by vertical line", async () => {
    await click(driver, '00');
    await click(driver, '01');
    await click(driver, '10');
    await click(driver, '02');
    await click(driver, '20');
    let modalWindow = await findByID(driver, 'content');
    await expect(await modalWindow.getText()).toEqual("X Won!");
  });

  it("0 player should win by horizontal line", async () => {
    await click(driver, '10');
    await click(driver, '00');
    await click(driver, '11');
    await click(driver, '01');
    await click(driver, '20');
    await click(driver, '02');
    let modalWindow = await findByID(driver, 'content');
    await expect(await modalWindow.getText()).toEqual("0 Won!");
  });

  it("X player should win by diagonal line", async () => {
    await click(driver, '00');
    await click(driver, '01');
    await click(driver, '11');
    await click(driver, '02');
    await click(driver, '22');
    let modalWindow = await findByID(driver, 'content');
    await expect(await modalWindow.getText()).toEqual("X Won!");
  });

  it("0 player should win by opposite diagonal line", async () => {
    await click(driver, '00');
    await click(driver, '02');
    await click(driver, '10');
    await click(driver, '11');
    await click(driver, '22');
    await click(driver, '20');
    let modalWindow = await findByID(driver, 'content');
    await expect(await modalWindow.getText()).toEqual("0 Won!");
  });

  it("There should be a draw", async () => {
    await click(driver, '00');
    await click(driver, '01');
    await click(driver, '02');
    await click(driver, '11');
    await click(driver, '10');
    await click(driver, '12');
    await click(driver, '21');
    await click(driver, '20');
    await click(driver, '22');
    let modalWindow = await findByID(driver, 'content');
    await expect(await modalWindow.getText()).toEqual("Nobody Won!");
  });

  //it("Players could not make one step twice in one box", async () => {
   // await click(driver, '00');
    //await expect(await click(driver, '00')).toEqual('');
  //});
});
