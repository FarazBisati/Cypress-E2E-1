let webLocators = {
  label: {
    accountCreated: ".maintext",
    myAccount: "h2>span",
    sucessMessage: ".mb40",
  },
  link: {
    continue: "[title='Continue']",
  },
};

class SucessPage {
  static verifyAccountIsCreated(accountCreated, myAccount, sucessMessage) {
    cy.get(webLocators.label.accountCreated)
      .should("be.visible")
      .and("include.text", accountCreated);

    cy.get(webLocators.label.myAccount)
      .should("be.visible")
      .and("include.text", myAccount);

    cy.get(webLocators.label.sucessMessage)
      .should("be.visible")
      .and("include.text", sucessMessage);
  }

  static clickContinue() {
    cy.get(webLocators.link.continue).should("be.visible").click();
  }
}

export default SucessPage;
