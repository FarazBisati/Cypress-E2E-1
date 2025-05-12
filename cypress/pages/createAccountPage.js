import {
  generateRandomString,
  generateRandomNumber,
  generateRandomEmail,
  generatePassword,
  generateRandomState,
  generateRandomCountry,
} from "../support/utilityFile";

let webLocator = {
  labels: {
    createAccount: ".maintext",
  },
  inputbox: {
    firstName: "#AccountFrm_firstname",
    lastName: "#AccountFrm_lastname",
    email: "#AccountFrm_email",
    telephone: "#AccountFrm_telephone",
    fax: "#AccountFrm_fax",
    company: "#AccountFrm_company",
    Address1: "#AccountFrm_address_1",
    Address2: "#AccountFrm_address_2",
    city: "#AccountFrm_city",
    zipcode: "#AccountFrm_postcode",
    loginName: "#AccountFrm_loginname",
    password: "#AccountFrm_password",
    confirmPassword: "#AccountFrm_confirm",
  },
  radiobutton: {
    newsletterNo: "#AccountFrm_newsletter0",
  },
  checkbox: {
    privacyPlociy: "#AccountFrm_agree",
  },
  button: {
    continue: '[title="Continue"]',
  },
  dropdown: {
    country: "#AccountFrm_country_id",
    state: "#AccountFrm_zone_id",
  },
};

class CreateAccountPage {
  static fillAccountRegistrationDetails() {
    let password = generatePassword();
    let country = generateRandomCountry();
    cy.get(webLocator.inputbox.firstName).type(generateRandomString());
    cy.get(webLocator.inputbox.lastName).type(generateRandomString());
    cy.get(webLocator.inputbox.email).type(generateRandomEmail());
    cy.get(webLocator.inputbox.telephone).type(generateRandomNumber());
    cy.get(webLocator.inputbox.fax).type(generateRandomNumber());
    cy.get(webLocator.inputbox.company).type(generateRandomString());
    cy.get(webLocator.inputbox.Address1).type(generateRandomNumber());
    cy.get(webLocator.inputbox.Address2).type(generateRandomString());
    cy.get(webLocator.inputbox.city).type(generateRandomString());
    cy.get(webLocator.dropdown.country).select(country);
    cy.get(webLocator.dropdown.state).select(generateRandomState(country));
    cy.get(webLocator.inputbox.zipcode).type(generateRandomNumber());
    cy.get(webLocator.inputbox.loginName).type(generateRandomString());
    cy.get(webLocator.inputbox.password).type(password);
    cy.get(webLocator.inputbox.confirmPassword).type(password);
    cy.get(webLocator.radiobutton.newsletterNo).check().should("be.checked");
    cy.get(webLocator.checkbox.privacyPlociy).check().should("be.checked");
    cy.get(webLocator.button.continue).click();
  }
}

export default CreateAccountPage;
