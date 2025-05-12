let webLocators = {
  label: {
    errorMesage: ".alert-danger",
  },
  radioButton: {
    register: "[value='register']",
    guest: "#accountFrm_accountguest",
  },
  buttons: {
    continue: "[title='Continue']",
    login: "[title='Login']",
  },
  inputbox: {
    username: "#loginFrm_loginname",
    password: "#loginFrm_password",
  },
  link: {
    homepage: ".categorymenu>li:first-of-type",
  },
};

class LoginPage {
  static registerAccount() {
    cy.get(webLocators.radioButton.register)
      .then((rb) => {
        if (!rb.is(":checked")) {
          cy.wrap(rb).check();
        }
      })
      .should("be.checked");
    cy.get(webLocators.buttons.continue).click();
  }

  static login(credentials) {
    cy.get(webLocators.inputbox.username)
      .should("be.visible")
      .type(credentials.username);
    cy.get(webLocators.inputbox.password)
      .should("be.visible")
      .type(credentials.password);
    cy.get(webLocators.buttons.login).click();
  }

  static getErrorMessage(errorMesage) {
    cy.get(webLocators.label.errorMesage)
      .should("be.visible")
      .and("include.text", errorMesage);
  }

  static navigateToHomePage() {
    cy.get(webLocators.link.homepage).click();
  }

  static clickGuestCheckOut() {
    cy.get(webLocators.radioButton.guest).then((guest) => {
      if (guest.is(":checked")) {
        cy.get(webLocators.buttons.continue).click();
      } else {
        cy.get(webLocators.radioButton.guest).check();
        cy.get(webLocators.buttons.continue).click();
      }
    });
  }
}

export default LoginPage;
