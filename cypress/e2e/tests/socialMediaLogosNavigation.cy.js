import HomePage from "../../pages/homePage";

describe("Check Header and Fotter Logo Navigation", () => {
  it.only("Verify header and footer logo navigations", () => {
    cy.visit("/");
    HomePage.checkSocialMediaLogoNavigations();
  });
});
