describe("Renders /", () => {
  it("Display logo", () => {
    // Start from the index page
    cy.visit("/");
    cy.get("div").contains("tick");
  });
});
