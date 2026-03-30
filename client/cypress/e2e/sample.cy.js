// cypress/e2e/sample.cy.js

describe('Sample E2E', () => {
  it('Visits the app root url', () => {
    cy.visit('http://localhost:5173');
    cy.contains('Nexora'); // Adjust as per your app
  });
});
