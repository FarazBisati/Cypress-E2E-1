import {
  getRandomProductName,
  setProductOldPrice,
  setProductCheckOutPrice,
} from "../support/utilityFile";

import HomePage from "./homePage";

let webLocators = {
  lables: {
    sideListPrice: ".price",
    totalPrice: "span.total-price",
    finalPrice: ".productprice",
    currentCurrency: ".pull-left>li>a>span>span",
    cartCurrenySymbol: ".cart_total",
    productName: ".bgnone",
    oldPrice: ".jumbotron>:last-child",
    checkOutPrice: "span.total-price",
  },
  link: {
    addToWishList: ".wishlist>a:last-of-type",
    removeFromWishList: ".wishlist>a:first-of-type",
    home: ".categorymenu>li:first-child",
  },
  radiobuttons: {
    size: "label>:not([disabled='disabled'])[type='radio']",
  },
  buttons: {
    addToCart: ".productpagecart >li:first-child",
    outOfStock: ".nostock",
  },
};

class ProductPage {
  static verifyRandomProductDetails() {
    cy.get("body").then((body) => {
      if (body.find(webLocators.buttons.outOfStock).length != 1) {
        cy.get(webLocators.lables.currentCurrency).then((currenySymbol) => {
          let currency = currenySymbol.text();
          cy.get(webLocators.lables.oldPrice)
            .should("be.visible")
            .then((price) => {
              cy.log("Current price : " + price.text().trim());
              setProductOldPrice(price.text());
            });
          cy.get(webLocators.lables.checkOutPrice, { timeout: 20000 })
            .should("be.visible")
            .then((price) => {
              cy.log("CheckOut Price : " + price.text().trim());
              setProductCheckOutPrice(price.text());
            });
          cy.get(webLocators.lables.cartCurrenySymbol).should(
            "include.text",
            currency
          );
          cy.get(webLocators.lables.sideListPrice)
            .should("be.visible")
            .and("include.text", currency);
          cy.get(webLocators.lables.finalPrice)
            .should("be.visible")
            .and("include.text", currency);
          cy.get(webLocators.lables.totalPrice)
            .should("be.visible")
            .and("include.text", currency);
          cy.get(webLocators.lables.productName)
            .should("be.visible")
            .and("include.text", getRandomProductName());
        });
        cy.get("body").then((body) => {
          if (body.find(webLocators.radiobuttons.size).length > 0) {
            cy.get(webLocators.radiobuttons.size).then((size) => {
              let sizeArray = size.toArray();
              cy.wrap(
                sizeArray[Math.floor(Math.random() * sizeArray.length)]
              ).check();
            });
          }
        });
      } else {
        cy.get(webLocators.link.home).click();
        HomePage.clickOnRandomProduct();
        ProductPage.verifyRandomProductDetails();
      }
    });
  }

  static addProductToWishlist() {
    cy.get(webLocators.link.addToWishList).should("be.visible").click();
    cy.get(webLocators.link.removeFromWishList, { timeout: 60000 })
      .should("exist")
      .and("be.visible");
  }

  static addProductToCart() {
    cy.get(webLocators.buttons.addToCart).click();
  }
}

export default ProductPage;
