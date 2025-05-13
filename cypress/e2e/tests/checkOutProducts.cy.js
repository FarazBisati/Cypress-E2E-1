import HomePage from "../../pages/homePage";
import ProductPage from "../../pages/productPage";
import CartPage from "../../pages/cartPage";
import LoginPage from "../../pages/loginPage";
import CheckOutConfirmationPage from "../../pages/checkOutConfirmation";
import WishlistPage from "../../pages/wishListPage";

describe("CheckOut products", () => {
  let userData;
  beforeEach(() => {
    cy.fixture("loginData").then((data) => {
      userData = data;
    });
  });
  it("Checkout Products without login", () => {
    cy.visit("/");
    HomePage.goToCart();
    CartPage.removeAllProductsFromCart();
    LoginPage.navigateToHomePage();
    HomePage.clickOnRandomProduct();
    ProductPage.verifyRandomProductDetails();
    ProductPage.addProductToCart();
    CartPage.verifyLatestProductInCart();
    CartPage.setShippingDetails();
    CartPage.checkTotals();
    CartPage.clickCheckOut();
    LoginPage.clickGuestCheckOut();
    CartPage.fillGuestPersonalDeatils();
    CheckOutConfirmationPage.verifyItemsAndPlaceOrder();
    CheckOutConfirmationPage.clickCheckOut();
  });
  it("CheckOut Products from the wishList with Login ", () => {
    cy.login(userData);
    cy.visit("/");
    HomePage.clickOnWishList();
    WishlistPage.removeProductsWithCurrentDate();
    HomePage.goToCart();
    CartPage.removeAllProductsFromCart();
    LoginPage.navigateToHomePage();
    HomePage.clickOnRandomProduct();
    ProductPage.verifyRandomProductDetails();
    ProductPage.addProductToWishlist();
    HomePage.clickOnWishList();
    WishlistPage.verifyLatestAddedProductInWishList();
    WishlistPage.addProductToCart();
    CartPage.verifyLatestProductInCart();
    CartPage.setShippingDetails();
    CartPage.checkTotals();
    CartPage.clickCheckOut();
    CheckOutConfirmationPage.verifyItemsAndPlaceOrder();
    CheckOutConfirmationPage.clickCheckOut();
  });
});
