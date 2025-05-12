import {
  getRandomProductName,
  getProductCheckOutPrice,
} from "../support/utilityFile";

let webLocators = {
  table: {
    productLastRow: ".confirm_products>tbody>tr:last-of-type",
    amountTotals: ".table-bordered>tbody>tr td:last-of-type",
  },
  button: {
    confirmOrder: "#checkout_btn",
  },
};

class CheckOutConfirmationPage {
  static verifyItemsAndPlaceOrder() {
    cy.get(webLocators.table.productLastRow).within(() => {
      cy.get("td").eq(1).should("include.text", getRandomProductName());
      cy.get("td").eq(4).should("include.text", getProductCheckOutPrice());
    });

    let checkOutPrices = [];
    let retail;
    cy.get(webLocators.table.amountTotals)
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
    cy.get(webLocators.button.confirmOrder).click();
  }
}

export default CheckOutConfirmationPage;
