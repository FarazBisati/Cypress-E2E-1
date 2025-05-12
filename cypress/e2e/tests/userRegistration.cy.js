import SucessPage from "../../pages/accountCreatedSucessPage";
import CreateAccountPage from "../../pages/createAccountPage";
import HomePage from "../../pages/homePage";
import LoginPage from "../../pages/loginPage";

describe("New user registration", () => {
  it("Register new user", () => {
    cy.visit("/");
    HomePage.clickLoginAndRegister();
    LoginPage.registerAccount();
    CreateAccountPage.fillAccountRegistrationDetails();
    SucessPage.verifyAccountIsCreated(
      "Your Account Has Been Created!",
      "My Account",
      "Congratulations! Your new account has been successfully created! You can now take advantage of member privileges to enhance your online shopping experience with us. If you have ANY questions about the operation of this online shop, please email the store owner. A confirmation has been sent to the provided email address. If you have not received it within the hour, please contact"
    );
  });
});
