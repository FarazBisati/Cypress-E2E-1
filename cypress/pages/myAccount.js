let webLocators = {
  label: {
    myAccount: ".maintext",
    accountDashboard: ".side_account_list>li:first-of-type a",
  },
  link: {
    logout: ".side_account_list>li:last-of-type",
  },
};

class MyAccountPage {
  static verifyAccountIsLogged(url) {
    cy.get(webLocators.label.myAccount)
      .should("be.visible")
      .and("include.text", "My Account");
    cy.get(webLocators.label.accountDashboard)
      .should("be.visible")
      .and("include.text", "Account Dashboard");
    cy.url().should("eq", url);
  }

  static clicklogout() {
    cy.get(webLocators.link.logout).click();
  }
}

export default MyAccountPage;
