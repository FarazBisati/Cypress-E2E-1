import {
  getRandomProductName,
  getProductCheckOutPrice,
  getProductOldPrice,
} from "../support/utilityFile";

let webLocators = {
  table: {
    lastRowOfTable: ".table-bordered tr:last-of-type",
    allCells: ".table-bordered>tbody>tr>td:nth-of-type(5)",
  },
};
function getDate() {
  let currentDate = new Date();
  let day = String(currentDate.getDate()).padStart(2, "0");
  let month = String(currentDate.getMonth() + 1).padStart(2, "0");
  let year = String(currentDate.getFullYear());
  return month + "/" + day + "/" + year;
}
class WishlistPage {
  static verifyLatestAddedProductInWishList() {
    cy.get(webLocators.table.lastRowOfTable)
      .should("be.visible")
      .within(() => {
        cy.get("td").eq(1).should("include.text", getRandomProductName());
        cy.get("td").eq(3).should("include.text", getProductOldPrice());
        cy.get("td").eq(4).should("include.text", getDate());
      });
  }

  static removeProductsWithCurrentDate() {
    cy.get("body").then((body) => {
      if (body.find(webLocators.table.allCells).length > 0) {
        cy.get(webLocators.table.allCells).each((cell) => {
          cy.wrap(cell)
            .invoke("text")
            .then((text) => {
              if (text.trim() === getDate()) {
                cy.wrap(cell).parent().find("td").eq(5).find("a").eq(1).click();
              }
            });
        });
      }
    });
  }

  static addProductToCart() {
    cy.get(webLocators.table.lastRowOfTable).then((row) => {
      cy.wrap(row).find("td:last-of-type >a:first-of-type").click();
    });
  }
}

export default WishlistPage;
