import DirectoryPage from '../support/pageObjects/DirectoryPage';

describe('OrangeHRM - Directory Feature', () => {
  const directoryPage = new DirectoryPage();

  beforeEach(() => {
    directoryPage.login();
    directoryPage.openDirectory();
    cy.wait(2000); // biar halaman directory bener2 siap
  });

  it('TC01 - Verifikasi halaman Directory dapat terbuka dengan sukses', () => {
    cy.url().should('include', '/directory');
    cy.get('h6').should('contain', 'Directory');
  });

  it('TC02 - Verifikasi tombol dropdown Directory search dapat diklik', () => {
    directoryPage.openJobTitleDropdown();
    cy.get('.oxd-select-dropdown', { timeout: 10000 }).should('be.visible');
  });

  it('TC03 - Verifikasi kolom pencarian by employee name berfungsi', () => {
  directoryPage.searchEmployeeByName('Timothy Lewis Amiano');
  directoryPage.verifyResultExists();
  });

  it('TC04 - Verifikasi dropdown "Job Title" berfungsi', () => {
    directoryPage.openJobTitleDropdown();
    cy.wait(1000);
    cy.get('.oxd-select-dropdown > *', { timeout: 10000 }).should('have.length.greaterThan', 1);
  });

  it('TC05 - Verifikasi dropdown "Location" berfungsi', () => {
    directoryPage.openLocationDropdown();
    cy.wait(1000);
    cy.get('.oxd-select-dropdown > *', { timeout: 10000 }).should('have.length.greaterThan', 1);
  });

  it('TC06 - Pencarian karyawan berdasarkan nama lengkap', () => {
    directoryPage.searchEmployeeByName('Amelia  Brown');
    cy.wait(2000);
    directoryPage.verifyResultExists();
  });

  it('TC07 - Pencarian karyawan berdasarkan sebagian nama', () => {
    directoryPage.searchByPartialName('Amelia');
    cy.wait(2000);
    directoryPage.verifyResultExists();
  });

  it('TC08 - Pencarian dengan input kosong', () => {
    cy.get(directoryPage.searchButton).click();
    cy.wait(2000);
    directoryPage.verifyResultExists();
  });

  it('TC09 - Verifikasi tombol Reset dapat menghapus semua field pencarian', () => {
    directoryPage.searchEmployeeByName('Amelia Brown');
    cy.wait(1000);
    directoryPage.clickReset();
    cy.get(directoryPage.employeeNameField).should('have.value', '');
  });
});

