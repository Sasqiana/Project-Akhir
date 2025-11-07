// cypress/support/pageObjects/LoginPage.js

class LoginPage {
  usernameField = 'input[name="username"]';
  passwordField = 'input[name="password"]';
  loginButton = 'button[type="submit"]';
  alertMessage = '.oxd-alert-content-text';
  requiredMessage = '.oxd-input-field-error-message';
  profileName = '.oxd-userdropdown-name';

  visit() {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  }

  login(username, password) {
    if (username !== '') cy.get(this.usernameField).type(username);
    if (password !== '') cy.get(this.passwordField).type(password);
    cy.intercept('POST', '**/auth/validate').as('loginRequest');
    cy.get(this.loginButton).click();
  }

  verifyDashboard() {
    cy.wait('@loginRequest').its('response.statusCode').should('eq', 302);
    cy.url().should('include', '/dashboard/index');
  }

  verifyErrorMessage(message) {
    cy.get(this.alertMessage, { timeout: 10000 })
      .should('be.visible')
      .and('contain', message);
  }

  verifyRequiredMessage() {
    cy.get(this.requiredMessage)
      .should('be.visible')
      .and('contain', 'Required');
  }

  verifyProfileName(expectedName) {
    cy.get(this.profileName, { timeout: 10000 })
      .should('contain.text', expectedName);
  }
}

export default LoginPage;
