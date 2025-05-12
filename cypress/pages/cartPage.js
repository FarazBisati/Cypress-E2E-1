import {
  generateRandomCountry,
  generateRandomEmail,
  generateRandomNumber,
  generateRandomState,
  generateRandomString,
  getRandomProductName,
  getProductCheckOutPrice,
} from "../support/utilityFile";

let webLocators = {
  table: {
    productLastRow: ".product-list>.table-bordered>tbody>tr:last-of-type",
    priceRows: "#totals_table>tbody>tr>td:last-of-type",
  },
  dropdown: {
    shippingCountry: "#estimate_country",
    shippingState: "#estimate_country_zones",
    guestCountry: "#guestFrm_country_id",
    guestState: "#guestFrm_zone_id",
  },
  inputbox: {
    shippingZipCode: "#estimate_postcode",
    firstName: "#guestFrm_firstname",
    lastName: "#guestFrm_lastname",
    email: "#guestFrm_email",
    address1: "#guestFrm_address_1",
    city: "#guestFrm_city",
    guestZipcode: "#guestFrm_postcode",
  },
  button: {
    checkout: "#cart_checkout2",
    continue: "[title='Continue']",
  },
};

class CartPage {
  static verifyLatestProductInCart() {
    cy.get(webLocators.table.productLastRow).within(() => {
      cy.get("td").eq(1).should("include.text", getRandomProductName());
      cy.get("td").eq(5).should("include.text", getProductCheckOutPrice());
    });
  }

  static setShippingDetails() {
    let randomCountry = generateRandomCountry();
    cy.get(webLocators.dropdown.shippingCountry).select(randomCountry);
    cy.get(webLocators.dropdown.shippingState).select(
      generateRandomState(randomCountry)
    );
    cy.get(webLocators.inputbox.shippingZipCode).type(generateRandomNumber());
  }

  static checkTotals() {
    let checkOutPrices = [];
    let retail;
    cy.get(webLocators.table.priceRows)
      .should("exist")
      .and("be.visible")
      .each((item) => {
        checkOutPrices.push(Number(item.text().replace("$", "").trim()));
        cy.log(item.text().replace("$", "").trim());
      })
      .then(() => {
        if (checkOutPrices.length === 3) {
          expect(getProductCheckOutPrice()).to.equal(checkOutPrices[0]);
          expect(checkOutPrices[0] + checkOutPrices[1]).to.equal(
            checkOutPrices[2]
          );
        } else {
          expect(getProductCheckOutPrice()).to.equal(checkOutPrices[0]);
          retail = parseFloat(
            ((8.5 / 100) * Number(checkOutPrices[0])).toFixed(2)
          );
          expect(checkOutPrices[0] + checkOutPrices[1] + retail).to.equal(
            checkOutPrices[3]
          );
        }
      });
  }

  static clickCheckOut() {
    cy.get(webLocators.button.checkout).click();
  }

  static fillGuestPersonalDeatils() {
    let country = generateRandomCountry();
    cy.get(webLocators.inputbox.firstName).clear().type(generateRandomString());
    cy.get(webLocators.inputbox.lastName).clear().type(generateRandomString());
    cy.get(webLocators.inputbox.email).clear().type(generateRandomEmail());
    cy.get(webLocators.inputbox.address1).clear().type(generateRandomString());
    cy.get(webLocators.inputbox.city).clear().type(generateRandomString());
    cy.get(webLocators.dropdown.guestCountry).select(country);
    cy.get(webLocators.inputbox.guestZipcode)
      .clear()
      .type(generateRandomNumber());
    cy.get(webLocators.dropdown.guestState).select(
      generateRandomState(country)
    );
    cy.get(webLocators.button.continue).click();
  }
}

export default CartPage;
