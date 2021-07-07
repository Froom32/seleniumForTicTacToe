const {Builder, By, until} = require('selenium-webdriver');

class Main {
  constructor() {

  };

  async init() {
    this.driver = await new Builder()
    .forBrowser('chrome')
    .build();
  };

  async get(url) {
    if(this.driver) {
      await this.driver.get(url);
    } else {
      await this.init();
      await this.driver.get(url);
    }
  };

  async wait(...args) {
    if(this.driver) {
      await this.driver.wait(...args);
    } else {
      await this.init();
      await this.driver.wait(...args);
    }
  };

  async close() {
    await this.driver.quit();
  };

  async clickByID(id) {
    if(this.driver) {
        await this.driver.findElement(By.id(id)).click();
      } else {
        await this.init();
        await this.driver.findElement(By.id(id)).click();
      }
  };

  async findByID(id) {
    if(this.driver) {
        return this.driver.findElement(By.id(id));
      } else {
        await this.init();
        return await this.driver.findElement(By.id(id));
      }
  };

  async selectBoardSize(boarSize) {
    if(this.driver) {
        await this.driver.findElement(By.id(boarSize)).click();
        await this.driver.findElement(By.id('btn-new-game')).click();
      } else {
        await this.init();
        await this.driver.findElement(By.id(boarSize)).click();
        await this.driver.findElement(By.id('btn-new-game')).click();
      }
  };
};

module.exports = {
    Main
};