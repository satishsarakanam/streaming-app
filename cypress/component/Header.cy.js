import Header from "../../src/components/Header";
describe("Header.cy.js", () => {
  it("AppName should be Demo Streaming", () => {
    cy.mount(<Header />);
    cy.get(".title span").should("have.text", "DEMO Streaming");
  });

  it("Onboard Login/SignUp should be present", () => {
    cy.mount(<Header />);
    cy.get(".signup").should("have.text", "Start your free trail");
  });
});
