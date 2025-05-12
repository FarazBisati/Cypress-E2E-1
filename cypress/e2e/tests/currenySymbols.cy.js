import HomePage from "../../pages/homePage";

describe("Set and Verify curreny on HomePage", () => {
  it("Correct currency symbol is displayed at all places in HomePage ", () => {
    cy.visit("/");
    HomePage.setCurrencyAndVerifyAppliedCurrency();
  });
});
