class DirectoryPage {
  // ===== SELECTORS =====
  directoryMenu = 'a[href="/web/index.php/directory/viewDirectory"]';
  employeeNameField = 'input[placeholder="Type for hints..."]';
  jobTitleDropdown = '.oxd-select-text-input'; // dropdown job title
  locationDropdown = '.oxd-select-text-input'; // dropdown location
  searchButton = 'button[type="submit"]';
  resetButton = 'button[type="reset"]';
  resultTable = '.oxd-sheet.oxd-sheet--rounded.oxd-sheet--white.orangehrm-directory-card';
  employeeCard = '.oxd-sheet'; // hasil card employee

  // ===== METHODS =====
  login() {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    cy.get('input[name="username"]').type('Admin');
    cy.get('input[name="password"]').type('admin123');
    cy.get('button[type="submit"]').click();
    cy.url({ timeout: 10000 }).should('include', '/dashboard');
  }

  openDirectory() {
    cy.get(this.directoryMenu, { timeout: 10000 }).click();
    cy.url({ timeout: 10000 }).should('include', '/directory');
    cy.get('h6', { timeout: 10000 }).should('contain', 'Directory');
  }

  searchEmployeeByName(name) {
    cy.get(this.employeeNameField, { timeout: 10000 }).clear().type(name);
    cy.get(this.searchButton).click();
  }

  searchByPartialName(namePart) {
    cy.get(this.employeeNameField, { timeout: 10000 }).clear().type(namePart);
    cy.get(this.searchButton).click();
  }

  openJobTitleDropdown() {
    cy.get(this.jobTitleDropdown, { timeout: 10000 }).eq(0).click();
  }

  openLocationDropdown() {
    cy.get(this.locationDropdown, { timeout: 10000 }).eq(1).click();
  }

  clickReset() {
    cy.get(this.resetButton, { timeout: 10000 }).click();
  }

  verifyResultExists() {
    cy.get(this.resultTable, { timeout: 10000 }).should('be.visible');
  }
}

export default DirectoryPage;
