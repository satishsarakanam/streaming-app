/// <reference types="cypress" />

// Welcome to Cypress!
//
// This spec file contains a variety of sample tests
// for a todo list app that are designed to demonstrate
// the power of writing tests in Cypress.
//
// To learn more about how Cypress works and
// what makes it such an awesome testing tool,
// please read our getting started guide:
// https://on.cypress.io/introduction-to-cypress

describe("End to End Testing of the Streaming App", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("App name is Demo Streaming", () => {
    cy.get(".title span").should("have.text", "DEMO Streaming");
  });

  it("Displays Login/Registration", () => {
    // cy.get(".onboard span:first-child").should("have.text", "Log in");
    cy.get(".onboard .signup").should("have.text", "Start your free trail");
  });

  it("Populars, Series and Movies are displayed", () => {
    // cy.get(".onboard span:first-child").should("have.text", "Log in");
    cy.get(".populars").should("have.length", 2);
    cy.get(".populars .card_title").should("have.text", "seriesmovie");
  });

  it("Footer is displayed", () => {
    // cy.get(".onboard span:first-child").should("have.text", "Log in");
    cy.get("footer").should("have.length", 1);
    cy.get(".cr").should(
      "have.text",
      "Copyright © 2022 Demo Streaming. All Rights Reserved."
    );
  });

  it("Should navigate to Series", () => {
    cy.get(".card").eq(0).click();
    cy.url().should("eq", "http://localhost:3000/popular/series");
  });

  it("Should navigate to Movie", () => {
    cy.get(".card").eq(1).click();
    cy.url().should("eq", "http://localhost:3000/popular/movie");
  });

  it("Visit an unknown path inside popular should result in No Results Found", () => {
    cy.visit("http://localhost:3000/popular/abc");
    cy.get(".no-results").should("have.text", "No Results");
  });

  it("Visit an unknown path other than popular should result 404 Error not Found", () => {
    cy.visit("http://localhost:3000/abc");
    cy.get(".error-page span").should("have.text", ":( Error: 404 Not Found");
  });

  it("Visit an unknown path other than popular should result 404 Error not Found", () => {
    cy.visit("http://localhost:3000/abc");
    cy.get(".error-page span").should("have.text", ":( Error: 404 Not Found");
  });

  it("Movies are displayed after navigating to movies list", () => {
    cy.get(".card").eq(1).click();
    cy.get(".items-list").eq(1).get(".card").should("have.length", 38);
    cy.url().should("eq", "http://localhost:3000/popular/movie");
  });

  it("Series are displayed after navigating to series list", () => {
    cy.get(".card").eq(0).click();
    cy.get(".items-list").eq(1).get(".card").should("have.length", 66);
    cy.url().should("eq", "http://localhost:3000/popular/series");
  });

  it("Navigate to program details view", () => {
    cy.get(".card").eq(0).click();
    cy.get(".items-list").eq(1).get(".card").eq(3).click();
    cy.url().should("eq", "http://localhost:3000/popular/series");
  });

  it("Check if all the program details are displyed on the modal", () => {
    cy.get(".card").eq(0).click();
    cy.get(".items-list").eq(1).get(".card").eq(3).click();
    cy.get(".modal-window").should("have.length", 1);
    cy.get(".hero-title").should("have.text", "No Activity");
    cy.get(".hero-description").should(
      "have.text",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    );
    cy.get(".hero-year").should("have.text", "Release year: 2015");
    cy.get(".hero-funfact").should("not.have.text", "Blah Blah Blah");
  });

  it("Closing the program details modal should show the previes view", () => {
    cy.get(".card").eq(0).click();
    cy.get(".items-list").eq(1).get(".card").eq(3).click();
    cy.get(".program-details button").click();
    cy.get(".modal-window").should("have.length", 0);
  });

  it("Clicking on App Name should navigate to home page", () => {
    cy.visit("http://localhost:3000/abc");
    cy.get(".title a").click();
    cy.url().should("eq", "http://localhost:3000/");
  });

  it("Should show No fun facts on a fetch error", () => {
    cy.visit("http://localhost:3000/popular/movie");
    cy.get(".items-list").eq(1).children(".card").eq(1).click();
    cy.get(".hero-funfact").should("have.text", "Fun Fact: Loading...");
    cy.wait(5000);
    cy.get(".hero-funfact").should("not.have.text", "Fun Fact: Loading...");
    cy.get(".hero-funfact").should(
      "have.text",
      "Fun Fact: Oh no! Nothing Found"
    );
  });

  it("Should show loading on fun fact for the timout requests", () => {
    cy.visit("http://localhost:3000/popular/movie");
    cy.get(".items-list").eq(1).children(".card").eq(0).click();
    cy.get(".hero-funfact").should("have.text", "Fun Fact: Loading...");
    cy.wait(5000);
    cy.get(".hero-funfact").should("not.have.text", "Fun Fact: Loading...");
  });
});
