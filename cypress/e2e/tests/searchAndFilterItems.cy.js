import HomePage from "../../pages/homePage";

describe("Serach and Filter the items", () => {
  beforeEach(() => {
    cy.visit("/");
    HomePage.searchItem("Shampoo");
  });
  it("Search and filter elements using Price", () => {
    HomePage.sortItemsByPriceLowToHigh();
  });
  it("search and filter elements using Name", () => {
    HomePage.sortItemsByNameDescending();
  });
});
