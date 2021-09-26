describe("Renders /", () => {
  it("render homepage when unauthenticated", () => {
    cy.visit("/");
    cy.get("div").contains("tick");
    cy.get("a").contains("Sign In");
    cy.getCookies().should("have.length", 0);
  });
});
