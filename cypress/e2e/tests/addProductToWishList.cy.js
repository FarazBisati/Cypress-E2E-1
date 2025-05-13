import Homepage from "../../pages/homePage";
import LoginPage from "../../pages/loginPage";
import ProductPage from "../../pages/productPage";
import WishlistPage from "../../pages/wishListPage";

let userData;

describe("Add product to wishlist", () => {
  before(() => {
    cy.fixture("loginData").then((data) => {
      userData = data;
    });
  });
  after(() => {
    WishlistPage.removeProductsWithCurrentDate();
  });
  it("Verify if the correct random product is added to wishlist", () => {
    cy.login(userData);
    cy.visit("/");
    Homepage.clickOnRandomProduct();
    ProductPage.verifyRandomProductDetails();
    ProductPage.addProductToWishlist();
    Homepage.clickOnWishList();
    WishlistPage.verifyLatestAddedProductInWishList();
  });
});
