import HomePage from "../../pages/homePage";
import LoginPage from "../../pages/loginPage";
import MyAccountPage from "../../pages/myAccount";

let loginData;

describe("Verify the Login behaviour", () => {
  before(() => {
    cy.fixture("loginData").then((logindata) => {
      loginData = logindata;
    });
  });

  beforeEach("Launch the WebApplication", () => {
    cy.visit("/");
    HomePage.clickLoginAndRegister();
  });

  describe("Positive Login Test Cases ", () => {
    let url = "https://automationteststore.com/index.php?rt=account/account";
    it("Verify login with correct username and password", () => {
      LoginPage.login(loginData.valid1);
      MyAccountPage.verifyAccountIsLogged(url);
    });

    it("Verify login with case-insensitive username and password", () => {
      LoginPage.login(loginData.valid2);
      MyAccountPage.verifyAccountIsLogged(url);
    });
  });

  describe("Negative Login Test Cases ", () => {
    it("Verify login with invalid username and correct password", () => {
      LoginPage.login(loginData.invalid1);
      LoginPage.getErrorMessage("Error: Incorrect login or password provided.");
    });

    it("Verify login with valid username and invalid password", () => {
      LoginPage.login(loginData.invalid2);
      LoginPage.getErrorMessage("Error: Incorrect login or password provided.");
    });

    it("Verify login with spaces in username and password", () => {
      LoginPage.login(loginData.invalid4);
      LoginPage.getErrorMessage("Error: Incorrect login or password provided.");
    });
  });
});
