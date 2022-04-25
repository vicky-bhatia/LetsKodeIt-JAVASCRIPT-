var expectChai = require('chai').expect;
var assert = require('chai').assert;
//shift+alt+F => proper format

describe("Practice Page", async () => {
   it("should select a radio button and disable other options", async () => {
      await browser.url('https://courses.letskodeit.com/practice');
      let selectedCar = await browser.$("//input[@id='bmwradio']");
      selectedCar.click();
      const isSelected = await selectedCar.isSelected();
      expectChai(isSelected).to.equal(true);
   });

   it("verfying dropdown bar",async()=>{
      let allOptions=await $("#carselect");
      await allOptions.selectByVisibleText("Honda");
      expectChai(await allOptions.getValue()).to.equal("honda");
      expectChai(await allOptions.isDisplayed()).to.equal(true);
   });

   it("verfying Multiple Select",async()=>{
      let allOptions = await $$("#multiple-select-example option");
      let SelectFruit=await $("#multiple-select-example");
      await SelectFruit.selectByVisibleText("Apple");
      await SelectFruit.selectByVisibleText("Orange");
      expectChai(await allOptions[0].isSelected()).to.equal(true);
      expectChai(await allOptions[1].isSelected()).to.equal(true);
   });

   it("verifying checkbox", async () => {
      let selectedCar1 = await browser.$("#bmwcheck");
      await selectedCar1.click();
      let selectedCar2 = await browser.$("#benzcheck");
      await selectedCar2.click();
      const isSelected1 = await selectedCar1.isSelected();
      expectChai(isSelected1).to.equal(true);
      const isSelected2 = await selectedCar2.isSelected();
      expectChai(isSelected2).to.equal(true);
   });

   it("should open a new window", async () => {
      await browser.url('https://courses.letskodeit.com/practice');
      await $("#openwindow").click();
      await browser.switchWindow('https://courses.letskodeit.com/courses');
      await expect($('.dynamic-heading.margin-bottom-20')).toHaveTextContaining('All Courses');
      await browser.closeWindow();
      await browser.switchWindow('practice');
   });

   it("should open a new tab", async () => {
      await $("#opentab").click();
      await browser.sw
      await browser.switchWindow('https://courses.letskodeit.com/courses');
      await expect($('.dynamic-heading.margin-bottom-20')).toHaveTextContaining('All Courses');
      await browser.closeWindow();
      await browser.switchWindow('practice');
   });

   it("should switch to alert",async () =>{
      let name = await $("//input[@id='name' and @class='inputs']");
      await name.setValue('Vicky Bhatia');
      let alertbtn = await $("#alertbtn");
      await alertbtn.click();
      expectChai(await browser.isAlertOpen()).to.equal(true);
      await browser.acceptAlert();
      let confirmbtn = await $("#confirmbtn");
      await confirmbtn.click();
      expectChai(await browser.isAlertOpen()).to.equal(true);
      await browser.acceptAlert();
   });

   it("verify enable/disable functionality",async () => {
      let textbox = await $("#enabled-example-input");
      await textbox.setValue("Vicky");
      await $("#disabled-button").click();
      expectChai(await textbox.isEnabled()).to.equal(false);
      await $("#enabled-button").click();
      expectChai(await textbox.isEnabled()).to.equal(true);
   });

   it("verify hide/show functionality",async () => {
      let textbox = await $("#displayed-text");
      await textbox.setValue("Vicky");
      await $("#hide-textbox").click();
      expectChai(await textbox.isDisplayed()).to.equal(false);
      await $("#show-textbox").click();
      expectChai(await textbox.isDisplayed()).to.equal(true);
   });

   it("verify mouse hover functionality",async () => {
      await (await $("#mousehover")).scrollIntoView();
      await (await $("#mousehover")).moveTo();
      let elements = await $$(".mouse-hover .mouse-hover-content a");
      expectChai(await elements[1].isDisplayed()).to.equal(true);
      await (await $("=Reload")).click();
   }); 

   it("verify iframe",async () => {
      await (await $("#mousehover")).scrollIntoView();
      await browser.switchToFrame(await $("#courses-iframe"));
      await (await $("input#search")).setValue("javascript for beginners");
      await (await $(".find-course.search-course")).click();
      await (await $("(//div[@class='zen-course-thumbnail'])[1]")).click();
      expectChai(await $("//h1[@class='dynamic-heading text-blue custom-heading']").isDisplayed()).to.equal(true);
      await browser.switchToFrame(null);
     // await browser.pause(8000);
   });
  
});