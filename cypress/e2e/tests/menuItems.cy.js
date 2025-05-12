import HomePage from "../../pages/homePage";

describe("Verifying menu items", () => {
  it("Verify if correct menu and sub menu items are displayed ", () => {
    cy.visit("/");
    HomePage.checkAllMenuItems();
  });
});
