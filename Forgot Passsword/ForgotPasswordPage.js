class ForgotPasswordPage {
  // ===== SELECTORS =====
  forgotPasswordLink = 'p.orangehrm-login-forgot-header'; // link "Forgot your password?"
  usernameField = 'input[name="username"]';
  resetButton = 'button[type="submit"]';
  cancelButton = 'button[type="button"]';
  successMessage = '.oxd-text.oxd-text--p.oxd-alert-content-text';
  errorMessage = '.oxd-input-field-error-message';
  pageHeader = 'h6.orangehrm-forgot-password-title'; // teks “Reset Password”

  // ===== METHODS =====
  visit() {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  }

  clickForgotPassword() {
    cy.get(this.forgotPasswordLink).should('be.visible').click();
  }

  resetPassword(username) {
    if (username) cy.get(this.usernameField).clear().type(username);
    cy.get(this.resetButton).click();
  }

  verifySuccessMessage(expectedText) {
    cy.get(this.successMessage, { timeout: 10000 })
      .should('be.visible')
      .and('contain', expectedText);
  }

  verifyErrorMessage(expectedText) {
    cy.get(this.errorMessage, { timeout: 10000 })
      .should('be.visible')
      .and('contain', expectedText);
  }

  verifyRedirectToLogin() {
    cy.url().should('include', '/auth/login');
    cy.get(this.forgotPasswordLink).should('be.visible');
  }

  verifyPageOpened() {
    cy.url().should('include', '/auth/requestPasswordResetCode');
    cy.get(this.pageHeader).should('contain', 'Reset Password');
  }

  verifyPageTitle(expectedTitle) {
    cy.url().should('include', '/auth/requestPasswordResetCode');
    cy.get(this.pageHeader, { timeout: 10000 })
      .should('be.visible')
      .and('contain', expectedTitle);
}


}

export default ForgotPasswordPage;
