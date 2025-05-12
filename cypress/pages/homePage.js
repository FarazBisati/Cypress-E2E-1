import { setRandomProductName } from "../support/utilityFile";

let webLocators = {
  link: {
    loginAndRegister: "#customer_menu_top a[href*='login']",
    menuItems: ".nav-pills.categorymenu>li",
    socialMedialogo: ".social_icons>a",
    productName: ".list-inline .prdocutname",
    myAccountOptions: "#customer_menu_top>li",
    cart: ".block_7",
  },
  labels: {
    setCurrency: ".block_6 >ul>li:first-of-type span",
    cartTotal: ".cart_total",
    menuItem: ".categorymenu>li>a",
    allPrices: ".price",
    itemPrices: ".jumbotron>.price>div:first-of-type",
  },
  dropdown: {
    setCurrenySymbol: ".language.pull-left",
    currenyItems: ".currency>li>a",
    sortItems: "#sort",
  },
  inputBox: {
    searchBar: "#filter_keyword",
  },
};

class HomePage {
  static clickLoginAndRegister() {
    cy.get(webLocators.link.loginAndRegister).should("be.visible").click();
  }

  static setCurrencyAndVerifyAppliedCurrency() {
    cy.get(webLocators.dropdown.currenyItems).each((symbol) => {
      let currentSymbol = symbol.text().at(0);

      cy.get(webLocators.dropdown.setCurrenySymbol).trigger("mouseover");
      cy.get(webLocators.dropdown.currenyItems).contains(currentSymbol).click();
      cy.get(webLocators.labels.allPrices).each((symbol) => {
        cy.wrap(symbol).should("include.text", currentSymbol);
      });
      cy.get(webLocators.labels.setCurrency)
        .contains(currentSymbol)
        .should("include.text", currentSymbol);
      cy.get(webLocators.labels.cartTotal)
        .contains(currentSymbol)
        .should("include.text", currentSymbol);
    });
  }

  static menuItems = {
    Books: ["Audio CD", "Paperback"],
    "Hair Care": ["Conditioner", "Shampoo"],
    Men: ["Body & Shower", "Fragrance Sets", "Pre-Shave & Shaving", "Skincare"],
    Fragrance: ["Men", "Women"],
    Skincare: ["Eyes", "Face", "Gift Ideas & Sets", "Hands & Nails", "Sun"],
    Makeup: ["Cheeks", "Eyes", "Face", "Lips", "Nails", "Value Sets"],
    "Apparel & accessories": ["Shoes", "T-shirts"],
    Home: [
      "Specials",
      "Account",
      "Login",
      "Check Your Order",
      "Cart",
      "Checkout",
    ],
  };
  static checkAllMenuItems() {
    let selectedMenu;
    let currentMenuItem = this.menuItems;
    let selectedMenuItem;
    cy.get(webLocators.link.menuItems).each((items) => {
      cy.wrap(items).within(() => {
        cy.get(">a").then((a) => {
          selectedMenu = a.text().trim();
          selectedMenuItem = currentMenuItem[selectedMenu];
        });
        cy.get("div>ul a").each((subItem) => {
          expect(selectedMenuItem).to.include(subItem.text().trim());
        });
      });
    });
  }

  static checkSocialMediaLogoNavigations() {
    cy.get(webLocators.link.socialMedialogo).then((logos) => {
      let elements = logos.toArray();
      for (let logo of elements) {
        cy.wrap(logo).then((logo) => {
          let href = logo.prop("href");
          cy.visit(href);
          if (href === "http://www.facebook.com/") {
            href = "https://www.facebook.com/";
          } else if (href === "https://twitter.com/") {
            href = "https://x.com/";
          }
          cy.origin(href, { args: { href } }, ({ href }) => {
            cy.url().should("include", href);
          });
          cy.visit("/");
        });
      }
    });
  }

  static clickOnRandomProduct() {
    let productName;
    function getRandomProductNumber(maxNum) {
      return Math.floor(Math.random() * Number(maxNum));
    }
    cy.get(webLocators.link.productName).then((products) => {
      let currentProduct = products.eq(getRandomProductNumber(products.length));
      productName = currentProduct.text().trim();
      cy.log("Product Name : " + productName);
      if (
        productName === "Tropiques Minerale Loose Bronzer" ||
        productName === "Casual 3/4 Sleeve Baseball T-Shirt" ||
        productName === "Acqua Di Gio Pour Homme"
      ) {
        HomePage.clickOnRandomProduct();
      } else {
        setRandomProductName(productName);
        cy.wrap(currentProduct).click();
      }
    });
  }

  static clickOnWishList() {
    cy.get(webLocators.link.myAccountOptions)
      .should("be.visible")
      .trigger("mouseover")
      .then((options) => {
        cy.wrap(options).within(() => {
          cy.get("li:nth-of-type(2)").click();
        });
      });
  }

  static searchItem(itemName) {
    cy.get(webLocators.inputBox.searchBar)
      .should("be.enabled")
      .clear()
      .type(itemName + "{enter}");
  }

  static sortItemsByPriceLowToHigh() {
    function compareArray(arr) {
      let duplicateArray = [...arr];
      return duplicateArray.sort((a, b) => a - b);
    }
    let prices = [];
    cy.get(webLocators.dropdown.sortItems).select("Price Low > High");
    cy.get(webLocators.labels.itemPrices)
      .each((onePrice) => {
        prices.push(Number(onePrice.text().replace("$", "").trim()));
      })
      .then(() => {
        expect(compareArray(prices)).to.deep.equal(prices);
      });
  }

  static sortItemsByNameDescending() {
    function compareNames(array) {
      let duplicateArray = [...array];
      return duplicateArray.sort().reverse();
    }
    let itemNames = [];
    cy.get(webLocators.dropdown.sortItems).select("Name Z - A");
    cy.get(webLocators.link.productName)
      .each((item) => {
        itemNames.push(item.text().trim());
      })
      .then(() => {
        expect(compareNames(itemNames)).to.deep.equal(itemNames);
      });
  }

  static goToCart() {
    cy.get(webLocators.link.cart).click();
  }
}

export default HomePage;
